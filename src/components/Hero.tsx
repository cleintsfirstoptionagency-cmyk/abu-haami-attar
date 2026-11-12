'use client';

import React from 'react';

export const Hero: React.FC<{ onExplore: () => void }> = () => {
  return (
    <section className="relative w-full bg-[#0A0704] flex flex-col items-center justify-center overflow-hidden border-b border-[#2B1D10]">
      {/* 
        Clean Hero Banner:
        - Exact image uploaded by user (hero-banner.jpg)
        - Fits completely without messy text overlays blocking the bottle
        - Fully responsive: fits beautifully on mobile and expands gracefully on desktop
      */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="relative w-full overflow-hidden flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-banner.jpg"
            alt="Abu Haani White Oudh Artisanal Attar"
            className="w-full h-auto max-h-[75vh] sm:max-h-[82vh] object-contain sm:object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};
