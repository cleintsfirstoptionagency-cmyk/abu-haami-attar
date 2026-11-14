'use client';

import React, { useRef, useEffect } from 'react';

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee seamless autoplay on mobile (iOS/Android) and desktop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for strict browser autoplay policies
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden select-none bg-black">
      
      {/* 
        ========================================================================
        HERO VIDEO - FULL BLEED EDGE TO EDGE
        - Mobile: Full width 100% edge-to-edge (aspect-square), NO black outside space!
        - PC / Desktop: Full video on whole screen (w-full h-[65vh] md:h-[78vh] lg:h-[84vh])
        - Zero text overlays: Video is 100% clean and unobstructed
        - Clickable: Takes user directly to Our Top Collection
        ========================================================================
      */}
      <div
        onClick={onExplore}
        className="relative w-full cursor-pointer group"
        title="Click to explore Our Top Collection"
      >
        <div className="w-full aspect-square md:aspect-auto md:h-[75vh] lg:h-[82vh] overflow-hidden relative">
          {/* Native Zero-Lag FastStart Web Video */}
          <video
            ref={videoRef}
            src="/hero/combo.mp4"
            poster="/hero/combo-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>
      </div>

    </section>
  );
};
