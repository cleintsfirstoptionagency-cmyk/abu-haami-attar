'use client';

import React from 'react';
import { ShoppingBagIcon } from './Icons';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWhatsAppGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenWhatsAppGuide }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0907]/95 backdrop-blur-md border-b border-[#2b2116]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Mobile Hamburger Icon (As in uploaded image 1) */}
        <button
          onClick={onOpenWhatsAppGuide}
          className="p-2 -ml-2 rounded-lg text-[#d8cfbe] hover:text-amber-300 transition"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center: Brand Crest & Calligraphy (Matches uploaded image 1) */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-amber-500/50 bg-[#16120c] flex items-center justify-center text-amber-400 font-serif text-lg font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            ع
          </div>
          <span className="text-xl sm:text-2xl font-serif italic tracking-wide text-[#f5deb3] font-bold">
            Abu Haani
          </span>
        </div>

        {/* Right: Search & Cart Icons (Matches uploaded image 1) */}
        <div className="flex items-center gap-2">
          {/* Search Icon */}
          <button
            onClick={onOpenWhatsAppGuide}
            className="p-2 text-[#d8cfbe] hover:text-amber-300 transition"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-amber-300 hover:text-amber-200 transition"
            aria-label="Cart"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
