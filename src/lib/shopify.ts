import { AttarProduct } from '@/types/product';

export const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
export const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
export const SHOPIFY_API_VERSION = '2024-04';

// Curated Luxury Artisanal Attar Catalog (Production Mock & Fallback)
export const FALLBACK_ATTARS: AttarProduct[] = [
  {
    id: 'attar-1',
    title: 'Dehn Al Oud Cambodi',
    handle: 'dehn-al-oud-cambodi',
    tagline: 'Aged 18 Years * Wild Harvest Agarwood',
    description: 'Distilled using antique copper degs from aged wild Cambodian agarwood. Deep, balsamic, leathery warmth that settles into a velvety royal sweet woody aura.',
    origin: 'Koh Kong, Cambodia',
    gender: 'Unisex',
    longevity: '18-24 Hours on Skin',
    sillage: 'Enchanting & Heavy',
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Royal Vintage',
    featuredImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    notes: {
      top: ['Smoky Agarwood', 'Warm Saffron', 'Wild Berries'],
      heart: ['Honeyed Tobacco', 'Leather', 'Damascena Rose'],
      base: ['Cambodian Oud Wood', 'Dark Amber', 'Oakmoss']
    },
    variants: [
      { id: 'var-1-3ml', title: '3ml Royal Crystal Vial', size: '3ml', price: 2499, availableForSale: true },
      { id: 'var-1-6ml', title: '6ml Imperial Roll-on', size: '6ml', price: 4499, availableForSale: true },
      { id: 'var-1-12ml', title: '12ml Wooden Box Collector Edition', size: '12ml', price: 7999, availableForSale: true }
    ]
  },
  {
    id: 'attar-2',
    title: 'Rooh Gulab (Kannauj Rose)',
    handle: 'rooh-gulab-kannauj',
    tagline: 'Hydro-distilled in Pure Sandalwood Oil',
    description: 'Over 4,000 kilograms of freshly plucked Indian Damascus pink rose petals hydro-distilled into genuine Mysore sandalwood base. Pure soul of Kannauj.',
    origin: 'Kannauj, Uttar Pradesh',
    gender: 'Unisex',
    longevity: '12-14 Hours',
    sillage: 'Airy, Fresh & Seductive',
    rating: 4.95,
    reviewsCount: 218,
    badge: 'Heritage Classic',
    featuredImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    notes: {
      top: ['Morning Dew Roses', 'Green Leaf Sap', 'Cardamom'],
      heart: ['Damascena Rose Petals', 'Indian Jasmine', 'Neroli'],
      base: ['Mysore White Sandalwood', 'Soft Velvet Amber']
    },
    variants: [
      { id: 'var-2-3ml', title: '3ml Crystal Flacon', size: '3ml', price: 1899, availableForSale: true },
      { id: 'var-2-6ml', title: '6ml Handcrafted Decant', size: '6ml', price: 3499, availableForSale: true },
      { id: 'var-2-12ml', title: '12ml Heritage Brass Box', size: '12ml', price: 6299, availableForSale: true }
    ]
  },
  {
    id: 'attar-3',
    title: 'Kasturi White Musk Imperial',
    handle: 'kasturi-white-musk-imperial',
    tagline: 'Clean, Silky, Intimate Pure Botanical Musk',
    description: 'A 100% alcohol-free, cruelty-free botanical deer musk accord blended with Egyptian lotus, ambergris nuance, and powdery white cashmere.',
    origin: 'Kashmir Valley & Grasse Blend',
    gender: 'Unisex',
    longevity: '14-16 Hours',
    sillage: 'Subtle, Magnetically Intimate',
    rating: 4.88,
    reviewsCount: 189,
    badge: 'Crowd Favourite',
    featuredImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    notes: {
      top: ['Clean Linen', 'Egyptian Lotus', 'Soft Citrus'],
      heart: ['White Cashmere Lily', 'Orris Butter', 'Powdery Violet'],
      base: ['Imperial White Musk', 'Skin Amber', 'Cedar Bark']
    },
    variants: [
      { id: 'var-3-3ml', title: '3ml Pocket Roller', size: '3ml', price: 1499, availableForSale: true },
      { id: 'var-3-6ml', title: '6ml Crystal Applicator', size: '6ml', price: 2799, availableForSale: true },
      { id: 'var-3-12ml', title: '12ml Luxury Flacon', size: '12ml', price: 4999, availableForSale: true }
    ]
  },
  {
    id: 'attar-4',
    title: 'Mitti Attar (Petrichor)',
    handle: 'mitti-attar-petrichor',
    tagline: 'The Aroma of First Rain on Parched Earth',
    description: 'Baked river clay tablets baked under scorching sun, then hydro-distilled into pristine sandalwood oil. The unmistakable scent of Indian monsoon.',
    origin: 'Kannauj Earth Heritage',
    gender: 'Unisex',
    longevity: '10-12 Hours',
    sillage: 'Grounded, Calming & Meditative',
    rating: 4.92,
    reviewsCount: 167,
    badge: 'Soul of Monsoon',
    featuredImage: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80',
    notes: {
      top: ['Wet Baked Earth', 'Ozone Breeze', 'Crushed Herbs'],
      heart: ['Riverbed Terracotta', 'Earthy Clay', 'Geosmin'],
      base: ['Pure Mysore Sandalwood', 'Warm Dry Sand']
    },
    variants: [
      { id: 'var-4-3ml', title: '3ml Sample Vial', size: '3ml', price: 1299, availableForSale: true },
      { id: 'var-4-6ml', title: '6ml Signature Roll-on', size: '6ml', price: 2399, availableForSale: true },
      { id: 'var-4-12ml', title: '12ml Collector Box', size: '12ml', price: 4299, availableForSale: true }
    ]
  }
];

// Generic GraphQL Fetcher for Shopify Storefront API
export async function shopifyStorefrontFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data?: T; errors?: any }> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    return { data: undefined };
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    return await res.json();
  } catch (error) {
    console.error('Error fetching from Shopify Storefront API:', error);
    return { errors: [error] };
  }
}

// Create Shopify Cart & Return Checkout URL
export async function createShopifyCheckoutUrl(lines: { merchandiseId: string; quantity: number }[]): Promise<string> {
  const mutation = `
    mutation createCart($cartInput: CartInput!) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  if (SHOPIFY_DOMAIN && SHOPIFY_STOREFRONT_TOKEN && lines.length > 0) {
    try {
      const response = await shopifyStorefrontFetch<any>({
        query: mutation,
        variables: {
          cartInput: {
            lines: lines.map((l) => ({
              merchandiseId: l.merchandiseId,
              quantity: l.quantity,
            })),
          },
        },
      });

      if (response.data?.cartCreate?.cart?.checkoutUrl) {
        return response.data.cartCreate.cart.checkoutUrl;
      }
    } catch (e) {
      console.warn('Shopify Cart creation failed, falling back to simulated checkout:', e);
    }
  }

  // Fallback demo checkout simulated url
  return `/checkout-success?items=${lines.reduce((acc, curr) => acc + curr.quantity, 0)}`;
}

