"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. 0.1 for 10% drift
  className?: string;
  containerClassName?: string;
}

export function Parallax({
  children,
  speed = 0.08,
  className = "",
  containerClassName = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`]
  );

  if (shouldReduceMotion) {
    return (
      <div className={containerClassName}>
        <div className={className}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.div style={{ y }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}
