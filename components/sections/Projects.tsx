'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import ProjectCard from '@/components/project/ProjectCard';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

export default function Projects() {
  const reduce = useSafeReducedMotion();
  const [featured, ...rest] = projects;
  const todo = rest.find((p) => p.id.includes('todo'));
  const mainRest = rest.filter((p) => !p.id.includes('todo'));

  return (
    <section id="projects" className="section-anchor section-block">
      <div className="editorial-container">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }}>
          <p className="section-overline">02 / Selected Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-intro">Selected work across web applications, developer tooling, and product interfaces. Descriptions reflect implemented scope; placeholders remain where source details are incomplete.</p>

          <div className="mt-12 space-y-6">
            {featured ? <ProjectCard project={featured} variant="featured" /> : null}
            {mainRest.length ? (
              <div className="grid gap-6 md:grid-cols-2">
                {mainRest.map((project) => (
                  <ProjectCard key={project.id} project={project} variant="grid" />
                ))}
              </div>
            ) : null}
            {todo ? <ProjectCard project={todo} variant="row" /> : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

