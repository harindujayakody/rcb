"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if user already saw preloader in this session
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("rcb_preloader_seen");
      if (seen || shouldReduceMotion) {
        setShouldRender(false);
        return;
      }
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            sessionStorage.setItem("rcb_preloader_seen", "true");
          }, 200);
          return 100;
        }
        // Accelerate near the end
        const step = prev < 60 ? 2 : prev < 90 ? 4 : 5;
        return Math.min(100, prev + step);
      });
    }, 28);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-14 bg-white text-[var(--ink)] select-none pointer-events-auto"
        >
          {/* Top meta */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-500 tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[var(--theme)] inline-block animate-pulse" />
              <strong className="text-[var(--ink)]">RCB HOLDINGS</strong>
            </span>
            <span>HOKANDARA · SRI LANKA</span>
          </div>

          {/* Center / Bottom big counter */}
          <div className="flex flex-col gap-3 my-auto">
            <div className="font-mono text-xs md:text-sm text-[var(--theme)] tracking-[0.25em] uppercase font-bold">
              INITIALIZING INDUSTRIAL ASSETS
            </div>
            <div className="font-display text-[22vw] leading-none text-[var(--ink)] font-normal tracking-tight">
              {count.toString().padStart(3, "0")}
            </div>
          </div>

          {/* Bottom progress hairline (Zero pills: rounded-xs) */}
          <div className="space-y-4">
            <div className="w-full h-[3px] bg-slate-100 relative overflow-hidden rounded-xs">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--theme)]"
                style={{ width: `${count}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 font-medium">
              <span>PAVING · BLOCKS · MACHINERY · ICTAD REGISTERED</span>
              <span className="text-[var(--theme)] font-bold">{count}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
