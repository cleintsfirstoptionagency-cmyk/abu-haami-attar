'use client';

import React, { useMemo } from 'react';

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const GoldenDotsOverlay: React.FC = () => {
  // Generate 28 continuous floating glowing golden dots
  const particles: Particle[] = useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      arr.push({
        id: i,
        top: Math.random() * 90 + 5, // 5% to 95%
        left: Math.random() * 92 + 4, // 4% to 96%
        size: Math.random() * 3 + 2, // 2px to 5px
        duration: Math.random() * 3.5 + 3, // 3s to 6.5s
        delay: Math.random() * 4, // 0s to 4s
        opacity: Math.random() * 0.5 + 0.4, // 0.4 to 0.9
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {particles.map((p) => (
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

