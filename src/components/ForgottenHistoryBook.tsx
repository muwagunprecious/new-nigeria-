'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';

// ====== PAGE DATA ======
interface BookPage {
  title: string;
  subtitle?: string;
  illustration: React.ReactNode;
  narration: string;
}

const BeninProsporousSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <rect width="400" height="300" fill="#F5E6C8" />
    <rect x="0" y="200" width="400" height="100" fill="#8B6914" rx="4" />
    <rect x="40" y="120" width="80" height="80" fill="#C49A3C" rx="4" />
    <rect x="45" y="125" width="15" height="15" fill="#FFD700" />
    <rect x="65" y="125" width="15" height="15" fill="#FFD700" />
    <rect x="45" y="145" width="15" height="15" fill="#FFD700" />
    <rect x="65" y="145" width="15" height="15" fill="#FFD700" />
    <polygon points="80,110 40,120 120,120" fill="#8B4513" />
    <circle cx="140" cy="160" r="8" fill="#FFD700" />
    <circle cx="155" cy="155" r="8" fill="#DAA520" />
    <circle cx="170" cy="160" r="8" fill="#B8860B" />
    <rect x="200" y="130" width="60" height="70" fill="#A0522D" rx="2" />
    <rect x="205" y="135" width="50" height="60" fill="#8B4513" rx="1" />
    <circle cx="230" cy="165" r="6" fill="#FFD700" />
    <rect x="290" y="140" width="40" height="30" fill="#D2691E" />
    <rect x="290" y="140" width="13" height="30" fill="#E6A817" />
    <rect x="303" y="140" width="13" height="30" fill="#E6A817" />
    <rect x="316" y="140" width="14" height="30" fill="#E6A817" />
    <line x1="40" y1="120" x2="40" y2="100" stroke="#8B4513" strokeWidth="2" />
    <line x1="120" y1="120" x2="120" y2="100" stroke="#8B4513" strokeWidth="2" />
    <rect x="50" y="95" width="60" height="10" fill="#D2691E" rx="2" />
    <circle cx="80" cy="90" r="6" fill="#FF6B00" />
    <path d="M 20 210 Q 60 190 100 210" stroke="#228B22" strokeWidth="2" fill="none" />
    <circle cx="50" cy="205" r="4" fill="#32CD32" />
    <circle cx="70" cy="200" r="3" fill="#228B22" />
    <circle cx="30" cy="208" r="3" fill="#006400" />
    <rect x="320" y="155" width="50" height="30" fill="#DEB887" rx="3" />
    <path d="M 330 170 C 335 160 345 160 350 170" stroke="#8B4513" strokeWidth="1.5" fill="none" />
    <circle cx="345" cy="162" r="6" fill="#DAA520" />
    <line x1="345" y1="168" x2="345" y2="185" stroke="#8B4513" strokeWidth="1.5" />
    <circle cx="130" cy="210" r="3" fill="#DAA520" />
    <circle cx="145" cy="210" r="3" fill="#DAA520" />
    <circle cx="160" cy="210" r="3" fill="#DAA520" />
    <circle cx="175" cy="210" r="3" fill="#DAA520" />
    <path d="M 130 206 Q 152 196 175 206" stroke="#DAA520" strokeWidth="1.5" fill="none" />
    <rect x="140" y="215" width="20" height="15" fill="#8B4513" rx="1" />
    <circle cx="150" cy="222" r="3" fill="#D2691E" />
    <text x="40" y="260" fontSize="11" fill="#3C2415" fontFamily="serif">Prosperous Kingdom of Benin</text>
    <text x="40" y="278" fontSize="8" fill="#8B7355" fontFamily="serif">Bronze casting · Palaces · Markets · Royal court</text>
  </svg>
);

const BritishExpeditionSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <rect width="400" height="300" fill="#D4C5A9" />
    <rect x="0" y="200" width="400" height="100" fill="#6B8E23" rx="4" />
    <rect x="0" y="200" width="400" height="8" fill="#556B2F" />
    <path d="M 50 180 L 100 200 L 50 210 Z" fill="#2F4F4F" />
    <path d="M 60 190 L 120 190 L 130 200 L 50 200 Z" fill="#4682B4" />
    <rect x="55" y="175" width="3" height="15" fill="#8B4513" />
    <line x1="50" y1="185" x2="130" y2="185" stroke="#8B4513" strokeWidth="1" />
    <path d="M 150 185 L 160 200 L 140 200 Z" fill="#2F4F4F" />
    <path d="M 155 190 L 175 192 L 178 200 L 155 200 Z" fill="#4682B4" />
    <rect x="155" y="182" width="3" height="10" fill="#8B4513" />
    <path d="M 220 180 L 260 195 L 200 200 Z" fill="#2F4F4F" />
    <path d="M 225 188 L 275 188 L 280 200 L 220 200 Z" fill="#4682B4" />
    <rect x="230" y="175" width="4" height="15" fill="#8B4513" />
    <line x1="220" y1="182" x2="280" y2="182" stroke="#8B4513" strokeWidth="1.5" />
    <rect x="280" y="175" width="50" height="25" fill="#8B0000" rx="3" />
    <rect x="280" y="175" width="50" height="8" fill="#B22222" rx="2" />
    <line x1="305" y1="175" x2="305" y2="155" stroke="#8B4513" strokeWidth="2" />
    <rect x="295" y="150" width="20" height="10" fill="#DC143C" rx="2" />
    <circle cx="305" cy="147" r="5" fill="#FFD700" />
    <path d="M 60 205 Q 100 190 150 205" stroke="#556B2F" strokeWidth="1" fill="none" />
    <path d="M 200 208 Q 230 195 280 208" stroke="#556B2F" strokeWidth="1" fill="none" />
    <circle cx="90" cy="195" r="3" fill="#4682B4" />
    <circle cx="110" cy="195" r="3" fill="#4682B4" />
    <circle cx="250" cy="195" r="3" fill="#4682B4" />
    <circle cx="270" cy="195" r="3" fill="#4682B4" />
    <rect x="340" y="185" width="30" height="15" fill="#8B4513" rx="2" />
    <circle cx="355" cy="185" r="4" fill="#FFD700" />
    <rect x="340" y="195" width="30" height="8" fill="#654321" />
    <text x="40" y="260" fontSize="11" fill="#3C2415" fontFamily="serif">British Expedition Approaches</text>
    <text x="40" y="278" fontSize="8" fill="#8B7355" fontFamily="serif">The Punitive Expedition of 1897</text>
  </svg>
);

const AftermathSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <rect width="400" height="300" fill="#C4A882" />
    <rect x="0" y="210" width="400" height="90" fill="#5C4033" rx="4" />
    <rect x="60" y="100" width="120" height="110" fill="#8B4513" rx="2" />
    <rect x="65" y="105" width="110" height="100" fill="#654321" rx="1" />
    <polygon points="120,90 60,100 180,100" fill="#D2691E" />
    <rect x="200" y="110" width="100" height="100" fill="#A0522D" rx="2" />
    <rect x="205" y="115" width="90" height="90" fill="#8B4513" rx="1" />
    <polygon points="250,100 200,110 300,110" fill="#CD853F" />
    <circle cx="120" cy="155" r="15" fill="#DAA520" />
    <circle cx="120" cy="155" r="10" fill="#B8860B" />
    <circle cx="120" cy="155" r="5" fill="#8B6914" />
    <rect x="250" y="150" width="25" height="25" fill="#DAA520" rx="2" />
    <rect x="255" y="155" width="15" height="15" fill="#B8860B" rx="1" />
    <circle cx="280" cy="165" r="10" fill="#CD853F" />
    <circle cx="280" cy="165" r="6" fill="#8B6914" />
    <line x1="120" y1="100" x2="250" y2="100" stroke="#3C2415" strokeWidth="1" strokeDasharray="4 4" />
    <line x1="120" y1="210" x2="250" y2="210" stroke="#3C2415" strokeWidth="1" strokeDasharray="4 4" />
    <rect x="300" y="130" width="40" height="50" fill="#654321" rx="1" />
    <rect x="305" y="135" width="30" height="40" fill="#8B7355" rx="1" />
    <circle cx="100" cy="185" r="4" fill="#DAA520" />
    <circle cx="140" cy="185" r="4" fill="#DAA520" />
    <circle cx="230" cy="180" r="4" fill="#CD853F" />
    <circle cx="270" cy="180" r="4" fill="#CD853F" />
    <path d="M 20 215 Q 60 205 100 215" stroke="#3C2415" strokeWidth="1" fill="none" />
    <path d="M 280 215 Q 320 205 360 215" stroke="#3C2415" strokeWidth="1" fill="none" />
    <text x="40" y="260" fontSize="11" fill="#3C2415" fontFamily="serif">The Aftermath</text>
    <text x="40" y="278" fontSize="8" fill="#8B7355" fontFamily="serif">Cultural treasures taken overseas</text>
  </svg>
);

const PresentDaySVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <rect width="400" height="300" fill="#E8D5B7" />
    <rect x="0" y="200" width="400" height="100" fill="#4A7C59" rx="4" />
    <rect x="0" y="200" width="400" height="6" fill="#3D6B4E" />
    <rect x="30" y="100" width="60" height="100" fill="#A0A0A0" rx="3" />
    <rect x="35" y="105" width="20" height="20" fill="#87CEEB" rx="1" />
    <rect x="60" y="105" width="20" height="20" fill="#87CEEB" rx="1" />
    <rect x="35" y="130" width="20" height="20" fill="#87CEEB" rx="1" />
    <rect x="60" y="130" width="20" height="20" fill="#87CEEB" rx="1" />
    <rect x="120" y="80" width="50" height="120" fill="#DAA520" rx="2" />
    <polygon points="145,70 120,80 170,80" fill="#B8860B" />
    <circle cx="145" cy="140" r="8" fill="#FF6B00" />
    <rect x="210" y="90" width="60" height="110" fill="#D2691E" rx="3" />
    <rect x="215" y="95" width="50" height="100" fill="#E6A817" rx="2" />
    <circle cx="240" cy="145" r="6" fill="#FFD700" />
    <rect x="310" y="110" width="50" height="90" fill="#A0522D" rx="2" />
    <rect x="315" y="115" width="40" height="80" fill="#8B7355" rx="1" />
    <circle cx="335" cy="155" r="8" fill="#FFD700" />
    <circle cx="335" cy="155" r="5" fill="#DAA520" />
    <rect x="335" cy="170" width="15" height="15" fill="#98FB98" rx="2" />
    <line x1="145" y1="200" x2="145" y2="180" stroke="#3D6B4E" strokeWidth="1.5" />
    <line x1="240" y1="200" x2="240" y2="180" stroke="#3D6B4E" strokeWidth="1.5" />
    <line x1="335" y1="200" x2="335" y2="180" stroke="#3D6B4E" strokeWidth="1.5" />
    <circle cx="145" cy="178" r="4" fill="#90EE90" />
    <circle cx="240" cy="178" r="4" fill="#90EE90" />
    <circle cx="335" cy="178" r="4" fill="#90EE90" />
    <path d="M 40 220 Q 100 210 160 220" stroke="#3D6B4E" strokeWidth="1" fill="none" />
    <path d="M 200 225 Q 260 215 320 225" stroke="#3D6B4E" strokeWidth="1" fill="none" />
    <circle cx="80" cy="215" r="3" fill="#FFD700" />
    <circle cx="110" cy="218" r="2" fill="#FFD700" />
    <circle cx="240" cy="218" r="3" fill="#FFD700" />
    <circle cx="280" cy="215" r="2" fill="#FFD700" />
    <text x="40" y="260" fontSize="11" fill="#3C2415" fontFamily="serif">Benin City Today</text>
    <text x="40" y="278" fontSize="8" fill="#8B7355" fontFamily="serif">A new generation of creators</text>
  </svg>
);

const pages: BookPage[] = [
  {
    title: "Forgotten Nigerian History",
    subtitle: "Every nation remembers. Every story deserves to be told.",
    illustration: (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <rect width="400" height="300" fill="#F5E6C8" />
        <circle cx="200" cy="130" r="60" fill="#DAA520" opacity="0.15" />
        <circle cx="200" cy="130" r="40" fill="#DAA520" opacity="0.2" />
        <circle cx="200" cy="130" r="20" fill="#FFD700" opacity="0.3" />
        <text x="200" y="220" textAnchor="middle" fontSize="16" fill="#3C2415" fontFamily="serif" fontWeight="bold">The Nigeria Story</text>
        <text x="200" y="242" textAnchor="middle" fontSize="9" fill="#8B7355" fontFamily="serif" fontStyle="italic">A journey through time</text>
        <path d="M 120 200 Q 200 180 280 200" stroke="#DAA520" strokeWidth="1" fill="none" />
        <path d="M 130 205 Q 200 188 270 205" stroke="#DAA520" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    narration: "Long before modern Nigeria, the Kingdom of Benin stood as one of Africa's greatest civilizations, renowned for artistry, engineering, and governance.",
  },
  {
    title: "The Fall of the Benin Kingdom (1897)",
    subtitle: "A beautifully illustrated timeline",
    illustration: <BeninProsporousSVG />,
    narration: "Long before modern Nigeria, the Kingdom of Benin stood as one of Africa's greatest civilizations, renowned for artistry, engineering, and governance.",
  },
  {
    title: "The British Expedition",
    subtitle: "1897",
    illustration: <BritishExpeditionSVG />,
    narration: "In 1897, conflict culminated in the British Punitive Expedition, profoundly changing the kingdom's history.",
  },
  {
    title: "The Benin Bronzes",
    subtitle: "A legacy dispersed",
    illustration: <AftermathSVG />,
    narration: "Thousands of Benin Bronzes were taken overseas, where many remain today in museums around the world.",
  },
  {
    title: "Resilience & Rebirth",
    subtitle: "Culture continuing",
    illustration: <PresentDaySVG />,
    narration: "Yet the story did not end. Nigeria's culture continues to inspire new generations of creators.",
  },
];

// ====== WEB AUDIO HELPERS ======
function createAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playPaperSound(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const t = i / ctx.sampleRate;
    data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 30) * (1 - Math.exp(-t * 200));
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  source.connect(gain).connect(ctx.destination);
  source.start(ctx.currentTime);
}

function startAmbientMusic(ctx: AudioContext) {
  const oscs: OscillatorNode[] = [];
  const gains: GainNode[] = [];
  const frequencies = [220, 277.18, 329.63, 440, 554.37, 659.25];

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.setValueAtTime(freq + Math.sin(i) * 2, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    oscs.push(osc);
    gains.push(gain);
  });

  return () => {
    gains.forEach((g) => g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5));
    setTimeout(() => oscs.forEach((o) => o.stop()), 500);
  };
}

// ====== DUST PARTICLE CANVAS ======
function DustCanvas({ calmMode }: { calmMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || calmMode) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 1) * 0.15,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(218, 165, 32, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [calmMode]);

  if (calmMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      width={800}
      height={600}
    />
  );
}

// ====== NARRATION HOOK ======
function useNarration() {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    utteranceRef.current = utterance;
    setSpeaking(true);
    utterance.onend = () => {
      setSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  return { speak, stop, speaking };
}

// ====== MAIN COMPONENT ======
export default function ForgottenHistoryBook({ onComplete }: { onComplete?: () => void }) {
  const { calmMode } = useGlobalState();
  const [phase, setPhase] = useState<'intro' | 'fade' | 'book' | 'closing'>('intro');
  const [currentPage, setCurrentPage] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopMusicRef = useRef<(() => void) | null>(null);
  const autoTurnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { speak, stop: stopNarration, speaking } = useNarration();

  const sectionRef = useRef<HTMLElement>(null);
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-150, 0, 150], [-1, 0, 1]);
  const totalPages = pages.length;

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const handleBeginJourney = useCallback(() => {
    initAudio();
    setPhase('fade');
    setTimeout(() => {
      setPhase('book');
      setTimeout(() => setBookOpen(true), 500);
    }, 1200);
  }, [initAudio]);

  const turnPage = useCallback((direction: 1 | -1) => {
    setCurrentPage((prev) => {
      const next = prev + direction;
      if (next < 0 || next >= totalPages) return prev;
      if (audioCtxRef.current && !calmMode) {
        playPaperSound(audioCtxRef.current);
      }
      return next;
    });
  }, [totalPages, calmMode]);

  const speakPage = useCallback((index: number) => {
    if (index < 0 || index >= totalPages) return;
    speak(pages[index].narration);
  }, [speak]);

  useEffect(() => {
    if (phase === 'intro' && audioCtxRef.current && soundEnabled && !calmMode) {
      stopMusicRef.current = startAmbientMusic(audioCtxRef.current);
    }
    return () => {
      stopMusicRef.current?.();
    };
  }, [phase, soundEnabled, calmMode]);

  useEffect(() => {
    if (phase === 'book' && bookOpen) {
      speakPage(currentPage);
      autoTurnRef.current = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev >= totalPages - 1) {
            if (autoTurnRef.current) clearInterval(autoTurnRef.current);
            setPhase('closing');
            setTimeout(() => setIsComplete(true), 2000);
            return prev;
          }
          if (audioCtxRef.current && !calmMode) {
            playPaperSound(audioCtxRef.current);
          }
          return prev + 1;
        });
      }, 9000);
    }
    return () => {
      if (autoTurnRef.current) clearInterval(autoTurnRef.current);
    };
  }, [phase, bookOpen, currentPage, totalPages, speakPage, calmMode]);

  useEffect(() => {
    if (isComplete) {
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 60;
    if (info.offset.x < -threshold) turnPage(1);
    else if (info.offset.x > threshold) turnPage(-1);
    dragX.set(0);
  };

  // ====== RENDER ======
  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A0A0A] min-h-screen">
      {/* INTRO PHASE */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="relative max-w-2xl mx-auto text-center px-6">
              <motion.div
                className="bg-[#1A0D1E] border-2 border-[#C49A3C] p-8 sm:p-12 rounded-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <div className="text-[#C49A3C] text-sm font-bold uppercase tracking-[0.3em] mb-4">The Nigeria Story Presents</div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5E6C8] mb-4 leading-tight">
                  Forgotten Nigerian History
                </h2>
                <p className="text-[#C49A3C] text-base sm:text-lg font-serif italic mb-8 leading-relaxed">
                  "Every nation remembers. Every story deserves to be told."
                </p>
                <motion.button
                  onClick={handleBeginJourney}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#C49A3C] text-[#1A0D1E] font-bold uppercase tracking-wider text-sm border-2 border-[#DAA520] rounded-sm overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Begin Journey</span>
                  <ChevronDown className="relative z-10 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-[#DAA520]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FADE TO BLACK */}
      <AnimatePresence>
        {phase === 'fade' && (
          <motion.div
            className="absolute inset-0 z-40 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      {/* BOOK PHASE */}
      {phase === 'book' || phase === 'closing' ? (
        <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
          {/* Background archive room */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0D1E] to-[#0A0A0A]" />
          <div className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 30% 40%, #C49A3C 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #DAA520 0%, transparent 50%)',
            }}
          />
          <DustCanvas calmMode={calmMode} />

          {/* Artifacts around the book */}
          {!calmMode && (
            <>
              <div className="absolute left-[5%] top-[20%] text-3xl animate-float opacity-40" style={{ animationDuration: '7s' }}>🗺️</div>
              <div className="absolute right-[8%] top-[15%] text-4xl animate-float opacity-40" style={{ animationDuration: '9s' }}>🎭</div>
              <div className="absolute left-[8%] bottom-[20%] text-3xl animate-float opacity-40" style={{ animationDuration: '8s' }}>🏺</div>
              <div className="absolute right-[5%] bottom-[25%] text-2xl animate-float opacity-40" style={{ animationDuration: '6s' }}>🪶</div>
              <div className="absolute left-[15%] top-[50%] text-2xl animate-float opacity-40" style={{ animationDuration: '10s' }}>🐚</div>
              <div className="absolute right-[12%] top-[45%] text-2xl animate-float opacity-40" style={{ animationDuration: '8s' }}>📜</div>
            </>
          )}

          {/* Lantern light effect */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-32 h-32 bg-[#FF8C00]/5 rounded-full blur-3xl animate-lantern" />

          {/* Table surface */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#2C1810] to-transparent" />
          <div className="absolute bottom-[12%] left-[5%] right-[5%] h-3 bg-[#3E2723] rounded-full blur-sm opacity-60" />

          {/* Book */}
          <motion.div
            className="relative z-20 w-full max-w-3xl"
            initial={{ scale: 0.6, y: 100, rotateX: 20 }}
            animate={bookOpen ? { scale: 1, y: 0, rotateX: 0 } : { scale: 0.6, y: 100, rotateX: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.3 }}
            style={{ perspective: 1200 }}
          >
            {/* Book cover shadow */}
            <div className="absolute -bottom-6 left-[5%] right-[5%] h-6 bg-black/50 blur-xl rounded-full" />

            {/* Book body */}
            <div
              className="relative bg-[#3C2415] rounded-sm border border-[#DAA520]/30"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(218,165,32,0.1)',
              }}
            >
              {/* Page content */}
              <div className="relative m-2 bg-[#F5E6C8] rounded-sm overflow-hidden min-h-[400px] sm:min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    className="p-6 sm:p-10"
                    initial={{ opacity: 0, rotateY: isDragging ? 0 : -15 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: isDragging ? 0 : 15 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    style={{ x: dragX, touchAction: 'pan-y' }}
                    whileTap={{ cursor: 'grabbing' }}
                  >
                    {/* Paper wrinkle overlay */}
                    <div className="absolute inset-0 pointer-events-none book-page-wrinkle opacity-30" />

                    {/* Page number */}
                    <div className="absolute bottom-3 right-6 text-[10px] text-[#8B7355] font-serif italic">
                      {currentPage + 1} / {totalPages}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#3C2415] mb-1">
                      {pages[currentPage].title}
                    </h3>
                    {pages[currentPage].subtitle && (
                      <p className="text-xs sm:text-sm text-[#8B7355] font-serif italic mb-4">
                        {pages[currentPage].subtitle}
                      </p>
                    )}

                    {/* Divider */}
                    <div className="w-16 h-px bg-[#C49A3C] mb-4" />

                    {/* Illustration */}
                    <div className="relative mb-4 border border-[#DAA520]/20 rounded overflow-hidden">
                      {pages[currentPage].illustration}
                    </div>

                    {/* Narration text */}
                    <p className="text-xs sm:text-sm text-[#5C3D1A] font-serif leading-relaxed italic">
                      "{pages[currentPage].narration}"
                    </p>

                    {/* Sound toggle */}
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="absolute top-3 right-3 p-1.5 bg-[#3C2415]/10 rounded-full border border-[#C49A3C]/30"
                    >
                      {soundEnabled ? <Volume2 className="w-3 h-3 text-[#3C2415]" /> : <VolumeX className="w-3 h-3 text-[#8B7355]" />}
                    </button>
                  </motion.div>
                </AnimatePresence>

                {/* Page navigation arrows */}
                <button
                  onClick={() => turnPage(-1)}
                  disabled={currentPage === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#3C2415]/80 text-[#F5E6C8] rounded-full border border-[#DAA520]/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#3C2415] transition-colors z-20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => turnPage(1)}
                  disabled={currentPage >= totalPages - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#3C2415]/80 text-[#F5E6C8] rounded-full border border-[#DAA520]/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#3C2415] transition-colors z-20"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Book spine detail */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-[#2C1810] rounded-sm"
                style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)' }}
              />
            </div>

            {/* Page edge texture (side of book) */}
            <div className="absolute -right-2 top-2 bottom-2 w-4 bg-[#F5E6C8] rounded-r-sm opacity-70"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px)',
                boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
              }}
            />
          </motion.div>

          {/* Narration status */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/70 backdrop-blur-sm border border-[#C49A3C]/30 px-4 py-2 rounded-full">
            <div className={`w-2 h-2 rounded-full ${speaking ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-[10px] text-[#C49A3C] font-medium uppercase tracking-wider">
              {speaking ? 'Narrating...' : 'Page ready'}
            </span>
            {!speaking && (
              <button
                onClick={() => speakPage(currentPage)}
                className="text-[10px] text-[#DAA520] underline hover:text-white transition-colors"
              >
                Replay
              </button>
            )}
          </div>

          {/* Auto-turn indicator */}
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30">
            <div className="flex gap-1.5">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx);
                    speakPage(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentPage ? 'bg-[#DAA520] w-4' : idx < currentPage ? 'bg-[#C49A3C]/50' : 'bg-[#C49A3C]/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CLOSING PHASE OVERLAY */}
          <AnimatePresence>
            {phase === 'closing' && (
              <motion.div
                className="absolute inset-0 z-30 bg-black/60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <p className="text-[#DAA520] font-serif italic text-lg mb-2">The story continues...</p>
                  <div className="w-8 h-8 border-2 border-[#DAA520] border-t-transparent rounded-full animate-spin mx-auto" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : null}
    </section>
  );
}
