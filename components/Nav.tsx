'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navItems } from '@/lib/data';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';
import { useTheme } from '@/hooks/useTheme';

const sectionIds = navItems.filter((item) => item.href.startsWith('#')).map((item) => item.id);

let scrollLock = 0;
const lockBody = () => {
  if (typeof document === 'undefined') return;
  scrollLock += 1;
  if (scrollLock === 1) document.documentElement.style.overflow = 'hidden';
};
const unlockBody = () => {
  if (typeof document === 'undefined') return;
  scrollLock = Math.max(0, scrollLock - 1);
  if (scrollLock === 0) document.documentElement.style.overflow = '';
};

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
          entries.forEach((entry) => {
            ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          });
          let best = active;
          let max = 0;
          ratios.forEach((ratio, key) => {
            if (ratio > max) {
              max = ratio;
              best = key;
            }
          });
          if (max > 0.12) setActive(best);
        },
        { threshold: [0, 0.1, 0.3, 0.6], rootMargin: '-16% 0px -56% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [active]);

  const close = useCallback(() => {
    setOpen(false);
    unlockBody();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') close();
    },
    [open, close]
  );

  useEffect(() => {
    if (open) lockBody();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockBody();
    };
  }, [open, handleKeyDown]);

  const onNavigate = useCallback(
    (href: string, id?: string) => {
      close();
      if (href.startsWith('#') && id) {
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [reduce, close]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="editorial-container flex h-[3.75rem] items-center justify-between gap-6">
        <Link href="/" className="meta-text !text-[var(--text-primary)] tracking-[0.12em] hover:text-[var(--accent)] transition-colors" aria-label="Ark Tandon home">
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
                  className={`relative meta-text transition-colors hover:text-[var(--text-primary)] ${isActive ? 'text-[var(--text-primary)]' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-[var(--accent)]" />
                  )}
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
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[var(--nav-bg)] border-b border-[var(--nav-border)] backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-sm text-[var(--text-primary)]"
            aria-label="Mobile menu"
          >
            <div className="editorial-container flex flex-col h-full py-6 md:py-8">
              <div className="flex items-center justify-between py-4 mb-8 border-b border-[var(--nav-border)]">
                <Link href="/" className="meta-text !text-[var(--text-primary)] tracking-[0.12em] font-semibold">
                  ARK TANDON
                </Link>
                <button type="button" onClick={close} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]" aria-label="Close menu">
                  <X size={17} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isSection = item.href.startsWith('#');
                  const isActive = isSection && active === item.id;
                  return isSection ? (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.href, item.id)}
                        className={`flex items-center gap-2 py-3.5 text-left transition-colors rounded-md ${isActive ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]'}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </button>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={close}
                        className={`flex items-center gap-2 py-3.5 text-left transition-colors rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto pt-6 border-t border-[var(--nav-border)]">
                <button type="button" onClick={toggleTheme} className="flex items-center gap-2 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {theme === 'dark' ? <Sun size={14} strokeWidth={1.5} aria-hidden /> : <Moon size={14} strokeWidth={1.5} aria-hidden />}
                  <span className="meta-text">Switch theme</span>
                </button>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
