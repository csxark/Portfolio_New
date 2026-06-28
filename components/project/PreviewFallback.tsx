'use client';

interface PreviewFallbackProps {
  url: string;
}

export default function PreviewFallback({ url }: PreviewFallbackProps) {
  // Truncate URL if too long
  const displayUrl = url.replace(/^https?:\/\//, '').substring(0, 26) + (url.replace(/^https?:\/\//, '').length > 26 ? '...' : '');

  return (
    <div 
      className="absolute inset-0 bg-[#060805] text-[#A6D63E] p-6 font-mono text-xs flex flex-col justify-between select-none"
      style={{
        border: '2px solid rgba(200, 240, 77, 0.25)',
        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
      }}
    >
      {/* Top corner notch metadata labels */}
      <div className="absolute top-2 left-3 text-[9px] text-[#5A6F20] tracking-wider uppercase font-mono">
        FALLBACK_MODE
      </div>
      <div className="absolute bottom-2 right-3 text-[9px] text-[#5A6F20] tracking-wider font-mono">
        {displayUrl}
      </div>

      {/* Terminal log contents */}
      <div className="space-y-4 mt-6">
        <div className="space-y-1">
          <p className="text-[#5A6F20] font-mono">// ERROR LOG CODE: 403_X_FRAME</p>
          <p className="text-red-500 font-mono">X-FRAME-OPTIONS: DENY</p>
          <p className="text-[#5A6F20] font-mono">// Live framing blocked by security policy.</p>
        </div>

        <div className="space-y-2">
          <p className="text-[#A6D63E] font-mono">
            <span className="text-[#C8F04D] mr-1.5">&gt;</span>PREVIEW UNAVAILABLE
          </p>
          <p className="text-[#5A6F20] font-mono">
            To view this specimen directly, execute open link command below:
          </p>
        </div>

        <div className="pt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C8F04D]/10 hover:bg-[#C8F04D] hover:text-[#0C0C0A] text-[#C8F04D] border border-[#C8F04D]/30 hover:border-transparent transition-all duration-200"
            aria-label={`Open ${url} in a new window`}
          >
            <span>↗ OPEN IN NEW TAB</span>
          </a>
        </div>
      </div>

      {/* Blinking cursor at bottom */}
      <div className="flex items-center gap-1.5 mt-auto">
        <span className="text-[#5A6F20] font-mono">SECURE_SHELL:</span>
        <span className="crt-cursor" />
      </div>
    </div>
  );
}
