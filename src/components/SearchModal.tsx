'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AttarProduct } from '@/types/product';
import { SparklesIcon } from './Icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: AttarProduct[];
}

const POPULAR_SEARCHES = ['White Oud', 'Dream Oud', 'Ameer Al Oud', 'Ruh Gulab', 'Turkish'];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
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

  const handleProductClick = (handle: string) => {
    window.location.href = `/products/${handle}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/45 backdrop-blur-sm animate-fade-in select-none">
      {/* Backdrop click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl bg-[#FFFDF9] border border-[#DEC99D] rounded-3xl shadow-[0_20px_50px_rgba(44,29,14,0.18)] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DDCA] flex items-center gap-3 bg-[#FAF6EE]">
          <svg className="w-5 h-5 text-[#8A5F1A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artisanal attars (e.g. White Oud, Dream Oud)..."
            className="w-full bg-transparent text-[#2C1D0E] placeholder-[#8C765C] text-sm sm:text-base outline-none font-sans"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8C765C] hover:text-[#2C1D0E] transition"
              aria-label="Clear query"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7A6045] hover:text-[#2C1D0E] hover:bg-[#F2ECE0] transition"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 sm:px-5 py-3 border-b border-[#E8DDCA] bg-[#FFFDF9] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-[#8C765C] whitespace-nowrap font-medium">Popular:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-3 py-1 rounded-full text-xs bg-[#FAF6EE] border border-[#DEC99D] text-[#5C442D] hover:text-[#8A5F1A] hover:border-[#8A5F1A] hover:bg-[#FFF] transition whitespace-nowrap shadow-2xs"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3 flex-1 bg-[#FFFDF9]">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-[#8C765C]">
              <p className="text-sm">No artisanal attars found matching &ldquo;{query}&rdquo;.</p>
              <p className="text-xs mt-1 text-[#A6886A]">Try searching for &quot;White Oud&quot; or &quot;Rose&quot;.</p>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const variant = p.variants[0];
              return (
                <div
                  key={p.id}
                  onClick={() => handleProductClick(p.handle)}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#FAF6EE] border border-[#E8DDCA] hover:border-[#DEC99D] hover:bg-[#FFF] transition-all cursor-pointer group shadow-2xs"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded-xl border border-[#DEC99D] group-hover:scale-105 transition duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif font-bold text-[#2C1D0E] group-hover:text-[#8A5F1A] transition truncate">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#8C765C] line-clamp-1 mt-0.5">
                      {p.tagline || p.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#8A5F1A]">
                        ₹{variant?.price || 599}
                      </span>
                      <span className="text-[10px] text-[#A6886A]">6 ml</span>
                    </div>
                  </div>
                  <span className="text-[#A6886A] group-hover:text-[#8A5F1A] group-hover:translate-x-1 transition text-sm font-bold pr-2">
                    →
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="p-3 bg-[#FAF6EE] border-t border-[#E8DDCA] text-center text-xs text-[#8C765C] flex items-center justify-center gap-2">
          <SparklesIcon className="w-3.5 h-3.5 text-[#8A5F1A]" />
          <span>Press ESC or click outside to close</span>
        </div>

      </div>
    </div>
  );
};
