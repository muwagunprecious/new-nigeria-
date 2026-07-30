'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sliders, Radio } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';

export default function AudioMixer() {
  const {
    soundActive,
    setSoundActive,
    volumeStreet,
    setVolumeStreet,
    volumeDrum,
    setVolumeDrum,
    volumeMusic,
    setVolumeMusic,
    language,
    dictionary
  } = useGlobalState();

  const [isOpen, setIsOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const gainStreetRef = useRef<GainNode | null>(null);
  const gainDrumRef = useRef<GainNode | null>(null);
  const gainMusicRef = useRef<GainNode | null>(null);

  // Initialize Audio Nodes
  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Create separate gain nodes for blending
      gainStreetRef.current = ctx.createGain();
      gainDrumRef.current = ctx.createGain();
      gainMusicRef.current = ctx.createGain();

      gainStreetRef.current.connect(ctx.destination);
      gainDrumRef.current.connect(ctx.destination);
      gainMusicRef.current.connect(ctx.destination);

      // Set initial volumes
      gainStreetRef.current.gain.value = volumeStreet;
      gainDrumRef.current.gain.value = volumeDrum;
      gainMusicRef.current.gain.value = volumeMusic;
    } catch (e) {
      console.error("Failed to initialize AudioContext", e);
    }
  };

  // Sync volumes when they change in state
  useEffect(() => {
    if (gainStreetRef.current) gainStreetRef.current.gain.value = volumeStreet;
  }, [volumeStreet]);

  useEffect(() => {
    if (gainDrumRef.current) gainDrumRef.current.gain.value = volumeDrum;
  }, [volumeDrum]);

  useEffect(() => {
    if (gainMusicRef.current) gainMusicRef.current.gain.value = volumeMusic;
  }, [volumeMusic]);

  // Synthesis Loop (120 BPM)
  useEffect(() => {
    if (soundActive) {
      initAudio();
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      startSynthLoop();
    } else {
      stopSynthLoop();
    }

    return () => stopSynthLoop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundActive]);

  const startSynthLoop = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    let step = 0;
    const tempo = 130; // BPM
    const stepDuration = 60 / tempo / 2; // 8th notes

    // Keep track of scheduling
    let nextNoteTime = ctx.currentTime;

    const scheduler = () => {
      while (nextNoteTime < ctx.currentTime + 0.1) {
        scheduleStep(step, nextNoteTime);
        nextNoteTime += stepDuration;
        step = (step + 1) % 16;
      }
    };

    // Run interval
    const timerId = window.setInterval(scheduler, 25);
    synthIntervalRef.current = timerId;
  };

  const stopSynthLoop = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Synthesize instruments dynamically
  const scheduleStep = (step: number, time: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // 1. MUSIC LAYER: Simple Afrobeat chord loop (Chords: Amin, Gmaj)
    if (volumeMusic > 0 && gainMusicRef.current) {
      if (step % 8 === 0) {
        // Play chord
        const notes = step === 0 ? [220, 261.63, 329.63] : [196, 246.94, 293.66]; // A minor vs G major
        notes.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);

          // LPF for warm sound
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(400, time);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(gainMusicRef.current!);

          gain.gain.setValueAtTime(0.06, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

          osc.start(time);
          osc.stop(time + 1.3);
        });
      }
      // Simple bass line
      if (step % 4 === 0) {
        const bassFreq = step === 0 || step === 4 ? 110 : 98; // A vs G
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(bassFreq, time);

        osc.connect(gain);
        gain.connect(gainMusicRef.current!);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

        osc.start(time);
        osc.stop(time + 0.35);
      }
    }

    // 2. DRUM LAYER: Synthesize Talking Drum and Kick
    if (volumeDrum > 0 && gainDrumRef.current) {
      // Kick Drum on 1, 5, 9, 13
      if (step % 4 === 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(45, time + 0.1);

        osc.connect(gain);
        gain.connect(gainDrumRef.current!);

        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

        osc.start(time);
        osc.stop(time + 0.2);
      }

      // Talking Drum syncopated strikes (pitch sweeps)
      if (step === 2 || step === 5 || step === 7 || step === 10 || step === 14) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';

        const startFreq = step === 2 || step === 10 ? 180 : 250;
        const endFreq = step === 2 || step === 10 ? 300 : 150; // Sweeping up or down

        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.12);

        osc.connect(gain);
        gain.connect(gainDrumRef.current!);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

        osc.start(time);
        osc.stop(time + 0.2);
      }
    }

    // 3. STREET LAYER: Honks and ambient chatter (synthesized via noise and sweeps)
    if (volumeStreet > 0 && gainStreetRef.current) {
      // Occasional Danfo Honking
      if (step === 3 && Math.random() > 0.5) {
        // Dual detuned oscillators for car horn sound
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(440, time);
        osc2.frequency.setValueAtTime(443, time); // detuned

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(1000, time);

        osc1.connect(bandpass);
        osc2.connect(bandpass);
        bandpass.connect(gain);
        gain.connect(gainStreetRef.current!);

        gain.gain.setValueAtTime(0.04, time);
        gain.gain.setValueAtTime(0.04, time + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + 0.15);
        osc2.stop(time + 0.15);
      }

      // Conductor shouting "Yaba! Oyingbo!" (Synthesized noise sweep)
      if (step === 11 && Math.random() > 0.6) {
        // Generate noise buffer
        const bufferSize = ctx.sampleRate * 0.25; // 0.25 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, time);
        filter.frequency.linearRampToValueAtTime(1400, time + 0.2); // sweep frequency

        const gainNode = ctx.createGain();
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(gainStreetRef.current!);

        gainNode.gain.setValueAtTime(0.08, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

        noise.start(time);
        noise.stop(time + 0.25);
      }
    }
  };

  const t = (key: string) => {
    return dictionary[key]?.[language] || key;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
      {/* Expanded Mixer Dial */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-3 w-64 bg-white text-black p-4 border-4 border-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              backgroundImage: `url('/assets/paper_texture.jpg')`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'overlay',
            }}
          >
            {/* Transistor radio layout */}
            <div className="flex items-center gap-2 pb-2 mb-3 border-b-2 border-black">
              <Radio className="w-5 h-5 text-red-600 animate-pulse" />
              <span className="font-extrabold font-outfit text-sm tracking-wider text-black">
                {t('mixerTitle')}
              </span>
            </div>

            {/* Mixer Sliders */}
            <div className="space-y-4 font-outfit text-xs font-semibold">
              {/* Street slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <span>🔊 Lagos Ambience (Street)</span>
                  <span>{Math.round(volumeStreet * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volumeStreet}
                  onChange={(e) => setVolumeStreet(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                />
              </div>

              {/* Drums slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <span>🥁 Talking Drums</span>
                  <span>{Math.round(volumeDrum * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volumeDrum}
                  onChange={(e) => setVolumeDrum(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-[#FFD400]"
                />
              </div>

              {/* Music slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <span>🎵 Soft Afrobeat Synth</span>
                  <span>{Math.round(volumeMusic * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volumeMusic}
                  onChange={(e) => setVolumeMusic(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex gap-2">
        {/* Toggle Slider Mixer Settings */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white text-black border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all focus-hand-drawn"
          title="Mixer Settings"
        >
          <Sliders className="w-5 h-5" />
        </button>

        {/* Master Sound Switch */}
        <button
          onClick={() => {
            if (!soundActive) initAudio();
            setSoundActive(!soundActive);
          }}
          className={`btn-3d ${soundActive ? 'btn-3d-orange' : 'btn-3d-yellow'} !p-3 !rounded-full !border-4`}
          title={soundActive ? t('soundOn') : t('soundOff')}
        >
          {soundActive ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
