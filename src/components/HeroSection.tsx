'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { ChevronDown, Send, BookOpen } from 'lucide-react';

// Letter-by-letter paint reveal animation
const paintReveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// Ink drip animation per word
const inkDrip = {
  hidden: { scaleY: 0, originY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    },
  }),
};

function PaintText({ text, className, baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  const letters = text.split('');
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          custom={baseDelay + i}
          variants={paintReveal}
          initial="hidden"
          animate="visible"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const { language, calmMode, dictionary } = useGlobalState();
  const [brushStroke, setBrushStroke] = useState(false);

  const t = (key: string) => {
    return dictionary[key]?.[language] || key;
  };

  const handleScrollToNext = () => {
    document.getElementById('culture-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => setBrushStroke(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden border-b-8 border-black flex flex-col justify-between">

      {/* 1. FULL CLEAN BACKGROUND — No dark overlay on image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero_lagos_bg.jpg"
          alt="Lagos Nigeria Cityscape"
          className={`w-full h-full object-cover ${calmMode ? '' : 'animate-pan-slow'}`}
        />
      </div>

      {/* 2. GUINNESS BADGE — top left */}
      <motion.div
        className="absolute top-6 left-6 z-40"
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{ scale: 1, rotate: -3, opacity: 1 }}
        transition={{ type: 'spring', damping: 10, delay: 0.8 }}
      >
        <div className="relative bg-[#001D3D] text-[#FFD400] border-4 border-[#FFD400] rounded-full w-20 h-20 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(255,212,0,0.6)] hover:scale-110 transition-all cursor-default select-none">
          <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#FFD400]/60 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="z-10 flex flex-col items-center px-1">
            <span className="text-[6px] font-black uppercase tracking-widest text-white leading-tight">Official</span>
            <span className="text-[7px] font-black uppercase text-[#FFD400] leading-tight">Guinness</span>
            <span className="text-[5px] font-bold uppercase text-gray-300 leading-tight">World Records™</span>
            <div className="w-5 h-[1px] bg-[#FFD400] my-0.5" />
            <span className="text-[5px] font-bold uppercase text-white leading-tight">Attempt</span>
          </div>
        </div>
      </motion.div>

      {/* 3. CREATIVE TEXT BLOCK — pinned at bottom-left with paint/ink animations */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-start px-6 sm:px-10 pb-10">

        {/* Brush stroke underlay — just behind the text */}
        <div className="relative max-w-xl">

          {/* Animated brush stroke BG */}
          {brushStroke && !calmMode && (
            <motion.div
              className="absolute inset-0 -m-3 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(20,10,0,0.75) 60%, rgba(0,0,0,0.6) 100%)',
                backdropFilter: 'blur(2px)',
                borderLeft: '4px solid #FFD400',
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          <div className="relative p-3">
            {/* Tag */}
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-5 h-[2px] bg-[#FFD400]" />
              <span className="text-[#FFD400] text-[9px] font-black uppercase tracking-[0.3em]">The Nigeria Story</span>
            </motion.div>

            {/* Main headline — painted letter by letter */}
            <h1 className="font-black font-outfit uppercase leading-tight mb-1" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)' }}>
              <span className="block">
                <PaintText
                  text="There Is An"
                  className="text-white"
                  baseDelay={0}
                />
              </span>
              <span className="block">
                <PaintText
                  text="Untold "
                  className="text-[#FFD400]"
                  baseDelay={12}
                />
                <PaintText
                  text="Nigeria"
                  className="text-[#FF6B00]"
                  baseDelay={19}
                />
              </span>
              <span className="block">
                <PaintText
                  text="Story."
                  className="text-white"
                  baseDelay={27}
                />
              </span>
            </h1>

            {/* Sub — ink drip word reveal */}
            <div className="flex gap-2 flex-wrap mt-1 mb-3" aria-label="Let's Tell It.">
              {["Let's", "Tell", "It."].map((word, i) => (
                <motion.span
                  key={i}
                  className="text-sm sm:text-base font-bold italic text-white/90 inline-block"
                  custom={i}
                  variants={inkDrip}
                  initial="hidden"
                  animate="visible"
                  style={{ transitionDelay: `${1.8 + i * 0.15}s` }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Strip */}
            <motion.p
              className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF6B00] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              7 Years · 250 Tribes · One Nation · One Record
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-row gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7 }}
            >
              <a href="#submission-section" className="btn-3d btn-3d-orange text-xs flex items-center gap-1.5 focus-hand-drawn">
                <Send className="w-3 h-3" />
                {t('ctaSubmit')}
              </a>
              <a href="#how-it-works" className="btn-3d btn-3d-yellow text-xs flex items-center gap-1.5 focus-hand-drawn">
                <BookOpen className="w-3 h-3" />
                {t('ctaLearn')}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. SCROLL DOWN */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-6 right-6 z-50 flex flex-col items-center gap-1 group cursor-pointer focus-hand-drawn"
        aria-label="Scroll Down"
      >
        <span className="text-white/70 text-[9px] font-bold uppercase tracking-widest group-hover:text-[#FFD400] transition-colors">Scroll</span>
        <div className="p-2 bg-[#FFD400] text-black border-4 border-black rounded-full shadow-[4px_4px_0_0_#000] group-hover:translate-y-[-2px] transition-all animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
}
