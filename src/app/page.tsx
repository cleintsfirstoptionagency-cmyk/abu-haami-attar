'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FragrancePyramidInfo } from '@/components/FragrancePyramidInfo';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppAutomationModal } from '@/components/WhatsAppAutomationModal';
import { Footer } from '@/components/Footer';
import { FALLBACK_ATTARS } from '@/lib/shopify';
import { AttarProduct, AttarVariant, CartItem } from '@/types/product';
import { SparklesIcon, ShieldCheckIcon, TruckIcon, WhatsAppIcon } from '@/components/Icons';

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Oud' | 'Floral' | 'Musk' | 'Earthy'>('All');

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

  // Filtered Products
  const filteredProducts = FALLBACK_ATTARS.filter((p) => {
    if (filter === 'Oud') return p.title.toLowerCase().includes('oud');
    if (filter === 'Floral') return p.title.toLowerCase().includes('gulab') || p.notes.heart.some((h) => h.includes('Rose'));
    if (filter === 'Musk') return p.title.toLowerCase().includes('musk');
    if (filter === 'Earthy') return p.title.toLowerCase().includes('mitti');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#090807] text-[#f5deb3] flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsAppGuide={() => setIsWhatsAppModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onExplore={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Live Setup Banner for Client */}
        <section className="bg-gradient-to-r from-[#17120c] via-[#21180f] to-[#17120c] border-b border-amber-900/40 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[#e8decb]">
                <strong>Client Architecture Live:</strong> Next.js Frontend ➔ Shopify Storefront API ➔ Delhivery & Shiprocket ➔ Interakt WhatsApp Bot
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-600/50 text-emerald-300 hover:bg-emerald-900 transition flex items-center gap-1.5 font-medium"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Preview WhatsApp Auto-Flows</span>
              </button>
            </div>
          </div>
        </section>

        {/* Fragrance Collection */}
        <section id="collection" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase font-semibold mb-2">
              <SparklesIcon className="w-4 h-4" />
              <span>Rare Artisanal Harvest</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#fcf9f2]">
              The Masterpiece Attars
            </h2>
            <p className="mt-3 text-sm text-[#9c8e7c]">
              Pure botanical distillations aged to perfection. Select your preferred bottle format.
            </p>

            {/* Filter Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {(['All', 'Oud', 'Floral', 'Musk', 'Earthy'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                    filter === cat
                      ? 'bg-amber-500 text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-[#16110c] text-[#a39482] border border-[#2b2116] hover:border-amber-700/60'
                  }`}
                >
                  {cat === 'All' ? 'All Fragrances' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Scent Pyramid Education */}
        <FragrancePyramidInfo />

        {/* Why Artisanal Heritage */}
        <section id="why-us" className="py-20 bg-[#070605] border-b border-[#211912]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-2xl sm:text-4xl font-serif text-[#fcf9f2]">
                Why Discerning Connoisseurs Choose Our Attars
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#8c7e6e]">
                No synthetic fixatives, no harmful alcohol, only mother nature’s purest oils.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center sm:text-left">
              <div className="p-6 rounded-2xl bg-[#110d0a] border border-[#261d15] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1f1710] border border-amber-900/40 text-amber-400 flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-[#f5deb3]">Traditional Deg-Bhapka Distillation</h4>
                <p className="text-xs text-[#8c7e6e] leading-relaxed">
                  Firewood pits and copper cauldrons sealed with riverbed clay. An unhurried ancient process that extracts the purest essence without burning delicate aromatics.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#110d0a] border border-[#261d15] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1f1710] border border-amber-900/40 text-amber-400 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-[#f5deb3]">Zero Alcohol & 100% Halal</h4>
                <p className="text-xs text-[#8c7e6e] leading-relaxed">
                  Ideal for prayers and sensitive skin. Pure concentrated perfume oil that moisturizes instead of drying your skin, offering unparalleled projection.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#110d0a] border border-[#261d15] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1f1710] border border-amber-900/40 text-amber-400 flex items-center justify-center">
                  <TruckIcon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-[#f5deb3]">Insured Courier Protection</h4>
                <p className="text-xs text-[#8c7e6e] leading-relaxed">
                  Packed in temperature-controlled shockproof brass and velvet packaging. Dispatched via Delhivery Air and Shiprocket Express with real-time tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
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

      {/* Footer */}
      <Footer onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />
    </div>
  );
}
