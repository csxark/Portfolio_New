"use client";

import { Trophy, Award, Calendar } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import Image from "next/image";

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

export default function Certifications() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the imported JSON as the data source. Ensure dates are in ISO format in the JSON.
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

  const certifications = achievements.filter((a) => a.type === "certification");
  const awards = achievements.filter((a) => a.type === "award");

  const [selected, setSelected] = useState<Achievement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openAchievement(a: Achievement) {
    setSelected(a);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    // small timeout to clear selection after close animation (if any)
    setTimeout(() => setSelected(null), 200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Hall of Achievements
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A collection of certifications, awards, and recognitions
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-600 dark:text-slate-400">Loading achievements...</div>
        ) : (
          <>
            {certifications.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <Award className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  <h2 className="text-3xl font-bold">Certifications</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => openAchievement(cert)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openAchievement(cert);
                      }}
                      className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-950 dark:to-blue-950 relative overflow-hidden">
                        {cert.image_url ? (
                          <Image
                            src={cert.image_url}
                            alt={cert.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Award className="w-16 h-16 text-cyan-600 dark:text-cyan-400 opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{cert.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                          {cert.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {awards.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Trophy className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  <h2 className="text-3xl font-bold">Awards & Achievements</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awards.map((award) => (
                    <div
                      key={award.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => openAchievement(award)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openAchievement(award);
                      }}
                      className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-950 dark:to-blue-950 relative overflow-hidden">
                        {award.image_url ? (
                          <Image
                            src={award.image_url}
                            alt={award.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Trophy className="w-16 h-16 text-cyan-600 dark:text-cyan-400 opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{award.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                          {award.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(award.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <CertModal open={modalOpen} onClose={closeModal} achievement={selected} />

            {achievements.length === 0 && !loading && (
              <div className="text-center py-16">
                <Trophy className="w-20 h-20 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No achievements yet
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Start adding your certifications and awards to showcase your accomplishments
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
