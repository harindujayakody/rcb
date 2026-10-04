"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Calculator, Wrench } from "lucide-react";
import { SplitLines } from "@/components/motion/split-lines";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-24 pb-8 md:pt-28 md:pb-10 px-6 md:px-14 select-none"
    >
      {/* Background Image with Cinematic Parallax & Scale */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/paving-after.webp"
          alt="Heavy interlock paving architectural courtyard"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center filter brightness-[0.72] contrast-[1.08]"
        />
        {/* Cinematic Scrim & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/60 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Top spacing placeholder */}
      <div className="relative z-10" />

      {/* Center Cinematic Content */}
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity }}
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
              <span key="1" className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] tracking-tight leading-[0.9] text-[var(--paper)] block">
                BUILD SOMETHING
              </span>,
              <span key="2" className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] tracking-tight leading-[0.9] text-[var(--safety)] block drop-shadow-[0_4px_24px_rgba(255,178,0,0.25)]">
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

      {/* Bottom Meta & Scroll Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-[var(--steel)] pt-6 border-t border-[var(--line-dark)]/40">
        <div className="flex items-center gap-6">
          <span>EST. HOKANDARA — SRI LANKA</span>
          <span className="hidden md:inline-block">·</span>
          <span className="hidden md:inline-block">PAVING / BLOCKS / MACHINERY</span>
        </div>

        <a
          href="#paving"
          className="flex items-center gap-2 text-[var(--paper)] hover:text-[var(--safety)] transition-colors group"
        >
          <span>SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-[var(--safety)]" />
        </a>
      </div>
    </section>
  );
}
