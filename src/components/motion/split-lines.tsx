"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface SplitLinesProps {
  lines: (string | React.ReactNode)[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  animateOnMount?: boolean;
}

export function SplitLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  animateOnMount = true,
}: SplitLinesProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: "105%", opacity: 0 }}
            animate={animateOnMount ? { y: "0%", opacity: 1 } : undefined}
            whileInView={!animateOnMount ? { y: "0%", opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
