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
import { ArrowDown, Calculator, Wrench, ShieldCheck, Building2 } from "lucide-react";
import { SplitLines } from "@/components/motion/split-lines";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ScrubVideo, TOTAL_HERO_FRAMES } from "@/components/motion/ScrubVideo";
import { Awards } from "@/components/brand";

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

  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Pinned scroll measurement across 380vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothed progress
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.6,
  });

  // Phase A: Top headline & header elements fade out as user scrubs down
  const headerContentOpacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 0.5, 0]);
  const headerContentY = useTransform(scrollYProgress, [0, 0.18], [0, -35]);

  // Phase C: Camera push-in scale for seamless transition
  const cameraScale = useTransform(scrollYProgress, [0.80, 1.0], [1.0, 1.10]);

  // Determine active beat caption
  const activeBeat = useMemo(() => {
    return BEATS.find(
      (beat) => currentProgress >= beat.start && currentProgress < beat.end
    );
  }, [currentProgress]);

  // Formatted mono timecode calculation
  const timecodeString = useMemo(() => {
    const totalSecs = 8;
    const currentSec = Math.min(totalSecs, Math.max(1, Math.round(currentProgress * totalSecs)));
    return `00:0${currentSec} / 00:08`;
  }, [currentProgress]);

  // Static Accessible fallback for reduced motion
  if (shouldReduceMotion) {
    return (
      <section className="relative min-h-[100svh] bg-[var(--canvas)] text-[var(--ink)] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto w-full my-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-slate-100 border border-slate-200">
            <span className="w-2 h-2 rounded-xs bg-[var(--theme)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--theme)] font-bold">
              HEAVY INDUSTRY · SRI LANKA · ICTAD REGISTERED
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-tight leading-[0.92] text-[var(--ink)]">
            ENGINEERED FOR STRENGTH. <br />
            <span className="text-[var(--theme)]">BUILT TO LAST.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl font-body leading-relaxed">
            Precision interlock paving manufactured to rigorous density standards.
            Heavy construction machinery distributed island-wide across Sri Lanka.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#calculator"
              className="px-7 py-3.5 rounded-lg bg-[var(--theme)] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--theme-hover)] transition-all shadow-md"
            >
              CALCULATE YOUR BRICKS
            </a>
            <a
              href="#machinery"
              className="px-7 py-3.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-mono text-xs uppercase tracking-wider hover:bg-slate-50 transition-all"
            >
              EXPLORE MACHINERY
            </a>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <Awards theme="light" />
          </div>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-xl mt-6">
            <Image
              src="/hero-final-frame.webp"
              alt="Interlocking Herringbone Paving"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[380vh] md:h-[400vh] bg-[var(--canvas)] select-none"
      aria-label="RCB Cinematic Industrial Showcase"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-6 md:pt-28 md:pb-8 px-6 md:px-12 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
        
        {/* Phase A: Header Content & Headline (Visible at top, lifts away on scroll) */}
        <motion.div
          style={{
            opacity: headerContentOpacity,
            y: headerContentY,
            pointerEvents: currentProgress < 0.15 ? "auto" : "none",
          }}
          className="relative z-30 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
        >
          {/* Eyebrow badge */}
          <Reveal delay={0.05} y={15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-slate-100/90 border border-slate-200/90 shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-xs bg-[var(--theme)] animate-pulse" />
              <span className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-[var(--theme)] font-bold">
                HEAVY INDUSTRY · SRI LANKA · ICTAD REGISTERED
              </span>
            </div>
          </Reveal>

          {/* Monumental Headline */}
          <div className="mb-4">
            <SplitLines
              lines={[
                <span
                  key="1"
                  className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[7.8rem] tracking-tight leading-[0.92] text-[var(--ink)] block"
                >
                  ENGINEERED FOR STRENGTH.
                </span>,
                <span
                  key="2"
                  className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[7.8rem] tracking-tight leading-[0.92] text-[var(--theme)] block"
                >
                  BUILT TO LAST.
                </span>,
              ]}
              delay={0.1}
            />
          </div>

          {/* Subtitle, Action Buttons, and Hero Awards Inline */}
          <Reveal delay={0.25} y={20}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-3 border-t border-slate-200/90 max-w-7xl">
              {/* Description & CTAs */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl font-body leading-relaxed">
                  Precision interlock paving manufactured to rigorous density standards.
                  Authorized distributor for SDLG, Noah & Shengya machinery island-wide.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Magnetic strength={0.2}>
                    <a
                      href="#calculator"
                      className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-[var(--theme)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[var(--theme-hover)] hover:shadow-md active:scale-95 flex items-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>CALCULATE YOUR BRICKS</span>
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.2}>
                    <a
                      href="#machinery"
                      className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-2xs"
                    >
                      <Wrench className="w-4 h-4 text-[var(--theme)]" />
                      <span>EXPLORE MACHINERY</span>
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Symmetrical 2-Column Responsive Hero Awards Bar */}
              <div className="lg:col-span-5 flex justify-start lg:justify-end">
                <Awards theme="light" />
              </div>
            </div>
          </Reveal>
        </motion.div>

        {/* Monumental Dimensional Showcase Card (Inspired by reference media_1791103680332.png) */}
        <motion.div
          style={{
            scale: cameraScale,
            opacity: useTransform(scrollYProgress, [0.12, 0.22], [0.85, 1]),
          }}
          className="relative w-full max-w-7xl mx-auto aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/10] rounded-2xl overflow-hidden border border-slate-300/80 shadow-2xl bg-slate-950 will-change-transform z-10 my-auto"
        >
          {/* Scroll Canvas Scrub Sequence */}
          <ScrubVideo
            pinRef={containerRef}
            onProgressChange={(prog, frame) => {
              setCurrentProgress(prog);
              setCurrentFrame(frame);
            }}
          />

          {/* Subtle Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

          {/* Floating Metric Card: Top-Left (Real Island-Wide Stat) */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.05, 0.2, 0.85, 0.95], [0.95, 1, 1, 0]),
            }}
            className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-left pointer-events-none"
          >
            <div className="font-display text-xl sm:text-3xl text-[var(--theme)] leading-none font-bold">
              467+
            </div>
            <div className="font-mono text-[8px] sm:text-[10px] text-slate-600 font-semibold uppercase tracking-wider mt-0.5">
              Projects Completed
            </div>
          </motion.div>

          {/* Floating Credential Card: Top-Right (ICTAD Registration - visible on sm+) */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.05, 0.2, 0.85, 0.95], [0.95, 1, 1, 0]),
            }}
            className="hidden sm:flex absolute top-4 right-4 sm:top-6 sm:right-6 z-20 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md items-center gap-2.5 pointer-events-none"
          >
            <ShieldCheck className="w-5 h-5 text-[var(--theme)]" />
            <div className="text-left">
              <div className="font-mono text-[10px] sm:text-xs font-bold text-[var(--ink)] uppercase">
                ICTAD REGISTERED
              </div>
              <div className="font-mono text-[9px] text-slate-500 uppercase">
                Grade Certified Contractor
              </div>
            </div>
          </motion.div>

          {/* Mid-Sequence Tactical Beat Captions (80vh - 320vh) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-14 sm:bottom-20 z-20 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              {activeBeat && (
                <motion.div
                  key={activeBeat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center max-w-lg w-full px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-xs bg-[var(--theme)]" />
                    <span className="font-mono text-[9px] sm:text-[11px] text-[var(--theme)] tracking-[0.2em] uppercase font-bold">
                      FROM HANDS TO GROUND
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl text-[var(--ink)] tracking-tight leading-none mb-1">
                    {activeBeat.word}
                  </h2>
                  <p className="font-mono text-[9px] sm:text-[11px] text-slate-600 tracking-wider uppercase font-semibold">
                    {activeBeat.spec}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating OEM Partner Dock at bottom of showcase card */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.15, 0.85, 0.95], [1, 0.8, 0.8, 0]),
            }}
            className="absolute bottom-2.5 sm:bottom-4 inset-x-3 sm:inset-x-8 z-20 flex items-center justify-between px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md font-mono text-[9px] sm:text-[11px] text-slate-700 pointer-events-none"
          >
            <div className="flex items-center gap-2.5 sm:gap-6 font-semibold uppercase tracking-wider">
              <span className="text-[var(--theme)] font-bold">OEM:</span>
              <span>SDLG</span>
              <span>·</span>
              <span>NOAH</span>
              <span>·</span>
              <span>SHENGYA</span>
              <span>·</span>
              <span>YINENG</span>
            </div>
            <div className="hidden md:flex items-center gap-2 font-mono text-slate-500">
              <Building2 className="w-3.5 h-3.5 text-[var(--theme)]" />
              <span>HOKANDARA DEPOT</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Lower-Third Scrub HUD (Phase B: active during scroll scrubbing) */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.18, 0.25, 0.85, 0.95], [0, 1, 1, 0]),
            pointerEvents: "none",
          }}
          className="relative z-30 max-w-7xl mx-auto w-full pt-4 flex flex-col gap-1.5"
        >
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-xs bg-[var(--theme)] animate-pulse" />
              <span className="text-[var(--ink)] font-bold">SCROLL PLAYHEAD</span>
              <span className="hidden sm:inline-block">· FRAME {String(currentFrame + 1).padStart(3, "0")} / {TOTAL_HERO_FRAMES}</span>
            </div>
            <div className="font-mono text-[var(--theme)] font-bold tracking-wider">
              {timecodeString}
            </div>
          </div>

          {/* Thin Hairline Scrub Progress Indicator (No pills, crisp 2px bar) */}
          <div className="h-[2.5px] w-full bg-slate-200 rounded-xs overflow-hidden">
            <motion.div
              style={{ scaleX: springProgress, transformOrigin: "left" }}
              className="h-full bg-[var(--theme)]"
            />
          </div>
        </motion.div>

        {/* Phase A: Bottom Meta & Clean Transition Indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
          className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-slate-500 pt-3 border-t border-slate-200/80 font-medium"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <span>EST. HOKANDARA — SRI LANKA</span>
            <span className="hidden md:inline-block">·</span>
            <span className="hidden md:inline-block">PAVING / BLOCKS / MACHINERY</span>
          </div>

          <a
            href="#paving"
            className="flex items-center gap-2 text-[var(--theme)] font-bold hover:underline transition-all"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
