'use client';

import React, { useEffect, useState } from 'react';
import OpeningCurtain from '@/components/OpeningCurtain';
import CustomCursor from '@/components/CustomCursor';
import NarratorBoy from '@/components/NarratorBoy';
import AudioMixer from '@/components/AudioMixer';
import HeroSection from '@/components/HeroSection';
import RecordMission from '@/components/RecordMission';
import HistoryBookSection from '@/components/HistoryBookSection';
import DidYouKnowBadge from '@/components/DidYouKnowBadge';
import CultureSection from '@/components/CultureSection';
import InteractiveMap from '@/components/InteractiveMap';
import PresidentsTimeline from '@/components/PresidentsTimeline';
import LegendsSection from '@/components/LegendsSection';
import GuinnessSection from '@/components/GuinnessSection';
import HowItWorks from '@/components/HowItWorks';
import AnimationSchool from '@/components/AnimationSchool';
import StorySubmission from '@/components/StorySubmission';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Eye, EyeOff, Globe, Sparkles } from 'lucide-react';

export default function Home() {
  const {
    language,
    setLanguage,
    calmMode,
    setCalmMode,
    passportStamps,
    dictionary
  } = useGlobalState();

  const [scrollY, setScrollY] = useState(0);
  const [pulseCount, setPulseCount] = useState(14205);

  // Live Pulse Counter Tick (increment occasionally to feel alive)
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((c) => c + Math.floor(Math.random() * 2) + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position for day-to-night theme calculation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate day-to-night gradient overlay based on scroll position
  const getThemeClass = () => {
    if (typeof window === 'undefined') return 'bg-[#0A0A0A]';
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return 'bg-[#0A0A0A]';
    const ratio = scrollY / totalHeight;

    if (ratio < 0.25) {
      return 'bg-gradient-to-b from-[#FFF3D1] to-[#FFE082] text-black transition-colors duration-1000';
    } else if (ratio < 0.6) {
      return 'bg-gradient-to-b from-[#E65100] to-[#3E2723] text-white transition-colors duration-1000';
    } else {
      return 'bg-gradient-to-b from-[#1A0D33] to-[#0A0A0A] text-white transition-colors duration-1000';
    }
  };

  const currentThemeBg = getThemeClass();

  const t = (key: string) => {
    return dictionary[key]?.[language] || key;
  };

  const languagesList: { code: 'en' | 'pidgin' | 'yo' | 'ig' | 'ha'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'pidgin', label: 'Pidgin' },
    { code: 'yo', label: 'Yoruba' },
    { code: 'ig', label: 'Igbo' },
    { code: 'ha', label: 'Hausa' }
  ];

  const navLinks = [
    { label: '🏆 Record Mission', href: '#record-mission' },
    { label: '📜 History', href: '#history-book-section' },
    { label: '🍲 Culture', href: '#culture-section' },
    { label: '🗺️ Map', href: '#map-section' },
    { label: '🏛️ Leaders', href: '#presidents-section' },
    { label: '✈️ Submit', href: '#submission-section' },
  ];

  return (
    <main className={`relative min-h-screen ${currentThemeBg} font-outfit`}>
      {/* 1. SENSORY / INTRO OVERLAYS */}
      <OpeningCurtain />
      <CustomCursor />
      <NarratorBoy />
      <AudioMixer />

      {/* 2. FLOATING CONTROL NAVIGATION DASHBOARD */}
      <header className="fixed top-3 left-4 right-4 z-[990] flex flex-wrap justify-between items-center pointer-events-none select-none gap-2">
        
        {/* Left Side: Live Pulse Odometer Widget */}
        <div className="pointer-events-auto bg-white text-black border-4 border-black px-3 py-1.5 rounded shadow-[4px_4px_0_0_#000] flex items-center gap-2.5 hidden lg:flex"
             style={{
               backgroundImage: "url('/assets/paper_texture.jpg')",
               backgroundSize: 'cover',
               backgroundBlendMode: 'overlay',
             }}
        >
          <div className="relative w-5 h-5 flex items-center justify-center bg-green-100 border-2 border-black rounded-full">
            <span className="text-[10px] animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <Sparkles className="w-3.5 h-3.5 text-green-700 z-10" />
          </div>
          <div className="font-bold text-[10px] tracking-wider uppercase">
            <span className="text-gray-500 mr-1 font-extrabold">Record Goal:</span>
            <span className="font-black text-[#FF6B00]">
              {pulseCount.toLocaleString()}
            </span>
            <span className="text-gray-500 font-extrabold"> / 20,000</span>
          </div>
          {passportStamps.length > 0 && (
            <div className="border-l border-black/10 pl-2 text-[9px] font-black text-blue-600">
              ✈️ Stamps: {passportStamps.length}/6
            </div>
          )}
        </div>

        {/* Center Navigation Quick Links */}
        <div className="pointer-events-auto bg-black text-white border-4 border-black px-2 py-1 rounded shadow-[4px_4px_0_0_#000] hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[9px] font-black uppercase px-2 py-1 rounded hover:bg-[#FFD400] hover:text-black transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side: Language & Calm Mode Switches */}
        <div className="pointer-events-auto flex items-center gap-2 ml-auto">
          {/* Language Switch */}
          <div className="bg-white border-4 border-black p-1 rounded shadow-[4px_4px_0_0_#000] flex gap-1 items-center"
               style={{
                 backgroundImage: "url('/assets/paper_texture.jpg')",
                 backgroundSize: 'cover',
                 backgroundBlendMode: 'overlay',
               }}
          >
            <Globe className="w-3.5 h-3.5 text-black mr-1 hidden sm:block" />
            <div className="flex gap-0.5">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded transition-all focus-hand-drawn ${
                    language === lang.code
                      ? 'bg-[#FFD400] text-black border border-black shadow-[1px_1px_0_0_#000]'
                      : 'text-gray-600 hover:text-black bg-transparent'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calm Mode Toggle */}
          <button
            onClick={() => setCalmMode(!calmMode)}
            className={`btn-3d ${calmMode ? 'btn-3d-orange' : 'btn-3d-yellow'} !p-1.5 !rounded-full !border-4`}
            title={t('calmModeLabel')}
          >
            {calmMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 3. WEBSITE CONTENT SCROLL STAGE */}
      <div className="relative z-10">
        <HeroSection />
        <RecordMission />
        <HistoryBookSection />
        <CultureSection />
        <InteractiveMap />
        <PresidentsTimeline />
        <LegendsSection />
        <GuinnessSection />
        <HowItWorks />
        <AnimationSchool />
        <StorySubmission />
        <GallerySection />
        <Footer />
      </div>

      {/* Did You Know floating badge */}
      <DidYouKnowBadge />
    </main>
  );
}
