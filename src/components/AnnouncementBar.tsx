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
    <div className="w-full bg-gradient-to-r from-[#F3CD68] via-[#FFF0B8] to-[#E5B542] text-[#221307] py-2 px-2 overflow-hidden shadow-sm border-y border-[#CFA032] select-none z-30 relative">
      <div className="animate-marquee-scroll flex items-center whitespace-nowrap">
        {/* Set 1 */}
        {tickerItems.map((text, idx) => (
          <div key={`item-1-${idx}`} className="inline-flex items-center gap-2.5 mx-4 sm:mx-6">
            <SparklesIcon className="w-3.5 h-3.5 text-[#8F6614] shrink-0 fill-current" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wide uppercase font-sans">
              {text}
            </span>
          </div>
        ))}

        {/* Set 2 (for seamless loop) */}
        {tickerItems.map((text, idx) => (
          <div key={`item-2-${idx}`} className="inline-flex items-center gap-2.5 mx-4 sm:mx-6">
            <SparklesIcon className="w-3.5 h-3.5 text-[#8F6614] shrink-0 fill-current" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wide uppercase font-sans">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

