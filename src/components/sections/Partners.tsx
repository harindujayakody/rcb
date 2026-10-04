"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export const brandPartners = [
  {
    name: "SDLG Machinery",
    role: "Authorized Sri Lanka Distributor",
    category: "Wheel Loaders · Excavators · Rollers · Graders",
    logo: "/brands/sdlg-lanka_no_bg.png",
    alt: "SDLG Construction Machinery Sri Lanka",
    href: "/products?brand=sdlg",
  },
  {
    name: "Noah Machinery",
    role: "Authorized Distributor",
    category: "Automatic Hydraulic Block Making Machines",
    logo: "/brands/noah.png",
    alt: "Noah Block Making Machinery",
    href: "/products?brand=noah",
  },
  {
    name: "Shandong Shengya",
    role: "Authorized Distributor",
    category: "Block & Interlock Paving Machines",
    logo: "/brands/Shengya_no_bg.png",
    alt: "Shandong Shengya Machinery Co., Ltd.",
    href: "/products?brand=shengya",
  },
  {
    name: "TNY Machine",
    role: "Authorized Distributor",
    category: "Industrial Block Plants & Engineering",
    logo: "/brands/tny.png",
    alt: "TNY Tengyu Machine",
    href: "/products?brand=tny",
  },
];

export function Partners() {
  // Seamless loop marquee array
  const marqueePartners = [...brandPartners, ...brandPartners, ...brandPartners];

  return (
    <section
      id="partners"
      className="relative py-24 md:py-32 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)] overflow-hidden"
      aria-label="Authorized Manufacturing Partners"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-14">
        <div className="max-w-3xl">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2px] bg-[var(--safety)] inline-block" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                GLOBAL OEM ALLIANCES
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--paper)] mb-4">
              AUTHORIZED DISTRIBUTORSHIPS.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-base sm:text-lg text-[var(--steel)] font-body leading-relaxed">
              RCB Holdings represents premier international machinery manufacturers
              with direct factory warranties, genuine spare parts inventory, and certified
              in-house technicians across Sri Lanka.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Infinite Logo Marquee Track */}
      <div className="relative w-full overflow-hidden border-y border-[var(--line-dark)] bg-[var(--graphite)] py-8">
        {/* Vignette gradients */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[var(--ink)] to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[var(--ink)] to-transparent"
          aria-hidden="true"
        />

        <div className="flex w-max animate-marquee space-x-12 items-center">
          {marqueePartners.map((partner, index) => (
            <Link
              key={`${partner.name}-${index}`}
              href={partner.href}
              className="group flex items-center gap-6 px-8 py-4 rounded-xl border border-[var(--line-dark)] bg-[var(--ink)]/60 hover:bg-[var(--ink)] hover:border-[var(--safety)]/50 transition-all duration-300"
              title={`View ${partner.name} machinery`}
            >
              <div className="relative w-36 sm:w-44 h-14 flex items-center justify-center p-2 rounded-lg bg-white/95 group-hover:bg-white transition-all shadow-sm">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 768px) 144px, 176px"
                  className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="font-mono text-[10px] text-[var(--safety)] uppercase tracking-wider">
                  {partner.role}
                </span>
                <span className="font-display text-base text-[var(--paper)] tracking-wide group-hover:text-[var(--safety)] transition-colors">
                  {partner.name}
                </span>
                <span className="font-mono text-[10px] text-[var(--steel)]">
                  {partner.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
