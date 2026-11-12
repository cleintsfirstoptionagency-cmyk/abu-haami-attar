'use client';

import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './Icons';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  onSelectCollection: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenMenu,
  onSelectCollection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full select-none transition-all duration-300">
      {/* 1. Single-Line Top Announcement Strip */}
      <div className="bg-[#120B05] text-[#E2B858] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium border-b border-[#362312] overflow-hidden whitespace-nowrap">
        <div className="inline-flex items-center justify-center gap-2 max-w-full truncate">
          <SparklesIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="truncate tracking-wide font-sans">
            Free Insured Courier Across India on Orders ₹999+ &nbsp;•&nbsp; 100% Pure Non-Alcoholic Artisanal Attar
          </span>
          <SparklesIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        </div>
      </div>

      {/* 
        2. Main Navbar Strip:
        - When at top: transparent with subtle dark gradient overlay sitting over the hero photo
        - When scrolled: solid luxury black backdrop blur with crisp gold border
      */}
      <div
        className={`px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#0A0704]/95 backdrop-blur-md border-b border-[#2B1D10] shadow-md'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 sm:h-18 flex items-center justify-between">
          
          {/* Left: Official Gold 3D Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer select-none py-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Abu Haani"
              className="h-8 sm:h-10 w-auto object-contain hover:brightness-110 transition duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-widest text-[#D4C3AC] uppercase font-semibold">
            <button
              onClick={onSelectCollection}
              className="hover:text-[#E2B858] transition-colors"
            >
              Our Collection
            </button>
            <button
              onClick={onOpenMenu}
              className="hover:text-[#E2B858] transition-colors"
            >
              About Heritage
            </button>
          </nav>

          {/* Right Side: [ Search 🔍 ] -> [ Cart 🛒 with Gold Badge ] -> [ Menu ☰ ] */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* 1. Real Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-[#E6DAC8] hover:text-[#E2B858] transition rounded-full hover:bg-white/10"
              aria-label="Search artisanal attars"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* 2. Cart Icon with Round Gold Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 text-[#E6DAC8] hover:text-[#E2B858] transition rounded-full hover:bg-white/10"
              aria-label="View Cart"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6DAC8] drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#E5B955] text-[#2C1D0E] text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            </button>

            {/* 3. Real Luxury Hamburger Menu (3 clean horizontal lines on far right) */}
            <button
              onClick={onOpenMenu}
              className="p-1.5 text-[#E6DAC8] hover:text-[#E2B858] transition ml-0.5 rounded-full hover:bg-white/10"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-6 h-6 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
