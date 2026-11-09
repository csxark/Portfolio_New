'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { createElement, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';
import { fadeUpVariant, viewportOnce } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
  amount?: number;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y,
  as = 'div',
  amount,
}: RevealProps) {
  const shouldReduce = useSafeReducedMotion();
  const Tag = as as 'div';

  if (shouldReduce) {
    return createElement(Tag, { className }, children);
  }

  const MotionTag = (motion[Tag as keyof typeof motion] ?? motion.div) as ElementType<
    HTMLMotionProps<'div'>
  >;
  const viewport = amount == null ? viewportOnce : { ...viewportOnce, amount };

  return (
    <MotionTag
      className={cn(className)}
      variants={fadeUpVariant(y, undefined, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </MotionTag>
  );
}
