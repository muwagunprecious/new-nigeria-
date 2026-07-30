'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const facts = [
  "Nigeria has over 500 languages.",
  "Benin Bronzes are among the world's most celebrated artworks.",
  "The Nok Civilization produced remarkable terracotta sculptures over 2,000 years ago.",
  "The National Theatre in Lagos was inspired by military hat architecture.",
  "The first African Nobel Prize in Literature was won by Wole Soyinka.",
  "Nigeria is home to the second longest bridge in Africa — the Third Mainland Bridge.",
  "The name 'Nigeria' was coined by British journalist Flora Shaw in 1897.",
  "Nigeria's film industry, Nollywood, is the second largest in the world by volume.",
  "The Yoruba people have one of the highest rates of twins in the world.",
  "Ancient Nsibidi script in southeastern Nigeria dates back over 5,000 years.",
];

export default function DidYouKnowBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [fact, setFact] = useState(facts[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isOpen) {
      setFact(facts[Math.floor(Math.random() * facts.length)]);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className="fixed right-2 md:right-4 bottom-24 z-[100] select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-64 bg-[#F5E6C8] text-black border-2 border-[#8B7355] rounded-sm shadow-lg mb-3 overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(135deg, #F5E6C8 0%, #EDD9B3 100%)',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#C49A3C]" />
            <div className="p-4 pt-5">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-lg">📜</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Did You Know?</span>
              </div>
              <p className="text-sm font-serif italic leading-relaxed text-[#3C2415]">
                &ldquo;{fact}&rdquo;
              </p>
              <div className="mt-3 flex justify-end">
                <span className="text-[10px] text-[#C49A3C] font-bold">✦ Heritage Fact</span>
              </div>
            </div>
            <div className="absolute top-3 right-3 w-2 h-2 bg-[#C49A3C] rounded-full shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className="relative flex items-center gap-2 bg-[#F5E6C8] border-2 border-[#8B7355] px-3 py-2 rounded-sm shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        style={{
          backgroundImage: 'linear-gradient(135deg, #F5E6C8 0%, #EDD9B3 100%)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#C49A3C] rounded-full border border-[#8B7355] shadow-sm" />
        <span className="text-sm">📌</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C3D1A]">
          Did You Know?
        </span>
        <span className="text-[8px] text-[#8B7355] ml-1">{isOpen ? '▼' : '▲'}</span>
      </motion.button>
    </div>
  );
}
