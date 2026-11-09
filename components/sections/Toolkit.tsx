'use client';

import { motion } from 'framer-motion';
import { toolkit } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Toolkit() {
  const reduce = useSafeReducedMotion();
  return (
    <section id="toolkit" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }}>
          <p className="section-overline">03 / Toolkit</p>
          <h2 className="section-title">Technical inventory</h2>
          <p className="section-intro">A compact view of languages, frameworks, and tools used across projects and coursework. Items marked TODO are intentionally unverified.</p>

          <div className="mt-12 border-t border-[var(--border)]">
            {toolkit.map((group, index) => (
              <div key={group.title} className="grid gap-4 border-b border-[var(--border)] py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:py-6">
                <h3 className="meta-text uppercase tracking-[0.12em] text-[var(--text-primary)]">
                  <span className="mr-2 text-[var(--text-muted)]">{String(index + 1).padStart(2, '0')}</span>
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.items.map((item) => {
                    const todo = item.toLowerCase().includes('todo');
                    return (
                      <li key={item} className={`text-[0.9375rem] leading-6 ${todo ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

