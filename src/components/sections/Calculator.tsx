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
import { ArrowUpRight, Check, Sparkles, ChevronDown } from "lucide-react";

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
      className="relative py-28 md:py-36 bg-[var(--concrete)] text-[var(--slate)] border-y border-[var(--line-light)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[2px] bg-[var(--safety-ink)] inline-block" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety-ink)] font-bold">
                04 — MATERIAL ESTIMATOR
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--ink)] mb-4">
              ESTIMATE YOUR BRICKS IN SECONDS.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-base sm:text-lg text-[var(--slate)] font-body leading-relaxed">
              Calculate accurate block quantities, surface area, and cutting allowances
              calibrated specifically for Sri Lankan project requirements.
            </p>
          </Reveal>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Card (Light surface) */}
          <Card className="lg:col-span-7 bg-[var(--paper)] border-[var(--line-light)] shadow-xl rounded-2xl">
            <CardContent className="p-8 sm:p-10 space-y-8" suppressHydrationWarning>
              {/* Unit Toggle & Paver Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                    Measurement Unit
                  </label>
                  <div className="flex rounded-lg border border-[var(--line-light)] p-1 bg-white" suppressHydrationWarning>
                    <button
                      type="button"
                      onClick={() => setUnit("m")}
                      className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider rounded-md transition-all ${
                        unit === "m"
                          ? "bg-[var(--ink)] text-white font-bold shadow-sm"
                          : "text-[var(--slate)] hover:text-black"
                      }`}
                    >
                      Metres (m)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit("ft")}
                      className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider rounded-md transition-all ${
                        unit === "ft"
                          ? "bg-[var(--ink)] text-white font-bold shadow-sm"
                          : "text-[var(--slate)] hover:text-black"
                      }`}
                    >
                      Feet (ft)
                    </button>
                  </div>
                </div>

                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                    Paver Profile & Depth
                  </label>
                  {mounted ? (
                    <Select value={paverId} onValueChange={setPaverId}>
                      <SelectTrigger className="w-full bg-white border-[var(--line-light)] text-[var(--ink)] font-medium h-[42px] focus:ring-[var(--safety)]" suppressHydrationWarning>
                        <SelectValue placeholder="Select block profile" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[var(--line-light)] text-[var(--ink)]">
                        {pavers.map((p) => (
                          <SelectItem key={p.id} value={p.id} className="font-medium">
                            {p.name} ({p.depth}mm Depth · {p.length}×{p.width}mm)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="w-full bg-white border border-[var(--line-light)] text-[var(--ink)] font-medium h-[42px] rounded-lg px-3 flex items-center justify-between shadow-xs">
                      <span className="text-sm">
                        {selectedPaver.name} ({selectedPaver.depth}mm Depth · {selectedPaver.length}×{selectedPaver.width}mm)
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Length Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[var(--ink)] uppercase tracking-wider">
                    Project Length
                  </span>
                  <span className="px-3 py-1 bg-white border border-[var(--line-light)] rounded font-bold text-sm text-[var(--ink)]">
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
                  <span className="font-bold text-[var(--ink)] uppercase tracking-wider">
                    Project Width
                  </span>
                  <span className="px-3 py-1 bg-white border border-[var(--line-light)] rounded font-bold text-sm text-[var(--ink)]">
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
                  <span className="font-bold text-[var(--ink)] uppercase tracking-wider">
                    Cutting & Edge Wastage Allowance
                  </span>
                  <span className="px-3 py-1 bg-white border border-[var(--line-light)] rounded font-bold text-sm text-[var(--ink)]">
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
                <p className="font-mono text-[11px] text-[var(--slate)]">
                  Standard recommendation: 5% for rectangular areas, 8–10% for curved borders.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Live Results Card (Dark Industrial Surface) */}
          <Card className="lg:col-span-5 bg-[var(--ink)] text-[var(--paper)] border-[var(--line-dark)] shadow-2xl rounded-2xl lg:sticky lg:top-28 overflow-hidden">
            <CardContent className="p-8 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-[var(--line-dark)] pb-4 font-mono text-xs text-[var(--steel)]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-[var(--safety)] inline-block" />
                  ESTIMATED QUANTITY
                </span>
                <span className="text-[var(--safety)] font-bold">
                  {selectedPaver.name} · {selectedPaver.depth}MM
                </span>
              </div>

              {/* Giant Anton Block Count */}
              <div>
                <div className="font-mono text-xs text-[var(--steel)] uppercase tracking-widest mb-1">
                  TOTAL ESTIMATED BLOCKS
                </div>
                <div className="font-display text-6xl sm:text-7xl lg:text-8xl text-[var(--paper)] leading-none tracking-tight">
                  {estimate?.total ? (
                    <CountUp value={estimate.total} duration={1.2} />
                  ) : (
                    "0"
                  )}
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--line-dark)] font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-[var(--graphite)] border border-[var(--line-dark)]">
                  <div className="text-[var(--steel)] uppercase mb-1">Coverage Area</div>
                  <div className="font-display text-xl text-[var(--paper)]">
                    {estimate?.area.toFixed(1)} m²
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--graphite)] border border-[var(--line-dark)]">
                  <div className="text-[var(--steel)] uppercase mb-1">Waste Reserve</div>
                  <div className="font-display text-xl text-[var(--safety)]">
                    +{estimate?.extra.toLocaleString()} units
                  </div>
                </div>
              </div>

              {/* Visual Density Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[11px] text-[var(--steel)]">
                  <span>BASE: {estimate?.base.toLocaleString()}</span>
                  <span>+{waste}% CUTTING</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                  <div className="bg-[var(--paper)] h-full transition-all duration-300" style={{ width: `${100 - waste * 3}%` }} />
                  <div className="bg-[var(--safety)] h-full transition-all duration-300" style={{ width: `${waste * 3}%` }} />
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={mailtoHref}
                className="w-full py-4 rounded-xl bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-xl active:scale-98"
              >
                <span>DISCUSS THIS ESTIMATE WITH RCB</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="font-mono text-[10px] text-[var(--steel)] text-center leading-relaxed">
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
