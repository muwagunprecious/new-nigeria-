'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';

interface Tribe {
  name: string;
  greeting: string;
  attire: string;
  color: string;
  festivals: string;
  img: string;
}

const tribes: Tribe[] = [
  { name: 'Yoruba', greeting: 'Káàbọ̀ (Welcome)', attire: 'Agbádá & Gèlè', color: '#FFD400', festivals: 'Eyo Festival, Oshun Oshogbo', img: '/assets/tribe_yoruba.jpg' },
  { name: 'Igbo', greeting: 'Nnọọ (Welcome)', attire: 'Isiagu & Lappa', color: '#FF6B00', festivals: 'New Yam Festival, Mmanwu', img: '/assets/tribe_igbo.jpg' },
  { name: 'Hausa', greeting: 'Barka da zuwa (Welcome)', attire: 'Babban Riga', color: '#2E7D32', festivals: 'Durbar Festival, Sharo', img: '/assets/tribe_hausa.jpg' },
  { name: 'Fulani', greeting: 'Tanaado (Peace)', attire: 'Mudukare & Beads', color: '#1565C0', festivals: 'Gerewol, Yakkan', img: '/assets/tribe_fulani.jpg' },
  { name: 'Ijaw', greeting: 'Ibua (Welcome)', attire: 'Doni & Wrapper', color: '#D84315', festivals: 'Odi Festival, Boat Regatta', img: '/assets/tribe_ijaw.jpg' },
  { name: 'Efik', greeting: 'Emedi (Welcome)', attire: 'Onyonyo & Usobo', color: '#6A1B9A', festivals: 'Calabar Carnival, Ekpe', img: '/assets/tribe_efik.jpg' }
];

interface FoodItem {
  name: string;
  description: string;
  img: string;
  color: string;
}

const foods: FoodItem[] = [
  { name: 'Jollof Rice', description: 'Smoky, rich, and intensely spiced rice cooked in fresh tomato-pepper broth.', img: '/assets/food_jollof.jpg', color: '#D32F2F' },
  { name: 'Amala & Ewedu', description: 'Yam flour meal paired with slippery jute leaf soup and rich stew.', img: '/assets/food_amala.jpg', color: '#7E57C2' },
  { name: 'Pounded Yam', description: 'Smooth, stretchy yams pounded to perfection, served with Egusi soup.', img: '/assets/food_pounded.jpg', color: '#FFB300' },
  { name: 'Suya', description: 'Skewered beef coated in spicy Yaji peanut rub, grilled over open flames.', img: '/assets/food_suya.jpg', color: '#E65100' }
];

export default function CultureSection() {
  const { calmMode, soundActive } = useGlobalState();
  const [activeTribe, setActiveTribe] = useState<Tribe | null>(null);
  const [hoveredFood, setHoveredFood] = useState<string | null>(null);

  const triggerSound = (pitch: number) => {
    if (!soundActive) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.8, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section
      id="culture-section"
      className="relative py-24 px-6 md:px-12 border-b-8 border-black paper-texture text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Heritage & Roots ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FF6B00] pb-2">
            The Rhythm of Nigeria
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            Over 250 ethnic groups dancing to a single heartbeat. Hover elements to hear the talking drums.
          </p>
        </div>

        {/* Culture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tribes.map((tribe, idx) => (
            <div
              key={idx}
              className="comic-card p-4 cursor-pointer relative overflow-hidden group select-none flex flex-col"
              style={{
                borderColor: '#000',
                backgroundColor: activeTribe?.name === tribe.name ? tribe.color : '#FFFFFF'
              }}
              onClick={() => {
                setActiveTribe(activeTribe?.name === tribe.name ? null : tribe);
                triggerSound(180 + idx * 25);
              }}
              onMouseEnter={() => triggerSound(150 + idx * 15)}
              data-cursor="drum"
            >
              {/* Card texture overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Hand-drawn Tribe Illustration */}
              <div className="border-4 border-black bg-gray-50 aspect-video mb-4 overflow-hidden relative shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] shrink-0">
                <img
                  src={tribe.img}
                  alt={tribe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-extrabold font-outfit uppercase mb-1 text-black flex justify-between items-center">
                <span>{tribe.name}</span>
                <span className="text-[10px] border-2 border-black px-2 py-0.5 rounded bg-black text-white font-bold rotate-2">
                  Tribe
                </span>
              </h3>
              <p className="text-gray-800 font-bold font-inter text-sm mb-3 italic">
                "{tribe.greeting}"
              </p>

              <div className="border-t-2 border-black/20 pt-3 text-xs font-semibold text-black space-y-1 mt-auto">
                <div>👚 <span className="underline">Attire:</span> {tribe.attire}</div>
                <div>🎉 <span className="underline">Festival:</span> {tribe.festivals}</div>
              </div>

              {/* Reveal detail bubble on select */}
              <AnimatePresence>
                {activeTribe?.name === tribe.name && (
                  <motion.div
                    className="absolute inset-0 bg-black text-[#FFD400] p-6 flex flex-col justify-center items-center text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <h4 className="text-xl font-extrabold uppercase mb-2">{tribe.name} Culture</h4>
                    <p className="text-white text-xs leading-relaxed max-w-xs font-medium">
                      Known for beautiful {tribe.attire} worn during ceremonies, celebrating milestones like {tribe.festivals}.
                    </p>
                    <button className="btn-3d btn-3d-yellow text-[10px] mt-4 !py-1 !px-3">
                      Got it!
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Delicacies Corner (Physical Scrapbook Plate) */}
        <div className="bg-[#1E1E1E] border-4 border-black rounded shadow-[8px_8px_0_0_#FFD400] p-8 md:p-12 relative">
          <div className="absolute top-[-15px] left-8 border-4 border-black bg-[#FFD400] text-black px-4 py-1 font-bold text-xs uppercase rounded rotate-[-2deg]">
            🍲 Kitchen of the Gods 🍲
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Plate area */}
            <div className="flex justify-center relative h-64 md:h-80">
              {/* Steaming Plate visual */}
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#3E2723] border-8 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center relative overflow-hidden select-none">
                <AnimatePresence mode="wait">
                  {hoveredFood ? (
                    <motion.img
                      key={hoveredFood}
                      src={foods.find(f => f.name === hoveredFood)?.img}
                      alt={hoveredFood}
                      className="w-[85%] h-[85%] rounded-full object-cover border-4 border-black shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
                      initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
                      animate={{ scale: 1.0, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.8, rotate: 15, opacity: 0 }}
                      transition={{ type: 'spring', damping: 15 }}
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center text-gray-400">
                      <span className="text-8xl filter drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]">🍲</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider mt-2">Hungry? Hover below!</span>
                    </div>
                  )}
                </AnimatePresence>

                {/* Animated Steam Particles (only when hovered) */}
                {!calmMode && hoveredFood && (
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3.5 h-3.5 bg-white/50 rounded-full blur-[2px] animate-steam"
                        style={{
                          left: `${35 + Math.random() * 30}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${1.3 + Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Food Info select panel */}
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold font-outfit uppercase text-[#FFD400]">
                Nigerian Delicacies
              </h3>
              <p className="text-gray-300 text-sm font-semibold">
                Hover over the delicacies below to plate them and watch them steam!
              </p>

              <div className="grid grid-cols-2 gap-4">
                {foods.map((food, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => {
                      setHoveredFood(food.name);
                      triggerSound(220 + idx * 30);
                    }}
                    className={`p-4 border-2 border-black text-left rounded font-bold font-outfit transition-all flex items-center gap-2 focus-hand-drawn ${
                      hoveredFood === food.name
                        ? 'bg-[#FF6B00] text-white translate-x-[-2px] translate-y-[-2px] shadow-[4px_4px_0_0_#000]'
                        : 'bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0_0_#000]'
                    }`}
                  >
                    <span className="text-2xl">🍽️</span>
                    <span className="text-sm uppercase tracking-wide">{food.name}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic food description box */}
              <div className="border-t-2 border-black/30 pt-4 min-h-[80px]">
                <AnimatePresence mode="wait">
                  {hoveredFood && (
                    <motion.div
                      key={hoveredFood}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="bg-black/40 p-4 border-2 border-black rounded text-xs font-semibold text-gray-200 leading-relaxed"
                    >
                      <span className="text-[#FFD400] font-extrabold uppercase mr-1">
                        {hoveredFood}:
                      </span>
                      {foods.find(f => f.name === hoveredFood)?.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
