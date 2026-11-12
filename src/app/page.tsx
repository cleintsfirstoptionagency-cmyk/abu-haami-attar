'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppAutomationModal } from '@/components/WhatsAppAutomationModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Footer } from '@/components/Footer';
import { INITIAL_SHOPIFY_PRODUCTS } from '@/lib/initialProducts';
import { AttarProduct, AttarVariant, CartItem } from '@/types/product';

export default function Home() {
  // 1. Initialized with real Shopify product: Zero load delay, Instant 0ms render!
  const [products, setProducts] = useState<AttarProduct[]>(INITIAL_SHOPIFY_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // 2. Silent Background Revalidation (Never blocks the UI with a spinner)
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

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#2C1D0E] flex flex-col font-sans selection:bg-[#E2B858] selection:text-[#2C1D0E]">
      {/* 1. Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsAppGuide={() => setIsWhatsAppModalOpen(true)}
      />

      <main className="flex-1 w-full">
        {/* 2. Hero Section */}
        <Hero
          onExplore={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Section Title with Golden Flourish (Matches Image 1) */}
        <section id="collection" className="pt-10 sm:pt-14 pb-4 text-center max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B88325]/70" />
            <span className="text-[#B88325] text-sm">✦</span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B88325]/70" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#2C1D0E] font-bold tracking-tight">
            Our Collection
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#8F6A2A] mt-1.5 font-medium">
            Discover Timeless Fragrances
          </p>
        </section>

        {/* 4. Product Grid: 2 Columns on Mobile, 4 Columns on Laptop/Desktop */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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

        {/* 5. Scent Pyramid Educational Guide */}
        <section id="pyramid-guide" className="py-12 sm:py-16 bg-[#FFFDF9] border-y border-[#E8DCBE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] uppercase tracking-widest text-[#B88325] font-bold block mb-1">
                Fragrance Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#2C1D0E] font-bold">
                The 3-Tier Olfactory Journey
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#735D46] leading-relaxed">
                Unlike synthetic commercial alcohol sprays, pure botanical attars unfold across your skin in three distinct harmonic tiers over 16+ hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Tier 1 */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FAF6EE] border border-[#E0D0B6] hover:border-[#B88325] transition duration-300 shadow-2xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C6D3B] block mb-2">
                  Tier 01 * Opening
                </span>
                <h4 className="text-xl sm:text-2xl font-serif italic font-bold text-[#2C1D0E] mb-2">
                  Top Notes
                </h4>
                <p className="text-xs text-[#B88325] font-semibold mb-3">Duration: Initial 15 - 30 Minutes</p>
                <p className="text-xs sm:text-sm text-[#66523F] leading-relaxed">
                  The initial luminous impression upon application. Fresh bergamot, aromatic spices, and morning floral dews that immediately captivate.
                </p>
              </div>

              {/* Tier 2 */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFF9EC] border border-[#DFC694] hover:border-[#B88325] transition duration-300 shadow-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B88325] block mb-2">
                  Tier 02 * The Soul
                </span>
                <h4 className="text-xl sm:text-2xl font-serif italic font-bold text-[#2C1D0E] mb-2">
                  Heart Notes
                </h4>
                <p className="text-xs text-[#B88325] font-semibold mb-3">Duration: 30 Mins - 5 Hours</p>
                <p className="text-xs sm:text-sm text-[#66523F] leading-relaxed">
                  The true character of the attar that warms with your pulse points. Velvety Damascus roses, sweet lotus, and amber accords.
                </p>
              </div>

              {/* Tier 3 */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FAF6EE] border border-[#E0D0B6] hover:border-[#B88325] transition duration-300 shadow-2xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C6D3B] block mb-2">
                  Tier 03 * The Sillage
                </span>
                <h4 className="text-xl sm:text-2xl font-serif italic font-bold text-[#2C1D0E] mb-2">
                  Base Notes
                </h4>
                <p className="text-xs text-[#B88325] font-semibold mb-3">Duration: 5 - 24+ Hours</p>
                <p className="text-xs sm:text-sm text-[#66523F] leading-relaxed">
                  The deepest, richest molecular foundations. Aged Cambodian agarwood, Mysore sandalwood, and musk that linger indefinitely on fabric.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Trust Badges & Curved Arch Footer */}
        <Footer onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />
      </main>

      {/* 7. Mobile-Only Fixed Bottom Nav Bar (Hidden on Laptop/Desktop) */}
      <MobileBottomNav
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
      />

      {/* Slide-In Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* WhatsApp Automation Simulator Modal */}
      <WhatsAppAutomationModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
}
