'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { experience } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Experience() {
  const reduce = useSafeReducedMotion();
  return (
    <section id="experience" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }}>
          <p className="section-overline">04 / Experience</p>
          <h2 className="section-title">Experience & education</h2>
          <p className="section-intro">Roles, programs, and academic context presented in chronological editorial rows.</p>

          <div className="mt-12 border-t border-[var(--border)]">
            {experience.map((item) => (
              <article key={item.id} className="grid gap-4 border-b border-[var(--border)] py-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
                <div className="meta-text">
                  <p className="uppercase tracking-[0.1em] text-[var(--text-primary)]">{item.period}</p>
                  <p className="mt-2 capitalize">{item.type}</p>
                  {item.location ? <p className="mt-1">{item.location}</p> : null}
                </div>
                <div>
                  <div className="flex items-start gap-3">
                    {item.logo ? (
                      <div className="relative mt-0.5 h-9 w-9 shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                        <Image src={item.logo} alt="" fill className="object-contain p-1.5" sizes="36px" />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{item.role}</h3>
                      <p className="mt-0.5 text-[0.9375rem] text-[var(--text-muted)]">{item.organization}</p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-[var(--text-primary)]">{item.summary}</p>
                  {item.highlights.length ? (
                    <ul className="mt-4 space-y-1.5">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5 text-[0.9375rem] leading-[1.65] text-[var(--text-muted)]">
                          <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-[var(--border)]" aria-hidden />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
