"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { machineCategories, machineCatalog, MachineModel } from "@/lib/data";
import { site } from "@/lib/site";
import { Phone, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function Machinery() {
  const [activeCategory, setActiveCategory] = useState<string>("block");

  // Determine current showcase image based on active category
  const activeMachines = machineCatalog.filter(
    (m) => m.category === activeCategory
  );
  const featuredImage = activeMachines[0]?.image || "/wheel-loader.jpg";

  return (
    <section
      id="machinery"
      className="relative py-28 md:py-36 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--line-dark)] mb-12">
          <div>
            <Reveal y={15}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-[2px] bg-[var(--safety)] inline-block" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                  02 — HEAVY MACHINERY
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={20}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--paper)]">
                SDLG & INDUSTRIAL FLEET.
              </h2>
            </Reveal>
          </div>

          <p className="max-w-md text-sm text-[var(--steel)] font-body leading-relaxed">
            Authorized distributor for SDLG Wheel Loaders, Excavators, Road
            Rollers, Graders, Yineng Loaders, Noah & Shengya Block Machines.
          </p>
        </div>

        {/* Machinery Tabs & Layout */}
        <Tabs
          defaultValue="block"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full space-y-12"
        >
          {/* Category Selector Tabs */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <TabsList className="bg-[var(--graphite)] border border-[var(--line-dark)] p-1.5 rounded-xl h-auto flex gap-1 w-max">
              {machineCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg data-[state=active]:bg-[var(--safety)] data-[state=active]:text-[var(--safety-ink)] data-[state=active]:font-bold text-[var(--steel)] hover:text-white transition-all"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Two-Column Grid: Sticky Showcase Media (Left) + Model Cards (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Sticky Media Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[var(--graphite)] border border-[var(--line-dark)] shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featuredImage}
                      alt="Featured machine in active category"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-[var(--steel)] bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[var(--line-dark)]">
                  <span className="text-[var(--safety)] font-bold">
                    AUTHORITY SPEC
                  </span>
                  <span>ISLAND-WIDE SUPPORT & SERVICE</span>
                </div>
              </div>

              {/* Warranty & Distributor Seal */}
              <div className="p-5 rounded-xl bg-[var(--graphite)]/60 border border-[var(--line-dark)] space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--paper)] font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4 text-[var(--safety)]" />
                  <span>DIRECT IMPORTER & AUTHORIZED DISTRIBUTOR</span>
                </div>
                <p className="text-xs text-[var(--steel)] font-body leading-relaxed">
                  Full OEM spare parts support, engineer commissioning, and
                  technical service warranty handled directly from our Hokandara
                  depot.
                </p>
              </div>
            </div>

            {/* Right Scrolling Spec Cards */}
            <div className="lg:col-span-7 space-y-8">
              {machineCategories.map((cat) => (
                <TabsContent
                  key={cat.id}
                  value={cat.id}
                  className="space-y-6 mt-0 focus-visible:outline-none"
                >
                  {machineCatalog
                    .filter((m) => m.category === cat.id)
                    .map((machine) => (
                      <Card
                        key={machine.id}
                        className="bg-[var(--graphite)] border-[var(--line-dark)] text-[var(--paper)] rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl"
                      >
                        <CardContent className="p-6 md:p-8 space-y-6">
                          {/* Header row */}
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <span className="font-mono text-xs text-[var(--safety)] tracking-wider uppercase block mb-1">
                                {machine.brand}
                              </span>
                              <h3 className="font-display text-2xl md:text-3xl text-[var(--paper)] tracking-tight">
                                {machine.name}
                              </h3>
                            </div>

                            <Badge
                              className={`font-mono text-[10px] font-bold tracking-wider rounded-md uppercase border-none px-2.5 py-1 ${
                                machine.badge === "IN STOCK"
                                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                  : "bg-[var(--safety)]/15 text-[var(--safety)] border border-[var(--safety)]/30"
                              }`}
                            >
                              {machine.badge}
                            </Badge>
                          </div>

                          <p className="text-sm text-[var(--steel)] leading-relaxed font-body">
                            {machine.summary}
                          </p>

                          {/* Spec Table */}
                          <div className="border border-[var(--line-dark)] rounded-lg overflow-hidden bg-black/20">
                            <Table>
                              <TableBody className="font-mono text-xs divide-y divide-[var(--line-dark)]">
                                {Object.entries(machine.specs).map(
                                  ([key, val]) => (
                                    <TableRow
                                      key={key}
                                      className="hover:bg-white/5 border-none transition-colors"
                                    >
                                      <TableCell className="w-1/3 py-2.5 px-4 text-[var(--steel)] uppercase tracking-wider font-medium">
                                        {key.replace(/([A-Z])/g, " $1")}
                                      </TableCell>
                                      <TableCell className="py-2.5 px-4 text-[var(--paper)] font-bold text-right">
                                        {val}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-mono text-[11px] text-[var(--steel)]">
                              ICTAD REGISTERED FLEET
                            </span>
                            <a
                              href={`#contact`}
                              className="px-5 py-2.5 rounded-lg bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5"
                            >
                              <span>Enquire Model</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>

        {/* Full-Width Machinery CTA Band */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[var(--graphite)] to-[#1a1c20] border border-[var(--line-dark)] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-display text-2xl md:text-3xl text-[var(--paper)]">
              TALK TO OUR TECHNICAL SPECIALISTS.
            </h4>
            <p className="text-sm text-[var(--steel)] font-body">
              Confirm model specifications, bucket capacities, shipping schedules,
              and machine demonstrations at our Hokandara yard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={site.phoneHref}
              className="px-6 py-3.5 rounded-full bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>CALL {site.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
