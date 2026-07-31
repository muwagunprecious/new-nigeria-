'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Compass, Book, CheckCircle2 } from 'lucide-react';

interface RegionData {
  id: string;
  name: string;
  coords: { cx: number; cy: number };
  greeting: string;
  attire: string;
  delicacy: string;
  legends: string;
  color: string;
}

const regions: RegionData[] = [
  {
    id: 'lagos',
    name: 'Lagos & South West (Yorubaland)',
    coords: { cx: 20, cy: 75 },
    greeting: 'Ẹ lẹ́kùùlẹ́ (Greetings)',
    attire: 'Aṣọ Òkè, Bùbá & Yèrí',
    delicacy: 'Amàlà, Ewédú & Gbẹ̀gìrì',
    legends: 'Fela Kuti, Wole Soyinka, Funmilayo Ransome-Kuti',
    color: '#FFD400'
  },
  {
    id: 'abuja',
    name: 'FCT Abuja & Central (Middle Belt)',
    coords: { cx: 50, cy: 50 },
    greeting: 'Sannu da yamma (Greetings)',
    attire: 'Gbagyi woven textiles',
    delicacy: 'Maza (local millet snack), Tuwo',
    legends: 'Dr. Ladi Kwali (famous potter)',
    color: '#FF6B00'
  },
  {
    id: 'kano',
    name: 'Kano & North West (Hausaland)',
    coords: { cx: 45, cy: 15 },
    greeting: 'Ina kwana (Good morning)',
    attire: 'Babban Riga & Fula cap',
    delicacy: 'Tuwo Shinkafa & Miyan Kuka',
    legends: 'Queen Amina of Zaria, Maitama Sule',
    color: '#2E7D32'
  },
  {
    id: 'enugu',
    name: 'Enugu & South East (Igboland)',
    coords: { cx: 68, cy: 72 },
    greeting: 'Ịbọlạ chi (Good morning)',
    attire: 'Isiagu shirt & red cap',
    delicacy: 'Ofe Onugbu (Bitterleaf soup) & Akpu',
    legends: 'Chinua Achebe, Nnamdi Azikiwe, Ngozi Okonjo-Iweala',
    color: '#1565C0'
  },
  {
    id: 'calabar',
    name: 'Calabar & South South (Niger Delta)',
    coords: { cx: 78, cy: 82 },
    greeting: 'Mọshọkọ (Thank you)',
    attire: 'Onyonyo dress & beads',
    delicacy: 'Afang soup & Pounded Yam',
    legends: 'Margaret Ekpo (women rights pioneer)',
    color: '#D84315'
  },
  {
    id: 'maiduguri',
    name: 'Maiduguri & North East (Kanuri region)',
    coords: { cx: 85, cy: 20 },
    greeting: 'Ushara (Welcome)',
    attire: 'Phunu cap & embroidery',
    delicacy: 'Biski (millet meal), dried fish stew',
    legends: 'El-Kanemi historical rulers',
    color: '#6A1B9A'
  }
];

export default function InteractiveMap() {
  const { calmMode, soundActive, passportStamps, addPassportStamp } = useGlobalState();
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);
  const [stampedState, setStampedState] = useState<string | null>(null);

  const triggerStampSound = () => {
    if (!soundActive) return;
    try {
      const AC = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
      const ctx = new AC();
      
      // Synthesize paper stamp "thump"
      const osc = ctx.createOscillator();
      const noise = ctx.createBufferSource();
      const gain = ctx.createGain();

      // Low thump
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);

      // Noise buffer for paper rustle/strike
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);

      osc.connect(gain);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.start();
      noise.start();
      osc.stop(ctx.currentTime + 0.2);
      noise.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.log(e);
    }
  };

  const handleStamp = (region: RegionData) => {
    addPassportStamp(region.id);
    setStampedState(region.id);
    triggerStampSound();

    // Auto clear flash animation
    setTimeout(() => {
      setStampedState(null);
    }, 1000);
  };

  return (
    <section
      id="map-section"
      className="relative py-24 px-6 md:px-12 border-b-8 border-black bg-gradient-to-b from-[#3E2723] to-[#1A0D33] text-white overflow-hidden"
      style={{
        backgroundImage: calmMode ? "none" : "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/paper_texture.jpg')",
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Geographic Expedition ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FFD400] pb-2">
            Interactive Passport Map
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            Explore the diversity across Nigeria&apos;s regions. Tap a bead to inspect the culture and stamp your session passport!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* 3D Nigeria Map with Location Poles */}
          <div className="lg:col-span-2 border-4 border-black rounded shadow-[8px_8px_0_0_#000] relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
            {/* 3D Map Image */}
            <img
              src="/assets/nigeria_map_3d.jpg"
              alt="3D Nigeria Map"
              className={`w-full h-full object-cover ${calmMode ? '' : 'animate-pan-slow'}`}
            />

            {/* Overlay: Location Poles for each region */}
            {regions.map((region) => {
              const isActive = activeRegion?.id === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region)}
                  className="absolute group focus:outline-none"
                  style={{
                    left: `${region.coords.cx}%`,
                    top: `${region.coords.cy}%`,
                    transform: 'translate(-50%, -100%)',
                    zIndex: isActive ? 30 : 20,
                  }}
                  title={region.name}
                >
                  {/* Pole stick */}
                  <div className="flex flex-col items-center">
                    {/* Label badge — shows on hover/active */}
                    <motion.div
                      className="mb-1 px-2 py-0.5 rounded border-2 border-black text-[10px] font-black uppercase whitespace-nowrap shadow-[2px_2px_0_0_#000]"
                      style={{ background: region.color, color: region.color === '#FFD400' ? '#000' : '#fff' }}
                      initial={{ opacity: 0, y: 4, scale: 0.8 }}
                      animate={isActive
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 4, scale: 0.8 }}
                      whileHover={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', damping: 16 }}
                    >
                      {region.name.split(' ')[0]}
                    </motion.div>

                    {/* Pin head with pulse */}
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing ring */}
                      {!calmMode && (
                        <motion.div
                          className="absolute rounded-full border-2"
                          style={{ borderColor: region.color, width: 28, height: 28 }}
                          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}
                      {/* Pin circle */}
                      <div
                        className={`w-5 h-5 rounded-full border-[3px] border-black shadow-[2px_2px_0_0_#000] z-10 transition-transform group-hover:scale-125 ${isActive ? 'scale-125' : ''}`}
                        style={{ background: region.color }}
                      >
                        {/* Stamp checkmark if collected */}
                        {passportStamps.includes(region.id) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[7px] text-white font-black">✓</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pole stem */}
                    <div
                      className="w-[3px] rounded-b shadow-sm"
                      style={{ height: '28px', background: `linear-gradient(to bottom, ${region.color}, #000)` }}
                    />

                    {/* Shadow at base */}
                    <div
                      className="w-4 h-[4px] rounded-full opacity-40 -mt-[2px]"
                      style={{ background: '#000', filter: 'blur(2px)' }}
                    />
                  </div>
                </button>
              );
            })}

            {/* Compass rose */}
            <div className="absolute top-3 right-3 flex flex-col items-center opacity-80 bg-black/50 rounded-full p-1">
              <Compass className="w-6 h-6 text-[#FFD400] animate-spin" style={{ animationDuration: '30s' }} />
              <span className="text-[8px] font-bold text-white mt-0.5 tracking-widest">N</span>
            </div>

            {/* Click hint */}
            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border-2 border-[#FFD400]">
              📍 Tap a pole to explore each region
            </div>
          </div>


          {/* Region Details & Passport Panel */}
          <div className="space-y-8">
            {/* Dynamic Card Display */}
            <div className="bg-white text-black p-6 border-4 border-black rounded shadow-[6px_6px_0_0_#000] min-h-[300px] relative flex flex-col justify-between"
                 style={{
                   backgroundImage: "url('/assets/paper_texture.jpg')",
                   backgroundSize: 'cover',
                   backgroundBlendMode: 'overlay',
                 }}
            >
              {activeRegion ? (
                <>
                  <div>
                    <h3 className="text-xl font-extrabold font-outfit uppercase border-b-2 border-black pb-2 flex justify-between items-center">
                      <span className="text-black">{activeRegion.name}</span>
                      <span
                        className="w-4 h-4 rounded-full border-2 border-black"
                        style={{ backgroundColor: activeRegion.color }}
                      />
                    </h3>

                    <div className="mt-4 space-y-3 font-semibold text-xs text-gray-800">
                      <div>🗣️ <span className="underline">Greeting:</span> {'"'}{activeRegion.greeting}{'"'}</div>
                      <div>👚 <span className="underline">Clothing:</span> {activeRegion.attire}</div>
                      <div>🍲 <span className="underline">Delicacy:</span> {activeRegion.delicacy}</div>
                      <div>🌟 <span className="underline">Legends:</span> {activeRegion.legends}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      onClick={() => handleStamp(activeRegion)}
                      className="btn-3d btn-3d-orange w-full text-xs"
                    >
                       Stamp Passport
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <Compass className="w-12 h-12 text-[#FF6B00] mb-4" />
                  <h4 className="text-lg font-bold font-outfit">Select a Territory</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-2 font-medium">
                    Tap any colored node on the thread map to discover region insights and collect custom stamps.
                  </p>
                </div>
              )}

              {/* Passport Stamp Success Overlay */}
              <AnimatePresence>
                {stampedState && (
                  <motion.div
                    className="absolute inset-0 bg-white/95 border-2 border-black flex flex-col items-center justify-center z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-24 h-24 rounded-full border-8 border-dashed border-[#FF6B00] flex items-center justify-center font-extrabold text-red-600 uppercase text-xs tracking-wider rotate-[-12deg] animate-scale">
                      STAMPED!
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Passport Stamp Collection */}
            <div className="bg-[#1E1E1E] border-4 border-[#FFD400] p-6 rounded shadow-[4px_4px_0_0_#000]">
              <h4 className="text-sm font-extrabold font-outfit uppercase tracking-wider text-[#FFD400] flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
                <Book className="w-4 h-4" />
                Session Explorer Passport
              </h4>

              <div className="grid grid-cols-3 gap-3">
                {regions.map((region) => {
                  const isStamped = passportStamps.includes(region.id);
                  return (
                    <div
                      key={region.id}
                      className={`h-16 border-2 border-black rounded flex flex-col items-center justify-center text-[10px] font-bold relative transition-all ${
                        isStamped
                          ? 'bg-white text-black shadow-[2px_2px_0_0_#000]'
                          : 'bg-black/30 text-gray-600 border-dashed border-gray-800'
                      }`}
                    >
                      {isStamped ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600 absolute top-1 right-1" />
                          <span className="uppercase text-[9px] tracking-tight">{region.id}</span>
                          <span className="text-[6px] text-gray-400 font-extrabold">APPROVED</span>
                        </>
                      ) : (
                        <>
                          <span className="uppercase text-[9px] tracking-tight">{region.id}</span>
                          <span className="text-[6px] text-gray-600">LOCKED</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
