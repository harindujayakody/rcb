"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { timelineMilestones } from "@/lib/data";
import { site } from "@/lib/site";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";

export function Story() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="story"
      className="relative py-28 md:py-36 bg-[var(--canvas-subtle)] text-[var(--ink)] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Full-Width Vision Quote with ScrubText */}
        <div className="max-w-4xl mx-auto text-center mb-24 py-8 border-b border-slate-200">
          <Reveal y={15}>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--theme)] mb-6 font-bold">
              <span className="w-2 h-2 rounded-xs bg-[var(--theme)] inline-block" />
              OUR CORE MANDATE
            </div>
          </Reveal>

          <ScrubText
            text="“To give the best product to customers.”"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[var(--ink)] mb-6"
          />

          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase font-semibold">
            — RCB HOLDINGS (PVT) LTD. FOUNDATIONAL MANDATE
          </p>
        </div>

        {/* Two-Column Story & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
            <div>
              <Reveal y={15}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-5 h-[2.5px] bg-[var(--theme)] inline-block" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--theme)] font-bold">
                    06 — INDUSTRIAL HERITAGE
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1} y={20}>
                <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-[0.95] text-[var(--ink)] mb-4">
                  STRENGTH TO SRI LANKAN INFRASTRUCTURE.
                </h2>
              </Reveal>

              <Reveal delay={0.2} y={20}>
                <p className="text-base text-slate-600 font-body leading-relaxed mb-4">
                  RCB Holdings is an ICTAD Registered Construction Company and the premier
                  importer of Interlock Paving Making Machines in Sri Lanka.
                </p>
                <p className="text-sm text-slate-600 font-body leading-relaxed">
                  As the authorized distributor for SDLG Wheel Loaders, Excavators, Road Rollers,
                  Yineng Loaders, Noah & Shengya Block Making Plants, we support national
                  infrastructure projects and commercial builders island-wide.
                </p>
              </Reveal>
            </div>

            {/* Hokandara Location Facility Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--theme)] font-bold tracking-wider uppercase">
                <MapPin className="w-4 h-4" />
                <span>OPERATIONAL HEADQUARTERS</span>
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-800">
                <p className="font-bold text-sm">{site.address}</p>
                <p className="text-slate-500 flex items-center gap-1.5 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--theme)]" />
                  <span>Mon – Sat: 8:00 AM – 5:30 PM</span>
                </p>
              </div>

              <a
                href={site.map}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-[var(--theme)] hover:text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 text-slate-700"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Vertical Timeline with Scroll Progress Line */}
          <div ref={timelineRef} className="lg:col-span-7 relative pl-8 sm:pl-12 space-y-12">
            {/* Background Line */}
            <div className="absolute left-3 top-3 bottom-3 w-[2px] bg-slate-200" />

            {/* Animated Scroll Progress Line */}
            {!shouldReduceMotion && (
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-3 top-3 w-[2.5px] bg-[var(--theme)] shadow-[0_0_8px_rgba(0,53,128,0.5)] origin-top"
              />
            )}

            {/* Milestones */}
            {timelineMilestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Node Diamond on the line (Zero pills: square rotated 45deg) */}
                <div className="absolute -left-[27px] sm:-left-[43px] top-2 w-3.5 h-3.5 bg-white border-2 border-[var(--theme)] rotate-45 group-hover:scale-125 transition-transform" />

                <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 space-y-3 group-hover:border-[var(--theme)]/40 transition-colors shadow-sm hover:shadow-md">
                  <div className="font-mono text-xs font-bold text-[var(--theme)] tracking-widest uppercase">
                    {milestone.year}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)]">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
