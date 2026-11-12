'use client';

import React from 'react';
import { WhatsAppIcon } from './Icons';

export const Footer: React.FC<{ onOpenWhatsApp: () => void }> = ({ onOpenWhatsApp }) => {
  return (
    <footer className="bg-[#090807] text-[#9c8e7c] pt-10 pb-24">
      {/* 4 Trust Badges (Matches Image 1) */}
      <div className="max-w-md mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 px-4 rounded-2xl bg-[#120e0a] border border-[#2b2116] text-center">
          {/* Badge 1: 100% Authentic */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#1c150e] border border-amber-900/60 flex items-center justify-center text-amber-400 mb-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-[#f5deb3]">100% Authentic</p>
          </div>

          {/* Badge 2: Fast & Reliable Delivery */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#1c150e] border border-amber-900/60 flex items-center justify-center text-amber-400 mb-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-[#f5deb3]">Fast & Reliable</p>
          </div>

          {/* Badge 3: Secure Payments */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#1c150e] border border-amber-900/60 flex items-center justify-center text-amber-400 mb-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-[#f5deb3]">Secure Payments</p>
          </div>

          {/* Badge 4: Dedicated Support */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#1c150e] border border-amber-900/60 flex items-center justify-center text-amber-400 mb-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-[#f5deb3]">Dedicated Support</p>
          </div>
        </div>
      </div>

      {/* Ornate Curved Arch Banner (Matches Image 1) */}
      <div className="relative max-w-md mx-auto px-4">
        <div className="rounded-t-3xl bg-gradient-to-b from-[#1f1710] to-[#120e0a] border-t border-x border-amber-500/30 p-8 text-center shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full border border-amber-500/50 bg-[#16120c] flex items-center justify-center text-amber-400 font-serif text-lg font-bold">
              ع
            </div>
            <span className="text-2xl font-serif italic text-[#f5deb3] font-bold">
              Abu Haani
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 text-amber-300/80 mb-6">
            <button onClick={onOpenWhatsApp} className="p-2 rounded-full bg-[#14100c] border border-amber-900/60 hover:text-white transition">
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            </button>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-[#14100c] border border-amber-900/60 hover:text-white transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          <p className="text-[11px] text-[#786b5c]">
            © 2026 Abu Haani. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
