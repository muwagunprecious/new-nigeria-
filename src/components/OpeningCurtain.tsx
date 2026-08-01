'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';

const proverbs = [
  { text: "No matter how long the neck of a giraffe is, it cannot see the future.", origin: "Nigerian Proverb" },
  { text: "He who wants to eat honey from the rock must not look at the edge of his axe.", origin: "Yoruba Proverb" },
  { text: "A tiger does not proclaim its tigritude; it acts.", origin: "Wole Soyinka" },
  { text: "However long the night, the dawn will break.", origin: "Hausa Proverb" },
  { text: "A river that forgets its source will dry up.", origin: "Igbo Proverb" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", origin: "African Proverb" }
];

export default function OpeningCurtain() {
  const { setSoundActive } = useGlobalState();
  // Only show the intro curtain once per browser session
  const [show, setShow] = useState(false);
  const [proverb, setProverb] = useState({ text: '', origin: '' });

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem('nigeria_intro_seen', '1');
  };

  useEffect(() => {
    // Check if user has already seen the intro this session
    const alreadySeen = sessionStorage.getItem('nigeria_intro_seen');
    if (alreadySeen) {
      setShow(false);
      return;
    }

    // Select random proverb
    const rand = proverbs[Math.floor(Math.random() * proverbs.length)];
    setProverb(rand);
    setShow(true);

    // Auto dismiss after 7 seconds if not manually skipped
    const timer = setTimeout(() => {
      handleDismiss();
    }, 7000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSynthIntro = () => {
    try {
      const AC = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
      const ctx = new AC();
      // Synthesize a brief welcoming talking drum note
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.4);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
      setSoundActive(true);
    } catch (e) {
      console.log("Audio not supported yet", e);
    }
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          exit={{ pointerEvents: 'none' }}
        >
          {/* Left Ankara Curtain */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#5D4037] z-10 border-r-4 border-black border-dashed flex justify-end items-center"
            style={{
              backgroundImage: `url('/assets/paper_texture.jpg')`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
              backgroundColor: '#5D4037'
            }}
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            {/* Ankara overlay detail */}
            <div className="w-12 h-full opacity-25 bg-[radial-gradient(#FFD400_20%,transparent_20%)] bg-[size:20px_20px]" />
          </motion.div>

          {/* Right Ankara Curtain */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#5D4037] z-10 border-l-4 border-black border-dashed flex justify-start items-center"
            style={{
              backgroundImage: `url('/assets/paper_texture.jpg')`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
              backgroundColor: '#5D4037'
            }}
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            {/* Ankara overlay detail */}
            <div className="w-12 h-full opacity-25 bg-[radial-gradient(#FF6B00_20%,transparent_20%)] bg-[size:20px_20px]" />
          </motion.div>

          {/* Center Proverb Board */}
          <motion.div
            className="z-20 max-w-xl mx-4 p-8 bg-[#1A0D33] border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000000] text-center"
            style={{
              backgroundImage: `url('/assets/paper_texture.jpg')`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-[#FFD400] text-xs font-bold uppercase tracking-wider block mb-4">
              ✧ Wisdom of the Soil ✧
            </span>
            <h2 className="text-white text-2xl font-extrabold font-outfit leading-relaxed italic mb-4">
              {'"'}{proverb.text}{'"'}
            </h2>
            <p className="text-[#FF6B00] font-bold text-sm mb-8">— {proverb.origin}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={playSynthIntro}
                className="btn-3d btn-3d-yellow text-sm focus-hand-drawn"
              >
                🥁 Enter with Sound
              </button>
              <button
                onClick={handleDismiss}
                className="btn-3d border-white bg-transparent text-white hover:bg-white hover:text-black text-sm focus-hand-drawn"
              >
                Skip Intro
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
