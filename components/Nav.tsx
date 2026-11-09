'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navItems } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';
import { useTheme } from '@/hooks/useTheme';

const sectionIds = navItems.filter((item) => item.href.startsWith('#')).map((item) => item.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');
  const reduce = useSafeReducedMotion();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const ratios = new Map<string, number>();
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => ratios.set(id, entry.intersectionRatio));
          let best = active;
          let max = 0;
          ratios.forEach((ratio, key) => {
            if (ratio > max) {
              max = ratio;
              best = key;
            }
          });
          if (max > 0.08) setActive(best);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75], rootMargin: '-18% 0px -58% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [active]);

  const onNavigate = useCallback(
    (href: string, id?: string) => {
      setOpen(false);
      if (href.startsWith('#') && id) {
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [reduce]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-sm">


      <div className="editorial-container flex h-[3.75rem] items-center justify-between gap-6">
        <Link href="/" className="meta-text !text-[var(--text-primary)] tracking-[0.08em] hover:text-[var(--accent)] transition-colors" aria-label="Ark Tandon home">
          ARK TANDON
        </Link>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isSection = item.href.startsWith('#');
            const isActive = isSection && active === item.id;
            if (isSection) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.href, item.id)}
                  className={`meta-text transition-colors hover:text-[var(--text-primary)] ${isActive ? 'text-[var(--text-primary)]' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={isActive ? 'border-b border-[var(--accent)] pb-px' : ''}>{item.label}</span>
                </button>
              );
            }
            return (
              <Link key={item.id} href={item.href} className="meta-text transition-colors hover:text-[var(--text-primary)]">
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center border border-[var(--border)] p-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={1.5} aria-hidden /> : <Moon size={15} strokeWidth={1.5} aria-hidden />}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center border border-[var(--border)] p-2 text-[var(--text-primary)] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-sm md:hidden" aria-label="Mobile">


          <div className="editorial-container flex flex-col py-2">
            {navItems.map((item) => {
              const isSection = item.href.startsWith('#');
              return isSection ? (
                <button key={item.id} type="button" onClick={() => onNavigate(item.href, item.id)} className="meta-text py-3 text-left hover:text-[var(--text-primary)]">
                  {item.label}
                </button>
              ) : (
                <Link key={item.id} href={item.href} className="meta-text py-3 hover:text-[var(--text-primary)]" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}


