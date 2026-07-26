import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function ConstellationSection({ onCardExplored, exploredCards }) {
  const [activeCardId, setActiveCardId] = useState(null);

  const cardsData = [
    {
      id: 1,
      label: 'Wondering',
      title: 'If you were wondering...',
      content: 'Yeah. I still smile when something reminds me of you, Manya.',
      x: '20%',
      y: '25%',
    },
    {
      id: 2,
      label: 'Caring',
      title: 'Did I stop caring?',
      content: 'Life moved. My heart never really got the memo.',
      x: '75%',
      y: '30%',
    },
    {
      id: 3,
      label: 'Thoughts',
      title: 'Do I still think about you, Manya?',
      content: "More often\nthan I'd probably admit.",
      x: '15%',
      y: '65%',
    },
    {
      id: 4,
      label: 'Memories',
      title: 'Were the memories worth keeping?',
      content: 'Every single one.',
      x: '80%',
      y: '70%',
    },
    {
      id: 5,
      label: 'Presence',
      title: 'Some people become memories.',
      content: 'You became part of who I am, Manya.',
      x: '45%',
      y: '15%',
    },
    {
      id: 6,
      label: 'Gratitude',
      title: 'This isn\'t nostalgia.',
      content: 'It\'s gratitude...\nfor having known someone like you.',
      x: '55%',
      y: '80%',
    },
  ];

  const hiddenCard = {
    id: 7,
    label: 'The Unsaid',
    title: 'A whisper in the dark...',
    content: 'Thank you for leaving a part of yourself in my life, Manya.',
    x: '50%',
    y: '48%',
  };

  const isAllStandardExplored = cardsData.every((card) => exploredCards.includes(card.id));

  const handleStarClick = (id) => {
    setActiveCardId(id);
    onCardExplored(id);
  };

  const activeCard = activeCardId === 7 ? hiddenCard : cardsData.find((c) => c.id === activeCardId);

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center px-6 select-none z-10">
      {/* Title */}
      <div className="text-center mb-16 max-w-xl">
        <motion.h2
          className="text-sm tracking-[0.3em] uppercase text-[#f4f3ec]/40 font-sans-inter mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Section I
        </motion.h2>
        <motion.h3
          className="text-4xl md:text-5xl font-serif-cormorant font-light mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          If You Were Wondering...
        </motion.h3>
        <motion.p
          className="text-sm text-[#f4f3ec]/50 font-sans-inter"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Touch the stars to read what went unsaid.
        </motion.p>
      </div>

      {/* Interactive Constellation Map */}
      <div className="relative w-full max-w-4xl h-[500px] md:h-[600px] rounded-3xl bg-radial-gradient(circle,rgba(255,255,255,0.01)_0%,rgba(0,0,0,0)_100%)">
        {/* Draw Constellation SVG lines behind stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#f4f3ec]/10">
          {/* Static design lines connecting floating nodes */}
          <line x1="20%" y1="25%" x2="45%" y2="15%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="45%" y1="15%" x2="75%" y2="30%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="75%" y1="30%" x2="80%" y2="70%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="80%" y1="70%" x2="55%" y2="80%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="55%" y1="80%" x2="15%" y2="65%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="15%" y1="65%" x2="20%" y2="25%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          {/* Internal diagonals */}
          <line x1="20%" y1="25%" x2="55%" y2="80%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="75%" y1="30%" x2="15%" y2="65%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          
          {/* Lines connecting to hidden star once unlocked */}
          {isAllStandardExplored && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <line x1="50%" y1="48%" x2="45%" y2="15%" stroke="rgba(244,243,236,0.3)" strokeWidth="0.75" />
              <line x1="50%" y1="48%" x2="55%" y2="80%" stroke="rgba(244,243,236,0.3)" strokeWidth="0.75" />
              <line x1="50%" y1="48%" x2="20%" y2="25%" stroke="rgba(244,243,236,0.3)" strokeWidth="0.75" />
              <line x1="50%" y1="48%" x2="75%" y2="30%" stroke="rgba(244,243,236,0.3)" strokeWidth="0.75" />
            </motion.g>
          )}
        </svg>

        {/* 6 Normal Constellation Stars */}
        {cardsData.map((card) => {
          const isExplored = exploredCards.includes(card.id);
          return (
            <motion.button
              key={card.id}
              onClick={() => handleStarClick(card.id)}
              className="absolute group flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: card.x, top: card.y }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: card.id * 0.15 }}
            >
              {/* Pulse effect */}
              <div className="relative">
                <motion.div
                  className={`absolute -inset-4 rounded-full bg-white/5 blur-md group-hover:bg-white/10 transition-colors duration-300 ${
                    isExplored ? 'border border-[#f4f3ec]/10' : ''
                  }`}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 3 + (card.id % 2), repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* Glowing Core Star */}
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border ${
                    isExplored
                      ? 'bg-transparent border-[#f4f3ec]/30 scale-90'
                      : 'bg-[#f4f3ec] border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.8)] star-glow group-hover:scale-125'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`mt-3 text-[10px] uppercase tracking-widest font-sans-inter transition-all duration-300 ${
                  isExplored ? 'text-[#f4f3ec]/30 font-light' : 'text-[#f4f3ec]/60 font-medium group-hover:text-[#f4f3ec] text-glow'
                }`}
              >
                {card.label}
              </span>
            </motion.button>
          );
        })}

        {/* Hidden Star (Spawns after exploration) */}
        <AnimatePresence>
          {isAllStandardExplored && (
            <motion.button
              onClick={() => handleStarClick(7)}
              className="absolute group flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{ left: hiddenCard.x, top: hiddenCard.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 70,
                damping: 15,
                delay: 1.5,
              }}
            >
              {/* Outer Golden/White Pulsing Ring */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-6 rounded-full bg-yellow-500/5 blur-lg"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* Inner Glowing Star */}
                <motion.div
                  className="w-5 h-5 rounded-full bg-[#f4f3ec] border border-yellow-300/60 shadow-[0_0_15px_rgba(254,240,138,1)] flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(254,240,138,0.5)',
                      '0 0 25px rgba(254,240,138,0.9)',
                      '0 0 10px rgba(254,240,138,0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-600" />
                </motion.div>
              </div>

              {/* Label */}
              <span className="mt-3 text-[10px] uppercase tracking-[0.2em] font-sans-inter text-yellow-200/70 font-semibold group-hover:text-yellow-100 text-glow animate-pulse">
                {hiddenCard.label}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Note Detail Overlay Modal */}
      <AnimatePresence>
        {activeCardId && activeCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark blur backdrop */}
            <div
              className="absolute inset-0 bg-[#050816]/80 backdrop-blur-md cursor-pointer"
              onClick={() => setActiveCardId(null)}
            />

            {/* Note Card */}
            <motion.div
              className="relative w-full max-w-md glass rounded-2xl overflow-hidden p-8 md:p-10 z-10 flex flex-col justify-between aspect-[3/4]"
              initial={{ scale: 0.9, y: 20, rotateY: -15 }}
              animate={{ scale: 1, y: 0, rotateY: 0 }}
              exit={{ scale: 0.9, y: 20, rotateY: 15 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-[#f4f3ec]/10 pb-4 mb-6">
                <div className="text-[10px] uppercase tracking-widest text-[#f4f3ec]/40 font-sans-inter flex items-center gap-1.5">
                  {activeCard.id === 7 ? (
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f4f3ec]/50" />
                  )}
                  {activeCard.id === 7 ? 'Vault Entry' : `Archive Item #${activeCard.id}`}
                </div>
                <button
                  onClick={() => setActiveCardId(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#f4f3ec]/60 hover:text-[#f4f3ec] transition-all duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Card Title (Printed font) */}
              <h4 className="text-xs uppercase tracking-[0.25em] font-sans-inter text-[#f4f3ec]/40 mb-6 font-light">
                {activeCard.title}
              </h4>

              {/* Note Content (Handwritten Caveat font) */}
              <div className="flex-grow flex items-center justify-center px-2 py-4">
                <p className="text-3xl md:text-4xl text-[#f4f3ec] font-caveat leading-relaxed text-center whitespace-pre-line drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                  {activeCard.content}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 border-t border-[#f4f3ec]/5 pt-4 text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#f4f3ec]/30 font-sans-inter italic">
                  Museum of Unsaid Things
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
