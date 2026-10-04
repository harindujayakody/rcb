"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  useScroll,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "motion/react";
import Image from "next/image";

export const TOTAL_HERO_FRAMES = 192;

interface ScrubVideoProps {
  pinRef: React.RefObject<HTMLElement | null>;
  className?: string;
  onProgressChange?: (progress: number, frameIndex: number) => void;
  onFirstFrameReady?: () => void;
}

export function ScrubVideo({
  pinRef,
  className = "",
  onProgressChange,
  onFirstFrameReady,
}: ScrubVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoFallbackRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnIndex = useRef<number>(-1);
  const isMobileRef = useRef<boolean>(false);

  const [useFallbackVideo, setUseFallbackVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // Scroll tracking across the pinned hero container
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Lerp raw scroll progress -> buttery smooth playhead with zero jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.6,
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Frame drawing routine
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Cover fit mathematics
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    lastDrawnIndex.current = frameIdx;
  }, []);

  // Frame loading pipeline
  useEffect(() => {
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    isMobileRef.current = isMobile;
    const folder = isMobile ? "/hero-frames-mobile" : "/hero-frames";

    const imgs: HTMLImageElement[] = [];
    imagesRef.current = imgs;

    let failedFramesCount = 0;

    // 1. Immediately load frame 1 (poster)
    const firstImg = new window.Image();
    firstImg.src = `${folder}/frame-0001.webp`;
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      onFirstFrameReady?.();
      drawFrame(0);
    };
    firstImg.onerror = () => {
      failedFramesCount++;
      // Try fallback to poster.jpg
      firstImg.src = "/poster.jpg";
    };
    imgs.push(firstImg);

    // 2. Windowed progressive preload: batch first 24 frames immediately, then remaining frames
    const loadBatch = (startIndex: number, endIndex: number) => {
      for (let i = startIndex; i <= endIndex; i++) {
        const img = new window.Image();
        img.src = `${folder}/frame-${String(i).padStart(4, "0")}.webp`;
        img.onerror = () => {
          failedFramesCount++;
          if (failedFramesCount > 10) {
            setUseFallbackVideo(true);
          }
        };
        imgs.push(img);
      }
    };

    // Load first 24 frames for instant scrub responsiveness
    loadBatch(2, 24);

    // Load remaining frames in background idle chunks
    let currentChunk = 25;
    const chunkSize = 20;

    const interval = setInterval(() => {
      if (currentChunk > TOTAL_HERO_FRAMES) {
        clearInterval(interval);
        return;
      }
      const nextChunk = Math.min(TOTAL_HERO_FRAMES, currentChunk + chunkSize - 1);
      loadBatch(currentChunk, nextChunk);
      currentChunk = nextChunk + 1;
    }, 120);

    return () => {
      clearInterval(interval);
    };
  }, [drawFrame, onFirstFrameReady, prefersReducedMotion]);

  // Canvas size synchronization with device pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasResolution = () => {
      const isMobile = window.innerWidth < 768;
      canvas.width = isMobile ? 960 : 1600;
      canvas.height = isMobile ? 540 : 900;
      if (lastDrawnIndex.current >= 0) {
        drawFrame(lastDrawnIndex.current);
      }
    };

    updateCanvasResolution();
    window.addEventListener("resize", updateCanvasResolution);
    return () => window.removeEventListener("resize", updateCanvasResolution);
  }, [drawFrame]);

  // Subscribe to smooth scroll progression
  useMotionValueEvent(smoothProgress, "change", (latestProgress) => {
    if (prefersReducedMotion) return;

    const clampedProgress = Math.max(0, Math.min(1, latestProgress));
    const targetIndex = Math.min(
      TOTAL_HERO_FRAMES - 1,
      Math.floor(clampedProgress * TOTAL_HERO_FRAMES)
    );

    onProgressChange?.(clampedProgress, targetIndex);

    if (useFallbackVideo) {
      const video = videoFallbackRef.current;
      if (video && video.duration) {
        video.currentTime = clampedProgress * video.duration;
      }
      return;
    }

    if (targetIndex !== lastDrawnIndex.current) {
      drawFrame(targetIndex);
    }
  });

  // Reduced motion fallback: Static hero poster
  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}>
        <Image
          src="/hero-final-frame.webp"
          alt="RCB Interlocking Paving Handcrafted Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}>
      {/* HTML5 Canvas Scrub Renderer */}
      <canvas
        ref={canvasRef}
        width={1600}
        height={900}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          firstFrameLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* LCP / Pre-render Static Poster */}
      {!firstFrameLoaded && (
        <Image
          src="/poster.jpg"
          alt="Hands lifting paving brick"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Fallback HTML5 video if webp sequence fails */}
      {useFallbackVideo && (
        <video
          ref={videoFallbackRef}
          src="/hero-bricks.mp4"
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
