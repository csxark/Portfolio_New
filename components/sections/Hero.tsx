'use client';

import { motion } from 'framer-motion';
import SideRays from '@/components/ui/SideRays';
import { profileMetadata } from '@/lib/data';

// Declare variants statically outside the component to prevent reference changes
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const labelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' as const } 
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.03,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.8, duration: 0.6, ease: 'easeOut' as const }
  }
};

const stampVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -3,
    transition: { delay: 1.0, duration: 0.5, ease: 'easeOut' as const }
  }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.2, duration: 0.6, ease: 'easeOut' as const }
  }
};

export default function Hero() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split name into letters for letterStagger
  const nameStr = 'ARK TANDON';
  const nameLetters = Array.from(nameStr);

  return (
    <section
      id="profile"
      className="relative w-full min-h-[100svh] flex flex-col justify-end bg-transparent z-10 px-6 md:pl-28 md:pr-12 pb-24 md:pb-32 overflow-hidden select-none"
    >
      {/* SideRays background fill */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-45">
        <SideRays
          speed={1.8}
          rayColor1="#C8F04D"
          rayColor2="#1A3A0A"
          intensity={1.6}
          spread={2.5}
          origin="top-right"
          saturation={1.2}
          blend={0.6}
          falloff={1.8}
          opacity={0.35}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl flex flex-col items-start text-left"
      >
        {/* Section Index Label */}
        <motion.div 
          variants={labelVariants}
          className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4"
        >
          01 — PROFILE
        </motion.div>

        {/* Available Stamp */}
        <motion.div 
          variants={stampVariants}
          className="mb-8"
        >
          <div 
            className="stamp-tag border-2 border-[var(--accent)] text-[var(--accent)] font-mono text-[11px] tracking-[0.2em] px-3.5 py-1.5 inline-block uppercase"
            aria-label="Currently available for work"
          >
            AVAILABLE FOR WORK
          </div>
        </motion.div>

        {/* Large Bebas Neue Name Header */}
        <h1 
          className="font-display font-normal text-[var(--text-primary)] tracking-tight leading-none mb-6 flex flex-wrap"
          style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
          aria-label={profileMetadata.name}
        >
          {nameLetters.map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              className={char === ' ' ? 'mr-6' : ''}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          className="font-heading italic font-light text-[var(--text-primary)]/80 text-xl sm:text-2xl md:text-3xl max-w-2xl leading-relaxed mb-10"
        >
          {profileMetadata.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div 
          variants={ctaVariants} 
          className="flex flex-row flex-wrap gap-4 w-full"
        >
          <button
            onClick={() => handleScroll('projects')}
            className="cursor-pointer bg-[var(--accent)] text-[#0C0C0A] hover:bg-white font-semibold font-mono text-xs tracking-wider uppercase px-6 py-4 transition-colors duration-200 border border-transparent"
            aria-label="Scroll to projects"
          >
            VIEW PROJECTS →
          </button>
          <button
            onClick={() => handleScroll('contact')}
            className="cursor-pointer bg-transparent text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)] font-semibold font-mono text-xs tracking-wider uppercase px-6 py-4 transition-colors duration-200 border border-[var(--border)]"
            aria-label="Scroll to contact info"
          >
            CONTACT ME
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
