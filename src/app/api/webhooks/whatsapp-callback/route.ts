import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';

/**
 * Endpoint for when your WhatsApp Bot receives a button click from the customer
 * (e.g. "CONFIRM_12345678" or "CANCEL_12345678")
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support multiple bot formats: buttonId, button_id, text, action
    const actionId = body.buttonId || body.button_id || body.action || body.text || '';
    const phone = body.phone || body.sender || body.from;

    console.log(`[WhatsApp Bot Callback Received]:`, { actionId, phone });

    // Pattern: CONFIRM_9842183921 or CANCEL_9842183921
    if (actionId.startsWith('CONFIRM_')) {
      const orderId = actionId.replace('CONFIRM_', '');
      await updateShopifyOrderTag(orderId, 'COD-Confirmed', 'Customer confirmed COD order via WhatsApp Bot.');
      return NextResponse.json({ success: true, status: 'confirmed', orderId });
    }

    if (actionId.startsWith('CANCEL_')) {
      const orderId = actionId.replace('CANCEL_', '');
      await updateShopifyOrderTag(orderId, 'COD-Cancelled-By-Customer', 'Customer clicked cancel on WhatsApp.');
      return NextResponse.json({ success: true, status: 'cancelled', orderId });
    }

    return NextResponse.json({ message: 'Unhandled action' }, { status: 200 });
  } catch (err: any) {
    console.error('[WhatsApp Callback Error]:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function updateShopifyOrderTag(orderId: string, newTag: string, note: string) {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    console.log(`[MOCK] Order #${orderId} tagged with: ${newTag}`);
    return;
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/admin/api/2024-04/orders/${orderId}.json`;

  try {
    // 1. Get existing order tags
    const getRes = await fetch(endpoint, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
    });
    const orderData = await getRes.json();
    const existingTags = orderData.order?.tags || '';

    // 2. Append new tag
    const updatedTags = existingTags ? `${existingTags}, ${newTag}` : newTag;

    // 3. Update Order
    await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          id: orderId,
          tags: updatedTags,
          note: note,
        },
      }),
    });
  } catch (e) {
    console.error(`Failed to update order tag for #${orderId}:`, e);
  }
}

