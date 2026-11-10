'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  type: 'certification' | 'award';
}

interface CertModalProps {
  open: boolean;
  onClose: () => void;
  achievement?: Achievement | null;
}

export default function CertModal({ open, onClose, achievement }: CertModalProps) {
  const reduce = useSafeReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    const raf = requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      previouslyFocused.current?.focus?.();
    };
  }, [open, achievement]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    function trapTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener('keydown', trapTab);
    return () => window.removeEventListener('keydown', trapTab);
  }, [open]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={achievement.title}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 outline-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--text-primary)_18%,transparent)] backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 w-full max-w-4xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-5">
              <div>
                <p className="meta-text uppercase tracking-[0.12em] text-[var(--text-muted)]">{achievement.type}</p>
                <h3 className="mt-1.5 text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{achievement.title}</h3>
              </div>
              <button type="button" onClick={onClose} aria-label="Close dialog" className="inline-flex items-center justify-center border border-[var(--border)] p-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
                <X size={16} strokeWidth={1.5} aria-hidden />
              </button>
            </div>
            <div className="grid gap-6 p-5 md:grid-cols-2">
              <div className="relative aspect-[4/3] border border-[var(--border)] bg-[var(--surface-subtle)]">
                <Image src={achievement.image_url} alt={achievement.title} fill className="object-contain p-3" sizes="(min-width: 768px) 45vw, 100vw" />
              </div>
              <div className="flex flex-col">
                <p className="text-[0.9375rem] leading-[1.75] text-[var(--text-primary)] whitespace-pre-line">{achievement.description}</p>
                <p className="mt-6 inline-flex items-center gap-2 meta-text">
                  <Calendar size={14} strokeWidth={1.5} aria-hidden />
                  {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
