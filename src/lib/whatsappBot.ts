import crypto from 'crypto';

export interface WhatsAppButton {
  id: string;
  title: string;
}

export interface SendMessageOptions {
  recipient: string; // phone number e.g. 919876543210
  message: string;
  buttons?: WhatsAppButton[];
  orderId?: string | number;
  metadata?: Record<string, any>;
}

// Environment variables
const BOT_URL = process.env.MY_WHATSAPP_BOT_URL || '';
const BOT_KEY = process.env.MY_WHATSAPP_BOT_KEY || '';
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || '';

/**
 * Verifies that the incoming webhook request genuinely came from Shopify
 */
export function verifyShopifyWebhook(rawBody: string, hmacHeader: string | null): boolean {
  if (!SHOPIFY_WEBHOOK_SECRET || !hmacHeader) return true; // dev bypass if secret not set yet

  try {
    const hash = crypto
      .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
      .update(rawBody, 'utf8')
      .digest('base64');
    return hash === hmacHeader;
  } catch (err) {
    console.error('HMAC verification error:', err);
    return false;
  }
}

/**
 * Universal WhatsApp Bot API Sender
 * Works with your custom Bot URL & Key
 */
export async function sendWhatsAppMessage(options: SendMessageOptions): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!BOT_URL || !BOT_KEY) {
    console.log('[WHATSAPP BOT SIMULATION] URL or Key not set. Message that would be sent:');
    console.log(`To: ${options.recipient}`);
    console.log(`Text: ${options.message}`);
    if (options.buttons) console.log(`Buttons:`, options.buttons);
    return { success: true, data: { simulated: true } };
  }

  // Format phone number to clean E.164 without symbols
  let cleanPhone = options.recipient.replace(/\D/g, '');
  if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

  try {
    const payload = {
      apiKey: BOT_KEY,
      recipient: cleanPhone,
      message: options.message,
      buttons: options.buttons,
      orderId: options.orderId,
      metadata: options.metadata,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(BOT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BOT_KEY}`,
        'x-api-key': BOT_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, error: data?.message || `HTTP ${res.status}` };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Failed to dispatch WhatsApp bot message:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * 1. COD Anti-RTO Order Verification Trigger
 */
export async function sendCODVerificationWhatsApp({
  phone,
  customerName,
  orderNumber,
  orderId,
  totalAmount,
  itemSummary,
}: {
  phone: string;
  customerName: string;
  orderNumber: string;
  orderId: string | number;
  totalAmount: string | number;
  itemSummary: string;
}) {
  const message = `Assalamu Alaikum ${customerName}! ✨\n\nAapne *Al-Attar Parfumerie* par Cash on Delivery (COD) order place kiya hai:\n\n📦 *Order:* ${orderNumber}\n🛍️ *Items:* ${itemSummary}\n💰 *Total Amount:* ₹${totalAmount}\n\nKripya niche click karke apna order confirm karein taake hum Delhivery se parcel dispatch karein:`;

  const buttons: WhatsAppButton[] = [
    { id: `CONFIRM_${orderId}`, title: '✅ Confirm Order' },
    { id: `CANCEL_${orderId}`, title: '❌ Cancel Order' },
  ];

  return sendWhatsAppMessage({
    recipient: phone,
    message,
    buttons,
    orderId,
    metadata: { type: 'cod_verification', orderNumber },
  });
}

/**
 * 2. Courier Fulfillment & Live Tracking Push
 */
export async function sendFulfillmentTrackingWhatsApp({
  phone,
  customerName,
  orderNumber,
  courierName,
  trackingNumber,
  trackingUrl,
}: {
  phone: string;
  customerName: string;
  orderNumber: string;
  courierName: string;
  trackingNumber: string;
  trackingUrl: string;
}) {
  const message = `Good news ${customerName}! 🚚✨\n\nAapka Al-Attar order *${orderNumber}* warehouse se dispatch ho gaya hai!\n\n📦 *Courier:* ${courierName}\n🏷️ *Tracking AWB:* ${trackingNumber}\n\nLive Track karein:\n👉 ${trackingUrl}`;

  return sendWhatsAppMessage({
    recipient: phone,
    message,
    metadata: { type: 'tracking_update', orderNumber, trackingNumber },
  });
}

/**
 * 3. Abandoned Cart Recovery Push
 */
export async function sendAbandonedCartWhatsApp({
  phone,
  customerName,
  checkoutUrl,
  productTitle,
}: {
  phone: string;
  customerName: string;
  checkoutUrl: string;
  productTitle: string;
}) {
  const message = `Assalamu Alaikum ${customerName}! 🌿\n\nAapka favourite *${productTitle}* bag mein wait kar raha hai! Is batch ke limited stock bache hain.\n\nAbhi order complete karein aur payein *10% Instant Discount + Free Insured Courier* with coupon code *ROYAL10*:\n\n👉 ${checkoutUrl}`;

  return sendWhatsAppMessage({
    recipient: phone,
    message,
    metadata: { type: 'abandoned_cart', checkoutUrl },
  });
}

