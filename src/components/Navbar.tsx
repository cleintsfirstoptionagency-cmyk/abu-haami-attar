'use client';

import React from 'react';
import { ShoppingBagIcon, SparklesIcon } from './Icons';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWhatsAppGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenWhatsAppGuide }) => {
  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* 1. Header Announcement Strip (Strictly ONE SINGLE LINE) */}
      <div className="bg-[#120B05] text-[#E2B858] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium border-b border-[#362312] overflow-hidden whitespace-nowrap">
        <div className="inline-flex items-center justify-center gap-2 max-w-full truncate">
          <SparklesIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="truncate tracking-wide font-sans">
            Free Insured Courier Across India on Orders ₹999+ &nbsp;•&nbsp; 100% Pure Non-Alcoholic Artisanal Attar
          </span>
          <SparklesIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        </div>
      </div>

      {/* 2. Main Navbar Strip (Exact Match with Uploaded Reference Image) */}
      <div className="bg-[#0A0704]/95 backdrop-blur-md border-b border-[#2B1D10] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-16 sm:h-18 flex items-center justify-between">
          
          {/* Left: Golden Emblem + Abu Haani Script (Exact Image Match) */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            {/* Golden Flowing Emblem */}
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/60 bg-gradient-to-br from-[#291B0F] to-[#120B05] flex items-center justify-center text-[#E5C158] font-serif text-lg font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)] shrink-0">
              ع
            </div>
            {/* Abu Haani Italic Brand Title */}
            <span className="text-2xl sm:text-3xl font-serif italic font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7BE] via-[#E2B858] to-[#D4AF37]">
              Abu Haani
            </span>
          </div>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-widest text-[#D4C3AC] uppercase font-semibold">
            <a href="#collection" className="hover:text-[#E2B858] transition-colors">Artisanal Oils</a>
            <a href="#pyramid-guide" className="hover:text-[#E2B858] transition-colors">Scent Pyramid</a>
            <a href="#why-us" className="hover:text-[#E2B858] transition-colors">Our Craft</a>
          </nav>

          {/* Right Side: [ Search ] -> [ Cart with Gold Badge ] -> [ Hamburger Menu ] (Exact Image Order) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* 1. Search Icon */}
            <button
              onClick={onOpenWhatsAppGuide}
              className="p-1.5 text-[#E6DAC8] hover:text-[#E2B858] transition"
              aria-label="Search"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* 2. Cart Icon with Round Golden Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 text-[#E6DAC8] hover:text-[#E2B858] transition"
              aria-label="Cart"
            >
              {/* Shopping cart outline matching the image */}
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6DAC8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* Round Golden Badge */}
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#E5B955] text-[#2C1D0E] text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            </button>

            {/* 3. Hamburger Menu (3 clean horizontal lines on the far right) */}
            <button
              onClick={onOpenWhatsAppGuide}
              className="p-1.5 text-[#E6DAC8] hover:text-[#E2B858] transition ml-0.5"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
