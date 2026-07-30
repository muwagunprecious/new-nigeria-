'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { ChevronDown, Send, BookOpen } from 'lucide-react';

export default function HeroSection() {
  const { language, calmMode, dictionary } = useGlobalState();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const t = (key: string) => {
    return dictionary[key]?.[language] || key;
  };

  const handleScrollToNext = () => {
    document.getElementById('culture-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Smoke bubble generator for the exhaust pipe
  const smokeVariant = (delay: number) => ({
    animate: {
      x: [0, -40],
      y: [0, -15],
      scale: [0.5, 1.3],
      opacity: [0.6, 0],
      transition: { repeat: Infinity, duration: 1.5, delay, ease: "easeOut" as const }
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden border-b-8 border-black flex flex-col justify-between"
    >
      {/* 1. WARM LAGOS BANNER BACKGROUND ILLUSTRATION */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/danfo_wahala_hero.jpg"
          alt="Lagos Danfo Wahala Street Scene"
          className="w-full h-full object-cover"
        />
        {/* Subtle paper texture overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/paper_texture.jpg')",
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply'
          }}
        />
        {/* Warm shadow vignetting */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* 2. SKY OVERLAY ANIMATIONS (respects calmMode) */}
      {!calmMode && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Drifting Clouds */}
          <div className="absolute top-[8%] left-[-10%] w-72 h-16 bg-white/10 blur-md rounded-full animate-cloud-slow" />
          <div className="absolute top-[18%] left-[-30%] w-96 h-20 bg-white/5 blur-md rounded-full animate-cloud-fast" />

          {/* Flying Birds */}
          <svg viewBox="0 0 100 50" className="absolute top-[10%] w-16 h-8 text-black/30 fill-current animate-bird">
            <path d="M 0 25 Q 25 0 50 25 Q 75 0 100 25 Q 75 10 50 25 Q 25 10 0 25 Z" />
          </svg>
        </div>
      )}

      {/* 3. STREET TRAFFIC OVERLAYS (Only active if not in calmMode) */}
      {!calmMode && (
        <div className="absolute inset-x-0 bottom-[18%] h-24 pointer-events-none z-15">
          {/* A small yellow Danfo bus silhouette driving in background traffic */}
          <svg viewBox="0 0 120 72" className="w-16 h-10 fill-[#2F1F1B] absolute bottom-2 animate-danfo" style={{ animationDuration: '30s' }}>
            <rect x="5" y="5" width="110" height="48" rx="8" />
            <circle cx="30" cy="58" r="10" />
            <circle cx="90" cy="58" r="10" />
          </svg>

          {/* Okada rider silhouette driving past */}
          <svg viewBox="0 0 64 48" className="w-10 h-8 fill-[#422C25] absolute bottom-1 animate-okada" style={{ animationDuration: '14s' }}>
            <circle cx="16" cy="36" r="10" />
            <circle cx="48" cy="36" r="10" />
            <line x1="16" y1="36" x2="48" y2="36" stroke="#000" strokeWidth="6" />
          </svg>

          {/* Bubbling exhaust smoke near the main Danfo's exhaust position (approx bottom left) */}
          <div className="absolute left-[13%] bottom-[-5px] z-20">
            <motion.div className="absolute w-4 h-4 bg-gray-400/60 border-2 border-black rounded-full" {...smokeVariant(0)} />
            <motion.div className="absolute w-6 h-6 bg-gray-400/40 border-2 border-black rounded-full" {...smokeVariant(0.5)} />
            <motion.div className="absolute w-5 h-5 bg-gray-400/20 border-2 border-black rounded-full" {...smokeVariant(1.0)} />
          </div>
        </div>
      )}

      {/* 4. TITLE & ACTION OVERLAY (Foreground) */}
      <div className="relative z-30 pt-[12vh] flex flex-col items-center justify-between h-full pb-16 px-4">
        {/* Guinness World Records Official Attempt Splash */}
        <motion.div
          className="absolute top-4 left-4 z-40 bg-[#001D3D] text-[#FFD400] border-4 border-black px-3 py-2 rounded shadow-[4px_4px_0_0_#000] flex items-center gap-2 select-none rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current shrink-0">
            <path d="M 12 10 Q 5 20 12 30 Q 8 20 12 10 Z" />
            <path d="M 28 10 Q 35 20 28 30 Q 32 20 28 10 Z" />
            <polygon points="20,12 22,17 27,17 23,20 25,25 20,22 15,25 17,20 13,17 18,17" />
            <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
          <div className="flex flex-col text-left font-outfit">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-white leading-none">Official</span>
            <span className="text-xs font-black uppercase tracking-tight text-[#FFD400] leading-none mt-0.5">Guinness</span>
            <span className="text-[8px] font-bold uppercase tracking-wider text-gray-300 leading-none mt-0.5">World Records™</span>
          </div>
        </motion.div>
        {/* Floating title block */}
        <motion.div
          className="bg-white text-black p-5 sm:p-7 border-4 border-black rounded shadow-[8px_8px_0px_0px_#000] rotate-[-1deg] max-w-2xl text-center"
          style={{
            backgroundImage: "url('/assets/paper_texture.jpg')",
            backgroundSize: 'cover',
            backgroundBlendMode: 'overlay',
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <div className="absolute top-[-6px] left-[20%] w-10 h-3 bg-gray-400 border-2 border-black rounded" />
          <div className="absolute top-[-6px] right-[20%] w-10 h-3 bg-gray-400 border-2 border-black rounded" />

          <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit uppercase tracking-tight text-black mb-2">
            {t('heroTitle')}
          </h1>
          <p className="text-sm sm:text-xl font-bold font-inter text-gray-800 italic">
            {'"'}{t('heroSubtitle')}{'"'}
          </p>
        </motion.div>

        {/* Floating CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8 bg-black/40 p-4 border-2 border-black rounded backdrop-blur-sm"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="#submission-section"
            className="btn-3d btn-3d-orange text-sm flex items-center gap-2 focus-hand-drawn"
          >
            <Send className="w-4 h-4" />
            {t('ctaSubmit')}
          </a>
          <a
            href="#how-it-works"
            className="btn-3d btn-3d-yellow text-sm flex items-center gap-2 focus-hand-drawn"
          >
            <BookOpen className="w-4 h-4" />
            {t('ctaLearn')}
          </a>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-2 bg-[#FFD400] text-black border-4 border-black rounded-full shadow-[4px_4px_0_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] transition-all cursor-pointer focus-hand-drawn animate-bounce"
        aria-label="Scroll Down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  );
}
