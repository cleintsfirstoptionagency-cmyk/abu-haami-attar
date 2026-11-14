'use client';

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { SearchModal } from '@/components/SearchModal';
import { MenuDrawer } from '@/components/MenuDrawer';
import { Footer } from '@/components/Footer';
import { INITIAL_SHOPIFY_PRODUCTS } from '@/lib/initialProducts';
import { AttarProduct } from '@/types/product';

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ezf1x7-pn.myshopify.com';

export default function Home() {
  // ONLY real products from Shopify - zero fake items
  const [products, setProducts] = useState<AttarProduct[]>(INITIAL_SHOPIFY_PRODUCTS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Silent background sync with Shopify Storefront API
  useEffect(() => {
    async function refreshShopifyProducts() {
      try {
        const res = await fetch('/api/shopify/products');
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (err) {
        console.warn('Silent sync error:', err);
      }
    }
    refreshShopifyProducts();
  }, []);

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Direct redirection to official Shopify Cart
  const handleOpenShopifyCart = () => {
    window.location.href = `https://${STORE_DOMAIN}/cart`;
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#2C1D0E] flex flex-col font-sans selection:bg-[#E2B858] selection:text-[#2C1D0E]">
      
      {/* 
        1. Hero Section with Floating Overlaid Header:
        - Header (Logo, Search 🔍, Cart 🛒, Menu ☰) floats directly on top of the hero image
        - Logo is made bigger & prominent
        - Hero image goes all the way up to the very top edge
        - 5 images horizontally scrollable by hand/swipe or auto-play
      */}
      <div className="relative w-full bg-[#0A0704]">
        <Navbar
          cartCount={0}
          onOpenCart={handleOpenShopifyCart}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onSelectCollection={scrollToCollection}
        />
        <Hero onExplore={scrollToCollection} />
      </div>

      {/* 
        2. Refined Luxury Cream Marquee Ticker Strip:
        - Moved directly below the moving hero photos
        - Light warm royal cream background matching homepage aesthetic
        - Subtle gold hairline borders and continuous infinite scroll
      */}
      <AnnouncementBar />

      <main className="flex-1 w-full">
        {/* 3. DIRECTLY INTO: Our Top Collection Section (Tight & Compact Spacing) */}
        <section id="collection" className="pt-3 sm:pt-4 pb-1 text-center max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="w-10 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B88325]/70" />
            <span className="text-[#B88325] text-xs sm:text-sm animate-pulse">✦</span>
            <span className="w-10 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B88325]/70" />
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-[#2C1D0E] font-bold tracking-tight">
            Our Top Collection
          </h2>
          <p className="text-xs sm:text-base font-serif italic text-[#8F6A2A] mt-0.5 sm:mt-1 font-medium">
            Discover Timeless Fragrances
          </p>
        </section>

        {/* 4. Products Grid: 2 Columns on Mobile, 4 Columns on Laptop/Desktop */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 sm:pb-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* 5. Trust Bar & Luxury Footer (With official Abu Haani logo) */}
        <Footer onOpenWhatsApp={() => {}} />
      </main>

      {/* Search Modal (Directly opens product on Shopify) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
      />

      {/* Luxury Navigation Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCollection={scrollToCollection}
      />
    </div>
  );
}
