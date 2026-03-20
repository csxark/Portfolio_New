"use client";

import React from "react";
import { Trophy, Award, Calendar, Star, GitMerge, BookOpen } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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


const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};


const TYPE_CONFIG = {
  cert: {
    accent: "#06b6d4",          // cyan-500
    accentDark: "#22d3ee",
    bgLight: "from-cyan-50 to-sky-50",
    bgDark: "dark:from-slate-900 dark:to-slate-800",
    borderHover: "hover:border-cyan-400/60 dark:hover:border-cyan-500/40",
    shadowHover: "hover:shadow-cyan-500/10",
    textHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
    iconColor: "text-cyan-400/30 dark:text-cyan-500/20",
    overlayHover: "group-hover:bg-cyan-900/10",
    bar: "bg-cyan-500",
    Icon: Award,
  },
  award: {
    accent: "#a855f7",          // purple-500
    accentDark: "#c084fc",
    bgLight: "from-violet-50 to-fuchsia-50",
    bgDark: "dark:from-slate-900 dark:to-slate-800",
    borderHover: "hover:border-violet-400/60 dark:hover:border-violet-500/40",
    shadowHover: "hover:shadow-violet-500/10",
    textHover: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    iconColor: "text-violet-200 dark:text-slate-700",
    overlayHover: "group-hover:bg-violet-900/10",
    bar: "bg-violet-500",
    Icon: Trophy,
  },
};


const StatBar = ({
  total,
  certs,
  awards,
}: {
  total: number;
  certs: number;
  awards: number;
}) => {
  const stats = [
    { num: total, label: "Total achievements", Icon: Star },
    { num: certs, label: "Certifications", Icon: BookOpen },
    { num: awards, label: "Awards", Icon: Trophy },
    { num: certs + awards > 0 ? new Date().getFullYear() - 2024 + 1 : 0, label: "Active years", Icon: GitMerge },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
    >
      {stats.map(({ num, label, Icon }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-5 py-4"
        >
          {/* subtle corner glow */}
          <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-xl pointer-events-none" />
          <Icon className="w-4 h-4 text-slate-400 dark:text-slate-600 mb-2" />
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none">{num}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
        </div>
      ))}
    </motion.div>
  );
};


type FilterValue = "all" | "certification" | "award";

const FilterPills = ({
  active,
  onChange,
  certCount,
  awardCount,
}: {
  active: FilterValue;
  onChange: (f: FilterValue) => void;
  certCount: number;
  awardCount: number;
}) => {
  const options: { value: FilterValue; label: string; count: number }[] = [
    { value: "all", label: "All", count: certCount + awardCount },
    { value: "certification", label: "Certifications", count: certCount },
    { value: "award", label: "Awards", count: awardCount },
  ];

  return (
    <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 mb-8">
      {options.map(({ value, label, count }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
            ${
              active === value
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm"
                : "bg-white/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
        >
          {label}
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              active === value
                ? "bg-white/20 dark:bg-black/20 text-inherit"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
            }`}
          >
            {count}
          </span>
        </button>
      ))}

      {/* live count */}
      <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">
        Sorted by recency
      </span>
    </motion.div>
  );
};

const AchievementCard = React.memo<{
  achievement: Achievement;
  onClick: () => void;
  type: "cert" | "award";
  featured?: boolean;
}>(({ achievement, onClick, type, featured = false }) => {
  const cfg = TYPE_CONFIG[type];
  const Icon = cfg.Icon;

  return (
    <motion.div
      variants={fadeInUp}
      layout
      className={featured ? "md:col-span-2" : ""}
    >
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
        className={`group relative h-full bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden ${cfg.borderHover} transition-all duration-300 shadow-sm hover:shadow-xl ${cfg.shadowHover} cursor-pointer flex flex-col`}
      >
        {/* Category accent strip (replaces full gradient top) */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${cfg.accent}, transparent)` }}
        />

        {/* Image / placeholder */}
        <div
          className={`${featured ? "aspect-[16/7]" : "aspect-video"} bg-gradient-to-br ${cfg.bgLight} ${cfg.bgDark} relative overflow-hidden border-b border-slate-100 dark:border-slate-800`}
        >
          {achievement.image_url ? (
            <Image
              src={achievement.image_url}
              alt={achievement.title}
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className={`w-16 h-16 ${cfg.iconColor}`} />
            </div>
          )}
          <div className={`absolute inset-0 bg-transparent ${cfg.overlayHover} transition-colors duration-300`} />

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-semibold text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
              Featured
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          {/* Type badge */}
          <span
            className="self-start text-[10px] font-semibold uppercase tracking-widest mb-3 px-2.5 py-0.5 rounded-full"
            style={{
              background: `${cfg.accent}18`,
              color: cfg.accent,
            }}
          >
            {type === "cert" ? "Certification" : "Award"}
          </span>

          <h3
            className={`text-base font-bold mb-2 ${featured ? "" : "line-clamp-2"} text-slate-800 dark:text-slate-100 ${cfg.textHover} transition-colors`}
          >
            {achievement.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-1">
            {achievement.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {new Date(achievement.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

AchievementCard.displayName = "AchievementCard";

const SectionHeader = ({
  label,
  color,
  Icon,
}: {
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
}) => (
  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
    <span className="w-1 h-8 rounded-full" style={{ background: color }} />
    <Icon className="w-5 h-5" style={{ color }} />
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{label}</h2>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-20"
  >
    <div className="bg-slate-50 dark:bg-slate-900 rounded-full p-6 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
      <Trophy className="w-12 h-12 text-slate-300 dark:text-slate-700" />
    </div>
    <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
      No achievements yet
    </h3>
    <p className="text-slate-500 dark:text-slate-500 text-sm">
      Start adding your certifications and awards to showcase your accomplishments.
    </p>
  </motion.div>
);

export default function Awards() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterValue>("all");

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);

  useEffect(() => {
    try {
      const data = (achievementsData as Achievement[]) || [];
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAchievements(data);
    } catch (err) {
      console.error("Error loading achievements data:", err);
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const certifications = useMemo(
    () => achievements.filter((a) => a.type === "certification"),
    [achievements]
  );
  const awards = useMemo(
    () => achievements.filter((a) => a.type === "award"),
    [achievements]
  );

  const filtered = useMemo(() => {
    if (filter === "all") return achievements;
    return achievements.filter((a) => a.type === filter);
  }, [achievements, filter]);

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

  // Determine which card is "featured" (first cert, if visible)
  const featuredId = certifications[0]?.id ?? awards[0]?.id ?? null;

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-50 transition-colors duration-300 overflow-hidden selection:bg-cyan-500/30">
      <Navbar />

      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d41a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d41a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-400/20 dark:bg-cyan-500/20 blur-[100px]" />
        <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-400/20 dark:bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-24 max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          ref={targetRef}
          style={{ opacity, scale }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-9 h-9 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Hall of Achievements
            </h1>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A curated collection of my certifications, awards, and technical recognitions.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center text-slate-600 dark:text-slate-400 animate-pulse py-24">
            Loading achievements…
          </div>
        ) : achievements.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* ── Stat Bar ── */}
            <StatBar
              total={achievements.length}
              certs={certifications.length}
              awards={awards.length}
            />

            {/* ── Filter Pills ── */}
            <FilterPills
              active={filter}
              onChange={setFilter}
              certCount={certifications.length}
              awardCount={awards.length}
            />

            {/* ── Unified filtered grid  ── */}
            <AnimatePresence mode="wait">
              {filter !== "all" ? (
                <motion.div
                  key={filter}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filtered.map((item) => (
                    <AchievementCard
                      key={item.id}
                      achievement={item}
                      onClick={() => openAchievement(item)}
                      type={item.type === "certification" ? "cert" : "award"}
                    />
                  ))}
                </motion.div>
              ) : (
                /* ── "All" view: two labelled sections, first cert is featured ── */
                <motion.div
                  key="all"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  variants={staggerContainer}
                  className="space-y-16"
                >
                  {certifications.length > 0 && (
                    <motion.section variants={staggerContainer}>
                      <SectionHeader
                        label="Certifications"
                        color="#06b6d4"
                        Icon={Award}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, idx) => (
                          <AchievementCard
                            key={cert.id}
                            achievement={cert}
                            onClick={() => openAchievement(cert)}
                            type="cert"
                            featured={idx === 0}
                          />
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {awards.length > 0 && (
                    <motion.section variants={staggerContainer}>
                      <SectionHeader
                        label="Awards & Recognitions"
                        color="#a855f7"
                        Icon={Trophy}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {awards.map((award, idx) => (
                          <AchievementCard
                            key={award.id}
                            achievement={award}
                            onClick={() => openAchievement(award)}
                            type="award"
                            featured={idx === 0}
                          />
                        ))}
                      </div>
                    </motion.section>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <CertModal open={modalOpen} onClose={closeModal} achievement={selected} />
          </motion.div>
        )}
      </div>
    </div>
  );
}