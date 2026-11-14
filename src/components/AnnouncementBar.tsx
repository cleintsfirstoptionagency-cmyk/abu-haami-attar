'use client';

import React from 'react';
import { SparklesIcon } from './Icons';

export const AnnouncementBar: React.FC = () => {
  const tickerItems = [
    'Free Insured Courier Across India on Orders ₹999+',
    '100% Pure Non-Alcoholic Artisanal Attar',
    'Long-Lasting 16+ Hours Royal Longevity',
    'Cash on Delivery & Pre-Paid Available',
    'Handcrafted by Master Perfumers',
  ];

  return (
    <div className="w-full bg-[#F4EEDF] text-[#2C1D0E] py-2.5 px-2 overflow-hidden border-y border-[#DEC99D]/80 select-none relative z-30 shadow-xs">
      <div className="animate-marquee-scroll flex items-center whitespace-nowrap">
        {/* Set 1 */}
        {tickerItems.map((text, idx) => (
          <div key={`item-1-${idx}`} className="inline-flex items-center gap-2.5 mx-4 sm:mx-6">
            <span className="text-[#B88325] text-xs">✦</span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase font-sans text-[#2C1D0E]">
              {text}
            </span>
          </div>
        ))}

        {/* Set 2 (for seamless loop) */}
        {tickerItems.map((text, idx) => (
          <div key={`item-2-${idx}`} className="inline-flex items-center gap-2.5 mx-4 sm:mx-6">
            <span className="text-[#B88325] text-xs">✦</span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase font-sans text-[#2C1D0E]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

