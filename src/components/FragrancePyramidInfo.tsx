'use client';

import React from 'react';
import { SparklesIcon } from './Icons';

export const FragrancePyramidInfo: React.FC = () => {
  return (
    <section id="pyramid-guide" className="py-20 bg-[#0d0a07] border-b border-[#2b231a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">
            <SparklesIcon className="w-4 h-4" />
            <span>Fragrance Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#fcf9f2]">
            The 3-Tier Olfactory Journey
          </h2>
          <p className="mt-4 text-[#a89a87] text-sm sm:text-base leading-relaxed">
            Unlike commercial alcohol perfumes that evaporate within 2 hours, true concentrated attars bloom in distinct layers across your skin over 18+ hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Top Notes */}
          <div className="p-8 rounded-2xl bg-[#14100c] border border-amber-900/40 relative group hover:border-amber-500/50 transition duration-300">
            <div className="text-xs uppercase tracking-widest text-amber-400/80 font-bold mb-2">Tier 01 * First Impression</div>
            <h3 className="text-2xl font-serif text-[#f5deb3] mb-3">Top Notes</h3>
            <p className="text-xs text-amber-300/70 font-mono mb-4">Duration: Initial 15 - 30 Minutes</p>
            <p className="text-sm text-[#9c8e7c] leading-relaxed">
              The first aromatic burst upon application. Fresh florals, crisp spices, and bright citrus that captivate your senses immediately.
            </p>
            <div className="mt-6 pt-4 border-t border-[#231b14] flex flex-wrap gap-2 text-xs text-amber-200/90 font-medium">
              <span className="px-2.5 py-1 rounded bg-[#1f1710] border border-amber-900/60">Bergamot</span>
              <span className="px-2.5 py-1 rounded bg-[#1f1710] border border-amber-900/60">Saffron</span>
              <span className="px-2.5 py-1 rounded bg-[#1f1710] border border-amber-900/60">Pink Rose</span>
            </div>
          </div>

          {/* Heart Notes */}
          <div className="p-8 rounded-2xl bg-[#17120e] border border-amber-500/30 relative group hover:border-amber-400/60 transition duration-300 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">Tier 02 * The Soul</div>
            <h3 className="text-2xl font-serif text-[#fcf9f2] mb-3">Heart Notes</h3>
            <p className="text-xs text-amber-300 font-mono mb-4">Duration: 30 Mins - 5 Hours</p>
            <p className="text-sm text-[#baa995] leading-relaxed">
              The true personality of the attar that blends with your body heat. Rich Damascus roses, honeyed tobaccos, and intoxicating white lilies.
            </p>
            <div className="mt-6 pt-4 border-t border-[#2e2318] flex flex-wrap gap-2 text-xs text-amber-200 font-medium">
              <span className="px-2.5 py-1 rounded bg-[#291e13] border border-amber-700/60">Damascena Rose</span>
              <span className="px-2.5 py-1 rounded bg-[#291e13] border border-amber-700/60">Egyptian Lotus</span>
              <span className="px-2.5 py-1 rounded bg-[#291e13] border border-amber-700/60">Spiced Cardamom</span>
            </div>
          </div>

          {/* Base Notes */}
          <div className="p-8 rounded-2xl bg-[#14100c] border border-amber-900/40 relative group hover:border-amber-500/50 transition duration-300">
            <div className="text-xs uppercase tracking-widest text-amber-400/80 font-bold mb-2">Tier 03 * The Eternal Sillage</div>
            <h3 className="text-2xl font-serif text-[#f5deb3] mb-3">Base Notes</h3>
            <p className="text-xs text-amber-300/70 font-mono mb-4">Duration: 5 - 24+ Hours</p>
            <p className="text-sm text-[#9c8e7c] leading-relaxed">
              The deepest, heaviest molecular compounds. Aged wild Cambodian agarwood, Mysore sandalwood, and warm royal amber that lingers indefinitely on clothes.
            </p>
            <div className="mt-6 pt-4 border-t border-[#231b14] flex flex-wrap gap-2 text-xs text-amber-200/90 font-medium">
              <span className="px-2.5 py-1 rounded bg-[#1f1710] border border-amber-900/60">Cambodian Agarwood</span>
              <span className="px-2.5 py-1 rounded bg-[#1f1710] border border-amber-900/60">Mysore Sandalwood</span>
              <span className="px-2.5 py-1 rounded bg-[#1f1710] border border-amber-900/60">White Amber</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

