'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileMetadata } from '@/lib/data';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll active section tracking with IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];
    const activeObservers: { observer: IntersectionObserver; el: HTMLElement }[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      activeObservers.push({ observer, el });
    });

    return () => {
      activeObservers.forEach(({ observer, el }) => {
        observer.unobserve(el);
        observer.disconnect();
      });
    };
  }, []);

  const handleScroll = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const githubLink = profileMetadata.socials.find(s => s.platform === 'github')?.url || '#';
  const linkedinLink = profileMetadata.socials.find(s => s.platform === 'linkedin')?.url || '#';
  const xLink = profileMetadata.socials.find(s => s.platform === 'x')?.url || '#';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border)] z-50 flex items-center justify-between px-6 sm:px-12 select-none">
        {/* Logo */}
        <div
          onClick={() => handleScroll('home')}
          className="cursor-pointer font-display text-2xl font-normal text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
          tabIndex={0}
          role="button"
          aria-label="Scroll back to top"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScroll('home');
            }
          }}
        >
          ark<span className="text-[var(--accent-gold)]">.</span>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-md px-1`}
              aria-current={activeSection === item.id ? 'page' : undefined}
              aria-label={`Navigate to ${item.label} section`}
              style={{
                color: activeSection === item.id ? 'var(--accent-gold)' : 'var(--text-muted)'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-5 text-[var(--text-muted)]">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-md p-0.5"
            aria-label="Visit Ark's Github profile"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-md p-0.5"
            aria-label="Visit Ark's LinkedIn profile"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a
            href={xLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-md p-0.5"
            aria-label="Visit Ark's X profile"
          >
            <Twitter className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Mobile Hamburger button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-md"
          aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Slide-Down Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border)] z-45 md:hidden flex flex-col p-6 gap-6 font-mono text-sm tracking-widest text-center shadow-2xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`py-2 border-b border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                aria-label={`Navigate to ${item.label} section`}
                style={{
                  color: activeSection === item.id ? 'var(--accent-gold)' : 'var(--text-muted)'
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Social Icons (Mobile Drawer) */}
            <div className="flex justify-center gap-8 py-2 text-[var(--text-muted)] border-t border-white/5 pt-4 mt-2">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
                aria-label="Visit Ark's Github profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
                aria-label="Visit Ark's LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={xLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
                aria-label="Visit Ark's X profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
