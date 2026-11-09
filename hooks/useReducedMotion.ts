'use client';

import { useSafeReducedMotion } from './useSafeReducedMotion';

export function useReducedMotion(): boolean {
  return useSafeReducedMotion();
}
