"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pavingPatterns } from "@/lib/data";
import { ArrowRight, Calculator } from "lucide-react";

export function Paving() {
  const [progress, setProgress] = useState(0);

  const activeIndex = Math.min(
    pavingPatterns.length,
    Math.max(1, Math.round(progress * (pavingPatterns.length - 1)) + 1)
  );

  return (
    <section
      id="paving"
      className="relative py-28 md:py-36 bg-[var(--canvas)] text-[var(--ink)] border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <Reveal y={15}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-[2.5px] bg-[var(--theme)] inline-block" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--theme)] font-bold">
                  01 — PAVING CATALOG
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={20}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--ink)]">
                PRECISION INTERLOCK PATTERNS.
              </h2>
            </Reveal>
          </div>

          {/* Counter and Progress Indicator */}
          <div className="flex items-center gap-4 font-mono text-xs text-slate-500">
            <span className="text-[var(--theme)] font-bold">
              0{activeIndex} / 0{pavingPatterns.length}
            </span>
            <div className="w-32 h-[3px] bg-slate-200 relative overflow-hidden rounded-xs">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--theme)] transition-all duration-150"
                style={{ width: `${Math.max(8, progress * 100)}%` }}
              />
            </div>
            <span className="hidden sm:inline-block font-medium">SCROLL TO EXPLORE →</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="w-full">
        <HorizontalScroll
          className="px-6 md:px-12"
          trackClassName="gap-8"
          onProgress={setProgress}
        >
          {pavingPatterns.map((pattern, index) => (
            <Card
              key={pattern.id}
              className="w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 bg-white border-slate-200/90 text-[var(--ink)] rounded-2xl overflow-hidden hover:border-[var(--theme)]/50 transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={pattern.image}
                    alt={pattern.name}
                    fill
                    sizes="(max-width: 768px) 85vw, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {pattern.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[var(--theme)] text-white hover:bg-[var(--theme)] font-mono text-[10px] font-bold tracking-wider rounded-md border-none uppercase shadow-sm">
                        {pattern.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-4 font-mono text-xs text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                    0{index + 1}
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-6 md:p-8">
                  {/* Mono Spec Row */}
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--theme)] font-bold tracking-wider mb-2">
                    <span>{pattern.spec}</span>
                    <span className="text-slate-400 text-[11px] uppercase font-semibold">
                      RCB STANDARD
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] tracking-tight mb-3">
                    {pattern.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 font-body">
                    {pattern.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-[11px] text-slate-500">
                    <span className="font-medium">IDEAL FOR:</span>
                    <span className="text-slate-800 font-semibold text-right">
                      {pattern.idealFor}
                    </span>
                  </div>
                </CardContent>
              </div>

              {/* Bottom Quick Action (Strictly zero pills) */}
              <div className="px-6 md:px-8 pb-6">
                <a
                  href="#calculator"
                  className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-[var(--theme)] hover:text-white text-slate-700 text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <span>Estimate this pattern</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </Card>
          ))}

          {/* Final CTA Card (Royal Precision Theme #003580) */}
          <div className="w-[85vw] sm:w-[350px] shrink-0 bg-[var(--theme)] text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest block text-sky-200">
                PROJECT ESTIMATOR
              </span>
              <h3 className="font-display text-3xl sm:text-4xl leading-tight">
                NEED TO KNOW YOUR BRICK COUNT?
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-body">
                Use our interactive quantity estimator to calculate exact units,
                m² coverage and cutting allowance.
              </p>
            </div>

            <a
              href="#calculator"
              className="mt-8 w-full py-3.5 rounded-lg bg-white text-[var(--theme)] font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-md"
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
