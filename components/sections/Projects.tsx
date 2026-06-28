'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import ProjectCard from '../project/ProjectCard';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-transparent text-[var(--text-primary)] relative border-t border-[var(--border)] select-none">
      <div className="max-w-5xl mx-auto px-6 md:pl-28 md:pr-12 pt-24 pb-20">
        {/* Section label headers */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            03 — PROJECTS
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)] italic">
            Selected works // 2025
          </div>
        </div>

        {/* Stacked Project cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col border-t border-[var(--border)]"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={cardReveal} className="w-full">
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
