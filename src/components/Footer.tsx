'use client';

import React from 'react';
import { WhatsAppIcon } from './Icons';

export const Footer: React.FC<{ onOpenWhatsApp: () => void }> = ({ onOpenWhatsApp }) => {
  return (
    <footer className="bg-[#F8F4EC] text-[#5C442D] pt-10 pb-16 border-t border-[#E8DCBE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Trust Badges (Matches Reference Image) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-6 px-4 sm:px-8 rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#E0CFB3] text-center shadow-xs mb-10">
          {/* Badge 1: 100% Authentic */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E3] border border-[#D9C496] flex items-center justify-center text-[#B88325] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">100% Authentic</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">Guaranteed Pure Perfume Oil</p>
            </div>
          </div>

          {/* Badge 2: Fast & Reliable Delivery */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E3] border border-[#D9C496] flex items-center justify-center text-[#B88325] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">Fast & Reliable</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">Delhivery Air Across India</p>
            </div>
          </div>

          {/* Badge 3: Secure Payments */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E3] border border-[#D9C496] flex items-center justify-center text-[#B88325] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">Secure Payments</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">UPI, COD & Cards Safe</p>
            </div>
          </div>

          {/* Badge 4: Dedicated Support */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E3] border border-[#D9C496] flex items-center justify-center text-[#B88325] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">Dedicated Support</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">WhatsApp Concierge Help</p>
            </div>
          </div>
        </div>

        {/* Ornate Curved Arch Banner with Official Abu Haani 3D Logo */}
        <div className="rounded-3xl bg-gradient-to-b from-[#21160C] via-[#160E07] to-[#0D0804] border border-[#47301B] p-8 sm:p-12 text-center text-[#D9C5A7] shadow-xl">
          <div className="flex items-center justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Abu Haani"
              className="h-10 sm:h-12 w-auto object-contain brightness-110"
            />
          </div>

          <p className="text-xs sm:text-sm text-[#A8947C] max-w-md mx-auto mb-6">
            Purveyors of pure non-alcoholic artisanal attars and rare perfumes. Hand-distilled using ancient royal heritage traditions.
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 text-[#E2B858] mb-6">
            <a
              href="https://wa.me/919999999999?text=Hello%20Abu%20Haani%2C%20I%20want%20to%20order%20artisanal%20attar"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-[#2C1E14] border border-[#5E4329] hover:bg-[#3D291A] transition"
              aria-label="WhatsApp Concierge"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-[#2C1E14] border border-[#5E4329] hover:bg-[#3D291A] transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          <p className="text-xs text-[#8C755D]">
            © 2026 Abu Haani Parfumerie. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
