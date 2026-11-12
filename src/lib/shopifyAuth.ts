/**
 * Shopify Admin API Client Credentials Auth & Token Manager
 * Uses the modern Shopify Dev Dashboard Client Credentials grant (grant_type: client_credentials)
 * with automatic token caching and pre-expiry renewal.
 */

interface CachedToken {
  accessToken: string;
  expiresAt: number; // Unix timestamp in ms
  scope: string;
}

let tokenCache: CachedToken | null = null;

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || '';
const API_VERSION = '2024-04';

/**
 * Obtains or renews an access token using Client Credentials Grant
 */
export async function getShopifyAdminAccessToken(): Promise<string> {
  const now = Date.now();

  // 1. Check if cached token is still valid (with a 5-minute safety buffer)
  if (tokenCache && tokenCache.expiresAt - now > 5 * 60 * 1000) {
    return tokenCache.accessToken;
  }

  if (!SHOP_DOMAIN || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      'Missing Shopify credentials. Please check your .env.local file: SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID, and SHOPIFY_CLIENT_SECRET must be set.'
    );
  }

  // Format clean domain (remove https:// or trailing slashes)
  const cleanDomain = SHOP_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const tokenUrl = `https://${cleanDomain}/admin/oauth/access_token`;

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Shopify Token Exchange failed [HTTP ${response.status}]: ${errBody}`);
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error(`Invalid token response from Shopify: ${JSON.stringify(data)}`);
    }

    // Default expiry: 24 hours (86400 seconds) if not provided by Shopify
    const expiresInSec = data.expires_in || 86400;
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: now + expiresInSec * 1000,
      scope: data.scope || '',
    };

    console.log(`[Shopify Auth] Token generated successfully via Client Credentials. Scope: ${tokenCache.scope}`);
    return tokenCache.accessToken;
  } catch (error: any) {
    console.error('[Shopify Auth Error]:', error.message);
    throw error;
  }
}

/**
 * Execute an authenticated GraphQL query against Shopify Admin API
 */
export async function shopifyAdminGraphQL<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const token = await getShopifyAdminAccessToken();
  const cleanDomain = SHOP_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const url = `https://${cleanDomain}/admin/api/${API_VERSION}/graphql.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(`Shopify Admin GraphQL Error: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

/**
 * Execute an authenticated REST request against Shopify Admin API
 */
export async function shopifyAdminREST<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getShopifyAdminAccessToken();
  const cleanDomain = SHOP_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const url = `https://${cleanDomain}/admin/api/${API_VERSION}/${endpoint.replace(/^\//, '')}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Shopify REST Error [${res.status}]: ${errText}`);
  }

  return await res.json();
}

