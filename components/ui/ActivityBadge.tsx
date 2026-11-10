'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { createElement, type ElementType } from 'react';
import { cn } from '@/lib/utils';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';
import { EASE_OUT_QUART } from '@/lib/motion';

type ActivityStatus = 'available' | 'busy' | 'unavailable' | 'collabs';

const STATUS_CONFIG: Record<ActivityStatus, { label: string; color: string }> = {
  available: { label: 'Available to work', color: '#22C55E' },
  busy: { label: 'Busy right now', color: '#F59E0B' },
  unavailable: { label: 'Unavailable', color: '#EF4444' },
  collabs: { label: 'Open for collabs', color: '#1689D4' },
};

interface ActivityBadgeProps {
  label?: string;
  status?: ActivityStatus;
  as?: ElementType;
  className?: string;
}

export default function ActivityBadge({
  label,
  status = 'available',
  as = 'div',
  className,
}: ActivityBadgeProps) {
  const reduce = useSafeReducedMotion();
  const Tag = as as ElementType;
  const MotionTag = (motion[Tag as keyof typeof motion] ?? motion.div) as ElementType<
    HTMLMotionProps<'div'>
  >;

  const { label: statusLabel, color } = STATUS_CONFIG[status];
  const text = label ?? statusLabel;

  const container = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: EASE_OUT_QUART },
      };

  const dot = reduce
    ? { scale: 1, opacity: 1 }
    : { scale: 1, opacity: 1 };
  const dotTransition = reduce
    ? undefined
    : { duration: 0.4, delay: 0.1, ease: EASE_OUT_QUART };

  const glow = reduce
    ? { opacity: 0, scale: 1 }
    : {
        opacity: [0, 0.5, 0],
        scale: [1, 1.35, 1],
      };
  const glowTransition = reduce
    ? undefined
    : { duration: 2, repeat: Infinity, delay: 0.2, ease: EASE_OUT_QUART };

  return (
    <MotionTag
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-3 py-1.5 backdrop-blur-md',
        className,
      )}
      role="img"
      aria-label={text}
      {...container}
    >
      <div className="relative h-2 w-2 z-10">
        <motion.div
          className="absolute inset-0 rounded-full z-0 pointer-events-none"
          style={{ backgroundColor: color, filter: 'blur(1px)' }}
          initial={{ opacity: 0, scale: 1 }}
          animate={glow}
          transition={glowTransition}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0 rounded-full z-10"
          style={{ backgroundColor: color }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={dot}
          transition={dotTransition}
          aria-hidden="true"
        />
      </div>
      <span className="text-[0.8125rem] font-semibold leading-none text-[var(--text-primary)]">
        {text}
      </span>
    </MotionTag>
  );
}
