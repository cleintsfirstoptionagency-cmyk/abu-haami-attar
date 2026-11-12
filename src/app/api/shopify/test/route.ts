import { NextResponse } from 'next/server';
import { testProductsAndInventoryConnection } from '@/lib/testShopifyConnection';

export async function GET() {
  const result = await testProductsAndInventoryConnection();
  if (!result.success) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Shopify Products & Inventory connection test failed',
        details: result.error,
        instruction: 'Please check that SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID, and SHOPIFY_CLIENT_SECRET in .env.local are correct.',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: 'success',
    message: 'Shopify Products & Inventory connected successfully via Dev Dashboard Client Credentials!',
    data: result,
  });
}

