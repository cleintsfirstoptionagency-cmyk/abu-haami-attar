'use client';

import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  isStar?: boolean;
}

// 32 deterministic static particles (glowing spheres & sparkle stars)
const PARTICLES: Particle[] = [
  { id: 1, top: 15, left: 16, size: 5, duration: 3.8, delay: 0.2 },
  { id: 2, top: 24, left: 82, size: 6, duration: 4.5, delay: 1.1, isStar: true },
  { id: 3, top: 36, left: 24, size: 5, duration: 3.5, delay: 0.6 },
  { id: 4, top: 48, left: 76, size: 4, duration: 5.2, delay: 2.1 },
  { id: 5, top: 18, left: 62, size: 7, duration: 4.1, delay: 0.9, isStar: true },
  { id: 6, top: 30, left: 45, size: 5, duration: 4.8, delay: 0.4 },
  { id: 7, top: 58, left: 14, size: 6, duration: 3.9, delay: 2.4 },
  { id: 8, top: 68, left: 86, size: 5, duration: 4.4, delay: 1.7, isStar: true },
  { id: 9, top: 42, left: 52, size: 8, duration: 3.2, delay: 0.3, isStar: true },
  { id: 10, top: 26, left: 90, size: 4, duration: 5.0, delay: 2.8 },
  { id: 11, top: 72, left: 30, size: 6, duration: 4.2, delay: 0.8 },
  { id: 12, top: 82, left: 68, size: 5, duration: 4.6, delay: 2.2, isStar: true },
  { id: 13, top: 20, left: 36, size: 5, duration: 3.9, delay: 1.5 },
  { id: 14, top: 54, left: 88, size: 4, duration: 5.5, delay: 0.3 },
  { id: 15, top: 64, left: 48, size: 6, duration: 3.6, delay: 2.6, isStar: true },
  { id: 16, top: 38, left: 10, size: 5, duration: 4.7, delay: 1.0 },
  { id: 17, top: 78, left: 20, size: 7, duration: 3.7, delay: 0.5, isStar: true },
  { id: 18, top: 86, left: 78, size: 4, duration: 5.1, delay: 2.7 },
  { id: 19, top: 32, left: 68, size: 5, duration: 4.3, delay: 1.3 },
  { id: 20, top: 16, left: 48, size: 5, duration: 4.9, delay: 1.9 },
  { id: 21, top: 56, left: 34, size: 6, duration: 4.0, delay: 0.7, isStar: true },
  { id: 22, top: 46, left: 22, size: 4, duration: 5.4, delay: 2.5 },
  { id: 23, top: 88, left: 44, size: 5, duration: 3.8, delay: 1.1 },
  { id: 24, top: 22, left: 8, size: 5, duration: 4.9, delay: 2.3 },
  { id: 25, top: 62, left: 64, size: 6, duration: 3.4, delay: 0.1, isStar: true },
  { id: 26, top: 76, left: 92, size: 4, duration: 5.3, delay: 1.6 },
  { id: 27, top: 34, left: 78, size: 5, duration: 4.1, delay: 2.8, isStar: true },
  { id: 28, top: 92, left: 16, size: 5, duration: 4.5, delay: 0.4 },
  { id: 29, top: 40, left: 84, size: 6, duration: 3.7, delay: 1.2 },
  { id: 30, top: 70, left: 54, size: 5, duration: 4.6, delay: 2.0, isStar: true },
  { id: 31, top: 84, left: 32, size: 4, duration: 5.0, delay: 0.9 },
  { id: 32, top: 28, left: 28, size: 6, duration: 3.9, delay: 1.8, isStar: true },
];

export const GoldenDotsOverlay: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatDottedParticle ${p.duration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity',
          }}
        >
          {p.isStar ? (
            <span
              className="text-[#FFE082] text-[10px] leading-none drop-shadow-[0_0_8px_rgba(255,215,64,0.95)]"
              style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
            >
              ✦
            </span>
          ) : (
            <span
              className="w-full h-full rounded-full bg-gradient-to-tr from-[#FFE082] via-[#FFD54F] to-[#FFF9C4]"
              style={{
                boxShadow: `0 0 ${p.size * 2.5}px rgba(255, 215, 64, 0.95), 0 0 ${p.size * 5}px rgba(226, 184, 88, 0.7)`,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};
