'use client';

import React from 'react';
import { WhatsAppIcon, SparklesIcon, ShieldCheckIcon } from './Icons';

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
      {/* Backdrop with dark blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-[#0D0804] border-l border-[#3A2412] text-[#F8F4EC] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto">
          
          {/* Top Bar with Brand Logo & Minimalist Close Button */}
          <div>
            <div className="p-5 sm:p-6 border-b border-[#2A180B] flex items-center justify-between bg-gradient-to-b from-[#180F07] to-[#0D0804]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Abu Haani Parfumerie"
                className="h-9 sm:h-10 w-auto object-contain hover:scale-105 transition duration-300 drop-shadow"
              />

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#1F1309] border border-[#422915] text-[#C9A979] hover:text-[#E2B858] hover:border-[#E2B858] flex items-center justify-center transition active:scale-95"
                aria-label="Close navigation"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Navigation */}
            <div className="p-5 sm:p-6 space-y-6">
              
              {/* Category: The Fragrance Collection */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#B88325] font-bold font-sans mb-3 px-3">
                  ✦ Signature Fragrances
                </p>

                <nav className="space-y-1">
                  {/* Home */}
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onClose();
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#1A1007] text-[#F8F4EC] hover:text-[#E2B858] font-serif text-base tracking-wide flex items-center justify-between transition group"
                  >
                    <span className="font-medium">Home</span>
                    <span className="text-[#8C765C] group-hover:text-[#E2B858] group-hover:translate-x-1 transition text-xs">→</span>
                  </button>

                  {/* Our Top Collection (Main Link) */}
                  <button
                    onClick={() => {
                      onSelectCollection();
                      onClose();
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#1A1007] border border-[#3A2412] hover:border-[#E2B858]/60 text-[#F8F4EC] hover:text-[#E2B858] font-serif text-base tracking-wide flex items-center justify-between transition group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-bold text-[#E2B858]">Our Top Collection</span>
                      <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#E2B858]/20 text-[#E2B858] font-sans font-bold border border-[#E2B858]/30">
                        All 5 Attars
                      </span>
                    </span>
                    <span className="text-[#E2B858] group-hover:translate-x-1 transition text-xs font-bold">→</span>
                  </button>

                  {/* Individual Signature Attars Quick Jump */}
                  <div className="pt-2 pl-3 space-y-0.5 border-l border-[#2E1B0E] ml-4 my-1">
                    {[
                      { name: 'White Oud', desc: 'Soft Floral & Velvet Musk', handle: 'white-oud-attar-6-ml' },
                      { name: 'Dream Oud', desc: 'Smoky Agarwood & Amber', handle: 'dream-oud-attar-6-ml' },
                      { name: 'Ameer Al Oud', desc: 'Royal Spiced Woods', handle: 'ameer-al-oud-attar-6-ml' },
                      { name: 'Ruh Gulab', desc: 'Pure Kannauj Damascena Rose', handle: 'ruh-gulab-attar-6-ml' },
                      { name: 'Turkish', desc: 'Rich Oriental Leather & Oud', handle: 'turkish-attar-6-ml' },
                    ].map((attar) => (
                      <a
                        key={attar.handle}
                        href={`/products/${attar.handle}`}
                        onClick={onClose}
                        className="block px-3 py-1.5 rounded-lg hover:bg-[#1A1007] text-[#C4AC8D] hover:text-[#E2B858] transition group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif font-medium">{attar.name}</span>
                          <span className="text-[10px] text-[#7C634B] font-sans group-hover:text-[#A88864]">6 ml</span>
                        </div>
                        <p className="text-[10px] text-[#7C634B] font-sans line-clamp-1">{attar.desc}</p>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Category: Customer Care & Concierge */}
              <div className="pt-3 border-t border-[#241508]">
                <p className="text-[10px] uppercase tracking-widest text-[#B88325] font-bold font-sans mb-3 px-3">
                  ✦ Client Services & Heritage
                </p>

                <nav className="space-y-1">
                  {/* WhatsApp VIP Concierge */}
                  <a
                    href="https://wa.me/919999999999?text=Hello%20Abu%20Haani%2C%20I%20need%20assistance%20with%20choosing%20an%20artisanal%20attar"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#1A1007] text-[#F8F4EC] hover:text-emerald-400 font-serif text-sm tracking-wide flex items-center justify-between transition group"
                  >
                    <span className="flex items-center gap-2.5">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp VIP Concierge</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-sans font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Available
                    </span>
                  </a>

                  {/* 100% Non-Alcoholic Guarantee */}
                  <div className="px-3.5 py-2 rounded-xl bg-[#140C06] border border-[#2A180B] text-xs text-[#A89074] flex items-center gap-2.5">
                    <ShieldCheckIcon className="w-4 h-4 text-[#E2B858] shrink-0" />
                    <span className="text-[11px] leading-snug">
                      100% Pure Distilled, Alcohol-Free Attars with 16+ Hours Longevity.
                    </span>
                  </div>
                </nav>
              </div>

            </div>
          </div>

          {/* Drawer Footer: Quiet Luxury Authenticity */}
          <div className="p-5 border-t border-[#241508] bg-[#080502] space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-[#A6886A]">
              <span className="flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5 text-[#E2B858]" />
                <span className="font-semibold">Free Express Delivery on ₹999+</span>
              </span>
              <span className="text-[10px] text-[#785E46]">Cash on Delivery</span>
            </div>

            <p className="text-[10px] text-[#634C37] leading-relaxed">
              Abu Haani Parfumerie creates timeless non-alcoholic artisanal attars using ancient heritage distillation traditions.
            </p>

            <div className="text-[10px] text-[#4A3727] pt-1">
              © 2026 Abu Haani Parfumerie. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
