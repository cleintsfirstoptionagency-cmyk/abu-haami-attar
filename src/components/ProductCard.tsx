'use client';

import React from 'react';
import { AttarProduct } from '@/types/product';

interface ProductCardProps {
  product: AttarProduct;
}

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ezf1x7-pn.myshopify.com';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currentVariant = product.variants[0];
  const productUrl = `https://${STORE_DOMAIN}/products/${product.handle}`;

  const handleRedirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = productUrl;
  };

  return (
    <div
      onClick={handleRedirect}
      className="group relative rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#DEC99D] hover:border-[#B88325] overflow-hidden transition-all duration-300 shadow-[0_4px_15px_rgba(66,46,27,0.06)] hover:shadow-[0_10px_25px_rgba(184,131,37,0.18)] flex flex-col justify-between cursor-pointer"
    >
      {/* 1. Full-Fit Product Image (Edge-to-Edge without gaps) */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#161009]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Product Info & Action Button */}
      <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-serif italic text-[#2C1D0E] font-bold line-clamp-1 group-hover:text-[#B88325] transition-colors">
            {product.title}
          </h3>

          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#7A5B1C] font-bold font-sans">
            <span>₹{currentVariant.price.toLocaleString('en-IN')}</span>
            <span className="text-[11px] text-[#8C765C] font-normal">({currentVariant.size})</span>
          </div>
        </div>

        {/* 3. Golden BUY NOW Button (Directly redirects to Shopify product) */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleRedirect}
            className="w-full py-2.5 sm:py-3 px-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] text-[#2C1D0E] hover:brightness-105 shadow-[0_3px_10px_rgba(184,131,37,0.25)] font-sans"
          >
            <span>BUY NOW</span>
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
