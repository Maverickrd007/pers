import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

// Subcomponent for the auto-animating sentences in Exhibit IV
function AnimatedExhibitText({ active }) {
  const sentences = [
    'You mattered.',
    'You still do, Manya.',
    'More than you probably know.',
  ];

  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    if (!active) {
      setVisibleIndex(-1);
      return;
    }

    // Set first line
    setVisibleIndex(0);

    const interval = setInterval(() => {
      setVisibleIndex((prev) => {
        if (prev < sentences.length - 1) {
          return prev + 1;
        }
        return prev; // stay at last
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[120px]">
      {sentences.map((sentence, idx) => (
        <motion.p
          key={idx}
          className="text-lg md:text-2xl font-serif-cormorant font-light text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: idx <= visibleIndex ? 1 : 0,
            y: idx <= visibleIndex ? 0 : 10,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {sentence}
        </motion.p>
      ))}
    </div>
  );
}

export default function MuseumSection() {
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const exhibits = [
    {
      id: 'exhibit-1',
      roman: 'Exhibit I',
      title: 'The First Time You Felt Different',
      date: 'Circa 2026',
      medium: 'Unconscious Realization',
      content: (
        <div className="space-y-4 font-serif-cormorant text-lg md:text-xl text-center leading-relaxed">
          <p>Somewhere between laughing about nothing</p>
          <p>and talking about everything,</p>
          <p className="italic text-[#f4f3ec]/80">I realized</p>
          <p>you weren't becoming important.</p>
          <p className="text-xl md:text-2xl font-medium tracking-wide">You already were, Manya.</p>
        </div>
      ),
    },
    {
      id: 'exhibit-2',
      roman: 'Exhibit II',
      title: 'Comfortable Silence',
      date: 'Infinite Archive',
      medium: 'Shared Presence',
      content: (
        <div className="space-y-4 font-serif-cormorant text-lg md:text-xl text-center leading-relaxed">
          <p>The best moments</p>
          <p>weren't always exciting.</p>
          <p>Sometimes</p>
          <p className="italic text-[#f4f3ec]/70">they were simply being there,</p>
          <p>sitting in silence next to you.</p>
        </div>
      ),
    },
    {
      id: 'exhibit-3',
      roman: 'Exhibit III',
      title: 'Your Laugh',
      date: 'Permanent Record',
      medium: 'Acoustic Memory',
      content: (
        <div className="space-y-4 font-serif-cormorant text-lg md:text-xl text-center leading-relaxed">
          <p className="text-2xl md:text-3xl font-light italic">Permanently archived.</p>
          <p>Some sounds never really leave,</p>
          <p className="text-xl md:text-2xl font-semibold tracking-wider text-glow">Manya.</p>
        </div>
      ),
    },
    {
      id: 'exhibit-4',
      roman: 'Exhibit IV',
      title: 'The Things I Never Said',
      date: 'Late Night Thoughts',
      medium: 'Unsent Letters',
      content: null, // Renders AnimatedExhibitText instead
      isAnimated: true,
    },
  ];

  return (
    <section className="relative w-full min-h-screen py-24 select-none flex flex-col justify-center overflow-hidden z-10">
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h2
            className="text-sm tracking-[0.3em] uppercase text-[#f4f3ec]/40 font-sans-inter mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Section II
          </motion.h2>
          <motion.h3
            className="text-4xl md:text-5xl font-serif-cormorant font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            The Museum Gallery
          </motion.h3>
        </div>
        <motion.div
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f4f3ec]/40 font-sans-inter"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span>Scroll horizontally</span>
          <ArrowRight className="w-3 h-3 animate-pulse" />
        </motion.div>
      </div>

      {/* Horizontal Gallery Wrapper */}
      <div className="w-full overflow-x-auto flex gap-6 px-6 md:px-12 lg:px-24 pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
        {exhibits.map((exhibit, index) => (
          <motion.div
            key={exhibit.id}
            onClick={() => setSelectedExhibit(exhibit)}
            className="flex-shrink-0 w-[280px] md:w-[350px] aspect-[3/4] snap-start glass rounded-2xl p-6 md:p-8 flex flex-col justify-between cursor-pointer border border-[#f4f3ec]/5 hover:border-[#f4f3ec]/20 hover:bg-[#f4f3ec]/5 transition-all duration-500 group relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
          >
            {/* Elegant Corner Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#f4f3ec]/10 group-hover:border-[#f4f3ec]/40 transition-colors duration-300" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#f4f3ec]/10 group-hover:border-[#f4f3ec]/40 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#f4f3ec]/10 group-hover:border-[#f4f3ec]/40 transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#f4f3ec]/10 group-hover:border-[#f4f3ec]/40 transition-colors duration-300" />

            {/* Exhibit Number */}
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#f4f3ec]/30 font-sans-inter">
              {exhibit.roman}
            </span>

            {/* Title / Preview text */}
            <div className="flex-grow flex flex-col justify-center items-center py-4 px-2">
              <h4 className="text-lg md:text-xl font-serif-cormorant font-light text-center group-hover:text-glow transition-all duration-300">
                {exhibit.title}
              </h4>
              <span className="text-[9px] uppercase tracking-widest text-[#f4f3ec]/20 mt-4 group-hover:text-[#f4f3ec]/40 transition-all duration-300">
                Click to inspect
              </span>
            </div>

            {/* Brass Plate Label */}
            <div className="border-t border-[#f4f3ec]/10 pt-4 flex flex-col items-center gap-1">
              <span className="text-[9px] uppercase tracking-widest text-[#f4f3ec]/50 font-sans-inter">
                {exhibit.medium}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#f4f3ec]/30 font-sans-inter font-light">
                {exhibit.date}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cinematic Modal Enlargement */}
      <AnimatePresence>
        {selectedExhibit && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with heavy blur */}
            <div
              className="absolute inset-0 bg-[#050816]/90 backdrop-blur-lg cursor-pointer"
              onClick={() => setSelectedExhibit(null)}
            />

            {/* Cinematic Frame */}
            <motion.div
              className="relative w-full max-w-2xl bg-[#090d22] border-2 border-[#f4f3ec]/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden p-8 md:p-16 z-10 flex flex-col justify-between min-h-[450px]"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            >
              {/* Outer Frame Accent lines */}
              <div className="absolute inset-4 border border-[#f4f3ec]/5 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedExhibit(null)}
                className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#f4f3ec]/60 hover:text-[#f4f3ec] transition-all duration-200 cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Exhibit Info */}
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-[0.3em] text-[#f4f3ec]/30 font-sans-inter font-semibold block mb-2">
                  {selectedExhibit.roman}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif-cormorant font-light text-glow text-[#f4f3ec]">
                  {selectedExhibit.title}
                </h3>
              </div>

              {/* Exhibit Content (Cinematic Presentation) */}
              <div className="flex-grow flex items-center justify-center py-8">
                {selectedExhibit.isAnimated ? (
                  <AnimatedExhibitText active={!!selectedExhibit} />
                ) : (
                  selectedExhibit.content
                )}
              </div>

              {/* Museum Brass Label Detail */}
              <div className="mt-8 border-t border-[#f4f3ec]/10 pt-6 flex flex-col items-center gap-1">
                <div className="px-6 py-2 bg-gradient-to-r from-yellow-950/20 via-yellow-900/10 to-yellow-950/20 border border-yellow-800/20 rounded shadow-inner text-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-600 font-sans-inter font-medium block">
                    {selectedExhibit.medium}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#f4f3ec]/40 font-sans-inter">
                    {selectedExhibit.date}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
