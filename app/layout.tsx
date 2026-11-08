import './globals.css';
import type { Metadata } from 'next';
import { Geist, IBM_Plex_Mono } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ark Tandon | Developer Portfolio',
  description: 'Developer portfolio — projects, experience, open source, and technical toolkit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased bg-[var(--bg)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
