"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  type: "certification" | "award";
}

interface CertModalProps {
  open: boolean;
  onClose: () => void;
  achievement?: Achievement | null;
}

// Animation Variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.3 } 
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
};

export default function CertModal({ open, onClose, achievement }: CertModalProps) {
  
  // Lock body scroll
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Handle Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && achievement && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 max-w-4xl w-full mx-auto bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-cyan-100 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{achievement.title}</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                  <span className="uppercase tracking-wider">{achievement.type}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Image Container */}
              <div className="w-full aspect-video relative bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                {achievement.image_url ? (
                  <Image
                    src={achievement.image_url}
                    alt={achievement.title}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-sm">No preview available</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">Description</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 whitespace-pre-line leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  
                  {/* Optional: Add a verification/link button if you have a URL in your JSON */}
                  {/* <button className="flex items-center gap-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-1.5 rounded-md transition-colors ml-auto">
                    <ExternalLink className="w-4 h-4" />
                    Verify
                  </button> 
                  */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}