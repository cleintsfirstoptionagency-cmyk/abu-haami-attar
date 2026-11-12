'use client';

import React, { useState } from 'react';
import { AttarProduct, AttarVariant } from '@/types/product';
import { CheckIcon } from './Icons';

interface ProductCardProps {
  product: AttarProduct;
  onAddToCart: (product: AttarProduct, variant: AttarVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const currentVariant = product.variants[0];
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, currentVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#DEC99D] hover:border-[#B88325] p-3 sm:p-5 transition-all duration-300 shadow-[0_6px_20px_rgba(66,46,27,0.06)] hover:shadow-[0_12px_30px_rgba(184,131,37,0.18)] flex flex-col justify-between">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#EADBCA] flex items-center justify-center p-2 sm:p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500"
        />

        {/* Live Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-[#D4A037] text-white shadow-2xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Title & Price */}
      <div className="pt-3.5 pb-1 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-serif italic text-[#2C1D0E] font-bold line-clamp-1 group-hover:text-[#B88325] transition-colors">
            {product.title}
          </h3>

          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#7A5B1C] font-bold font-sans">
            <span>₹{currentVariant.price.toLocaleString('en-IN')}</span>
            <span className="text-[11px] text-[#8C765C] font-normal">({currentVariant.size})</span>
          </div>
        </div>

        {/* Golden Pill Action Button (Matches Uploaded Reference: "Buy Now ->") */}
        <div className="mt-3.5">
          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className={`w-full py-2.5 sm:py-3 px-4 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] text-[#2C1D0E] hover:brightness-105 shadow-[0_4px_12px_rgba(184,131,37,0.22)]'
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-4 h-4 text-white" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <span>Buy Now -></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
