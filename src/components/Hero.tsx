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
    <section className="relative w-full bg-[#0A0704] overflow-hidden select-none border-b border-[#2B1D10]">
      
      {/* Cinematic Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(226,184,88,0.14)_0%,_rgba(10,7,4,0.98)_70%)] pointer-events-none" />

      {/* 
        ========================================================================
        HERO VIDEO CONTAINER
        - Exact Native Video Ratio: 1:1 Aspect Ratio (720x720)
        - Mobile: Fits width smoothly without any horizontal or vertical crop
        - Desktop / PC: Automatically scales with min(94vw, calc(100vh - 150px), 540px)
          so the ENTIRE video is 100% visible at a single glance without scrolling!
        - Zero text overlays: Video is 100% clean and unobstructed
        ========================================================================
      */}
      <div className="relative w-full py-2 sm:py-4 px-2 sm:px-4 flex flex-col items-center justify-center">
        
        {/* Clickable Video Frame that links directly to Top Collection */}
        <div
          onClick={onExplore}
          className="relative mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.85)] border border-[#DEC99D]/40 bg-[#120D08] cursor-pointer group transition-transform duration-300 hover:scale-[1.01] flex items-center justify-center"
          style={{
            width: 'min(94vw, calc(100vh - 145px), 540px)',
            height: 'min(94vw, calc(100vh - 145px), 540px)',
            maxWidth: '100%',
            aspectRatio: '1 / 1',
          }}
          title="Click to explore Our Top Collection"
        >
          {/* Native 1:1 Zero-Lag FastStart Web Video - Perfectly Fitted in Card Edge to Edge */}
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
