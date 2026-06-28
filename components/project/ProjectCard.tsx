'use client';

import React, { useState } from 'react';
import BorderGlow from '@/components/ui/BorderGlow';
import CRTPreview from './CRTPreview';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full border-b border-[var(--border)] bg-transparent relative overflow-visible"
    >
      <BorderGlow
        glowColor="80 100 50"
        backgroundColor="#131310"
        borderRadius={0}
        glowRadius={50}
        glowIntensity={1.4}
        coneSpread={20}
        colors={['#C8F04D', '#3A5A1A', '#0C3A0C']}
        fillOpacity={0.2}
      >
        <div className="w-full flex flex-col lg:flex-row relative overflow-visible">
          {/* LEFT PANEL (40%) */}
          <div className="w-full lg:w-[40%] p-8 relative flex flex-col justify-between border-r border-[var(--border)] overflow-hidden min-h-[320px] select-none">
            {/* Decorative background numeral overlay */}
            <div className="absolute top-0 right-4 font-display text-[120px] font-bold text-[var(--text-muted)] opacity-[0.04] leading-none pointer-events-none">
              {formattedIndex}
            </div>

            {/* Top metadata row */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                  SPECIMEN_{formattedIndex}
                </span>
                <span className="font-mono text-[11px] text-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 border border-[var(--accent)]/20">
                  [ {project.year} ]
                </span>
              </div>
              
              <h3 className="font-heading italic text-3xl font-light tracking-tight text-[var(--text-primary)]">
                {project.title}
              </h3>
              
              <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed max-w-sm">
                {project.description}
              </p>
            </div>

            {/* Bottom tags & actions row */}
            <div className="space-y-6 mt-8 relative z-10">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tag) => (
                  <span 
                    key={tag} 
                    className="font-mono text-[9px] tracking-wider uppercase border border-[var(--border)] px-2.5 py-1 text-[var(--text-muted)] bg-[var(--bg)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-2">
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--accent)] hover:text-white hover:underline tracking-wider transition-colors duration-200"
                  aria-label={`Open ${project.title} live specimen website`}
                >
                  OPEN PROJECT ↗
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--text-muted)] hover:text-white hover:underline tracking-wider transition-colors duration-200"
                  aria-label={`Open ${project.title} GitHub repository source code`}
                >
                  [SRC]
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (60%) */}
          <div className="w-full lg:w-[60%] bg-[#050805] relative overflow-hidden flex items-center justify-center p-4 lg:p-6">
            <div className="w-full max-w-2xl">
              <CRTPreview
                url={project.websiteUrl}
                isHovered={isHovered}
                terminalLabel={`SPECIMEN_${formattedIndex}_TERMINAL`}
              />
            </div>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
};

// Custom comparison check to optimize scroll rendering
export default React.memo(ProjectCard, (prev, next) => prev.project.title === next.project.title);
export { ProjectCard };
