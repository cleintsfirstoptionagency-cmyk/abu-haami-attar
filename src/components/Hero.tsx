'use client';

import React from 'react';
import { SparklesIcon, ShieldCheckIcon, TruckIcon } from './Icons';

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EC] to-[#F1E8D5] pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-20 border-b border-[#E8DCBE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 1 column on mobile, 2 columns on desktop/laptop! */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Desktop Storytelling & CTAs) */}
          <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D9C18C] bg-[#FAF3E3] text-[#7A5B1C] text-xs font-semibold tracking-wider uppercase mb-5 shadow-2xs">
              <SparklesIcon className="w-3.5 h-3.5 text-[#B88325]" />
              <span>Pure Non-Alcoholic Artisanal Distillations</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-[#2C1D0E] tracking-tight leading-[1.15]">
              The Lost Art of <span className="italic font-serif font-normal text-[#B88325]">Timeless Royal Scents</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[#6E553D] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Hand-crafted from pure aged agarwood, hydro-distilled Kannauj Damascus roses, and botanical musk. Formulated with zero alcohol for an intimate, 16+ hour projection.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onExplore}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] text-[#2C1D0E] font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition"
              >
                Shop Collection ->
              </button>
              <a
                href="#pyramid-guide"
                className="px-6 py-3.5 rounded-full border border-[#D4A037] text-[#5C442D] hover:bg-[#FAF3E3] font-semibold text-xs uppercase tracking-wider transition bg-white/70"
              >
                Scent Pyramid
              </a>
            </div>

            {/* Desktop Trust Row */}
            <div className="mt-10 pt-6 border-t border-[#E8DCC2] hidden sm:grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheckIcon className="w-5 h-5 text-[#B88325] shrink-0" />
                <span className="text-xs text-[#5C442D] font-semibold">100% Pure & Halal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <TruckIcon className="w-5 h-5 text-[#B88325] shrink-0" />
                <span className="text-xs text-[#5C442D] font-semibold">Express Courier Across India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-[#B88325] shrink-0">₹</span>
                <span className="text-xs text-[#5C442D] font-semibold">Cash On Delivery Available</span>
              </div>
            </div>
          </div>

          {/* Right Column (Hero Visual - Matches Uploaded Image) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#D9C496] shadow-[0_15px_40px_rgba(66,46,27,0.12)] bg-[#FFFDF9] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.shopify.com/s/files/1/0852/1826/3299/files/2nd_de1f8517-6064-458b-898e-55c7a3326a9f.jpg?v=1794477876"
                alt="Abu Haani White Oudh 6ml"
                className="w-full h-full object-cover object-center scale-102"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1D0E]/60 via-transparent to-transparent pointer-events-none" />

              {/* Tag at bottom of hero */}
              <div className="absolute bottom-5 left-4 right-4 text-center">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#F7E2B3] block mb-0.5">
                  Artisanal Harvest
                </span>
                <h3 className="text-xl sm:text-2xl font-serif italic text-white drop-shadow-md">
                  White Oudh 6ml
                </h3>
              </div>
            </div>

            {/* Carousel Pagination Dots (Matches Image 1) */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6C2A1]" />
              <span className="w-3 h-3 rounded-full bg-[#D4A037] shadow-xs" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6C2A1]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6C2A1]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
