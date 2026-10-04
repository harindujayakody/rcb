"use client";

import React from "react";
import { Marquee } from "@/components/motion/marquee";

export function MarqueeStrip() {
  const words = [
    "INTERLOCK PAVING",
    "BLOCK MACHINES",
    "EARTHMOVERS",
    "HOKANDARA",
    "SDLG DISTRIBUTOR",
    "ROAD ROLLERS",
    "ICTAD REGISTERED",
    "HEAVY INDUSTRY",
  ];

  return (
    <div className="relative z-20 py-10 overflow-hidden bg-[var(--ink)]">
      <div className="w-[110%] -left-[5%] relative -rotate-1 bg-[var(--safety)] text-[var(--safety-ink)] py-3.5 shadow-2xl transition-transform hover:rotate-0 duration-500">
        <Marquee speed={22} pauseOnHover={true}>
          <div className="flex items-center gap-10 font-display text-2xl md:text-3xl tracking-wide select-none">
            {words.map((word, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>{word}</span>
                <span className="text-sm opacity-60">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
