'use client';

import React from 'react';
import { SparklesIcon, WhatsAppIcon, ShieldCheckIcon } from './Icons';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsAppGuide: () => void;
  onSelectCollection: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenWhatsAppGuide,
  onSelectCollection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#120B06] border-l border-[#362312] text-[#F8F4EC] shadow-2xl flex flex-col justify-between">
          
          {/* Top Bar with Logo & Close */}
          <div>
            <div className="p-5 border-b border-[#28180C] flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Abu Haani"
                className="h-8 w-auto object-contain hover:brightness-110 transition"
              />

              <button
                onClick={onClose}
                className="p-2 text-[#8C765C] hover:text-[#E2B858] rounded-full hover:bg-white/5 transition"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Links */}
            <nav className="p-5 space-y-2">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onClose();
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#1E130A] text-[#F8F4EC] hover:text-[#E2B858] font-serif text-base tracking-wide flex items-center justify-between transition group"
              >
                <span>Home</span>
                <span className="text-[#8C765C] group-hover:text-[#E2B858] text-xs">→</span>
              </button>

              <button
                onClick={() => {
                  onSelectCollection();
                  onClose();
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#1E130A] text-[#F8F4EC] hover:text-[#E2B858] font-serif text-base tracking-wide flex items-center justify-between transition group"
              >
                <span className="flex items-center gap-2">
                  <span>Our Collection</span>
                  <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#E2B858]/20 text-[#E2B858] font-sans font-bold">
                    Pure 6ml
                  </span>
                </span>
                <span className="text-[#8C765C] group-hover:text-[#E2B858] text-xs">→</span>
              </button>

              <button
                onClick={() => {
                  window.open('https://wa.me/919999999999?text=Hello%20Abu%20Haani%2C%20I%20want%20to%20order%20artisanal%20attar', '_blank');
                  onClose();
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#1E130A] text-[#F8F4EC] hover:text-[#E2B858] font-serif text-base tracking-wide flex items-center justify-between transition group"
              >
                <span className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </span>
                <span className="text-xs text-emerald-400 font-sans font-semibold">Live</span>
              </button>

              <button
                onClick={() => {
                  onSelectCollection();
                  onClose();
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#1E130A] text-[#F8F4EC] hover:text-[#E2B858] font-serif text-base tracking-wide flex items-center justify-between transition group"
              >
                <span>Best Sellers (Oud & Rose)</span>
                <span className="text-[#8C765C] group-hover:text-[#E2B858] text-xs">→</span>
              </button>

              <div className="pt-2 pb-1 border-t border-[#28180C] my-2" />

              {/* Order Tracking & Automation Integration */}
              <button
                onClick={() => {
                  onOpenWhatsAppGuide();
                  onClose();
                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-[#1C120A] border border-[#3A2514] hover:border-[#E2B858]/60 text-[#E2B858] text-xs tracking-wide flex items-center justify-between transition group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheckIcon className="w-4 h-4 text-[#E2B858]" />
                  <div>
                    <p className="font-bold font-sans">WhatsApp Bot & Anti-RTO</p>
                    <p className="text-[10px] text-[#A6886A]">COD Verification & Tracking Webhooks</p>
                  </div>
                </div>
                <span className="text-[11px] font-sans font-bold">Configure</span>
              </button>
            </nav>
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-[#28180C] bg-[#0A0603] space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#A6886A]">
              <SparklesIcon className="w-4 h-4 text-[#E2B858] shrink-0" />
              <span>100% Artisanal Non-Alcoholic Attar</span>
            </div>
            <p className="text-[11px] text-[#705842]">
              Handcrafted with pure distillation. Insured Courier Across India on Orders ₹999+.
            </p>
            <div className="text-[10px] text-[#554030] pt-1">
              © 2025 Abu Haani. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
