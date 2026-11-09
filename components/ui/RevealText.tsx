'use client';

import { motion } from 'framer-motion';
import { createElement, type ElementType } from 'react';
import { cn } from '@/lib/utils';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';
import { EASE_OUT_QUART, MOTION, viewportOnce } from '@/lib/motion';

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  immediate?: boolean;
}

export default function RevealText({
  text,
  as = 'p',
  className,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const shouldReduce = useSafeReducedMotion();
  const Tag = as;

  if (shouldReduce) {
    return createElement(Tag, { className }, text);
  }

  const tokens = text.split(/(\s+)/).filter((token) => token.length > 0);
  const wordIndices: Array<number | undefined> = [];
  let wordCount = 0;
  for (const token of tokens) {
    if (/^\s+$/.test(token)) {
      wordIndices.push(undefined);
    } else {
      wordIndices.push(wordCount);
      wordCount += 1;
    }
  }

  const MotionTag = (motion[Tag as keyof typeof motion] ?? motion.p) as ElementType;
  const animateProps = immediate
    ? { initial: 'hidden' as const, animate: 'show' as const }
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: viewportOnce };

  return (
    <MotionTag className={cn(className)} {...animateProps}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map((token, index) => {
          if (/^\s+$/.test(token)) {
            return <span key={`space-${index}`}>{token}</span>;
          }

          const current = wordIndices[index]!;

          return (
            <span
              key={`word-${index}-${token}`}
              className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-top"
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '105%' },
                  show: { y: '0%' },
                }}
                transition={{
                  duration: 0.68,
                  delay: delay + current * MOTION.stagger.word,
                  ease: EASE_OUT_QUART,
                }}
              >
                {token}
              </motion.span>
            </span>
          );
        })}
      </span>
    </MotionTag>
  );
}