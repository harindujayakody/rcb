import React from "react";
import { Preloader } from "@/components/sections/Preloader";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { Manifesto } from "@/components/sections/Manifesto";
import { Paving } from "@/components/sections/Paving";
import { Machinery } from "@/components/sections/Machinery";
import { Transform } from "@/components/sections/Transform";
import { Calculator } from "@/components/sections/Calculator";
import { Gallery } from "@/components/sections/Gallery";
import { Story } from "@/components/sections/Story";
import { Recognition } from "@/components/sections/Recognition";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--ink)] text-[var(--paper)] flex flex-col selection:bg-[var(--safety)] selection:text-[var(--safety-ink)]">
      {/* 0. Preloader */}
      <Preloader />

      {/* 1. Navbar */}
      <Navbar />

      <main id="main" className="flex-1">
        {/* 2. Hero */}
        <Hero />

        {/* 3. Marquee Strip */}
        <MarqueeStrip />

        {/* 4. Manifesto */}
        <Manifesto />

        {/* 5. Paving Patterns Horizontal Scroll */}
        <Paving />

        {/* 6. Heavy Machinery Fleet & Spec Sheets */}
        <Machinery />

        {/* 7. Transformation Before/After Compare Slider */}
        <Transform />

        {/* 8. Brick Material Quantity Calculator (Concrete workshop break) */}
        <Calculator />

        {/* 9. Field Archive Masonry Photo Gallery */}
        <Gallery />

        {/* 10. Industrial Heritage Timeline & Vision */}
        <Story />

        {/* 11. National Recognition & Statistics */}
        <Recognition />

        {/* 12. Authorized OEM Manufacturing Partners */}
        <Partners />

        {/* 13. Contact Form & Facility Information */}
        <Contact />
      </main>

      {/* Footer with Giant Outlined Marquee */}
      <Footer />
    </div>
  );
}
