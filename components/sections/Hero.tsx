'use client';

import { motion } from 'framer-motion';
import { profileMetadata } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Hero() {
  const reduce = useSafeReducedMotion();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  return (
    <section id="profile" className="section-anchor">
      <div className="editorial-container pb-[clamp(4rem,8vw,6.5rem)] pt-[clamp(3.5rem,7vw,6rem)]">
        <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <p className="meta-text mb-6 tracking-[0.16em] uppercase">AI / Software Engineer</p>
          <h1 className="max-w-[11ch] text-[clamp(2.75rem,7.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--text-primary)]">
            {profileMetadata.name}
          </h1>
          <p className="mt-6 max-w-[38rem] text-[clamp(1rem,0.95rem+0.35vw,1.125rem)] leading-[1.75] text-[var(--text-muted)]">
            {profileMetadata.tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="button" onClick={() => go('projects')} className="border border-[var(--text-primary)] bg-[var(--text-primary)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--bg-base)] transition-colors hover:border-[var(--accent-hover)] hover:bg-[var(--accent-hover)] hover:text-white">

              Selected work
            </button>
            <button type="button" onClick={() => go('contact')} className="meta-text editorial-link !text-[var(--text-primary)]">
              Contact
            </button>
          </div>
          <dl className="mt-14 grid max-w-3xl gap-x-10 gap-y-5 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
            <div>
              <dt className="meta-text uppercase tracking-[0.12em]">Location</dt>
              <dd className="mt-1.5 text-[0.9375rem] text-[var(--text-primary)]">{profileMetadata.location}</dd>
            </div>
            <div>
              <dt className="meta-text uppercase tracking-[0.12em]">Current focus</dt>
              <dd className="mt-1.5 text-[0.9375rem] text-[var(--text-primary)]">{profileMetadata.focus[0]}</dd>
            </div>
            <div>
              <dt className="meta-text uppercase tracking-[0.12em]">Availability</dt>
              <dd className="mt-1.5 text-[0.9375rem] text-[var(--text-primary)]">{profileMetadata.availability}</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

