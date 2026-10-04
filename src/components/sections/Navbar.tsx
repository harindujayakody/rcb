"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { site } from "@/lib/site";

const navItems = [
  { label: "Paving", href: "#paving" },
  { label: "Machinery", href: "#machinery" },
  { label: "Transform", href: "#transform" },
  { label: "Calculator", href: "#calculator" },
  { label: "Gallery", href: "#gallery" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
    // Hide when scrolling down fast, show when scrolling up
    if (latest > 200 && latest > lastY + 10) {
      setIsHidden(true);
    } else if (latest < lastY - 5) {
      setIsHidden(false);
    }
    setLastY(latest);
  });

  return (
    <>
      {/* 2px Amber Scroll Progress Bar at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--safety)] z-[100] origin-left shadow-[0_0_8px_rgba(255,178,0,0.8)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-[var(--ink)]/85 backdrop-blur-md border-b border-[var(--line-dark)] py-3.5 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="RCB Holdings Home"
          >
            <span className="w-2.5 h-2.5 bg-[var(--safety)] inline-block transition-transform duration-300 group-hover:rotate-45" />
            <span className="font-display text-2xl md:text-3xl tracking-tight text-[var(--paper)]">
              RCB
            </span>
            <span className="font-mono text-[10px] text-[var(--steel)] tracking-widest uppercase hidden sm:inline-block ml-1 pl-2 border-l border-[var(--line-dark)]">
              HOLDINGS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--graphite)]/60 backdrop-blur-sm border border-[var(--line-dark)] px-4 py-1.5 rounded-full shadow-inner">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[var(--steel)] hover:text-[var(--paper)] transition-colors rounded-full hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button & Phone */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 font-mono text-xs text-[var(--steel)] hover:text-[var(--safety)] transition-colors py-1.5 px-3 rounded-lg border border-transparent hover:border-[var(--line-dark)]"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--safety)]" />
              <span>{site.phone}</span>
            </a>

            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,178,0,0.4)] active:scale-95 flex items-center gap-1.5"
            >
              <span>Get a quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Sheet Menu */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={site.phoneHref}
              className="p-2 rounded-lg text-[var(--safety)] border border-[var(--line-dark)] bg-[var(--graphite)]"
              aria-label="Call RCB Holdings"
            >
              <Phone className="w-4 h-4" />
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-lg text-[var(--paper)] border border-[var(--line-dark)] bg-[var(--graphite)]"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[var(--ink)] border-l border-[var(--line-dark)] text-[var(--paper)] p-8 flex flex-col justify-between w-[300px]"
              >
                <div className="space-y-8 mt-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[var(--safety)] inline-block" />
                    <span className="font-display text-2xl text-[var(--paper)]">
                      RCB HOLDINGS
                    </span>
                  </div>

                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <a
                          href={item.href}
                          className="font-display text-2xl text-[var(--paper)] hover:text-[var(--safety)] transition-colors flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                          <span className="font-mono text-xs text-[var(--steel)]">→</span>
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                </div>

                <div className="space-y-4 pt-6 border-t border-[var(--line-dark)]">
                  <div className="font-mono text-[11px] text-[var(--steel)]">
                    HOKANDARA NORTH · SRI LANKA
                  </div>
                  <SheetClose asChild>
                    <a
                      href="#contact"
                      className="w-full py-3 rounded-xl bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-xs font-bold uppercase tracking-wider text-center block"
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
