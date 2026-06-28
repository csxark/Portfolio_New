'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { profileMetadata, navItems } from '@/lib/data';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('profile');

  // Audit 4: Track intersection ratios and activate the section with the highest ratio
  useEffect(() => {
    const sectionRatios: Record<string, number> = {};
    const observers: IntersectionObserver[] = [];

    const memoizedNavItems = navItems;

    memoizedNavItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sectionRatios[item.id] = entry.intersectionRatio;

            // Find the section with the highest intersection ratio
            let maxId = 'profile';
            let maxRatio = 0;

            Object.entries(sectionRatios).forEach(([id, ratio]) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                maxId = id;
              }
            });

            // Activate only if there is a minimum visibility threshold
            if (maxRatio > 0.05) {
              setActiveSection(maxId);
            }
          });
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Cleanup: Disconnect all observers on unmount to prevent leaks
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Audit 5d: Memoize scroll handler with useCallback
  const handleScroll = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 20 : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  }, []);

  // Audit 5d: Memoize nav items list
  const navItemsList = useMemo(() => navItems, []);

  // Audit 5d: Memoize social links list
  const socialLinks = useMemo(() => {
    const github = profileMetadata.socials.find((s) => s.platform === 'github')?.url || '#';
    const linkedin = profileMetadata.socials.find((s) => s.platform === 'linkedin')?.url || '#';
    const x = profileMetadata.socials.find((s) => s.platform === 'x')?.url || '#';
    return { github, linkedin, x };
  }, []);

  return (
    <>
      {/* DESKTOP SIDEBAR RAIL */}
      <aside
        className="hidden md:flex sidebar-vertical-desktop fixed top-0 left-0 bottom-0 w-16 bg-[var(--bg)] border-r border-[var(--border)] flex-col items-center justify-between py-8 z-50 select-none"
        aria-label="Sidebar Navigation"
      >
        {/* Brand rotated vertical label */}
        <div
          onClick={() => handleScroll('profile')}
          className="rotated-text-vertical cursor-pointer font-display text-lg tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
          role="button"
          tabIndex={0}
          aria-label="Scroll to profile section"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScroll('profile');
            }
          }}
        >
          ARK.TANDON
        </div>

        {/* Section indices */}
        <nav className="nav-indicators-container flex flex-col items-center gap-6" aria-label="Section indexes">
          {navItemsList.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`nav-indicator-item relative font-display text-sm tracking-widest h-10 w-10 flex items-center justify-center transition-colors duration-300 ${
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to section ${item.label}`}
              >
                {isActive && (
                  <span className="nav-indicator-dot absolute left-[-8px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                )}
                <span>{item.number}</span>
              </button>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-5 text-[var(--text-muted)]">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors focus-visible:outline-none p-1"
            aria-label="GitHub profile link"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors focus-visible:outline-none p-1"
            aria-label="LinkedIn profile link"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors focus-visible:outline-none p-1"
            aria-label="X Twitter profile link"
          >
            <Twitter className="w-4.5 h-4.5" />
          </a>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        className="flex md:hidden sidebar-horizontal-mobile fixed bottom-0 left-0 right-0 h-14 bg-[var(--bg)] border-t border-[var(--border)] items-center justify-around z-50 px-4"
        aria-label="Mobile Bottom Navigation"
      >
        {navItemsList.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`font-display text-xs tracking-wider flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Navigate to section ${item.label}`}
            >
              <span className="text-[10px] font-mono leading-none">{item.number}</span>
              <span className="text-[8px] font-mono uppercase tracking-widest">{item.label.substring(0, 4)}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
