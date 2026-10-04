"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { machineCategories, machineCatalog } from "@/lib/data";
import { site } from "@/lib/site";
import { Phone, ArrowUpRight, CheckCircle2, ArrowRight } from "lucide-react";

const capabilityCards = [
  {
    id: "earthmovers",
    title: "Wheel Loaders & Earthmovers",
    subtitle: "SDLG & Yineng Heavy Earthmoving Equipment",
    action: "VIEW LOADERS",
    category: "earthmovers",
    image: "/wheel-loader.jpg",
    style: "bg-white border-slate-200 text-slate-900 shadow-sm",
    btnStyle: "bg-slate-900 text-white hover:bg-[var(--theme)]",
  },
  {
    id: "block",
    title: "Hydraulic Block & Paving Plants",
    subtitle: "Noah & Shandong Shengya Automatic Systems",
    action: "VIEW PLANTS",
    category: "block",
    image: "/QT8-15.jpg",
    style: "bg-[var(--theme)] text-white border-[var(--theme)] shadow-lg",
    btnStyle: "bg-white text-[var(--theme)] hover:bg-slate-100",
  },
  {
    id: "compactors",
    title: "Road Rollers & Compactors",
    subtitle: "Vibratory Soil & Asphalt Compactors",
    action: "VIEW ROLLERS",
    category: "compactors",
    image: "/slide-1.jpg",
    style: "bg-[#0A1128] text-white border-slate-800 shadow-xl",
    btnStyle: "bg-[var(--theme)] text-white hover:bg-white hover:text-[var(--ink)]",
  },
  {
    id: "concrete",
    title: "Batching Plants & Mixers",
    subtitle: "Commercial Grade Concrete Engineering",
    action: "VIEW BATCHING",
    category: "concrete",
    image: "/excavator.jpg",
    style: "bg-slate-50 border-slate-200 text-slate-900 shadow-sm",
    btnStyle: "bg-slate-900 text-white hover:bg-[var(--theme)]",
  },
];

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
      className="relative py-28 md:py-36 bg-[var(--canvas-subtle)] text-[var(--ink)] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200 mb-12">
          <div>
            <Reveal y={15}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-[2.5px] bg-[var(--theme)] inline-block" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--theme)] font-bold">
                  02 — HEAVY MACHINERY FLEET
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={20}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--ink)]">
                SDLG & INDUSTRIAL MACHINERY.
              </h2>
            </Reveal>
          </div>

          <p className="max-w-md text-sm text-slate-600 font-body leading-relaxed">
            Authorized distributor for SDLG Wheel Loaders, Excavators, Road
            Rollers, Graders, Yineng Loaders, Noah & Shengya Block Machines in Sri Lanka.
          </p>
        </div>

        {/* 4 High-Impact Capability Cards (Inspired by media_1791103394359.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {capabilityCards.map((card, idx) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveCategory(card.category)}
              className={`p-6 sm:p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative group min-h-[220px] sm:min-h-[250px] ${card.style}`}
            >
              <div className="relative z-10 max-w-[65%] space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-80 block">
                  CAPABILITY 0{idx + 1}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-none">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-body">
                  {card.subtitle}
                </p>
              </div>

              {/* Action Button (Strictly NO pills) */}
              <div className="relative z-10 pt-6">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${card.btnStyle}`}
                >
                  <span>{card.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Emerging Machine Image on the Right */}
              <div className="absolute -right-4 -bottom-4 w-48 sm:w-56 h-36 sm:h-44 rounded-xl overflow-hidden opacity-90 group-hover:scale-105 transition-transform duration-500 shadow-md">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Machinery Specification Sheets */}
        <div className="pt-8 border-t border-slate-200">
          <div className="mb-8">
            <span className="font-mono text-xs text-[var(--theme)] font-bold uppercase tracking-widest block mb-2">
              TECHNICAL SPECIFICATIONS & DEPOT INVENTORY
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[var(--ink)]">
              DETAILED MODEL CATALOG.
            </h3>
          </div>

          <Tabs
            defaultValue="block"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full space-y-10"
          >
            {/* Category Selector Tabs (No pills) */}
            <div className="overflow-x-auto pb-2 scrollbar-none">
              <TabsList className="bg-slate-200/80 border border-slate-300/80 p-1 rounded-xl h-auto flex gap-1 w-max">
                {machineCategories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg data-[state=active]:bg-[var(--theme)] data-[state=active]:text-white data-[state=active]:font-bold text-slate-700 hover:text-slate-900 transition-all"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Two-Column Grid: Sticky Showcase Media (Left) + Model Cards (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Sticky Media Column */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featuredImage}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={featuredImage}
                        alt="Featured machine in active category"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-slate-200 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-700">
                    <span className="text-white font-bold">
                      AUTHORITY SPEC
                    </span>
                    <span className="text-slate-300">ISLAND-WIDE SERVICE & SPARES</span>
                  </div>
                </div>

                {/* Warranty & Distributor Seal Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--theme)] font-bold uppercase">
                    <CheckCircle2 className="w-4 h-4 text-[var(--theme)]" />
                    <span>DIRECT IMPORTER & AUTHORIZED DISTRIBUTOR</span>
                  </div>
                  <p className="text-xs text-slate-600 font-body leading-relaxed">
                    Full OEM spare parts support, engineer commissioning, and
                    technical service warranty handled directly from our Hokandara depot.
                  </p>
                </div>
              </div>

              {/* Right Scrolling Spec Cards */}
              <div className="lg:col-span-7 space-y-6">
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
                          className="bg-white border-slate-200/90 text-[var(--ink)] rounded-2xl overflow-hidden hover:border-[var(--theme)]/50 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <CardContent className="p-6 md:p-8 space-y-6">
                            {/* Header row */}
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <span className="font-mono text-xs text-[var(--theme)] font-bold tracking-wider uppercase block mb-1">
                                  {machine.brand}
                                </span>
                                <h4 className="font-display text-2xl md:text-3xl text-[var(--ink)] tracking-tight">
                                  {machine.name}
                                </h4>
                              </div>

                              <Badge
                                className={`font-mono text-[10px] font-bold tracking-wider rounded-md uppercase border-none px-2.5 py-1 ${
                                  machine.badge === "IN STOCK"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-sky-50 text-[var(--theme)] border border-sky-200"
                                }`}
                              >
                                {machine.badge}
                              </Badge>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed font-body">
                              {machine.summary}
                            </p>

                            {/* Spec Table */}
                            <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                              <Table>
                                <TableBody className="font-mono text-xs divide-y divide-slate-200">
                                  {Object.entries(machine.specs).map(
                                    ([key, val]) => (
                                      <TableRow
                                        key={key}
                                        className="hover:bg-slate-100/60 border-none transition-colors"
                                      >
                                        <TableCell className="w-1/3 py-2.5 px-4 text-slate-600 uppercase tracking-wider font-medium">
                                          {key.replace(/([A-Z])/g, " $1")}
                                        </TableCell>
                                        <TableCell className="py-2.5 px-4 text-slate-900 font-bold text-right">
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
                              <span className="font-mono text-[11px] text-slate-500">
                                ICTAD REGISTERED FLEET
                              </span>
                              <a
                                href="#contact"
                                className="px-5 py-2.5 rounded-lg bg-[var(--theme)] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--theme-hover)] transition-all flex items-center gap-1.5 shadow-sm"
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
        </div>

        {/* Full-Width Machinery Hotline Banner (Light Porcelain Surface) */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-display text-2xl md:text-3xl text-[var(--ink)]">
              TALK TO OUR TECHNICAL SPECIALISTS.
            </h4>
            <p className="text-sm text-slate-600 font-body">
              Confirm model specifications, bucket capacities, shipping schedules,
              and machine demonstrations at our Hokandara yard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={site.phoneHref}
              className="px-6 py-3.5 rounded-lg bg-[var(--theme)] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--theme-hover)] transition-all flex items-center gap-2 shadow-md"
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
