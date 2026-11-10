'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Award, Trophy, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import achievementsData from './achievements.json';
import CertModal from '@/components/cert-modal';
import Reveal from '@/components/ui/Reveal';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  type: 'certification' | 'award';
}

function AchievementRow({
  item,
  index,
  reduce,
  onOpen,
}: {
  item: Achievement;
  index: number;
  reduce: boolean;
  onOpen: (item: Achievement) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View details for ${item.title}`}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : Math.min(index, 6) * 0.04,
        ease: [0.25, 1, 0.5, 1],
      }}
      whileHover={reduce ? undefined : { x: 4 }}
      className="group flex items-start gap-5 border-t border-[var(--border)] py-6 first:border-t-0 text-left md:gap-8"
    >
      <span className="meta-text shrink-0 tabular-nums text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]">
        {String(index + 1).padStart(2, '0')} /
      </span>
      <div className="relative aspect-[16/10] w-32 shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--surface-subtle)] sm:w-40 md:w-48">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 768px) 160px, (min-width: 640px) 128px, 128px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]">
          {item.description}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 meta-text">
          <Calendar size={12} strokeWidth={1.5} aria-hidden />
          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </p>
      </div>
    </motion.button>
  );
}

export default function Awards() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useSafeReducedMotion();

  useEffect(() => {
    const data = [...(achievementsData as Achievement[])].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setAchievements(data);
  }, []);

  const certifications = useMemo(
    () => achievements.filter((a) => a.type === 'certification'),
    [achievements]
  );
  const awards = useMemo(() => achievements.filter((a) => a.type === 'award'), [achievements]);

  const onOpen = (item: Achievement) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <header className="border-b border-[var(--border)]">
        <div className="editorial-container flex items-center justify-between py-5">
          <Link href="/" className="inline-flex items-center gap-2 meta-text editorial-link">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden /> Back to portfolio
          </Link>
          <span className="meta-text uppercase tracking-[0.12em]">Awards &amp; Certifications</span>
        </div>
      </header>
      <main className="editorial-container py-[clamp(3rem,6vw,5rem)]">
        <Reveal>
          <p className="section-overline">Record</p>
          <h1 className="section-title">Awards &amp; certifications</h1>
          <p className="section-intro">Certifications, program participation, and recognitions. Select an item for details.</p>
        </Reveal>

        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-2 meta-text uppercase tracking-[0.12em] text-[var(--text-primary)]">
              <Award size={14} strokeWidth={1.5} aria-hidden /> Certifications
            </div>
          </Reveal>
          <div className="space-y-0">
            {certifications.map((item, index) => (
              <AchievementRow key={item.id} item={item} index={index} reduce={reduce} onOpen={onOpen} />
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-2 meta-text uppercase tracking-[0.12em] text-[var(--text-primary)]">
              <Trophy size={14} strokeWidth={1.5} aria-hidden /> Awards &amp; recognitions
            </div>
          </Reveal>
          <div className="space-y-0">
            {awards.map((item, index) => (
              <AchievementRow key={item.id} item={item} index={index} reduce={reduce} onOpen={onOpen} />
            ))}
          </div>
        </section>
      </main>
      <CertModal
        open={open}
        onClose={() => {
          setOpen(false);
          setTimeout(() => setSelected(null), 300);
        }}
        achievement={selected}
      />
    </div>
  );
}
