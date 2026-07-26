import React from 'react';
import { motion } from 'framer-motion';

export default function FinalSection() {
  // Heart constellation node points (relative to 200x220 viewbox)
  const nodes = [
    { x: 100, y: 90 },    // Top-center indentation
    { x: 75, y: 65 },     // Left peak
    { x: 50, y: 75 },     // Upper-left outer curve
    { x: 38, y: 100 },    // Mid-left outer curve
    { x: 48, y: 135 },    // Lower-left outer curve
    { x: 70, y: 165 },    // Bottom-left curve
    { x: 100, y: 195 },   // Bottom tip
    { x: 130, y: 165 },   // Bottom-right curve
    { x: 152, y: 135 },   // Lower-right outer curve
    { x: 162, y: 100 },   // Mid-right outer curve
    { x: 150, y: 75 },    // Upper-right outer curve
    { x: 125, y: 65 },    // Right peak
  ];

  // Sequential lines to draw outline of the heart
  const outlineLines = [];
  for (let i = 0; i < nodes.length; i++) {
    outlineLines.push([i, (i + 1) % nodes.length]);
  }

  // Cross lines to make it look like an intricate constellation
  const crossLines = [
    [1, 11], // peak to peak
    [2, 10], // upper curve to upper curve
    [3, 9],  // mid curve to mid curve
    [4, 8],  // lower curve to lower curve
    [5, 7],  // bottom curve to bottom curve
    [0, 6],  // top center to bottom tip
  ];

  const allLines = [...outlineLines, ...crossLines];

  // Framer Motion text variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 1.8, // Slow, emotional pacing
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center px-6 select-none z-10 overflow-hidden">
      {/* Heart Constellation Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-16">
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full text-red-100/40 filter drop-shadow-[0_0_12px_rgba(254,226,226,0.25)]"
        >
          {/* Connection Lines */}
          {allLines.map(([from, to], i) => {
            const isCross = i >= outlineLines.length;
            return (
              <motion.line
                key={i}
                x1={nodes[from].x}
                y1={nodes[from].y}
                x2={nodes[to].x}
                y2={nodes[to].y}
                stroke={isCross ? 'rgba(254,226,226,0.1)' : 'rgba(254,226,226,0.25)'}
                strokeWidth={isCross ? '0.3' : '0.6'}
                strokeDasharray={isCross ? '2 2' : undefined}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 3,
                  delay: i * 0.05,
                  ease: 'easeInOut',
                }}
              />
            );
          })}

          {/* Glowing Constellation Stars */}
          {nodes.map((node, i) => (
            <g key={i}>
              {/* Star Core */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="2"
                fill="#f4f3ec"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: [0.3, 0.9, 0.3], scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  opacity: {
                    duration: 2 + (i % 2),
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.1,
                  },
                  scale: { duration: 1.5, delay: i * 0.05 },
                }}
              />
              {/* Delicate Glow Halo */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill="rgba(254,226,226,0.08)"
                animate={{
                  r: [6, 11, 6],
                  fillOpacity: [0.08, 0.15, 0.08],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </g>
          ))}
        </svg>

        {/* Ambient Center Red Glow */}
        <div className="absolute inset-0 m-auto w-32 h-32 bg-[radial-gradient(circle,rgba(239,68,68,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none rounded-full blur-xl" />
      </div>

      {/* Narrative Text */}
      <motion.div
        className="max-w-xl text-center space-y-6 font-serif-cormorant"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p variants={lineVariants} className="text-xl md:text-2xl font-light text-[#f4f3ec]/85">
          I didn't build this because I expected anything.
        </motion.p>

        <motion.div variants={lineVariants} className="space-y-4">
          <p className="text-xl md:text-2xl font-light text-[#f4f3ec]/85">
            I built it because some people deserve to know
          </p>
          <p className="text-2xl md:text-3xl font-medium tracking-wide text-glow text-[#f4f3ec]">
            the place they still have in someone's heart.
          </p>
        </motion.div>

        {/* Closing Line */}
        <motion.div
          variants={lineVariants}
          className="pt-10 flex flex-col items-center gap-4"
        >
          <p className="text-xl md:text-2xl font-light text-[#f4f3ec]/50 italic">
            Thank you for being part of my story, Manya.
          </p>
          
          {/* Final Heart Icon */}
          <motion.span
            className="text-2xl cursor-pointer"
            animate={{
              scale: [1, 1.2, 1],
              filter: [
                'drop-shadow(0 0 2px rgba(239,68,68,0.3))',
                'drop-shadow(0 0 10px rgba(239,68,68,0.8))',
                'drop-shadow(0 0 2px rgba(239,68,68,0.3))',
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ❤️
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
