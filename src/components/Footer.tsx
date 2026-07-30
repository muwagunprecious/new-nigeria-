'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Award, RefreshCw, Send, Sparkles } from 'lucide-react';

interface Trivia {
  q: string;
  a: string[];
  correctIdx: number;
  funFact: string;
}

const triviaQuestions: Trivia[] = [
  {
    q: "What is the official nickname of Nigeria's male national football team?",
    a: ["Golden Eaglets", "Super Eagles", "Super Falcons", "Giant Elephants"],
    correctIdx: 1,
    funFact: "The team was originally known as the Red Devils before changing to Super Eagles in the late 1960s!"
  },
  {
    q: "Which musical genre did the legendary Fela Kuti pioneer in Nigeria?",
    a: ["Highlife", "Juju Music", "Afrobeat", "Reggae"],
    correctIdx: 2,
    funFact: "Afrobeat combines elements of traditional Yoruba percussion, jazz, funk, and highlife."
  },
  {
    q: "Which city served as Nigeria's capital before it was moved to Abuja in 1991?",
    a: ["Ibadan", "Lagos", "Kano", "Calabar"],
    correctIdx: 1,
    funFact: "Lagos remains the commercial powerhouse of West Africa even after the capital relocated."
  },
  {
    q: "What local Pidgin English phrase translates to 'No problem' or 'No worries'?",
    a: ["Wetin dey", "No Wahala", "Oya come", "How far"],
    correctIdx: 1,
    funFact: "'Wahala' means trouble. 'No Wahala' is the universal Naija response for agreement and peace."
  }
];

export default function Footer() {
  const { calmMode, soundActive } = useGlobalState();
  const [currQ, setCurrQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showFact, setShowFact] = useState(false);
  const [score, setScore] = useState(0);

  const triggerSound = (isCorrect: boolean) => {
    if (!soundActive) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        // High double chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else {
        // Low sad buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAnsClick = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === triviaQuestions[currQ].correctIdx;
    if (isCorrect) setScore((s) => s + 1);
    triggerSound(isCorrect);
    setShowFact(true);
  };

  const handleNext = () => {
    setSelectedAns(null);
    setShowFact(false);
    setCurrQ((q) => (q + 1) % triviaQuestions.length);
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t-8 border-black text-white pt-24 pb-8 overflow-hidden z-20">
      {/* 1. LAGOS NIGHT SKYLINE SVG */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none z-0 opacity-40">
        {/* Yellow Crescent Moon */}
        <div className="absolute top-6 left-[10%] w-12 h-12 rounded-full shadow-[-8px_4px_0_0_#FFD400]" />

        {/* Stars */}
        <div className="absolute top-12 left-[30%] w-1.5 h-1.5 bg-white rounded-full animate-flicker" />
        <div className="absolute top-4 left-[65%] w-2 h-2 bg-white rounded-full animate-flicker" style={{ animationDelay: '1s' }} />
        <div className="absolute top-16 left-[80%] w-1 h-1 bg-white rounded-full animate-flicker" style={{ animationDelay: '2s' }} />

        {/* Night Skyline Silhouette */}
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute bottom-0 w-full h-24 fill-[#1A1A1A] stroke-black stroke-[0.3]">
          {/* Bridge pylons */}
          <polygon points="10,20 15,10 20,20" />
          <polygon points="80,20 85,8 90,20" />
          {/* Buildings */}
          <rect x="30" y="5" width="6" height="15" />
          <rect x="42" y="10" width="8" height="10" />
          <rect x="58" y="2" width="5" height="18" />
          <rect x="68" y="7" width="7" height="13" />
        </svg>

        {/* Passing headlights loop */}
        {!calmMode && (
          <div className="absolute bottom-1 left-0 right-0 h-1 overflow-hidden">
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute animate-danfo" style={{ animationDuration: '10s' }} />
            <div className="w-2 h-2 bg-red-600 rounded-full absolute animate-keke" style={{ animationDuration: '8s' }} />
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
        {/* Column 1: Info and CTA */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black font-outfit uppercase tracking-tight text-[#FFD400]">
            The Nigeria Story
          </h3>
          <p className="text-xs text-gray-400 font-semibold leading-relaxed max-w-sm">
            A Guinness World Record project designed to celebrate Nigerian stories, history, and animation. Created by Adetunwase Adenle.
          </p>
          <div className="flex gap-4">
            <a href="#submission-section" className="btn-3d btn-3d-yellow text-xs">
              Tell Your Story
            </a>
            <a href="#how-it-works" className="btn-3d btn-3d-orange text-xs">
              Academy
            </a>
          </div>
        </div>

        {/* Column 2: Interactive Trivia Card */}
        <div className="bg-[#1E1E1E] border-4 border-black p-6 rounded shadow-[6px_6px_0_0_#000] relative lg:col-span-2 max-w-xl w-full"
             style={{
               backgroundImage: "url('/assets/paper_texture.jpg')",
               backgroundSize: 'cover',
               backgroundBlendMode: 'multiply',
               backgroundColor: '#1E1E1E'
             }}
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-800">
            <span className="text-[10px] font-black uppercase text-[#FFD400] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#FF6B00]" />
              Naija Trivia Corner
            </span>
            <span className="text-[10px] bg-black text-white px-2 py-0.5 border border-black rounded font-black">
              Score: {score}/{triviaQuestions.length}
            </span>
          </div>

          {/* Question */}
          <h4 className="text-sm font-black font-outfit uppercase text-white mb-4">
            Q: {triviaQuestions[currQ].q}
          </h4>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {triviaQuestions[currQ].a.map((option, idx) => {
              let btnClass = "bg-black text-white hover:bg-[#1E1E1E] border-2 border-black";
              if (selectedAns !== null) {
                if (idx === triviaQuestions[currQ].correctIdx) {
                  btnClass = "bg-green-600 text-white border-2 border-black";
                } else if (idx === selectedAns) {
                  btnClass = "bg-red-600 text-white border-2 border-black";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnsClick(idx)}
                  className={`p-3 text-left rounded text-xs font-bold font-outfit uppercase transition-all focus-hand-drawn ${btnClass}`}
                  disabled={selectedAns !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Fact Drawer */}
          <AnimatePresence>
            {showFact && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-black/40 border border-gray-800 rounded p-3 text-[11px] font-semibold text-gray-300 leading-relaxed mb-4"
              >
                <span className="text-[#FFD400] font-black uppercase mr-1">Did you know?</span>
                {triviaQuestions[currQ].funFact}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {selectedAns !== null && (
            <button
              onClick={handleNext}
              className="btn-3d btn-3d-yellow w-full text-xs flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Next Trivia Gist
            </button>
          )}
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="border-t border-gray-900 pt-8 max-w-6xl mx-auto px-6 text-center flex flex-col sm:flex-row justify-between items-center text-[10px] font-extrabold text-gray-500 gap-4">
        <span>© {new Date().getFullYear()} THE NIGERIA STORY. ALL RIGHTS HAND-PAINTED.</span>
        <span>GUINNESS WORLD RECORD PROJECT #5 BY ADETUNWASE ADENLE</span>
      </div>
    </footer>
  );
}
