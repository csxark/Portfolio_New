import './globals.css';
import type { Metadata } from 'next';
import { Geist, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-context';
import { Background } from '@/components/background';

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
  description: 'Developer portfolio - projects, experience, open source, and technical toolkit.',
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = (stored === 'light' || stored === 'dark') ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased bg-transparent text-[var(--text-primary)]">
        <ThemeProvider>
          <Background />
          <div className="relative z-0">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}


