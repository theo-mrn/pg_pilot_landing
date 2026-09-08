"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/* ── Icônes (SVG, stroke 1.5, jamais d'emoji) ───────────────── */

type IconProps = { className?: string };

export function GithubIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}

/* ── Filet horizontal ────────────────────────────────────────── */

export function Rule({ weight = "thin" }: { weight?: "thin" | "thick" }) {
  return (
    <div
      className={
        weight === "thick"
          ? "bg-ink h-[3px] w-full"
          : "bg-rule-soft h-px w-full"
      }
      aria-hidden
    />
  );
}

/* ── Étiquette de section (numérotée, style sommaire de revue) ─ */

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
      <span className="text-vermillon">{index}</span>
      <span className="text-ink-3">{children}</span>
    </div>
  );
}

/* ── Reveal au scroll (respecte prefers-reduced-motion) ──────── */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const reduced = useReducedMotion();

  // Mouvement réduit : le contenu est visible d'emblée, pas d'observer.
  const shown = seen || reduced;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`${className} ${shown ? "reveal" : "opacity-0"}`}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
