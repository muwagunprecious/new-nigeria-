'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';

interface Legend {
  name: string;
  role: string;
  desc: string;
  icon: string;
  color: string;
  rotate: string;
}

const legends: Legend[] = [
  {
    name: "Chinua Achebe",
    role: "Father of African Literature",
    desc: "Author of 'Things Fall Apart', the most widely read book in modern African literature.",
    icon: "✍️",
    color: "#E65100",
    rotate: "rotate-[-2deg]"
  },
  {
    name: "Wole Soyinka",
    role: "Nobel Laureate in Literature",
    desc: "First African to be awarded the Nobel Prize in Literature in 1986.",
    icon: "🦁",
    color: "#FFD400",
    rotate: "rotate-[3deg]"
  },
  {
    name: "Fela Kuti",
    role: "Pioneer of Afrobeat",
    desc: "Musician, composer, and human rights activist who revolutionized music and culture globally.",
    icon: "🎷",
    color: "#2E7D32",
    rotate: "rotate-[-1deg]"
  },
  {
    name: "Funmilayo Ransome-Kuti",
    role: "Lioness of Lisabi",
    desc: "Educator, political campaigner, suffragist, and first Nigerian woman to drive a car.",
    icon: "🚗",
    color: "#1565C0",
    rotate: "rotate-[2deg]"
  },
  {
    name: "Queen Amina",
    role: "Warrior Queen of Zazzau",
    desc: "16th-century Hausa warrior queen who commanded armies and expanded Zaria boundaries.",
    icon: "⚔️",
    color: "#C62828",
    rotate: "rotate-[-3deg]"
  },
  {
    name: "Ngozi Okonjo-Iweala",
    role: "Director-General of the WTO",
    desc: "First woman and first African to lead the World Trade Organization.",
    icon: "🌐",
    color: "#D84315",
    rotate: "rotate-[1deg]"
  },
  {
    name: "Hilda Baci",
    role: "Culinary Athlete",
    desc: "Famous chef who broke the Guinness World Record for the longest cooking marathon.",
    icon: "👩‍🍳",
    color: "#6A1B9A",
    rotate: "rotate-[-2deg]"
  },
  {
    name: "Adetunwase Adenle",
    role: "5-time Guinness Record Holder",
    desc: "Artist, educator, and animator using giant interactive paintings to tell Nigeria's history.",
    icon: "🎨",
    color: "#FFD400",
    rotate: "rotate-[2deg]"
  }
];

export default function LegendsSection() {
  const { calmMode } = useGlobalState();

  return (
    <section className="relative py-24 px-6 md:px-12 border-b-8 border-black paper-texture text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Hall of Heroes ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FF6B00] pb-2">
            Nigerian Legends
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            Meet the pioneers, dreamers, and rule-breakers who shaped our global story. Hover to see them come alive.
          </p>
        </div>

        {/* Grid of Polaroid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {legends.map((legend, idx) => (
            <motion.div
              key={idx}
              className={`bg-white text-black p-4 border-4 border-black rounded shadow-[6px_6px_0_0_#000] ${legend.rotate} flex flex-col justify-between select-none relative group cursor-pointer`}
              style={{
                backgroundImage: "url('/assets/paper_texture.jpg')",
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
              }}
              whileHover={calmMode ? {} : {
                y: -10,
                rotate: idx % 2 === 0 ? 1 : -1,
                boxShadow: "10px 10px 0px 0px #000"
              }}
              initial={calmMode ? {} : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {/* Polaroid Photo Wrapper */}
              <div className="border-4 border-black bg-gray-50 aspect-square flex items-center justify-center relative overflow-hidden mb-4 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]">
                {/* Background aura gradient that spins/pulses on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${legend.color === '#FFD400' ? 'from-yellow-400 to-[#FF6B00]' : 'from-gray-200 to-gray-400'} opacity-30 group-hover:opacity-60 transition-opacity`}
                  style={{ backgroundColor: legend.color }}
                />

                <span className="text-7xl z-10 group-hover:scale-110 transition-transform duration-300">
                  {legend.icon}
                </span>

                {/* Hand-drawn tape corners */}
                <div className="absolute top-[-5px] left-[-5px] w-8 h-4 bg-yellow-200/60 border-b-2 border-r-2 border-black rotate-[-30deg] opacity-70" />
                <div className="absolute top-[-5px] right-[-5px] w-8 h-4 bg-yellow-200/60 border-b-2 border-l-2 border-black rotate-[30deg] opacity-70" />
              </div>

              {/* Legend Meta */}
              <div className="text-center pb-2">
                <h4 className="text-lg font-black font-outfit uppercase tracking-tight text-black line-clamp-1">
                  {legend.name}
                </h4>
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#FF6B00] mb-2">
                  {legend.role}
                </p>
                <p className="text-[11px] font-semibold text-gray-700 leading-snug line-clamp-3">
                  {legend.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
