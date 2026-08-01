'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Send, Upload, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StorySubmission() {
  const { language, calmMode, dictionary } = useGlobalState();
  const [formData, setFormData] = useState({ name: '', email: '', state: '', title: '', story: '' });
  const [status, setStatus] = useState<'idle' | 'folding' | 'flying' | 'success'>('idle');

  const t = (key: string) => {
    return dictionary[key]?.[language] || key;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.story) {
      alert("Please fill in Name, Email, and your Story!");
      return;
    }

    if (calmMode) {
      setStatus('success');
      triggerConfetti();
      return;
    }

    // Interactive Paper Airplane Folding Sequence
    setStatus('folding');
    setTimeout(() => {
      setStatus('flying');
      setTimeout(() => {
        setStatus('success');
        triggerConfetti();
      }, 1000);
    }, 1500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FFD400', '#FF6B00', '#FFFFFF', '#4CAF50']
    });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', state: '', title: '', story: '' });
    setStatus('idle');
  };

  // Nigeria States list
  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
  ];

  return (
    <section id="submission-section" className="relative py-24 px-6 md:px-12 border-b-8 border-black bg-gradient-to-b from-[#0A0A0A] to-[#1A0D33] text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FFD400_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD400] text-sm font-extrabold uppercase tracking-wider block mb-2">
            ✦ Official World Record Submission ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight text-white inline-block border-b-4 border-[#FFD400] pb-2">
            Submit Your Story
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto font-bold text-sm">
            Be credited in official Guinness World Record history. Share your lore, memory, or cultural tale to help us reach 20,000 animated stories!
          </p>
        </div>

        {/* Interactive Origami Submission Box */}
        <div className="relative flex justify-center items-center min-h-[450px]">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white text-black p-8 border-4 border-black rounded shadow-[8px_8px_0_0_#000] space-y-6 relative"
                style={{
                  backgroundImage: "url('/assets/paper_texture.jpg')",
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'overlay',
                }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Certificate Gold Ribbon Banner */}
                <div className="bg-[#001D3D] text-[#FFD400] p-3 -mx-8 -mt-8 mb-6 border-b-4 border-black flex justify-between items-center px-8">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-white">🏆 Official Entry Sheet</span>
                    <span className="bg-[#FF6B00] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                      Sequence #14,206
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden sm:inline">
                    Target: 20,000 Stories
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-black rounded font-semibold text-sm focus-hand-drawn"
                      placeholder="e.g. Tunde Alao"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-black rounded font-semibold text-sm focus-hand-drawn"
                      placeholder="e.g. tunde@mail.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* State selection */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-700 mb-2">Origin State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-black rounded font-bold text-sm bg-white focus-hand-drawn"
                    >
                      <option value="">Select State</option>
                      {states.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {/* Story Title */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-700 mb-2">Story Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-black rounded font-semibold text-sm focus-hand-drawn"
                      placeholder="e.g. The Day the Drums Sang"
                    />
                  </div>
                </div>

                {/* Story text */}
                <div>
                  <label className="block text-xs font-black uppercase text-gray-700 mb-2">Your Story *</label>
                  <textarea
                    name="story"
                    required
                    rows={4}
                    value={formData.story}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-black rounded font-semibold text-sm focus-hand-drawn"
                    placeholder="Tell us about a local legend, a childhood memory, a cultural custom, or street life..."
                  />
                </div>

                {/* Upload placeholder */}
                <div className="border-4 border-dashed border-gray-400 p-4 rounded text-center flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-500 mb-2" />
                  <span className="text-xs font-bold text-gray-600">Drag & Drop Images (Optional)</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-3d btn-3d-orange w-full flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  {t('ctaSubmit')}
                </button>
              </motion.form>
            )}

            {status === 'folding' && (
              <motion.div
                key="folding"
                className="flex flex-col items-center justify-center text-center p-8 bg-white text-black border-4 border-black rounded shadow-[6px_6px_0_0_#000] w-96 h-96 relative"
                style={{
                  backgroundImage: "url('/assets/paper_texture.jpg')",
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'overlay',
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                {/* Simulated Origami folding folding animations */}
                <motion.div
                  className="w-32 h-32 bg-yellow-400 border-4 border-black shadow-[3px_3px_0_0_#000]"
                  animate={{
                    rotateY: [0, 180, 360],
                    rotateX: [0, 90, 0],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <h4 className="text-lg font-black font-outfit uppercase mt-6">Folding Envelope...</h4>
                <p className="text-xs text-gray-500 font-semibold mt-1">Stitching your characters into paper wings!</p>
              </motion.div>
            )}

            {status === 'flying' && (
              <motion.div
                key="flying"
                className="fixed z-50 flex items-center justify-center pointer-events-none"
                initial={{ x: -200, y: 200, scale: 1.2, rotate: 0 }}
                animate={{ x: 800, y: -600, scale: 0.1, rotate: 45 }}
                transition={{ duration: 1.0, ease: 'easeIn' }}
              >
                {/* Paper Airplane SVG */}
                <svg viewBox="0 0 64 64" className="w-24 h-24 drop-shadow-[4px_10px_6px_rgba(0,0,0,0.4)]">
                  <polygon points="2,32 60,8 36,44" fill="#FFD400" stroke="#000" strokeWidth="3" />
                  <polygon points="36,44 60,8 52,60" fill="#FF6B00" stroke="#000" strokeWidth="3" />
                  <polygon points="36,44 52,60 2,32" fill="#FFE14D" stroke="#000" strokeWidth="3" />
                  <line x1="36" y1="44" x2="60" y2="8" stroke="#000" strokeWidth="2.5" />
                </svg>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                key="success"
                className="w-full max-w-md bg-white text-black p-8 border-4 border-black rounded shadow-[8px_8px_0_0_#000] text-center"
                style={{
                  backgroundImage: "url('/assets/paper_texture.jpg')",
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'overlay',
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-green-100 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[2px_2px_0_0_#000]">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-2xl font-black font-outfit uppercase mb-2">Story Lodged!</h3>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-6">
                  Thank you for contributing! Your characters have folded into the digital river. You will receive an email notice when our animators review your draft.
                </p>

                <button
                  onClick={resetForm}
                  className="btn-3d btn-3d-yellow w-full text-xs"
                >
                  Submit Another Story
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
