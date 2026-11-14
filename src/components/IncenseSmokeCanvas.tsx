'use client';

import React, { useEffect, useRef } from 'react';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  growth: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
  curlFreq: number;
  curlAmp: number;
  seed: number;
  stampIdx: number;
}

interface IncenseSmokeCanvasProps {
  className?: string;
  /** Controls particle count: 'subtle' (~35 particles) or 'rich' (~60 particles) */
  density?: 'subtle' | 'rich';
}

export const IncenseSmokeCanvas: React.FC<IncenseSmokeCanvasProps> = ({
  className = '',
  density = 'rich',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Track mouse / touch for gentle interactive air displacement
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000 };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? -1000 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? -1000 : e.clientY;
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      mouse.vx = px - mouse.lastX;
      mouse.vy = py - mouse.lastY;
      mouse.lastX = mouse.x = px;
      mouse.lastY = mouse.y = py;
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handlePointerMove, { passive: true });
    parent?.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    parent?.addEventListener('touchmove', handlePointerMove, { passive: true });
    parent?.addEventListener('touchend', handlePointerLeave, { passive: true });

    // Handle responsive resizing
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight;
      if (newW > 0 && newH > 0 && (newW !== width || newH !== height)) {
        width = canvas.width = newW;
        height = canvas.height = newH;
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // -------------------------------------------------------------------------
    // Pre-render 3 ultra-soft smoke puff stamps on offscreen canvases
    // for silky 60 FPS GPU-accelerated performance
    // -------------------------------------------------------------------------
    const STAMP_SIZE = 128;
    const stamps: HTMLCanvasElement[] = [];

    const STAMP_CONFIGS = [
      // 1. Pearl Incense Mist (Soft cream / white smoke)
      {
        c0: 'rgba(250, 246, 238, 0.45)',
        c1: 'rgba(235, 225, 210, 0.24)',
        c2: 'rgba(215, 200, 185, 0.08)',
      },
      // 2. Warm Agarwood / Amber Smoke (Subtle gold / royal warmth)
      {
        c0: 'rgba(245, 220, 160, 0.40)',
        c1: 'rgba(226, 184, 88, 0.20)',
        c2: 'rgba(180, 130, 45, 0.06)',
      },
      // 3. Ethereal Night Bakhoor (Silky translucent mystical mist)
      {
        c0: 'rgba(230, 235, 240, 0.38)',
        c1: 'rgba(200, 210, 220, 0.18)',
        c2: 'rgba(160, 175, 190, 0.05)',
      },
    ];

    STAMP_CONFIGS.forEach((cfg) => {
      const off = document.createElement('canvas');
      off.width = STAMP_SIZE;
      off.height = STAMP_SIZE;
      const octx = off.getContext('2d');
      if (octx) {
        const center = STAMP_SIZE / 2;
        const rad = STAMP_SIZE / 2;
        const grad = octx.createRadialGradient(center, center, 0, center, center, rad);
        grad.addColorStop(0, cfg.c0);
        grad.addColorStop(0.35, cfg.c1);
        grad.addColorStop(0.72, cfg.c2);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        octx.fillStyle = grad;
        octx.beginPath();
        octx.arc(center, center, rad, 0, Math.PI * 2);
        octx.fill();
      }
      stamps.push(off);
    });

    // -------------------------------------------------------------------------
    // Particle Management: Emitters placed where smoke is in the attar images
    // -------------------------------------------------------------------------
    const maxParticles = density === 'rich' ? 52 : 32;
    const particles: SmokeParticle[] = [];

    const spawnParticle = (initialPrewarm = false): SmokeParticle => {
      // 3 natural smoke emission zones around the bottle:
      // Zone 0: Left side incense plume (22% to 38% width)
      // Zone 1: Right side incense plume (62% to 78% width)
      // Zone 2: Base drifting mystical mist (38% to 62% width)
      const zoneChoice = Math.random();
      let x = 0;
      let y = 0;

      if (zoneChoice < 0.44) {
        // Left side of bottle where smoke curls upward
        x = width * (0.20 + Math.random() * 0.18);
        y = height * (0.76 + Math.random() * 0.16);
      } else if (zoneChoice < 0.88) {
        // Right side of bottle where smoke curls upward
        x = width * (0.62 + Math.random() * 0.18);
        y = height * (0.76 + Math.random() * 0.16);
      } else {
        // Central low base
        x = width * (0.38 + Math.random() * 0.24);
        y = height * (0.84 + Math.random() * 0.12);
      }

      // Initial start radius: 24px - 45px, expanding up to 90px - 160px as it rises
      const baseRadius = 24 + Math.random() * 22;
      const maxLife = 220 + Math.random() * 160;
      const life = initialPrewarm ? Math.random() * maxLife : 0;

      // Vertical upward drift (slow, majestic rise)
      const vy = -(0.35 + Math.random() * 0.45);
      // Gentle horizontal drift
      const vx = (Math.random() - 0.5) * 0.22;

      if (initialPrewarm) {
        y += vy * life;
        x += vx * life;
      }

      return {
        x,
        y,
        vx,
        vy,
        radius: baseRadius,
        growth: 0.22 + Math.random() * 0.26,
        alpha: 0,
        maxAlpha: 0.30 + Math.random() * 0.28,
        life,
        maxLife,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        curlFreq: 0.012 + Math.random() * 0.015,
        curlAmp: 0.4 + Math.random() * 0.5,
        seed: Math.random() * 100,
        stampIdx: Math.floor(Math.random() * stamps.length),
      };
    };

    // Pre-warm particles so smoke is already gracefully flowing on initial load
    for (let i = 0; i < maxParticles; i++) {
      particles.push(spawnParticle(true));
    }

    // -------------------------------------------------------------------------
    // Main Animation Loop
    // -------------------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Use screen blend mode so the smoke illuminates and merges with the photo's smoke
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife || p.y < -p.radius * 2 || p.x < -p.radius || p.x > width + p.radius) {
          particles[i] = spawnParticle(false);
          continue;
        }

        // Calculate smooth alpha envelope (fade in gently, stay, fade out near top)
        const progress = p.life / p.maxLife;
        // Bell-like curve using sine
        p.alpha = Math.sin(progress * Math.PI) * p.maxAlpha;

        // Smoke particles expand and soften as they rise
        p.radius += p.growth * 0.28;

        // Atmospheric sinusoidal curl motion (realistic smoke vortices)
        const curl = Math.sin(p.life * p.curlFreq + p.seed) * p.curlAmp;
        p.x += p.vx + curl;
        p.y += p.vy;

        p.rotation += p.rotSpeed;

        // Interactive air displacement when mouse or touch moves nearby
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const interactRadius = 140;

        if (distSq < interactRadius * interactRadius && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / interactRadius) * 1.8;
          p.x += (dx / dist) * force + mouse.vx * 0.08;
          p.y += (dy / dist) * force + mouse.vy * 0.08;
        }

        // Render smoke puff using pre-rendered stamp
        const stamp = stamps[p.stampIdx];
        if (stamp && p.alpha > 0.005) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          const diameter = p.radius * 2;
          ctx.drawImage(stamp, -p.radius, -p.radius, diameter, diameter);
          ctx.restore();
        }
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      parent?.removeEventListener('mousemove', handlePointerMove);
      parent?.removeEventListener('mouseleave', handlePointerLeave);
      parent?.removeEventListener('touchmove', handlePointerMove);
      parent?.removeEventListener('touchend', handlePointerLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-20 ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
};

