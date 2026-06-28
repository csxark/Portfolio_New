import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'system-ui', 'sans-serif'],
        heading: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
        body: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      colors: {
        bg: '#0C0C0A',
        surface: '#131310',
        'surface-raised': '#1A1A16',
        accent: '#C8F04D',
        'accent-dim': 'rgba(200, 240, 77, 0.12)',
        'text-primary': '#E8E6DC',
        'text-muted': '#5A5A50',
      }
    },
  },
  plugins: [],
};

export default config;
export type { Config };
