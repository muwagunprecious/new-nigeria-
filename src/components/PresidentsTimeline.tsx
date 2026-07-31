'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Volume2, VolumeX, HelpCircle, Award, Calendar, FileText } from 'lucide-react';

interface President {
  name: string;
  years: string;
  img: string;
  achievements: string[];
  context: string;
  bio: string;
}

const presidents: President[] = [
  {
    name: "Tafawa Balewa",
    years: "1960 - 1966",
    img: "/assets/president_balewa.jpg",
    achievements: [
      "First Prime Minister of independent Nigeria",
      "Advocated for African unity & helped form the OAU (now AU)",
      "Championed the development of the Lagos ports and infrastructure"
    ],
    context: "Guided the nation through the delicate initial years of post-independence sovereignty, balancing regional interests.",
    bio: "Sir Abubakar Tafawa Balewa, the Golden Voice of Africa, served as Nigeria's first Prime Minister, steering the country through early post-independence consolidation."
  },
  {
    name: "Johnson Aguiyi-Ironsi",
    years: "1966",
    img: "/assets/president_ironsi.jpg",
    achievements: [
      "First military Head of State of Nigeria",
      "Introduced the Unification Decree 34 to centralize governance",
      "Promoted internal discipline within the Armed Forces"
    ],
    context: "Assumed power during a turbulent period of political realignment, attempting to stabilize national unity.",
    bio: "Major General Johnson Aguiyi-Ironsi introduced centralized governance during a critical period of national reorganization."
  },
  {
    name: "Yakubu Gowon",
    years: "1966 - 1975",
    img: "/assets/president_gowon.jpg",
    achievements: [
      "Preserved Nigerian sovereignty through the civil war",
      "Created the National Youth Service Corps (NYSC) for unity",
      "Pioneered the creation of 12 states to decentralize federal power"
    ],
    context: "Sought national reconciliation under the motto 'No Victor, No Vanquished' following the civil war.",
    bio: "General Yakubu Gowon preserved national sovereignty and launched the National Youth Service Corps to foster integration."
  },
  {
    name: "Murtala Muhammed",
    years: "1975 - 1976",
    img: "/assets/president_murtala.jpg",
    achievements: [
      "Initiated plans to move the Federal Capital to Abuja",
      "Launched massive anti-corruption campaigns in public service",
      "Created 7 new states to address regional representation"
    ],
    context: "Drove dynamic, nationalist reforms that energized public administration and foreign policy.",
    bio: "General Murtala Muhammed introduced rigorous reforms and initiated the historic relocation of the federal capital to Abuja."
  },
  {
    name: "Olusegun Obasanjo",
    years: "1976 - 1979",
    img: "/assets/president_obasanjo.jpg",
    achievements: [
      "Supervised the transition to democratic civilian rule in 1979",
      "Launched the 'Operation Feed the Nation' agricultural program",
      "Pioneered local content directives in heavy industries"
    ],
    context: "Maintained political stability, leading to the successful establishment of the Second Republic.",
    bio: "General Olusegun Obasanjo supervised a historic peaceful transition to democratic civilian governance in nineteen seventy-nine."
  },
  {
    name: "Shehu Shagari",
    years: "1979 - 1983",
    img: "/assets/president_shagari.jpg",
    achievements: [
      "First democratically elected executive President of Nigeria",
      "Launched the Green Revolution agricultural development scheme",
      "Executed massive low-cost housing schemes across all states"
    ],
    context: "Presided over the democratic Second Republic during a period of global oil price fluctuations.",
    bio: "Alhaji Shehu Shagari was the first democratically elected executive President, prioritizing agriculture and public housing."
  },
  {
    name: "Muhammadu Buhari",
    years: "1983 - 1985",
    img: "/assets/president_buhari.jpg",
    achievements: [
      "Launched the War Against Indiscipline (WAI) campaign",
      "Prioritized domestic currency stabilization and debt reforms",
      "Initiated clean-up operations in administrative offices"
    ],
    context: "Focused on institutional discipline and combating fiscal mismanagement.",
    bio: "Major General Muhammadu Buhari launched the War Against Indiscipline campaign to restore order and combat corruption."
  },
  {
    name: "Ibrahim Babangida",
    years: "1985 - 1993",
    img: "/assets/president_babangida.jpg",
    achievements: [
      "Established the Federal Road Safety Corps (FRSC)",
      "Pioneered the Structural Adjustment Program (SAP) for market economy",
      "Built the Third Mainland Bridge in Lagos (then Africa's longest)"
    ],
    context: "Navigated transition politics and structural economic shifts while building massive infrastructural assets.",
    bio: "General Ibrahim Babangida built the Third Mainland Bridge and introduced financial reforms to encourage trade."
  },
  {
    name: "Ernest Shonekan",
    years: "1993",
    img: "/assets/president_shonekan.jpg",
    achievements: [
      "Headed the Interim National Government",
      "Advocated for debt relief from international financial bodies",
      "Sought political reconciliation among opposing factions"
    ],
    context: "Led a brief interim government aiming to steer the nation toward political stability.",
    bio: "Chief Ernest Shonekan headed the Interim National Government, advocating for international trade reconciliation."
  },
  {
    name: "Sani Abacha",
    years: "1993 - 1998",
    img: "/assets/president_abacha.jpg",
    achievements: [
      "Stabilized exchange rates and boosted external reserves",
      "Established the Petroleum Trust Fund (PTF) for infrastructure development",
      "Increased oil production capacities nationwide"
    ],
    context: "Governed with absolute authority during a period of high economic stabilization and external isolation.",
    bio: "General Sani Abacha stabilized exchange rates and founded the Petroleum Trust Fund to construct schools and roads."
  },
  {
    name: "Bola Ahmed Tinubu",
    years: "2023 - Present",
    img: "/assets/president_tinubu.png",
    achievements: [
      "Initiated critical fuel subsidy and monetary reforms",
      "Pioneered the student loan scheme for tertiary education support",
      "Created the Ministry of Marine and Blue Economy"
    ],
    context: "Governing through global economic realignments, steering structural changes to promote long-term fiscal health.",
    bio: "President Bola Ahmed Tinubu has launched major economic realignments and student welfare reforms to build a new Nigeria."
  }
];

export default function PresidentsTimeline() {
  const { calmMode, soundActive } = useGlobalState();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [isNarrating, setIsNarrating] = useState<number | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speakBio = (text: string, index: number) => {
    if (!soundActive || !synthRef.current) return;
    stopSpeech();

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = 0.95;
    utteranceRef.current.onstart = () => setIsNarrating(index);
    utteranceRef.current.onend = () => setIsNarrating(null);
    utteranceRef.current.onerror = () => setIsNarrating(null);

    synthRef.current.speak(utteranceRef.current);
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsNarrating(null);
    }
  };

  return (
    <section className="relative py-28 px-6 md:px-12 border-b-8 border-black bg-[#080808] overflow-hidden text-white">
      
      {/* 1. BRASS PINNED DID YOU KNOW BADGE */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={() => setShowDidYouKnow(!showDidYouKnow)}
          className="relative bg-[#FFF3D1] text-black border-4 border-black p-3 rounded shadow-[4px_4px_0_0_#000] rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all select-none focus-hand-drawn"
        >
          <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#CD7F32] border-2 border-black shadow-[1px_1px_0_0_rgba(0,0,0,0.5)]" />
          <div className="flex items-center gap-1.5 font-outfit text-xs font-black uppercase tracking-wider mt-1">
            <HelpCircle className="w-4 h-4 text-[#FF6B00]" />
            Did You Know?
          </div>
        </button>

        <AnimatePresence>
          {showDidYouKnow && (
            <motion.div
              className="absolute right-0 mt-3 w-64 bg-white text-black p-4 border-4 border-black rounded shadow-[6px_6px_0_0_#000] z-50 text-xs font-bold leading-relaxed rotate-[-1deg]"
              style={{ backgroundImage: "url('/assets/paper_texture.jpg')", backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
            >
              💡 <span className="text-[#FF6B00]">Did you know?</span> The National Theatre in Iganmu, Lagos, was constructed in 1976 and its architecture was designed to resemble a military officer&apos;s peaked cap.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Leadership Archive ✦
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FF6B00] pb-2">
            Cinematic Timeline
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-semibold">
            A portrait gallery of Nigeria&apos;s leadership. Hover over any poster to read achievements and hear their story.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-black border-l-4 border-dashed border-[#FFD400] z-0" />

          {/* President Nodes */}
          <div className="space-y-24">
            {presidents.map((pres, idx) => {
              const isEven = idx % 2 === 0;
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center justify-between relative z-10 w-full ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    stopSpeech();
                  }}
                >
                  {/* Card Section (Movie Poster Style) */}
                  <div className={`w-full md:w-[45%] flex ${isEven ? 'justify-end' : 'justify-start'}`}>
                    <motion.div
                      className="relative w-full max-w-sm aspect-[2/3] bg-black border-4 border-black rounded shadow-[8px_8px_0_0_#000] overflow-hidden flex flex-col justify-end p-6 cursor-pointer group"
                      initial={calmMode ? {} : { opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: 'spring', damping: 20 }}
                    >
                      {/* Realistic Background Image with Slow Pan Animation */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img
                          src={pres.img}
                          alt={pres.name}
                          className={`w-full h-full object-cover transition-transform duration-[10000ms] ${
                            calmMode ? '' : 'group-hover:scale-110 group-hover:rotate-1'
                          }`}
                        />
                        {/* Shadow vignette gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
                        
                        {/* Waving Flag Overlay (10% opacity) */}
                        {!calmMode && (
                          <div className="absolute inset-0 bg-green-900/10 pointer-events-none mix-blend-overlay animate-pulse" />
                        )}

                        {/* Light Ray Sweep Animation */}
                        {!calmMode && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shimmer" />
                        )}
                        
                        {/* Eyelid Blink Simulation Overlay (closes briefly every 6s) */}
                        {!calmMode && (
                          <div className="absolute inset-0 bg-black/80 pointer-events-none opacity-0 animate-blink" />
                        )}
                      </div>

                      {/* Poster Content Panel */}
                      <div className="relative z-10 space-y-3">
                        <span className="text-[10px] font-black font-inter bg-[#FF6B00] text-white px-2 py-0.5 border-2 border-black rounded inline-block rotate-[-1deg]">
                          {pres.years}
                        </span>
                        <h3 className="text-3xl font-black font-outfit uppercase tracking-tight text-white leading-none drop-shadow-[2px_2px_0_#000]">
                          {pres.name}
                        </h3>

                        {/* Speech Toggle Button inside poster */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isNarrating === idx) {
                              stopSpeech();
                            } else {
                              speakBio(pres.bio, idx);
                            }
                          }}
                          className="p-1.5 bg-[#FFD400] text-black border-2 border-black rounded-full shadow-[2px_2px_0_0_#000] hover:translate-y-[-1px] transition-all flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-wider"
                        >
                          {isNarrating === idx ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                          {isNarrating === idx ? "Stop Voice" : "Play Bio"}
                        </button>
                      </div>

                      {/* HOVER SLIDE-OUT BIOGRAPHY DRAWER */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 z-20 p-6 bg-[#FCF8F2] text-black flex flex-col justify-between"
                            style={{ backgroundImage: "url('/assets/paper_texture.jpg')", backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}
                            initial={{ x: isEven ? '100%' : '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: isEven ? '100%' : '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                          >
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                                <Calendar className="w-4 h-4 text-[#FF6B00]" />
                                <span className="font-black font-outfit text-xs uppercase tracking-wide">
                                  Term of Office: {pres.years}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-gray-500">
                                  <FileText className="w-3.5 h-3.5" />
                                  Historical Context
                                </div>
                                <p className="text-[11px] font-semibold text-gray-700 leading-relaxed">
                                  {pres.context}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#FF6B00]">
                                  <Award className="w-3.5 h-3.5" />
                                  Key Achievements
                                </div>
                                <ul className="text-[11px] font-bold text-gray-800 list-disc list-inside space-y-1">
                                  {pres.achievements.map((ach, aIdx) => (
                                    <li key={aIdx}>{ach}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block text-right mt-4">
                              ✦ The Nigeria Story Leadership Archive ✦
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
