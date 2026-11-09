'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { contactLinks, profileMetadata } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Contact() {
  const reduce = useSafeReducedMotion();
  return (
    <section id="contact" className="section-anchor section-block !border-b-0">
      <div className="editorial-container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }} className="grid gap-10 md:grid-cols-[minmax(0,220px)_1fr] md:gap-16">
          <div>
            <p className="section-overline">07 / Contact</p>
            <h2 className="section-title">Get in touch</h2>
          </div>
          <div>
            <p className="max-w-2xl text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.55] tracking-[-0.015em] text-[var(--text-primary)]">
              Open to internships, collaborations, and project conversations.
            </p>
            <p className="mt-3 text-[0.9375rem] text-[var(--text-muted)]">Based in {profileMetadata.location}.</p>
            <div className="mt-10 border-t border-[var(--border)]">
              {contactLinks.map((item) => {
                const disabled = item.href === 'TODO';
                return (
                  <div key={item.label} className="grid gap-1 border-b border-[var(--border)] py-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center sm:gap-6">
                    <p className="meta-text uppercase tracking-[0.1em]">{item.label}</p>
                    {disabled ? (
                      <span className="text-[0.9375rem] text-[var(--text-muted)]">{item.value}</span>
                    ) : (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="inline-flex items-center gap-1.5 text-[0.9375rem] text-[var(--text-primary)] editorial-link">
                        {item.value} <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

