"use client";

import React from "react";
import { Trophy, Award, Calendar } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import achievementsData from "./achievements.json";
import CertModal from "@/components/cert-modal";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  type: "certification" | "award";
}

// Memoized Achievement Card 
const AchievementCard = React.memo<{
  achievement: Achievement;
  onClick: () => void;
  type: "cert" | "award";
}>(({ achievement, onClick, type }) => {
  const isCert = type === "cert";
  const Icon = isCert ? Award : Trophy;
  const bgGradient = isCert
    ? "from-cyan-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
    : "from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800";
  const shadowColor = isCert ? "hover:shadow-cyan-500/10" : "hover:shadow-purple-500/10";
  const borderColor = isCert ? "hover:border-cyan-400 dark:hover:border-cyan-500/50" : "hover:border-purple-400 dark:hover:border-purple-500/50";

  return (
    <motion.div
      variants={fadeInUp}
      whileHover="hover"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={hoverCard}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
        className={`group relative h-full bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden ${borderColor} transition-all duration-300 shadow-sm hover:shadow-xl ${shadowColor} cursor-pointer flex flex-col`}
      >
        <div className={`aspect-video bg-gradient-to-br ${bgGradient} relative overflow-hidden border-b border-slate-100 dark:border-slate-800`}>
          {achievement.image_url ? (
            <Image
              src={achievement.image_url}
              alt={achievement.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className={`w-16 h-16 ${isCert ? 'text-cyan-200' : 'text-purple-200'} dark:text-slate-700`} />
            </div>
          )}
          {/* Overlay on Hover */}
          <div className={`absolute inset-0 ${isCert ? 'bg-cyan-900/0 group-hover:bg-cyan-900/10' : 'bg-purple-900/0 group-hover:bg-purple-900/10'} transition-colors duration-300`}></div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className={`text-lg font-bold mb-2 line-clamp-2 text-slate-800 dark:text-slate-100 group-hover:${isCert ? 'text-cyan-600 dark:text-cyan-400' : 'text-purple-600 dark:text-purple-400'} transition-colors`}>
            {achievement.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-1">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

AchievementCard.displayName = "AchievementCard";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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

export default function Certifications() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll Effects for Header
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    try {
      const data = (achievementsData as Achievement[]) || [];
      // sort by date descending
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAchievements(data);
    } catch (err) {
      console.error("Error loading achievements data:", err);
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const certifications = useMemo(() => achievements.filter((a) => a.type === "certification"), [achievements]);
  const awards = useMemo(() => achievements.filter((a) => a.type === "award"), [achievements]);

  const [selected, setSelected] = useState<Achievement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openAchievement = useCallback((a: Achievement) => {
    setSelected(a);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelected(null), 200);
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-50 transition-colors duration-300 overflow-hidden selection:bg-cyan-500/30">
      <Navbar />

      {/* Futuristic Background Grid & Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d41a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d41a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Soft Spotlights */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-400/20 dark:bg-cyan-500/20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-400/20 dark:bg-purple-500/10 blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-24 max-w-6xl">
        
        {/* Header Section */}
        <motion.div 
          ref={targetRef}
          style={{ opacity, scale }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Hall of Achievements
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A curated collection of my certifications, awards, and technical recognitions.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-slate-600 dark:text-slate-400 animate-pulse">Loading achievements...</div>
        ) : (
          <>
            {certifications.length > 0 && (
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="mb-20"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                  <span className="w-1 h-8 bg-cyan-500 rounded-full"></span>
                  <Award className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Certifications</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications.map((cert) => (
                    <AchievementCard
                      key={cert.id}
                      achievement={cert}
                      onClick={() => openAchievement(cert)}
                      type="cert"
                    />
                  ))}
                </div>
              </motion.section>
            )}

            {awards.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                  <span className="w-1 h-8 bg-purple-500 rounded-full"></span>
                  <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Awards</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awards.map((award) => (
                    <AchievementCard
                      key={award.id}
                      achievement={award}
                      onClick={() => openAchievement(award)}
                      type="award"
                    />
                  ))}
                </div>
              </motion.section>
            )}

            <CertModal open={modalOpen} onClose={closeModal} achievement={selected} />

            {achievements.length === 0 && !loading && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-16"
              >
                <div className="bg-slate-50 dark:bg-slate-900 rounded-full p-6 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                   <Trophy className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No achievements yet
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Start adding your certifications and awards to showcase your accomplishments
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}