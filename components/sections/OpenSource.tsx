'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { openSource, profileMetadata } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { MOTION } from '@/lib/motion';

export default function OpenSource() {
  const github = profileMetadata.socials.find((item) => item.platform === 'github');
  const contributionEntries = openSource.filter((item) => item.type === 'contribution');
  const verifiedRecognitions = openSource.filter(
    (item) => item.type !== 'contribution' || !item.title.toLowerCase().includes('todo'),
  );

  return (
    <section id="open-source" className="section-anchor section-block" aria-label="Contributions and recognition">
      <div className="editorial-container">
        <Reveal as="header" y={MOTION.ySmall} amount={0.2}>
          <p className="section-overline">05 / Open Source</p>
          <RevealText as="h2" text="Contributions & recognition" className="section-title" />
        </Reveal>

        <div className="mt-12 grid gap-12 border-t border-[var(--border)] pt-10 md:grid-cols-[minmax(220px,0.82fr)_minmax(0,1.18fr)] md:gap-14 lg:gap-16">
          <Reveal as="aside" y={MOTION.ySmall} delay={MOTION.stagger.group} className="md:pr-2">
            <p className="text-[clamp(1.25rem,1.1rem+1vw,1.875rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[var(--text-primary)] text-balance">
              Open-source work through structured programs, with references kept to what is verified.
            </p>

            {github ? (
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-text editorial-link mt-6 inline-flex items-center gap-1.5"
              >
                {github.label}
                <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
              </a>
            ) : null}

            <div className="mt-10 border-t border-[var(--border)] pt-5">
              <p className="meta-text uppercase tracking-[0.12em]">Verified recognitions</p>
              {verifiedRecognitions.length ? (
                <ul className="mt-4 space-y-3">
                  {verifiedRecognitions.map((item) => (
                    <li key={item.id} className="text-[0.9375rem] leading-[1.6] text-[var(--text-secondary)]">
                      <span className="text-[var(--text-primary)]">{item.title}</span>
                      {item.period && item.period !== 'TODO' ? (
                        <span className="meta-text mt-1 block">{item.period}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[0.9375rem] leading-[1.65] text-[var(--text-muted)]">
                  No additional verified contribution details are listed in the current data.
                </p>
              )}
              <p className="meta-text mt-6 leading-[1.65] text-[var(--text-muted)]">
                Contribution charts and aggregate statistics are omitted because no verified data is available.
              </p>
            </div>
          </Reveal>

          <div className="min-w-0 border-t border-[var(--border)] md:border-t-0">
            {contributionEntries.map((item, index) => {
              const isTodo = item.title.toLowerCase().includes('todo') || item.description.toLowerCase().includes('todo');
              return (
                <Reveal
                  key={item.id}
                  as="article"
                  y={MOTION.ySmall}
                  delay={Math.min(index, 4) * MOTION.stagger.group}
                  className="grid gap-3 border-b border-[var(--border)] py-6 first:border-t first:border-[var(--border)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8 md:first:border-t-0"
                >
                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] font-semibold leading-[1.25] tracking-[-0.018em] text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[46rem] text-[0.9375rem] leading-[1.72] text-[var(--text-muted)]">
                      {item.description}
                    </p>
                    {item.url ? (
                      item.url.startsWith('/') ? (
                        <Link href={item.url} className="meta-text editorial-link mt-3 inline-flex items-center gap-1.5">
                          {isTodo ? 'Reference (if available)' : 'Reference'}
                          <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
                        </Link>
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="meta-text editorial-link mt-3 inline-flex items-center gap-1.5"
                        >
                          {isTodo ? 'Reference (if available)' : 'Reference'}
                          <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
                        </a>
                      )
                    ) : null}
                  </div>
                  <p className="meta-text shrink-0 sm:text-right">{item.period}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
