"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Calculator,
  Wrench,
  Pause,
  Play,
  ShieldCheck,
} from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Awards } from "@/components/brand";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const rows = 7;
const columns = 11;

/** Perspective grid mapping the ground in paving-craftsman photo */
const blocks = Array.from({ length: rows * columns }, (_, index) => {
  const row = Math.floor(index / columns);
  const column = index % columns;
  const top = 0.57 + (row / rows) * 0.43;
  const bottom = 0.57 + ((row + 1) / rows) * 0.43;
  const offset = row % 2 ? 0.5 : 0;
  const left = (column - offset) / (columns - 1);
  const right = (column + 1 - offset) / (columns - 1);
  return {
    top,
    bottom,
    left,
    right,
    // Bricks emanate outward starting from craftsman's hands at column 7
    start: (row * columns + Math.abs(column - 7) * 0.8) / (rows * columns + 5),
  };
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);

  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  // Brick-Laying Canvas Render Loop
  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !scene || !canvas || !context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mobile = window.matchMedia("(max-width: 800px)");

    const before = new window.Image();
    const after = new window.Image();
    const pointer = { x: 0.5, y: 0.5, active: false };

    let frame = 0;
    let disposed = false;
    let visible = true;
    let loaded = false;
    let width = 0;
    let height = 0;
    let progress = 0;
    let targetProgress = 0;
    let localStoryProgress = 0;
    let targetStory = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frame = 0;
      if (!loaded || disposed || !width || !height) return;

      const still = reduced.matches || paused;
      targetProgress = still ? 1 : targetProgress;
      progress = still ? targetProgress : progress + (targetProgress - progress) * 0.16;
      if (Math.abs(targetProgress - progress) < 0.001) progress = targetProgress;

      pointerX += ((still ? 0 : (pointer.x - 0.5) * 16) - pointerX) * 0.12;
      pointerY += ((still ? 0 : (pointer.y - 0.5) * 10) - pointerY) * 0.12;

      section.style.setProperty("--scene-x", `${pointerX.toFixed(2)}px`);
      section.style.setProperty("--scene-y", `${pointerY.toFixed(2)}px`);
      section.style.setProperty("--lay-progress", `${progress.toFixed(4)}`);

      localStoryProgress = still || mobile.matches ? 0 : localStoryProgress + (targetStory - localStoryProgress) * 0.16;
      if (Math.abs(targetStory - localStoryProgress) < 0.001) localStoryProgress = targetStory;
      setStoryProgress(localStoryProgress);

      const opening = 1 - clamp((localStoryProgress - 0.18) / 0.18);
      const detail = clamp((localStoryProgress - 0.38) / 0.14);

      section.style.setProperty("--opening-opacity", `${opening.toFixed(4)}`);
      section.style.setProperty("--opening-y", `${(-32 * (1 - opening)).toFixed(2)}px`);
      section.style.setProperty("--detail-opacity", `${detail.toFixed(4)}`);
      section.style.setProperty("--detail-y", `${(26 * (1 - detail)).toFixed(2)}px`);
      section.style.setProperty("--camera-scale", `${(still || mobile.matches ? 1 : 1.06 - localStoryProgress * 0.06).toFixed(4)}`);

      const chapter = targetStory < 0.3 ? 0 : targetStory < 0.72 ? 1 : 2;
      setActiveChapter(chapter);

      const scale = Math.max(width / after.naturalWidth, height / after.naturalHeight);
      const imageWidth = after.naturalWidth * scale;
      const imageHeight = after.naturalHeight * scale;
      const imageX = (width - imageWidth) * (mobile.matches ? 0.64 : 0.5);
      const imageY = (height - imageHeight) * 0.52;

      const drawPhoto = (photo: HTMLImageElement) =>
        context.drawImage(photo, imageX, imageY, imageWidth, imageHeight);

      context.clearRect(0, 0, width, height);

      // 1. Draw base subgrade layer (unpaved sand/gravel)
      drawPhoto(before);

      // 2. Animate bricks laying into position as progress advances
      if (progress >= 0.999) {
        drawPhoto(after);
      } else {
        for (const block of blocks) {
          const amount = clamp((progress - block.start) / 0.13);
          if (amount === 0) continue;
          const eased = 1 - Math.pow(1 - amount, 3);
          const x = imageX + block.left * imageWidth;
          const y = imageY + block.top * imageHeight;
          const blockWidth = (block.right - block.left) * imageWidth + 1;
          const blockHeight = (block.bottom - block.top) * imageHeight + 1;

          context.save();
          context.globalAlpha = eased;
          // Blocks drop into position from above with 3D easing
          context.translate(0, -22 * (1 - eased));
          context.beginPath();
          context.rect(x, y, blockWidth, blockHeight);
          context.clip();
          drawPhoto(after);
          context.restore();
        }
      }

      // 3. Interactive stone block hover outline
      if (pointer.active && !still && finePointer.matches) {
        const px = (pointer.x * width - imageX) / imageWidth;
        const py = (pointer.y * height - imageY) / imageHeight;
        const hoveredBlock =
          (py > 0.79 || (py > 0.62 && px < 0.5)) &&
          blocks.find(
            (b) =>
              px >= b.left &&
              px < b.right &&
              py >= b.top &&
              py < b.bottom &&
              progress > b.start + 0.1
          );

        if (hoveredBlock) {
          context.fillStyle = "rgba(233, 210, 168, 0.15)";
          context.strokeStyle = "rgba(233, 210, 168, 0.85)";
          context.lineWidth = 1.5;
          const x = imageX + hoveredBlock.left * imageWidth;
          const y = imageY + hoveredBlock.top * imageHeight;
          const w = (hoveredBlock.right - hoveredBlock.left) * imageWidth;
          const h = (hoveredBlock.bottom - hoveredBlock.top) * imageHeight;
          context.fillRect(x + 2, y + 2, w - 4, h - 4);
          context.strokeRect(x + 2, y + 2, w - 4, h - 4);
        }
      }

      const settling =
        Math.abs(targetProgress - progress) > 0.001 ||
        (!mobile.matches && !still && Math.abs(targetStory - localStoryProgress) > 0.001) ||
        Math.abs((still ? 0 : (pointer.x - 0.5) * 16) - pointerX) > 0.05 ||
        Math.abs((still ? 0 : (pointer.y - 0.5) * 10) - pointerY) > 0.05;

      if (settling && visible && !still && !document.hidden) {
        frame = requestAnimationFrame(paint);
      }
    };

    const schedule = () => {
      if (!frame && visible && loaded && !document.hidden) {
        frame = requestAnimationFrame(paint);
      }
    };

    const update = () => {
      if (!visible || document.hidden) return;
      const bounds = section.getBoundingClientRect();
      const pin = section.querySelector<HTMLElement>(".paving-hero-pin");
      const distance = mobile.matches
        ? Math.max(260, bounds.height * 0.5)
        : Math.max(1, bounds.height - (pin?.offsetHeight ?? window.innerHeight - 72));

      targetStory = reduced.matches || paused ? 0 : clamp((72 - bounds.top) / distance);
      targetProgress = reduced.matches || paused ? 1 : clamp(0.04 + targetStory * 1.25);
      schedule();
    };

    const resize = () => {
      const rect = scene.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      update();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reduced.matches || paused) return;
      const bounds = scene.getBoundingClientRect();
      pointer.x = clamp((event.clientX - bounds.left) / bounds.width);
      pointer.y = clamp((event.clientY - bounds.top) / bounds.height);
      pointer.active = true;
      schedule();
    };

    const onPointerLeave = () => {
      pointer.x = 0.5;
      pointer.y = 0.5;
      pointer.active = false;
      schedule();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else update();
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    before.src = "/paving-craftsman-base.webp";
    after.src = "/paving-craftsman.webp";

    Promise.all([before.decode(), after.decode()])
      .then(() => {
        if (disposed) return;
        loaded = true;
        resize();
        progress = reduced.matches || paused ? 1 : targetProgress;
        paint();
        setReady(true);
      })
      .catch(() => {
        // Semantic fallback Image stays visible if canvas decode fails
      });

    resizeObserver.observe(scene);
    visibilityObserver.observe(section);
    window.addEventListener("scroll", update, { passive: true });
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", update);
    mobile.addEventListener("change", resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", update);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", update);
      mobile.removeEventListener("change", resize);
    };
  }, [paused]);

  const goToChapter = (index: number) => {
    const section = sectionRef.current;
    const pin = section?.querySelector<HTMLElement>(".paving-hero-pin");
    if (!section || !pin) return;
    const distance = Math.max(1, section.offsetHeight - pin.offsetHeight);
    const headerHeight = 72;
    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      headerHeight +
      [0, 0.55, 0.95][index] * distance;

    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="paving-hero relative bg-[#071f33] text-white select-none"
      aria-labelledby="hero-title"
      data-paused={paused}
      data-ready={ready}
      style={{ minHeight: "240vh" }}
    >
      {/* Sticky Viewport Pin (calc(100svh - 72px)) */}
      <div className="paving-hero-pin sticky top-[72px] h-[calc(100svh-72px)] min-h-[580px] w-full overflow-hidden flex flex-col justify-between">
        {/* Photographic Canvas Scene with Perspective Brick-Laying */}
        <div
          ref={sceneRef}
          className="craft-scene absolute inset-[-12px] will-change-transform"
          style={{
            transform:
              "translate3d(var(--scene-x, 0px), var(--scene-y, 0px), 0) scale(var(--camera-scale, 1))",
            transformOrigin: "65% 65%",
          }}
        >
          {/* Base semantic background image */}
          <Image
            src="/paving-craftsman.webp"
            alt="Craftsman laying interlock paving blocks in a Sri Lankan courtyard"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[50%_52%]"
          />

          {/* Interactive Brick Placement Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Cinematic Scrim: deep navy left-edge & bottom gradient for crisp text legibility */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: `
              linear-gradient(90deg, rgba(6, 27, 44, 0.94) 0%, rgba(8, 36, 57, 0.86) 32%, rgba(10, 37, 61, 0.62) 50%, rgba(10, 37, 61, 0.15) 72%, transparent 85%),
              linear-gradient(0deg, rgba(5, 23, 37, 0.95) 0%, rgba(8, 36, 57, 0.45) 24%, transparent 44%)
            `,
          }}
        />

        {/* Phase A: Primary Hero Copy (Groundwork) */}
        <div
          className="relative z-10 max-w-4xl px-6 md:px-14 pt-10 sm:pt-16 md:pt-20 will-change-transform"
          style={{
            opacity: "var(--opening-opacity, 1)",
            transform: "translateY(var(--opening-y, 0px))",
            pointerEvents: storyProgress < 0.2 ? "auto" : "none",
          }}
        >
          {/* Technical Credential Badge (Zero pills: rounded-md) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/20 mb-4 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-xs bg-[var(--theme)] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#e9d2a8] font-bold">
              HEAVY INDUSTRY · SRI LANKA · ICTAD REGISTERED
            </span>
          </div>

          {/* Monumental Headline */}
          <h1
            id="hero-title"
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[0.92] text-white mb-4 sm:mb-6"
          >
            BUILD SOMETHING <br />
            <span className="text-[#e9d2a8] drop-shadow-[0_4px_24px_rgba(233,210,168,0.25)]">
              THAT LASTS.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#d8e3ea] max-w-xl font-body leading-relaxed mb-6 sm:mb-8">
            Precision interlock paving manufactured to rigorous density standards.
            Authorized distributor for SDLG, Noah & Shengya machinery island-wide.
          </p>

          {/* Action CTAs (Strictly Zero Pills: rounded-lg) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <Magnetic strength={0.2}>
              <a
                href="#calculator"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-[var(--theme)] hover:bg-[var(--theme-hover)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>CALCULATE YOUR BRICKS</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href="#machinery"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/25 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <Wrench className="w-4 h-4 text-[#e9d2a8]" />
                <span>EXPLORE MACHINERY</span>
              </a>
            </Magnetic>
          </div>

          {/* Symmetrical 2-Column Responsive Hero Awards Bar */}
          <div className="pt-2">
            <Awards theme="dark" />
          </div>
        </div>

        {/* Phase B: Mid-Sequence Detail Reveal (Placement & Finish) */}
        <div
          className="absolute top-28 sm:top-36 md:top-44 left-6 md:left-14 z-10 max-w-xl pointer-events-none will-change-transform"
          style={{
            opacity: "var(--detail-opacity, 0)",
            transform: "translateY(var(--detail-y, 26px))",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 mb-3">
            <span className="w-2 h-2 rounded-xs bg-[#e9d2a8]" />
            <span className="font-mono text-[10px] md:text-xs text-[#e9d2a8] tracking-[0.2em] uppercase font-bold">
              FROM HANDS TO GROUND
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[0.95] mb-4 drop-shadow-md">
            PRECISION IN <br />
            <span className="text-[#e9d2a8]">EVERY PLACEMENT.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#d8e3ea] font-body leading-relaxed max-w-md">
            High-density 60mm & 80mm interlock paving blocks. Laid stone by stone into
            structural herringbone patterns engineered for vehicle loads.
          </p>
        </div>

        {/* Floating Top-Right Credential Card */}
        <div className="hidden lg:flex absolute top-12 right-12 z-20 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 items-center gap-3 shadow-lg pointer-events-none">
          <ShieldCheck className="w-5 h-5 text-[#e9d2a8]" />
          <div className="text-left font-mono">
            <div className="text-xs font-bold text-white uppercase">
              ICTAD REGISTERED
            </div>
            <div className="text-[10px] text-[#c0d0db] uppercase">
              Grade Certified Contractor
            </div>
          </div>
        </div>

        {/* Bottom Chapter Bar & Scrub HUD */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-14 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4">
          {/* Scroll Cue */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#c9d6df]">
            <a
              href="#paving"
              className="flex items-center gap-2 text-white hover:text-[#e9d2a8] transition-colors group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center group-hover:bg-[#e9d2a8] group-hover:text-slate-900 transition-colors">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold">SCROLL TO LAY BRICKS</span>
            </a>
          </div>

          {/* Interactive Chapter Timeline (Groundwork / Placement / Finish) */}
          <div
            ref={chaptersRef}
            className="flex items-center gap-6 font-mono text-xs"
            aria-label="Paving sequence stages"
          >
            {[
              { label: "Groundwork", index: 0 },
              { label: "Placement", index: 1 },
              { label: "Finish", index: 2 },
            ].map(({ label, index }) => (
              <button
                key={label}
                type="button"
                onClick={() => goToChapter(index)}
                className={`flex items-center gap-2 py-1.5 transition-colors cursor-pointer ${
                  activeChapter === index
                    ? "text-[#e9d2a8] font-bold"
                    : "text-[#c9d6df] hover:text-white"
                }`}
                aria-current={activeChapter === index ? "step" : undefined}
              >
                <span
                  className={`w-2 h-2 rounded-xs transition-transform ${
                    activeChapter === index
                      ? "bg-[#e9d2a8] scale-125"
                      : "bg-white/40"
                  }`}
                />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Motion Control Toggle & Scene note (Zero pills: rounded-lg) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-colors cursor-pointer"
              aria-label={paused ? "Resume brick motion" : "Pause scene motion"}
              title={paused ? "Resume brick motion" : "Pause scene motion"}
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <span className="hidden md:inline-block font-mono text-[10px] text-[#9bb3c4]">
              HOKANDARA · SRI LANKA
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
