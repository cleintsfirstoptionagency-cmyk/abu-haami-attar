import { AttarProduct } from '@/types/product';

export const INITIAL_SHOPIFY_PRODUCTS: AttarProduct[] = [
  {
    id: "gid://shopify/Product/9799679672579",
    title: "White Oud Attar – 6 ml",
    handle: "white-oud-attar-6-ml",
    tagline: "Authentic Pure Scent * Direct from Shopify",
    description: "White Oud 6 ml attar ke saath apne fragrance collection ko dein ek khaas jagah. Iski compact bottle ko saath rakhna aasaan hai.",
    origin: "Artisanal Distillation",
    gender: "Unisex",
    longevity: "14-18 Hours",
    sillage: "Heavy & Royal",
    rating: 5,
    reviewsCount: 1,
    featuredImage: "https://cdn.shopify.com/s/files/1/0852/1826/3299/files/2nd_de1f8517-6064-458b-898e-55c7a3326a9f.jpg?v=1794477876",
    notes: {
      top: ["Pure White Oud", "Warm Bergamot"],
      heart: ["Sweet Amber", "Velvet Rose"],
      base: ["Agarwood Essence", "Cedar Wood"],
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/50239193186563",
        title: "6ml Standard Edition",
        size: "6ml",
        price: 599,
        availableForSale: true,
        shopifyVariantId: "gid://shopify/ProductVariant/50239193186563",
      },
    ],
  },
];

