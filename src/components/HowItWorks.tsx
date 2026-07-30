'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';

interface Panel {
  num: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
}

const panels: Panel[] = [
  { num: "01", title: "Learn Animation", desc: "Gain access to masterclasses led by Adetunwase and team.", icon: "🎨", color: "#FFD400" },
  { num: "02", title: "Create Story", desc: "Write or illustrate a story about Nigeria's culture, food, or history.", icon: "📝", color: "#FF6B00" },
  { num: "03", title: "Submit Story", desc: "Send it via our digital paper envelope submission portal.", icon: "✉️", color: "#4CAF50" },
  { num: "04", title: "Selected", desc: "Our jury selects the most inspiring, authentic stories.", icon: "⭐", color: "#1565C0" },
  { num: "05", title: "Professional Animators", desc: "Top animators turn your script into high-quality animation.", icon: "🎬", color: "#E65100" },
  { num: "06", title: "Become History", desc: "Your animated story is stitched into the official Guinness collage.", icon: "🏆", color: "#FFD400" }
];

export default function HowItWorks() {
  const { calmMode } = useGlobalState();

  return (
    <section id="how-it-works" className="relative py-24 px-6 md:px-12 border-b-8 border-black paper-texture text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Collaborative Journey ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FF6B00] pb-2">
            How It Works
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            From a simple idea to a globally recognized Guinness World Record animation masterpiece.
          </p>
        </div>

        {/* Comic Strip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {panels.map((panel, idx) => (
            <motion.div
              key={idx}
              className="bg-white text-black p-6 border-4 border-black rounded shadow-[6px_6px_0_0_#000] flex flex-col justify-between select-none relative overflow-hidden min-h-[220px]"
              style={{
                backgroundImage: "url('/assets/paper_texture.jpg')",
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
              }}
              whileHover={calmMode ? {} : {
                scale: 1.03,
                rotate: idx % 2 === 0 ? 1 : -1,
                boxShadow: "10px 10px 0px 0px #000"
              }}
              initial={calmMode ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 15, delay: idx * 0.1 }}
            >
              {/* Halftone dot texture */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

              <div className="flex justify-between items-start mb-4 relative z-10">
                {/* Comic Speech-Bubble Step */}
                <div
                  className="border-2 border-black bg-black text-[#FFD400] font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow-[2px_2px_0_0_#000] rotate-[-2deg]"
                  style={{ color: panel.color }}
                >
                  Panel {panel.num}
                </div>
                {/* Step Icon */}
                <span className="text-4xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
                  {panel.icon}
                </span>
              </div>

              {/* Title and details */}
              <div className="relative z-10">
                <h3 className="text-xl font-extrabold font-outfit uppercase tracking-tight text-black mb-2 border-b-2 border-black/10 pb-1">
                  {panel.title}
                </h3>
                <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                  {panel.desc}
                </p>
              </div>

              {/* Comic Strip bottom corner decoration */}
              <div className="absolute right-[-10px] bottom-[-10px] w-12 h-12 bg-black/5 rounded-full pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
