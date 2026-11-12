'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  opacitySpeed: number;
  color: string;
  glowColor: string;
}

export const GoldenDotsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#FFE082', '#FFD54F', '#FFF9C4', '#FFCA28', '#FFFFFF'];
    const particlesCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2, // 1.2px to 4px
        speedY: -(Math.random() * 0.7 + 0.3), // Drifting upward
        speedX: (Math.random() - 0.5) * 0.5, // Slight horizontal drift
        opacity: Math.random() * 0.7 + 0.3,
        opacitySpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        glowColor: '#FFD54F',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacitySpeed;

        // Oscillate opacity
        if (p.opacity > 0.95 || p.opacity < 0.2) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        // Reset if off-screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing golden particle
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.opacity));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.radius * 3.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw occasional sparkle cross for larger particles
        if (p.radius > 2.5) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - p.radius * 2, p.y);
          ctx.lineTo(p.x + p.radius * 2, p.y);
          ctx.moveTo(p.x, p.y - p.radius * 2);
          ctx.lineTo(p.x, p.y + p.radius * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20 w-full h-full select-none"
    />
  );
};
