'use client';

import React from 'react';
import { AttarProduct } from '@/types/product';

interface ProductCardProps {
  product: AttarProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currentVariant = product.variants[0];
  const productUrl = `/products/${product.handle}`;

  return (
    <a
      href={productUrl}
      className="group relative rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#DEC99D] hover:border-[#B88325] overflow-hidden transition-all duration-300 shadow-[0_4px_16px_rgba(66,46,27,0.06)] hover:shadow-[0_12px_28px_rgba(184,131,37,0.18)] flex flex-col justify-between block select-none transform hover:-translate-y-1"
    >
      {/* 1. Full-Fit Product Image */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#161009]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
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

        {/* 3. Exact Fatima Calligrapher Style BUY NOW Button */}
        <div className="mt-3">
          <div
            style={{ touchAction: 'manipulation' }}
            className="w-full py-2.5 sm:py-3 px-3 rounded-xl font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-gold-glow active:scale-95 gold-bg-gradient text-[#1A1208] font-sans cursor-pointer border border-[#F3E3B6]"
          >
            <span className="text-amber-800 text-xs pointer-events-none">⚡</span>
            <span className="pointer-events-none">BUY NOW</span>
            <span className="text-sm font-black pointer-events-none group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </a>
  );
};
