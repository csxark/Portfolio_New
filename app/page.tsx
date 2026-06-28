import Sidebar from '@/components/layout/Sidebar';
import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import Projects from '@/components/sections/Projects';
import Stack from '@/components/sections/Stack';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      {/* Accessibility Skip-Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--accent)] focus:text-black focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs border-2 border-black"
      >
        Skip to main content
      </a>

      {/* Grid Layout Shell */}
      <div className="min-h-screen w-full relative grid grid-cols-1 md:grid-cols-[64px_1fr] bg-transparent">
        {/* Left rail / mobile bottom bar */}
        <Sidebar />

        {/* Main Content Area */}
        <main id="main-content" className="w-full min-w-0 pb-16 md:pb-0" tabIndex={-1}>
          <Hero />
          <Work />
          <Projects />
          <Stack />
          <Education />
          <Contact />
        </main>
      </div>
    </>
  );
}