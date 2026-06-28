'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import PreviewFallback from './PreviewFallback';
import { useSafeReducedMotion } from '@/hooks/useSafeReducedMotion';

interface CRTPreviewProps {
  url: string;
  isHovered: boolean;
  terminalLabel: string;
}

export default function CRTPreview({ url, isHovered, terminalLabel }: CRTPreviewProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  
  // States: 'idle' | 'booting' | 'scanning' | 'live' | 'error'
  const [bootState, setBootState] = useState<'idle' | 'booting' | 'scanning' | 'live' | 'error'>('idle');
  const [typewriterText, setTypewriterText] = useState('');
  const [useScreenshotFallback, setUseScreenshotFallback] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  // Known Vercel iframe blocks framing due to X-Frame-Options: DENY
  const isBlockedDomain = url.includes('finlo-theta.vercel.app');
  const targetText = '> LOADING TERMINAL SPECIMEN...';

  // Trigger boot sequence when visible in viewport or hovered
  const shouldBoot = isInView || isHovered;

  // Typewriter effect sequence
  useEffect(() => {
    if (bootState !== 'booting') return;

    let idx = 0;
    setTypewriterText('');
    const fontInterval = setInterval(() => {
      if (idx < targetText.length) {
        setTypewriterText((prev) => prev + targetText.charAt(idx));
        idx++;
      } else {
        clearInterval(fontInterval);
      }
    }, 12);

    return () => clearInterval(fontInterval);
  }, [bootState]);

  // Main sequencer useEffect with full cleanup
  useEffect(() => {
    if (!shouldBoot) return;
    if (bootState !== 'idle') return;

    // Reduced motion bypass
    if (shouldReduceMotion) {
      const motionTimeout = setTimeout(() => {
        if (isBlockedDomain) {
          setUseScreenshotFallback(true);
        }
        setBootState('live');
      }, 100);
      return () => clearTimeout(motionTimeout);
    }

    // Phase 1: Booting Typewriter
    setBootState('booting');

    // Phase 2: Scanning Sweep at 400ms
    const scanTimeout = setTimeout(() => {
      if (isBlockedDomain) {
        setUseScreenshotFallback(true);
        setBootState('scanning');
      } else {
        setBootState('scanning');
      }
    }, 400);

    // Phase 3: Live iframe at 900ms (500ms sweep duration)
    const liveTimeout = setTimeout(() => {
      setBootState('live');
    }, 900);

    // Watchdog safety backup: if iframe load event hasn't fired in 8000ms, fallback to screenshot
    const watchdogTimeout = setTimeout(() => {
      if (!iframeLoaded && !isBlockedDomain) {
        setUseScreenshotFallback(true);
      }
    }, 8000);

    return () => {
      clearTimeout(scanTimeout);
      clearTimeout(liveTimeout);
      clearTimeout(watchdogTimeout);
    };
  }, [shouldBoot, bootState, isBlockedDomain, iframeLoaded, shouldReduceMotion]);

  const displayUrl = url.replace(/^https?:\/\//, '').substring(0, 24);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setUseScreenshotFallback(true);
  };

  return (
    <div
      ref={containerRef}
      className="crt-container relative w-full aspect-video overflow-hidden bg-[#050805]"
      style={{
        border: '2px solid rgba(200, 240, 77, 0.25)'
      }}
    >
      {/* Corner notch labels */}
      <div className="absolute top-2 left-3 text-[9px] text-[#5A6F20] tracking-wider uppercase font-mono z-20">
        {terminalLabel}
      </div>
      <div className="absolute bottom-2 right-3 text-[9px] text-[#5A6F20] tracking-wider font-mono z-20">
        {displayUrl}
      </div>

      {/* Pulsing Live indicator */}
      {bootState === 'live' && (
        <div className="absolute top-2 right-3 flex items-center gap-1.5 z-20 bg-[#0C0C0A]/70 px-2 py-0.5 border border-[#C8F04D]/25 rounded-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8F04D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C8F04D]"></span>
          </span>
          <span className="font-mono text-[9px] text-[#C8F04D] uppercase tracking-wider font-semibold">● LIVE</span>
        </div>
      )}

      {/* Phase 1: Blinking cursor shell */}
      {bootState === 'booting' && (
        <div className="absolute inset-0 bg-[#050805] text-[#C8F04D] p-6 font-mono text-xs flex flex-col justify-start items-start gap-1 z-15">
          <p className="font-mono">{typewriterText}</p>
          <div className="flex items-center gap-1">
            <span className="text-[#5A6F20] font-mono">SYS_STATUS:</span>
            <span className="crt-cursor" />
          </div>
        </div>
      )}

      {/* Phase 2: Scanning Sweep overlay scanline */}
      {bootState === 'scanning' && (
        <div className="absolute inset-0 bg-[#050805] flex flex-col items-center justify-center font-mono text-[#C8F04D] text-xs z-15 gap-2">
          <p className="animate-pulse font-mono uppercase tracking-widest text-[10px]">CONNECTING SPECIMEN PORT...</p>
          <div className="crt-scanline" />
        </div>
      )}

      {/* Phase 3: Live specimen viewport */}
      <div
        className="w-[200%] h-[200%] absolute top-0 left-0 origin-top-left transition-opacity duration-500"
        style={{
          transform: 'scale(0.5)',
          opacity: bootState === 'live' ? 1 : 0,
          pointerEvents: 'none'
        }}
      >
        {useScreenshotFallback ? (
          <img
            src={`https://image.thum.io/get/width/800/crop/450/${url}`}
            alt={`Live screenshot specimen of ${terminalLabel}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setBootState('error')}
          />
        ) : (
          <iframe
            src={url}
            className="w-full h-full border-none bg-black"
            sandbox="allow-scripts allow-same-origin"
            title={`Live preview of ${terminalLabel}`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </div>

      {/* Continuous phosphor scanline sweep overlay */}
      {bootState === 'live' && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(rgba(200, 240, 77, 0.05) 0px, rgba(200, 240, 77, 0.05) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px'
          }}
        />
      )}
    </div>
  );
}
