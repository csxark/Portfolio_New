'use client';

import { motion } from 'framer-motion';
import { educationList } from '@/lib/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
};

export default function Education() {
  return (
    <section id="education" className="w-full py-24 bg-transparent text-[var(--text-primary)] relative border-t border-[var(--border)] select-none">
      <div className="max-w-5xl mx-auto px-6 md:pl-28 md:pr-12">
        {/* Section Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-12">
          05 — EDUCATION
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-6"
        >
          {educationList.map((edu) => (
            <div key={edu.id} className="border-l-2 border-[var(--accent)] pl-6 space-y-3 py-1">
              {/* Institution details */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-heading italic text-2xl sm:text-3xl font-light text-[var(--text-primary)] leading-tight">
                  {edu.institution}
                </h3>
                <span className="font-mono text-xs text-[var(--accent)] font-semibold whitespace-nowrap">
                  [ {edu.period} ]
                </span>
              </div>

              {/* Degree */}
              <p className="font-mono text-xs text-[var(--text-muted)] tracking-wide uppercase">
                {edu.degree}
              </p>

              {/* Description */}
              {edu.description && (
                <p className="font-mono text-xs text-[var(--text-primary)]/80 leading-relaxed max-w-2xl pt-2">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
