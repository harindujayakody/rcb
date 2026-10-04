"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { ArrowDown, Calculator, Wrench, Play } from "lucide-react";
import { SplitLines } from "@/components/motion/split-lines";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ScrubVideo, TOTAL_HERO_FRAMES } from "@/components/motion/ScrubVideo";

interface BeatCaption {
  id: string;
  word: string;
  spec: string;
  start: number;
  end: number;
}

const BEATS: BeatCaption[] = [
  {
    id: "grab",
    word: "GRABBED.",
    spec: "LIFTED OFF PALLET STACK · 60MM HIGH-DENSITY INTERLOCK",
    start: 0.22,
    end: 0.40,
  },
  {
    id: "carry",
    word: "CARRIED.",
    spec: "TACTILE PRECISION · FIELD TRANSPORT TO LAYING SITE",
    start: 0.42,
    end: 0.62,
  },
  {
    id: "lay",
    word: "LAID TO LAST.",
    spec: "HERRINGBONE INTERLOCK · STRUCTURAL LOAD DISTRIBUTION",
    start: 0.64,
    end: 0.84,
  },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Current scrub progress state for HUD overlays
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Pinned scroll measurement across 400vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothed progress for UI sync
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.6,
  });

  // Phase A: Headline and CTAs lift away (0.0 to 0.18)
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 0.6, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.18], [0, -45]);
  const scrimOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.30, 0.82, 0.98],
    [0.72, 0.35, 0.15, 0.18, 0.65]
  );
  const metaOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Phase C: Camera push-in scale (0.80 to 1.0)
  const cameraScale = useTransform(scrollYProgress, [0.80, 1.0], [1.0, 1.12]);

  // Determine active beat caption
  const activeBeat = useMemo(() => {
    return BEATS.find(
      (beat) => currentProgress >= beat.start && currentProgress < beat.end
    );
  }, [currentProgress]);

  // Formatted mono timecode calculation (e.g. 00:01 / 00:08)
  const timecodeString = useMemo(() => {
    const totalSecs = 8;
    const currentSec = Math.min(totalSecs, Math.max(1, Math.round(currentProgress * totalSecs)));
    return `00:0${currentSec} / 00:08`;
  }, [currentProgress]);

  // Fallback for prefers-reduced-motion
  if (shouldReduceMotion) {
    return (
      <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-24 pb-8 md:pt-28 md:pb-10 px-6 md:px-14 select-none bg-[var(--ink)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-final-frame.webp"
            alt="Interlocking Herringbone Paving"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/60 to-black/30" />
        </div>

        <div className="relative z-10" />

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 md:py-12">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[var(--graphite)]/85 border border-[var(--line-dark)] mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-none bg-[var(--safety)]" />
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
              HEAVY INDUSTRY · SRI LANKA
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] tracking-tight leading-[0.9] text-[var(--paper)] mb-4">
            BUILD SOMETHING <span className="text-[var(--safety)]">THAT LASTS.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pt-4 border-t border-[var(--line-dark)] max-w-5xl">
            <p className="text-sm sm:text-lg md:text-xl text-[var(--steel)] max-w-xl font-body leading-relaxed">
              Precision interlock paving manufactured to rigorous density standards.
              Heavy construction machinery distributed island-wide.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#calculator"
                className="px-6 py-3 rounded-full bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-xs font-bold uppercase tracking-wider"
              >
                CALCULATE YOUR BRICKS
              </a>
              <a
                href="#machinery"
                className="px-6 py-3 rounded-full bg-white/10 text-[var(--paper)] font-mono text-xs uppercase tracking-wider"
              >
                EXPLORE MACHINERY
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-[var(--steel)] pt-6 border-t border-[var(--line-dark)]/40">
          <span>EST. HOKANDARA — SRI LANKA</span>
          <a href="#paving" className="flex items-center gap-2 text-[var(--paper)]">
            <span>EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 text-[var(--safety)]" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[380vh] md:h-[400vh] bg-[var(--ink)] select-none"
      aria-label="Scroll-Driven Brick Sequence"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 md:pt-28 md:pb-10 px-6 md:px-14">
        {/* Background Canvas Scrub Video with Match-Cut Camera Push */}
        <motion.div
          style={{ scale: cameraScale }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <ScrubVideo
            pinRef={containerRef}
            onProgressChange={(prog, frame) => {
              setCurrentProgress(prog);
              setCurrentFrame(frame);
            }}
          />

          {/* Dynamic Scrim & Gradients */}
          <motion.div
            style={{ opacity: scrimOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/50 to-black/35 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Top spacer */}
        <div className="relative z-10" />

        {/* Phase A: Initial Arrive Content (0 - 80vh) */}
        <motion.div
          style={{
            opacity: headlineOpacity,
            y: headlineY,
            pointerEvents: currentProgress < 0.15 ? "auto" : "none",
          }}
          className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 md:py-12"
        >
          {/* Eyebrow */}
          <Reveal delay={0.05} y={15}>
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[var(--graphite)]/85 backdrop-blur-md border border-[var(--line-dark)] mb-4 md:mb-6">
              <span className="w-2 h-2 rounded-none bg-[var(--safety)] animate-pulse" />
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                HEAVY INDUSTRY · SRI LANKA
              </span>
            </div>
          </Reveal>

          {/* Giant Anton SplitLines Headline */}
          <div className="mb-4 md:mb-6">
            <SplitLines
              lines={[
                <span
                  key="1"
                  className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] tracking-tight leading-[0.9] text-[var(--paper)] block"
                >
                  BUILD SOMETHING
                </span>,
                <span
                  key="2"
                  className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] tracking-tight leading-[0.9] text-[var(--safety)] block drop-shadow-[0_4px_24px_rgba(255,178,0,0.25)]"
                >
                  THAT LASTS.
                </span>,
              ]}
              delay={0.1}
            />
          </div>

          {/* Subtitle & Actions */}
          <Reveal delay={0.25} y={20}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pt-4 border-t border-[var(--line-dark)]/80 max-w-5xl">
              <p className="text-sm sm:text-lg md:text-xl text-[var(--steel)] max-w-xl font-body leading-relaxed">
                Precision interlock paving manufactured to rigorous density standards.
                Heavy construction machinery distributed island-wide.
              </p>

              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <Magnetic strength={0.25}>
                  <a
                    href="#calculator"
                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_rgba(255,178,0,0.45)] active:scale-95 flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>CALCULATE YOUR BRICKS</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.25}>
                  <a
                    href="#machinery"
                    className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-[var(--paper)] border border-[var(--line-dark)] hover:border-white/20 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
                  >
                    <Wrench className="w-4 h-4 text-[var(--safety)]" />
                    <span>EXPLORE MACHINERY</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </motion.div>

        {/* Phase B: Mid-Sequence Beat Captions (80vh - 320vh) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-24 md:bottom-28 z-20 flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {activeBeat && (
              <motion.div
                key={activeBeat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-xl w-full px-8 py-4 rounded-xl bg-black/90 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
              >
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <span className="w-2 h-2 bg-[var(--safety)]" />
                  <span className="font-mono text-[10px] md:text-xs text-[var(--safety)] tracking-[0.25em] uppercase font-bold">
                    FROM HANDS TO GROUND
                  </span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--safety)] tracking-tight leading-none mb-2 drop-shadow-[0_4px_24px_rgba(255,178,0,0.4)]">
                  {activeBeat.word}
                </h2>
                <p className="font-mono text-[10px] sm:text-xs text-[var(--paper)] tracking-wider uppercase font-medium">
                  {activeBeat.spec}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lower-Third Craft HUD & Scrub Bar (Phase B active) */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.18, 0.25, 0.85, 0.95], [0, 1, 1, 0]),
            pointerEvents: "none",
          }}
          className="absolute bottom-8 left-6 right-6 md:left-14 md:right-14 z-20 flex flex-col gap-2 max-w-7xl mx-auto"
        >
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[var(--steel)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--safety)] animate-pulse" />
              <span className="text-[var(--paper)]">SCROLL PLAYHEAD</span>
              <span className="hidden sm:inline-block">· FRAME {String(currentFrame + 1).padStart(3, "0")} / {TOTAL_HERO_FRAMES}</span>
            </div>
            <div className="font-mono text-[var(--safety)] font-bold tracking-wider">
              {timecodeString}
            </div>
          </div>

          {/* Thin Hairline Scrub Progress Indicator */}
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: springProgress, transformOrigin: "left" }}
              className="h-full bg-[var(--safety)]"
            />
          </div>
        </motion.div>

        {/* Phase A: Bottom Meta & Scroll Cue (visible before scrolling) */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-[var(--steel)] pt-6 border-t border-[var(--line-dark)]/40"
        >
          <div className="flex items-center gap-6">
            <span>EST. HOKANDARA — SRI LANKA</span>
            <span className="hidden md:inline-block">·</span>
            <span className="hidden md:inline-block">PAVING / BLOCKS / MACHINERY</span>
          </div>

          <a
            href="#paving"
            className="flex items-center gap-2 text-[var(--paper)] hover:text-[var(--safety)] transition-colors group cursor-pointer"
          >
            <span>SCROLL TO PLAY</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-[var(--safety)]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
