"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import {
  Calculator,
  Wrench,
  ShieldCheck,
  ArrowDown,
  Play,
  Pause,
  Layers,
  MapPin,
} from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Awards } from "@/components/brand";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const rows = 8;
const columns = 14;

// Perspective mapping for Sri Lankan estate courtyard ground (paving-before / paving-after)
// Tropical villa portico & landscape sit in the top 44%; ground extends from 0.44 to 1.00
const groundStart = 0.44;
const groundEnd = 1.0;

const blocks = Array.from({ length: rows * columns }, (_, index) => {
  const row = Math.floor(index / columns);
  const col = index % columns;

  // Non-linear vertical perspective: foreground rows closer to bottom are taller
  const tTop = Math.pow(row / rows, 1.4);
  const tBottom = Math.pow((row + 1) / rows, 1.4);
  const top = groundStart + tTop * (groundEnd - groundStart);
  const bottom = groundStart + tBottom * (groundEnd - groundStart);

  // Perspective width factor: ground is narrower near portico and spans full width at bottom
  const rowProgress = (row + 0.5) / rows;
  const widthFactor = 0.82 + rowProgress * 0.18;
  const rowMargin = (1 - widthFactor) / 2;

  // Stagger alternating rows by half a block for authentic interlocking masonry
  const offset = (row % 2) * 0.5;
  const leftNorm = (col - offset) / (columns - 1);
  const rightNorm = (col + 1 - offset) / (columns - 1);

  const left = rowMargin + leftNorm * widthFactor;
  const right = rowMargin + rightNorm * widthFactor;

  // Dynamic stone arrival order: begins near villa entrance and sweeps outward into foreground
  const centerDelta = Math.abs(col - (columns / 2 - 0.5)) / (columns / 2);
  const start = 0.05 + (row / rows) * 0.62 + centerDelta * 0.18;

  return {
    id: index,
    row,
    col,
    top,
    bottom,
    left,
    right,
    start: Math.min(0.92, Math.max(0.04, start)),
  };
});

const stages = [
  { id: 0, label: "01 Subgrade", target: 0.05, desc: "Graded base" },
  { id: 1, label: "02 Placement", target: 0.52, desc: "Interlock assembly" },
  { id: 2, label: "03 Finished", target: 1.0, desc: "Locked 50 MPa" },
];

export function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Direct DOM refs to avoid React re-render churn during continuous 60fps canvas scrub
  const statusBadgeRef = useRef<HTMLSpanElement>(null);
  const statusDotRef = useRef<HTMLSpanElement>(null);

  const prefersReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredBlockInfo, setHoveredBlockInfo] = useState<string | null>(null);

  // Target progress refs driven by Motion's useScroll
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Motion-driven scroll tracking on the hero section pinned track
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReduced || paused) return;
    targetProgressRef.current = clamp(0.04 + latest * 1.25);
  });

  // Canvas brick assembly render loop
  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!scene || !canvas || !context) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const before = new window.Image();
    const after = new window.Image();
    const pointer = { x: 0.5, y: 0.5, active: false };

    let frame = 0;
    let disposed = false;
    let visible = true;
    let loaded = false;
    let width = 0;
    let height = 0;

    const paint = () => {
      frame = 0;
      if (!loaded || disposed || !width || !height) return;

      const still = prefersReduced || paused;
      const target = still ? 1 : targetProgressRef.current;

      if (still) {
        currentProgressRef.current = target;
      } else {
        currentProgressRef.current += (target - currentProgressRef.current) * 0.14;
        if (Math.abs(target - currentProgressRef.current) < 0.001) {
          currentProgressRef.current = target;
        }
      }

      const p = currentProgressRef.current;

      // Direct DOM update for performance (Zero React state re-render overhead)
      if (statusBadgeRef.current) {
        statusBadgeRef.current.textContent =
          p >= 0.95
            ? "HERRINGBONE LOCKED (100%)"
            : `ASSEMBLING: ${Math.round(p * 100)}%`;
      }
      if (statusDotRef.current) {
        statusDotRef.current.className = `w-2 h-2 rounded-xs ${
          p >= 0.95 ? "bg-emerald-500" : "bg-[#003580] animate-pulse"
        }`;
      }

      // Sync active stage button state
      const nextStage = p < 0.3 ? 0 : p < 0.85 ? 1 : 2;
      setActiveStage((prev) => (prev !== nextStage ? nextStage : prev));

      const scale = Math.max(width / after.naturalWidth, height / after.naturalHeight);
      const imageWidth = after.naturalWidth * scale;
      const imageHeight = after.naturalHeight * scale;
      const imageX = (width - imageWidth) * 0.5;
      const imageY = (height - imageHeight) * 0.5;

      const drawPhoto = (photo: HTMLImageElement) =>
        context.drawImage(photo, imageX, imageY, imageWidth, imageHeight);

      context.clearRect(0, 0, width, height);

      // 1. Draw raw compacted subgrade foundation base
      drawPhoto(before);

      // 2. Draw dynamic interlocking bricks locking into place ("ගල් අල්ලාගෙන එනවා")
      if (p >= 0.98) {
        drawPhoto(after);
      } else {
        for (const block of blocks) {
          const amount = clamp((p - block.start) / 0.14);
          if (amount === 0) {
            // Unplaced stone: draw subtle blueprint guide on ground
            if (p > 0.08 && p < 0.45) {
              const bx = imageX + block.left * imageWidth;
              const by = imageY + block.top * imageHeight;
              const bw = (block.right - block.left) * imageWidth;
              const bh = (block.bottom - block.top) * imageHeight;
              context.strokeStyle = "rgba(0, 53, 128, 0.12)";
              context.lineWidth = 1;
              context.setLineDash([3, 3]);
              context.strokeRect(bx, by, bw, bh);
              context.setLineDash([]);
            }
            continue;
          }

          // Cubic ease-out kinetic drop motion for stone placement
          const eased = 1 - Math.pow(1 - amount, 3);
          const bx = imageX + block.left * imageWidth;
          const by = imageY + block.top * imageHeight;
          const bw = (block.right - block.left) * imageWidth + 1;
          const bh = (block.bottom - block.top) * imageHeight + 1;

          context.save();
          context.globalAlpha = eased;

          // 3D downward landing offset: stone drops into place with physical presence
          const dropY = -24 * (1 - eased);
          context.translate(0, dropY);

          context.beginPath();
          context.rect(bx, by, bw, bh);
          context.clip();

          // Render high-density interlock brick texture through clipped bounds
          drawPhoto(after);

          // Kinetic settling highlight as stone locks into joint
          if (eased < 0.92) {
            context.fillStyle = `rgba(0, 53, 128, ${(0.35 * (1 - eased)).toFixed(3)})`;
            context.fillRect(bx, by, bw, bh);
            context.strokeStyle = `rgba(235, 243, 255, ${(0.8 * (1 - eased)).toFixed(3)})`;
            context.lineWidth = 2;
            context.strokeRect(bx, by, bw, bh);
          }

          context.restore();
        }
      }

      // 3. Interactive blueprint inspection crosshair on hover
      if (pointer.active && !still && finePointer.matches) {
        const px = (pointer.x * width - imageX) / imageWidth;
        const py = (pointer.y * height - imageY) / imageHeight;

        if (py >= groundStart && py <= groundEnd) {
          const hoveredBlock = blocks.find(
            (b) =>
              px >= b.left &&
              px < b.right &&
              py >= b.top &&
              py < b.bottom &&
              p > b.start
          );

          if (hoveredBlock) {
            const hx = imageX + hoveredBlock.left * imageWidth;
            const hy = imageY + hoveredBlock.top * imageHeight;
            const hw = (hoveredBlock.right - hoveredBlock.left) * imageWidth;
            const hh = (hoveredBlock.bottom - hoveredBlock.top) * imageHeight;

            // Precision architectural highlight
            context.fillStyle = "rgba(0, 53, 128, 0.16)";
            context.strokeStyle = "#003580";
            context.lineWidth = 2;
            context.fillRect(hx, hy, hw, hh);
            context.strokeRect(hx, hy, hw, hh);
          }
        }
      }

      const settling = Math.abs(target - p) > 0.001;
      if ((settling || !still) && visible && !document.hidden) {
        frame = requestAnimationFrame(paint);
      }
    };

    const schedule = () => {
      if (!frame && visible && loaded && !document.hidden) {
        frame = requestAnimationFrame(paint);
      }
    };

    const resize = () => {
      const rect = scene.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || prefersReduced) return;
      const bounds = scene.getBoundingClientRect();
      pointer.x = clamp((event.clientX - bounds.left) / bounds.width);
      pointer.y = clamp((event.clientY - bounds.top) / bounds.height);
      pointer.active = true;

      const imageScale = Math.max(bounds.width / 1920, bounds.height / 1080);
      const imgW = 1920 * imageScale;
      const imgH = 1080 * imageScale;
      const imgX = (bounds.width - imgW) * 0.5;
      const imgY = (bounds.height - imgH) * 0.5;
      const px = (pointer.x * bounds.width - imgX) / imgW;
      const py = (pointer.y * bounds.height - imgY) / imgH;

      if (py >= groundStart && py <= groundEnd) {
        const found = blocks.find(
          (b) =>
            px >= b.left &&
            px < b.right &&
            py >= b.top &&
            py < b.bottom &&
            currentProgressRef.current > b.start
        );
        if (found) {
          setHoveredBlockInfo(
            `80mm Heavy-Duty Interlock · Block #${found.id + 1} · 50 MPa`
          );
        } else {
          setHoveredBlockInfo(null);
        }
      } else {
        setHoveredBlockInfo(null);
      }

      schedule();
    };

    const onPointerLeave = () => {
      pointer.x = 0.5;
      pointer.y = 0.5;
      pointer.active = false;
      setHoveredBlockInfo(null);
      schedule();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        schedule();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    before.src = "/paving-before.webp";
    after.src = "/paving-after.webp";

    Promise.all([before.decode(), after.decode()])
      .then(() => {
        if (disposed) return;
        loaded = true;
        resize();
        currentProgressRef.current = prefersReduced || paused ? 1 : targetProgressRef.current;
        paint();
        setReady(true);
      })
      .catch(() => {
        // Semantic fallback Next.js Image remains visible
      });

    resizeObserver.observe(scene);
    visibilityObserver.observe(scene);
    scene.addEventListener("pointermove", onPointerMove, { passive: true });
    scene.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused, prefersReduced]);

  const selectStage = (index: number) => {
    setActiveStage(index);
    const targetProgressVal = stages[index].target;
    const hero = heroSectionRef.current;
    if (!hero) return;

    const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
    const scrollTarget = hero.offsetTop + targetProgressVal * distance;

    window.scrollTo({
      top: scrollTarget,
      behavior: prefersReduced ? "instant" : "smooth",
    });
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative bg-[var(--canvas)] text-[var(--ink)] select-none border-b border-[var(--border)] pt-20 sm:pt-24 lg:pt-20 min-h-auto lg:min-h-[220vh]"
      aria-label="RCB Holdings Engineering Hero"
    >
      {/* Viewport Container: sticky split-screen on desktop, natural flow on mobile */}
      <div className="lg:sticky lg:top-[80px] lg:h-[calc(100dvh-96px)] lg:min-h-[620px] w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-3 flex flex-col justify-between">
        
        {/* Main Asymmetric Split Grid: Col-span-5 Left Editorial / Col-span-7 Right Monumental Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 h-full items-stretch min-h-0">
          
          {/* Left Column (col-span-5): Command Center Editorial Architecture */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-1 sm:py-2 min-h-0">
            
            {/* Top Telemetry & Status Unit */}
            <div>
              {/* Technical Credential Badge (Strictly zero pills: rounded-md) */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#EBF3FF] border border-[#003580]/20 text-[#003580] mb-3 sm:mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-xs bg-[#003580] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  HEAVY INDUSTRY · SRI LANKA · ICTAD C3
                </span>
              </div>

              {/* Monumental Headline (Max 2 lines, Anton display) */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] tracking-tight leading-[0.92] text-[#0A1128] mb-3 sm:mb-4">
                BUILD SOMETHING <br />
                <span className="text-[#003580]">THAT LASTS.</span>
              </h1>

              {/* Value Proposition Subtext (Strictly 17 words, max 20 words constraint) */}
              <p className="text-sm sm:text-base text-slate-700 max-w-xl font-sans leading-relaxed mb-5 sm:mb-6">
                Precision interlock paving engineered to high compressive standards. Island-wide heavy machinery distribution for SDLG, Noah &amp; Shengya.
              </p>

              {/* Action CTAs (Strictly zero pills: rounded-lg, labels ≤ 3 words) */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Magnetic strength={0.2}>
                  <a
                    href="#calculator"
                    className="px-5 sm:px-6 py-3 rounded-lg bg-[#003580] hover:bg-[#002760] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>CALCULATE YOUR BRICKS</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <a
                    href="#machinery"
                    className="px-5 sm:px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-[#0A1128] border border-slate-300 hover:border-[#003580] font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-xs"
                  >
                    <Wrench className="w-4 h-4 text-[#003580]" />
                    <span>EXPLORE MACHINERY</span>
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Bottom Symmetrical Verified Awards Bar + Coordinates */}
            <div className="pt-2 border-t border-slate-200/80">
              <div className="mb-3">
                <Awards theme="light" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#003580]" />
                  <span>Hokandara Facility · 6.8659° N, 79.9607° E</span>
                </span>
                <span className="hidden sm:inline font-bold text-[#003580]">Est. 2011</span>
              </div>
            </div>

          </div>

          {/* Right Column (col-span-7): Towering Monumental Showcase Stage (Kinetic "ගල් අල්ලාගෙන එනවා") */}
          <div className="lg:col-span-7 h-full relative min-h-[480px] sm:min-h-[540px] lg:min-h-0">
            <div className="relative w-full h-full rounded-2xl lg:rounded-3xl border border-slate-200/90 bg-slate-900 shadow-[0_25px_60px_-15px_rgba(0,53,128,0.12)] overflow-hidden flex flex-col justify-between">
              
              {/* Canvas Scene Frame */}
              <div
                ref={sceneRef}
                className="absolute inset-0 w-full h-full cursor-crosshair overflow-hidden"
                aria-label="Interactive Sri Lankan estate paving assembly visualization"
              >
                {/* Semantic fallback image */}
                <Image
                  src="/paving-after.webp"
                  alt="Architectural interlocking paving courtyard at luxury Sri Lankan estate"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center pointer-events-none"
                />

                {/* Interactive Brick Laying Canvas */}
                <canvas
                  ref={canvasRef}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    ready ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </div>

              {/* Top Overlays: Liquid Glass Metric Badge & ICTAD C3 Credential */}
              <div className="relative z-10 w-full p-3 sm:p-5 flex items-start justify-between pointer-events-none gap-3">
                {/* Top-Left Metric Badge (Liquid Glass Refraction, strictly zero pills: rounded-xl) */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(0,0,0,0.06)] max-w-[170px] sm:max-w-[210px]">
                  <div className="font-display text-2xl sm:text-3xl text-[#003580] leading-none mb-0.5">
                    467+
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] font-bold text-[#0A1128] uppercase tracking-wide">
                    Island-Wide Projects
                  </div>
                  <p className="hidden sm:block text-[10px] text-slate-500 font-sans mt-0.5 leading-snug">
                    Tested 50 MPa structural load.
                  </p>
                </div>

                {/* Top-Right Engineering Tag (Liquid Glass Refraction, strictly zero pills: rounded-xl) */}
                <div className="hidden sm:flex px-3.5 py-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(0,0,0,0.06)] items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EBF3FF] border border-[#003580]/20 flex items-center justify-center text-[#003580]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left font-mono">
                    <div className="text-[11px] font-bold text-[#0A1128] uppercase">
                      ICTAD C3 REGISTERED
                    </div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">
                      CEDA Grade Certified
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Stone Blueprint Specification Micro-HUD */}
              {hoveredBlockInfo && (
                <div className="absolute top-18 sm:top-20 left-3 sm:left-5 z-20 px-3 py-1.5 rounded-lg bg-[#0A1128]/95 text-white font-mono text-[10px] shadow-lg border border-white/20 backdrop-blur-md pointer-events-none flex items-center gap-2 animate-in fade-in zoom-in-95 duration-150">
                  <span className="w-1.5 h-1.5 rounded-xs bg-[#60A5FA]" />
                  <span>{hoveredBlockInfo}</span>
                </div>
              )}

              {/* Bottom Overlays: Partner Dock & Kinetic Scrubber HUD */}
              <div className="relative z-10 w-full p-3 sm:p-5 flex flex-wrap items-center justify-between gap-2.5 pointer-events-auto">
                {/* Bottom OEM Machinery Partner Dock (Strictly zero pills: rounded-xl) */}
                <div className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md hidden xl:flex items-center gap-2.5 font-mono">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    PARTNERS
                  </span>
                  <span className="w-1 h-1 rounded-xs bg-slate-300" />
                  <div className="flex items-center gap-2.5 text-[11px] font-bold text-[#003580]">
                    <span>SDLG</span>
                    <span>·</span>
                    <span>NOAH</span>
                    <span>·</span>
                    <span>SHENGYA</span>
                    <span>·</span>
                    <span>YINENG</span>
                  </div>
                </div>

                {/* Interactive Stage Timeline Navigation (Subgrade / Placement / Finish) */}
                <div
                  className="flex items-center gap-1 sm:gap-1.5 font-mono text-xs bg-white/95 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-slate-200/90 shadow-md"
                  role="tablist"
                  aria-label="Paving assembly sequence stages"
                >
                  {stages.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => selectStage(st.id)}
                      className={`px-2.5 sm:px-3 py-1 rounded-lg border text-[10px] sm:text-[11px] transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                        activeStage === st.id
                          ? "bg-[#003580] text-white border-[#003580] font-bold shadow-xs"
                          : "bg-transparent text-slate-600 border-transparent hover:bg-slate-100 hover:text-[#0A1128]"
                      }`}
                      role="tab"
                      aria-selected={activeStage === st.id}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-xs ${
                          activeStage === st.id ? "bg-white" : "bg-slate-400"
                        }`}
                      />
                      <span>{st.label}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setPaused((v) => !v)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                    aria-label={paused ? "Resume paving motion" : "Pause paving motion"}
                    title={paused ? "Resume paving motion" : "Pause paving motion"}
                  >
                    {paused ? <Play className="w-3.5 h-3.5 text-[#003580]" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Overlaid Bottom-Right Live Kinetic Status Indicator */}
                <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-semibold text-[#0A1128]">
                  <span ref={statusDotRef} className="w-2 h-2 rounded-xs bg-[#003580] animate-pulse" />
                  <span ref={statusBadgeRef}>ASSEMBLING: 0%</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Scroll Cue at bottom edge */}
        <div className="w-full flex items-center justify-between pt-2 border-t border-slate-200/60 font-mono text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-[#003580] font-bold">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span className="uppercase tracking-wider">SCROLL TO ASSEMBLE PAVING</span>
          </div>
          <span className="hidden sm:inline text-slate-400">
            HERRINGBONE SPEC · 60MM &amp; 80MM · SRI LANKA
          </span>
        </div>

      </div>
    </section>
  );
}
