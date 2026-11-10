'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { experience, profileMetadata } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function About() {
  const reduce = useSafeReducedMotion();
  const education = experience.find((item) => item.type === 'education');

  return (
    <section id="about" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Reveal>
            <p className="section-overline">01 / About</p>
            <RevealText
              text="I build systems, experiment with ideas, and make them work."
              as="h2"
              className="statement-xl block mt-4 md:mt-6 mb-4 md:mb-6"
            />
            <p className="body-lead max-w-2xl">{profileMetadata.tagline}</p>
          </Reveal>

          <div className="mt-16 md:mt-20 grid gap-12 md:gap-24 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal y={10}>
                <RevealText
                  text="Engineering philosophy"
                  as="h3"
                  className="meta-text mb-4 block uppercase tracking-[0.12em] text-[var(--text-primary)]"
                />
                <p className="text-[var(--text-secondary)] leading-[1.75] max-w-none">
                  {profileMetadata.tagline}
                </p>
                <p className="mt-6 text-[var(--text-secondary)] leading-[1.75] max-w-none">
                  {profileMetadata.bio}
                </p>
              </Reveal>

              <Reveal delay={0.07} y={10}>
                <p className="meta-text mb-3 block uppercase tracking-[0.12em] text-[var(--text-primary)]">
                  Interests
                </p>
                <ul className="flex flex-wrap gap-3">
                  {profileMetadata.focus.map((item, index) => (
                    <Reveal key={item} delay={index * 0.05} y={6}>
                      <li
                        className="border border-[var(--border)] px-3.5 py-1.5 rounded-md text-sm leading-none text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors duration-200"
                      >
                        {item}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.12} y={10}>
                <dl className="grid gap-5 border-t border-[var(--border)] pt-6">
                  {education ? (
                    <div className="rule-row">
                      <dt className="meta-text uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                        Education
                      </dt>
                      <div className="text-right">
                        <dd className="text-[var(--text-primary)] leading-[1.5]">
                          {education.role}
                        </dd>
                        <dd className="mt-1 text-[var(--text-secondary)]">
                          {education.organization} · {education.period}
                        </dd>
                        <dd className="mt-1 text-[var(--text-muted)]">
                          {education.location}
                        </dd>
                      </div>
                    </div>
                  ) : null}
                  <div className="rule-row">
                    <dt className="meta-text uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                      Location
                    </dt>
                    <dd className="text-[var(--text-primary)]">{profileMetadata.location}</dd>
                  </div>
                  <div className="rule-row">
                    <dt className="meta-text uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                      Current focus
                    </dt>
                    <dd className="text-[var(--text-primary)] leading-[1.5]">
                      {profileMetadata.focus.join(' · ')}
                    </dd>
                  </div>
                  <div className="rule-row">
                    <dt className="meta-text uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                      Availability
                    </dt>
                    <dd className="text-[var(--text-primary)] leading-[1.5]">
                      {profileMetadata.availability}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
