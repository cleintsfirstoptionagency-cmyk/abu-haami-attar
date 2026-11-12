'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoldenDotsCanvas } from './GoldenDotsCanvas';

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ezf1x7-pn.myshopify.com';

const HERO_SLIDES = [
  {
    id: 'white-oud',
    title: 'White Oud Attar – 6 ml',
    handle: 'white-oud-attar-6-ml',
    src: '/hero/1-white-oudh.jpg',
  },
  {
    id: 'dream-oud',
    title: 'Dream Oud Attar – 6 ml',
    handle: 'dream-oud-attar-6-ml',
    src: '/hero/2-dream-oud.jpg',
  },
  {
    id: 'ameer-al-oud',
    title: 'Ameer Al Oud Attar – 6 ml',
    handle: 'ameer-al-oud-attar-6-ml',
    src: '/hero/3-ameer-al-oud.jpg',
  },
  {
    id: 'ruh-gulab',
    title: 'Ruh Gulab Attar – 6 ml',
    handle: 'ruh-gulab-attar-6-ml',
    src: '/hero/4-ruh-gulab.jpg',
  },
  {
    id: 'turkish',
    title: 'Turkish Attar – 6 ml',
    handle: 'turkish-attar-6-ml',
    src: '/hero/5-turkish.jpg',
  },
];

export const Hero: React.FC<{ onExplore: () => void }> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Sync current index when user scrolls or swipes
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

  const handlePrev = () => {
    const prev = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    scrollToSlide(prev);
  };

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % HERO_SLIDES.length;
    scrollToSlide(next);
  }, [currentIndex, scrollToSlide]);

  // Continuous auto-advance every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteracting.current && !isDragging.current) {
        handleNext();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [handleNext]);

  // Touch and Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    isInteracting.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
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

  const handleTouchStart = () => {
    isInteracting.current = true;
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

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative w-full bg-[#0A0704] overflow-hidden select-none border-b border-[#2B1D10]">
      
      {/* 
        Horizontal Touch / Hand Swipeable Carousel:
        - Full-fit images starting from top edge
        - Auto-advances smoothly & touch-swipeable
      */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="w-full shrink-0 snap-center flex items-center justify-center relative bg-[#0A0704]"
          >
            <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={`Abu Haani ${slide.title} Artisanal Attar`}
                className="w-full h-auto max-h-[76vh] sm:max-h-[85vh] object-contain sm:object-cover object-center pointer-events-none"
                loading={idx === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 
        Continuous Floating Golden Dotted & Sparkles Canvas:
        - Native GPU-accelerated HTML5 Canvas guaranteed to render on all mobile screens
      */}
      <GoldenDotsCanvas />

      {/* Subtle Desktop Side Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-[#E2B858] border border-[#3D2817] backdrop-blur-sm items-center justify-center transition active:scale-95 shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-[#E2B858] border border-[#3D2817] backdrop-blur-sm items-center justify-center transition active:scale-95 shadow-lg"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 
        Sleek Compact BUY NOW Pill Button placed exactly at the bottom of the hero photo
        - Dots indicator completely removed as requested
        - Dynamically links to the active slide's product on Shopify
        - Features continuous liquid splash / shine wave animation
      */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex justify-center pointer-events-auto px-4">
        <a
          href={`https://${STORE_DOMAIN}/products/${currentSlide.handle}`}
          className="relative overflow-hidden px-6 py-1.5 sm:px-7 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs tracking-wider uppercase bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] animate-button-glow text-[#221307] shadow-[0_4px_18px_rgba(226,184,88,0.65)] active:scale-95 transition-all flex items-center gap-1.5 border border-[#FFF0B8]"
        >
          {/* Continuous Liquid Splash / Shine Ripple Animation */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-button-splash pointer-events-none" />
          
          <span className="relative z-10 flex items-center gap-1.5 font-bold font-sans">
            <span>Buy Now</span>
            <span className="text-xs font-black">→</span>
          </span>
        </a>
      </div>

    </section>
  );
};
