'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchModal } from '@/components/SearchModal';
import { MenuDrawer } from '@/components/MenuDrawer';
import { WhatsAppAutomationModal } from '@/components/WhatsAppAutomationModal';
import { Footer } from '@/components/Footer';
import { INITIAL_SHOPIFY_PRODUCTS } from '@/lib/initialProducts';
import { AttarProduct, AttarVariant, CartItem } from '@/types/product';

export default function Home() {
  // ONLY real products from Shopify - zero fake items
  const [products, setProducts] = useState<AttarProduct[]>(INITIAL_SHOPIFY_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  // Add to cart handler
  const handleAddToCart = (product: AttarProduct, variant: AttarVariant) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.variantId === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          title: product.title,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          image: product.featuredImage,
          shopifyVariantId: variant.shopifyVariantId,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#2C1D0E] flex flex-col font-sans selection:bg-[#E2B858] selection:text-[#2C1D0E]">
      
      {/* 
        1. Overlaid Luxury Navbar:
        - Positioned fixed at the top OVER the hero photo
        - Announcement bar + Logo + Search 🔍 + Cart 🛒 + Menu ☰
        - Smooth transition from translucent overlay to solid blur on scroll
      */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onSelectCollection={scrollToCollection}
      />

      <main className="flex-1 w-full">
        {/* 
          2. Hero Section:
          - Contains all 5 user uploaded images (White Oudh, Dream Oud, Ameer Al Oud, Ruh Gulab, Turkish)
          - Horizontally scrollable with touch / hand swipe
          - Golden pagination dots at bottom
          - The logo & buttons sit directly over the top of the photo
        */}
        <Hero onExplore={scrollToCollection} />

        {/* 3. DIRECTLY INTO: Our Collection Section */}
        <section id="collection" className="pt-10 sm:pt-14 pb-4 text-center max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B88325]/70" />
            <span className="text-[#B88325] text-sm">✦</span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B88325]/70" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#2C1D0E] font-bold tracking-tight">
            Our Collection
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#8F6A2A] mt-1 font-medium">
            Discover Timeless Fragrances
          </p>
        </section>

        {/* 4. Products Grid: 2 Columns on Mobile, 4 Columns on Laptop/Desktop */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* 5. Trust Bar & Luxury Footer (With official Abu Haani logo) */}
        <Footer onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />
      </main>

      {/* Slide-In Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
      />

      {/* Luxury Navigation Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenWhatsAppGuide={() => setIsWhatsAppModalOpen(true)}
        onSelectCollection={scrollToCollection}
      />

      {/* WhatsApp Automation Simulator Modal */}
      <WhatsAppAutomationModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
}
