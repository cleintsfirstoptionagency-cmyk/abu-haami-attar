'use client';

import React, { useState, useEffect } from 'react';

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
      // When scrolled past hero, show sticky luxury black bar
      setIsScrolled(window.scrollY > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full select-none transition-all duration-300 ${
        isScrolled
          ? 'fixed top-0 inset-x-0 z-50 bg-[#0A0704]/95 backdrop-blur-md border-b border-[#2B1D10] shadow-[0_4px_25px_rgba(0,0,0,0.8)] py-1.5'
          : 'absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-black/85 via-black/35 to-transparent pt-3 pb-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Prominent Large Official 3D Gold Logo sitting on top of hero image */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer select-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Abu Haani"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 text-xs tracking-widest text-[#E6DAC8] uppercase font-semibold">
          <button
            onClick={onSelectCollection}
            className="hover:text-[#E2B858] transition-colors drop-shadow"
          >
            Our Top Collection
          </button>
          <button
            onClick={onOpenMenu}
            className="hover:text-[#E2B858] transition-colors drop-shadow"
          >
            About Heritage
          </button>
        </div>

        {/* Right Side: [ Search 🔍 ] -> [ Cart 🛒 with Gold Badge ] -> [ Menu ☰ ] */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* 1. Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#F5EADB] hover:text-[#E2B858] transition rounded-full hover:bg-black/30 active:scale-95"
            aria-label="Search artisanal attars"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* 2. Cart Button with Round Gold Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#F5EADB] hover:text-[#E2B858] transition rounded-full hover:bg-black/30 active:scale-95"
            aria-label="View Cart"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-gradient-to-r from-[#F5D88E] to-[#E2B858] text-[#2C1D0E] text-[10px] font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {cartCount}
            </span>
          </button>

          {/* 3. Luxury Hamburger Menu Button (☰) */}
          <button
            onClick={onOpenMenu}
            className="p-2 text-[#F5EADB] hover:text-[#E2B858] transition ml-0.5 rounded-full hover:bg-black/30 active:scale-95"
            aria-label="Open Navigation Menu"
          >
            <svg className="w-6 h-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>

      </div>
    </nav>
  );
};
