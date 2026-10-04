"use client";

import React from "react";
import { Marquee } from "@/components/motion/marquee";

export function MarqueeStrip() {
  const words = [
    "INTERLOCK PAVING",
    "BLOCK MACHINES",
    "SDLG WHEEL LOADERS",
    "HOKANDARA NORTH",
    "ICTAD REGISTERED",
    "ROAD ROLLERS",
    "NOAH MACHINERY",
    "SHENGYA DISTRIBUTOR",
    "ENGINEERING PRECISION",
  ];

  return (
    <div className="relative z-20 py-8 overflow-hidden bg-[var(--canvas)]">
      <div className="w-[110%] -left-[5%] relative -rotate-1 bg-[var(--theme)] text-white py-4 shadow-xl transition-transform hover:rotate-0 duration-500">
        <Marquee speed={24} pauseOnHover={true}>
          <div className="flex items-center gap-12 font-display text-2xl md:text-3xl tracking-wide select-none">
            {words.map((word, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>{word}</span>
                <span className="text-sm opacity-60 text-sky-200">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
