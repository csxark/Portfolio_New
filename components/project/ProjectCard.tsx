'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

type Variant = 'featured' | 'grid' | 'row';

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_72%,transparent)]">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    );
  }
  return (
    <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_72%,transparent)] p-5 md:p-6">
      <div className="meta-text uppercase tracking-[0.14em]">{project.category}</div>
      <div>
        <div className="max-w-[14ch] text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
          {project.title}
        </div>
        <div className="mt-3 h-px w-12 bg-[var(--accent)]" aria-hidden />
      </div>
      <div className="meta-text">{project.stack.slice(0, 3).join(' / ')}</div>
    </div>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) return null;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="meta-text inline-flex items-center gap-1 text-[var(--text-primary)] editorial-link">
          Live <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
        </a>
      ) : null}
      {project.githubUrl ? (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="meta-text inline-flex items-center gap-1 editorial-link">
          Source <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
        </a>
      ) : null}
    </div>
  );
}

export default function ProjectCard({ project, variant = 'grid' }: { project: Project; variant?: Variant }) {
  if (variant === 'featured') {
    return (
      <article className="group grid gap-0 border border-[var(--border)] md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="border-b border-[var(--border)] md:border-b-0 md:border-r">
          <ProjectVisual project={project} />
        </div>
        <div className="flex flex-col justify-between bg-transparent p-6 md:p-8">
          <div>
            <p className="meta-text uppercase tracking-[0.14em]">Featured / {project.category}</p>
            <h3 className="mt-3 text-[clamp(1.625rem,1.35rem+1.1vw,2.125rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--text-primary)]">{project.title}</h3>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.75] text-[var(--text-muted)]">{project.description}</p>
          </div>
          <div className="mt-8 border-t border-[var(--border)] pt-5">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.stack.map((item) => (
                <span key={item} className="meta-text">{item}</span>
              ))}
            </div>
            <Links project={project} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'row') {
    return (
      <article className="group grid gap-5 border-t border-[var(--border)] pt-6 md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-start md:gap-8">
        <p className="meta-text uppercase tracking-[0.12em]">{project.year} / Placeholder</p>
        <div>
          <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{project.title}</h3>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-[1.7] text-[var(--text-muted)]">{project.description}</p>
        </div>
        <span className="meta-text text-[var(--accent)]">TODO</span>
      </article>
    );
  }

  return (
    <article className="group flex flex-col border border-[var(--border)] bg-transparent">
      <ProjectVisual project={project} />
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="meta-text uppercase tracking-[0.12em]">{project.category}</p>
          <p className="meta-text">{project.year}</p>
        </div>
        <h3 className="mt-3 text-[clamp(1.25rem,1.15rem+0.45vw,1.625rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)]">{project.title}</h3>
        <p className="mt-3 text-[0.9375rem] leading-[1.7] text-[var(--text-muted)]">{project.description}</p>
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-[var(--border)] pt-4">
            {project.stack.map((item) => (
              <span key={item} className="meta-text">{item}</span>
            ))}
          </div>
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

