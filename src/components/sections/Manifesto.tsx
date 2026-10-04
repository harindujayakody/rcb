"use client";

import React from "react";
import { ScrubText } from "@/components/motion/scrub-text";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "lucide-react";

export function Manifesto() {
  const manifestoCopy =
    "Some projects start with a sketch. Others with a patch of earth. Wherever yours begins — find the paving, the blocks and the machines to move it forward.";

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-14 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)]">
      <div className="max-w-5xl mx-auto flex flex-col items-start gap-12">
        {/* Eyebrow */}
        <Reveal y={15}>
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[var(--safety)] inline-block" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
              THE RCB MANIFESTO
            </span>
          </div>
        </Reveal>

        {/* Scrubbed Word-by-Word Manifesto Paragraph */}
        <div className="py-6">
          <ScrubText
            text={manifestoCopy}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-[var(--paper)]"
            wordClassName="transition-colors"
          />
        </div>

        {/* Bottom Navigation Cue */}
        <Reveal delay={0.2} y={15}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full pt-8 border-t border-[var(--line-dark)]">
            <span className="font-mono text-xs text-[var(--steel)] uppercase tracking-widest">
              FROM THE FIRST BLOCK. TO THE FINAL FINISH.
            </span>

            <a
              href="#story"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--safety)] hover:text-white transition-colors group"
            >
              <span>Get to know our story</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
