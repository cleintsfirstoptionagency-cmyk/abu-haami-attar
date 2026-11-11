'use client';

import React, { useState } from 'react';
import { AttarProduct, AttarVariant } from '@/types/product';
import { StarIcon, CheckIcon, ShoppingBagIcon } from './Icons';

interface ProductCardProps {
  product: AttarProduct;
  onAddToCart: (product: AttarProduct, variant: AttarVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState<AttarVariant>(product.variants[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group rounded-2xl bg-[#14100c] border border-[#261e16] hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_10px_35px_rgba(212,175,55,0.1)]">
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0806]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100c] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-amber-500 text-black shadow-md">
              {product.badge}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-black/70 backdrop-blur-md text-amber-200 border border-amber-900/50">
            {product.origin}
          </span>
        </div>

        {/* Rating Floating Tag */}
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/30 flex items-center gap-1 text-xs text-amber-300 font-medium">
          <StarIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-[#887b6d] text-[10px]">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-amber-400 font-medium mb-1">
            {product.tagline}
          </div>
          <h3 className="text-xl font-serif text-[#fcf9f2] font-normal group-hover:text-amber-200 transition-colors">
            {product.title}
          </h3>

          <p className="mt-2 text-xs text-[#9c8e7c] line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Fragrance Notes Pills */}
          <div className="mt-4 pt-3 border-t border-[#231b14] space-y-1.5">
            <div className="text-[10px] text-[#7d7062] uppercase tracking-wider">Fragrance Notes Profile</div>
            <div className="flex flex-wrap gap-1 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-[#1a140f] text-amber-200/80 border border-[#302418]">
                Top: {product.notes.top.join(', ')}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1a140f] text-amber-300 border border-[#3b2b1d]">
                Heart: {product.notes.heart.join(', ')}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1a140f] text-amber-400/90 border border-amber-900/40">
                Base: {product.notes.base.join(', ')}
              </span>
            </div>
          </div>

          {/* Longevity & Sillage Tags */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#8c7e6e] bg-[#0d0a07] px-3 py-1.5 rounded-lg border border-[#211912]">
            <span>Longevity: <strong className="text-amber-200">{product.longevity}</strong></span>
            <span>Sillage: <strong className="text-amber-200">{product.sillage}</strong></span>
          </div>

          {/* Variant Selector (Size: 3ml, 6ml, 12ml) */}
          <div className="mt-4">
            <div className="text-[10px] text-[#7d7062] uppercase tracking-wider mb-2">Select Bottle Size:</div>
            <div className="grid grid-cols-3 gap-2">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all text-center ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/15 text-amber-200 font-semibold shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                        : 'border-[#261e16] bg-[#0f0c09] text-[#a19382] hover:border-amber-900/80'
                    }`}
                  >
                    <div>{v.size}</div>
                    <div className="text-[10px] opacity-75">₹{v.price.toLocaleString('en-IN')}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-6 pt-4 border-t border-[#231b14] flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-[#7d7062] uppercase tracking-wider">Price (Incl. Taxes)</div>
            <div className="text-xl font-serif font-bold text-amber-300">
              ₹{selectedVariant.price.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02]'
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBagIcon className="w-4 h-4 text-black" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

