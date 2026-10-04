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
      className="relative py-28 md:py-36 bg-[var(--canvas)] text-[var(--ink)] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2.5px] bg-[var(--theme)] inline-block" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--theme)] font-bold">
                07 — RECOGNITION & VERIFIED IMPACT
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--ink)] mb-4">
              HONORED ACROSS THE NATION.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
              Two milestones in our story. A reminder to keep building, innovating,
              and delivering dependable machinery and paving solutions across Sri Lanka.
            </p>
          </Reveal>
        </div>

        {/* Count-Up Stats Row (Light Modular Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 pb-16 border-b border-slate-200">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--theme)] leading-none tracking-tight">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-xs font-bold text-[var(--ink)] uppercase tracking-wider">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500 font-body">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Two Award Cards Grid with 2-Column Inline Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awardsData.map((award, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full bg-white border-slate-200 text-[var(--ink)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
                {/* Photo Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 font-mono text-xs font-bold bg-[var(--theme)] text-white px-3.5 py-1 rounded-md shadow-sm">
                    {award.year}
                  </div>
                </div>

                {/* Card Content with Symmetrical Laurel Badge */}
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Prestigious Apple Award Badge (Light Theme) */}
                    <div className="flex justify-center py-2">
                      <AppleAwardBadge
                        org={award.org}
                        title={`${award.title.split(" ")[0]} · ${award.year}`}
                        size="lg"
                        theme="light"
                        className="shadow-2xs"
                      />
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-center text-[var(--ink)] tracking-tight">
                      {award.title}
                    </h3>

                    <p className="text-sm text-slate-600 text-center font-body leading-relaxed max-w-md mx-auto">
                      {award.detail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-[11px] text-slate-500">
                    <span className="font-medium">STATUS: CONFERRED</span>
                    <span className="text-[var(--theme)] font-bold">CERTIFIED HONORS</span>
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
