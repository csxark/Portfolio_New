'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';
import Image from 'next/image';
import { useState } from 'react';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const timelineItemReveal = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

interface CompanyLogoProps {
  src?: string;
  companyName: string;
}

const CompanyLogo = ({ src, companyName }: CompanyLogoProps) => {
  const [error, setError] = useState(false);
  const initials = companyName.charAt(0);

  if (error || !src) {
    return (
      <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center font-mono text-lg font-bold text-[var(--accent)] select-none">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 overflow-hidden flex items-center justify-center relative">
      <Image
        src={src}
        alt={companyName}
        width={48}
        height={48}
        className="object-cover w-full h-full"
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function Experience() {
  const [error, setError] = useState(false);

  return (
    <section id="experience" className="w-full py-24 bg-[var(--bg)] text-[var(--text-primary)] relative border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 md:pl-28 md:pr-12">
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-12">
          02 — EXPERIENCE
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-[var(--border)] ml-4 md:ml-6 pl-8 md:pl-10 space-y-12"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={timelineItemReveal}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[49px] top-4 w-4.5 h-4.5 rounded-full border-4 border-[var(--bg)] bg-[var(--accent)] shadow-[0_0_8px_rgba(200,240,77,0.5)] group-hover:scale-125 transition-transform duration-300"></div>

              {/* Experience Card */}
              <div className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/30 rounded-none p-6 shadow-xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <CompanyLogo src={exp.logo} companyName={exp.company} />
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] font-mono">{exp.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center text-xs font-mono text-[var(--accent)] bg-[var(--accent-dim)] border border-[var(--accent)]/15 px-3 py-1 rounded-none self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>

                {/* Description Bullets */}
                <ul className="space-y-2 text-sm text-[var(--text-primary)]/80 leading-relaxed font-body">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[var(--accent)] mt-1.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
