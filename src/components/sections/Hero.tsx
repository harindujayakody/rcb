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
  { id: 0, label: "01 Subgrade", target: 0.05, desc: "Graded foundation" },
  { id: 1, label: "02 Placement", target: 0.52, desc: "Interlock assembly" },
  { id: 2, label: "03 Finished", target: 1.0, desc: "Locked 50 MPa" },
];

export function Hero() {
  const showcaseTrackRef = useRef<HTMLDivElement>(null);
  const cardPinRef = useRef<HTMLDivElement>(null);
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

  // Target progress ref updated via Motion's useScroll
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Motion-driven scroll tracking (Zero window.addEventListener scroll leaks)
  const { scrollYProgress } = useScroll({
    target: showcaseTrackRef,
    offset: ["start 84px", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReduced || paused) return;
    targetProgressRef.current = clamp(0.04 + latest * 1.2);
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

      // Update lightweight DOM indicators directly without triggering full React tree re-renders
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
            `80mm Heavy-Duty Interlock · Block #${found.id + 1} · Compressive: 50 MPa`
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
    const track = showcaseTrackRef.current;
    const pin = cardPinRef.current;
    if (!track || !pin) return;

    const distance = Math.max(1, track.offsetHeight - pin.offsetHeight);
    const headerOffset = 84;
    const scrollTarget =
      track.getBoundingClientRect().top +
      window.scrollY -
      headerOffset +
      targetProgressVal * distance;

    window.scrollTo({
      top: scrollTarget,
      behavior: prefersReduced ? "instant" : "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="relative bg-[var(--canvas)] text-[var(--ink)] select-none pt-20 lg:pt-24 pb-16 lg:pb-24 border-b border-[var(--border)]"
      aria-label="RCB Holdings Engineering Hero"
    >
      {/* 1. Daylight Architectural Header (Strictly under max pt-24 cap, fits initial viewport) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          
          {/* Left Column: Eyebrow + Monumental Headline + Crisp Subline (≤20 words) */}
          <div className="lg:col-span-7">
            {/* Technical Credential Badge (Strictly zero pills: rounded-md) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#EBF3FF] border border-[#003580]/20 text-[#003580] mb-3 sm:mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-xs bg-[#003580] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                HEAVY INDUSTRY · SRI LANKA · ICTAD REGISTERED
              </span>
            </div>

            {/* Monumental Headline (Max 2 lines) */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.94] text-[#0A1128] mb-3 sm:mb-4">
              BUILD SOMETHING <br />
              <span className="text-[#003580]">THAT LASTS.</span>
            </h1>

            {/* High-Impact Subtext (Strictly 17 words, max 20 words constraint) */}
            <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl font-sans leading-relaxed">
              Precision interlock paving engineered to high compressive standards. Island-wide heavy machinery distribution for SDLG, Noah &amp; Shengya.
            </p>
          </div>

          {/* Right Column: High-Impact Action CTAs + Symmetrical Awards Bar */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3.5">
            {/* CTAs (Strictly zero pills: rounded-lg, labels ≤ 3 words) */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:justify-end">
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

            {/* Symmetrical Hero Awards Bar (Light theme with laurel emblems) */}
            <div className="w-full lg:max-w-md pt-0.5">
              <Awards theme="light" />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Pinned Monumental Showcase Card Track (Motion-Scrubbed "ගල් අල්ලාගෙන එනවා") */}
      <div
        ref={showcaseTrackRef}
        className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
        style={{ minHeight: "170vh" }}
      >
        {/* Sticky Showcase Card (Architectural radius, strictly zero pills: rounded-2xl lg:rounded-3xl) */}
        <div
          ref={cardPinRef}
          className="sticky top-[84px] w-full rounded-2xl lg:rounded-3xl border border-slate-200/90 bg-slate-900 shadow-[0_25px_60px_-15px_rgba(0,53,128,0.12)] overflow-hidden h-[520px] sm:h-[600px] lg:h-[660px] flex flex-col justify-between"
        >
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
              sizes="(max-width: 1280px) 100vw, 1280px"
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

          {/* Top Overlays: Metric Badge & Engineering Credential */}
          <div className="relative z-10 w-full p-3 sm:p-6 flex items-start justify-between pointer-events-none gap-3">
            {/* Top-Left Metric Badge (Frosted Light Glass, strictly zero pills: rounded-xl) */}
            <div className="p-2.5 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md max-w-[170px] sm:max-w-[240px]">
              <div className="font-display text-xl sm:text-3xl text-[#003580] leading-none mb-0.5 sm:mb-1">
                467+
              </div>
              <div className="font-mono text-[9px] sm:text-xs font-bold text-[#0A1128] uppercase tracking-wide">
                Island-Wide Projects
              </div>
              <p className="hidden sm:block text-[10px] sm:text-[11px] text-slate-500 font-sans mt-0.5 leading-snug">
                Paved estate driveways, container yards &amp; commercial zones.
              </p>
            </div>

            {/* Top-Right Engineering Tag (Frosted Light Glass, strictly zero pills: rounded-xl) */}
            <div className="hidden sm:flex px-4 py-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] border border-[#003580]/20 flex items-center justify-center text-[#003580]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <div className="text-xs font-bold text-[#0A1128] uppercase">
                  ICTAD C3 REGISTERED
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                  CEDA Grade Certified Contractor
                </div>
              </div>
            </div>
          </div>

          {/* Hover Stone Blueprint Specification Micro-HUD */}
          {hoveredBlockInfo && (
            <div className="absolute top-20 sm:top-28 left-3 sm:left-6 z-20 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[#0A1128]/95 text-white font-mono text-[10px] sm:text-[11px] shadow-lg border border-white/20 backdrop-blur-md pointer-events-none flex items-center gap-2 animate-in fade-in zoom-in-95 duration-150">
              <span className="w-1.5 h-1.5 rounded-xs bg-[#60A5FA]" />
              <span>{hoveredBlockInfo}</span>
            </div>
          )}

          {/* Bottom Overlays: Partner Dock & Kinetic Scrubber HUD */}
          <div className="relative z-10 w-full p-3 sm:p-6 flex flex-wrap items-center justify-between gap-2.5 pointer-events-auto">
            {/* Bottom OEM Machinery Partner Dock (Strictly zero pills: rounded-xl) */}
            <div className="px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md hidden md:flex items-center gap-3 font-mono">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                MACHINERY PARTNERS
              </span>
              <span className="w-1 h-1 rounded-xs bg-slate-300" />
              <div className="flex items-center gap-3 text-xs font-bold text-[#003580]">
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
              className="flex items-center gap-1 sm:gap-2 font-mono text-xs bg-white/95 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-slate-200/90 shadow-md"
              role="tablist"
              aria-label="Paving assembly sequence stages"
            >
              {stages.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => selectStage(st.id)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
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
                className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                aria-label={paused ? "Resume paving motion" : "Pause paving motion"}
                title={paused ? "Resume paving motion" : "Pause paving motion"}
              >
                {paused ? <Play className="w-3.5 h-3.5 text-[#003580]" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Overlaid Bottom-Right Live Kinetic Status Indicator (Ref-driven to prevent React churn) */}
            <div className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-semibold text-[#0A1128]">
              <span ref={statusDotRef} className="w-2 h-2 rounded-xs bg-[#003580] animate-pulse" />
              <span ref={statusBadgeRef}>ASSEMBLING: 0%</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
