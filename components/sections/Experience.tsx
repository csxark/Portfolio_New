'use client';

import Image from 'next/image';
import { experience } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { MOTION } from '@/lib/motion';

const typeLabel: Record<(typeof experience)[number]['type'], string> = {
  experience: 'Experience',
  education: 'Education',
  achievement: 'Achievement',
};

export default function Experience() {
  return (
    <section id="experience" className="section-anchor section-block" aria-label="Experience and education">
      <div className="editorial-container">
        <Reveal as="header" y={MOTION.ySmall} amount={0.2}>
          <p className="section-overline">04 / Experience</p>
          <RevealText as="h2" text="Experience & education" className="section-title" />
          <p className="section-intro">
            Roles, programs, and academic context presented in chronological editorial rows.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-[var(--border)]">
          {experience.map((item, index) => (
            <Reveal
              key={item.id}
              as="article"
              y={MOTION.ySmall}
              delay={Math.min(index, 4) * MOTION.stagger.group}
              className="grid gap-5 border-b border-[var(--border)] py-8 md:grid-cols-[minmax(180px,240px)_minmax(0,1fr)] md:gap-10 lg:py-9"
            >
              <div className="meta-text md:pt-0.5">
                <p className="uppercase tracking-[0.12em] text-[var(--text-primary)]">{item.period}</p>
                <p className="mt-3">{typeLabel[item.type]}</p>
                {item.location ? <p className="mt-1">{item.location}</p> : null}
              </div>

              <div className="min-w-0">
                <div className="flex items-start gap-4">
                  {item.logo ? (
                    <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_80%,transparent)]">
                      <Image
                        src={item.logo}
                        alt=""
                        fill
                        className="object-contain p-1.5"
                        sizes="40px"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <h3 className="text-[clamp(1.0625rem,1rem+0.35vw,1.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)]">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-[1.55] text-[var(--text-secondary)]">
                      {item.organization}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-[48rem] text-[0.9375rem] leading-[1.78] text-[var(--text-primary)]">
                  {item.summary}
                </p>

                {item.highlights.length ? (
                  <ul className="mt-5 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-[0.9375rem] leading-[1.68] text-[var(--text-muted)]"
                      >
                        <span className="mt-[0.62rem] h-px w-3.5 shrink-0 bg-[var(--border-strong)]" aria-hidden />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
