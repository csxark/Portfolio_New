'use client';

import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { currentlyBuilding } from '@/lib/data';

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="section-anchor section-block">
      <div className="editorial-container">
        <Reveal y={10}>
          <p className="section-overline">07 / Building</p>
        </Reveal>

        <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-16">
          <Reveal delay={0.04} y={8}>
            <h2 className="section-title">Currently building</h2>
            <p className="section-intro">
              Listed only when it can be described factually.
            </p>
          </Reveal>

          <div className="border-t border-[var(--border)]">
            {currentlyBuilding.map((item, index) => (
              <Reveal
                key={item.id}
                as="article"
                delay={0.08 + index * 0.04}
                y={12}
                className="grid gap-6 border-b border-[var(--border)] py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="meta-text uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                      {item.status}
                    </span>
                    <span className="meta-text text-[var(--text-muted)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <RevealText
                    text={item.title}
                    as="h3"
                    delay={0.12 + index * 0.04}
                    className="mt-3 text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-[var(--text-primary)] [text-wrap:balance]"
                  />

                  <p className="mt-4 max-w-2xl text-[clamp(0.9375rem,0.9rem+0.15vw,1.0625rem)] leading-[1.72] text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>

                <dl className="grid gap-4 text-[0.9375rem] md:min-w-[13rem] md:pt-1">
                  <div>
                    <dt className="meta-text uppercase tracking-[0.12em]">Focus</dt>
                    <dd className="mt-1 leading-[1.6] text-[var(--text-primary)]">
                      {item.status}
                    </dd>
                  </div>
                  <div>
                    <dt className="meta-text uppercase tracking-[0.12em]">Technologies</dt>
                    <dd className="mt-1 leading-[1.6] text-[var(--text-muted)]">
                      Not listed yet
                    </dd>
                  </div>
                  <div>
                    <dt className="meta-text uppercase tracking-[0.12em]">Link</dt>
                    <dd className="mt-1 leading-[1.6] text-[var(--text-muted)]">
                      Not available
                    </dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
