'use client';

import React from 'react';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWhatsApp: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  onOpenCart,
  onOpenWhatsApp,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-lg border-t border-[#E8DCC2] md:hidden px-2 py-2 shadow-[0_-4px_15px_rgba(66,46,27,0.06)]">
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <a
          href="#"
          className="flex flex-col items-center justify-center text-[#B88325] group py-1"
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold tracking-wider">Home</span>
        </a>

        {/* Categories */}
        <a
          href="#collection"
          className="flex flex-col items-center justify-center text-[#735D46] hover:text-[#B88325] group py-1 transition"
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[10px] font-medium tracking-wider">Categories</span>
        </a>

        {/* Wishlist */}
        <button
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center text-[#735D46] hover:text-emerald-700 group py-1 transition"
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-[10px] font-medium tracking-wider">Wishlist</span>
        </button>

        {/* Account */}
        <button
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center text-[#735D46] hover:text-[#B88325] group py-1 transition"
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-medium tracking-wider">Account</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center text-[#735D46] hover:text-[#B88325] group py-1 transition relative"
        >
          <div className="relative">
            <svg className="w-5 h-5 mb-0.5 text-[#B88325]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#D4A037] text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-wider text-[#B88325]">Cart</span>
        </button>
      </div>
    </nav>
  );
};
