"use client";

import { useId } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/* ── Schéma de topologie ──────────────────────────────────────
   pgpilot au centre, ce qu'il touche autour. Pas de dépendance :
   SVG + keyframes CSS, dans les tokens « Encre & Vermillon ».
   ───────────────────────────────────────────────────────────── */

type IconProps = { className?: string };

function PostgresIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <ellipse cx="12" cy="5.5" rx="7" ry="3" />
      <path d="M5 5.5v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
      <path d="M5 11.5v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  );
}

function CronIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.3 2" strokeLinecap="round" />
    </svg>
  );
}

function BucketIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M4 6.5h16l-1.6 13a1.6 1.6 0 0 1-1.6 1.4H7.2a1.6 1.6 0 0 1-1.6-1.4L4 6.5Z" />
      <ellipse cx="12" cy="6.5" rx="8" ry="2.6" />
    </svg>
  );
}

function YamlIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M14 3H7a1.6 1.6 0 0 0-1.6 1.6v14.8A1.6 1.6 0 0 0 7 21h10a1.6 1.6 0 0 0 1.6-1.6V7.6L14 3Z" />
      <path d="M13.8 3.2v4.6h4.6" />
    </svg>
  );
}

function ClusterIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="m12 2.6 8.1 4.7v9.4L12 21.4 3.9 16.7V7.3L12 2.6Z" />
      <path d="M12 11.2v10.2M12 11.2 3.9 7.3M12 11.2l8.1-3.9" />
    </svg>
  );
}

function RestoreIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" strokeLinecap="round" />
      <path d="M3.2 4.4v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Repère : viewBox 560 × 400, centre logique à (280, 200). */
type Node = {
  id: string;
  label: string;
  sub: string;
  icon: (p: IconProps) => React.ReactElement;
  x: number;
  y: number;
  path: string;
  delay: number;
};

const NODES: Node[] = [
  {
    id: "cluster",
    label: "Cluster K8s",
    sub: "lecture seule",
    icon: ClusterIcon,
    x: 96,
    y: 74,
    path: "M 246 186 V 89 Q 246 74 231 74 H 150",
    delay: 0,
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    sub: "14 → 17",
    icon: PostgresIcon,
    x: 96,
    y: 200,
    path: "M 232 200 H 150",
    delay: 0.4,
  },
  {
    id: "yaml",
    label: "backup.yaml",
    sub: "versionné",
    icon: YamlIcon,
    x: 96,
    y: 326,
    path: "M 246 214 V 311 Q 246 326 231 326 H 150",
    delay: 0.8,
  },
  {
    id: "cron",
    label: "CronJobs",
    sub: "natifs",
    icon: CronIcon,
    x: 464,
    y: 74,
    path: "M 314 186 V 89 Q 314 74 329 74 H 410",
    delay: 0.2,
  },
  {
    id: "s3",
    label: "S3 · MinIO",
    sub: "pg_dump",
    icon: BucketIcon,
    x: 464,
    y: 200,
    path: "M 328 200 H 410",
    delay: 0.6,
  },
  {
    id: "restore",
    label: "Restore",
    sub: "à la demande",
    icon: RestoreIcon,
    x: 464,
    y: 326,
    path: "M 314 214 V 311 Q 314 326 329 326 H 410",
    delay: 1,
  },
];

function Wire({ d, id, delay, animate }: { d: string; id: string; delay: number; animate: boolean }) {
  return (
    <>
      <path d={d} className="stroke-rule-soft" strokeWidth="1" fill="none" />
      {animate && (
        <path
          d={d}
          stroke={`url(#${id})`}
          strokeWidth="1.75"
          fill="none"
          strokeLinecap="round"
          className="wire-pulse"
          style={{ animationDelay: `${delay}s` }}
        />
      )}
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-vermillon)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-vermillon)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--color-vermillon)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
}

export function Topology() {
  const uid = useId();
  const reduced = useReducedMotion();

  return (
    <figure className="border-rule-soft bg-paper-2/60 relative overflow-hidden rounded-xl border">
      {/* Trame de fond, très discrète */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden
      />

      <div className="relative aspect-[560/400] w-full">
        <svg
          viewBox="0 0 560 400"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {NODES.map((n) => (
            <Wire
              key={n.id}
              d={n.path}
              id={`${uid}-${n.id}`}
              delay={n.delay}
              animate={!reduced}
            />
          ))}
        </svg>

        {/* Noyau : pgpilot */}
        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="border-rule-soft bg-paper shadow-lift flex items-center gap-2 rounded-xl border px-4 py-3">
            <span className="text-vermillon font-mono text-sm leading-none" aria-hidden>
              ▸
            </span>
            <span className="font-mono text-[15px] font-bold tracking-tight">
              pgpilot
            </span>
          </div>
        </div>

        {/* Nœuds périphériques */}
        {NODES.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(n.x / 560) * 100}%`,
                top: `${(n.y / 400) * 100}%`,
              }}
            >
              <div className="border-rule-soft bg-paper shadow-soft flex items-center gap-2.5 rounded-lg border px-3 py-2">
                <Icon className="text-ink-3 size-4 shrink-0" />
                <span className="min-w-0 leading-tight">
                  <span className="block font-mono text-[12px] font-semibold whitespace-nowrap">
                    {n.label}
                  </span>
                  <span className="text-ink-3 block text-[10.5px] whitespace-nowrap">
                    {n.sub}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="sr-only">
        pgpilot inspecte le cluster Kubernetes et les instances PostgreSQL,
        génère un backup.yaml versionné, puis déploie des CronJobs natifs qui
        écrivent les dumps vers S3 ou MinIO, avec restauration à la demande.
      </figcaption>
    </figure>
  );
}
