'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';

interface Legend {
  id: string;
  name: string;
  role: string;
  desc: string;
  icon: string;
  color: string;
  rotate: string;
  img?: string;
}

const legends: Legend[] = [
  {
    id: "achebe",
    name: "Chinua Achebe",
    role: "Father of African Literature",
    desc: "Author of 'Things Fall Apart', the most widely read book in modern African literature.",
    icon: "✍️",
    color: "#E65100",
    rotate: "rotate-[-2deg]",
    img: "/assets/legend_achebe.jpg"
  },
  {
    id: "soyinka",
    name: "Wole Soyinka",
    role: "Nobel Laureate in Literature",
    desc: "First African to be awarded the Nobel Prize in Literature in 1986.",
    icon: "🦁",
    color: "#FFD400",
    rotate: "rotate-[3deg]",
    img: "/assets/legend_soyinka.jpg"
  },
  {
    id: "fela",
    name: "Fela Kuti",
    role: "Pioneer of Afrobeat",
    desc: "Musician, composer, and human rights activist who revolutionized music and culture globally.",
    icon: "🎷",
    color: "#2E7D32",
    rotate: "rotate-[-1deg]",
    img: "/assets/legend_fela.jpg"
  },
  {
    id: "funmilayo",
    name: "Funmilayo Ransome-Kuti",
    role: "Lioness of Lisabi",
    desc: "Educator, political campaigner, suffragist, and first Nigerian woman to drive a car.",
    icon: "🚗",
    color: "#1565C0",
    rotate: "rotate-[2deg]",
    img: "/assets/legend_funmilayo.jpg"
  },
  {
    id: "amina",
    name: "Queen Amina",
    role: "Warrior Queen of Zazzau",
    desc: "16th-century Hausa warrior queen who commanded armies and expanded Zaria boundaries.",
    icon: "⚔️",
    color: "#C62828",
    rotate: "rotate-[-3deg]",
    img: "/assets/legend_amina.jpg"
  },
  {
    id: "ngozi",
    name: "Ngozi Okonjo-Iweala",
    role: "Director-General of the WTO",
    desc: "First woman and first African to lead the World Trade Organization.",
    icon: "🌐",
    color: "#D84315",
    rotate: "rotate-[1deg]",
    img: "/assets/legend_ngozi.jpg"
  },
  {
    id: "hilda",
    name: "Hilda Baci",
    role: "Culinary Athlete",
    desc: "Famous chef who broke the Guinness World Record for the longest cooking marathon.",
    icon: "👩‍🍳",
    color: "#6A1B9A",
    rotate: "rotate-[-2deg]",
    img: "/assets/legend_hilda.jpg"
  },
  {
    id: "adenle",
    name: "Adetunwase Adenle",
    role: "5-time Guinness Record Holder",
    desc: "Artist, educator, and animator using giant interactive paintings to tell Nigeria's history.",
    icon: "🎨",
    color: "#FFD400",
    rotate: "rotate-[2deg]",
    img: "/assets/legend_adenle.jpg"
  }
];

function LegendAvatar({ id }: { id: string }) {
  switch (id) {
    case 'achebe':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Chinua Achebe: Red Igbo Cap + Eagle Feather + Glasses */}
          <circle cx="60" cy="60" r="55" fill="#3E1C00" />
          <path d="M 30 75 Q 60 65 90 75 L 95 110 L 25 110 Z" fill="#7B3F00" />
          {/* Face */}
          <ellipse cx="60" cy="58" rx="26" ry="30" fill="#8D5B4C" />
          {/* Red Cap */}
          <path d="M 32 46 C 32 24, 88 24, 88 46 Z" fill="#D32F2F" stroke="#000" strokeWidth="2" />
          {/* Eagle Feather */}
          <path d="M 75 32 C 85 10, 95 5, 88 28 Z" fill="#FFF" stroke="#000" strokeWidth="1.5" />
          {/* Glasses */}
          <rect x="42" y="52" width="14" height="10" rx="2" fill="none" stroke="#FFD400" strokeWidth="2" />
          <rect x="64" y="52" width="14" height="10" rx="2" fill="none" stroke="#FFD400" strokeWidth="2" />
          <line x1="56" y1="57" x2="64" y2="57" stroke="#FFD400" strokeWidth="2" />
          {/* Moustache */}
          <path d="M 48 72 Q 60 68 72 72 Q 60 78 48 72 Z" fill="#3E2723" />
        </svg>
      );

    case 'soyinka':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Wole Soyinka: White Afro + Beard + Round Glasses */}
          <circle cx="60" cy="60" r="55" fill="#1A237E" />
          {/* White Afro cloud */}
          <path d="M 25 50 C 15 20, 105 20, 95 50 C 105 60, 95 75, 85 75 L 35 75 C 25 75, 15 60, 25 50 Z" fill="#ECEFF1" stroke="#000" strokeWidth="2" />
          {/* Face */}
          <ellipse cx="60" cy="62" rx="24" ry="26" fill="#8D5B4C" />
          {/* White Beard */}
          <path d="M 38 68 C 38 95, 82 95, 82 68 Z" fill="#F5F5F5" stroke="#000" strokeWidth="1.5" />
          {/* Round Glasses */}
          <circle cx="48" cy="58" r="8" fill="none" stroke="#000" strokeWidth="2.5" />
          <circle cx="72" cy="58" r="8" fill="none" stroke="#000" strokeWidth="2.5" />
          <line x1="56" y1="58" x2="64" y2="58" stroke="#000" strokeWidth="2.5" />
        </svg>
      );

    case 'fela':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Fela Kuti: Afrobeat Saxophone + Vibrant Aura */}
          <circle cx="60" cy="60" r="55" fill="#2E7D32" />
          {/* Body in 70s shirt */}
          <path d="M 28 80 Q 60 70 92 80 L 100 115 L 20 115 Z" fill="#E65100" />
          {/* Face */}
          <ellipse cx="60" cy="52" rx="22" ry="26" fill="#7B4A3A" />
          {/* Saxophone */}
          <path d="M 68 65 Q 85 80 75 100 Q 65 108 55 100" fill="none" stroke="#FFD400" strokeWidth="5" strokeLinecap="round" />
          <circle cx="55" cy="100" r="8" fill="#FFD400" stroke="#000" strokeWidth="2" />
        </svg>
      );

    case 'funmilayo':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Funmilayo: Royal Yoruba Gele + Coral Beads */}
          <circle cx="60" cy="60" r="55" fill="#0D47A1" />
          {/* Gele */}
          <path d="M 20 50 C 15 20, 105 20, 100 50 L 90 60 L 30 60 Z" fill="#1E88E5" stroke="#000" strokeWidth="2" />
          <path d="M 15 35 C 40 10, 80 10, 105 35" fill="none" stroke="#FFD400" strokeWidth="3" />
          {/* Face */}
          <ellipse cx="60" cy="62" rx="22" ry="25" fill="#7B4A3A" />
          {/* Coral Beads */}
          <path d="M 42 85 Q 60 98 78 85" fill="none" stroke="#FF6B00" strokeWidth="4" strokeDasharray="3,3" />
        </svg>
      );

    case 'amina':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Queen Amina: Hausa Warrior Queen Helmet + Crossed Spears */}
          <circle cx="60" cy="60" r="55" fill="#B71C1C" />
          {/* Crossed Spears */}
          <line x1="20" y1="20" x2="100" y2="100" stroke="#FFD400" strokeWidth="3" />
          <line x1="100" y1="20" x2="20" y2="100" stroke="#FFD400" strokeWidth="3" />
          {/* Helmet */}
          <path d="M 30 52 C 30 25, 90 25, 90 52 Z" fill="#D84315" stroke="#000" strokeWidth="2" />
          <polygon points="60,15 54,32 66,32" fill="#FFD400" stroke="#000" strokeWidth="1" />
          {/* Face */}
          <ellipse cx="60" cy="62" rx="22" ry="24" fill="#7B4A3A" />
        </svg>
      );

    case 'ngozi':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Ngozi Okonjo-Iweala: Signature Tilted Gele + Glasses */}
          <circle cx="60" cy="60" r="55" fill="#E65100" />
          {/* Tilted Gele */}
          <path d="M 15 42 Q 60 20 105 32 L 95 55 L 25 50 Z" fill="#F57C00" stroke="#000" strokeWidth="2" />
          {/* Face */}
          <ellipse cx="60" cy="62" rx="23" ry="25" fill="#7B4A3A" />
          {/* Glasses */}
          <rect x="42" y="55" width="14" height="10" rx="3" fill="none" stroke="#000" strokeWidth="2.5" />
          <rect x="64" y="55" width="14" height="10" rx="3" fill="none" stroke="#000" strokeWidth="2.5" />
          <line x1="56" y1="60" x2="64" y2="60" stroke="#000" strokeWidth="2.5" />
        </svg>
      );

    case 'hilda':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Hilda Baci: Chef Toque + Gold Flame */}
          <circle cx="60" cy="60" r="55" fill="#4A148C" />
          {/* Chef Hat */}
          <path d="M 35 48 C 30 20, 90 20, 85 48 Z" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
          <rect x="35" y="44" width="50" height="10" fill="#EEEEEE" stroke="#000" strokeWidth="1.5" />
          {/* Face */}
          <ellipse cx="60" cy="65" rx="22" ry="24" fill="#8D5B4C" />
          {/* Flame Icon */}
          <circle cx="60" cy="100" r="10" fill="#FF6B00" />
        </svg>
      );

    case 'adenle':
    default:
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Adetunwase Adenle: Guinness Medal + Paintbrush */}
          <circle cx="60" cy="60" r="55" fill="#004D40" />
          {/* Face */}
          <ellipse cx="60" cy="55" rx="22" ry="25" fill="#7B4A3A" />
          {/* Paintbrush */}
          <line x1="75" y1="45" x2="100" y2="20" stroke="#FFD400" strokeWidth="5" strokeLinecap="round" />
          <polygon points="100,20 106,14 102,24" fill="#FF6B00" />
          {/* Medal */}
          <circle cx="60" cy="92" r="12" fill="#FFD400" stroke="#000" strokeWidth="2" />
          <text x="60" y="96" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#000">5x</text>
        </svg>
      );
  }
}

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
            Meet the pioneers, dreamers, and rule-breakers who shaped our global story. Hover to inspect their achievements!
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
              <div className="border-4 border-black bg-gray-900 aspect-square flex items-center justify-center relative overflow-hidden mb-4 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]">

                {/* Animated Character Avatar or Generated Image */}
                {legend.img ? (
                  <img
                    src={legend.img}
                    alt={legend.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full p-3 transition-transform duration-300 group-hover:scale-110">
                    <LegendAvatar id={legend.id} />
                  </div>
                )}

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
