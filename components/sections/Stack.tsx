'use client';

import { motion } from 'framer-motion';
import { techStack } from '@/lib/data';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

export default function Stack() {
  return (
    <section id="stack" className="w-full py-24 bg-transparent text-[var(--text-primary)] relative border-t border-[var(--border)] select-none">
      <div className="max-w-5xl mx-auto px-6 md:pl-28 md:pr-12">
        {/* Section label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-16">
          04 — STACK
        </div>

        {/* CSS Columns layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-6"
        >
          {techStack.map((item, index) => {
            const numLabel = String(index + 1).padStart(2, '0');
            return (
              <motion.div
                key={item.name}
                variants={itemReveal}
                className="break-inside-avoid flex items-baseline gap-2 group transition-transform duration-200"
                whileHover={{
                  x: 8,
                  transition: { duration: 0.15, ease: 'easeOut' as const }
                }}
              >
                {/* Number Annotation */}
                <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-200 select-none">
                  —{numLabel}
                </span>

                {/* Name */}
                <span className="font-display text-4xl sm:text-5xl font-normal text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-200 uppercase leading-none">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
