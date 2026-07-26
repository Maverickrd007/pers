import React from 'react';
import { motion } from 'framer-motion';

export default function LandingScreen({ onBegin }) {
  // Constellation nodes for SVG
  const nodes = [
    { x: 100, y: 50 },
    { x: 180, y: 110 },
    { x: 140, y: 220 },
    { x: 60, y: 220 },
    { x: 20, y: 110 },
    { x: 100, y: 150 }, // Center node
  ];

  // Connections between nodes
  const lines = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], // outer border
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5]  // inner spokes
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10 select-none">
      {/* Content wrapper with framer-motion */}
      <div className="max-w-4xl text-center flex flex-col items-center">
        {/* Constellation Container */}
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          {/* Constellation lines and dots */}
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full text-[#f4f3ec] filter drop-shadow-[0_0_8px_rgba(244,243,236,0.3)]"
          >
            {/* Connection lines */}
            {lines.map(([from, to], i) => (
              <motion.line
                key={i}
                x1={nodes[from].x}
                y1={nodes[from].y}
                x2={nodes[to].x}
                y2={nodes[to].y}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}

            {/* Constellation nodes */}
            {nodes.map((node, i) => (
              <g key={i}>
                {/* Outer pulsing glow */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill="currentColor"
                  fillOpacity="0.1"
                  animate={{
                    r: [6, 12, 6],
                    fillOpacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Core star */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="2"
                  fill="currentColor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{
                    duration: 2 + (i % 2),
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Core glow orb at the center */}
          <div className="absolute inset-0 m-auto w-32 h-32 bg-[radial-gradient(circle,rgba(244,243,236,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none rounded-full blur-xl" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-light tracking-wide font-dancing text-glow mb-4 text-[#f4f3ec]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        >
          The Museum of Unsaid Things
        </motion.h1>

        {/* Subtitles */}
        <div className="space-y-2 mb-12">
          <motion.p
            className="text-lg md:text-xl text-[#f4f3ec]/60 font-serif-cormorant italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          >
            Some memories don't fade.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-[#f4f3ec]/60 font-serif-cormorant italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.8 }}
          >
            Some feelings never needed permission to stay.
          </motion.p>
        </div>

        {/* Begin Button */}
        <motion.button
          onClick={onBegin}
          className="px-8 py-3 rounded-full border border-[#f4f3ec]/20 bg-[#f4f3ec]/5 hover:bg-[#f4f3ec]/10 hover:border-[#f4f3ec]/40 text-[#f4f3ec] text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-sm cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(244,243,236,0.02)] hover:shadow-[0_0_25px_rgba(244,243,236,0.08)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          Begin
        </motion.button>
      </div>

      {/* Down indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
        onClick={onBegin}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 3.5 }}
      >
        <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
