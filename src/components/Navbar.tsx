'use client';

import React from 'react';
import { ShoppingBagIcon, SparklesIcon, WhatsAppIcon } from './Icons';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWhatsAppGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenWhatsAppGuide }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DCBE] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#F5E8C9] via-[#EBD5A2] to-[#F5E8C9] text-[#422E1B] text-[11px] sm:text-xs py-2 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2 border-b border-[#DEC48E]/60">
        <SparklesIcon className="w-3.5 h-3.5 text-[#B88325]" />
        <span>Free Insured Courier Across India on Orders ₹999+ | 100% Pure Non-Alcoholic Artisanal Attar</span>
        <SparklesIcon className="w-3.5 h-3.5 text-[#B88325]" />
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Mobile Left: Hamburger Icon */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onOpenWhatsAppGuide}
            className="p-2 -ml-2 rounded-lg text-[#5C442D] hover:text-[#B88325] transition"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Brand Logo & Calligraphy (Centered on Mobile, Left-aligned on Desktop) */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4A037] bg-[#F7EED9] flex items-center justify-center text-[#B88325] font-serif text-xl font-bold shadow-xs">
            ع
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-serif italic tracking-wide text-[#2C1D0E] font-bold block leading-none">
              Abu Haani
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#8C6D3B] uppercase font-sans font-semibold">
              Royal Haute Parfumerie
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-widest text-[#5C442D] uppercase font-bold">
          <a href="#collection" className="hover:text-[#B88325] transition-colors py-1">Artisanal Oils</a>
          <a href="#pyramid-guide" className="hover:text-[#B88325] transition-colors py-1">Scent Pyramid</a>
          <a href="#why-us" className="hover:text-[#B88325] transition-colors py-1">The Craft</a>
          <button 
            onClick={onOpenWhatsAppGuide}
            className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Bot Flow</span>
          </button>
        </nav>

        {/* Right Actions (Search & Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Concierge (Desktop) */}
          <button
            onClick={onOpenWhatsAppGuide}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition shadow-2xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Order Bot</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenWhatsAppGuide}
            className="p-2 rounded-full text-[#5C442D] hover:bg-[#F2E7D0] transition"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#FAF3E3] border border-[#DEC795] text-[#3D2812] hover:border-[#B88325] hover:shadow-xs transition"
            aria-label="View shopping bag"
          >
            <ShoppingBagIcon className="w-5 h-5 text-[#8F661B]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4A037] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
