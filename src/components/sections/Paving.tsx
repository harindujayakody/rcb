"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pavingPatterns } from "@/lib/data";
import { ArrowRight, Layers, Calculator } from "lucide-react";

export function Paving() {
  const [progress, setProgress] = useState(0);

  const activeIndex = Math.min(
    pavingPatterns.length,
    Math.max(1, Math.round(progress * (pavingPatterns.length - 1)) + 1)
  );

  return (
    <section
      id="paving"
      className="relative py-28 md:py-36 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--line-dark)]">
          <div>
            <Reveal y={15}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-[2px] bg-[var(--safety)] inline-block" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                  01 — PAVING CATALOG
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={20}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--paper)]">
                PRECISION INTERLOCK PATTERNS.
              </h2>
            </Reveal>
          </div>

          {/* Counter and Progress Indicator */}
          <div className="flex items-center gap-4 font-mono text-xs text-[var(--steel)]">
            <span className="text-[var(--safety)] font-bold">
              0{activeIndex} / 0{pavingPatterns.length}
            </span>
            <div className="w-32 h-[2px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--safety)] transition-all duration-150"
                style={{ width: `${Math.max(5, progress * 100)}%` }}
              />
            </div>
            <span className="hidden sm:inline-block">SCROLL TO EXPLORE →</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="w-full">
        <HorizontalScroll
          className="px-6 md:px-14"
          trackClassName="gap-8"
          onProgress={setProgress}
        >
          {pavingPatterns.map((pattern, index) => (
            <Card
              key={pattern.id}
              className="w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 bg-[var(--graphite)] border-[var(--line-dark)] text-[var(--paper)] rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 group shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
                  <Image
                    src={pattern.image}
                    alt={pattern.name}
                    fill
                    sizes="(max-width: 768px) 85vw, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-transparent to-transparent opacity-80" />

                  {pattern.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[var(--safety)] text-[var(--safety-ink)] hover:bg-[var(--safety)] font-mono text-[10px] font-bold tracking-wider rounded-md border-none uppercase shadow-md">
                        {pattern.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-4 font-mono text-xs text-[var(--steel)] bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    0{index + 1}
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-6 md:p-8">
                  {/* Mono Spec Row */}
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--safety)] tracking-wider mb-2">
                    <span>{pattern.spec}</span>
                    <span className="text-[var(--steel)] text-[11px] uppercase">
                      RCB STANDARD
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--paper)] tracking-tight mb-3">
                    {pattern.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--steel)] leading-relaxed mb-4 font-body">
                    {pattern.description}
                  </p>

                  <div className="pt-4 border-t border-[var(--line-dark)] flex items-center justify-between font-mono text-[11px] text-[var(--steel)]">
                    <span>IDEAL FOR:</span>
                    <span className="text-[var(--paper)] font-medium text-right">
                      {pattern.idealFor}
                    </span>
                  </div>
                </CardContent>
              </div>

              {/* Bottom Quick Action */}
              <div className="px-6 md:px-8 pb-6">
                <a
                  href="#calculator"
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-[var(--safety)] hover:text-[var(--safety-ink)] text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <span>Estimate this pattern</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </Card>
          ))}

          {/* Final CTA Card */}
          <div className="w-[85vw] sm:w-[340px] shrink-0 bg-[var(--safety)] text-[var(--safety-ink)] rounded-xl p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <span className="w-8 h-8 rounded-full bg-[var(--safety-ink)]/10 flex items-center justify-center">
                <Calculator className="w-4 h-4 text-[var(--safety-ink)]" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest block">
                PROJECT ESTIMATOR
              </span>
              <h3 className="font-display text-3xl sm:text-4xl leading-tight">
                NEED TO KNOW YOUR BRICK COUNT?
              </h3>
              <p className="text-sm text-[var(--safety-ink)]/80 leading-relaxed font-body">
                Use our interactive quantity estimator to calculate exact units,
                m² coverage and cutting allowance.
              </p>
            </div>

            <a
              href="#calculator"
              className="mt-8 w-full py-3.5 rounded-lg bg-[var(--safety-ink)] text-[var(--paper)] font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              <span>LAUNCH CALCULATOR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </HorizontalScroll>
      </div>
    </section>
  );
}
