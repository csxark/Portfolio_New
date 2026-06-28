'use client';

import { profileMetadata } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t border-[var(--border)] py-12 px-6 sm:px-12 select-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="font-display text-xl font-normal text-white">
          ark<span className="text-[var(--accent-gold)]">.</span>
        </div>

        {/* Info */}
        <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider text-center sm:text-right">
          © {currentYear} {profileMetadata.name}. Designed & Built with Next.js 15 & Tailwind CSS v4.
        </p>
      </div>
    </footer>
  );
}
