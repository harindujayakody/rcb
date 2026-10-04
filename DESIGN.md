# RCB Holdings — Scroll-Animation Website Redesign
### Design Specification · Next.js + shadcn/ui · v1.0 (2026-10-04)

> **Purpose.** This document is the single source of truth for rebuilding
> [rcb-opal.vercel.app](https://rcb-opal.vercel.app/) — the RCB Holdings
> (interlock paving & construction machinery, Sri Lanka) marketing site — as a
> modern, scroll-driven, client-impressing experience.
> A developer should be able to build the entire site from this file alone.

---

## 1. Design Direction

**Concept: "Industrial Cinematic."** Heavy machinery deserves weight.
The redesign trades the current light editorial look for a dark, premium,
engineering-grade aesthetic — the visual language of CAT, Liebherr and
Komatsu brand films: near-black surfaces, concrete textures, safety-amber
accents, and massive condensed typography that feels stamped, not typed.

**Why this impresses clients:**
- Dark + amber = instant "heavy industry" recognition; it photographs machinery beautifully.
- Oversized type + cinematic scroll motion = the Awwwards-style feel clients associate with expensive agencies.
- Every scroll does *something* — parallax, reveals, pins, counters — so the site feels alive without gimmicks.

**Design principles**
1. **Scroll is the remote control.** No section is static; each has one signature scroll behavior (parallax, pin, scrub, stagger, count-up).
2. **Motion with meaning.** Animations explain the product (a pinned horizontal gallery *is* the paving catalog; a scrubbed clip-path *is* the before/after transformation).
3. **Restraint elsewhere.** One accent color, one display face, generous whitespace. Motion carries the drama, not decoration.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Keep existing project; `app/` routes |
| UI kit | **shadcn/ui** | New-York style; copy components into `components/ui` |
| Motion (React) | **`motion` package** (`motion/react`) | `useScroll`, `useTransform`, `useSpring`, `useInView`, `whileInView`, `AnimatePresence`, `layoutId` |
| Pinned / scrub scenes | **GSAP + ScrollTrigger** | Horizontal-scroll paving gallery, pinned manifesto |
| Smooth scroll | **Lenis** (`lenis`, `lenis/react`) | Buttery wheel physics; synced to ScrollTrigger's ticker |
| Styling | Tailwind CSS v4 (`@theme` tokens) | Design tokens as CSS variables |
| Fonts | `next/font`: **Anton** (display), **Inter** (body), **JetBrains Mono** (spec labels) | Self-hosted, no layout shift |
| Images | `next/image` | AVIF/WebP, `priority` on hero only |

---

## 3. Design Tokens

### 3.1 Color

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#0B0C0D` | Page background (dark sections) |
| `--graphite` | `#141619` | Cards, panels on dark |
| `--concrete` | `#EDEAE3` | Light section background |
| `--paper` | `#F7F5F0` | Light cards |
| `--steel` | `#9AA0A8` | Muted text on dark |
| `--slate` | `#4A4E55` | Muted text on light |
| `--safety` | `#FFB200` | **The** accent — CTAs, eyebrows, active states, progress |
| `--safety-ink` | `#1A1206` | Text on safety-amber fills |
| `--line-dark` | `rgba(255,255,255,.08)` | Hairlines on dark |
| `--line-light` | `rgba(11,12,13,.10)` | Hairlines on light |

### 3.2 Typography

| Role | Font | Style |
|---|---|---|
| Display | **Anton** | UPPERCASE, `tracking-tight`, `leading-[.9]`. Hero `clamp(3.5rem, 12vw, 11rem)` |
| Headline | Anton | Section titles `clamp(2.5rem, 6vw, 5rem)` |
| Body | **Inter** | `1rem–1.125rem`, `leading-relaxed`, max `65ch` |
| Eyebrow / spec | **JetBrains Mono** | `11–12px`, uppercase, `tracking-[.2em]`, amber or steel |

---

## 4. Reusable Motion Primitives

Built in `components/motion/`:
- `Reveal` (`reveal.tsx`)
- `SplitLines` (`split-lines.tsx`)
- `Parallax` (`parallax.tsx`)
- `ScrubText` (`scrub-text.tsx`)
- `Marquee` (`marquee.tsx`)
- `CountUp` (`count-up.tsx`)
- `Magnetic` (`magnetic.tsx`)
- `HorizontalScroll` (`horizontal-scroll.tsx`)
- `CompareSlider` (`compare-slider.tsx`)

---

## 5. Page Blueprint & Sections

0. Preloader: 0→100 counter + curtain lift
1. Navbar: fixed, blur on scroll, hide on scroll down, active indicators, amber CTA
2. Hero: cinematic, parallax, split headline, meta row
3. Marquee strip: amber band, ink Anton text scrolling (-2deg)
4. Manifesto: pinned word-reveal scrub
5. Paving: pinned horizontal scroll gallery (shadcn Cards)
6. Machinery: sticky media + scrolling spec sheets (shadcn Tabs, Table, Badge)
7. Transformation: before/after custom CompareSlider
8. Calculator: light concrete section, interactive sliders + animated CountUp
9. Gallery: masonry + lightbox Dialog with filter chips
10. Story + Vision: timeline with scroll progress line + ScrubText quote
11. Recognition: award cards + stat count-ups
12. Contact + Footer: giant Anton CTA, contact form, outlined RCB marquee footer
