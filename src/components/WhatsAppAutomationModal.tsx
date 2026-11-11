'use client';

import React, { useState } from 'react';
import { WhatsAppIcon, CloseIcon, SparklesIcon, TruckIcon, ShieldCheckIcon } from './Icons';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppAutomationModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'abandoned' | 'cod' | 'tracking'>('cod');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" />

        {/* Center Modal */}
        <div className="inline-block align-bottom bg-[#130f0c] border border-amber-900/60 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-12 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#1d1610] to-[#2b1f14] border-b border-[#2b2117] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-[#fcf9f2]">Live WhatsApp Automations (Interakt / BiteSpeed)</h3>
                <p className="text-xs text-emerald-400/90 font-mono">Meta Official Business Cloud API Active</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#8c7e6e] hover:text-white hover:bg-[#2e2318] transition"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Workflow Tabs */}
          <div className="flex border-b border-[#231b14] bg-[#0c0a08] overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('cod')}
              className={`px-5 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'cod'
                  ? 'border-amber-400 text-amber-300 bg-[#16120e]'
                  : 'border-transparent text-[#948777] hover:text-white'
              }`}
            >
              1. COD Anti-RTO Verify
            </button>
            <button
              onClick={() => setActiveTab('abandoned')}
              className={`px-5 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'abandoned'
                  ? 'border-amber-400 text-amber-300 bg-[#16120e]'
                  : 'border-transparent text-[#948777] hover:text-white'
              }`}
            >
              2. Abandoned Cart Push
            </button>
            <button
              onClick={() => setActiveTab('welcome')}
              className={`px-5 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'welcome'
                  ? 'border-amber-400 text-amber-300 bg-[#16120e]'
                  : 'border-transparent text-[#948777] hover:text-white'
              }`}
            >
              3. Welcome & Signup
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-5 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'tracking'
                  ? 'border-amber-400 text-amber-300 bg-[#16120e]'
                  : 'border-transparent text-[#948777] hover:text-white'
              }`}
            >
              4. Delhivery / Shiprocket Live Track
            </button>
          </div>

          {/* Tab Content: WhatsApp Simulated Screen */}
          <div className="p-6 bg-[#0a0806]">
            <div className="max-w-md mx-auto bg-[#1a231f] rounded-2xl p-4 border border-emerald-900/40 shadow-inner">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-emerald-900/40 text-xs text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Al-Attar Official Bot * WhatsApp Verified Business</span>
              </div>

              {activeTab === 'cod' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#0b1410] border border-emerald-800/40 text-xs text-[#d6ede1] space-y-2">
                    <p className="font-semibold text-emerald-300">Order Confirmation Required 📦</p>
                    <p>
                      Assalamu Alaikum <strong>Mohammed</strong>! Aapne <strong>Al-Attar Haute Parfumerie</strong> par Cash on Delivery (COD) order place kiya hai.
                    </p>
                    <div className="p-2.5 rounded bg-black/40 border border-emerald-950 font-mono text-[11px] space-y-1">
                      <div>Order #AL-8492</div>
                      <div>Item: Dehn Al Oud Cambodi (6ml)</div>
                      <div>Total: ₹4,499 (COD)</div>
                      <div>Delivery Address: Hazratganj, Lucknow - 226001</div>
                    </div>
                    <p className="text-[11px] text-[#9fc7b1]">
                      Please niche diye gaye button par click karke apna order confirm karein taake hum Delhivery se parcel dispatch karein.
                    </p>
                  </div>

                  {/* Interactive Button Preview */}
                  <div className="space-y-1.5 pt-1">
                    <button className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>✅ Confirm Order (Dispatch My Attar)</span>
                    </button>
                    <button className="w-full py-2 rounded-lg bg-[#141d18] border border-red-900/40 text-red-400 text-xs font-medium">
                      ❌ Cancel Order
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-[#748e80]">
                    * Confirm dabate hi Shopify par status auto &quot;COD Verified&quot; ho jata hai. RTO fraud khatam!
                  </p>
                </div>
              )}

              {activeTab === 'abandoned' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#0b1410] border border-emerald-800/40 text-xs text-[#d6ede1] space-y-2">
                    <p className="font-semibold text-amber-300">Wait, you forgot your signature scent! ✨</p>
                    <p>
                      Hi <strong>Amina</strong>, humne notice kiya ke aapne <strong>Rooh Gulab (Kannauj Rose 12ml)</strong> cart mein add kiya tha lekin checkout complete nahi hua.
                    </p>
                    <p className="text-[11px] text-[#9fc7b1]">
                      Ye batch pure Kannauj hydro-distillation se tayar hua hai aur limited bottles bachi hain. Hum aapko de rahe hain exclusive <strong>10% OFF + Free Delhivery Shipping</strong>!
                    </p>
                    <div className="p-2 rounded bg-amber-950/30 border border-amber-600/40 text-amber-200 text-center font-mono">
                      Coupon Code: <span className="font-bold tracking-widest">ROYAL10</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md">
                    Complete Order Now with 10% Off ➔
                  </button>
                </div>
              )}

              {activeTab === 'welcome' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#0b1410] border border-emerald-800/40 text-xs text-[#d6ede1] space-y-2">
                    <p className="font-semibold text-emerald-300">Khushamdeed to Al-Attar! 🌿</p>
                    <p>
                      Humare royal perfume community ka hissa banne ke liye shukriya. Har bottle me 0% alcohol aur 100% pure Himalayan/Assam/Cambodian pure oils hain.
                    </p>
                    <p className="text-[11px] text-[#9fc7b1]">
                      Pehle order par 10% instant discount coupon: <strong>FIRSTATTAR</strong>
                    </p>
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md">
                    Explore Attar Collections ➔
                  </button>
                </div>
              )}

              {activeTab === 'tracking' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#0b1410] border border-emerald-800/40 text-xs text-[#d6ede1] space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <TruckIcon className="w-4 h-4" />
                      <span>Out For Delivery! 🚚</span>
                    </div>
                    <p>
                      Hi <strong>Sameer</strong>, aapka Al-Attar parcel warehouse se nikal chuka hai aur Delhivery Express courier par in-transit hai.
                    </p>
                    <div className="p-2.5 rounded bg-black/40 border border-emerald-950 font-mono text-[11px] space-y-1">
                      <div>Courier: <strong>Delhivery Air Express</strong></div>
                      <div>AWB / Tracking No: <strong>DLV983214598</strong></div>
                      <div>Expected Delivery: <strong>Tomorrow, by 6:00 PM</strong></div>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md">
                    Track Live on Delhivery Portal ➔
                  </button>
                </div>
              )}
            </div>

            {/* Explanatory note */}
            <div className="mt-6 p-4 rounded-xl bg-[#140f0c] border border-amber-900/30 text-xs text-[#a39482] space-y-1.5">
              <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                <SparklesIcon className="w-4 h-4 text-amber-400" />
                <span>Shopify App Integration Guide:</span>
              </div>
              <p>
                Ye poora flow Shopify App Store par <strong>Interakt</strong> ya <strong>BiteSpeed</strong> app install karne ke baad 10 minutes mein live ho jata hai. Delhivery & Shiprocket ke AWB codes auto-sync ho jate hain!
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#140f0c] border-t border-[#231b14] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

