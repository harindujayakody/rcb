"use client";

import React from "react";
import { Marquee } from "@/components/motion/marquee";
import { site } from "@/lib/site";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-white text-slate-800 border-t border-slate-200 overflow-hidden">
      {/* Giant Outlined Marquee Band in Royal Blue */}
      <div className="py-8 bg-slate-50/80 border-b border-slate-200 overflow-hidden select-none opacity-60 hover:opacity-100 transition-opacity">
        <Marquee speed={32} pauseOnHover={false}>
          <div className="flex items-center gap-12 font-display text-7xl sm:text-8xl md:text-9xl tracking-tighter text-transparent stroke-text-royal">
            <span>RCB HOLDINGS</span>
            <span className="text-[var(--theme)] text-4xl">✦</span>
            <span>HEAVY INDUSTRY</span>
            <span className="text-[var(--theme)] text-4xl">✦</span>
            <span>SRI LANKA</span>
            <span className="text-[var(--theme)] text-4xl">✦</span>
          </div>
        </Marquee>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[var(--theme)] inline-block" />
              <span className="font-display text-3xl tracking-tight text-[var(--ink)]">
                RCB HOLDINGS
              </span>
            </div>

            <p className="text-sm text-slate-600 font-body leading-relaxed max-w-sm">
              Sri Lanka&apos;s authoritative importer of Interlock Paving Making
              Machines, and Authorized Distributor for SDLG Wheel Loaders,
              Excavators, Road Rollers, Yineng and Noah Block Plants.
            </p>

            <div className="font-mono text-xs text-[var(--theme)] font-bold tracking-wider">
              ICTAD REGISTERED CONSTRUCTION ENTITY
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme)]">
              EXPLORE DIRECTORY
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-slate-600">
              <li>
                <a href="#paving" className="hover:text-[var(--theme)] transition-colors">
                  01 — Paving Block Catalog
                </a>
              </li>
              <li>
                <a href="#machinery" className="hover:text-[var(--theme)] transition-colors">
                  02 — Heavy Machinery Fleet
                </a>
              </li>
              <li>
                <a href="#transform" className="hover:text-[var(--theme)] transition-colors">
                  03 — Site Transformation
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[var(--theme)] transition-colors">
                  04 — Material Quantity Calculator
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[var(--theme)] transition-colors">
                  05 — Field Archive Photo Gallery
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[var(--theme)] transition-colors">
                  06 — Company Heritage & Story
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-[var(--theme)] transition-colors">
                  07 — National Honors & Awards
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme)]">
              OPERATIONAL HEADQUARTERS
            </div>
            <div className="space-y-3 font-mono text-xs text-slate-600">
              <p className="text-slate-900 font-medium">{site.address}</p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--theme)]" />
                <span>{site.phone} / {site.office}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--theme)]" />
                <span>{site.email}</span>
              </p>
              <p className="pt-2 text-[var(--theme)] font-bold">
                OPERATING HOURS: MON – SAT 8:00 AM – 5:30 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} RCB HOLDINGS (PVT) LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span>BUILT BY</span>
            <span className="text-slate-900 font-bold">INFIAX</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text-royal {
          -webkit-text-stroke: 1.5px rgba(0, 53, 128, 0.28);
        }
      `}</style>
    </footer>
  );
}
