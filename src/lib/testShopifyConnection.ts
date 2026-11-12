import { shopifyAdminGraphQL, getShopifyAdminAccessToken } from './shopifyAuth';

export interface TestResult {
  success: boolean;
  shopName?: string;
  myshopifyDomain?: string;
  currency?: string;
  productsCount?: number;
  sampleProducts?: Array<{ id: string; title: string; handle: string; totalInventory: number }>;
  scopesGranted?: string;
  error?: string;
}

export async function testProductsAndInventoryConnection(): Promise<TestResult> {
  try {
    // 1. Validate & generate token
    await getShopifyAdminAccessToken();

    // 2. Query Shop Details & Products via Admin GraphQL
    const query = `
      query TestStoreConnection {
        shop {
          name
          myshopifyDomain
          currencyCode
          plan {
            displayName
          }
        }
        products(first: 5) {
          totalCount
          edges {
            node {
              id
              title
              handle
              totalInventory
              variants(first: 3) {
                edges {
                  node {
                    id
                    title
                    price
                    inventoryQuantity
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await shopifyAdminGraphQL(query);

    const sampleProducts = (data.products?.edges || []).map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      totalInventory: edge.node.totalInventory ?? 0,
    }));

    return {
      success: true,
      shopName: data.shop?.name,
      myshopifyDomain: data.shop?.myshopifyDomain,
      currency: data.shop?.currencyCode,
      productsCount: data.products?.totalCount ?? sampleProducts.length,
      sampleProducts,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Unknown connection error',
    };
  }
}

