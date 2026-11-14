'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

const HERO_SLIDES = [
  {
    id: 'white-oud',
    title: 'White Oud Attar – 6 ml',
    shortName: 'White Oud',
    handle: 'white-oud-attar-6-ml',
    price: 599,
    src: '/hero/1-white-oudh.jpg',
  },
  {
    id: 'dream-oud',
    title: 'Dream Oud Attar – 6 ml',
    shortName: 'Dream Oud',
    handle: 'dream-oud-attar-6-ml',
    price: 599,
    src: '/hero/2-dream-oud.jpg',
  },
  {
    id: 'ameer-al-oud',
    title: 'Ameer Al Oud Attar – 6 ml',
    shortName: 'Ameer Al Oud',
    handle: 'ameer-al-oud-attar-6-ml',
    price: 599,
    src: '/hero/3-ameer-al-oud.jpg',
  },
  {
    id: 'ruh-gulab',
    title: 'Ruh Gulab Attar – 6 ml',
    shortName: 'Ruh Gulab',
    handle: 'ruh-gulab-attar-6-ml',
    price: 599,
    src: '/hero/4-ruh-gulab.jpg',
  },
  {
    id: 'turkish',
    title: 'Turkish Attar – 6 ml',
    shortName: 'Turkish',
    handle: 'turkish-attar-6-ml',
    price: 599,
    src: '/hero/5-turkish.jpg',
  },
];

export const Hero: React.FC<{ onExplore: () => void }> = () => {
  // Mobile Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Sync current index when user scrolls or swipes on mobile
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex >= 0 && newIndex < HERO_SLIDES.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  }, [currentIndex]);

  const scrollToSlide = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % HERO_SLIDES.length;
    scrollToSlide(next);
  }, [currentIndex, scrollToSlide]);

  // Continuous auto-advance every 4.5s on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteracting.current && !isDragging.current) {
        handleNext();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [handleNext]);

  // Touch and Mouse drag support for mobile
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    isInteracting.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 8) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current || !scrollRef.current) return;
    isDragging.current = false;
    handleScroll();
    setTimeout(() => {
      isInteracting.current = false;
    }, 2000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isInteracting.current = true;
    hasMoved.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > 8 || dy > 8) {
      hasMoved.current = true;
    }
  };

  const handleTouchEnd = () => {
    handleScroll();
    setTimeout(() => {
      isInteracting.current = false;
    }, 2500);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className="relative w-full bg-[#0A0704] overflow-hidden select-none border-b border-[#2B1D10]">
      
      {/* 
        ========================================================================
        1. MOBILE VIEW (< lg): CLEAN LUXURY 1-BY-1 TOUCH SWIPE CAROUSEL
        ========================================================================
      */}
      <div className="block lg:hidden relative w-full">
        {/* Swipeable Carousel with Crystal Clear Photos - 100% Clickable to Product */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <a
              key={slide.id}
              href={`/products/${slide.handle}`}
              onClick={(e) => {
                if (hasMoved.current) {
                  e.preventDefault();
                }
              }}
              className="w-full shrink-0 snap-center flex items-center justify-center relative bg-[#0A0704] cursor-pointer"
              aria-label={`View ${slide.title}`}
            >
              <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={`Abu Haani ${slide.title} Artisanal Attar`}
                  className="w-full h-auto max-h-[76vh] object-contain object-center pointer-events-none"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 
        ========================================================================
        2. LAPTOP / DESKTOP VIEW (>= lg): CONTINUOUS MULTI-IMAGE INFINITE LOOP
        ========================================================================
      */}
      <div className="hidden lg:block relative w-full pt-20 pb-8 overflow-hidden">
        {/* Infinite Continuous Loop Track (Set 1 + Set 2) */}
        <div className="w-full overflow-hidden flex select-none cursor-pointer relative z-10">
          <div className="animate-hero-loop-track flex items-center gap-6 py-2 px-3">
            
            {/* Set 1: All 5 Images */}
            {HERO_SLIDES.map((slide) => (
              <a
                key={`loop-1-${slide.id}`}
                href={`/products/${slide.handle}`}
                className="w-[280px] xl:w-[310px] aspect-[4/5] shrink-0 rounded-3xl overflow-hidden relative border border-[#DFCBA0]/30 hover:border-[#E2B858] shadow-[0_10px_35px_rgba(0,0,0,0.8)] group transition-all duration-300 hover:scale-[1.03] block bg-[#140E0A]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Info & Buy Now Button at Bottom of Each Card */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10">
                  <div>
                    <h3 className="text-sm font-serif italic font-bold text-[#F8F4EC] group-hover:text-[#E2B858] transition">
                      {slide.shortName}
                    </h3>
                    <p className="text-xs text-[#E2B858] font-bold font-sans">
                      ₹{slide.price} (6ml)
                    </p>
                  </div>

                  <span className="px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wide bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] text-[#221307] shadow-md flex items-center gap-1 border border-[#FFF0B8]/80 group-hover:brightness-110 transition">
                    <span>Buy Now</span>
                    <span className="text-xs font-black">→</span>
                  </span>
                </div>
              </a>
            ))}

            {/* Set 2: Seamless Infinite Duplicate */}
            {HERO_SLIDES.map((slide) => (
              <a
                key={`loop-2-${slide.id}`}
                href={`/products/${slide.handle}`}
                className="w-[280px] xl:w-[310px] aspect-[4/5] shrink-0 rounded-3xl overflow-hidden relative border border-[#DFCBA0]/30 hover:border-[#E2B858] shadow-[0_10px_35px_rgba(0,0,0,0.8)] group transition-all duration-300 hover:scale-[1.03] block bg-[#140E0A]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Info & Buy Now Button at Bottom of Each Card */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10">
                  <div>
                    <h3 className="text-sm font-serif italic font-bold text-[#F8F4EC] group-hover:text-[#E2B858] transition">
                      {slide.shortName}
                    </h3>
                    <p className="text-xs text-[#E2B858] font-bold font-sans">
                      ₹{slide.price} (6ml)
                    </p>
                  </div>

                  <span className="px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wide bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] text-[#221307] shadow-md flex items-center gap-1 border border-[#FFF0B8]/80 group-hover:brightness-110 transition">
                    <span>Buy Now</span>
                    <span className="text-xs font-black">→</span>
                  </span>
                </div>
              </a>
            ))}

          </div>
        </div>

      </div>

      {/* 
        ========================================================================
        3. HERO TRUST BADGE PILL STRIP (Exact Match to Reference Image)
        ========================================================================
      */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 pt-3 pb-5 sm:pb-6 relative z-20">
        <div className="w-full rounded-2xl sm:rounded-full bg-[#FFFDF9] border border-[#DEC99D]/90 shadow-[0_8px_30px_rgba(0,0,0,0.35)] py-2.5 sm:py-3.5 px-2 sm:px-6 grid grid-cols-4 items-center divide-x divide-[#DEC99D]/70">
          
          {/* 1. Free Shipping */}
          <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C1D0E] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 8h4a.75.75 0 000-1.5H1a.75.75 0 000 1.5zm-1 3.5h5a.75.75 0 000-1.5H0a.75.75 0 000 1.5zm2 3.5h3a.75.75 0 000-1.5H2a.75.75 0 000 1.5z" />
              <path d="M7 6a1 1 0 011-1h8a1 1 0 011 1v2.5h3.2a1 1 0 01.78.38l2.6 3.25c.27.34.42.76.42 1.2V16a1 1 0 01-1 1h-.8a2.5 2.5 0 01-4.9 0h-4.6a2.5 2.5 0 01-4.9 0H7a1 1 0 01-1-1V6zm10.75 3.5l1.6 2h-1.6V9.5z" />
              <circle cx="8.5" cy="17" r="1.5" />
              <circle cx="18" cy="17" r="1.5" />
            </svg>
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-[#2C1D0E] font-sans tracking-tight mt-1 sm:mt-1.5 leading-tight">
              Free Shipping
            </span>
          </div>

          {/* 2. 100% Original */}
          <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C1D0E] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.5 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-[#2C1D0E] font-sans tracking-tight mt-1 sm:mt-1.5 leading-tight">
              100% Original
            </span>
          </div>

          {/* 3. Premium Quality */}
          <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C1D0E] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.4 3h9.2L21 8.5 12 21 3 8.5 7.4 3zm1.18 1.5l-2.8 3.5h3.61l.9-3.5H8.58zm3.42 0h-1.6l-.9 3.5h5l-.9-3.5H12zm3.42 0l.9 3.5h3.61l-2.8-3.5h-1.71zm-9.83 5l5.83 8.73V9.5H5.59zm7.41 8.73l5.83-8.73h-5.83v8.73z" />
            </svg>
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-[#2C1D0E] font-sans tracking-tight mt-1 sm:mt-1.5 leading-tight">
              Premium Quality
            </span>
          </div>

          {/* 4. Dedicated Support */}
          <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C1D0E] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75v3a2.25 2.25 0 002.25 2.25h1.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75H4.5A8.25 8.25 0 0112 3.75a8.25 8.25 0 017.5 7.5h-1.5a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.5v.75a3 3 0 01-3 3h-2.25a.75.75 0 000 1.5H16.5a4.5 4.5 0 004.5-4.5v-6c0-5.385-4.365-9.75-9.75-9.75z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-[#2C1D0E] font-sans tracking-tight mt-1 sm:mt-1.5 leading-tight">
              Dedicated Support
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};
