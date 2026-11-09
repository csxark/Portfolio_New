import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Toolkit from '@/components/sections/Toolkit';
import Experience from '@/components/sections/Experience';
import OpenSource from '@/components/sections/OpenSource';
import CurrentlyBuilding from '@/components/sections/CurrentlyBuilding';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-[var(--border)] focus:bg-transparent focus:px-3 focus:py-2 focus:text-[var(--text-primary)]">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Toolkit />
        <Experience />
        <OpenSource />
        <CurrentlyBuilding />
        <Contact />
      </main>
      <footer className="border-t border-[var(--border)]">
        <div className="editorial-container flex flex-wrap items-center justify-between gap-3 py-7">
          <p className="meta-text">Ark Tandon</p>
          <p className="meta-text">Built with Next.js &amp; TypeScript</p>
        </div>
      </footer>
    </>
  );
}

