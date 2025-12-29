"use client";

import { Fragment, useEffect } from "react";
import Image from "next/image";
import { X, Calendar } from "lucide-react";

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

export default function CertModal({ open, onClose, achievement }: CertModalProps) {
  useEffect(() => {
    // lock body scroll when modal is open
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !achievement) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${achievement.title} details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative z-10 max-w-4xl w-full mx-auto bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-start justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold">{achievement.title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="w-full aspect-video relative bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
            {achievement.image_url ? (
              <Image
                src={achievement.image_url}
                alt={achievement.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
            )}
          </div>

          <div className="py-2 px-1">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-line">{achievement.description}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>{new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
