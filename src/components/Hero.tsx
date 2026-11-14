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

  // Desktop Showcase State
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isDesktopHovered, setIsDesktopHovered] = useState(false);

  // Desktop Auto-advance every 5s when not hovered
  useEffect(() => {
    if (isDesktopHovered) return;
    const interval = setInterval(() => {
      setDesktopIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isDesktopHovered]);

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
        2. LAPTOP / DESKTOP VIEW (>= lg): GRAND CINEMATIC LUXURY SHOWCASE
        ========================================================================
      */}
      <div
        className="hidden lg:block relative w-full pt-20 pb-8 bg-[radial-gradient(ellipse_at_center,_rgba(226,184,88,0.12)_0%,_rgba(10,7,4,0.98)_70%)]"
        onMouseEnter={() => setIsDesktopHovered(true)}
        onMouseLeave={() => setIsDesktopHovered(false)}
      >
        <div className="max-w-6xl mx-auto px-6 relative flex flex-col items-center">
          
          {/* Main Showcase Stage */}
          <div className="relative w-full h-[62vh] xl:h-[68vh] min-h-[500px] max-h-[680px] flex items-center justify-center">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === desktopIndex;
              return (
                <a
                  key={`desktop-${slide.id}`}
                  href={`/products/${slide.handle}`}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out group ${
                    isActive
                      ? 'opacity-100 z-10 scale-100 pointer-events-auto'
                      : 'opacity-0 z-0 scale-95 pointer-events-none'
                  }`}
                  aria-label={`Explore ${slide.title}`}
                >
                  <div className="relative max-h-full flex items-center justify-center">
                    {/* Bottle Photography */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="max-h-[60vh] xl:max-h-[66vh] w-auto object-contain rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] group-hover:scale-[1.02] transition-transform duration-500"
                      draggable={false}
                    />

                    {/* Subtle Hover Cue on Desktop */}
                    <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-black/80 text-[#FFF0B8] border border-[#E2B858]/60 shadow-[0_8px_25px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-2">
                        <span>Click to view {slide.shortName}</span>
                        <span className="text-[#E2B858] font-bold">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}

            {/* Left Navigation Arrow */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setDesktopIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
              }}
              className="absolute left-2 xl:left-4 z-20 w-11 h-11 rounded-full bg-black/60 border border-[#DFCBA0]/30 hover:border-[#E2B858] hover:bg-[#E2B858] text-[#DFCBA0] hover:text-[#221307] flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md group"
              aria-label="Previous Fragrance"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setDesktopIndex((prev) => (prev + 1) % HERO_SLIDES.length);
              }}
              className="absolute right-2 xl:right-4 z-20 w-11 h-11 rounded-full bg-black/60 border border-[#DFCBA0]/30 hover:border-[#E2B858] hover:bg-[#E2B858] text-[#DFCBA0] hover:text-[#221307] flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md group"
              aria-label="Next Fragrance"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Interactive Luxury Fragrance Selector Tabs */}
          <div className="flex items-center justify-center gap-2.5 z-20 mt-4">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = desktopIndex === idx;
              return (
                <button
                  key={`tab-${slide.id}`}
                  onClick={() => setDesktopIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F3CD68] via-[#FFF0B8] to-[#E5B542] text-[#221307] font-bold shadow-[0_4px_16px_rgba(226,184,88,0.4)] scale-105'
                      : 'bg-black/50 text-[#CBB99C] border border-[#DFCBA0]/25 hover:border-[#E2B858] hover:text-[#F8F4EC] backdrop-blur-sm'
                  }`}
                >
                  {isActive && <span className="text-[10px] text-[#8F6A2A]">✦</span>}
                  <span>{slide.shortName}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
};
