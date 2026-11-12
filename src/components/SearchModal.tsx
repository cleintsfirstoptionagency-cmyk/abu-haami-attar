'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AttarProduct, AttarVariant } from '@/types/product';
import { SparklesIcon } from './Icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: AttarProduct[];
  onAddToCart: (product: AttarProduct, variant: AttarVariant) => void;
}

const POPULAR_SEARCHES = ['White Oudh', 'Dream Oud', 'Ameer Al Oud', 'Ruh Gulab', 'Turkish'];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Backdrop click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl bg-[#140E0A] border border-[#3D2817] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-[#2D1E12] flex items-center gap-3">
          <svg className="w-5 h-5 text-[#E2B858] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artisanal attars (e.g. White Oudh, Dream Oud)..."
            className="w-full bg-transparent text-[#F8F4EC] placeholder-[#8C765C] text-sm sm:text-base outline-none font-sans"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8C765C] hover:text-[#F8F4EC] transition"
              aria-label="Clear query"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 text-[#8C765C] hover:text-[#E2B858] transition rounded-full hover:bg-white/5"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-[#0D0805] border-b border-[#24170D] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[#8C765C] font-serif italic shrink-0">Popular:</span>
          {POPULAR_SEARCHES.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#1C130B] hover:bg-[#2E1E12] text-[#D4AF37] border border-[#3D2817] shrink-0 transition"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-[#8C765C]">
              <SparklesIcon className="w-8 h-8 mx-auto text-[#7A5B1C] mb-2 opacity-50" />
              <p className="font-serif italic text-base">No attar found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#6B553F] mt-1">Try searching for &quot;White Oudh&quot; or check our collection.</p>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const variant = p.variants[0];
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#1A120B] border border-[#2D1E12] hover:border-[#B88325]/50 transition group"
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.featuredImage}
                      alt={p.title}
                      className="w-14 h-14 rounded-xl object-cover border border-[#3D2817]"
                    />
                    <div>
                      <h4 className="text-sm font-serif italic text-[#F8F4EC] font-bold group-hover:text-[#E2B858] transition">
                        {p.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#C99632] font-semibold mt-0.5">
                        <span>₹{variant.price.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] text-[#8C765C] font-normal">({variant.size})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(p, variant);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] text-[#2C1D0E] hover:brightness-105 active:scale-95 transition shadow-sm"
                  >
                    Buy Now
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0D0805] border-t border-[#24170D] text-center text-[11px] text-[#8C765C]">
          100% Pure Non-Alcoholic Artisanal Attars • Free Shipping ₹999+
        </div>

      </div>
    </div>
  );
};
