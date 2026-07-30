'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pidgin' | 'yo' | 'ig' | 'ha';

interface GlobalStateContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  calmMode: boolean;
  setCalmMode: (mode: boolean) => void;
  soundActive: boolean;
  setSoundActive: (active: boolean) => void;
  volumeStreet: number;
  setVolumeStreet: (v: number) => void;
  volumeDrum: number;
  setVolumeDrum: (v: number) => void;
  volumeMusic: number;
  setVolumeMusic: (v: number) => void;
  passportStamps: string[];
  addPassportStamp: (stateName: string) => void;
  dictionary: Record<string, Record<Language, string>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

const translations = {
  heroTitle: {
    en: "THE NIGERIA STORY",
    pidgin: "THE NAIJA STORY",
    yo: "ÌTÀN NÀÌJÍRÍÀ",
    ig: "AKỤKỌ NIGERIA",
    ha: "TARIHIN NAJERIYA",
  },
  heroSubtitle: {
    en: "Every Nigerian has a story worth animating.",
    pidgin: "Every Naija person get story key to animate.",
    yo: "Gbogbo ọmọ Nàìjíríà ní ìtàn tó yẹ láti yàwòrán.",
    ig: "Onye ọ bụla nwere akụkọ kwesịrị ka e sere ya.",
    ha: "Kowane ɗan Najeriya yana da tarihin da ya kamata a nuna a hoto.",
  },
  ctaSubmit: {
    en: "Submit Your Story",
    pidgin: "Tell Us Your Gist",
    yo: "Fi Ìtàn Rẹ Sán",
    ig: "Ziga Akụkọ Gị",
    ha: "Aika da Labarinka",
  },
  ctaLearn: {
    en: "Learn Animation",
    pidgin: "Learn to Draw",
    yo: "Kọ́ Ìyàwòrán",
    ig: "Mụọ Ihe Ọhụrụ",
    ha: "Koyi Zana Hoto",
  },
  mixerTitle: {
    en: "Lagos Street Radio",
    pidgin: "Lagos Street Radio",
    yo: "Rádíò Òpópónà Èkó",
    ig: "Redio Lagos",
    ha: "Rediyon Titin Legas",
  },
  calmModeLabel: {
    en: "Calm Mode",
    pidgin: "Soft Work Mode",
    yo: "Ìpele Rọrùn",
    ig: "Nwayọ Ọrụ",
    ha: "Yanayin Kwanciyar Hankali",
  },
  soundOn: {
    en: "Sound On",
    pidgin: "Sound Dey",
    yo: "Ohùn Títa",
    ig: "Ihe Ọma",
    ha: "Sauti Kunna",
  },
  soundOff: {
    en: "Muted",
    pidgin: "Quiet",
    yo: "Dakẹ́",
    ig: "Nwayọ",
    ha: "Sauti Kashe",
  }
};

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [calmMode, setCalmMode] = useState<boolean>(false);
  const [soundActive, setSoundActive] = useState<boolean>(false);
  const [volumeStreet, setVolumeStreet] = useState<number>(0.3);
  const [volumeDrum, setVolumeDrum] = useState<number>(0.4);
  const [volumeMusic, setVolumeMusic] = useState<number>(0.2);
  const [passportStamps, setPassportStamps] = useState<string[]>([]);

  // Sound mixer state control
  useEffect(() => {
    // If soundActive is false, we don't play any sounds.
    // Audio contexts will be handled in separate components using hooks or state.
  }, [soundActive]);

  const addPassportStamp = (stateName: string) => {
    if (!passportStamps.includes(stateName)) {
      setPassportStamps((prev) => [...prev, stateName]);
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        language,
        setLanguage,
        calmMode,
        setCalmMode,
        soundActive,
        setSoundActive,
        volumeStreet,
        setVolumeStreet,
        volumeDrum,
        setVolumeDrum,
        volumeMusic,
        setVolumeMusic,
        passportStamps,
        addPassportStamp,
        dictionary: translations,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
