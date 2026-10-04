"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { estimatePavers, pavers } from "@/lib/calculator";
import { site } from "@/lib/site";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function Calculator() {
  const [mounted, setMounted] = useState(false);
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(6);
  const [unit, setUnit] = useState<"m" | "ft">("m");
  const [paverId, setPaverId] = useState<string>("un2");
  const [waste, setWaste] = useState<number>(5);

  useEffect(() => {
    setMounted(true);
  }, []);

  const estimate = useMemo(() => {
    return estimatePavers(length, width, unit, paverId, waste);
  }, [length, width, unit, paverId, waste]);

  const selectedPaver = pavers.find((p) => p.id === paverId) || pavers[0];

  // Prefilled enquiry link
  const enquirySubject = encodeURIComponent("Paver Estimation Inquiry - RCB Holdings");
  const enquiryBody = encodeURIComponent(
    `Hello RCB Holdings team,\n\nI calculated an estimate on your website for my project:\n- Paver Type: ${selectedPaver.name} (${selectedPaver.depth}mm)\n- Dimensions: ${length} × ${width} ${unit}\n- Total Area: ${estimate?.area.toFixed(1)} m²\n- Estimated Quantity: ${estimate?.total.toLocaleString()} blocks (with ${waste}% allowance)\n\nPlease provide availability and supply terms.\n\nThank you!`
  );
  const mailtoHref = `mailto:${site.email}?subject=${enquirySubject}&body=${enquiryBody}`;

  return (
    <section
      id="calculator"
      className="relative py-28 md:py-36 bg-[var(--canvas-subtle)] text-[var(--ink)] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2.5px] bg-[var(--theme)] inline-block" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--theme)] font-bold">
                04 — MATERIAL QUANTITY ESTIMATOR
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--ink)] mb-4">
              ESTIMATE YOUR BRICKS IN SECONDS.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
              Calculate accurate block quantities, surface area, and cutting allowances
              calibrated specifically for Sri Lankan project requirements.
            </p>
          </Reveal>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Card (Light Surface) */}
          <Card className="lg:col-span-7 bg-white border-slate-200 shadow-md rounded-2xl">
            <CardContent className="p-8 sm:p-10 space-y-8" suppressHydrationWarning>
              {/* Unit Toggle & Paver Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                    Measurement Unit
                  </label>
                  <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50" suppressHydrationWarning>
                    <button
                      type="button"
                      onClick={() => setUnit("m")}
                      className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider rounded-md transition-all ${
                        unit === "m"
                          ? "bg-[var(--theme)] text-white font-bold shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Metres (m)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit("ft")}
                      className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider rounded-md transition-all ${
                        unit === "ft"
                          ? "bg-[var(--theme)] text-white font-bold shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Feet (ft)
                    </button>
                  </div>
                </div>

                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                    Paver Profile & Depth
                  </label>
                  {mounted ? (
                    <Select value={paverId} onValueChange={setPaverId}>
                      <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-slate-900 font-medium h-[42px] focus:ring-[var(--theme)] rounded-lg" suppressHydrationWarning>
                        <SelectValue placeholder="Select block profile" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 text-slate-900 rounded-lg">
                        {pavers.map((p) => (
                          <SelectItem key={p.id} value={p.id} className="font-medium">
                            {p.name} ({p.depth}mm Depth · {p.length}×{p.width}mm)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium h-[42px] rounded-lg px-3 flex items-center justify-between shadow-xs">
                      <span className="text-sm">
                        {selectedPaver.name} ({selectedPaver.depth}mm Depth · {selectedPaver.length}×{selectedPaver.width}mm)
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Length Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">
                    Project Length
                  </span>
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md font-bold text-sm text-[var(--theme)]">
                    {length} {unit}
                  </span>
                </div>
                <Slider
                  value={[length]}
                  min={1}
                  max={unit === "m" ? 100 : 328}
                  step={1}
                  onValueChange={(val) => setLength(val[0])}
                  className="py-2"
                />
              </div>

              {/* Width Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">
                    Project Width
                  </span>
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md font-bold text-sm text-[var(--theme)]">
                    {width} {unit}
                  </span>
                </div>
                <Slider
                  value={[width]}
                  min={1}
                  max={unit === "m" ? 60 : 196}
                  step={1}
                  onValueChange={(val) => setWidth(val[0])}
                  className="py-2"
                />
              </div>

              {/* Cutting Allowance Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">
                    Cutting & Edge Wastage Allowance
                  </span>
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md font-bold text-sm text-[var(--theme)]">
                    {waste}%
                  </span>
                </div>
                <Slider
                  value={[waste]}
                  min={0}
                  max={15}
                  step={1}
                  onValueChange={(val) => setWaste(val[0])}
                  className="py-2"
                />
                <p className="font-mono text-[11px] text-slate-500 font-medium">
                  Standard recommendation: 5% for rectangular areas, 8–10% for curved borders.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Live Results Card (Royal Blue Anchor #003580) */}
          <Card className="lg:col-span-5 bg-[var(--theme)] text-white border-blue-900/50 shadow-2xl rounded-2xl lg:sticky lg:top-24 overflow-hidden">
            <CardContent className="p-8 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/20 pb-4 font-mono text-xs text-sky-200">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-xs bg-white inline-block" />
                  ESTIMATED QUANTITY
                </span>
                <span className="text-white font-bold">
                  {selectedPaver.name} · {selectedPaver.depth}MM
                </span>
              </div>

              {/* Giant Anton Block Count */}
              <div>
                <div className="font-mono text-xs text-sky-200 uppercase tracking-widest mb-1 font-semibold">
                  TOTAL ESTIMATED BLOCKS
                </div>
                <div className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-tight">
                  {estimate?.total ? (
                    <CountUp value={estimate.total} duration={1.2} />
                  ) : (
                    "0"
                  )}
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-sky-200 uppercase mb-1">Coverage Area</div>
                  <div className="font-display text-xl text-white">
                    {estimate?.area.toFixed(1)} m²
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-sky-200 uppercase mb-1">Waste Reserve</div>
                  <div className="font-display text-xl text-sky-300">
                    +{estimate?.extra.toLocaleString()} units
                  </div>
                </div>
              </div>

              {/* Visual Density Progress Bar (Zero pills: rounded-md) */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[11px] text-sky-200">
                  <span>BASE: {estimate?.base.toLocaleString()}</span>
                  <span>+{waste}% CUTTING</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-md overflow-hidden flex">
                  <div className="bg-white h-full transition-all duration-300" style={{ width: `${100 - waste * 3}%` }} />
                  <div className="bg-sky-300 h-full transition-all duration-300" style={{ width: `${waste * 3}%` }} />
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={mailtoHref}
                className="w-full py-4 rounded-xl bg-white text-[var(--theme)] font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-md active:scale-98"
              >
                <span>DISCUSS THIS ESTIMATE WITH RCB</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="font-mono text-[10px] text-sky-200/80 text-center leading-relaxed">
                * Quantities calculated mathematically based on block dimensions.
                Site contours and edge cutting may require minor on-site adjustment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
