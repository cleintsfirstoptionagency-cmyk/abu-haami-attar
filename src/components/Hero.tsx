'use client';

import React from 'react';
import { SparklesIcon, ShieldCheckIcon, TruckIcon } from './Icons';

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 border-b border-[#2b231a] bg-radial from-[#1e1710] via-[#0b0907] to-[#050403]">
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/30 text-amber-300 text-xs tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Hand-Distilled Pure Concentrated Perfume Oils</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#fcf9f2] tracking-tight max-w-4xl mx-auto leading-[1.15]">
          The Lost Art of <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">Eternal Royal Scents</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#b8ab97] max-w-2xl mx-auto font-light leading-relaxed">
          Crafted from 100% natural wild agarwood, hydro-distilled Kannauj roses, and celestial white musk. Zero alcohol, zero synthetics — pure botanical majesty that stays with you from sunrise to midnight.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-semibold tracking-wider uppercase text-xs hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition duration-300 hover:scale-105"
          >
            Explore Pure Attars
          </button>
          <a
            href="#pyramid-guide"
            className="px-8 py-4 rounded-full border border-amber-500/30 text-amber-200 hover:border-amber-400/60 font-medium tracking-wider uppercase text-xs transition duration-300 bg-[#120f0b]/50"
          >
            How Fragrance Notes Work
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-10 border-t border-[#241e17] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#18130d] border border-amber-900/50 text-amber-400">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5deb3]">100% Pure & Halal</p>
              <p className="text-[11px] text-[#8c7f70]">0% Synthetic Alcohol</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#18130d] border border-amber-900/50 text-amber-400">
              <TruckIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5deb3]">Delhivery / Shiprocket</p>
              <p className="text-[11px] text-[#8c7f70]">Express 2-3 Day Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#18130d] border border-amber-900/50 text-amber-400">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5deb3]">16+ Hours Longevity</p>
              <p className="text-[11px] text-[#8c7f70]">Intense concentrated oil</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#18130d] border border-amber-900/50 text-amber-400">
              <span className="text-sm font-bold">₹</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5deb3]">COD & Prepaid</p>
              <p className="text-[11px] text-[#8c7f70]">Cash on Delivery Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

