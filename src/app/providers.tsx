"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const update = () => {
      ScrollTrigger.update();
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
        <LenisScrollTriggerSync />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
