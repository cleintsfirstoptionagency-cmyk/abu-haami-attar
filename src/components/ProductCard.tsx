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
      {/* 1. Full-Fit Product Image (Clean without any overlapping labels/badges) */}
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

        {/* 3. Refined Golden BUY NOW Button */}
        <div className="mt-3">
          <div className="relative overflow-hidden w-full py-2.5 sm:py-3 px-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] hover:brightness-105 text-[#2C1D0E] font-sans cursor-pointer border border-[#FFF0B8]/60 shadow-[0_3px_12px_rgba(184,131,37,0.2)]">
            <span className="relative z-10 flex items-center gap-1.5 font-bold">
              <span>BUY NOW</span>
              <span className="text-sm font-black">→</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
