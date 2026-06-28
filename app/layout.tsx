import './globals.css';
import type { Metadata } from 'next';
import { Bebas_Neue, Crimson_Pro, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-context';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ark Tandon | Developer Portfolio',
  description: 'Web Developer crafting scalable, human-centered digital experiences. Specializing in Data and Generative AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${bebasNeue.variable} ${crimsonPro.variable} ${ibmPlexMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
      suppressHydrationWarning
    >
      <body 
        className="antialiased bg-[#0C0C0A] text-[#E8E6DC]" 
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
