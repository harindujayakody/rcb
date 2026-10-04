# RCB Holdings — Brand-New Website Redesign
### Design Specification · Light Theme Royal Precision · v2.0 (2026-10-04)

> **Purpose.** Single source of truth for the brand-new, light-themed, scroll-animated
> marketing website for **RCB Holdings (Pvt) Ltd** — Sri Lanka's leading interlock paving
> manufacturer and authorized distributor for SDLG, Noah, Shengya, and TNY heavy machinery.

---

## 1. Design Direction: "Royal Precision / Architectural Daylight"

The redesign delivers a luminous, high-contrast, institutional-grade aesthetic inspired by modern architectural monographs and top-tier industrial design brands. Deep RCB Royal Blue (`#003580`) grounds the brand with authority, while crisp white (`#FFFFFF`) and architectural porcelain (`#F8FAFC`) surfaces create daylight clarity.

### Core Principles
1. **Light, Luminous & Architectural:** Deep royal blue `#003580` anchored against pure white `#FFFFFF` and subtle slate `#F8FAFC` surfaces. Crisp lines, sharp borders, and tactile shadows.
2. **Strictly Zero Pills:** No `rounded-full` pills anywhere. All buttons, badges, cards, and navigation use architectural geometry (`rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`).
3. **Scroll-Craft Choreography (`scroll-craft`):** Pinned dimensional hero, independent visual planes, smooth spring-lerped playheads, and purposeful section-to-section transitions.
4. **Institutional Trust & Confirmed Honors:** Prominently showcase the National Shramabhimanee Award (2013), Construction Exhibition Co-Sponsor Award (2016), and ICTAD registration.

---

## 2. Design Tokens

### 2.1 Color Palette

| Token | Hex / Value | Description & Role |
|---|---|---|
| `--color-canvas` | `#FFFFFF` | Primary ground; pure architectural white |
| `--color-canvas-subtle` | `#F8FAFC` | Secondary ground; soft porcelain slate |
| `--color-canvas-muted` | `#F1F5F9` | Card surfaces, table headers, workshop panels |
| `--color-theme` | `#003580` | **Primary Brand Color**; deep RCB royal blue |
| `--color-theme-hover` | `#002760` | Dark royal blue for interactive hover states |
| `--color-theme-accent` | `#0052CC` | Vivid electric sapphire for highlights & focus rings |
| `--color-ink` | `#0A1128` | Monumental headline type; deep midnight navy |
| `--color-slate-body` | `#334155` | Body paragraph text; high-contrast Slate-700 |
| `--color-slate-muted` | `#64748B` | Technical specifications, captions, timestamps |
| `--border-subtle` | `rgba(0, 53, 128, 0.08)` | Crisp card and divider hairlines |
| `--border-strong` | `rgba(0, 53, 128, 0.18)` | Interactive input borders, hover highlights |
| `--shadow-card` | `0 10px 30px -5px rgba(0, 53, 128, 0.06)` | Architectural elevation shadow |
| `--shadow-float` | `0 20px 45px -10px rgba(0, 53, 128, 0.12)` | Floating modal, lightbox, and showcase shadows |

### 2.2 Typography

| Role | Font Family | Style / Weight | Usage |
|---|---|---|---|
| Display | **Anton** | Uppercase, `tracking-tight`, `leading-[0.92]` | Hero headlines `clamp(3.5rem, 10vw, 8.5rem)` |
| Headlines | **Anton** | Uppercase, `tracking-tight`, `leading-[0.95]` | Section titles `clamp(2.5rem, 5vw, 4.5rem)` |
| Body | **Inter** | `1rem – 1.125rem`, `leading-relaxed`, max `65ch` | Explanatory copy, articles, card details |
| Eyebrow / Data | **JetBrains Mono** | `11px – 13px`, Uppercase, `tracking-[0.2em]` | Technical specs, indices: `01 // ARCHITECTURAL PAVING` |

### 2.3 Geometry & Shapes (Anti-Pill Rule)

- **Buttons:** `rounded-lg` or `rounded-xl` with crisp borders and subtle bevels.
- **Badges:** `rounded-md` with `font-mono text-xs uppercase tracking-wider` and square indicator glyphs (`w-2 h-2 rounded-none bg-[#003580]`).
- **Cards:** `rounded-xl` or `rounded-2xl` with `border border-slate-200/90`.
- **Navigation:** Crisp top bar with glassmorphism backdrop (`rounded-none` or `rounded-xl` floating panel).

---

## 3. Motion Architecture & Scroll-Craft Blueprint

Using the principles from `scroll-craft/SKILL.md`:

```
01. Navbar         Fixed · Glassmorphic backdrop · Royal Blue `#003580` brand mark · Quote CTA
02. Hero           Daylight Architectural Stage · Scroll-Driven Brick-Laying Canvas ("ගල් අල්ලාගෙන එනවා") · Perspective Ground Mapping (Subgrade -> Interlock -> Finished 50 MPa) · Symmetrical Verified Awards Bar (Shramabhimanee 2013 & Co-Sponsor 2016) · OEM Machinery Dock
03. Marquee        High-contrast royal blue ticker (`PAVING · SDLG · NOAH · HOKANDARA`)
04. Manifesto      Pinned word scrub reveal on porcelain background
05. Paving Track   GSAP Pinned horizontal gallery · 5 Architectural Patterns · Spec rows
06. Machinery      4 Core Division monolithic cards with 3D glossy anchors & specs
07. Transformation Interactive Before/After Compare Slider with chrome control bar
08. Calculator     Architectural material estimator · Metric/Imperial · Live CountUp
09. Archive        Masonry field photography archive · Fullscreen Lightbox Dialog
10. Story          Corporate heritage & ICTAD construction timeline
11. Recognition    National Shramabhimanee Award & Construction Co-Sponsor with laurels
12. OEM Partners   Continuous brand logo marquee (SDLG, Noah, Shengya, TNY)
13. Consultation   Direct contact form & Hokandara showroom facility coordinates
14. Footer         Monumental architectural footer with directory indices & credits
```

---

## 4. Accessibility & Fallbacks

- `prefers-reduced-motion`: Zero pinning, smooth instant layout, full readable content.
- Color contrast: All body text passes WCAG AAA (`#334155` on `#FFFFFF` = 7.5:1; `#0A1128` on `#FFFFFF` = 15.6:1).
- Mobile: Touch-first horizontal scroll, responsive layouts, 60fps hardware-accelerated transforms.
