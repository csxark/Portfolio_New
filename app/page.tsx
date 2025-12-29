'use client';

import { Github, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const hoverCard = {
  hover: { 
    y: -5,
    transition: { duration: 0.3 }
  }
};

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    // Changed bg-slate-50 to bg-white for a cleaner base
    <div className="relative min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-50 transition-colors duration-300 overflow-hidden selection:bg-cyan-500/30">
      <Navbar />

      {/* Futuristic Background Grid & Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Updated Grid Color: Uses a very faint cyan (#06b6d4) in light mode instead of gray */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d41a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d41a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Soft Spotlights */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-400/20 dark:bg-cyan-500/20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-400/20 dark:bg-purple-500/10 blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-24 max-w-5xl">
        
        {/* Hero Section */}
        <motion.header 
          ref={targetRef}
          style={{ opacity, scale }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between mb-24 gap-10 pt-10"
        >
          <div className="text-center md:text-left flex-1">
            <motion.div variants={fadeInUp}>
              {/* Updated Badge: Cyan background tint */}
              <Badge variant="outline" className="mb-4 border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/50 dark:text-cyan-400 dark:bg-cyan-500/10">
                Available for hire
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500">Ark Tandon</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-slate-600 dark:text-slate-400 text-lg max-w-lg leading-relaxed mx-auto md:mx-0 mb-8">
              Web Developer crafting scalable, human-centered digital experiences. Pursuing in Data Analytics and Machine Learning.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start">
               <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 shadow-lg shadow-cyan-500/20">View Work</Button>
               <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="rounded-full px-8 border-slate-200 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white transition-all">Contact Me</Button>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 relative rounded-full overflow-hidden border-2 border-white dark:border-slate-800 ring-4 ring-cyan-50 dark:ring-slate-900/50 shadow-2xl shadow-cyan-200 dark:shadow-none">
              <Image
                src="/images/profile/main.webp"
                alt="Profile"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.header>

        {/* About Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-cyan-500 rounded-full"></span>
            About
          </h2>
          {/* Glass Card: White with slight cyan tint on borders */}
          <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-cyan-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              I am a passionate web developer with a knack for creating dynamic and responsive web applications. With a strong foundation in both front-end and back-end technologies, I enjoy transforming complex problems into elegant solutions. My journey in tech is driven by curiosity and a desire to continuously learn and grow. When I&apos;m not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or indulging in my love for photography and travel.
              <br /><br />
              Let&apos;s connect and build something amazing together!
            </p>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-blue-500 dark:bg-purple-500 rounded-full"></span>
            Experience
          </motion.h2>
          
          <div className="space-y-6">
            {[
              { 
                company: "LearnIT", 
                role: "Senior Coordinator - Web Developer", 
                date: "May 2025 - Present", 
                color: "from-cyan-400 to-blue-500", // Adjusted gradient
                logo: "/images/experience/LearnIT.svg" 
              },
              { 
                company: "GSsoc", 
                role: "Open Source Contributor", 
                date: "July 2025 - October 2025", 
                color: "bg-slate-800",
                logo: "/images/experience/Gssoc.jpg" 
              }
            ].map((exp, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ x: 10 }}
                // Hover effect: Cyan background tint
                className="group flex items-start gap-4 p-4 rounded-xl hover:bg-cyan-50/50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-cyan-100 dark:hover:border-slate-700"
              >
                <div className={`w-12 h-12 rounded-full ${exp.company === 'LearnIT' ? 'bg-gradient-to-br' : ''} ${exp.color} flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg shadow-cyan-100 dark:shadow-none`}>
                  <Image src={exp.logo} alt={exp.company} width={48} height={48} className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1 flex-col sm:flex-row">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{exp.company}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{exp.role}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-2 sm:mt-0">{exp.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
           <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-cyan-500 rounded-full"></span>
            Education
          </h2>
          <div className="flex items-start gap-4 bg-gradient-to-r from-cyan-50/50 to-white dark:from-slate-900 dark:to-slate-900/50 p-6 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-cyan-100 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-6 h-6 text-cyan-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1 flex-col sm:flex-row">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Manipal University Jaipur</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Bachelor of Technology in Computer Science and Engineering</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded bg-white border border-cyan-100 dark:border-transparent dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-2 sm:mt-0">2024 - 2028</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-blue-500 dark:bg-purple-500 rounded-full"></span>
            Tech Stack
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {["JavaScript", "React", "Next.js", "TypeScript", "Node.js", "Python", "C", "PostgreSQL", "Prisma"].map((skill, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.1 }}>
                <Badge variant="secondary" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 text-sm font-medium hover:bg-cyan-50 dark:hover:bg-slate-800 hover:border-cyan-300 hover:text-cyan-700 transition-colors cursor-default shadow-sm">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <p className="text-cyan-600 dark:text-cyan-400 text-sm font-bold uppercase tracking-widest mb-2">My Projects</p>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Check out my latest work</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
              I&apos;ve worked on a variety of projects, from simple websites to complex web applications.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInUp} whileHover="hover" initial="initial" animate="initial" custom={0}>
                {/* Card styling: Pure white, subtle border, colored shadow on hover */}
                <motion.div variants={hoverCard} className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-xl p-8 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">AlgoViz</h3>
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-500 border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-1 rounded">2025</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                    Interactive web application designed to help users visualize and understand various algorithms and data structures with dynamic animations.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["React", "Tailwind CSS", "Framer Motion"].map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-transparent">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <a href="https://algo-viz-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 hover:shadow-lg transition-all">
                        <ExternalLink className="w-4 h-4 mr-2" /> Website
                      </Button>
                    </a>
                    <a href="https://github.com/csxark/AlgoViz" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:border-slate-50">
                        <Github className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
            </motion.div>


             <motion.div variants={fadeInUp} whileHover="hover" initial="initial" animate="initial" custom={1}>
                <motion.div variants={hoverCard} className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-xl p-8 hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">HopeFlow</h3>
                    <span className="text-xs font-mono text-purple-600 dark:text-purple-500 border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">2025</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                    Interactive web platform providing empathetic emotional support through real-time voice and text conversations using OmniDimension AI.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["React", "SupaBase", "Gemini AI", "Tailwind"].map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-transparent">{tag}</Badge>
                    ))}
                  </div>
                   <div className="flex gap-3 mt-auto">
                    <a href="https://hope-flow.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 hover:shadow-lg transition-all">
                        <ExternalLink className="w-4 h-4 mr-2" /> Website
                      </Button>
                    </a>
                    <a href="https://github.com/csxark/HopeFlow" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700 hover:border-slate-50">
                        <Github className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover="hover" initial="initial" animate="initial" custom={2} className="md:col-span-2">
                <motion.div variants={hoverCard} className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-xl p-8 hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold">Finlo</h3>
                            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">2025</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                            Comprehensive personal finance management web application. Key features include real-time expense tracking, budget planning, visual analytics via Chart.js, and secure data management.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {["React", "Tailwind CSS", "SupaBase", "Chart.js"].map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-transparent">{tag}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-auto">
                            <a href="https://finlo-theta.vercel.app/" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 hover:shadow-lg transition-all">
                                    <ExternalLink className="w-4 h-4 mr-2" /> Website
                                </Button>
                            </a>
                            <a href="https://github.com/csxark/Finlo" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="border-slate-200 dark:border-slate-700 hover:border-slate-50">
                                    <Github className="w-4 h-4 mr-2" /> Source
                                </Button>
                            </a>
                        </div>
                    </div>
                  </div>
                </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <motion.section 
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex justify-center py-16"
        >
          <div className="relative w-full max-w-3xl overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-3xl"></div>
             <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-cyan-100 dark:border-slate-800 rounded-2xl p-10 md:p-14 text-center shadow-2xl shadow-cyan-500/5">
                <p className="text-cyan-600 dark:text-cyan-500 font-bold tracking-widest text-xs mb-4 uppercase">Get in touch</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Let&apos;s build something together</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto text-lg">
                  I&apos;m open to freelance work, collaborations, and full-time opportunities.
                </p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:arktandoncs@gmail.com"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-cyan-600 dark:bg-white text-white dark:text-black font-medium hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send me an email</span>
                </motion.a>
             </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}