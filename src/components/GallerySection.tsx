'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';

interface GalleryItem {
  id: number;
  title: string;
  author: string;
  location: string;
  snippet: string;
  themeColor: string;
  deg: string;
}

const items: GalleryItem[] = [
  {
    id: 1,
    title: "The Whispering Iroko",
    author: "Chinedu",
    location: "Enugu State",
    snippet: "A story about a ancient tree in my village that talks to children when they play under it at noon.",
    themeColor: "border-green-600 shadow-green-950",
    deg: "rotate-[-2deg]"
  },
  {
    id: 2,
    title: "Danfo Traffic Gist",
    author: "Yetunde",
    location: "Lagos State",
    snippet: "Hilarious conversations overheard between a conductor, a fruit seller, and an Okada rider during rush hour traffic.",
    themeColor: "border-yellow-500 shadow-yellow-950",
    deg: "rotate-[3deg]"
  },
  {
    id: 3,
    title: "Kano Clay Potter",
    author: "Aminu",
    location: "Kano State",
    snippet: "My grandfather makes clay pots. He says each pot has its own heartbeat if you listen close.",
    themeColor: "border-orange-500 shadow-orange-950",
    deg: "rotate-[-1deg]"
  },
  {
    id: 4,
    title: "Calabar Regatta",
    author: "Bassey",
    location: "Cross River",
    snippet: "The legend of the great boat race where sailors carve masks that speak to the river gods for speed.",
    themeColor: "border-blue-600 shadow-blue-950",
    deg: "rotate-[2deg]"
  },
  {
    id: 5,
    title: "The Amala Spot Queen",
    author: "Bola",
    location: "Oyo State",
    snippet: "Mama Tunde runs Ibadan's busiest amala joint. People say her ewedu is magical enough to settle disputes.",
    themeColor: "border-purple-600 shadow-purple-950",
    deg: "rotate-[-2deg]"
  },
  {
    id: 6,
    title: "Durbar Festival Horse",
    author: "Binta",
    location: "Kaduna State",
    snippet: "How a young girl dressed up in traditional garments to ride with the royal cavalry during the Durbar.",
    themeColor: "border-red-600 shadow-red-950",
    deg: "rotate-[1deg]"
  }
];

export default function GallerySection() {
  const { calmMode } = useGlobalState();

  return (
    <section className="relative py-24 px-6 md:px-12 border-b-8 border-black paper-texture text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Community Storyboard ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FF6B00] pb-2">
            Living Gallery
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            Read snippets of authentic narratives submitted by fellow Nigerians. Hover cards to reveal details.
          </p>
        </div>

        {/* Masonry / Pinboard Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`break-inside-avoid bg-white text-black p-6 border-4 border-black rounded shadow-[6px_6px_0_0_#000] flex flex-col justify-between select-none relative group cursor-pointer ${item.deg}`}
              style={{
                backgroundImage: "url('/assets/paper_texture.jpg')",
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
              }}
              whileHover={calmMode ? {} : {
                y: -6,
                rotate: item.deg.includes('-') ? 1 : -1,
                boxShadow: "10px 10px 0px 0px #000"
              }}
              initial={calmMode ? {} : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 18 }}
              data-cursor="paint"
            >
              {/* Paper pin header visual */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border-2 border-black shadow-[1px_1px_2px_rgba(0,0,0,0.3)] z-10" />

              {/* Story Title & Meta */}
              <div className="mt-2">
                <span className="text-[10px] font-black uppercase text-[#FF6B00] tracking-wider block">
                  📍 {item.location}
                </span>
                <h3 className="text-xl font-extrabold font-outfit uppercase tracking-tight text-black mt-1 mb-3">
                  "{item.title}"
                </h3>
                <p className="text-xs font-semibold text-gray-700 italic leading-relaxed mb-6">
                  "{item.snippet}"
                </p>
              </div>

              {/* Author footer */}
              <div className="border-t-2 border-dashed border-black/10 pt-3 flex justify-between items-center text-[10px] font-extrabold">
                <span className="text-gray-500">BY {item.author.toUpperCase()}</span>
                <span className="bg-black text-white px-2 py-0.5 border border-black rounded">
                  STORY #{item.id}03
                </span>
              </div>

              {/* Subtle Paint Splatters */}
              <div className="absolute right-2 top-2 opacity-5 pointer-events-none text-4xl">🎨</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
