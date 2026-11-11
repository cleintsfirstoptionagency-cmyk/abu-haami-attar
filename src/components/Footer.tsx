'use client';

import React from 'react';
import { ShieldCheckIcon, TruckIcon, WhatsAppIcon, SparklesIcon } from './Icons';

export const Footer: React.FC<{ onOpenWhatsApp: () => void }> = ({ onOpenWhatsApp }) => {
  return (
    <footer className="bg-[#070504] border-t border-[#261d15] text-[#9c8e7c] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1f1710]">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-amber-500/40 bg-[#16120c] flex items-center justify-center text-amber-400 font-serif text-lg font-bold">
                ع
              </div>
              <span className="text-xl font-serif tracking-[0.2em] text-[#f5deb3] font-bold uppercase">
                AL-ATTAR
              </span>
            </div>
            <p className="text-xs text-[#8c7e6e] leading-relaxed">
              Purveyors of rare, non-alcoholic artisanal attars and pure oud oils. Distilled using ancient Deg-Bhapka hydro-distillation techniques.
            </p>
            <div className="text-xs text-amber-300/80 font-mono">
              Pure • Alcohol-Free • Artisanal
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#fcf9f2]">Artisanal Oils</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#collection" className="hover:text-amber-300 transition">Wild Cambodian Agarwood</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition">Hydro-distilled Kannauj Rose</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition">Kasturi White Musk</a></li>
              <li><a href="#collection" className="hover:text-amber-300 transition">Mitti Attar (Petrichor)</a></li>
            </ul>
          </div>

          {/* Col 3: Logistics & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#fcf9f2]">Automated Logistics</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#a89987]">
                <TruckIcon className="w-4 h-4 text-amber-400" />
                <span>Delhivery & Shiprocket Connected</span>
              </div>
              <div className="flex items-center gap-2 text-[#a89987]">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                <span>COD Anti-RTO Verified</span>
              </div>
              <button
                onClick={onOpenWhatsApp}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-900 transition"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Test WhatsApp Flow</span>
              </button>
            </div>
          </div>

          {/* Col 4: Payments & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#fcf9f2]">Secure Payments</h4>
            <p className="text-xs text-[#8c7e6e]">
              Powered by Shopify PCI-DSS Level 1 Compliant Hosted Checkout.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-amber-200">
              <span className="px-2 py-1 rounded bg-[#16110c] border border-amber-900/50">UPI (GPay/PhonePe)</span>
              <span className="px-2 py-1 rounded bg-[#16110c] border border-amber-900/50">Razorpay</span>
              <span className="px-2 py-1 rounded bg-[#16110c] border border-amber-900/50">Cards / NetBanking</span>
              <span className="px-2 py-1 rounded bg-[#16110c] border border-amber-900/50">Cash On Delivery</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6b6053] gap-4">
          <p>© 2026 Al-Attar Parfumerie. All rights reserved.</p>
          <div className="flex items-center gap-2 text-amber-500/80">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Built with Next.js & Shopify Storefront GraphQL Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

