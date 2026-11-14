'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IncenseSmokeCanvas } from './IncenseSmokeCanvas';

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
        {/* Real-time Atmospheric Bakhoor & Incense Smoke Animation */}
        <IncenseSmokeCanvas density="rich" />

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
        {/* Real-time Atmospheric Bakhoor & Incense Smoke Animation */}
        <IncenseSmokeCanvas density="rich" />

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

    </section>
  );
};
