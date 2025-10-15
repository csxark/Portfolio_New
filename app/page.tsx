'use client';

import { Github, Twitter, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <header className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Hi, I&apos;m Ark Tandon 
              {/* <span className="inline-block animate-wave">👋</span> */}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-md leading-relaxed">
              Frontend Developer passionate about crafting scalable and human-centered digital experiences.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-40 h-40 relative rounded-full overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Profile"
                fill
                sizes="280px"
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
                <Image src="/logos/pikme.png" alt="Pikme" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-semibold">Pikme</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Full Stack Developer</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">July 2025 - Present</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/logos/stealth.png" alt="Stealth Startup" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-semibold">Stealth Startup</h3>
                    <p className="text-slate-400 text-sm">Full Stack Blockchain Developer</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">August 2025 - Present</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/logos/euclid.png" alt="Euclid Protocol" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-semibold">Euclid Protocol</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Full Stack Developer</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">May 2025 - July 2025</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/logos/solana.png" alt="Solana Superteam" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-semibold">Solana Superteam</h3>
                    <p className="text-slate-400 text-sm">Community Member & Builder</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">March 2025 - Present</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/logos/alphi.png" alt="Alphi AI" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-semibold">Alphi AI - Internship</h3>
                    <p className="text-slate-400 text-sm">Full Stack AI Engineer</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">February 2025 - April 2025</span>
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
                <span className="text-xs text-slate-500">2023 - 2027</span>
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
            <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-cyan-500 dark:hover:border-slate-700 transition-colors">
              <h3 className="text-2xl font-bold mb-2">MEMEFI</h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">2025</p>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Launched MEMEFI – a gamified meme staking platform with 50+ active users and $1K+ in staked value. Users upload memes, stake them, and earn rewards based on engagement. Integrated wallet abstraction achieving 90%+ user retention.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Next.js</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Tailwind CSS</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Solidity (BNB Chain)</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Node.js</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">MongoDB</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">IPFS</Badge>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </Button>
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-cyan-500 dark:hover:border-slate-700 transition-colors">
              <h3 className="text-2xl font-bold mb-2">SnapChain</h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">2025</p>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Developed an AI-powered drag-and-drop platform to simplify Rust smart contract creation. Features Scratch-like interface, AI-assisted generation, and pre-made templates. Used by 200+ developers, reducing contract development time by 70%.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Next.js</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">TypeScript</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">MongoDB</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Rust</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Google Gemini API</Badge>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </Button>
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-cyan-500 dark:hover:border-slate-700 transition-colors">
              <h3 className="text-2xl font-bold mb-2">ForkYouDaddy</h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">2025</p>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Web3 application for creating, remixing, and licensing creative IP with 100+ registered works and $5K+ in licensing revenue. Creators register original works onchain, others fork with attribution, and licenses define usage and monetization.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Next.js</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">TypeScript</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Solidity</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Web3</Badge>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </Button>
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-cyan-500 dark:hover:border-slate-700 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Capsulr</h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">2025</p>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Decentralized time capsule application on Monad testnet with 50+ stored memories and 99%+ data integrity. Users store and retrieve memories on-chain with timestamp verification and privacy controls.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Next.js</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">TypeScript</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Solidity</Badge>
                <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 px-3 py-1">Monad Blockchain</Badge>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </Button>
                <Button variant="secondary" size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-16">
          <p className="text-cyan-400 text-sm font-semibold mb-2">Contact</p>
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-slate-400 mb-8">
            Want to chat? Just shoot me a dm with a direct question on <span className="text-cyan-400">Twitter</span> and I&apos;ll respond whenever I can. I will ignore all soliciting.
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400 w-12 h-12">
              <Twitter className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400 w-12 h-12">
              <Github className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400 w-12 h-12">
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
