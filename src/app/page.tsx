'use client';

import React, { useEffect, useState } from 'react';
import OpeningCurtain from '@/components/OpeningCurtain';
import CustomCursor from '@/components/CustomCursor';
import AudioMixer from '@/components/AudioMixer';
import HeroSection from '@/components/HeroSection';
import ForgottenHistoryBook from '@/components/ForgottenHistoryBook';
import EveryNigerianStory from '@/components/EveryNigerianStory';
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
  // 0% to 25% height is Midday, 25% to 60% is Dusk, 60%+ is Night
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

  // List of greeting/languages labels for the wristband switcher
  const languagesList: { code: 'en' | 'pidgin' | 'yo' | 'ig' | 'ha'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'pidgin', label: 'Pidgin' },
    { code: 'yo', label: 'Yoruba' },
    { code: 'ig', label: 'Igbo' },
    { code: 'ha', label: 'Hausa' }
  ];

  return (
    <main className={`relative min-h-screen ${currentThemeBg} font-outfit`}>
      {/* 1. SENSORY / INTRO OVERLAYS */}
      <OpeningCurtain />
      <CustomCursor />
      <AudioMixer />

      {/* 2. FLOATING CONTROL NAVIGATION DASHBOARD */}
      <header className="fixed top-4 left-4 right-4 z-[990] flex justify-end sm:justify-between items-center pointer-events-none select-none">
        
        {/* Left Side: Live Pulse Odometer Widget */}
        <div className="pointer-events-auto bg-white text-black border-4 border-black px-4 py-2 rounded shadow-[4px_4px_0_0_#000] flex items-center gap-3 hidden sm:flex"
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
          <div className="font-bold text-[11px] tracking-wider uppercase">
            <span className="text-gray-500 mr-1.5 font-extrabold">Pulse of Nigeria:</span>
            <span className="font-black text-[#FF6B00]">
              {pulseCount.toLocaleString()}
            </span>
            <span className="text-gray-400 ml-1">Stories Joined</span>
          </div>
          {passportStamps.length > 0 && (
            <div className="border-l border-black/10 pl-2 text-[9px] font-black text-blue-600">
              ✈️ Passport Stamps: {passportStamps.length}/6
            </div>
          )}
        </div>

        {/* Right Side: Language & Calm Mode Switches */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Language Switch (Woven Fabric slider styled switches) */}
          <div className="bg-white border-4 border-black p-1.5 rounded shadow-[4px_4px_0_0_#000] flex gap-1 items-center"
               style={{
                 backgroundImage: "url('/assets/paper_texture.jpg')",
                 backgroundSize: 'cover',
                 backgroundBlendMode: 'overlay',
               }}
          >
            <Globe className="w-4 h-4 text-black mr-1.5" />
            <div className="flex gap-1">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-[9px] font-black uppercase px-2 py-1 rounded transition-all focus-hand-drawn ${
                    language === lang.code
                      ? 'bg-[#FFD400] text-black border-2 border-black shadow-[2px_2px_0_0_#000]'
                      : 'text-gray-600 hover:text-black bg-transparent border-2 border-transparent'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calm Mode Toggle (Reduces sensory motions) */}
          <button
            onClick={() => setCalmMode(!calmMode)}
            className={`btn-3d ${calmMode ? 'btn-3d-orange' : 'btn-3d-yellow'} !p-2 !rounded-full !border-4`}
            title={t('calmModeLabel')}
          >
            {calmMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 3. WEBSITE CONTENT SCROLL STAGE */}
      <div className="relative z-10">
        <HeroSection />
        <ForgottenHistoryBook />
        <EveryNigerianStory />
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
