import { NextResponse } from 'next/server';
import { INITIAL_SHOPIFY_PRODUCTS } from '@/lib/initialProducts';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ezf1x7-pn.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '328fc62ab37c1638401420595cd651c2';

export async function GET() {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`;

  const query = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            handle
            featuredImage {
              url
              altText
            }
            images(first: 10) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    const data = await res.json();
    const shopifyProducts = (data.data?.products?.edges || []).map((edge: any) => {
      const p = edge.node;
      const variants = (p.variants?.edges || []).map((vEdge: any) => {
        const v = vEdge.node;
        return {
          id: v.id,
          title: v.title === 'Default Title' ? '6ml Standard Edition' : v.title,
          size: v.title.includes('ml') ? v.title : '6ml',
          price: parseFloat(v.price?.amount || '599'),
          availableForSale: v.availableForSale,
          shopifyVariantId: v.id,
        };
      });

      return {
        id: p.id,
        title: p.title,
        handle: p.handle,
        tagline: 'Authentic Pure Scent * Live from Shopify',
        description: p.description || '100% pure alcohol-free artisanal fragrance oil.',
        origin: 'Artisanal Distillation',
        gender: 'Unisex',
        longevity: '14-18 Hours',
        sillage: 'Heavy & Royal',
        rating: 5.0,
        reviewsCount: 1,
        badge: 'Live in Store',
        featuredImage: p.featuredImage?.url || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
        videoUrl: INITIAL_SHOPIFY_PRODUCTS.find((init) => init.handle === p.handle)?.videoUrl,
        images: (p.images?.edges || []).map((imgEdge: any) => imgEdge.node.url),
        notes: {
          top: ['Pure White Oud', 'Warm Bergamot'],
          heart: ['Sweet Amber', 'Velvet Rose'],
          base: ['Agarwood Essence', 'Cedar Wood'],
        },
        variants: variants.length > 0 ? variants : [
          {
            id: 'default-var',
            title: '6ml Roll-on',
            size: '6ml',
            price: parseFloat(p.priceRange?.minVariantPrice?.amount || '599'),
            availableForSale: true,
          }
        ],
      };
    });

    return NextResponse.json({ success: true, products: shopifyProducts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

