'use client';

import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { profileMetadata, toolkit } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Hero() {
  const reduce = useSafeReducedMotion();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  const frontend = toolkit.find((c) => c.title === 'Frontend')?.items.join(', ');
  const languages = toolkit.find((c) => c.title === 'Languages')?.items.join(', ');
  const stack = [frontend, languages].filter(Boolean).join(' · ');
  const focus = profileMetadata.focus.join(' · ');

  return (
    <section id="profile" className="section-anchor">
      <div className="editorial-container pb-[clamp(4rem,8vw,6.5rem)] pt-[clamp(3.5rem,7vw,6rem)]">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="meta-text text-[var(--text-secondary)]">{profileMetadata.availability}</span>
          <span className="meta-text text-[var(--text-muted)]">·</span>
          <span className="meta-text">{profileMetadata.role}</span>
        </div>

        <Reveal delay={0.05}>
          <div className="grid gap-3 md:gap-4">
            <RevealText text={profileMetadata.name} as="h1" className="display-name mb-2" />
            <p className="hero-role">{profileMetadata.role}</p>
            <p className="meta-text max-w-[34rem] leading-[1.6]">{focus}</p>
            <p className="mt-4 max-w-[36rem] body-lead">{profileMetadata.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <button type="button" onClick={() => go('projects')} className="border border-[var(--text-primary)] bg-[var(--text-primary)] px-5 py-2.5 text-[0.8125rem] font-medium text-[var(--bg-base)] transition-colors hover:border-[var(--accent-hover)] hover:bg-[var(--accent-hover)] hover:text-white">
                Selected work
              </button>
              <button type="button" onClick={() => go('contact')} className="meta-text editorial-link !text-[var(--text-primary)]">
                Contact
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-12 grid gap-y-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            <div className="rule-row">
              <dt className="meta-text uppercase tracking-[0.12em]">Location</dt>
              <dd className="text-[var(--text-primary)]">{profileMetadata.location}</dd>
            </div>
            <div className="rule-row">
              <dt className="meta-text uppercase tracking-[0.12em]">Current focus</dt>
              <dd className="text-[var(--text-primary)]">{focus}</dd>
            </div>
            <div className="rule-row">
              <dt className="meta-text uppercase tracking-[0.12em]">Stack / specialization</dt>
              <dd className="text-[var(--text-primary)]">{stack}</dd>
            </div>
            <div className="rule-row">
              <dt className="meta-text uppercase tracking-[0.12em]">Availability</dt>
              <dd className="text-[var(--text-primary)]">{profileMetadata.availability}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
