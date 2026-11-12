'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppAutomationModal } from '@/components/WhatsAppAutomationModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Footer } from '@/components/Footer';
import { AttarProduct, AttarVariant, CartItem } from '@/types/product';

export default function Home() {
  // ONLY real products from Shopify - zero fake items
  const [products, setProducts] = useState<AttarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Fetch ONLY real products live from Shopify
  useEffect(() => {
    async function loadRealShopifyProducts() {
      try {
        const res = await fetch('/api/shopify/products');
        const data = await res.json();
        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load Shopify products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRealShopifyProducts();
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
    <div className="min-h-screen bg-[#090807] text-[#f5deb3] flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 1. Mobile Header (Matches Reference 1) */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsAppGuide={() => setIsWhatsAppModalOpen(true)}
      />

      <main className="flex-1 max-w-md mx-auto w-full">
        {/* 2. Hero Section (Marble podium & White Oudh 6ml) */}
        <Hero
          onExplore={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Section Title with Golden Flourish (Matches Image 1) */}
        <section id="collection" className="pt-8 pb-4 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="text-amber-400 text-sm">✦</span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-[#fcf9f2] font-semibold tracking-wide">
            Our Collection
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-amber-300/80 mt-1">
            Discover Timeless Fragrances
          </p>
        </section>

        {/* 4. 2-Column Mobile Product Grid (Matches Image 1 & 2) */}
        <section className="px-4 py-4">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 mx-auto border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs text-amber-300/70 font-mono">Fetching Live Products from Shopify...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#120e0b] border border-amber-900/40">
              <p className="text-sm font-serif text-[#e0d6c8]">No products published in Shopify yet.</p>
              <p className="text-xs text-[#8c7f70] mt-1">Add products in Shopify Admin and they will appear here automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        {/* 5. Trust Badges & Curved Arch Footer (Matches Image 1) */}
        <Footer onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />
      </main>

      {/* 6. Fixed Mobile Bottom Navigation Bar (Home, Categories, Wishlist, Account, Cart) */}
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
