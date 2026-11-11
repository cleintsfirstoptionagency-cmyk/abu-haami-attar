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
    <header className="sticky top-0 z-40 bg-[#090807]/90 backdrop-blur-md border-b border-[#2b231a]">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-[#211910] via-[#3d2f1b] to-[#211910] text-amber-200 text-xs py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2 border-b border-amber-900/40">
        <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
        <span>Free Insured Courier Across India on Orders ₹999+ | 100% Pure Non-Alcoholic Attar</span>
        <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-amber-500/40 bg-[#16120c] flex items-center justify-center text-amber-400 font-serif text-xl font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            ع
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-serif tracking-[0.25em] text-[#f5deb3] font-bold uppercase">
              AL-ATTAR
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-amber-400/80 uppercase font-sans">
              Royal Haute Parfumerie
            </span>
          </div>
        </div>

        {/* Center Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm tracking-widest text-[#d8cfbe] uppercase font-medium">
          <a href="#collection" className="hover:text-amber-300 transition-colors">Artisanal Oils</a>
          <a href="#pyramid-guide" className="hover:text-amber-300 transition-colors">Scent Pyramid</a>
          <a href="#why-us" className="hover:text-amber-300 transition-colors">Heritage Craft</a>
          <button 
            onClick={onOpenWhatsAppGuide}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp Flow</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* WhatsApp Concierge Quick Trigger */}
          <button
            onClick={onOpenWhatsAppGuide}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-medium hover:bg-emerald-900/60 transition"
            title="Preview Live WhatsApp Automations"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            <span className="font-sans">Auto Bot: Active</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#18140f] border border-amber-500/30 text-amber-300 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition"
            aria-label="View shopping bag"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

