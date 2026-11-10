'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createElement, type ElementType } from 'react';
import { cn } from '@/lib/utils';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

const POOLS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
};

function pick(s: string): string {
  return s.charAt(Math.floor(Math.random() * s.length));
}

function randomLike(ch: string): string {
  if (!ch || !ch.trim()) return ch;
  if (/[,.!?;:\u060c\u061b\u061f\u002d\u2013\u2014\u0027\u0022\u201c\u201d]/.test(ch)) return ch;
  if (/[A-Z]/.test(ch)) return pick(POOLS.upper);
  if (/[a-z]/.test(ch)) return pick(POOLS.lower);
  if (/[0-9]/.test(ch)) return pick(POOLS.digits);
  return ch;
}

function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text), (segment) => segment.segment);
  }
  return Array.from(text);
}

function getRanks(n: number, order: string): number[] {
  const idx = Array.from({ length: n }, (_, index) => index);
  if (order === 'end') return idx.map((index) => n - 1 - index);
  if (order === 'center') {
    const center = (n - 1) / 2;
    return idx.map((index) => Math.abs(index - center));
  }
  return idx;
}

interface AnimatedTextRotatorProps {
  text: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  stagger?: number;
  order?: 'start' | 'end' | 'center';
}

export default function AnimatedTextRotator({
  text = '',
  as = 'div',
  className,
  duration = 0.45,
  stagger = 0.06,
  order = 'start',
}: AnimatedTextRotatorProps) {
  const reduce = useSafeReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    setMounted(true);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pieces = useMemo(() => splitGraphemes(text), [text]);
  const ranks = useMemo(() => getRanks(pieces.length, order), [pieces.length, order]);
  const maxRank = Math.max(0, ...ranks);
  const enterTotal = maxRank * stagger * 0.4 + duration * 0.5 + maxRank * stagger;

  useEffect(() => {
    startTimeRef.current = performance.now();
    const tick = (now: number) => {
      const e = (now - startTimeRef.current!) / 1000;
      setElapsed(e);
      if (e < enterTotal + 0.05) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [enterTotal]);

  if (!mounted || reduce || pieces.length === 0) {
    return createElement(Tag, { className }, text);
  }

  return (
    <Tag className={cn(className)} style={{ display: 'inline-flex', whiteSpace: 'pre' }}>
      <span className="sr-only">{text}</span>
      {pieces.map((piece, index) => {
        const start = ranks[index] * stagger * 0.4;
        const settle = duration * 0.5 + ranks[index] * stagger;
        const char = elapsed >= settle ? piece : elapsed >= start ? randomLike(piece) : '';
        return (
          <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }} aria-hidden="true">
            {char}
          </span>
        );
      })}
    </Tag>
  );
}
