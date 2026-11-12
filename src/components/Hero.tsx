'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoldenDotsOverlay } from './GoldenDotsOverlay';

const HERO_SLIDES = [
  {
    id: 'white-oudh',
    title: 'White Oudh',
    src: '/hero/1-white-oudh.jpg',
  },
  {
    id: 'dream-oud',
    title: 'Dream Oud',
    src: '/hero/2-dream-oud.jpg',
  },
  {
    id: 'ameer-al-oud',
    title: 'Ameer Al Oud',
    src: '/hero/3-ameer-al-oud.jpg',
  },
  {
    id: 'ruh-gulab',
    title: 'Ruh Gulab',
    src: '/hero/4-ruh-gulab.jpg',
  },
  {
    id: 'turkish',
    title: 'Turkish',
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

  // Continuous auto-advance every 4.5s (unless user is interacting)
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

  return (
    <section className="relative w-full bg-[#0A0704] overflow-hidden select-none border-b border-[#2B1D10]">
      
      {/* 
        Horizontal Touch / Hand Swipeable Carousel:
        - Full-fit images starting from top edge
        - Header sits directly on top of these photos
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
        Continuous Dotted Animation:
        - Rendered ON TOP OF the carousel with z-20 so it floats directly over the hero photos on mobile
      */}
      <GoldenDotsOverlay />

      {/* Subtle Desktop Side Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-[#E2B858] border border-[#3D2817] backdrop-blur-sm items-center justify-center transition active:scale-95 shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-[#E2B858] border border-[#3D2817] backdrop-blur-sm items-center justify-center transition active:scale-95 shadow-lg"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Golden Indicator Dots (at bottom edge of image) */}
      <div className="absolute bottom-2 sm:bottom-3 inset-x-0 z-20 flex items-center justify-center pointer-events-auto">
        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#3A2615] flex items-center gap-1.5 sm:gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-6 h-2 bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] shadow-[0_0_10px_rgba(226,184,88,0.9)]'
                  : 'w-2 h-2 bg-[#6E553E] hover:bg-[#A88864]'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
