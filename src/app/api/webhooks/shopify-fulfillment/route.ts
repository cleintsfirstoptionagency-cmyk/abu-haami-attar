import { NextRequest, NextResponse } from 'next/server';
import { verifyShopifyWebhook, sendFulfillmentTrackingWhatsApp } from '@/lib/whatsappBot';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get('x-shopify-hmac-sha256');

    // Security Verification
    const isValid = verifyShopifyWebhook(rawBody, hmacHeader);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized signature' }, { status: 401 });
    }

    const fulfillment = JSON.parse(rawBody);

    // Customer & Tracking Details
    const phone = fulfillment.destination?.phone || fulfillment.phone;
    const customerName = fulfillment.destination?.first_name || 'Customer';
    const trackingCompany = fulfillment.tracking_company || 'Delhivery Express';
    const trackingNumber = fulfillment.tracking_number || (fulfillment.tracking_numbers && fulfillment.tracking_numbers[0]);
    const trackingUrl = fulfillment.tracking_url || `https://www.delhivery.com/track/package/${trackingNumber}`;

    if (!phone || !trackingNumber) {
      return NextResponse.json({ message: 'Missing phone or tracking info' }, { status: 200 });
    }

    // WhatsApp Message Dispatch
    await sendFulfillmentTrackingWhatsApp({
      phone,
      customerName,
      orderNumber: fulfillment.order_id ? `#${fulfillment.order_id}` : 'Your Order',
      courierName: trackingCompany,
      trackingNumber,
      trackingUrl,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('[Fulfillment Webhook Error]:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}

