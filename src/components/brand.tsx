import React from "react";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand${light ? " brand-light" : ""}`}
      href="/"
      aria-label="RCB Holdings home"
    >
      <span className="brand-mark" aria-hidden="true" />
    </a>
  );
}

export function AppleLaurelBranch({
  side = "left",
  className = "",
}: {
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      className={`apple-laurel-branch apple-laurel-${side} ${className}`.trim()}
      viewBox="0 0 74 132"
      fill="none"
      aria-hidden="true"
    >
      {/* Stem */}
      <path
        d="M 62 124 C 20 114 4 80 14 48 C 21 28 34 14 50 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom base leaf */}
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -19 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(61, 122) rotate(42) scale(0.85)"
      />
      {/* Pair 1 */}
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -19 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(47, 114) rotate(-22) scale(0.92)"
      />
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -18 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(51, 112) rotate(34) scale(0.88)"
      />
      {/* Pair 2 */}
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -20 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(32, 103) rotate(-34) scale(1.02)"
      />
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -19 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(38, 100) rotate(26) scale(0.96)"
      />
      {/* Pair 3 */}
      <path
        d="M 0 0 C -3.5 -5 -6 -14 0 -21 C 6 -14 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(20, 89) rotate(-46) scale(1.10)"
      />
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -19 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(28, 85) rotate(16) scale(1.02)"
      />
      {/* Pair 4 (Apex) */}
      <path
        d="M 0 0 C -3.5 -5 -6 -14 0 -21 C 6 -14 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(13, 73) rotate(-58) scale(1.14)"
      />
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -20 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(20, 68) rotate(8) scale(1.06)"
      />
      {/* Pair 5 */}
      <path
        d="M 0 0 C -3.5 -5 -6 -14 0 -21 C 6 -14 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(12, 56) rotate(-70) scale(1.12)"
      />
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -19 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(20, 51) rotate(0) scale(1.02)"
      />
      {/* Pair 6 */}
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -20 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(16, 39) rotate(-82) scale(1.06)"
      />
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -18 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(25, 35) rotate(-8) scale(0.96)"
      />
      {/* Pair 7 */}
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -19 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(26, 24) rotate(-94) scale(0.98)"
      />
      <path
        d="M 0 0 C -3.5 -5 -6 -12 0 -17 C 6 -12 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(34, 21) rotate(-18) scale(0.90)"
      />
      {/* Tip leaf */}
      <path
        d="M 0 0 C -3.5 -5 -6 -13 0 -19 C 6 -13 3.5 -5 0 0 Z"
        fill="currentColor"
        transform="translate(47, 9) rotate(-112) scale(0.88)"
      />
    </svg>
  );
}

export function AwardEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l2.6 5.8 6.4.7-4.8 4.3 1.3 6.2L12 16l-5.5 3 1.3-6.2-4.8-4.3 6.4-.7L12 2z" />
    </svg>
  );
}

export function AppleAwardBadge({
  org,
  title,
  href,
  className = "",
  size = "md",
  theme = "light",
}: {
  org: string;
  title: string;
  href?: string;
  className?: string;
  size?: "md" | "lg";
  theme?: "light" | "dark";
}) {
  const isLight = theme === "light";

  const content = (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
      <AppleLaurelBranch
        side="left"
        className={`w-5 h-9 sm:w-6 sm:h-11 ${
          isLight ? "text-[var(--theme)]" : "text-amber-400"
        } transition-transform group-hover:-translate-x-0.5`}
      />
      <div className="flex flex-col items-center text-center px-1">
        <AwardEmblem
          className={`mb-0.5 ${
            isLight ? "text-[var(--theme)]" : "text-amber-400"
          }`}
        />
        <span
          className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}
        >
          {org}
        </span>
        <strong
          className={`font-display text-xs sm:text-sm tracking-wide ${
            isLight ? "text-[var(--ink)]" : "text-white"
          }`}
        >
          {title}
        </strong>
      </div>
      <AppleLaurelBranch
        side="right"
        className={`w-5 h-9 sm:w-6 sm:h-11 ${
          isLight ? "text-[var(--theme)]" : "text-amber-400"
        } transition-transform group-hover:translate-x-0.5`}
      />
    </div>
  );

  const containerClasses = `group inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border transition-all duration-300 ${
    isLight
      ? "bg-white/95 border-slate-200/90 hover:border-[var(--theme)] hover:shadow-md hover:bg-white"
      : "bg-slate-900/80 border-slate-700/80 hover:border-amber-400/50 hover:bg-slate-900"
  } ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={containerClasses} aria-label={`${org} ${title}`}>
        {content}
      </a>
    );
  }

  return (
    <div className={containerClasses} role="img" aria-label={`${org} ${title}`}>
      {content}
    </div>
  );
}

export function Laurel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`.trim()}
      aria-hidden="true"
    >
      <AppleLaurelBranch side="left" className="w-5 h-9 text-[var(--theme)]" />
      <AppleLaurelBranch side="right" className="w-5 h-9 text-[var(--theme)]" />
    </div>
  );
}

export function Awards({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl"
      role="region"
      aria-label="National Honors & Recognition"
    >
      <AppleAwardBadge
        org="National Honors"
        title="Shramabhimanee Award · 2013"
        href="#achievements"
        theme={theme}
      />
      <AppleAwardBadge
        org="Construction Exhibition"
        title="Co-Sponsor Award · 2016"
        href="#achievements"
        theme={theme}
      />
    </div>
  );
}
