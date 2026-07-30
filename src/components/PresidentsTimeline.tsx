'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';

interface President {
  name: string;
  years: string;
  img: string;
}

const presidents: President[] = [
  { name: "Tafawa Balewa", years: "1960 - 1966", img: "/assets/president_balewa.jpg" },
  { name: "Johnson Aguiyi-Ironsi", years: "1966", img: "/assets/president_ironsi.jpg" },
  { name: "Yakubu Gowon", years: "1966 - 1975", img: "/assets/president_gowon.jpg" },
  { name: "Murtala Muhammed", years: "1975 - 1976", img: "/assets/president_murtala.jpg" },
  { name: "Olusegun Obasanjo", years: "1976 - 1979", img: "/assets/president_obasanjo.jpg" },
  { name: "Shehu Shagari", years: "1979 - 1983", img: "/assets/president_shagari.jpg" },
  { name: "Muhammadu Buhari", years: "1983 - 1985", img: "/assets/president_buhari.jpg" },
  { name: "Ibrahim Babangida", years: "1985 - 1993", img: "/assets/president_babangida.jpg" },
  { name: "Ernest Shonekan", years: "1993", img: "/assets/president_shonekan.jpg" },
  { name: "Sani Abacha", years: "1993 - 1998", img: "/assets/president_abacha.jpg" },
  { name: "Bola Ahmed Tinubu", years: "2023 - Present", img: "/assets/president_tinubu.png" }
];

export default function PresidentsTimeline() {
  const { calmMode } = useGlobalState();

  return (
    <section className="relative py-24 px-6 md:px-12 border-b-8 border-black bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Leadership Archive ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FF6B00] pb-2">
            Historical Timeline
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
            A respectful educational timeline documenting the leaders of the Federal Republic of Nigeria.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-black border-l-4 border-dashed border-[#FFD400] z-0" />

          {/* President Nodes */}
          <div className="space-y-16">
            {presidents.map((pres, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center justify-between relative z-10 w-full ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card Section */}
                  <div className={`w-full md:w-[45%] flex ${isEven ? 'justify-end' : 'justify-start'}`}>
                    <motion.div
                      className="comic-card p-4 w-full max-w-sm flex items-center gap-4 bg-white"
                      style={{
                        backgroundImage: "url('/assets/paper_texture.jpg')",
                        backgroundSize: 'cover',
                        backgroundBlendMode: 'overlay',
                      }}
                      initial={calmMode ? {} : { opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: 'spring', damping: 20 }}
                    >
                      {/* Stylized Editorial Portrait Image */}
                      <div
                        className="w-20 h-24 border-4 border-black shadow-[3px_3px_0_0_#000] shrink-0 overflow-hidden relative bg-gray-200"
                      >
                        <img
                          src={pres.img}
                          alt={pres.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <h4 className="text-lg font-extrabold font-outfit text-black leading-tight">
                          {pres.name}
                        </h4>
                        <span className="text-[10px] font-bold font-inter bg-[#0A0A0A] text-[#FFD400] px-2 py-0.5 border-2 border-black rounded inline-block mt-2 rotate-1">
                          {pres.years}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bullet Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF6B00] border-4 border-black shadow-[2px_2px_0_0_#000] z-20 flex items-center justify-center my-4 md:my-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Space filler for layout balance on md+ screens */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
