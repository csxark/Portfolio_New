'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { techStack } from '@/lib/data';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const categoryMap = {
  'frontend': 'Frontend Development',
  'backend': 'Backend Systems',
  'ai-data': 'Data & Generative AI',
  'languages-tools': 'Languages & Core Tools'
};

export default function TechStack() {
  const categories = Object.keys(categoryMap) as Array<keyof typeof categoryMap>;
  const shouldReduceMotion = useReducedMotion();

  const cardReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="tech-stack" className="w-full py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="section-title mb-16">Tech Stack & Expertise</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => {
            const items = techStack.filter((item) => item.category === category);
            return (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="bg-[var(--bg-secondary)] border border-white/5 hover:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col gap-4"
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-gold)] border-b border-white/5 pb-3">
                  {categoryMap[category]}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {items.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={cardReveal}
                      whileHover={shouldReduceMotion ? {} : {
                        scale: 1.03,
                        borderColor: 'var(--accent-blue)',
                        backgroundColor: 'rgba(59, 130, 246, 0.03)',
                        transition: { duration: 0.2, ease: 'easeOut' }
                      }}
                      className="border border-white/5 rounded-xl px-4 py-3 bg-[var(--bg-primary)] text-sm flex items-center justify-between transition-colors duration-200"
                    >
                      <span className="font-mono text-sm tracking-tight text-[var(--text-primary)]/95 select-none">{skill.name}</span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] select-none">
                        {category === 'ai-data' ? '✦ AI' : '✓'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
