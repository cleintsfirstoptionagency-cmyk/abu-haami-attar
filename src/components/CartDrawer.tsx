'use client';

import React, { useState } from 'react';
import { CartItem } from '@/types/product';
import { CloseIcon, ShieldCheckIcon, TruckIcon, ShoppingBagIcon } from './Icons';
import { createShopifyCheckoutUrl } from '@/lib/shopify';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveItem: (variantId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeeded = freeShippingThreshold - subtotal;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const lines = cart.map((item) => ({
        merchandiseId: item.shopifyVariantId || 'gid://shopify/ProductVariant/demo',
        quantity: item.quantity,
      }));

      const checkoutUrl = await createShopifyCheckoutUrl(lines);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (e) {
      console.error(e);
      alert('Redirecting to secure Shopify hosted checkout...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120e0b] border-l border-[#2e2318] text-[#f4eee4] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#261d15] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-serif tracking-wider uppercase text-[#fcf9f2]">
                Your Artisanal Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#8f8272] hover:text-[#f4eee4] hover:bg-[#201811] transition"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="bg-[#1a140f] px-6 py-3 border-b border-[#2a1f15] text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <TruckIcon className="w-4 h-4" />
                <span>You unlocked <strong>Free Insured Express Delivery</strong>!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[#b0a291]">
                  <span>Add ₹{amountNeeded.toLocaleString('en-IN')} more for Free Courier</span>
                  <span className="font-semibold text-amber-300">Target: ₹999</span>
                </div>
                <div className="w-full bg-[#291e14] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#1e1710] border border-amber-900/40 flex items-center justify-center text-amber-400/50 mb-4">
                  <ShoppingBagIcon className="w-8 h-8" />
                </div>
                <p className="text-base font-serif text-[#d9cebf]">Your bag is currently empty</p>
                <p className="text-xs text-[#8f8272] mt-1">Explore our rare attars to experience pure luxury.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.variantId}
                  className="p-4 rounded-xl bg-[#18130e] border border-[#261d15] flex gap-4 items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-amber-900/40 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif text-[#fcf9f2] truncate">{item.title}</h4>
                    <p className="text-xs text-amber-400/90">{item.variantTitle}</p>
                    <div className="text-xs font-semibold text-amber-300 mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-[#241a12] border border-[#38281a] text-amber-200 text-xs flex items-center justify-center hover:bg-[#332418]"
                    >
                      -
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-[#241a12] border border-[#38281a] text-amber-200 text-xs flex items-center justify-center hover:bg-[#332418]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.variantId)}
                    className="text-[#807262] hover:text-red-400 text-xs ml-1"
                    title="Remove item"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#261d15] bg-[#16110c] space-y-4">
              <div className="space-y-1.5 text-xs text-[#a39482]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#f4eee4] font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Insured Delhivery / Shiprocket)</span>
                  <span className="text-emerald-400 font-medium">
                    {isFreeShipping ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes (GST 18%)</span>
                  <span className="text-[#f4eee4] font-medium">Included</span>
                </div>
                <div className="pt-2 border-t border-[#2e2318] flex justify-between text-base font-serif font-bold text-amber-300">
                  <span>Grand Total</span>
                  <span>₹{(subtotal + (isFreeShipping ? 0 : 99)).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Connecting to Shopify Hosted Checkout...' : 'Proceed to Secure Checkout ->'}
              </button>

              {/* Badges */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-[#857666]">
                <div className="flex items-center gap-1">
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                  <span>Shopify 256-Bit SSL</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400 font-bold">COD</span>
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

