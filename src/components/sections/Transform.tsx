"use client";

import React from "react";
import { Reveal } from "@/components/motion/reveal";
import { CompareSlider } from "@/components/motion/compare-slider";

export function Transform() {
  return (
    <section
      id="transform"
      className="relative py-28 md:py-36 bg-[var(--canvas)] text-[var(--ink)] border-t border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2.5px] bg-[var(--theme)] inline-block" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--theme)] font-bold">
                03 — SITE TRANSFORMATION
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--ink)] mb-4">
              FROM UNPAVED GROUND TO TIMELESS FINISH.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
              Drag the interactive handle across the frame to witness the transformation
              that high-density interlock paving brings to residential estates and commercial properties.
            </p>
          </Reveal>
        </div>

        {/* Custom Compare Slider Component */}
        <Reveal delay={0.3} y={25}>
          <CompareSlider
            beforeImage="/paving-before.webp"
            afterImage="/paving-after.webp"
            beforeAlt="Raw driveway ground before paving"
            afterAlt="Architectural finished courtyard with interlock paving"
            caption="A better welcome, from the ground up."
          />
        </Reveal>
      </div>
    </section>
  );
}
