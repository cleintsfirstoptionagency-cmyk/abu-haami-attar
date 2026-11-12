'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_SHOPIFY_PRODUCTS } from '@/lib/initialProducts';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { SearchModal } from '@/components/SearchModal';
import { SparklesIcon, ShieldCheckIcon } from '@/components/Icons';

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ezf1x7-pn.myshopify.com';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);
  const product = INITIAL_SHOPIFY_PRODUCTS.find((p) => p.handle === handle) || INITIAL_SHOPIFY_PRODUCTS[0];

  if (!product) {
    notFound();
  }

  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.featuredImage];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const variant = product.variants[0];
  const numericVariantId = (variant.shopifyVariantId || variant.id).split('/').pop();

  // Final Action: Direct 1-Click Redirect to Shopify Hosted Checkout
  const handleProceedToShopifyCheckout = () => {
    setIsRedirecting(true);
    const checkoutUrl = `https://${STORE_DOMAIN}/cart/${numericVariantId}:${quantity}`;
    window.location.href = checkoutUrl;
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#2C1D0E] flex flex-col font-sans selection:bg-[#E2B858] selection:text-[#2C1D0E]">
      
      {/* 1. Bright Golden Auto-Scrolling Announcement Strip */}
      <AnnouncementBar />

      {/* 2. Top Header with 3D Gold Logo & Navigation */}
      <header className="sticky top-0 z-40 bg-[#0A0704]/98 backdrop-blur-md border-b border-[#2B1D10] px-4 sm:px-6 lg:px-8 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo links back to Home */}
          <Link href="/" className="flex items-center cursor-pointer select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Abu Haani"
              className="h-9 sm:h-11 w-auto object-contain hover:scale-105 transition-transform"
            />
          </Link>

          {/* Right Header Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#E6DAC8] hover:text-[#E2B858] transition rounded-full hover:bg-white/10"
              aria-label="Search"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-[#E6DAC8] hover:text-[#E2B858] transition rounded-full hover:bg-white/10"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* 3. Main Product Detail Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8C765C] mb-4 font-sans">
          <Link href="/" className="hover:text-[#B88325] transition">Home</Link>
          <span>/</span>
          <Link href="/#collection" className="hover:text-[#B88325] transition">Our Top Collection</Link>
          <span>/</span>
          <span className="text-[#2C1D0E] font-semibold truncate">{product.title}</span>
        </nav>

        {/* 2-Column Product Grid (Interactive Gallery Left / Buy Box Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* ==================================================================== */}
          {/* LEFT: INTERACTIVE MULTI-IMAGE GALLERY                                */}
          {/* ==================================================================== */}
          <div className="flex flex-col space-y-3">
            
            {/* Main Active Image Viewer */}
            <div className="relative rounded-3xl overflow-hidden border border-[#DEC99D] shadow-[0_10px_35px_rgba(66,46,27,0.12)] bg-[#120B06] aspect-[4/5] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImages[activeImageIndex]}
                alt={`${product.title} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              
              {/* Diagonal Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none animate-card-shine" />
              
              {/* Top Left Pure Artisanal Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E2B858] text-[11px] font-bold border border-[#E2B858]/40 shadow-md">
                  100% Non-Alcoholic Artisanal Attar
                </span>
              </div>

              {/* Top Right Image Counter (e.g. 1 / 5) */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#F8F4EC] text-xs font-bold font-sans border border-[#DEC99D]/40 shadow-md">
                  {activeImageIndex + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Prev Arrow */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-[#E2B858] border border-[#DFCBA0]/50 backdrop-blur-md flex items-center justify-center transition active:scale-90 shadow-lg"
                  aria-label="Previous photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next Arrow */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-[#E2B858] border border-[#DFCBA0]/50 backdrop-blur-md flex items-center justify-center transition active:scale-90 shadow-lg"
                  aria-label="Next photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Thumbnail Row Underneath (Clickable) */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto py-1 px-0.5 no-scrollbar select-none">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={`thumb-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                      activeImageIndex === idx
                        ? 'border-2 border-[#D4A037] shadow-[0_0_12px_rgba(212,160,55,0.7)] scale-105'
                        : 'border border-[#DEC99D]/70 opacity-60 hover:opacity-100 hover:border-[#D4A037]'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* ==================================================================== */}
          {/* RIGHT: BUY BOX & PRODUCT DETAILS                                     */}
          {/* ==================================================================== */}
          <div className="flex flex-col space-y-5">
            
            {/* Title & Ratings */}
            <div>
              <div className="flex items-center gap-2 text-[#B88325] text-xs font-bold mb-1.5 font-sans">
                <span>★★★★★</span>
                <span className="text-[#2C1D0E]">5.0 (Verified Luxury Fragrance)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#2C1D0E] font-bold">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#8C765C] mt-1 font-serif italic">
                {product.tagline || 'Artisanal Distillation • 16+ Hours Royal Longevity'}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#7A5B1C] font-sans">
                    ₹{variant.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-[#9E8367] line-through font-sans">
                    ₹999
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase font-sans">
                    Save 40%
                  </span>
                </div>
                <p className="text-[11px] text-[#8C765C] mt-0.5">
                  Inclusive of all taxes • Free Courier across India
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#2C1D0E] px-2.5 py-1 rounded-lg bg-[#F2ECE0] border border-[#DFCBA0]">
                  {variant.size || '6ml Standard'}
                </span>
              </div>
            </div>

            {/* Scarcity Banner */}
            <div className="p-3 rounded-xl bg-[#FFF5E5] border border-[#F0D5A3] flex items-center gap-2.5 text-xs text-[#8A5200]">
              <span className="text-base">🔥</span>
              <span className="font-semibold font-sans">
                High Demand: Only 12 hand-bottled flacons remaining from this distillation batch.
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#736250] font-sans">
                Quantity:
              </span>
              <div className="flex items-center rounded-full border border-[#DEC99D] bg-[#FFFDF9] px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-sm text-[#7A5B1C] hover:bg-[#F2ECE0] rounded-full transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#2C1D0E] font-sans">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-sm text-[#7A5B1C] hover:bg-[#F2ECE0] rounded-full transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* BIG PROMINENT BUY NOW BUTTON (Continuous Liquid Splash Animation) */}
            <div>
              <button
                type="button"
                onClick={handleProceedToShopifyCheckout}
                disabled={isRedirecting}
                className="w-full relative overflow-hidden py-4 px-6 rounded-full font-extrabold text-sm sm:text-base tracking-wider uppercase bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] animate-button-glow text-[#221307] shadow-[0_6px_25px_rgba(226,184,88,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#FFF0B8]"
              >
                {/* Continuous Splash Animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-button-splash pointer-events-none" />
                
                <span className="relative z-10 flex items-center gap-2">
                  <span>{isRedirecting ? 'Directing to Checkout...' : `BUY NOW • ₹${(variant.price * quantity).toLocaleString('en-IN')}`}</span>
                  <span className="text-base font-black">→</span>
                </span>
              </button>

              <div className="mt-2 text-center text-[11px] text-[#705842] flex items-center justify-center gap-3">
                <span>⚡ Instant Shopify Checkout</span>
                <span>•</span>
                <span>🛡️ COD & UPI Accepted</span>
              </div>
            </div>

            {/* Olfactory Pyramid / Fragrance Notes */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] space-y-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#B88325] font-sans flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Fragrance Pyramid</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded-xl bg-[#F8F4EC] border border-[#E8DCBE]">
                  <p className="text-[10px] text-[#8C765C] uppercase font-bold">Top Notes</p>
                  <p className="text-xs font-serif font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.top.join(', ')}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#F8F4EC] border border-[#E8DCBE]">
                  <p className="text-[10px] text-[#8C765C] uppercase font-bold">Heart Notes</p>
                  <p className="text-xs font-serif font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.heart.join(', ')}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#F8F4EC] border border-[#E8DCBE]">
                  <p className="text-[10px] text-[#8C765C] uppercase font-bold">Base Notes</p>
                  <p className="text-xs font-serif font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.base.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] space-y-2">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#736250] font-sans">
                Description
              </h4>
              <p className="text-xs sm:text-sm text-[#422E1B] leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] text-xs">
                <ShieldCheckIcon className="w-4 h-4 text-[#B88325] shrink-0" />
                <span className="font-semibold text-[#2C1D0E]">100% Pure Non-Alcoholic</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] text-xs">
                <span className="text-base leading-none">🚚</span>
                <span className="font-semibold text-[#2C1D0E]">Free Insured Delivery</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* 4. Mobile Sticky Bottom BUY NOW Bar */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-[#120B06]/98 backdrop-blur-md border-t border-[#362312] p-3 px-4 shadow-[0_-5px_20px_rgba(0,0,0,0.4)] flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] text-[#A6886A] uppercase font-bold">Total Price</p>
          <p className="text-lg font-bold text-[#E2B858] font-sans">
            ₹{(variant.price * quantity).toLocaleString('en-IN')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleProceedToShopifyCheckout}
          disabled={isRedirecting}
          className="relative overflow-hidden flex-1 py-3 px-5 rounded-full font-extrabold text-xs tracking-wider uppercase bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] animate-button-glow text-[#221307] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-[#FFF0B8]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-button-splash pointer-events-none" />
          <span className="relative z-10 flex items-center gap-1.5 font-bold">
            <span>{isRedirecting ? 'Directing...' : 'BUY NOW'}</span>
            <span className="text-sm font-black">→</span>
          </span>
        </button>
      </div>

      {/* 5. Luxury Footer */}
      <Footer onOpenWhatsApp={() => window.open('https://wa.me/919999999999?text=Hello%20Abu%20Haani', '_blank')} />

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
        onOpenWhatsAppGuide={() => window.open('https://wa.me/919999999999', '_blank')}
        onSelectCollection={() => {
          window.location.href = '/#collection';
        }}
      />

    </div>
  );
}
