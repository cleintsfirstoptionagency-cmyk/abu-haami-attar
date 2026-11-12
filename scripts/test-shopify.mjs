import { existsSync } from 'fs';

// Load .env.local
if (existsSync('.env.local')) {
  process.loadEnvFile('.env.local');
} else {
  console.error('❌ .env.local file not found in project root!');
  process.exit(1);
}

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

console.log('\n======================================================');
console.log('   SHOPIFY CLIENT CREDENTIALS CONNECTION TEST');
console.log('======================================================\n');

if (!SHOP_DOMAIN || !CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Missing credentials in .env.local:');
  console.error(`- SHOPIFY_STORE_DOMAIN: ${SHOP_DOMAIN ? '✓ Present' : '✗ MISSING'}`);
  console.error(`- SHOPIFY_CLIENT_ID: ${CLIENT_ID ? '✓ Present' : '✗ MISSING'}`);
  console.error(`- SHOPIFY_CLIENT_SECRET: ${CLIENT_SECRET ? '✓ Present (Hidden)' : '✗ MISSING'}`);
  console.log('\nPlease add them to .env.local and run again.\n');
  process.exit(1);
}

const cleanDomain = SHOP_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
const tokenUrl = `https://${cleanDomain}/admin/oauth/access_token`;

console.log(`📡 Store: https://${cleanDomain}`);
console.log(`🔑 Client ID: ${CLIENT_ID}`);
console.log(`🔒 Requesting OAuth Access Token (Client Credentials Grant)...`);

try {
  const tokenRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Token Exchange Failed [HTTP ${tokenRes.status}]: ${errText}`);
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  console.log('✅ Access Token generated & verified successfully!');
  console.log(`📜 Granted Scopes: ${tokenData.scope || 'Default'}\n`);

  console.log('🔍 Testing Products & Inventory via Admin GraphQL API...');

  const graphqlUrl = `https://${cleanDomain}/admin/api/2024-04/graphql.json`;
  const query = `
    query {
      shop {
        name
        myshopifyDomain
        currencyCode
      }
      products(first: 5) {
        totalCount
        edges {
          node {
            id
            title
            totalInventory
          }
        }
      }
    }
  `;

  const gqlRes = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({ query }),
  });

  const gqlData = await gqlRes.json();

  if (gqlData.errors) {
    throw new Error(`GraphQL Query Error: ${JSON.stringify(gqlData.errors)}`);
  }

  const shop = gqlData.data.shop;
  const products = gqlData.data.products;

  console.log('🎉 SUCCESS! PRODUCTS & INVENTORY CONNECTION IS WORKING!\n');
  console.log(`🏪 Store Name: ${shop.name}`);
  console.log(`🌐 Domain: ${shop.myshopifyDomain}`);
  console.log(`💰 Currency: ${shop.currencyCode}`);
  console.log(`📦 Total Products in Store: ${products.totalCount}`);

  if (products.edges.length > 0) {
    console.log('\nSample Live Products in Store:');
    products.edges.forEach(({ node }) => {
      console.log(` - [${node.title}] (Total Stock: ${node.totalInventory})`);
    });
  } else {
    console.log('\n(No products in store yet. The connection is ready to upload Attars!)');
  }

  console.log('\n======================================================\n');
} catch (err) {
  console.error('\n❌ Connection Test Failed:');
  console.error(err.message);
  console.log('\n======================================================\n');
  process.exit(1);
}

