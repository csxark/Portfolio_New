'use client';

import { Github, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-white to-slate-100 dark:from-black dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <header className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I&apos;m Ark Tandon
              {/* <span className="inline-block animate-wave">👋</span> */}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-md leading-relaxed mx-auto md:mx-0">
              Frontend Developer passionate about crafting scalable and human-centered digital experiences.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 relative rounded-full overflow-hidden">
              <Image
                src="/images/profile/main.webp"
                alt="Profile"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 256px, 320px"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
             I&apos;m a passionate Frontend Developer and Computer Science student at Manipal University Jaipur, dedicated to building modern, scalable, and user-friendly web applications.
             With hands-on experience in React, TypeScript, and TailwindCSS, I focus on creating clean, accessible, and responsive interfaces that enhance user experience and performance.

             Beyond coding, I enjoy exploring innovative ideas, collaborating on impactful projects, and continuously learning to improve both technically and creatively. I take pride in contributing to the developer community through open-source work, hackathons, and mentorship.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/images/experience/LearnIT.svg" alt="LearnIT" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-semibold">LearnIT</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Senior Coordinator - Web Developer</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">May 2025 - Present</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="" alt="gssoc" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-semibold">GSsoc</h3>
                    <p className="text-slate-400 text-sm">Open Source Contributor in UI/UX</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">July 2025 - October 2025</span>
                </div>
              </div>
            </div>

           

            

          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-base font-semibold">Manipal University Jaipur</h3>
                  <p className="text-slate-400 text-sm">Bachelor of Technology in Computer Science and Engineering</p>
                </div>
                <span className="text-xs text-slate-500">2024 - 2028</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">React</Badge>
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">Next.js</Badge>
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">TypeScript</Badge>
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">Node.js</Badge>
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">Python</Badge>
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">C</Badge>
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">MySQL</Badge>
            <Badge variant="secondary" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-3 py-1 text-xs font-normal">MongoDB</Badge>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <p className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-2">My Projects</p>
            <h2 className="text-4xl font-bold">Check out my latest work</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4">
              I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-cyan-500 dark:hover:border-slate-700 transition-colors">
              <h3 className="text-2xl font-bold mb-2">HopeFlow</h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">2025</p>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                It is an interactive web platform designed to provide empathetic emotional support through real-time voice and text conversations. The platform focuses on accessibility, privacy, and cultural sensitivity, featuring secure data handling, multi-modal UI, and crisis detection to offer a personalized and trustworthy user experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 px-3 py-1">React</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 px-3 py-1">Tailwind CSS</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 px-3 py-1">SupaBase</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 px-3 py-1">Google Gemini Ai</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 px-3 py-1">OmniDiemension</Badge>
              </div>
              <div className="flex gap-3">
                <a href="https://hope-flow.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                </a>
                <a href="https://github.com/csxark/HopeFlow" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </Button></a>
              </div>
            </div>

          </div>
        </section>

        <section className="flex justify-center py-16">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
            <div className="text-center">
              <p className="text-cyan-400 text-sm font-semibold mb-2">Contact</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Let&apos;s build something together</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                I&apos;m open to freelance work, collaborations, and full-time opportunities. Send a short message with what you&apos;re building and I&apos;ll reply within 48 hours.
              </p>

              <div className="flex items-center justify-center">
                <a
                  href="mailto:arktandoncs@gmail.com"
                  aria-label="Send email"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-transparent bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">Email</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
