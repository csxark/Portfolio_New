import type { Transition, Variants } from 'framer-motion';

export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const MOTION = {
  duration: {
    fast: 0.55,
    base: 0.62,
    slow: 0.7,
  },
  y: 20,
  ySmall: 18,
  stagger: {
    children: 0.055,
    group: 0.07,
    word: 0.042,
  },
} as const;

export const viewportOnce = {
  once: true,
  amount: 0.18,
  margin: '-60px',
} as const;

export function revealTransition(
  duration: number = MOTION.duration.base,
  delay = 0,
): Transition {
  return {
    duration,
    delay,
    ease: EASE_OUT_QUART,
  };
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: MOTION.y },
  show: (custom?: { delay?: number; duration?: number; y?: number }) => ({
    opacity: 1,
    y: 0,
    transition: revealTransition(custom?.duration ?? MOTION.duration.base, custom?.delay ?? 0),
  }),
};

export function fadeUpVariant(
  y: number = MOTION.y,
  duration: number = MOTION.duration.base,
  delay: number = 0,
): Variants {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: revealTransition(duration, delay),
    },
  };
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    transition: revealTransition(custom?.duration ?? MOTION.duration.base, custom?.delay ?? 0),
  }),
};

export function staggerContainer(
  delayChildren = 0,
  staggerChildren: number = MOTION.stagger.children,
): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: MOTION.ySmall },
  show: {
    opacity: 1,
    y: 0,
    transition: revealTransition(MOTION.duration.fast),
  },
};

export function staggerItemVariant(
  y = MOTION.ySmall,
  duration = MOTION.duration.base,
): Variants {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: revealTransition(duration),
    },
  };
}
