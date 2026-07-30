'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Info } from 'lucide-react';

interface Hotspot {
  id: string;
  x: string;
  y: string;
  title: string;
  desc: string;
  focus: string;
}

const hotspots: Hotspot[] = [
  {
    id: 'tablet',
    x: '25%',
    y: '65%',
    title: 'Digital Drawing Labs',
    desc: 'Students create detailed character turnarounds and keyframes using modern digital drawing tablets.',
    focus: 'Character Design'
  },
  {
    id: 'lightbox',
    x: '55%',
    y: '50%',
    title: 'Traditional Lightboxes',
    desc: 'Learning the core 12 principles of animation by hand-sketching individual frames on paper.',
    focus: 'Classic Flipbook'
  },
  {
    id: 'screen',
    x: '75%',
    y: '60%',
    title: 'CGI Composition Suites',
    desc: 'Stitching individual digital assets, coloring background plates, and running post-production rendering.',
    focus: 'Compositing'
  },
  {
    id: 'teacher',
    x: '45%',
    y: '35%',
    title: 'Mentorship Circles',
    desc: 'Daily critique boards and storytelling feedback from Adetunwase and professional mentors.',
    focus: 'Storyboarding'
  }
];

export default function AnimationSchool() {
  const { soundActive } = useGlobalState();
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);

  const triggerBeep = (freq: number) => {
    if (!soundActive) return;
    try {
      const AC = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-12 border-b-8 border-black bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Adenle Academy ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FF6B00] pb-2">
            Animation Academy
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            Step into our Ghibli-inspired classrooms. Hover the glowing focus hotspots to see our students and mentors in action!
          </p>
        </div>

        {/* Visual Classroom Section */}
        <div className="relative border-4 border-black rounded shadow-[8px_8px_0_0_#000] overflow-hidden aspect-[16/9] w-full select-none bg-zinc-900 max-h-[500px]">
          {/* Background Illustration */}
          <img
            src="/assets/animation_school.jpg"
            alt="Pixar Ghibli Animation Classroom"
            className="w-full h-full object-cover opacity-80"
          />

          {/* Interactive Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: spot.x, top: spot.y }}
              onMouseEnter={() => {
                setActiveSpot(spot);
                triggerBeep(330);
              }}
              onMouseLeave={() => setActiveSpot(null)}
              onClick={() => {
                setActiveSpot(spot);
                triggerBeep(440);
              }}
              data-cursor="pencil"
            >
              {/* Outer pulsing ring */}
              <div className="w-8 h-8 rounded-full bg-[#FFD400]/40 flex items-center justify-center relative animate-pulse">
                {/* Inner core */}
                <div className="w-4 h-4 rounded-full bg-[#FFD400] border-2 border-black flex items-center justify-center shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                  <Info className="w-2.5 h-2.5 text-black" />
                </div>
              </div>
            </div>
          ))}

          {/* Hotspot details overlay (Mobile-friendly drawer style or absolute positioning) */}
          <AnimatePresence>
            {activeSpot && (
              <motion.div
                className="absolute bottom-4 left-4 right-4 md:left-6 md:max-w-sm bg-white text-black p-5 border-4 border-black rounded shadow-[4px_4px_0_0_#000] z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{
                  backgroundImage: "url('/assets/paper_texture.jpg')",
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'overlay',
                }}
              >
                <span className="text-[9px] bg-black text-[#FFD400] font-black py-0.5 px-2 rounded-full uppercase tracking-wider mb-2 inline-block">
                  🎯 Focus: {activeSpot.focus}
                </span>
                <h4 className="text-lg font-black font-outfit uppercase tracking-tight text-black mb-1">
                  {activeSpot.title}
                </h4>
                <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                  {activeSpot.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
