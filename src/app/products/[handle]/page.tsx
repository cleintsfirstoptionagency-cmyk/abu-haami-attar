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
      
      {/* 1. Golden Auto-Scrolling Announcement Strip */}
      <AnnouncementBar />

      {/* 2. Top Header in Light Royal Cream Aesthetic */}
      <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#DEC99D] px-4 sm:px-6 lg:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
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

      {/* 3. Main Product Detail Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8C765C] mb-4 font-sans select-none">
          <Link href="/" className="hover:text-[#8A5F1A] transition">Home</Link>
          <span>/</span>
          <Link href="/#collection" className="hover:text-[#8A5F1A] transition">Our Top Collection</Link>
          <span>/</span>
          <span className="text-[#2C1D0E] font-semibold truncate">{product.title}</span>
        </nav>

        {/* 2-Column Product Grid (Interactive Gallery Left / Buy Box Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* ==================================================================== */}
          {/* LEFT: INTERACTIVE MULTI-IMAGE GALLERY (LIGHT CLEAN STUDIO FRAMING)   */}
          {/* ==================================================================== */}
          <div className="flex flex-col space-y-3.5">
            
            {/* Main Active Image Viewer */}
            <div className="relative rounded-3xl overflow-hidden border border-[#DEC99D] shadow-[0_10px_35px_rgba(66,46,27,0.08)] bg-[#FFFDF9] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center group select-none">
              
              {/* Product Bottle Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImages[activeImageIndex]}
                alt={`${product.title} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-contain object-center p-3 sm:p-5 transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Top Left Pure Artisanal Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-[#FAF0D8]/95 backdrop-blur-md text-[#8A5F1A] text-[11px] font-bold font-sans border border-[#E5CCA0] shadow-xs">
                  100% Non-Alcoholic Artisanal Attar
                </span>
              </div>

              {/* Top Right Image Counter (e.g. 1 / 5) */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md text-[#5C442D] text-xs font-bold font-sans border border-[#DEC99D] shadow-xs">
                  {activeImageIndex + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Previous Photo Arrow */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FAF0D8] text-[#8A5F1A] border border-[#DEC99D] backdrop-blur-md flex items-center justify-center transition active:scale-90 shadow-sm"
                  aria-label="Previous photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next Photo Arrow */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FAF0D8] text-[#8A5F1A] border border-[#DEC99D] backdrop-blur-md flex items-center justify-center transition active:scale-90 shadow-sm"
                  aria-label="Next photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
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
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden bg-[#FFFDF9] transition-all duration-300 ${
                      activeImageIndex === idx
                        ? 'border-2 border-[#8A5F1A] shadow-[0_0_12px_rgba(138,95,26,0.4)] scale-105'
                        : 'border border-[#DEC99D] opacity-70 hover:opacity-100 hover:border-[#8A5F1A]'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain p-1"
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
            
            {/* Title & Verified Ratings */}
            <div>
              <div className="flex items-center gap-2 text-[#8A5F1A] text-xs font-bold mb-1.5 font-sans">
                <span className="tracking-widest">★★★★★</span>
                <span className="text-[#2C1D0E] font-medium">5.0 (Verified Royal Fragrance)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#2C1D0E] font-bold tracking-tight">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#735A42] mt-1 font-serif italic">
                {product.tagline || 'Artisanal Distillation • 16+ Hours Royal Longevity'}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] flex items-center justify-between shadow-2xs">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#8A5F1A] font-sans">
                    ₹{variant.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-[#A6886A] line-through font-sans">
                    ₹999
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold uppercase font-sans">
                    Save 40%
                  </span>
                </div>
                <p className="text-[11px] text-[#7A634D] mt-0.5">
                  Inclusive of all taxes • Free Courier across India
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#8A5F1A] px-3 py-1.5 rounded-xl bg-[#FAF0D8] border border-[#E5CCA0]">
                  {variant.size || '6ml Pure Oil'}
                </span>
              </div>
            </div>

            {/* Scarcity Banner */}
            <div className="p-3 rounded-xl bg-[#FFF8EE] border border-[#F0D5A3] flex items-center gap-2.5 text-xs text-[#8A5200]">
              <span className="text-base">🔥</span>
              <span className="font-semibold font-sans">
                High Demand: Only 12 hand-bottled flacons remaining from this distillation batch.
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C442D] font-sans">
                Quantity:
              </span>
              <div className="flex items-center rounded-full border border-[#DEC99D] bg-[#FFFDF9] px-2 py-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-sm text-[#8A5F1A] hover:bg-[#FAF0D8] rounded-full transition"
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
                  className="w-7 h-7 flex items-center justify-center font-bold text-sm text-[#8A5F1A] hover:bg-[#FAF0D8] rounded-full transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Grand 24K Gold BUY NOW Button */}
            <div>
              <button
                type="button"
                onClick={handleProceedToShopifyCheckout}
                disabled={isRedirecting}
                className="w-full relative overflow-hidden py-4 px-6 rounded-full font-extrabold text-sm sm:text-base tracking-wider uppercase bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] animate-button-glow text-[#221307] shadow-[0_6px_25px_rgba(226,184,88,0.55)] active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#FFF0B8]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{isRedirecting ? 'Directing to Checkout...' : `BUY NOW • ₹${(variant.price * quantity).toLocaleString('en-IN')}`}</span>
                  <span className="text-base font-black">→</span>
                </span>
              </button>

              <div className="mt-2 text-center text-[11px] text-[#7A634D] flex items-center justify-center gap-3">
                <span>⚡ Instant Shopify Checkout</span>
                <span>•</span>
                <span>🛡️ COD & UPI Accepted</span>
                <span>•</span>
                <span>🔒 Insured Courier</span>
              </div>
            </div>

            {/* Olfactory Fragrance Pyramid */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#8A5F1A] font-sans flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Fragrance Pyramid</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E8DDCA]">
                  <p className="text-[10px] text-[#8C765C] uppercase font-bold">Top Notes</p>
                  <p className="text-xs font-serif font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.top.join(', ')}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E8DDCA]">
                  <p className="text-[10px] text-[#8C765C] uppercase font-bold">Heart Notes</p>
                  <p className="text-xs font-serif font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.heart.join(', ')}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E8DDCA]">
                  <p className="text-[10px] text-[#8C765C] uppercase font-bold">Base Notes</p>
                  <p className="text-xs font-serif font-bold text-[#2C1D0E] mt-0.5">
                    {product.notes.base.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#DEC99D] space-y-2 shadow-2xs">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#5C442D] font-sans">
                Artisanal Description
              </h4>
              <p className="text-xs sm:text-sm text-[#422E1B] leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] text-xs shadow-2xs">
                <ShieldCheckIcon className="w-4 h-4 text-[#8A5F1A] shrink-0" />
                <span className="font-semibold text-[#2C1D0E]">100% Pure Non-Alcoholic</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#DEC99D] text-xs shadow-2xs">
                <span className="text-base leading-none">🚚</span>
                <span className="font-semibold text-[#2C1D0E]">Free Insured Delivery</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* 4. Mobile Sticky Bottom BUY NOW Bar in Light Luxury Theme */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#DEC99D] p-3 px-4 shadow-[0_-5px_20px_rgba(66,46,27,0.1)] flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] text-[#7A634D] uppercase font-bold">Total Price</p>
          <p className="text-lg font-bold text-[#8A5F1A] font-sans">
            ₹{(variant.price * quantity).toLocaleString('en-IN')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleProceedToShopifyCheckout}
          disabled={isRedirecting}
          className="relative overflow-hidden flex-1 py-3 px-5 rounded-full font-extrabold text-xs tracking-wider uppercase bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] animate-button-glow text-[#221307] shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-[#FFF0B8]"
        >
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
        <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#E2B858] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProductDetailContent {...props} />
    </React.Suspense>
  );
}
