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
      {/* Soft warm backdrop with subtle blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-[#FAF6EE] border-l border-[#DFD1B8] text-[#2C1D0E] shadow-[0_0_50px_rgba(44,29,14,0.18)] flex flex-col justify-between overflow-y-auto">
          
          {/* Top Bar with Brand Logo & Minimalist Close Button */}
          <div>
            <div className="p-5 sm:p-6 border-b border-[#E8DDCA] flex items-center justify-between bg-[#FFFDF9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Abu Haani Parfumerie"
                className="h-9 sm:h-10 w-auto object-contain hover:scale-105 transition duration-300 drop-shadow-xs"
              />

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#F5EFE4] border border-[#DFCBA0] text-[#7A6045] hover:text-[#2C1D0E] hover:border-[#B88325] hover:bg-[#EAE1D2] flex items-center justify-center transition active:scale-95 shadow-xs"
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

                <nav className="space-y-1.5">
                  {/* Home */}
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onClose();
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-[#FFFDF9] text-[#2C1D0E] hover:text-[#B88325] font-serif text-base tracking-wide flex items-center justify-between transition group border border-transparent hover:border-[#E8DDCA]"
                  >
                    <span className="font-semibold">Home</span>
                    <span className="text-[#A6886A] group-hover:text-[#B88325] group-hover:translate-x-1 transition text-xs">→</span>
                  </button>

                  {/* Our Top Collection (Main Link) */}
                  <button
                    onClick={() => {
                      onSelectCollection();
                      onClose();
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] hover:border-[#B88325] text-[#2C1D0E] hover:text-[#B88325] font-serif text-base tracking-wide flex items-center justify-between transition group shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-bold text-[#8A5F1A]">Our Top Collection</span>
                      <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FAF0D8] text-[#8A5F1A] font-sans font-bold border border-[#E5CCA0]">
                        Pure 6ml
                      </span>
                    </span>
                    <span className="text-[#8A5F1A] group-hover:translate-x-1 transition text-xs font-bold">→</span>
                  </button>

                  {/* Individual Signature Attars Quick Jump */}
                  <div className="pt-2 pl-3 space-y-1 border-l-2 border-[#E5CCA0] ml-4 my-1.5">
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
                        className="block px-3 py-2 rounded-xl hover:bg-[#FFFDF9] text-[#5C442D] hover:text-[#8A5F1A] transition group border border-transparent hover:border-[#E8DDCA]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif font-bold text-[#2C1D0E] group-hover:text-[#8A5F1A]">{attar.name}</span>
                          <span className="text-[10px] text-[#A6886A] font-sans">6 ml</span>
                        </div>
                        <p className="text-[10px] text-[#8C765C] font-sans line-clamp-1">{attar.desc}</p>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Category: Customer Care & Concierge */}
              <div className="pt-3 border-t border-[#E8DDCA]">
                <p className="text-[10px] uppercase tracking-widest text-[#B88325] font-bold font-sans mb-3 px-3">
                  ✦ Client Services & Heritage
                </p>

                <nav className="space-y-2">
                  {/* WhatsApp VIP Concierge */}
                  <a
                    href="https://wa.me/919999999999?text=Hello%20Abu%20Haani%2C%20I%20need%20assistance%20with%20choosing%20an%20artisanal%20attar"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-left px-4 py-3 rounded-xl bg-emerald-50/70 border border-emerald-200/90 text-emerald-900 hover:bg-emerald-100/70 font-serif text-sm tracking-wide flex items-center justify-between transition group shadow-xs"
                  >
                    <span className="flex items-center gap-2.5">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">WhatsApp VIP Concierge</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-sans font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Now
                    </span>
                  </a>

                  {/* 100% Non-Alcoholic Guarantee */}
                  <div className="px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] text-xs text-[#5C442D] flex items-center gap-2.5 shadow-xs">
                    <ShieldCheckIcon className="w-4 h-4 text-[#B88325] shrink-0" />
                    <span className="text-[11px] leading-snug">
                      <strong className="text-[#2C1D0E]">100% Pure Alcohol-Free:</strong> Handcrafted with royal heritage distillation traditions.
                    </span>
                  </div>
                </nav>
              </div>

            </div>
          </div>

          {/* Drawer Footer: Quiet Luxury Authenticity */}
          <div className="p-5 border-t border-[#E8DDCA] bg-[#F2EBE0] space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-[#7A6045]">
              <span className="flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5 text-[#B88325]" />
                <span className="font-bold text-[#2C1D0E]">Free Shipping on ₹999+</span>
              </span>
              <span className="text-[10px] font-semibold text-[#8A5F1A] px-2 py-0.5 rounded-md bg-[#FAF0D8] border border-[#E5CCA0]">
                Cash on Delivery
              </span>
            </div>

            <p className="text-[10px] text-[#8C765C] leading-relaxed">
              Abu Haani Parfumerie crafts pure, long-lasting attars honoring centuries of artisanal perfumery.
            </p>

            <div className="text-[10px] text-[#A6886A] pt-1">
              © 2026 Abu Haani Parfumerie. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
