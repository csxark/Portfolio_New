'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { toolkit } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Toolkit() {
  const reduce = useSafeReducedMotion();

  return (
    <section id="toolkit" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Reveal>
            <p className="section-overline">03 / Toolkit</p>
            <RevealText
              text="Technical inventory"
              as="h2"
              className="statement-xl block mt-4 md:mt-6 mb-4 md:mb-6"
            />
            <p className="section-intro max-w-2xl">
              A compact view of languages, frameworks, and tools used across
              projects and coursework. Items marked TODO are intentionally
              unverified.
            </p>
          </Reveal>

          <div className="mt-14 md:mt-18 border-t border-[var(--border)] pt-8 md:pt-10">
            {toolkit.map((group, index) => {
              const number = String(index + 1).padStart(2, '0');
              return (
                <motion.article
                  key={group.title}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="grid gap-5 border-b border-[var(--border)] py-7 md:grid-cols-[170px_minmax(0,1fr)] md:gap-8 md:py-9"
                >
                  <div className="flex flex-col gap-1">
                    <span className="meta-text tabular-nums text-[var(--text-muted)]">
                      {number}
                    </span>
                    <h3
                      className="text-[clamp(1.125rem,1rem+0.35vw,1.4375rem)] font-medium text-[var(--text-primary)] leading-1.25 tracking-tight"
                    >
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => {
                      const todo = item.toLowerCase().includes('todo');
                      return (
                        <span
                          key={item}
                          className={`inline-flex items-center gap-1.5 border rounded-md px-3 py-1.5 text-[0.8125rem] leading-none whitespace-nowrap transition-colors duration-200 ${todo
                            ? 'border-[var(--text-muted)]/35 text-[var(--text-muted)]'
                            : 'border-[var(--border)]/55 text-[var(--text-secondary)] hover:border-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'}
                          `}
                          title={todo ? 'Unverified (TODO)' : undefined}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
