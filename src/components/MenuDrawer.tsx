'use client';

import React from 'react';
import Link from 'next/link';
import { WhatsAppIcon, SparklesIcon, ShieldCheckIcon } from './Icons';
import { INITIAL_SHOPIFY_PRODUCTS } from '@/lib/initialProducts';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCollection: () => void;
  onOpenWhatsAppGuide?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCollection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Soft warm backdrop with subtle blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-[#FAF6EE] border-l border-[#DFD1B8] text-[#2C1D0E] shadow-[0_0_50px_rgba(44,29,14,0.25)] flex flex-col justify-between overflow-y-auto">
          
          {/* 1. Header Bar: Brand Logo & Close Button */}
          <div className="p-4 sm:p-5 border-b border-[#E8DDCA] flex items-center justify-between bg-[#FFFDF9] sticky top-0 z-10 shadow-2xs">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Abu Haani Parfumerie"
                className="h-9 sm:h-10 w-auto object-contain hover:scale-105 transition duration-300"
              />
            </Link>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F5EFE4] border border-[#DFCBA0] text-[#7A6045] hover:text-[#2C1D0E] hover:border-[#8A5F1A] hover:bg-[#EAE1D2] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Close navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 2. Main Menu Scrollable Body */}
          <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
            
            {/* Quick Explore Buttons Row */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] hover:border-[#8A5F1A] text-xs font-bold text-[#2C1D0E] hover:text-[#8A5F1A] transition shadow-2xs text-center"
              >
                <span>🏠 Home</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  onSelectCollection();
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] hover:border-[#8A5F1A] text-xs font-bold text-[#8A5F1A] transition shadow-2xs text-center cursor-pointer"
              >
                <span>✨ All 5 Attars</span>
              </button>
            </div>

            {/* Featured Section: Products WITH Photos, Ratings & Prices */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[11px] uppercase tracking-wider text-[#8A5F1A] font-bold flex items-center gap-1.5">
                  <span>✦</span>
                  <span>Signature Collection</span>
                </p>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Pure 6ml • In Stock
                </span>
              </div>

              {/* Products List with High-Res Images */}
              <div className="space-y-2.5">
                {INITIAL_SHOPIFY_PRODUCTS.map((prod) => {
                  const price = prod.variants[0]?.price || 599;
                  return (
                    <Link
                      key={prod.handle}
                      href={`/products/${prod.handle}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 p-2.5 rounded-2xl bg-[#FFFDF9] border border-[#E8DDCA] hover:border-[#8A5F1A] hover:shadow-md transition-all duration-300"
                    >
                      {/* Product Image Thumbnail */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden bg-[#140E0A] border border-[#DFCBA0]/60">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.featuredImage || prod.images?.[0] || '/logo.png'}
                          alt={prod.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mb-0.5">
                          <span>★★★★★</span>
                          <span className="text-gray-500 font-semibold">(5.0)</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#2C1D0E] truncate group-hover:text-[#8A5F1A] transition">
                          {prod.title}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs sm:text-sm font-extrabold text-[#2C1D0E]">
                            ₹{price}
                          </span>
                          <span className="text-[10px] text-gray-400 line-through">
                            ₹999
                          </span>
                          <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 rounded border border-red-200">
                            -40%
                          </span>
                        </div>
                      </div>

                      {/* Arrow Cue */}
                      <div className="w-7 h-7 rounded-full bg-[#FAF6EE] group-hover:bg-[#8A5F1A] text-[#8A5F1A] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 border border-[#DFCBA0]">
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Client Services & Customer Concierge */}
            <div className="pt-3 border-t border-[#E8DDCA] space-y-2.5">
              <p className="text-[11px] uppercase tracking-wider text-[#8A5F1A] font-bold px-1 flex items-center gap-1.5">
                <span>✦</span>
                <span>Customer Care & Concierge</span>
              </p>

              {/* WhatsApp VIP Concierge */}
              <a
                href="https://wa.me/919970347703?text=Hello%20Abu%20Haani%2C%20I%20need%20assistance%20with%20an%20artisanal%20attar%20order"
                target="_blank"
                rel="noreferrer"
                className="w-full text-left px-4 py-3 rounded-2xl bg-emerald-50/80 border border-emerald-300/80 text-emerald-950 hover:bg-emerald-100 font-medium text-xs flex items-center justify-between transition group shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-emerald-900 leading-tight">WhatsApp Helpline</p>
                    <p className="text-[10px] text-emerald-700">+91 99703 47703</p>
                  </div>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold bg-white/80 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Chat
                </span>
              </a>

              {/* 100% Non-Alcoholic & COD Guarantee */}
              <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] text-xs text-[#5C442D] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4 text-[#8A5F1A] shrink-0" />
                  <span className="text-[11px] font-bold text-[#2C1D0E]">100% Pure Alcohol-Free Attar</span>
                </div>
                <p className="text-[10px] text-[#7A634D] leading-relaxed">
                  Traditional deg-bhapka hydro-distillation method. Enduring 14-18 hours royal sillage. Cash on Delivery available across all India pincodes.
                </p>
              </div>
            </div>

          </div>

          {/* 3. Drawer Footer: Delivery Info & Made with Love */}
          <div className="p-4 border-t border-[#E8DDCA] bg-[#F2EBE0] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#7A6045]">
              <span className="flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5 text-[#8A5F1A]" />
                <span className="font-bold text-[#2C1D0E]">Free Air Shipping on ₹999+</span>
              </span>
              <span className="text-[10px] font-semibold text-[#8A5F1A] px-2 py-0.5 rounded-md bg-[#FAF0D8] border border-[#E5CCA0]">
                Cash on Delivery
              </span>
            </div>

            <div className="pt-1.5 border-t border-[#E5CCA0]/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#8C765C] gap-1 text-center">
              <span>© 2026 Abu Haani Parfumerie.</span>
              <span className="font-semibold text-[#8A5F1A]">
                Made with ❤️ by Arsalan
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};