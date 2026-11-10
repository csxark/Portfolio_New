'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';
import {
  EASE_OUT_QUART,
  MOTION,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/lib/motion';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  align?: 'left' | 'right';
  featured?: boolean;
}

const CARD_DELAY_STEP = 0.04;

function ProjectStack({ stack }: { stack: string[] }) {
  if (!stack.length) return null;
  return (
    <motion.div
      variants={staggerContainer(0, 0.03)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="flex flex-wrap gap-x-2 gap-y-1"
    >
      {stack.map((item) => (
        <motion.span
          key={item}
          variants={{
            hidden: { opacity: 0, y: MOTION.ySmall },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: MOTION.duration.fast, ease: EASE_OUT_QUART },
            },
          }}
          className="relative z-10 inline-flex items-center gap-1 rounded border border-[color:color-mix(in_srgb,var(--accent)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--accent)_8%,transparent)] px-2 py-0.5 text-[0.6875rem] font-medium tracking-[0.02em] text-[var(--text-primary)]"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <div
        className={cn(
          'relative overflow-hidden border border-[var(--border)] rounded-[1px] bg-[color:color-mix(in_srgb,var(--surface)_72%,transparent)] group',
          className,
        )}
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col justify-between overflow-hidden border border-[var(--border)] rounded-[1px] bg-[color:color-mix(in_srgb,var(--surface)_72%,transparent)] group p-5 md:p-6',
        className,
      )}
    >
      <div className="meta-text uppercase tracking-[0.14em]">{project.category}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="meta-text">{project.year}</span>
      </div>
      <div>
        <p className="mt-3 text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
          {project.title}
        </p>
        <div className="mt-3 h-px w-12 bg-[var(--accent)]" aria-hidden />
      </div>
      <div className="mt-auto meta-text">{project.stack.slice(0, 3).join(' / ')}</div>
    </div>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) return null;
  const arrow = (
    <ArrowUpRight
      size={13}
      strokeWidth={1.5}
      className="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden
    />
  );
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group meta-text editorial-link inline-flex items-center gap-1.5"
        >
          Live {arrow}
        </a>
      ) : null}
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group meta-text editorial-link inline-flex items-center gap-1.5"
        >
          Source {arrow}
        </a>
      ) : null}
    </div>
  );
}

export default function ProjectCard({ project, index, align, featured }: ProjectCardProps) {
  const delay = Math.max(0, index) * CARD_DELAY_STEP;
  const placeholder = project.id.includes('todo');

  return (
    <Reveal
      as="article"
      delay={delay}
      y={MOTION.ySmall}
      className="group group-hover:border-[color:color-mix(in_srgb,var(--accent)_35%,transparent)] transition-colors duration-500"
    >
      {featured ? (
        <div className="grid gap-0 border border-[var(--border)] rounded-[1px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <div className="border-b border-[var(--border)] md:border-b-0 md:border-r">
            <ProjectVisual project={project} className="min-h-[30rem] md:min-h-[44rem]" />
          </div>
          <div className="flex flex-col justify-between p-6 md:p-10">
            <div>
              <p className="meta-text uppercase tracking-[0.12em]">Featured case study</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="meta-text">{project.category}</span>
                <span className="meta-text">{project.year}</span>
              </div>
              <h3 className="mt-5 project-title">{project.title}</h3>
              <p className="mt-6 max-w-36 body-lead">{project.description}</p>
            </div>
            <div className="mt-10 border-t border-[var(--border)] pt-6">
              <ProjectStack stack={project.stack} />
              <Links project={project} />
            </div>
          </div>
        </div>
      ) : placeholder ? (
        <div className="pt-6">
          <div className="rule-row">
            <p className="meta-text uppercase tracking-[0.12em]">{project.year} / Placeholder</p>
            <span className="meta-text text-[var(--accent)]">TODO</span>
          </div>
          <h3 className="mt-4 text-[1.125rem] font-semibold leading-[1.25] tracking-[-0.015em] text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.7] text-[var(--text-muted)]">{project.description}</p>
        </div>
      ) : (
        <div
          className={cn(
            'grid items-start gap-y-6 border border-[var(--border)] rounded-[1px] bg-transparent grid-cols-[1fr]',
            'md:grid-cols-12 md:gap-10',
          )}
        >
          <div
            className={cn(
              'min-w-0',
              align === 'right' ? 'md:order-1 md:col-span-6' : 'md:order-2 md:col-span-6',
            )}
          >
            <ProjectVisual project={project} className="min-h-[24rem] md:min-h-[32rem]" />
          </div>
          <div
            className={cn(
              'min-w-0 flex flex-col justify-center',
              align === 'left' ? 'md:order-1 md:col-span-5' : 'md:order-2 md:col-span-5',
            )}
          >
            <p className="meta-text uppercase tracking-[0.12em]">{`0${index + 1}.`}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="meta-text">{project.category}</span>
              <span className="meta-text">{project.year}</span>
            </div>
            <h3 className="mt-5 project-title">{project.title}</h3>
            <p className="mt-6 max-w-36 body-lead">{project.description}</p>
            <div className="mt-8">
              <ProjectStack stack={project.stack} />
            </div>
            <div className="mt-auto pt-6 border-t border-[var(--border)]">
              <Links project={project} />
            </div>
          </div>
        </div>
      )}
    </Reveal>
  );
}
