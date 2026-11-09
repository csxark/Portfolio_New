'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { openSource } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function OpenSource() {
  const reduce = useSafeReducedMotion();
  return (
    <section id="open-source" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }}>
          <p className="section-overline">05 / Open Source</p>
          <h2 className="section-title">Contributions & recognition</h2>
          <p className="section-intro">Program work and recognitions with available references. Statistics and contribution charts are omitted unless backed by verified data.</p>

          <div className="mt-12 border-t border-[var(--border)]">
            {openSource.map((item, index) => {
              const todo = item.title.toLowerCase().includes('todo') || item.description.toLowerCase().includes('todo');
              return (
                <article key={item.id} className="grid gap-3 border-b border-[var(--border)] py-6 md:grid-cols-[56px_minmax(0,1fr)_160px] md:items-start md:gap-8">
                  <p className="meta-text">{String(index + 1).padStart(2, '0')}</p>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{item.title}</h3>
                    <p className={`mt-2 text-[0.9375rem] leading-[1.7] ${todo ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}>{item.description}</p>
                    {item.url ? (
                      item.url.startsWith('/') ? (
                        <Link href={item.url} className="meta-text mt-3 inline-flex items-center gap-1 editorial-link">
                          Reference <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
                        </Link>
                      ) : (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="meta-text mt-3 inline-flex items-center gap-1 editorial-link">
                          Reference <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
                        </a>
                      )
                    ) : null}
                  </div>
                  <p className="meta-text md:text-right">{item.period}</p>
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

