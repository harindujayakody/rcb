"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Phone, Menu, ArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { site } from "@/lib/site";

const navItems = [
  { label: "Paving", href: "#paving" },
  { label: "Machinery", href: "#machinery" },
  { label: "Transform", href: "#transform" },
  { label: "Calculator", href: "#calculator" },
  { label: "Gallery", href: "#gallery" },
  { label: "Story", href: "#story" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
    // Hide when scrolling down quickly, show when scrolling up
    if (latest > 180 && latest > lastY + 10) {
      setIsHidden(true);
    } else if (latest < lastY - 5) {
      setIsHidden(false);
    }
    setLastY(latest);
  });

  return (
    <>
      {/* 2.5px Royal Blue Scroll Progress Bar at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[var(--theme)] z-[100] origin-left shadow-[0_1px_6px_rgba(0,53,128,0.35)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Light Glassmorphic Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-white/92 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-sm"
            : "bg-white/70 backdrop-blur-sm border-b border-slate-200/40 py-4.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="RCB Holdings Home"
          >
            <span className="w-2.5 h-2.5 bg-[var(--theme)] inline-block transition-transform duration-300 group-hover:rotate-45" />
            <span className="font-display text-2xl md:text-3xl tracking-tight text-[var(--ink)]">
              RCB
            </span>
            <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase hidden sm:inline-block ml-1 pl-2 border-l border-slate-200 font-semibold">
              HOLDINGS
            </span>
          </Link>

          {/* Desktop Navigation Links (Clean Architectural Bar - Zero Pills) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 px-2 py-1 rounded-lg shadow-inner">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-[var(--theme)] font-medium transition-colors rounded-md hover:bg-white hover:shadow-xs"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button & Phone */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 font-mono text-xs text-slate-600 hover:text-[var(--theme)] transition-colors py-1.5 px-3 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--theme)]" />
              <span>{site.phone}</span>
            </a>

            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg bg-[var(--theme)] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[var(--theme-hover)] hover:shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <span>Get a quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Sheet Menu */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={site.phoneHref}
              className="p-2.5 rounded-lg text-[var(--theme)] border border-slate-200 bg-slate-50 hover:bg-slate-100"
              aria-label="Call RCB Holdings"
            >
              <Phone className="w-4 h-4" />
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2.5 rounded-lg text-slate-800 border border-slate-200 bg-slate-50 hover:bg-slate-100"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white border-l border-slate-200 text-slate-900 p-8 flex flex-col justify-between w-[320px]"
              >
                <div className="space-y-8 mt-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[var(--theme)] inline-block" />
                    <span className="font-display text-2xl text-[var(--ink)]">
                      RCB HOLDINGS
                    </span>
                  </div>

                  <nav className="flex flex-col gap-3">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <a
                          href={item.href}
                          className="font-display text-2xl text-slate-800 hover:text-[var(--theme)] transition-colors flex items-center justify-between py-1.5 border-b border-slate-100"
                        >
                          <span>{item.label}</span>
                          <span className="font-mono text-xs text-slate-400">→</span>
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div className="font-mono text-[11px] text-slate-500 font-medium">
                    HOKANDARA NORTH · SRI LANKA
                  </div>
                  <SheetClose asChild>
                    <a
                      href="#contact"
                      className="w-full py-3.5 rounded-lg bg-[var(--theme)] text-white font-mono text-xs font-bold uppercase tracking-wider text-center block shadow-md hover:bg-[var(--theme-hover)]"
                    >
                      REQUEST A QUOTE
                    </a>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
