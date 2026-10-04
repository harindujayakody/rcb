"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";

interface CompareSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  caption?: string;
  className?: string;
}

export function CompareSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Courtyard before paving",
  afterAlt = "Courtyard after interlock paving",
  caption = "A better welcome, from the ground up.",
  className = "",
}: CompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Scroll intro wipe animation
  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      let current = 20;
      const target = 50;
      const interval = setInterval(() => {
        current += 1.5;
        if (current >= target) {
          setSliderPosition(target);
          clearInterval(interval);
        } else {
          setSliderPosition(current);
        }
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isInView, shouldReduceMotion]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/10] max-h-[640px] overflow-hidden rounded-2xl cursor-ew-resize select-none bg-slate-100 border border-slate-200/90 shadow-xl"
      >
        {/* Before Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 font-mono text-[11px] font-bold text-slate-700 tracking-wider shadow-sm">
            BEFORE PAVING
          </div>
        </div>

        {/* After Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-md bg-[var(--theme)] text-white font-mono text-[11px] font-bold tracking-wider shadow-md">
            AFTER · RCB INTERLOCK
          </div>
        </div>

        {/* Drag Handle Divider */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical line in Royal Blue */}
          <div className="absolute inset-y-0 -left-[1px] w-[2.5px] bg-[var(--theme)] shadow-[0_0_8px_rgba(0,53,128,0.5)]" />

          {/* Grip Button (Zero pills: rounded-lg architectural handle) */}
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-lg bg-white border-2 border-[var(--theme)] flex items-center justify-center shadow-xl pointer-events-auto cursor-ew-resize transition-transform hover:scale-110 active:scale-95">
            <svg
              className="w-4 h-4 text-[var(--theme)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M6 8L2 12L6 16" />
            </svg>
          </div>
        </div>
      </div>

      {caption && (
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between w-full px-2 gap-2 text-center md:text-left">
          <p className="text-sm font-semibold text-[var(--ink)]">{caption}</p>
          <span className="font-mono text-[11px] text-slate-500 font-medium">
            * Drag slider to witness the high-density paving transformation
          </span>
        </div>
      )}
    </div>
  );
}
