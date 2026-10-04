"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { timelineMilestones } from "@/lib/data";
import { site } from "@/lib/site";
import { MapPin, Clock, ArrowUpRight, Award, ShieldCheck } from "lucide-react";

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
      className="relative py-28 md:py-36 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Full-Width Vision Quote with ScrubText */}
        <div className="max-w-4xl mx-auto text-center mb-28 py-8 border-b border-[var(--line-dark)]">
          <Reveal y={15}>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--safety)] mb-6">
              <span className="w-2 h-2 rounded-none bg-[var(--safety)] inline-block" />
              OUR CORE MANDATE
            </div>
          </Reveal>

          <ScrubText
            text="“To give the best product to customers.”"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[var(--paper)] mb-6"
          />

          <p className="font-mono text-xs text-[var(--steel)] tracking-widest uppercase">
            — RCB HOLDINGS (PVT) LTD. FOUNDATIONAL PRINCIPLE
          </p>
        </div>

        {/* Two-Column Story & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div>
              <Reveal y={15}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-5 h-[2px] bg-[var(--safety)] inline-block" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                    06 — INDUSTRIAL HERITAGE
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1} y={20}>
                <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-[0.95] text-[var(--paper)] mb-4">
                  STRENGTH TO SRI LANKAN INFRASTRUCTURE.
                </h2>
              </Reveal>

              <Reveal delay={0.2} y={20}>
                <p className="text-base text-[var(--steel)] font-body leading-relaxed mb-6">
                  RCB Holdings is an ICTAD Registered Construction Company and the premier
                  importer of Interlock Paving Making Machines in Sri Lanka.
                </p>
                <p className="text-sm text-[var(--steel)] font-body leading-relaxed">
                  As the authorized distributor for SDLG Wheel Loaders, Excavators, Road Rollers,
                  Yineng Loaders, Noah & Shengya Block Making Plants, we support both national
                  contractors and private developments with heavy-duty reliability.
                </p>
              </Reveal>
            </div>

            {/* Hokandara Location Facility Card */}
            <div className="p-6 rounded-xl bg-[var(--graphite)] border border-[var(--line-dark)] space-y-4 shadow-xl">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--safety)] font-bold tracking-wider uppercase">
                <MapPin className="w-4 h-4" />
                <span>OPERATIONAL HEADQUARTERS</span>
              </div>

              <div className="space-y-1 font-mono text-xs text-[var(--paper)]">
                <p className="font-bold">{site.address}</p>
                <p className="text-[var(--steel)] flex items-center gap-1.5 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--safety)]" />
                  <span>Mon – Sat: 8:00 AM – 5:30 PM</span>
                </p>
              </div>

              <a
                href={site.map}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-[var(--safety)] hover:text-[var(--safety-ink)] text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Vertical Timeline with Scroll Progress Line */}
          <div ref={timelineRef} className="lg:col-span-7 relative pl-8 sm:pl-12 space-y-14">
            {/* Background Line */}
            <div className="absolute left-3 top-3 bottom-3 w-[2px] bg-white/10" />

            {/* Animated Scroll Progress Line */}
            {!shouldReduceMotion && (
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-3 top-3 w-[2px] bg-[var(--safety)] shadow-[0_0_10px_rgba(255,178,0,0.8)] origin-top"
              />
            )}

            {/* Milestones */}
            {timelineMilestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Node dot on the line */}
                <div className="absolute -left-[27px] sm:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-[var(--ink)] border-2 border-[var(--safety)] flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--safety)]" />
                </div>

                <div className="p-6 md:p-8 rounded-xl bg-[var(--graphite)] border border-[var(--line-dark)] space-y-3 group-hover:border-white/20 transition-colors shadow-lg">
                  <div className="font-mono text-xs font-bold text-[var(--safety)] tracking-widest uppercase">
                    {milestone.year}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--paper)]">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[var(--steel)] leading-relaxed font-body">
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
