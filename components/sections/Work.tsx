'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function Work() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="w-full py-24 bg-transparent text-[var(--text-primary)] relative border-t border-[var(--border)] select-none">
      <div className="max-w-5xl mx-auto px-6 md:pl-28 md:pr-12">
        {/* Section Index Label */}
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-12">
          02 — WORK
        </div>

        {/* Research Log Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--border)] pb-4">
                <th className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase py-4 w-[220px]">
                  DATE RANGE
                </th>
                <th className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase py-4">
                  ROLE & RESPONSIBILITIES
                </th>
                <th className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase py-4 w-[250px]">
                  ORGANIZATION
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {experiences.map((exp) => (
                <motion.tr
                  key={exp.id}
                  variants={slideInLeft}
                  onClick={() => handleScroll('contact')}
                  className="border-b border-[var(--border)] hover:bg-[var(--accent-dim)] group cursor-pointer transition-colors duration-200"
                >
                  {/* Date range */}
                  <td className="py-6 pr-4 align-top">
                    <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-200">
                      {exp.period}
                    </span>
                  </td>

                  {/* Role description */}
                  <td className="py-6 pr-6 align-top">
                    <div className="space-y-3">
                      <h3 className="font-heading italic text-lg text-[var(--text-primary)] group-hover:text-white transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <ul className="space-y-1.5 text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)]/80 leading-relaxed font-body transition-colors duration-200">
                        {exp.description.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[var(--accent)] select-none">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  {/* Organization name */}
                  <td className="py-6 align-top">
                    <span className="font-display text-2xl tracking-wide text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-200 uppercase">
                      {exp.company}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
