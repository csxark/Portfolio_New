'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Award, Trophy, Calendar } from 'lucide-react';
import achievementsData from './achievements.json';
import CertModal from '@/components/cert-modal';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  type: 'certification' | 'award';
}

export default function Awards() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = [...(achievementsData as Achievement[])].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setAchievements(data);
  }, []);

  const certifications = useMemo(() => achievements.filter((a) => a.type === 'certification'), [achievements]);
  const awards = useMemo(() => achievements.filter((a) => a.type === 'award'), [achievements]);

  const onOpen = (item: Achievement) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <header className="border-b border-[var(--border)]">
        <div className="editorial-container flex items-center justify-between py-5">
          <Link href="/" className="inline-flex items-center gap-2 meta-text editorial-link">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden /> Back to portfolio
          </Link>
          <span className="meta-text uppercase tracking-[0.12em]">Awards &amp; Certifications</span>
        </div>
      </header>
      <main className="editorial-container py-[clamp(3rem,6vw,5rem)]">
        <p className="section-overline">Record</p>
        <h1 className="section-title">Awards &amp; certifications</h1>
        <p className="section-intro">Certifications, program participation, and recognitions. Select an item for details.</p>

        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <div className="mb-6 flex items-center gap-2 meta-text uppercase tracking-[0.12em] text-[var(--text-primary)]"><Award size={14} strokeWidth={1.5} aria-hidden /> Certifications</div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item) => (
              <button key={item.id} type="button" onClick={() => onOpen(item)} className="group border border-[var(--border)] bg-[var(--bg)] text-left transition-colors hover:border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border))]">
                <div className="relative aspect-[16/10] border-b border-[var(--border)] bg-[var(--surface)]">
                  <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.015]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                </div>
                <div className="p-4">
                  <h2 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 text-[0.875rem] leading-[1.65] text-[var(--text-muted)]">{item.description}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 meta-text"><Calendar size={12} strokeWidth={1.5} aria-hidden /> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <div className="mb-6 flex items-center gap-2 meta-text uppercase tracking-[0.12em] text-[var(--text-primary)]"><Trophy size={14} strokeWidth={1.5} aria-hidden /> Awards &amp; recognitions</div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((item) => (
              <button key={item.id} type="button" onClick={() => onOpen(item)} className="group border border-[var(--border)] bg-[var(--bg)] text-left transition-colors hover:border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border))]">
                <div className="relative aspect-[16/10] border-b border-[var(--border)] bg-[var(--surface)]">
                  <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.015]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                </div>
                <div className="p-4">
                  <h2 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 text-[0.875rem] leading-[1.65] text-[var(--text-muted)]">{item.description}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 meta-text"><Calendar size={12} strokeWidth={1.5} aria-hidden /> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
      <CertModal open={open} onClose={() => { setOpen(false); setTimeout(() => setSelected(null), 150); }} achievement={selected} />
    </div>
  );
}
