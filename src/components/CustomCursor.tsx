'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export default function CustomCursor() {
  const { calmMode } = useGlobalState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'paint' | 'pencil' | 'drum' | 'stamp'>('default');
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (calmMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find cursor type from attributes or tags
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorType(cursorAttr as any);
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('btn-3d') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Spawn ink particles
      const colors = ['#000000', '#FF6B00', '#FFD400', '#5D4037'];
      const count = 12 + Math.random() * 8;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [calmMode]);

  // Animation Loop for Canvas Trail & Ink Splashes
  useEffect(() => {
    if (calmMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Ink Trail
      if (trailRef.current.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = '#000000'; // Black ink trail
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw points with decreasing width
        for (let i = 1; i < trailRef.current.length; i++) {
          const pt1 = trailRef.current[i - 1];
          const pt2 = trailRef.current[i];
          const ratio = i / trailRef.current.length;
          
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.lineWidth = ratio * 6;
          ctx.strokeStyle = `rgba(0, 0, 0, ${ratio * 0.25})`;
          ctx.stroke();
        }

        // Age trail
        trailRef.current.forEach((t) => t.age++);
        trailRef.current = trailRef.current.filter((t) => t.age < 25);
      }

      // Draw Click Particles (Ink Splashes)
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.alpha -= 0.02;
        p.size *= 0.98; // Shrink

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);

      animFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animFrameId);
    };
  }, [calmMode]);

  if (calmMode) return null;

  // Render Cursor Mascot
  return (
    <>
      {/* Background Canvas for Trail & Splashes */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] hidden md:block"
      />

      {/* Floating Cursor Mascot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block"
        style={{
          left: coords.x,
          top: coords.y,
        }}
      >
        {/* Render different icons depending on context */}
        {cursorType === 'default' && (
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Danfo Bus Mini Icon */}
            <svg viewBox="0 0 40 24" className="w-8 h-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <rect x="2" y="2" width="36" height="16" rx="4" fill="#FFD400" stroke="#000" strokeWidth="2.5" />
              <rect x="6" y="5" width="10" height="6" rx="1" fill="#fff" stroke="#000" strokeWidth="2" />
              <rect x="20" y="5" width="14" height="6" rx="1" fill="#fff" stroke="#000" strokeWidth="2" />
              {/* Wheels */}
              <circle cx="10" cy="20" r="3" fill="#000" />
              <circle cx="30" cy="20" r="3" fill="#000" />
              {/* Black stripes typical of Danfo */}
              <line x1="2" y1="13" x2="38" y2="13" stroke="#000" strokeWidth="2" />
              <line x1="2" y1="15" x2="38" y2="15" stroke="#000" strokeWidth="2" />
            </svg>
          </div>
        )}

        {cursorType === 'pointer' && (
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Woven Adire Pattern Stamp */}
            <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-bounce-slow">
              <rect x="2" y="2" width="28" height="28" rx="2" fill="#FF6B00" stroke="#000" strokeWidth="3" />
              {/* Woven details */}
              <path d="M6 6 l20 20 M26 6 l-20 20 M16 4 v24 M4 16 h24" stroke="#000" strokeWidth="2.5" />
            </svg>
          </div>
        )}

        {cursorType === 'paint' && (
          <div className="relative w-10 h-10 flex items-center justify-center -rotate-45">
            {/* Paintbrush */}
            <span className="text-3xl">🖌️</span>
          </div>
        )}

        {cursorType === 'pencil' && (
          <div className="relative w-10 h-10 flex items-center justify-center -rotate-45">
            {/* Pencil */}
            <span className="text-3xl">✏️</span>
          </div>
        )}

        {cursorType === 'drum' && (
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Talking Drum Mallet */}
            <span className="text-3xl animate-sway">🔨</span>
          </div>
        )}

        {cursorType === 'stamp' && (
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Stamp */}
            <span className="text-3xl drop-shadow-[1px_2px_0px_rgba(0,0,0,1)]">印</span>
          </div>
        )}
      </div>
    </>
  );
}
