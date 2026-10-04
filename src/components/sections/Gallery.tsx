"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: "Paving" | "Machinery" | "People" | "Construction";
  description: string;
}

const galleryPhotos: GalleryPhoto[] = [
  {
    id: "1",
    src: "/paving-after.webp",
    title: "ESTATE COURTYARD",
    category: "Paving",
    description: "Multi-tone interlock brick finish designed for tropical residential architecture.",
  },
  {
    id: "2",
    src: "/wheel-loader.jpg",
    title: "SDLG WHEEL LOADER FLEET",
    category: "Machinery",
    description: "Heavy aggregate loading and quarry material handling equipment.",
  },
  {
    id: "3",
    src: "/image (3).jpg",
    title: "EXHIBITION PAVILION",
    category: "People",
    description: "RCB engineering representatives showcasing machinery systems to industry visitors.",
  },
  {
    id: "4",
    src: "/ip.jpg",
    title: "WALKWAY ACCENTS",
    category: "Paving",
    description: "Contrasting border stones guiding pedestrian traffic through landscaped grounds.",
  },
  {
    id: "5",
    src: "/QT8-15.jpg",
    title: "AUTOMATED BLOCK PLANT",
    category: "Machinery",
    description: "PLC-controlled high-pressure block manufacturing plant ready for dispatch.",
  },
  {
    id: "6",
    src: "/osc.jpg",
    title: "HEAVY STRUCTURE ERECTION",
    category: "Construction",
    description: "Industrial warehouse and structural steel fabrication under supervision.",
  },
  {
    id: "7",
    src: "/image (2).jpg",
    title: "HONORED REPRESENTATIVES",
    category: "People",
    description: "RCB team receiving commendation at the national construction convention.",
  },
  {
    id: "8",
    src: "/slide-1.jpg",
    title: "VIBRATORY SOIL COMPACTOR",
    category: "Machinery",
    description: "SDLG single-drum roller compacting roadway subgrade prior to paving.",
  },
  {
    id: "9",
    src: "/image.jpg",
    title: "AWARD RECOGNITION CEREMONY",
    category: "People",
    description: "The Shramabhimanee national honors presentation on the main stage.",
  },
];

const categories = ["ALL", "PAVING", "MACHINERY", "PEOPLE", "CONSTRUCTION"] as const;

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeFilter === "ALL"
      ? galleryPhotos
      : galleryPhotos.filter(
          (p) => p.category.toUpperCase() === activeFilter
        );

  const selectedPhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  return (
    <section
      id="gallery"
      className="relative py-28 md:py-36 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--line-dark)] mb-12">
          <div>
            <Reveal y={15}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-[2px] bg-[var(--safety)] inline-block" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                  05 — FIELD ARCHIVE
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={20}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--paper)]">
                OUR WORLD. THROUGH THE LENS.
              </h2>
            </Reveal>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`font-mono text-xs uppercase px-4 py-2 rounded-lg transition-all ${
                  activeFilter === cat
                    ? "bg-[var(--safety)] text-[var(--safety-ink)] font-bold shadow-md"
                    : "bg-[var(--graphite)] text-[var(--steel)] border border-[var(--line-dark)] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--graphite)] border border-[var(--line-dark)] cursor-pointer group shadow-xl"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Hover Overlay Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-[var(--safety)]">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <Badge className="bg-[var(--safety)] text-[var(--safety-ink)] text-[10px] font-mono font-bold tracking-wider mb-2 border-none">
                    {photo.category}
                  </Badge>
                  <h3 className="font-display text-xl text-[var(--paper)]">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[var(--steel)] line-clamp-1 font-body mt-1">
                    {photo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedPhotoIndex !== null}
        onOpenChange={(open) => !open && setSelectedPhotoIndex(null)}
      >
        <DialogContent className="max-w-4xl p-0 bg-[var(--ink)] border-[var(--line-dark)] text-[var(--paper)] overflow-hidden rounded-2xl shadow-2xl">
          {selectedPhoto && (
            <div className="flex flex-col">
              <div className="relative w-full aspect-[16/10] bg-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />

                {/* Navigation Arrows */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[var(--safety)] hover:text-[var(--safety-ink)] text-white flex items-center justify-center transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[var(--safety)] hover:text-[var(--safety-ink)] text-white flex items-center justify-center transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Caption */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--line-dark)]">
                <div>
                  <DialogTitle className="font-display text-2xl text-[var(--paper)]">
                    {selectedPhoto.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-[var(--steel)] font-body mt-1">
                    {selectedPhoto.description}
                  </DialogDescription>
                </div>

                <div className="font-mono text-xs text-[var(--safety)] tracking-wider">
                  {selectedPhoto.category.toUpperCase()} ARCHIVE
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
