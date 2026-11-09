'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import ProjectCard from '@/components/project/ProjectCard';
import Reveal from '@/components/ui/Reveal';
import { MOTION, staggerContainer, viewportOnce } from '@/lib/motion';

export default function Projects() {
  const [featured, ...rest] = projects;
  const todo = rest.find((p) => p.id.includes('todo'));
  const mainRest = rest.filter((p) => !p.id.includes('todo'));

  return (
    <section id="projects" className="section-anchor section-block" aria-label="Selected work">
      <div className="editorial-container">
        <Reveal as="header" y={MOTION.ySmall} amount={0.18}>
          <p className="section-overline">02 / Selected Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-intro">
            Selected case studies across developer tooling, full-stack applications, and product interfaces. Descriptions reflect implemented scope; incomplete entries remain intentional placeholders.
          </p>
        </Reveal>

        <div className="mt-12">
          {featured ? (
            <ProjectCard key={featured.id} project={featured} index={0} featured align="left" />
          ) : null}

          <div className="mt-16">
            <motion.div
              variants={staggerContainer(0, MOTION.stagger.children)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-20 md:space-y-28"
            >
              {mainRest.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                  align={index % 2 === 0 ? 'left' : 'right'}
                />
              ))}
            </motion.div>
          </div>

          {todo ? (
            <ProjectCard key={todo.id} project={todo} index={mainRest.length + 1} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
