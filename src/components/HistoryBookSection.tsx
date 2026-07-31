'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Play, Pause, ChevronLeft, ChevronRight, HelpCircle, Send } from 'lucide-react';

interface BookPage {
  title: string;
  img: string;
  narration: string;
}

const bookPages: BookPage[] = [
  {
    title: "1. The Great Kingdom",
    img: "/assets/history_benin_prosperity.jpg",
    narration: "Long before modern Nigeria, the Kingdom of Benin stood as one of Africa's greatest civilizations, renowned for artistry, engineering, and governance."
  },
  {
    title: "2. The Expedition",
    img: "/assets/history_benin_expedition.jpg",
    narration: "In 1897, conflict culminated in the British Punitive Expedition, profoundly changing the kingdom's history."
  },
  {
    title: "3. The Sack & Plunder",
    img: "/assets/history_benin_sack.jpg",
    narration: "Thousands of Benin Bronzes were taken overseas, where many remain today in museums around the world."
  },
  {
    title: "4. The Living Legacy",
    img: "/assets/history_benin_modern.jpg",
    narration: "Yet the story did not end. Nigeria's culture continues to inspire new generations of creators."
  }
];

export default function HistoryBookSection() {
  const { calmMode, soundActive } = useGlobalState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isBookClosed, setIsBookClosed] = useState(false);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-page progression timer (8-10s)
  useEffect(() => {
    if (calmMode || !isBookOpen || isBookClosed) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        if (prev < bookPages.length - 1) {
          playPageFlipSound();
          return prev + 1;
        } else {
          // Close the book automatically
          setIsBookClosed(true);
          playPageFlipSound();
          return prev;
        }
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [isBookOpen, isBookClosed, calmMode]);

  // Voice narration trigger when page changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    if (isBookOpen && !isBookClosed) {
      speakNarration(bookPages[currentPage].narration);
    } else {
      stopNarration();
    }
    return () => stopNarration();
  }, [currentPage, isBookOpen, isBookClosed]);

  // Speech Synthesizer
  const speakNarration = (text: string) => {
    if (!soundActive || !synthRef.current) return;
    stopNarration();

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = 0.95; // Gentle cinematic pacing
    utteranceRef.current.pitch = 1.0;
    utteranceRef.current.onstart = () => setIsNarrating(true);
    utteranceRef.current.onend = () => setIsNarrating(false);
    utteranceRef.current.onerror = () => setIsNarrating(false);

    synthRef.current.speak(utteranceRef.current);
  };

  const stopNarration = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsNarrating(false);
    }
  };

  // Synthesize realistic page flip sound using Web Audio API
  const playPageFlipSound = () => {
    if (!soundActive) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      // Generate noise with high-pass filtering feel for paper rustle
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.3);
      filter.Q.value = 1.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      console.log(e);
    }
  };

  // Canvas floating dust particles animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (calmMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; r: number; d: number; speed: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        d: Math.random() * width,
        speed: 0.2 + Math.random() * 0.4
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 212, 0, 0.15)'; // Golden dust
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);

        // Update coordinates
        p.y -= p.speed;
        p.x += Math.sin(p.y / 30) * 0.3;

        // Reset particle if it floats off top
        if (p.y < 0) {
          particles[i] = {
            x: Math.random() * width,
            y: height,
            r: p.r,
            d: p.d,
            speed: p.speed
          };
        }
      }
      ctx.fill();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [calmMode]);

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 border-b-8 border-black bg-[#0F0A08] text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. FLICKERING LANTERN & DUST CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none z-10" />

      {/* 2. BRASS PINNED DID YOU KNOW BADGE */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={() => setShowDidYouKnow(!showDidYouKnow)}
          className="relative bg-[#FFF3D1] text-black border-4 border-black p-3 rounded shadow-[4px_4px_0_0_#000] rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all select-none focus-hand-drawn"
        >
          {/* Brass Pin head */}
          <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#CD7F32] border-2 border-black shadow-[1px_1px_0_0_rgba(0,0,0,0.5)]" />
          <div className="flex items-center gap-1.5 font-outfit text-xs font-black uppercase tracking-wider mt-1">
            <HelpCircle className="w-4 h-4 text-[#FF6B00]" />
            Did You Know?
          </div>
        </button>

        {/* Fact details tooltip bubble */}
        <AnimatePresence>
          {showDidYouKnow && (
            <motion.div
              className="absolute right-0 mt-3 w-64 bg-white text-black p-4 border-4 border-black rounded shadow-[6px_6px_0_0_#000] z-50 text-xs font-bold leading-relaxed rotate-[1deg]"
              style={{ backgroundImage: "url('/assets/paper_texture.jpg')", backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
            >
              💡 <span className="text-[#FF6B00]">Did you know?</span> Benin Bronzes are among the world's most celebrated metal artworks, exhibiting complex metallurgical casting techniques that date back over 600 years.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. DIMLY LIT ARCHIVE SCENERY (SVGs & Shadows) */}
      <div className="absolute bottom-6 left-6 z-10 opacity-35 hidden lg:block pointer-events-none scale-75">
        {/* Bronze Sculpture outline */}
        <svg viewBox="0 0 100 150" className="w-24 h-36 fill-current text-amber-900/60 stroke-black stroke-2">
          <path d="M 20 140 C 20 80, 80 80, 80 140 Z M 50 10 C 20 10, 20 80, 50 80 C 80 80, 80 10, 50 10 Z" />
          <circle cx="35" cy="45" r="5" fill="#000" />
          <circle cx="65" cy="45" r="5" fill="#000" />
        </svg>
        <span className="block text-[8px] uppercase tracking-widest text-amber-500 font-bold mt-2">Bronze head of Oba</span>
      </div>

      {/* 4. MAIN INTERACTIVE STORY BOOK */}
      <div className="max-w-4xl w-full z-20 flex flex-col items-center">
        
        {/* Step-by-Step Book State Flows */}
        {!isBookOpen && (
          /* Cover Mode */
          <motion.div
            className="comic-card max-w-lg w-full bg-[#3E2723] border-[6px] border-black p-12 text-center shadow-[12px_12px_0_0_#000] cursor-pointer hover:translate-y-[-4px] hover:shadow-[16px_16px_0_0_#000] transition-all"
            style={{ backgroundImage: "url('/assets/paper_texture.jpg')", backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}
            onClick={() => {
              setIsBookOpen(true);
              playPageFlipSound();
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[#FFD400] text-[10px] font-black uppercase tracking-widest block mb-4">
              ✦ Chapter I: Chronology ✦
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-outfit uppercase tracking-tight text-white mb-6 leading-none">
              Forgotten<br/>Nigerian History
            </h2>
            <div className="w-16 h-1 bg-[#FFD400] mx-auto mb-6" />
            <p className="text-gray-300 text-xs sm:text-sm font-semibold italic max-w-sm mx-auto">
              "Every nation remembers. Every story deserves to be told."
            </p>
            <button className="btn-3d btn-3d-yellow text-xs mt-10">
              Open Chronicle
            </button>
          </motion.div>
        )}

        {isBookOpen && !isBookClosed && (
          /* Open Paging Book Mode */
          <div className="w-full flex flex-col items-center">
            {/* Book Body Container */}
            <div className="relative w-full aspect-[16/10] max-h-[500px] bg-[#EEDCB5] border-8 border-black rounded shadow-[16px_16px_0_0_#000] overflow-hidden flex flex-col md:flex-row">
              {/* Paper texture background */}
              <div className="absolute inset-0 opacity-20 bg-cover pointer-events-none" style={{ backgroundImage: "url('/assets/paper_texture.jpg')" }} />
              
              {/* Left Page (Illustration) */}
              <div className="w-full md:w-1/2 h-full border-r-4 border-dashed border-black/20 relative overflow-hidden flex items-center justify-center p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    className="w-full h-full relative border-4 border-black rounded shadow-[4px_4px_0_0_#000] overflow-hidden"
                    initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 2, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={bookPages[currentPage].img}
                      alt={bookPages[currentPage].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-3 text-[10px] uppercase font-bold tracking-widest border-t-2 border-black text-center">
                      {bookPages[currentPage].title}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Page (Story Text & Narration Control) */}
              <div className="w-full md:w-1/2 h-full p-8 flex flex-col justify-between text-black select-none">
                <div className="space-y-4">
                  <span className="text-[#FF6B00] text-[9px] font-black uppercase tracking-widest block">
                    ✦ Historical Archive 1897 ✦
                  </span>
                  <h3 className="text-2xl font-black font-outfit uppercase tracking-tight leading-none text-black border-b-2 border-black pb-2">
                    Fall of Benin Kingdom
                  </h3>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentPage}
                      className="text-xs sm:text-sm font-semibold leading-relaxed text-gray-800"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {bookPages[currentPage].narration}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Bottom Bar: Pagination controls & Audio speaker toggle */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-black/10 mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (isNarrating) {
                          stopNarration();
                        } else {
                          speakNarration(bookPages[currentPage].narration);
                        }
                      }}
                      className="p-2 bg-black text-white border-2 border-black rounded-full shadow-[2px_2px_0_0_#000] hover:translate-y-[-1px] transition-all cursor-pointer"
                    >
                      {isNarrating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">
                      {isNarrating ? "Narrating..." : "Play Voice"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      disabled={currentPage === 0}
                      onClick={() => {
                        playPageFlipSound();
                        setCurrentPage(currentPage - 1);
                      }}
                      className="p-2 border-2 border-black bg-white rounded shadow-[2px_2px_0_0_#000] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => {
                        playPageFlipSound();
                        if (currentPage < bookPages.length - 1) {
                          setCurrentPage(currentPage + 1);
                        } else {
                          setIsBookClosed(true);
                        }
                      }}
                      className="p-2 border-2 border-black bg-white rounded shadow-[2px_2px_0_0_#000] cursor-pointer"
                    >
                      {currentPage === bookPages.length - 1 ? (
                        <span className="text-[10px] font-black uppercase px-1">Close</span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-black" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Bead index dots */}
            <div className="flex gap-2 mt-6">
              {bookPages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playPageFlipSound();
                    setCurrentPage(idx);
                  }}
                  className={`w-3 h-3 rounded-full border-2 border-black shadow-[1px_1px_0_0_#000] transition-colors ${
                    currentPage === idx ? 'bg-[#FFD400]' : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {isBookClosed && (
          /* Book Closed (Submit Story Callout) Flow */
          <motion.div
            className="text-center space-y-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12 }}
          >
            {/* Feathers falling animation overlay */}
            <div className="relative inline-block mb-2">
              <span className="text-7xl block animate-bounce-slow">🪶</span>
              <div className="absolute inset-0 bg-[#FFD400]/20 blur-md rounded-full pointer-events-none animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-black font-outfit uppercase tracking-tight text-white">
                Every Nigerian Has A Story.
              </h2>
              <span className="text-xl sm:text-3xl font-extrabold font-inter text-[#FFD400] italic block">
                Tell Yours.
              </span>
            </div>

            {/* Massive 3D submit button */}
            <div className="pt-6">
              <a
                href="#submission-section"
                className="btn-3d btn-3d-orange !px-8 !py-5 text-lg uppercase tracking-wider font-black flex items-center gap-3 justify-center max-w-md mx-auto group hover:translate-y-[-4px] active:translate-y-[2px]"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Submit Your Animated Story
              </a>
            </div>

            <button
              onClick={() => {
                setIsBookClosed(false);
                setIsBookOpen(true);
                setCurrentPage(0);
                playPageFlipSound();
              }}
              className="text-xs font-bold text-gray-400 hover:text-white underline mt-6 cursor-pointer"
            >
              Re-read Chapter I
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
