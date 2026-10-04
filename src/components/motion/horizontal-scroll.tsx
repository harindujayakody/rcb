"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  onProgress?: (progress: number) => void;
}

export function HorizontalScroll({
  children,
  className = "",
  trackClassName = "",
  onProgress,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.5, track.scrollWidth - window.innerWidth + 300)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (onProgress) {
              onProgress(self.progress);
            }
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [shouldReduceMotion, onProgress]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className={`flex items-stretch gap-8 md:w-max overflow-x-auto md:overflow-visible snap-x md:snap-none pb-6 md:pb-0 px-4 md:px-0 ${trackClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
