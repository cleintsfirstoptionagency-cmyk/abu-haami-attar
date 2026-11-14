'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WhatsAppIcon } from './Icons';

export const Footer: React.FC<{ onOpenWhatsApp?: () => void }> = ({ onOpenWhatsApp }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#FAF6EE] text-[#5C442D] pt-12 pb-14 border-t border-[#DEC99D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================================================================== */}
        {/* 1. TOP TRUST GUARANTEE CARDS (4-Column)                              */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-6 px-4 sm:px-8 rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#DEC99D] text-center shadow-xs mb-10 sm:mb-12">
          
          {/* Badge 1: 100% Authentic */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2.5 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF0D8] border border-[#E5CCA0] flex items-center justify-center text-[#8A5F1A] shrink-0 shadow-xs">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">100% Alcohol-Free</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">Pure Artisanal Attar Oil</p>
            </div>
          </div>

          {/* Badge 2: Fast & Reliable Air Delivery */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2.5 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF0D8] border border-[#E5CCA0] flex items-center justify-center text-[#8A5F1A] shrink-0 shadow-xs">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">Fast Express Delivery</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">Within 4-5 Days All-India</p>
            </div>
          </div>

          {/* Badge 3: Cash on Delivery Available */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2.5 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF0D8] border border-[#E5CCA0] flex items-center justify-center text-[#8A5F1A] shrink-0 shadow-xs">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">Cash on Delivery</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">Pay at Doorstep Safely</p>
            </div>
          </div>

          {/* Badge 4: WhatsApp Support & Concierge */}
          <div className="flex flex-col sm:flex-row items-center sm:text-left gap-2.5 sm:gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF0D8] border border-[#E5CCA0] flex items-center justify-center text-[#8A5F1A] shrink-0 shadow-xs">
              <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#2C1D0E]">WhatsApp Helpline</p>
              <p className="text-[11px] text-[#7A634D] hidden sm:block">+91 99703 47703 (Live)</p>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. MAIN 4-COLUMN RICH E-COMMERCE FOOTER GRID                         */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12">
          
          {/* COLUMN 1: Brand & Heritage (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Abu Haani Parfumerie"
                className="h-11 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <p className="text-xs text-[#735A42] leading-relaxed max-w-sm">
              Purveyors of pure non-alcoholic artisanal attars and rare oriental perfumes. Handcrafted using ancient royal hydro-distillation traditions for an enduring 14-18 hour sillage.
            </p>

            {/* Helpline Box (Inspired by Fatima Calligrapher) */}
            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#8A5F1A] font-bold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Customer Support Helpline</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs">
                <a href="tel:+919970347703" className="font-bold text-[#2C1D0E] hover:text-[#8A5F1A] hover:underline">
                  +91 99703 47703
                </a>
                <span className="text-[#DEC99D] hidden sm:inline">•</span>
                <a
                  href="https://wa.me/919970347703?text=Hello%20Abu%20Haani%2C%20I%20need%20assistance%20with%20an%20attar%20order"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Support</span>
                </a>
              </div>
              <p className="text-[10px] text-[#8C765C]">Available Mon – Sun: 10:00 AM – 9:00 PM IST</p>
            </div>
          </div>

          {/* COLUMN 2: Signature Fragrance Collection (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8A5F1A] font-sans">
              ✦ Signature Fragrances
            </p>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'White Oud Attar – 6 ml', handle: 'white-oud-attar-6-ml', badge: 'Floral & Velvet Musk' },
                { name: 'Dream Oud Attar – 6 ml', handle: 'dream-oud-attar-6-ml', badge: 'Caramel Amber' },
                { name: 'Ameer Al Oud Attar – 6 ml', handle: 'ameer-al-oud-attar-6-ml', badge: 'Royal Spiced Woods' },
                { name: 'Ruh Gulab Attar – 6 ml', handle: 'ruh-gulab-attar-6-ml', badge: 'Damascena Rose' },
                { name: 'Turkish Attar – 6 ml', handle: 'turkish-attar-6-ml', badge: 'White Lotus & Oud' },
              ].map((item) => (
                <li key={item.handle}>
                  <Link
                    href={`/products/${item.handle}`}
                    className="group flex items-center justify-between py-1 text-[#5C442D] hover:text-[#8A5F1A] transition"
                  >
                    <span className="font-medium group-hover:translate-x-1 transition-transform">{item.name}</span>
                    <span className="text-[10px] text-[#A6886A] opacity-80">₹599</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link
                  href="/#collection"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8A5F1A] hover:underline"
                >
                  <span>Explore Full 5-Piece Box Set</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Customer Care & Policies (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8A5F1A] font-sans">
              ✦ Client Care & Help
            </p>
            <ul className="space-y-2 text-xs text-[#5C442D]">
              <li>
                <Link href="/#collection" className="hover:text-[#8A5F1A] transition hover:underline">
                  All Products
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919970347703?text=Hi%20Abu%20Haani%2C%20I%20want%20to%20track%20my%20order"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#8A5F1A] transition hover:underline flex items-center gap-1"
                >
                  <span>Track Your Order</span>
                </a>
              </li>
              <li>
                <span className="text-[#5C442D]">Shipping Policy (4-5 Days)</span>
              </li>
              <li>
                <span className="text-[#5C442D]">Cash on Delivery Terms</span>
              </li>
              <li>
                <span className="text-[#5C442D]">7-Day Safe Replacement</span>
              </li>
              <li>
                <span className="text-[#5C442D]">100% Halal Non-Alcoholic</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Newsletter & Payment Badges (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8A5F1A] font-sans">
              ✦ The Royal Circle
            </p>
            <p className="text-xs text-[#735A42] leading-relaxed">
              Subscribe to receive exclusive access to rare vintage harvest batches and special offers.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] focus:border-[#8A5F1A] focus:outline-none text-xs text-[#2C1D0E] placeholder-[#A6886A] shadow-2xs pr-24"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#8A5F1A] hover:bg-[#6E4B14] text-white text-[11px] font-bold transition shadow-xs cursor-pointer"
                >
                  {subscribed ? 'Subscribed!' : 'Join'}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-emerald-700 font-semibold">
                  ✓ Welcome to the Royal Circle! You will receive early harvest updates.
                </p>
              )}
            </form>

            {/* Verified Safe Payment Badges */}
            <div className="pt-2 border-t border-[#DEC99D]/70 space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-[#8C765C] font-semibold">
                Guaranteed Safe & Verified Payments
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-[#FFFDF9] border border-[#DEC99D] text-[#2C1D0E] font-bold">
                  Cash on Delivery
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FFFDF9] border border-[#DEC99D] text-emerald-800 font-bold">
                  UPI / GPay / PhonePe
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FFFDF9] border border-[#DEC99D] text-blue-800 font-bold">
                  Cards
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FFFDF9] border border-[#DEC99D] text-purple-800 font-bold">
                  NetBanking
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. BOTTOM BAR WITH COPYRIGHT & "MADE WITH LOVE BY ARSALAN"           */}
        {/* ==================================================================== */}
        <div className="pt-6 border-t border-[#DEC99D] flex flex-col md:flex-row items-center justify-between text-xs text-[#8C765C] gap-3 text-center">
          
          {/* Left: Copyright */}
          <div>
            © 2026 Abu Haani Parfumerie. All Rights Reserved.
          </div>

          {/* Center: Made with Love by Arsalan */}
          <div className="text-xs font-bold text-[#8A5F1A] bg-[#FFFDF9] px-4 py-1.5 rounded-full border border-[#DEC99D] shadow-2xs">
            Made with ❤️ by Arsalan
          </div>

          {/* Right: Policy Links */}
          <div className="flex items-center gap-4 text-[11px] text-[#7A634D]">
            <span>100% Artisanal Quality</span>
            <span>•</span>
            <span>Fast Express Shipping</span>
            <span>•</span>
            <a
              href="https://wa.me/919970347703"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#8A5F1A] hover:underline"
            >
              VIP Support
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};