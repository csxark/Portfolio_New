'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import RevealText from '@/components/ui/RevealText';
import { contactLinks, profileMetadata } from '@/lib/data';
import { EASE_OUT_QUART, viewportOnce } from '@/lib/motion';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Contact() {
  const shouldReduce = useSafeReducedMotion();

  return (
    <section id="contact" className="section-anchor section-block !border-b-0">
      <div className="editorial-container">
        <Reveal y={10}>
          <p className="section-overline">08 / Contact</p>
        </Reveal>

        <div className="mt-8 md:mt-10">
          <RevealText
            text="LET'S BUILD"
            as="h2"
            delay={0.04}
            className="statement-xl block"
          />
          <RevealText
            text="SOMETHING."
            as="p"
            delay={0.12}
            className="statement-xl block text-[var(--text-secondary)]"
          />
        </div>

        <div className="mt-12 grid gap-10 border-t border-[var(--border)] pt-8 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-16 md:pt-10">
          <Reveal delay={0.1} y={10}>
            <p className="max-w-xl text-[clamp(1.0625rem,1rem+0.35vw,1.25rem)] leading-[1.6] tracking-[-0.015em] text-[var(--text-primary)]">
              {profileMetadata.availability}. I&apos;m interested in practical
              software work where clear implementation and collaboration matter.
            </p>
            <p className="meta-text mt-5 uppercase tracking-[0.12em]">
              Based in {profileMetadata.location}
            </p>
          </Reveal>

          <Reveal delay={0.14} y={10}>
            <div
              className="border-t border-[var(--border)] md:border-t-0"
              aria-label="Contact links"
            >
              {contactLinks.map((item, index) => {
                const disabled = item.href === 'TODO';
                const isExternal = item.href.startsWith('http');
                const content = (
                  <>
                    <span className="meta-text uppercase tracking-[0.12em]">
                      {item.label}
                    </span>
                    <span className="mt-1 flex items-start justify-between gap-4">
                      <span
                        className={[
                          'text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-[1.35] tracking-[-0.015em]',
                          disabled
                            ? 'text-[var(--text-muted)]'
                            : 'text-[var(--text-primary)]',
                        ].join(' ')}
                      >
                        {item.value}
                      </span>
                      {!disabled ? (
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                          aria-hidden
                          className="mt-0.5 shrink-0 text-[var(--text-secondary)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                        />
                      ) : (
                        <span className="meta-text mt-0.5 shrink-0 normal-case tracking-normal text-[var(--text-muted)]">
                          Unavailable
                        </span>
                      )}
                    </span>
                  </>
                );

                const rowClass =
                  'group block border-b border-[var(--border)] py-4 transition-colors duration-200';

                if (shouldReduce || disabled) {
                  return (
                    <div
                      key={item.label}
                      className={rowClass}
                      aria-disabled={disabled || undefined}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`${rowClass} hover:text-[var(--text-primary)]`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.45,
                      delay: 0.16 + index * 0.04,
                      ease: EASE_OUT_QUART,
                    }}
                  >
                    {content}
                  </motion.a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
