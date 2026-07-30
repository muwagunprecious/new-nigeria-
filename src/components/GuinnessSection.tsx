'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Compass, Milestone, Users } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';

interface Attempt {
  year: string;
  title: string;
  achievement: string;
  icon: string;
}

const attempts: Attempt[] = [
  { year: "2008", title: "Largest Painting by Numbers", achievement: "A monumental canvas measuring 63.5m x 49.3m, painted by 350 volunteers.", icon: "🎨" },
  { year: "2010", title: "Largest Hand-Painted Banner", achievement: "A giant flag painting celebrating Nigeria's 50th independence anniversary.", icon: "🇳🇬" },
  { year: "2011", title: "Most People Painting Simultaneously", achievement: "Coordinated over 2,000 Nigerian students painting for peace and education.", icon: "👥" },
  { year: "2018", title: "Largest Interactive Painting", achievement: "A massive map painting illustrating historical Nigerian milestones.", icon: "🗺️" }
];

export default function GuinnessSection() {
  const { calmMode, passportStamps } = useGlobalState();
  const [timeLeft, setTimeLeft] = useState({ days: 87, hours: 14, minutes: 32, seconds: 45 });

  // Scoreboard Countdown Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD400', '#FF6B00', '#FFFFFF', '#4CAF50']
    });
  };

  const storiesGoal = 10000;
  const currentStories = 7340 + passportStamps.length * 12; // dynamically increments with user exploration!
  const progressRatio = Math.min(1, currentStories / storiesGoal);

  return (
    <section className="relative py-24 px-6 md:px-12 border-b-8 border-black bg-gradient-to-b from-[#1A0D33] to-[#0A0A0A] text-white overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD400_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Guinness World Record Attempt ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FFD400] pb-2">
            Making History (5th Attempt)
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            Adetunwase Adenle is leading a historic project to build the world's largest animated cultural collage.
          </p>
        </div>

        {/* Guinness attempts timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {attempts.map((att, idx) => (
            <div
              key={idx}
              onClick={triggerConfetti}
              className="bg-[#1E1E1E] text-white p-6 border-4 border-black rounded shadow-[6px_6px_0_0_#000] hover:border-[#FFD400] hover:shadow-[8px_8px_0_0_#FFD400] transition-all cursor-pointer relative group select-none"
              style={{
                backgroundImage: "url('/assets/paper_texture.jpg')",
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
              }}
            >
              {/* Confetti medal watermark */}
              <div className="absolute top-3 right-3 text-2xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all">
                🏅
              </div>

              <span className="text-[#FFD400] text-xl font-black font-outfit block mb-1">
                {att.year}
              </span>
              <h3 className="text-md font-bold font-outfit text-white leading-tight mb-2 uppercase">
                {att.title}
              </h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                {att.achievement}
              </p>
            </div>
          ))}
        </div>

        {/* Live Milestone & River Progress */}
        <div className="bg-[#150F26] border-4 border-black p-8 md:p-12 rounded shadow-[8px_8px_0_0_#000] mb-20 relative">
          <div className="absolute top-[-15px] left-8 border-4 border-black bg-[#FF6B00] text-white px-4 py-1 font-bold text-xs uppercase rounded rotate-[-1deg]">
            🌊 River Niger Progress Flow 🌊
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8 mt-2">
            <div>
              <h3 className="text-2xl font-black font-outfit uppercase text-[#FFD400] flex items-center gap-2">
                <Milestone className="w-6 h-6 text-[#FF6B00]" />
                Story Milestones
              </h3>
              <p className="text-xs font-semibold text-gray-400 mt-1">
                The animated canvas flows further as stories pour in. Help sail the canoe to the delta!
              </p>
            </div>
            {/* Stats display */}
            <div className="flex gap-8 font-outfit text-sm">
              <div className="text-center">
                <span className="text-[#FFD400] font-black text-2xl block">{currentStories}</span>
                <span className="text-gray-500 font-bold uppercase text-[9px] tracking-widest">Stories Lodged</span>
              </div>
              <div className="text-center">
                <span className="text-white font-black text-2xl block">{storiesGoal}</span>
                <span className="text-gray-500 font-bold uppercase text-[9px] tracking-widest">Target Goal</span>
              </div>
            </div>
          </div>

          {/* Styled River Niger SVG Progress Bar */}
          <div className="relative h-20 bg-black/40 border-4 border-black rounded-lg overflow-hidden flex items-center px-4">
            {/* Wave Grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(21,101,192,0.15)_2px,transparent_2px)] bg-[size:16px_16px] pointer-events-none" />

            {/* River water path */}
            <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute left-0 right-0 bottom-0 top-0 h-full w-full opacity-60">
              <path
                d="M 0 5 Q 25 3, 50 5 T 100 5 L 100 10 L 0 10 Z"
                fill="#1565C0"
                className="animate-sway"
                style={{ animationDuration: '4s' }}
              />
            </svg>

            {/* River water fill progress */}
            <div
              className="absolute left-0 bottom-0 top-0 bg-blue-700/40 border-r-4 border-blue-400 transition-all duration-1000"
              style={{ width: `${progressRatio * 100}%` }}
            />

            {/* Sailing Canoe SVG */}
            <div
              className="absolute z-10 transition-all duration-1000 transform -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${progressRatio * 100}%` }}
            >
              {/* Canoe */}
              <svg viewBox="0 0 48 16" className="w-16 h-8 drop-shadow-[2px_2px_0_#000] animate-bounce-slow">
                {/* Canoe wood */}
                <path d="M 2 12 Q 24 16 46 12 Q 38 4 24 4 Q 10 4 2 12 Z" fill="#5D4037" stroke="#000" strokeWidth="2.5" />
                {/* Oar paddle */}
                <line x1="24" y1="2" x2="30" y2="14" stroke="#FFD400" strokeWidth="2" strokeLinecap="round" />
                {/* Mini sailor */}
                <circle cx="24" cy="4" r="3.5" fill="#3E2723" stroke="#000" strokeWidth="1.5" />
              </svg>
              {/* Stat floating tag */}
              <span className="bg-black border border-[#FFD400] text-[9px] text-[#FFD400] font-black py-0.5 px-1.5 rounded mt-[-4px]">
                {Math.round(progressRatio * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Scoreboard Countdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Big Interactive Medal */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              onClick={triggerConfetti}
              className="w-48 h-48 rounded-full border-8 border-black bg-gradient-to-tr from-[#FFD400] to-[#E65100] flex items-center justify-center shadow-[8px_8px_0_0_#000] cursor-pointer relative select-none animate-float group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="stamp"
            >
              <Award className="w-24 h-24 text-white drop-shadow-[4px_4px_0_#000] group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 rounded-full border-4 border-white opacity-25 border-dashed" />
            </motion.div>
            <h4 className="text-xl font-extrabold uppercase mt-6 text-white font-outfit">
              Adetunwase's 5th Medal
            </h4>
            <p className="text-xs text-gray-500 max-w-xs mt-2 font-medium">
              Tap the giant medal to shower the page in golden victory particles.
            </p>
          </div>

          {/* Countdown board */}
          <div className="bg-black border-4 border-black p-8 rounded shadow-[6px_6px_0_0_#FFD400] relative overflow-hidden"
               style={{
                 backgroundImage: "url('/assets/paper_texture.jpg')",
                 backgroundSize: 'cover',
                 backgroundBlendMode: 'multiply',
                 backgroundColor: '#0A0A0A'
               }}
          >
            {/* Scoreboard border light dots */}
            <div className="absolute top-2 left-2 right-2 flex justify-between px-2">
              <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-ping" />
              <div className="w-1.5 h-1.5 bg-[#FFD400] rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>

            <h4 className="text-sm font-extrabold font-outfit uppercase tracking-wider text-center text-gray-400 mb-6">
              Submission Closing Countdown
            </h4>

            <div className="grid grid-cols-4 gap-4 text-center font-outfit">
              <div className="bg-[#1E1E1E] border-2 border-black p-3 rounded">
                <span className="text-[#FFD400] text-3xl font-black block">{timeLeft.days}</span>
                <span className="text-gray-500 font-bold uppercase text-[9px]">Days</span>
              </div>
              <div className="bg-[#1E1E1E] border-2 border-black p-3 rounded">
                <span className="text-[#FFD400] text-3xl font-black block">{timeLeft.hours}</span>
                <span className="text-gray-500 font-bold uppercase text-[9px]">Hours</span>
              </div>
              <div className="bg-[#1E1E1E] border-2 border-black p-3 rounded">
                <span className="text-[#FFD400] text-3xl font-black block">{timeLeft.minutes}</span>
                <span className="text-gray-500 font-bold uppercase text-[9px]">Mins</span>
              </div>
              <div className="bg-[#1E1E1E] border-2 border-black p-3 rounded">
                <span className="text-[#FFD400] text-3xl font-black block">{timeLeft.seconds}</span>
                <span className="text-gray-500 font-bold uppercase text-[9px]">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
