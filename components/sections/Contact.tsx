'use client';

import { motion } from 'framer-motion';
import { profileMetadata } from '@/lib/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
};

export default function Contact() {
  const githubLink = profileMetadata.socials.find(s => s.platform === 'github')?.url || '#';
  const linkedinLink = profileMetadata.socials.find(s => s.platform === 'linkedin')?.url || '#';
  const xLink = profileMetadata.socials.find(s => s.platform === 'x')?.url || '#';

  return (
    <section id="contact" className="w-full pt-24 pb-32 bg-transparent text-[var(--text-primary)] relative border-t border-[var(--border)] select-none">
      <div className="max-w-5xl mx-auto px-6 md:pl-28 md:pr-12">
        {/* Section label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-16">
          06 — CONTACT
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-10"
        >
          {/* Large display header */}
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-white uppercase">
            LET'S BUILD SOMETHING.
          </h2>

          {/* Email link */}
          <div>
            <a
              href={`mailto:${profileMetadata.email}`}
              className="font-mono text-lg sm:text-2xl md:text-3xl text-[var(--accent)] hover:text-white transition-colors duration-200 border-b border-dashed border-[var(--accent)] hover:border-white focus-visible:outline-none py-1"
              aria-label={`Send email to ${profileMetadata.name}`}
            >
              {profileMetadata.email}
            </a>
          </div>

          {/* Social list */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline transition-colors focus-visible:outline-none py-1"
              aria-label="GitHub profile"
            >
              GITHUB
            </a>
            <span className="text-[var(--border)] select-none">/</span>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline transition-colors focus-visible:outline-none py-1"
              aria-label="LinkedIn profile"
            >
              LINKEDIN
            </a>
            <span className="text-[var(--border)] select-none">/</span>
            <a
              href={xLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] hover:underline transition-colors focus-visible:outline-none py-1"
              aria-label="X Twitter profile"
            >
              TWITTER
            </a>
          </div>

          {/* Availability notice */}
          <div className="pt-12 border-t border-[var(--border)]">
            <p className="font-mono text-[10px] sm:text-[11px] text-[var(--text-muted)] tracking-[0.25em] uppercase leading-relaxed">
              CURRENTLY AVAILABLE FOR FREELANCE & COLLABORATIONS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
