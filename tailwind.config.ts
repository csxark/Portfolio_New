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
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: '#F5F3EE',
        surface: '#EEECE6',
        accent: '#B65332',
        'accent-hover': '#913F26',
        'accent-soft': '#F0E0D7',
        'text-primary': '#171717',
        'text-muted': '#6C6963',
        border: '#D9D6CF',
      },
    },
  },
  plugins: [],
};

export default config;
export type { Config };
