"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // duration in seconds
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  fadeEdges?: boolean;
}

export function Marquee({
  children,
  speed = 25,
  reverse = false,
  pauseOnHover = true,
  className = "",
  fadeEdges = false,
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden flex whitespace-nowrap select-none ${className}`}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={`flex shrink-0 items-center gap-8 ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `rcb-marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center gap-8 ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `rcb-marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
