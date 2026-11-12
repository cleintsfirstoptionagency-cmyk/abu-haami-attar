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
        merchandiseId: item.shopifyVariantId || 'gid://shopify/ProductVariant/50239193186563',
        quantity: item.quantity,
      }));

      const checkoutUrl = await createShopifyCheckoutUrl(lines);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (e) {
      console.error(e);
      alert('Connecting to secure Shopify hosted checkout...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#E2D2B8] text-[#2C1D0E] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DCBE] flex items-center justify-between bg-[#FAF6EE]">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="w-5 h-5 text-[#B88325]" />
              <h2 className="text-base font-serif italic font-bold tracking-wide text-[#2C1D0E]">
                Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#735D46] hover:text-[#2C1D0E] hover:bg-[#EADBCA] transition"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="bg-[#FAF3E3] px-5 py-3 border-b border-[#E8DCBE] text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <TruckIcon className="w-4 h-4 text-emerald-600" />
                <span>You unlocked <strong>Free Insured Express Delivery</strong>!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[#6E553D]">
                  <span>Add ₹{amountNeeded.toLocaleString('en-IN')} more for Free Courier</span>
                  <span className="font-bold text-[#B88325]">Goal: ₹999</span>
                </div>
                <div className="w-full bg-[#EADBC4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5EEDC] border border-[#DFC99A] flex items-center justify-center text-[#B88325] mb-3">
                  <ShoppingBagIcon className="w-8 h-8" />
                </div>
                <p className="text-base font-serif italic text-[#2C1D0E] font-bold">Your bag is empty</p>
                <p className="text-xs text-[#8C755D] mt-1">Discover our pure non-alcoholic artisanal attars.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.variantId}
                  className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#EADBCA] flex gap-3.5 items-center shadow-2xs"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-[#DFC99A] bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif italic font-bold text-[#2C1D0E] truncate">{item.title}</h4>
                    <p className="text-xs text-[#7A6045]">{item.variantTitle}</p>
                    <div className="text-xs font-bold text-[#B88325] mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-[#FFFDF9] border border-[#DEC99D] text-[#2C1D0E] text-xs flex items-center justify-center hover:bg-[#F5EEDC] font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-[#FFFDF9] border border-[#DEC99D] text-[#2C1D0E] text-xs flex items-center justify-center hover:bg-[#F5EEDC] font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.variantId)}
                    className="text-[#998066] hover:text-red-600 text-xs ml-1"
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
            <div className="p-5 border-t border-[#E8DCBE] bg-[#FAF6EE] space-y-3.5">
              <div className="space-y-1.5 text-xs text-[#6E553D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#2C1D0E] font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Delhivery Express)</span>
                  <span className="text-emerald-700 font-bold">
                    {isFreeShipping ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E2D2B8] flex justify-between text-base font-serif italic font-bold text-[#2C1D0E]">
                  <span>Grand Total</span>
                  <span className="text-[#B88325]">₹{(subtotal + (isFreeShipping ? 0 : 99)).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#F5D88E] via-[#E2B858] to-[#C99632] text-[#2C1D0E] font-bold text-xs uppercase tracking-widest shadow-md hover:brightness-105 transition disabled:opacity-50 active:scale-95"
              >
                {loading ? 'Connecting to Shopify Hosted Checkout...' : 'Proceed to Checkout ->'}
              </button>

              {/* Badges */}
              <div className="pt-1 flex items-center justify-center gap-4 text-[11px] text-[#7A634D]">
                <div className="flex items-center gap-1">
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                  <span>Shopify 256-Bit SSL</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#B88325] font-bold">COD</span>
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
