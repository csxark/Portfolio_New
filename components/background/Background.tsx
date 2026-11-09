'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePageVisible } from '@/hooks/usePageVisible';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';
import { hasWebGL } from '@/lib/webgl';
import { ShaderErrorBoundary } from './ShaderErrorBoundary';
import { DARK_PALETTE, LIGHT_PALETTE } from './ShaderLayer';

const ShaderLayer = dynamic(() => import('./ShaderLayer'), { ssr: false });

const DESKTOP_DENSITY = 1;
const MOBILE_DENSITY = 0.6;
const SHADER_SPEED = { dark: 0.04, light: 0.025 } as const;

/**
 * Fixed page background (adapted from Aditya-J/Aditya-J src/components/Background).
 * Layers, bottom to top:
 * 1. static theme-aware CSS base + subtle glow fallback (always present)
 * 2. ShaderGradient WebGL layer (client-only, lazy, paused when hidden/reduced motion)
 *    - light mode: low opacity (var --shader-opacity) so base remains dominant
 * 3. theme-aware atmospheric veil for text readability
 * 4. existing portfolio content renders above this component
 */
function BackgroundImpl() {
  const [webgl, setWebgl] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px), (pointer: coarse)');
  const visible = usePageVisible();
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) setWebgl(hasWebGL());
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number; cancelIdleCallback: (id: number) => void }).requestIdleCallback(start, { timeout: 1200 });
      return () => {
        cancelled = true;
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      };
    }
    const t = globalThis.setTimeout(start, 300);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);


  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 min-h-[100lvh] w-screen overflow-hidden bg-[var(--bg-base)]"
    >
      {/* Layer 1: static theme-aware base + subtle fallback glows (always present) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(60% 52% at 16% 28%, var(--bg-glow-1), transparent 72%),' +
            'radial-gradient(52% 46% at 84% 64%, var(--bg-glow-2), transparent 72%),' +
            'radial-gradient(56% 52% at 54% 96%, var(--bg-glow-3), transparent 74%),' +
            'linear-gradient(180deg, var(--bg-base), var(--bg-base))',
        }}
      />

      {/* Layer 2: WebGL shader - opacity controlled per theme (light stays subtle) */}
      {webgl ? (
        <div
          className="absolute inset-0 animate-[shader-fade_1.2s_ease-out_both]"
          style={{ opacity: 'var(--shader-opacity)' }}
        >
          <ShaderErrorBoundary>
            <ShaderLayer
              pixelDensity={isMobile ? MOBILE_DENSITY : DESKTOP_DENSITY}
              animate={visible && !reduced}
              speed={SHADER_SPEED[theme]}
              palette={theme === 'light' ? LIGHT_PALETTE : DARK_PALETTE}
            />
          </ShaderErrorBoundary>
        </div>
      ) : null}

      {/* Layer 3: atmospheric veil - keeps base dominant and text readable */}
      <div className="absolute inset-0 bg-[var(--bg-overlay)] transition-colors duration-500" />
    </div>
  );
}

export const Background = memo(BackgroundImpl);
export default Background;

