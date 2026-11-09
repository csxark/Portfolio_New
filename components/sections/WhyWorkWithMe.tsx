'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { whyWorkWithMe } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function WhyWorkWithMe() {
  const reduce = useSafeReducedMotion();

  return (
    <section id="why-work" className="section-anchor section-block">
      <div className="editorial-container">
        <Reveal>
          <p className="section-overline">06 / Why work with me</p>
          <h2 className="section-title">A few working principles</h2>
          <p className="section-intro">What to expect when collaborating on a project, stated plainly.</p>
        </Reveal>

        <ol className="mt-14">
          {whyWorkWithMe.map((item, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <li key={item.id}>
                <Reveal delay={index * 0.05} amount={0.2}>
                  <motion.article
                    whileHover={reduce ? undefined : { x: 4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="group flex items-start gap-4 border-t border-[var(--border)] py-7 md:items-center md:gap-8"
                  >
                    <span className="meta-text shrink-0 tabular-nums text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                      {number} /
                    </span>
                    <div className="min-w-0">
                      <RevealText text={item.statement} as="h3" className="statement-xl" />
                      {item.detail ? (
                        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.7] text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  </motion.article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
