'use client';

import React from 'react';
import { SparklesIcon } from './Icons';

export const AnnouncementBar: React.FC = () => {
  const tickerItems = [
    'Free Insured Courier Across India on Orders ₹999+',
    '100% Pure Non-Alcoholic Artisanal Attar',
    'Long-Lasting 16+ Hours Royal Longevity',
    'Cash on Delivery Available',
    'Handcrafted by Master Perfumers',
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#F3CD68] via-[#FFF0B8] to-[#E5B542] text-[#221307] py-1 sm:py-1.2 px-2 overflow-hidden shadow-2xs border-b border-[#CFA032]/70 select-none z-30 relative leading-none flex items-center">
      <div className="animate-marquee-scroll flex items-center whitespace-nowrap">
        {/* Set 1 */}
        {tickerItems.map((text, idx) => (
          <div key={`item-1-${idx}`} className="inline-flex items-center gap-1.5 mx-3 sm:mx-5">
            <SparklesIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8F6614] shrink-0 fill-current" />
            <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-wider uppercase font-sans">
              {text}
            </span>
          </div>
        ))}

        {/* Set 2 (for seamless loop) */}
        {tickerItems.map((text, idx) => (
          <div key={`item-2-${idx}`} className="inline-flex items-center gap-1.5 mx-3 sm:mx-5">
            <SparklesIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8F6614] shrink-0 fill-current" />
            <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-wider uppercase font-sans">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
