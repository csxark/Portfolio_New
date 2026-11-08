'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar } from 'lucide-react';

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
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !achievement) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={achievement.title} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--text-primary)_18%,transparent)]" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-4xl border border-[var(--border)] bg-[var(--bg)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-5">
          <div>
            <p className="meta-text uppercase tracking-[0.12em]">{achievement.type}</p>
            <h3 className="mt-1.5 text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{achievement.title}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="border border-[var(--border)] p-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-2">
          <div className="relative aspect-[4/3] border border-[var(--border)] bg-[var(--surface)]">
            <Image src={achievement.image_url} alt={achievement.title} fill className="object-contain p-3" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
          <div>
            <p className="text-[0.9375rem] leading-[1.75] text-[var(--text-primary)] whitespace-pre-line">{achievement.description}</p>
            <p className="mt-6 inline-flex items-center gap-2 meta-text"><Calendar size={14} strokeWidth={1.5} aria-hidden /> {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
