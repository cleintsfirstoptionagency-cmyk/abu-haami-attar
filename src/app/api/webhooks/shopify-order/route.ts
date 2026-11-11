import { NextRequest, NextResponse } from 'next/server';
import { verifyShopifyWebhook, sendCODVerificationWhatsApp, sendWhatsAppMessage } from '@/lib/whatsappBot';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get('x-shopify-hmac-sha256');

    // 1. Verify Security Signature from Shopify
    const isValid = verifyShopifyWebhook(rawBody, hmacHeader);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized HMAC signature' }, { status: 401 });
    }

    const order = JSON.parse(rawBody);

    // 2. Extract Customer & Phone
    const customerName = order.customer?.first_name || order.shipping_address?.first_name || 'Customer';
    const phone = order.shipping_address?.phone || order.phone || order.customer?.phone;

    if (!phone) {
      console.warn(`[Order Webhook] Order #${order.name} has no customer phone number.`);
      return NextResponse.json({ message: 'No phone number on order' }, { status: 200 });
    }

    const isCOD =
      order.financial_status === 'pending' ||
      order.gateway?.toLowerCase().includes('cash') ||
      order.gateway?.toLowerCase().includes('cod') ||
      order.payment_gateway_names?.some((g: string) => g.toLowerCase().includes('cod') || g.toLowerCase().includes('cash'));

    const itemsSummary = (order.line_items || [])
      .map((item: any) => `${item.title} (${item.variant_title || 'Std'}) x${item.quantity}`)
      .join(', ');

    // 3. Dispatch appropriate WhatsApp Flow
    if (isCOD) {
      await sendCODVerificationWhatsApp({
        phone,
        customerName,
        orderNumber: order.name,
        orderId: order.id,
        totalAmount: order.total_price,
        itemSummary: itemsSummary || 'Artisanal Attar Bottle',
      });
    } else {
      // Prepaid Order Confirmation
      const prepaidMsg = `Assalamu Alaikum ${customerName}! 🌿\n\nShukriya! Aapka ₹${order.total_price} ka payment receive ho gaya hai for Order *${order.name}*.\n\nItems: ${itemsSummary}\n\nHumara team aapka pure attar packaging shuru kar raha hai!`;
      await sendWhatsAppMessage({
        recipient: phone,
        message: prepaidMsg,
        orderId: order.id,
        metadata: { type: 'prepaid_confirmation', orderNumber: order.name },
      });
    }

    return NextResponse.json({ success: true, orderId: order.id }, { status: 200 });
  } catch (error: any) {
    console.error('[Shopify Order Webhook Error]:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}

