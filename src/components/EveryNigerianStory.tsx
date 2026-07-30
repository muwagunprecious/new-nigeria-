'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function EveryNigerianStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setRipplePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setTimeout(() => setRipplePos(null), 800);
    }
    document.getElementById('submission-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#1A0D1E] to-[#0A0A0A] px-6 py-24"
    >
      {/* Cinematic light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#C49A3C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#DAA520]/3 rounded-full blur-[100px]" />
        <motion.div
          className="absolute top-[20%] left-[30%] w-[2px] h-[40%] bg-gradient-to-b from-transparent via-[#DAA520]/10 to-transparent"
          animate={{ rotate: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[30%] right-[25%] w-[1px] h-[30%] bg-gradient-to-b from-transparent via-[#C49A3C]/8 to-transparent"
          animate={{ rotate: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Golden feather */}
      <motion.div
        className="absolute top-[15%] text-5xl sm:text-6xl"
        initial={{ y: -200, rotate: 180, scale: 0.3, opacity: 0 }}
        animate={isInView ? { y: 0, rotate: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94], type: 'spring', damping: 12 }}
      >
        <span className="inline-block drop-shadow-[0_0_20px_rgba(218,165,32,0.5)]">🪶</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <motion.h2
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#F5E6C8] mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Every Nigerian
          <br />
          <span className="text-[#DAA520]">Has A Story</span>
        </motion.h2>

        <motion.p
          className="text-xl sm:text-2xl text-[#C49A3C] font-serif italic mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
        >
          Tell Yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8, type: 'spring', damping: 15 }}
        >
          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-b from-[#DAA520] to-[#B8860B] text-[#1A0D1E] font-bold uppercase tracking-wider text-sm sm:text-base border-2 border-[#FFD700] rounded-sm overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(218,165,32,0.3), inset 0 1px 0 rgba(255,215,0,0.4)' }}
          >
            {/* Golden particles on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={false}
              whileHover="hover"
            >
              {[
                { x: 30, y: -30 }, { x: -25, y: -35 }, { x: 40, y: -20 },
                { x: -35, y: -25 }, { x: 20, y: -40 }, { x: -20, y: -45 },
              ].map((dir, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-[#FFD700] rounded-full"
                  style={{ left: `${20 + i * 13}%`, top: '50%' }}
                  variants={{
                    hover: {
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      x: [0, dir.x],
                      y: [0, dir.y],
                      transition: { duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeOut' },
                    },
                  }}
                />
              ))}
            </motion.div>

            {/* Paper fold effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />

            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Submit Your Animated Nigerian Story
            </span>

            {/* Click ripple */}
            {ripplePos && (
              <motion.div
                className="absolute w-0 h-0 rounded-full bg-white/30 pointer-events-none"
                style={{
                  left: ripplePos.x,
                  top: ripplePos.y,
                }}
                initial={{ width: 0, height: 0, opacity: 0.6 }}
                animate={{ width: 300, height: 300, opacity: 0, x: -150, y: -150 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            )}
          </button>

          <motion.p
            className="mt-6 text-xs text-[#8B7355] font-serif italic"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2.3 }}
          >
            Join thousands of Nigerians preserving our heritage through animation
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#DAA520]/30 to-transparent" />
    </section>
  );
}
