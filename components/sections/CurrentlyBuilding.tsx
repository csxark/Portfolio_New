'use client';

import { motion } from 'framer-motion';
import { currentlyBuilding } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function CurrentlyBuilding() {
  const reduce = useSafeReducedMotion();
  return (
    <section id="building" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }}>
          <p className="section-overline">06 / Building</p>
          <h2 className="section-title">Currently building</h2>
          <p className="section-intro">Work in progress is listed only when it can be described factually.</p>
          <div className="mt-12 border-t border-[var(--border)]">
            {currentlyBuilding.map((item, index) => (
              <article key={item.id} className="grid gap-3 border-b border-[var(--border)] py-6 md:grid-cols-[56px_minmax(0,1fr)] md:gap-8">
                <p className="meta-text">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <p className="meta-text uppercase tracking-[0.12em]">{item.status}</p>
                  <h3 className="mt-2 text-[1rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-[1.7] text-[var(--text-muted)]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

