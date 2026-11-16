export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface AttarVariant {
  id: string;
  title: string; // e.g. "6ml Crystal Roll-on", "12ml Royal Decant"
  size: string;
  price: number;
  availableForSale: boolean;
  shopifyVariantId?: string;
}

export interface AttarProduct {
  id: string;
  title: string;
  handle: string;
  tagline: string;
  description: string;
  notes: FragranceNotes;
  longevity: string; // e.g., "12-16 Hours"
  sillage: string; // e.g., "Heavy & Royal"
  gender: 'Unisex' | 'Masculine' | 'Feminine';
  origin: string; // e.g., "Kannauj, India" | "Cambodia / Assam"
  featuredImage: string;
  images?: string[];
  videoUrl?: string; // Direct Shopify CDN video link (.mp4)
  badge?: string; // e.g., "Bestseller", "Pure Dehn Al Oud", "Limited Harvest"
  rating: number;
  reviewsCount: number;
  variants: AttarVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image: string;
  shopifyVariantId?: string;
}

