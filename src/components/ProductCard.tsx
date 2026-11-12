'use client';

import React, { useState } from 'react';
import { AttarProduct, AttarVariant } from '@/types/product';
import { CheckIcon, ShoppingBagIcon } from './Icons';

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
    <div className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#18130e] to-[#0f0c09] border border-amber-500/30 hover:border-amber-400/70 p-3 sm:p-4 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0a0806] border border-[#2b2116] flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Live Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest bg-amber-500/90 text-black shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-serif italic text-[#fcf9f2] line-clamp-1 group-hover:text-amber-300 transition-colors">
            {product.title}
          </h3>

          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold font-sans">
            <span>₹{currentVariant.price.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-[#8e8172] font-normal">({currentVariant.size})</span>
          </div>
        </div>

        {/* Golden Pill Action Button (Matches Uploaded Reference Image) */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className={`w-full py-2.5 px-3 rounded-full font-medium text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-gradient-to-r from-[#edd085] via-[#d4af37] to-[#b68826] text-black font-semibold hover:brightness-110 shadow-[0_4px_15px_rgba(212,175,55,0.25)]'
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBagIcon className="w-3.5 h-3.5 text-black" />
                <span className="text-[11px] font-bold">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
