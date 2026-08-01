'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Flame, Users, Sparkles, Send, BookOpen } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';
import confetti from 'canvas-confetti';

export default function RecordMission() {
  const { calmMode, passportStamps } = useGlobalState();
  const [activeTab, setActiveTab] = useState<'goal' | 'impact' | 'participate'>('goal');

  const totalTarget = 20000;
  const currentCount = 14205 + passportStamps.length * 15;
  const percentComplete = Math.min(100, Math.round((currentCount / totalTarget) * 100));

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD400', '#FF6B00', '#FFFFFF', '#008751']
    });
  };

  return (
    <section
      id="record-mission"
      className="relative py-20 px-6 md:px-12 border-b-8 border-black bg-[#0B132B] text-white overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FFD400_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Top Campaign Badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            onClick={triggerConfetti}
            className="cursor-pointer bg-[#001D3D] text-[#FFD400] border-4 border-[#FFD400] px-6 py-2 rounded-full shadow-[0_0_25px_rgba(255,212,0,0.4)] flex items-center gap-3 select-none hover:scale-105 transition-all"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Award className="w-6 h-6 text-[#FFD400] animate-bounce" />
            <span className="text-xs md:text-sm font-black uppercase tracking-widest text-white">
              Official Guinness World Records™ Attempt
            </span>
            <span className="bg-[#FF6B00] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
              Live Campaign
            </span>
          </motion.div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tight text-white mb-4 drop-shadow-[2px_2px_0_#000]">
            Building The World&apos;s Largest <span className="text-[#FFD400]">Animated Story Archive</span>
          </h2>
          <p className="text-gray-300 text-base md:text-xl font-bold max-w-3xl mx-auto italic">
            &quot;250 Tribes. 36 States. 20,000 Stories. One Nation Making History.&quot;
          </p>
        </div>

        {/* Live Target Progress Bar Banner */}
        <div
          className="bg-white text-black p-6 md:p-8 border-4 border-black rounded shadow-[8px_8px_0_0_#000] mb-12 relative overflow-hidden"
          style={{
            backgroundImage: "url('/assets/paper_texture.jpg')",
            backgroundSize: 'cover',
            backgroundBlendMode: 'overlay',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#FF6B00] block mb-1">
                ⚡ Global Campaign Counter
              </span>
              <h3 className="text-2xl md:text-3xl font-black font-outfit uppercase leading-none">
                {currentCount.toLocaleString()} <span className="text-gray-500 font-bold text-lg">/ {totalTarget.toLocaleString()} Stories Collected</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full border-2 border-black">
              <Sparkles className="w-4 h-4 text-[#FFD400] animate-spin" />
              <span className="text-xs font-black uppercase tracking-wider">{percentComplete}% Goal Reached</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-gray-300 border-4 border-black rounded-full h-8 overflow-hidden relative p-1 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6B00] via-[#FFD400] to-[#008751] rounded-full relative"
              initial={{ width: '0%' }}
              whileInView={{ width: `${percentComplete}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              {/* Shimmer light sweep */}
              {!calmMode && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shimmer" />
              )}
            </motion.div>
          </div>

          <div className="flex justify-between items-center mt-3 text-xs font-black uppercase tracking-wider text-gray-700">
            <span>🚀 14,205 Submitted</span>
            <span>🎯 Target: 20,000 to set Official World Record</span>
          </div>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Card 1 */}
          <motion.div
            onClick={() => setActiveTab('goal')}
            className={`p-6 border-4 border-black rounded shadow-[6px_6px_0_0_#000] cursor-pointer transition-all ${
              activeTab === 'goal' ? 'bg-[#FFD400] text-black scale-105 z-10' : 'bg-[#1E1E1E] text-white hover:bg-gray-800'
            }`}
            style={{
              backgroundImage: "url('/assets/paper_texture.jpg')",
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-black text-white rounded border-2 border-black">
                <Target className="w-6 h-6 text-[#FFD400]" />
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight font-outfit">The Record Mission</h4>
            </div>
            <p className="text-xs font-bold leading-relaxed opacity-90">
              Spearheaded by 4-time Guinness World Record Holder <strong>Adetunwase Adenle</strong>, this project aims to break the world record for the largest collection of cultural stories animated into film.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            onClick={() => setActiveTab('impact')}
            className={`p-6 border-4 border-black rounded shadow-[6px_6px_0_0_#000] cursor-pointer transition-all ${
              activeTab === 'impact' ? 'bg-[#FF6B00] text-white scale-105 z-10' : 'bg-[#1E1E1E] text-white hover:bg-gray-800'
            }`}
            style={{
              backgroundImage: "url('/assets/paper_texture.jpg')",
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-black text-white rounded border-2 border-black">
                <Flame className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight font-outfit">Cultural Preservation</h4>
            </div>
            <p className="text-xs font-bold leading-relaxed opacity-90">
              Over 250 ethnic groups have lore, food recipes, legends, and history that are slowly being forgotten. Every story submitted is adapted into animated episodes for future generations.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            onClick={() => setActiveTab('participate')}
            className={`p-6 border-4 border-black rounded shadow-[6px_6px_0_0_#000] cursor-pointer transition-all ${
              activeTab === 'participate' ? 'bg-[#008751] text-white scale-105 z-10' : 'bg-[#1E1E1E] text-white hover:bg-gray-800'
            }`}
            style={{
              backgroundImage: "url('/assets/paper_texture.jpg')",
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-black text-white rounded border-2 border-black">
                <Users className="w-6 h-6 text-[#008751]" />
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight font-outfit">Citizen Ownership</h4>
            </div>
            <p className="text-xs font-bold leading-relaxed opacity-90">
              Every Nigerian at home or in the diaspora can submit a 100-word story. Your name will be officially credited in the Guinness World Record submission archive!
            </p>
          </motion.div>

        </div>

        {/* CTA Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#152238] border-4 border-black p-6 rounded shadow-[6px_6px_0_0_#000] gap-4">
          <div>
            <h4 className="text-xl font-black uppercase font-outfit text-[#FFD400]">
              Ready to leave your mark in history?
            </h4>
            <p className="text-xs font-bold text-gray-300">
              Submit your story now to receive an official Guinness Record Entry Certificate!
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="#submission-section"
              className="btn-3d btn-3d-orange text-xs flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Story (#14,206)
            </a>
            <a
              href="#history-book-section"
              className="btn-3d btn-3d-yellow text-xs flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Explore History
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
