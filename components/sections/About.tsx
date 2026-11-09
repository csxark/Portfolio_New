'use client';

import { motion } from 'framer-motion';
import { profileMetadata } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function About() {
  const reduce = useSafeReducedMotion();
  return (
    <section id="about" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }} className="grid gap-10 md:grid-cols-[minmax(0,220px)_1fr] md:gap-16">
          <div>
            <p className="section-overline">01 / About</p>
            <h2 className="section-title">Background</h2>
          </div>
          <div>
            <p className="section-intro !mt-0 !max-w-3xl !text-[var(--text-primary)]">{profileMetadata.bio}</p>
            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <p className="meta-text uppercase tracking-[0.12em]">Focus areas</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {profileMetadata.focus.map((item) => (
                  <li key={item} className="text-[0.9375rem] text-[var(--text-muted)]">
                    <span className="mr-2 text-[var(--accent)]" aria-hidden>/</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

