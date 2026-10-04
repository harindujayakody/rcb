"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { Card, CardContent } from "@/components/ui/card";
import { AppleAwardBadge } from "@/components/brand";
import { statsData, awardsData } from "@/lib/data";

export function Recognition() {
  return (
    <section
      id="achievements"
      className="relative py-28 md:py-36 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2px] bg-[var(--safety)] inline-block" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                07 — RECOGNITION & STATS
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--paper)] mb-4">
              HONORED ACROSS THE NATION.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-base sm:text-lg text-[var(--steel)] font-body leading-relaxed">
              Two milestones in our story. A reminder to keep building, innovating,
              and delivering dependable machinery across Sri Lanka.
            </p>
          </Reveal>
        </div>

        {/* Count-Up Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 pb-16 border-b border-[var(--line-dark)]">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[var(--graphite)] border border-[var(--line-dark)] space-y-2"
            >
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--safety)] leading-none tracking-tight">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-xs font-bold text-[var(--paper)] uppercase tracking-wider">
                {stat.label}
              </div>
              <p className="text-xs text-[var(--steel)] font-body">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Two Award Cards Grid with Symmetrical Apple Award Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awardsData.map((award, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full bg-[var(--graphite)] border-[var(--line-dark)] text-[var(--paper)] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                {/* Photo Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/50">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 font-mono text-xs font-bold bg-[var(--safety)] text-[var(--safety-ink)] px-3 py-1 rounded-md">
                    {award.year}
                  </div>
                </div>

                {/* Card Content with Symmetrical Badge */}
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Prestigious Apple Award Badge */}
                    <div className="flex justify-center py-2">
                      <AppleAwardBadge
                        org={award.org}
                        title={`${award.title.split(" ")[0]} · ${award.year}`}
                        size="lg"
                        className="achievement-award-badge"
                      />
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-center text-[var(--paper)] tracking-tight">
                      {award.title}
                    </h3>

                    <p className="text-sm text-[var(--steel)] text-center font-body leading-relaxed max-w-md mx-auto">
                      {award.detail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--line-dark)] flex items-center justify-between font-mono text-[11px] text-[var(--steel)]">
                    <span>STATUS: CONFERRED</span>
                    <span className="text-[var(--safety)]">CERTIFIED HONORS</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
