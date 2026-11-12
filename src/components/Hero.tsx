'use client';

import React from 'react';

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#16110c] via-[#0d0906] to-[#090807] pb-8 pt-4">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Luxury Hero Visual (Matches Image 1: Marble, incense, florals, floating White Oudh) */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] bg-radial from-[#241a10] to-[#0c0906] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.shopify.com/s/files/1/0852/1826/3299/files/2nd_de1f8517-6064-458b-898e-55c7a3326a9f.jpg?v=1794477876"
            alt="Abu Haani White Oudh 6ml"
            className="w-full h-full object-cover object-center scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#090807]/90 via-transparent to-black/20 pointer-events-none" />

          {/* Floating Subtle Headline at bottom of hero */}
          <div className="absolute bottom-6 left-4 right-4 text-center">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block mb-1">
              Hand-Crafted Artisanal Essence
            </span>
            <h2 className="text-2xl font-serif italic text-white drop-shadow-md">
              White Oudh 6ml
            </h2>
            <button
              onClick={onExplore}
              className="mt-3 px-6 py-2 rounded-full bg-gradient-to-r from-[#edd085] via-[#d4af37] to-[#b68826] text-black font-semibold text-xs tracking-wider shadow-lg active:scale-95 transition"
            >
              Order Now ->
            </button>
          </div>
        </div>

        {/* Carousel Pagination Dots (Matches Image 1) */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d2e1d]" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d2e1d]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d2e1d]" />
        </div>
      </div>
    </section>
  );
};
