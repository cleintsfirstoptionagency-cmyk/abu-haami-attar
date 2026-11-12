'use client';

import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// 28 deterministic static particles (NO Math.random to prevent SSR hydration mismatch)
const STATIC_PARTICLES: Particle[] = [
  { id: 1, top: 12, left: 18, size: 3, duration: 4.2, delay: 0.2, opacity: 0.8 },
  { id: 2, top: 22, left: 82, size: 2.5, duration: 5.1, delay: 1.4, opacity: 0.6 },
  { id: 3, top: 35, left: 28, size: 4, duration: 3.8, delay: 0.8, opacity: 0.75 },
  { id: 4, top: 48, left: 74, size: 2, duration: 6.0, delay: 2.1, opacity: 0.5 },
  { id: 5, top: 15, left: 62, size: 3.5, duration: 4.5, delay: 1.1, opacity: 0.7 },
  { id: 6, top: 28, left: 45, size: 2, duration: 5.4, delay: 0.5, opacity: 0.6 },
  { id: 7, top: 58, left: 14, size: 3, duration: 4.0, delay: 2.7, opacity: 0.8 },
  { id: 8, top: 68, left: 86, size: 2.5, duration: 4.8, delay: 1.9, opacity: 0.7 },
  { id: 9, top: 42, left: 52, size: 4, duration: 3.5, delay: 0.3, opacity: 0.85 },
  { id: 10, top: 25, left: 92, size: 2, duration: 5.8, delay: 3.2, opacity: 0.55 },
  { id: 11, top: 72, left: 32, size: 3.5, duration: 4.6, delay: 0.9, opacity: 0.65 },
  { id: 12, top: 82, left: 68, size: 2.5, duration: 5.0, delay: 2.4, opacity: 0.7 },
  { id: 13, top: 18, left: 38, size: 3, duration: 4.3, delay: 1.7, opacity: 0.8 },
  { id: 14, top: 52, left: 88, size: 2, duration: 6.2, delay: 0.4, opacity: 0.5 },
  { id: 15, top: 64, left: 48, size: 3.5, duration: 3.9, delay: 2.8, opacity: 0.75 },
  { id: 16, top: 38, left: 10, size: 2.5, duration: 5.2, delay: 1.2, opacity: 0.6 },
  { id: 17, top: 78, left: 22, size: 4, duration: 4.1, delay: 0.6, opacity: 0.8 },
  { id: 18, top: 86, left: 78, size: 2, duration: 5.6, delay: 3.0, opacity: 0.55 },
  { id: 19, top: 30, left: 70, size: 3, duration: 4.7, delay: 1.5, opacity: 0.7 },
  { id: 20, top: 14, left: 50, size: 2.5, duration: 5.3, delay: 2.2, opacity: 0.65 },
  { id: 21, top: 56, left: 36, size: 3.5, duration: 4.4, delay: 0.7, opacity: 0.8 },
  { id: 22, top: 45, left: 24, size: 2, duration: 6.1, delay: 2.9, opacity: 0.5 },
  { id: 23, top: 88, left: 42, size: 3, duration: 4.2, delay: 1.0, opacity: 0.75 },
  { id: 24, top: 20, left: 8, size: 2.5, duration: 5.5, delay: 2.5, opacity: 0.6 },
  { id: 25, top: 60, left: 64, size: 3.5, duration: 3.7, delay: 0.1, opacity: 0.85 },
  { id: 26, top: 75, left: 94, size: 2, duration: 5.9, delay: 1.8, opacity: 0.5 },
  { id: 27, top: 32, left: 80, size: 3, duration: 4.5, delay: 3.1, opacity: 0.7 },
  { id: 28, top: 92, left: 16, size: 2.5, duration: 4.9, delay: 0.5, opacity: 0.65 },
];

export const GoldenDotsOverlay: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {STATIC_PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-[#FFE082] via-[#FFD54F] to-[#FFF9C4]"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 215, 64, 0.9), 0 0 ${p.size * 4}px rgba(226, 184, 88, 0.5)`,
            animation: `floatDottedParticle ${p.duration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
