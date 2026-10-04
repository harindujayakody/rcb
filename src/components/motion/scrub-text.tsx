"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ScrubTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

function Word({
  children,
  range,
  progress,
  className = "",
}: {
  children: string;
  range: [number, number];
  progress: any;
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mr-[0.28em] my-[0.05em]">
      <motion.span style={{ opacity }} className={className}>
        {children}
      </motion.span>
    </span>
  );
}

export function ScrubText({
  text,
  className = "",
  wordClassName = "",
}: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.2 / words.length);
        return (
          <Word
            key={i}
            range={[start, end]}
            progress={scrollYProgress}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}
