'use client';

import React, { useState, useRef, useCallback, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_SHOPIFY_PRODUCTS } from '@/lib/initialProducts';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { SearchModal } from '@/components/SearchModal';

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ezf1x7-pn.myshopify.com';

function ProductDetailContent({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);
  const product = INITIAL_SHOPIFY_PRODUCTS.find((p) => p.handle === handle) || INITIAL_SHOPIFY_PRODUCTS[0];

  if (!product) {
    notFound();
  }

  type MediaSlide = {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };

  const mediaSlides: MediaSlide[] = [
    { type: 'image', src: product.featuredImage },
    ...(product.videoUrl
      ? [{ type: 'video' as const, src: product.videoUrl, poster: product.featuredImage }]
      : []),
    ...(product.images || [])
      .filter((img) => img !== product.featuredImage)
      .map((img) => ({ type: 'image' as const, src: img })),
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState<'standard' | 'duo' | 'box'>('standard');
  const [quantity, setQuantity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);

  // Guarantee button unfreezes on browser Back / BFCache navigation
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      setIsRedirecting(false);
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const currentItemPrice = 599;
  const currentMRP = 999;
  const totalPrice = currentItemPrice * quantity;

  const variant = product.variants[0];
  const numericVariantId = (variant.shopifyVariantId || variant.id).split('/').pop();

  // Instant Background Pre-warming: Pre-loads the checkout session on page load
  useEffect(() => {
    if (!numericVariantId) return;
    const checkoutUrl = `https://${STORE_DOMAIN}/cart/${numericVariantId}:${quantity}`;

    // 1. Speculative document prefetch in browser cache
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.as = 'document';
    prefetchLink.href = checkoutUrl;
    document.head.appendChild(prefetchLink);

    // 2. Prerender hint for modern Chrome / Safari
    const prerenderLink = document.createElement('link');
    prerenderLink.rel = 'prerender';
    prerenderLink.href = checkoutUrl;
    document.head.appendChild(prerenderLink);

    // 3. Silent background fetch to initialize Shopify cart worker session
    try {
      fetch(checkoutUrl, { mode: 'no-cors', priority: 'high' }).catch(() => {});
    } catch {}

    return () => {
      try {
        if (prefetchLink.parentNode) document.head.removeChild(prefetchLink);
        if (prerenderLink.parentNode) document.head.removeChild(prerenderLink);
      } catch {}
    };
  }, [numericVariantId, quantity]);

  const handlePreloadCheckout = () => {
    try {
      const checkoutUrl = `https://${STORE_DOMAIN}/cart/${numericVariantId}:${quantity}`;
      fetch(checkoutUrl, { mode: 'no-cors', priority: 'high' }).catch(() => {});
    } catch {}
  };

  // Final Action: Direct Instant 1-Click Redirect to Shopify Hosted Checkout (With auto-safety reset)
  const handleProceedToShopifyCheckout = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isRedirecting) return;
    setIsRedirecting(true);
    const checkoutUrl = `https://${STORE_DOMAIN}/cart/${numericVariantId}:${quantity}`;
    
    // Safety auto-reset after 3.5s in case user cancels or returns via browser back
    setTimeout(() => {
      setIsRedirecting(false);
    }, 3500);

    window.location.assign(checkoutUrl);
  };

  const handleAddToCart = () => {
    handleProceedToShopifyCheckout();
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const scrollToImage = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setActiveImageIndex(index);
    if (videoRef.current) {
      if (mediaSlides[index]?.type === 'video') {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [mediaSlides]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex >= 0 && newIndex < mediaSlides.length && newIndex !== activeImageIndex) {
        setActiveImageIndex(newIndex);
        if (videoRef.current) {
          if (mediaSlides[newIndex]?.type === 'video') {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      }
    }
  }, [mediaSlides, activeImageIndex]);

  const handlePrevImage = () => {
    const nextIdx = (activeImageIndex - 1 + mediaSlides.length) % mediaSlides.length;
    scrollToImage(nextIdx);
  };

  const handleNextImage = () => {
    const nextIdx = (activeImageIndex + 1) % mediaSlides.length;
    scrollToImage(nextIdx);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
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
    if (!isDragging.current) return;
    isDragging.current = false;
    handleScroll();
  };

  const checkPincode = () => {
    if (!pincode || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
      setPincodeMessage('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setPincodeMessage(`✓ Pincode ${pincode}: Cash on Delivery & Free Express Air Delivery Available! Estimated delivery within 4-5 days.`);
  };

  // Other 4 related products
  const relatedProducts = INITIAL_SHOPIFY_PRODUCTS.filter((p) => p.handle !== product.handle).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#2C1D0E] flex flex-col font-sans selection:bg-[#E2B858] selection:text-[#2C1D0E]">
      
      {/* 1. Golden Auto-Scrolling Announcement Strip */}
      <AnnouncementBar />

      {/* 2. Top Header in Light Royal Cream Aesthetic */}
      <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#DEC99D] px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo links back to Home */}
          <Link href="/" className="flex items-center cursor-pointer select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Abu Haani Parfumerie"
              className="h-9 sm:h-11 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Right Header Navigation Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#5C442D] hover:text-[#8A5F1A] transition rounded-full hover:bg-[#F0E6D2] active:scale-95"
              aria-label="Search Fragrances"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-[#5C442D] hover:text-[#8A5F1A] transition rounded-full hover:bg-[#F0E6D2] active:scale-95"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* 3. Main Product Detail Section - Exact Fatima Calligrapher 2-Column Responsive Layout */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-6 py-3 sm:py-6 pb-28 sm:pb-32">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-[#8C765C] mb-3 sm:mb-4 select-none">
          <Link href="/" className="hover:text-[#8A5F1A] transition">Home</Link>
          <span>/</span>
          <Link href="/#collection" className="hover:text-[#8A5F1A] transition">Our Top Collection</Link>
          <span>/</span>
          <span className="text-[#2C1D0E] font-semibold truncate">{product.title}</span>
        </nav>

        {/* 2-Column Product Grid (Left: Card Photo Frame / Right: Buy Box & Options) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start">
          
          {/* ==================================================================== */}
          {/* LEFT COLUMN: PRODUCT PHOTO IN LUXURY CARD (lg:col-span-6)            */}
          {/* ==================================================================== */}
          <div className="lg:col-span-6 space-y-3">
            
            {/* The Main Media Frame Card - Full Horizontal Swipeable/Draggable Carousel */}
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-[#DFCBA0]/60 shadow-xs">
              <div className="relative w-full aspect-square max-h-[480px] sm:max-h-[540px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#140E0A] flex items-center justify-center select-none group">
                
                {/* Floating Circular Video Icon Button - Placed Bottom-Left */}
                {product.videoUrl && (
                  <button
                    type="button"
                    onClick={() => scrollToImage(1)}
                    className={`absolute bottom-3 left-3 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.45)] backdrop-blur-md cursor-pointer ${
                      activeImageIndex === 1
                        ? 'bg-gradient-to-r from-[#F6DB8E] via-[#E4BA57] to-[#BF8D2B] text-[#1E1105] ring-2 ring-[#FFF0B8] scale-105 shadow-[0_0_20px_rgba(226,184,88,0.7)]'
                        : 'bg-[#140E0A]/85 hover:bg-[#140E0A] text-[#F5D88E] border border-[#E2B858]/70 hover:scale-110 active:scale-95'
                    }`}
                    title={activeImageIndex === 1 ? 'Now Playing Video' : 'Watch Product Video'}
                    aria-label="Play product video"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E2B858] animate-ping absolute -top-0.5 -right-0.5 pointer-events-none" />
                    <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}

                {/* Horizontal Draggable & Touch-Swipeable Gallery of Media */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {mediaSlides.map((slide, idx) => (
                    <div
                      key={`gallery-slide-${idx}`}
                      className="w-full h-full shrink-0 snap-center flex items-center justify-center relative bg-[#140E0A]"
                    >
                      {slide.type === 'video' ? (
                        <div className="w-full h-full relative bg-black flex items-center justify-center">
                          <video
                            ref={videoRef}
                            src={slide.src}
                            poster={slide.poster}
                            playsInline
                            autoPlay
                            muted
                            loop
                            controls
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={slide.src}
                          alt={`${product.title} - Photo ${idx + 1}`}
                          className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-500 group-hover:scale-102"
                          style={{
                            imageRendering: '-webkit-optimize-contrast',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                          }}
                          draggable={false}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Prev Slide Arrow Button */}
                {mediaSlides.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-90 shadow-md group/arrow cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/arrow:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Next Slide Arrow Button */}
                {mediaSlides.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-90 shadow-md group/arrow cursor-pointer"
                    aria-label="Next photo"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/arrow:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Minimalist Luxury Progress Indicator Dots at Bottom */}
                {mediaSlides.length > 1 && (
                  <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
                    {mediaSlides.map((_, dotIdx) => (
                      <span
                        key={`dot-${dotIdx}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeImageIndex === dotIdx
                            ? 'w-6 bg-white shadow-sm'
                            : 'w-1.5 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails Row Underneath - Smooth Scroll Cards */}
            {mediaSlides.length > 1 && (
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-1 px-0.5 no-scrollbar select-none">
                {mediaSlides.map((slide, idx) => (
                  <button
                    key={`thumb-${idx}`}
                    type="button"
                    onClick={() => scrollToImage(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-2 border-[#8A5F1A] shadow-md scale-105'
                        : 'border border-gray-200/90 opacity-60 hover:opacity-100 hover:border-gray-400'
                    }`}
                    aria-label={`View ${slide.type} ${idx + 1}`}
                  >
                    {slide.type === 'video' ? (
                      <div className="w-full h-full relative bg-[#140E0A] flex flex-col items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.poster || product.featuredImage}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-0.5">
                          <div className="w-6 h-6 rounded-full bg-[#E2B858] text-[#1E1105] flex items-center justify-center shadow-md">
                            <svg className="w-3 h-3 fill-current translate-x-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <span className="text-[8px] font-black text-[#F5D88E] tracking-wider">VIDEO</span>
                        </div>
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={slide.src}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* ==================================================================== */}
          {/* RIGHT COLUMN: PRODUCT DETAILS & BUY ACTIONS (lg:col-span-6)          */}
          {/* ==================================================================== */}
          <div className="lg:col-span-6 flex flex-col space-y-3.5">
            
            {/* Title & Rating Badge Row (Exact Fatima Calligrapher Bar) */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-700 mb-1 flex-wrap font-medium">
                <span className="font-bold tracking-wider text-amber-500">★★★★★</span>
                <span className="font-semibold text-gray-700">(614 Verified Reviews)</span>
                <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-300 text-[10px] flex items-center gap-1">
                  <span>🔥</span>
                  <span>1,820 sold</span>
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                  In Stock
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2C1D0E] leading-tight mb-1">
                {product.title}
              </h1>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black text-[#2C1D0E]">
                  ₹{currentItemPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs sm:text-base text-gray-400 line-through">
                  MRP ₹{currentMRP.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  -40% OFF
                </span>
              </div>

              {/* Estimated Delivery Callout Box (Exact Image 3 Styling) */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-[#065F46] flex items-center gap-2 mb-2 shadow-2xs">
                <span className="text-sm">🚚</span>
                <span className="leading-tight">
                  <span className="font-bold text-[#064E3B]">Estimated Delivery:</span> <b>Within 4-5 Days</b> <span className="text-[#047857] text-[11px] sm:text-xs">(Dispatches in 24h)</span>
                </span>
              </div>
            </div>

            {/* PRIMARY CTA ACTION BUTTONS (Exact Fatima Calligrapher 24K Gold Styling) */}
            <div className="space-y-2 mb-2">
              <button
                type="button"
                onClick={handleProceedToShopifyCheckout}
                disabled={isRedirecting}
                style={{ touchAction: 'manipulation' }}
                className="w-full gold-bg-gradient text-[#1A1208] font-black py-3.5 px-4 rounded-xl shadow-gold-glow flex items-center justify-center gap-2 text-sm sm:text-base hover:opacity-95 active:scale-98 transition-all cursor-pointer border border-[#F3E3B6]"
              >
                <span className="text-amber-800 text-sm pointer-events-none">⚡</span>
                <span className="tracking-wide pointer-events-none">
                  {isRedirecting
                    ? 'CONNECTING TO CHECKOUT...'
                    : `BUY NOW — CASH ON DELIVERY (₹${totalPrice.toLocaleString('en-IN')})`}
                </span>
                <span className="text-sm font-black pointer-events-none">→</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                style={{ touchAction: 'manipulation' }}
                className="w-full bg-white hover:bg-gray-50 text-[#1A1208] font-bold py-2.5 px-3 rounded-xl border border-gray-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer active:scale-98"
              >
                <span className="text-amber-700 pointer-events-none">🛒</span>
                <span className="pointer-events-none">Add to Cart • Free Air Shipping on ₹999+</span>
              </button>
            </div>

            {/* 4 Trust & Quality Guarantee Badges (Exact Fatima Calligrapher 2x2 Grid) */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-xs grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200 text-sm">
                  ✨
                </div>
                <div>
                  <div className="font-bold text-[#2C1D0E] text-xs">100% Non-Alcoholic</div>
                  <div className="text-[10px] text-gray-500">Pure artisanal attar oil</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 text-sm">
                  💵
                </div>
                <div>
                  <div className="font-bold text-[#2C1D0E] text-xs">Cash on Delivery</div>
                  <div className="text-[10px] text-gray-500">Pay cash at doorstep</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200 text-sm">
                  ⏳
                </div>
                <div>
                  <div className="font-bold text-[#2C1D0E] text-xs">16+ Hours Longevity</div>
                  <div className="text-[10px] text-gray-500">Enduring sillage guarantee</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200 text-sm">
                  🛡️
                </div>
                <div>
                  <div className="font-bold text-[#2C1D0E] text-xs">Insured Air Delivery</div>
                  <div className="text-[10px] text-gray-500">Safe doorstep delivery</div>
                </div>
              </div>
            </div>

            {/* Pincode Serviceability Checker Widget */}
            <div className="bg-amber-50/50 border border-amber-200/90 rounded-2xl p-3 sm:p-3.5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="text-xs font-bold text-[#2C1D0E] flex items-center gap-1.5">
                  <span>🚚 Delivery Check: <b className="text-amber-900 font-extrabold">Free Shipping</b></span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span>⚡</span> Dispatches in 24h
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 400001)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-amber-600 bg-white placeholder-gray-400 font-mono"
                />
                <button
                  type="button"
                  onClick={checkPincode}
                  className="px-4 py-2 bg-[#2C1D0E] hover:bg-black text-[#F8F4EC] font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Check
                </button>
              </div>
              {pincodeMessage && (
                <div className="mt-2 text-[11px] p-2 rounded-lg bg-white border border-amber-300 text-amber-950 font-medium">
                  {pincodeMessage}
                </div>
              )}
            </div>

            {/* Product Specifications & Authenticity Table (Exact Fatima Calligrapher Table) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs mt-2">
              <div className="font-bold text-xs sm:text-sm text-[#2C1D0E] mb-2.5 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                <span>📋</span>
                <span>Product & Fragrance Specifications</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="bg-[#FAF6EE] p-2 rounded-lg border border-gray-200/80">
                  <div className="text-gray-400 text-[9px] uppercase font-semibold">Brand / House</div>
                  <div className="font-bold text-[#2C1D0E] truncate">Abu Haani Parfumerie</div>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-lg border border-gray-200/80">
                  <div className="text-gray-400 text-[9px] uppercase font-semibold">SKU / Code</div>
                  <div className="font-bold text-purple-700 font-mono truncate">ABU-{product.handle.slice(0, 8).toUpperCase()}</div>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-lg border border-gray-200/80">
                  <div className="text-gray-400 text-[9px] uppercase font-semibold">Price / MRP</div>
                  <div className="font-bold text-emerald-700 truncate">₹{currentItemPrice} <span className="text-gray-400 font-normal line-through">(₹{currentMRP})</span></div>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-lg border border-gray-200/80">
                  <div className="text-gray-400 text-[9px] uppercase font-semibold">Volume / Size</div>
                  <div className="font-bold text-[#2C1D0E] truncate">6 ml Standard Flacon</div>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-lg border border-gray-200/80">
                  <div className="text-gray-400 text-[9px] uppercase font-semibold">Formulation</div>
                  <div className="font-bold text-[#2C1D0E] truncate">100% Pure Non-Alcoholic</div>
                </div>
                <div className="bg-[#FAF6EE] p-2 rounded-lg border border-gray-200/80">
                  <div className="text-gray-400 text-[9px] uppercase font-semibold">Longevity & Sillage</div>
                  <div className="font-bold text-[#2C1D0E] truncate">16+ Hours • Heavy Royal Sillage</div>
                </div>
              </div>
            </div>

            {/* Olfactory Notes Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#8A5F1A] mb-2.5 flex items-center gap-1.5">
                <span>✦</span>
                <span>Fragrance Pyramid</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-[#FAF6EE] border border-gray-200/80">
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Top Notes</p>
                  <p className="text-xs font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.top.join(', ')}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF6EE] border border-gray-200/80">
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Heart Notes</p>
                  <p className="text-xs font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.heart.join(', ')}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF6EE] border border-gray-200/80">
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Base Notes</p>
                  <p className="text-xs font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.base.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#5C442D] mb-2">
                Artisanal Story & Notes
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>

        </div>

        {/* 4. Other Products / Related Fragrances Section (Exact Fatima Calligrapher Grid) */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2C1D0E]">Explore Other Signature Fragrances</h2>
              <p className="text-xs text-gray-500">Pure handcrafted non-alcoholic attars</p>
            </div>
            <Link href="/#collection" className="text-xs font-bold text-[#8A5F1A] hover:text-[#2C1D0E] flex items-center gap-1">
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map((p) => (
              <Link
                key={p.handle}
                href={`/products/${p.handle}`}
                className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#8A5F1A] transition-all group flex flex-col justify-between"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF6EE] mb-2 p-2 flex items-center justify-center relative">
                  {p.videoUrl && (
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-[#1A120B]/85 backdrop-blur-md text-[#F5D88E] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#E2B858]/50 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E2B858] animate-pulse" />
                      <span>▶ VIDEO</span>
                    </div>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2C1D0E] line-clamp-1 group-hover:text-[#8A5F1A] transition">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-[#8A5F1A]">₹{p.variants[0]?.price || 599}</span>
                    <span className="text-[10px] text-gray-400">6 ml</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* Permanent Luxury Sticky Bottom Bar (Ultra-Attractive & High-Converting) */}
      <aside
        aria-label="Sticky Purchase Bar"
        className="fixed bottom-0 inset-x-0 z-50 bg-[#FAF6EE]/96 backdrop-blur-xl border-t border-[#DFCBA0] shadow-[0_-10px_35px_rgba(44,29,14,0.18)] px-3 sm:px-6 py-2.5 sm:py-3 select-none"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-xl mx-auto flex items-center gap-2 sm:gap-3">
          
          {/* Quantity Selector Luxury Pill */}
          <div className="flex items-center rounded-2xl border border-[#DEC99D] bg-white px-2 py-1.5 shadow-2xs shrink-0 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#FAF5EC] hover:bg-[#F3E7CE] text-[#7A5318] active:scale-90 flex items-center justify-center font-bold text-base sm:text-lg transition-all cursor-pointer"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-5 text-center text-xs sm:text-sm font-black text-[#2C1D0E] font-mono">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#FAF5EC] hover:bg-[#F3E7CE] text-[#7A5318] active:scale-90 flex items-center justify-center font-bold text-base sm:text-lg transition-all cursor-pointer"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Grand BUY NOW Button (Exact Fatima Calligrapher Gold Gradient & Glow) */}
          <button
            type="button"
            onClick={handleProceedToShopifyCheckout}
            disabled={isRedirecting}
            style={{ touchAction: 'manipulation' }}
            className="flex-1 gold-bg-gradient text-[#1A1208] font-black py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl shadow-gold-glow flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm active:scale-98 transition-all cursor-pointer border border-[#F3E3B6]"
          >
            <span className="text-amber-800 text-xs sm:text-sm pointer-events-none">⚡</span>
            <span className="tracking-wide font-black uppercase truncate pointer-events-none">
              {isRedirecting
                ? 'CONNECTING TO CHECKOUT...'
                : `BUY NOW — COD (₹${totalPrice.toLocaleString('en-IN')})`}
            </span>
            <span className="text-xs sm:text-sm font-black pointer-events-none">→</span>
          </button>

        </div>
      </aside>

      {/* 5. Luxury Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={INITIAL_SHOPIFY_PRODUCTS}
      />

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCollection={() => {
          window.location.href = '/#collection';
        }}
      />

    </div>
  );
}

export default function ProductDetailPage(props: {
  params: Promise<{ handle: string }>;
}) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center font-sans">
          <div className="w-8 h-8 rounded-full border-2 border-[#E2B858] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProductDetailContent {...props} />
    </React.Suspense>
  );
}
