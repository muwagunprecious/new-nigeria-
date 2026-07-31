'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { X, ChevronDown } from 'lucide-react';

const SECTION_MESSAGES: Record<string, { title: string; text: string; mood: 'curious' | 'sad' | 'proud' | 'excited' | 'angry' }> = {
  hero: {
    title: 'What are the stories slowly forgotten?',
    text: 'Welcome. I am Emeka. There are stories about Nigeria that the world has never heard. Let me walk with you...',
    mood: 'curious',
  },
  'history-book-section': {
    title: 'The Benin Kingdom — 1897',
    text: 'Did you know the British looted over 3,000 Benin Bronzes and called it civilization? The Kingdom never fell. It was stolen.',
    mood: 'angry',
  },
  'culture-section': {
    title: '250 Tribes. One Nation.',
    text: 'Each tribe has its own language, music, food, and dance. But slowly... the youth stop speaking their mother tongue.',
    mood: 'sad',
  },
  'presidents-section': {
    title: 'The Leaders Who Shaped Us',
    text: 'Every leader left a mark on Nigeria. Some built. Some broke. History remembers all of them — if we choose to tell it.',
    mood: 'proud',
  },
  'legends-section': {
    title: 'The Forgotten Legends',
    text: 'Fela Kuti. Chinua Achebe. Wole Soyinka. Heroes that changed the world — but do the children know their names?',
    mood: 'sad',
  },
  'guinness-section': {
    title: '7 Years. One World Record.',
    text: 'We are trying to collect the most animated stories ever made about one country. This is how Nigeria fights to be remembered!',
    mood: 'excited',
  },
  'submission-section': {
    title: 'Your Story Matters.',
    text: "Every Nigerian has a story. Your grandmother's recipe. Your father's village. Your childhood. Submit it. Before it disappears.",
    mood: 'curious',
  },
};

const MOOD_COLORS = {
  curious: '#FFD400',
  sad: '#4FC3F7',
  proud: '#81C784',
  excited: '#FF8A65',
  angry: '#EF5350',
};

function NarratorSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <style>{`
          .bg-glow { animation: pulseGlow 4s ease-in-out infinite alternate; }
          .character-body { transform-origin: 400px 550px; animation: breathe 4s ease-in-out infinite alternate; }
          .head-group { transform-origin: 400px 180px; animation: talkHead 3s ease-in-out infinite; }
          .mouth { animation: speak 0.7s ease-in-out infinite alternate; transform-origin: 400px 225px; }
          .flag-arm-group { transform-origin: 290px 270px; animation: waveFlag 3.5s ease-in-out infinite alternate; }
          .flag-wave { animation: ripple 2s linear infinite; }
          .right-arm-group { transform-origin: 510px 270px; animation: gestureRight 2.8s ease-in-out infinite alternate; }
          @keyframes pulseGlow { 0% { fill-opacity: 0.2; } 100% { fill-opacity: 0.4; } }
          @keyframes breathe { 0% { transform: translateY(0px); } 100% { transform: translateY(-5px) scaleY(1.005); } }
          @keyframes talkHead { 0%, 100% { transform: rotate(0deg) translateY(0px); } 30% { transform: rotate(-2.5deg) translateY(1px); } 70% { transform: rotate(2deg) translateY(-1px); } }
          @keyframes speak { 0% { transform: scaleY(0.4); } 100% { transform: scaleY(1.3); } }
          @keyframes waveFlag { 0% { transform: rotate(0deg); } 50% { transform: rotate(-6deg) translateY(-5px); } 100% { transform: rotate(4deg) translateY(3px); } }
          @keyframes gestureRight { 0% { transform: rotate(0deg); } 40% { transform: rotate(14deg) translateY(-10px); } 80% { transform: rotate(-4deg) translateY(2px); } 100% { transform: rotate(8deg) translateY(-4px); } }
        `}</style>
        <radialGradient id="bgLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#008751" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#0B132B" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A431D"/>
          <stop offset="50%" stopColor="#5C3011"/>
          <stop offset="100%" stopColor="#3B1C06"/>
        </linearGradient>
        <radialGradient id="coralBead" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF7F50"/>
          <stop offset="60%" stopColor="#E64A19"/>
          <stop offset="100%" stopColor="#8B0000"/>
        </radialGradient>
        <linearGradient id="agbadaFabric" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="70%" stopColor="#F0F4F1"/>
          <stop offset="100%" stopColor="#D5E0D8"/>
        </linearGradient>
        <linearGradient id="goldEmbroidery" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6D365"/>
          <stop offset="50%" stopColor="#FDA085"/>
          <stop offset="100%" stopColor="#B78628"/>
        </linearGradient>
        <linearGradient id="filaGrad" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00A86B"/>
          <stop offset="50%" stopColor="#008751"/>
          <stop offset="100%" stopColor="#005232"/>
        </linearGradient>
      </defs>

      <circle className="bg-glow" cx="400" cy="300" r="280" fill="url(#bgLight)"/>

      <g className="character-body">
        <path d="M 230 580 C 230 390, 280 270, 400 270 C 520 270, 570 390, 570 580 Z" fill="url(#agbadaFabric)" />
        <path d="M 230 580 Q 320 330 400 350 Q 480 330 570 580" fill="none" stroke="#B0C4DE" strokeWidth="3" opacity="0.6"/>
        <path d="M 330 270 L 400 450 L 470 270" fill="none" stroke="url(#goldEmbroidery)" strokeWidth="12" strokeLinejoin="round"/>
        <rect x="365" y="320" width="70" height="90" rx="10" fill="none" stroke="url(#goldEmbroidery)" strokeWidth="5"/>
        <circle cx="400" cy="365" r="20" fill="none" stroke="url(#goldEmbroidery)" strokeWidth="4"/>
        <polygon points="400,340 415,365 400,390 385,365" fill="url(#goldEmbroidery)" opacity="0.8"/>
        <path d="M 345 235 Q 400 330 455 235" fill="none" stroke="url(#coralBead)" strokeWidth="14" strokeLinecap="round" strokeDasharray="1 3"/>
        <path d="M 335 230 Q 400 360 465 230" fill="none" stroke="url(#coralBead)" strokeWidth="18" strokeLinecap="round" strokeDasharray="1 4"/>
        <rect x="375" y="200" width="50" height="60" rx="10" fill="url(#skinGrad)"/>
        <path d="M 375 235 Q 400 250 425 235" fill="none" stroke="#261204" strokeWidth="4" opacity="0.4"/>

        <g className="right-arm-group">
          <path d="M 520 280 Q 610 330 590 410" stroke="url(#agbadaFabric)" strokeWidth="55" strokeLinecap="round" fill="none"/>
          <path d="M 520 280 Q 610 330 590 410" stroke="url(#goldEmbroidery)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7"/>
          <circle cx="590" cy="410" r="22" fill="url(#skinGrad)"/>
          <circle cx="585" cy="398" r="7" fill="url(#coralBead)"/>
          <circle cx="597" cy="402" r="7" fill="url(#coralBead)"/>
          <g transform="translate(595, 410)">
            <path d="M -5 -10 Q 25 -30 35 -10 Q 40 10 15 25 Q -15 25 -5 -10 Z" fill="url(#skinGrad)"/>
            <path d="M 10 -18 Q 30 -28 35 -12" stroke="url(#skinGrad)" strokeWidth="7" fill="none" strokeLinecap="round"/>
            <path d="M 15 -8 Q 38 -12 38 2" stroke="url(#skinGrad)" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
            <path d="M 12 5 Q 32 5 30 15" stroke="url(#skinGrad)" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M -2 -15 Q 8 -35 18 -25" stroke="url(#skinGrad)" strokeWidth="7" fill="none" strokeLinecap="round"/>
          </g>
        </g>

        <g className="flag-arm-group">
          <path d="M 280 280 Q 190 330 205 400" stroke="url(#agbadaFabric)" strokeWidth="55" strokeLinecap="round" fill="none"/>
          <circle cx="205" cy="400" r="22" fill="url(#skinGrad)"/>
          <circle cx="212" cy="390" r="7" fill="url(#coralBead)"/>
          <circle cx="200" cy="386" r="7" fill="url(#coralBead)"/>
          <path d="M 190 385 C 180 400, 210 425, 220 405 C 225 390, 200 375, 190 385 Z" fill="url(#skinGrad)"/>
          <line x1="205" y1="520" x2="205" y2="120" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="205" cy="115" r="10" fill="#FFD700"/>
          <g transform="translate(209, 125)">
            <path className="flag-wave" d="M 0 0 C 25 5, 45 -5, 60 0 L 60 120 C 45 115, 25 125, 0 120 Z" fill="#008751"/>
            <path className="flag-wave" d="M 60 0 C 75 5, 95 -5, 120 0 L 120 120 C 95 115, 75 125, 60 120 Z" fill="#FFFFFF"/>
            <path className="flag-wave" d="M 120 0 C 145 5, 165 -5, 180 0 L 180 120 C 165 115, 145 125, 120 120 Z" fill="#008751"/>
            <path d="M 0 0 C 25 5, 45 -5, 60 0 C 75 5, 95 -5, 120 0 C 145 5, 165 -5, 180 0 L 180 120 C 165 115, 145 125, 120 120 C 95 115, 75 125, 60 120 C 45 115, 25 125, 0 120 Z" fill="url(#bgLight)" opacity="0.3"/>
          </g>
        </g>

        <g className="head-group">
          <ellipse cx="400" cy="175" rx="52" ry="62" fill="url(#skinGrad)"/>
          <path d="M 345 165 C 340 100, 370 75, 430 85 C 465 90, 460 135, 455 165 Z" fill="url(#filaGrad)"/>
          <path d="M 345 145 Q 400 120 460 155" fill="none" stroke="#005232" strokeWidth="4"/>
          <path d="M 360 125 Q 400 105 440 130" fill="none" stroke="url(#goldEmbroidery)" strokeWidth="3" strokeDasharray="3 3"/>
          <ellipse cx="347" cy="180" rx="9" ry="14" fill="url(#skinGrad)"/>
          <ellipse cx="453" cy="180" rx="9" ry="14" fill="url(#skinGrad)"/>
          <path d="M 348 175 Q 344 180 348 185" fill="none" stroke="#261204" strokeWidth="2"/>
          <path d="M 452 175 Q 456 180 452 185" fill="none" stroke="#261204" strokeWidth="2"/>
          <ellipse cx="378" cy="170" rx="8" ry="6" fill="#FFFFFF"/>
          <circle cx="379" cy="170" r="4" fill="#1A0D00"/>
          <circle cx="381" cy="168" r="1.5" fill="#FFFFFF"/>
          <path d="M 368 163 Q 378 158 388 164" stroke="#1A0D00" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <ellipse cx="422" cy="170" rx="8" ry="6" fill="#FFFFFF"/>
          <circle cx="421" cy="170" r="4" fill="#1A0D00"/>
          <circle cx="423" cy="168" r="1.5" fill="#FFFFFF"/>
          <path d="M 412 164 Q 422 158 432 163" stroke="#1A0D00" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 365 153 Q 378 145 390 152" stroke="#1A0D00" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 410 152 Q 422 145 435 153" stroke="#1A0D00" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 400 168 L 400 190 Q 400 196 392 194" fill="none" stroke="#3B1C06" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 391 193 Q 400 200 409 193" fill="none" stroke="#3B1C06" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 380 212 Q 400 205 420 212 Q 400 217 380 212 Z" fill="#1A0D00"/>
          <g className="mouth">
            <ellipse cx="400" cy="225" rx="12" ry="7" fill="#2A0800"/>
            <path d="M 391 220 Q 400 223 409 220" stroke="#FFFFFF" strokeWidth="3" fill="none"/>
            <ellipse cx="400" cy="228" rx="6" ry="3" fill="#E64A19"/>
          </g>
          <path d="M 355 190 Q 400 250 445 190" fill="none" stroke="#1A0D00" strokeWidth="3" strokeDasharray="2 1" opacity="0.8"/>
        </g>
      </g>
    </svg>
  );
}

export default function NarratorBoy() {
  const { calmMode } = useGlobalState();
  const [currentSection, setCurrentSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [prevSection, setPrevSection] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const message = SECTION_MESSAGES[currentSection] || SECTION_MESSAGES['hero'];
  const moodColor = MOOD_COLORS[message.mood];

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_MESSAGES);
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (prevSection === currentSection) return;
    setPrevSection(currentSection);
    const fullText = message.text;
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    if (typingRef.current) clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typingRef.current!);
        setIsTyping(false);
      }
    }, 22);
    return () => { if (typingRef.current) clearInterval(typingRef.current); };
  }, [currentSection]);

  if (calmMode) return null;

  return (
    <div className="fixed bottom-0 left-2 z-50 flex flex-col items-start select-none pointer-events-none"
      style={{ maxWidth: '320px' }}
    >
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentSection}
            className="relative mb-[-4px] w-[300px] pointer-events-auto"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.92 }}
            transition={{ type: 'spring', damping: 18 }}
          >
            <div
              className="relative bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0_0_#000] p-4"
              style={{ borderLeftColor: moodColor, borderLeftWidth: '7px' }}
            >
              {/* Close */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors pointer-events-auto"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Mood tag */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full border-2 border-black shrink-0" style={{ background: moodColor }} />
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">Emeka says</span>
              </div>

              {/* Title */}
              <p className="text-sm font-black uppercase leading-snug mb-2"
                style={{ color: moodColor === '#FFD400' ? '#8a6b00' : moodColor }}>
                {message.title}
              </p>

              {/* Body — bigger text now */}
              <p className="text-sm font-bold text-gray-800 leading-relaxed">
                {displayedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                    className="inline-block w-[2px] h-[14px] bg-black ml-0.5 align-middle"
                  />
                )}
              </p>

              {/* Scroll hint */}
              <div className="flex items-center gap-1 mt-3 text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Scroll to continue</span>
              </div>

              {/* Bubble tail pointing down */}
              <div className="absolute bottom-[-16px] left-8 w-0 h-0"
                style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '16px solid black' }}
              />
              <div className="absolute bottom-[-11px] left-9 w-0 h-0"
                style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '12px solid white' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show button */}
      {!isVisible && (
        <motion.button
          className="mb-1 ml-2 bg-[#008751] text-white border-4 border-black rounded-full px-4 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0_0_#000] hover:scale-105 transition-all pointer-events-auto"
          onClick={() => setIsVisible(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          🇳🇬 Chat with Emeka
        </motion.button>
      )}

      {/* The SVG Narrator */}
      <motion.div
        className="pointer-events-none w-[200px] h-[150px] -mb-1"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <NarratorSVG />
      </motion.div>
    </div>
  );
}
