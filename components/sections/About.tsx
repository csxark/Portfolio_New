'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { profileMetadata } from '@/lib/data';

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="about" className="w-full py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid md:grid-cols-3 gap-12 items-start"
        >
          {/* Section Title Column */}
          <div className="md:col-span-1">
            <h2 className="section-title">About Me</h2>
            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono mb-2">Location</p>
                <p className="text-sm font-mono text-[var(--text-primary)]">Jaipur, India</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono mb-2">Availability</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400">
                  Open for opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Bio Content Column */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--text-primary)]/90 select-none">
              {profileMetadata.bio}
            </p>
            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono mb-2">Core Interest</h4>
                <p className="text-sm text-[var(--text-primary)]/80 font-mono">Generative AI, Large Language Models, Multi-agent Systems</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono mb-2">Focus Area</h4>
                <p className="text-sm text-[var(--text-primary)]/80 font-mono">Full-Stack Engineering & Scalable Intelligent Architectures</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
