'use client';

import React from 'react';
import { AttarProduct } from '@/types/product';

interface ProductCardProps {
  product: AttarProduct;
}

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ezf1x7-pn.myshopify.com';

// Custom luxury badge for each top product
const TOP_BADGES: Record<string, { label: string; icon: string }> = {
  'white-oud-attar-6-ml': { label: 'TOP SELLER', icon: '👑' },
  'ruh-gulab-attar-6-ml': { label: 'ROYAL ROSE', icon: '✨' },
  'ameer-al-oud-attar-6-ml': { label: 'TOP CHOICE', icon: '🔥' },
  'dream-oud-attar-6-ml': { label: 'BESTSELLER', icon: '💎' },
  'turkish-attar-6-ml': { label: 'EXOTIC BLEND', icon: '✦' },
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currentVariant = product.variants[0];
  const productUrl = `https://${STORE_DOMAIN}/products/${product.handle}`;
  const badgeInfo = TOP_BADGES[product.handle] || { label: 'TOP PRODUCT', icon: '👑' };

  return (
    <a
      href={productUrl}
      className="group relative rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#DFCBA0] hover:border-[#B88325] overflow-hidden transition-all duration-300 shadow-[0_4px_18px_rgba(66,46,27,0.08)] hover:shadow-[0_12px_30px_rgba(184,131,37,0.25)] flex flex-col justify-between block select-none transform hover:-translate-y-1"
    >
      {/* 1. Full-Fit Product Image with Continuous Golden Light Shimmer */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#161009]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Continuous Luxury Light Shine Sweep Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-card-shine" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Top Product Golden Badge with Glowing Pulse */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <div className="animate-top-badge flex items-center gap-1 bg-gradient-to-r from-[#F6D374] via-[#FFF0B8] to-[#E5B542] text-[#221307] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-[0_2px_12px_rgba(226,184,88,0.7)] border border-[#FFF5D0]">
            <span className="text-[10px] leading-none">{badgeInfo.icon}</span>
            <span>{badgeInfo.label}</span>
          </div>
        </div>
      </div>

      {/* 2. Product Info & Action Button */}
      <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-serif italic text-[#2C1D0E] font-bold line-clamp-1 group-hover:text-[#B88325] transition-colors">
            {product.title}
          </h3>

          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#7A5B1C] font-bold font-sans">
            <span className="text-[#B88325]">✦</span>
            <span>₹{currentVariant.price.toLocaleString('en-IN')}</span>
            <span className="text-[11px] text-[#8C765C] font-normal">({currentVariant.size})</span>
          </div>
        </div>

        {/* 3. Golden BUY NOW Button with Continuous Flowing Shimmer Animation */}
        <div className="mt-3">
          <div className="w-full py-2.5 sm:py-3 px-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] animate-gold-button text-[#2C1D0E] hover:brightness-105 shadow-[0_3px_12px_rgba(184,131,37,0.35)] font-sans cursor-pointer">
            <span>BUY NOW</span>
            <span className="text-sm">→</span>
          </div>
        </div>
      </div>
    </a>
  );
};
