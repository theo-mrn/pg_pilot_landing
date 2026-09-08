"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/* Une ligne de sortie CLI décrite en données, jamais en HTML brut. */
export type Tok =
  | { k: "prompt" }
  | { k: "cmd"; v: string }
  | { k: "flag"; v: string }
  | { k: "dim"; v: string }
  | { k: "text"; v: string }
  | { k: "strong"; v: string }
  | { k: "ok"; v?: string }
  | { k: "warn"; v: string }
  | { k: "arrow"; v?: string }
  | { k: "accent"; v: string };

export type Line = { toks: Tok[]; pause?: number };

function Token({ t }: { t: Tok }) {
  switch (t.k) {
    case "prompt":
      return <span className="text-vermillon mr-2 select-none">$</span>;
    case "cmd":
      return <span className="text-ink font-semibold">{t.v}</span>;
    case "flag":
      return <span className="text-vermillon-ink">{t.v}</span>;
    case "dim":
      return <span className="text-ink-3">{t.v}</span>;
    case "strong":
      return <span className="text-ink font-semibold">{t.v}</span>;
    case "ok":
      return (
        <span className="text-signal">
          <span aria-hidden>✓</span>
          {t.v ? <span className="text-ink-2"> {t.v}</span> : null}
        </span>
      );
    case "warn":
      return <span className="text-warn">{t.v}</span>;
    case "arrow":
      return (
        <span className="text-vermillon mr-1 select-none" aria-hidden>
          ▸{t.v ?? ""}
        </span>
      );
    case "accent":
      return <span className="text-vermillon font-medium">{t.v}</span>;
    default:
      return <span className="text-ink-2">{t.v}</span>;
  }
}

function lineToText(l: Line) {
  return l.toks
    .map((t) => {
      if (t.k === "prompt") return "$ ";
      if (t.k === "ok") return `✓ ${t.v ?? ""}`;
      if (t.k === "arrow") return `▸ ${t.v ?? ""}`;
      return "v" in t ? (t.v ?? "") : "";
    })
    .join("");
}

/* ── Châssis du terminal : bordure franche, pas d'ombre ──────── */

export function TerminalFrame({
  title,
  children,
  minHeight,
}: {
  title: string;
  children: React.ReactNode;
  minHeight?: number;
}) {
  return (
    <div className="border-rule-soft bg-paper shadow-soft overflow-hidden rounded-xl border">
      <div className="border-rule-soft bg-paper-2/60 flex items-center gap-3 border-b px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="border-rule-soft size-2.5 rounded-full border" />
          <span className="border-rule-soft size-2.5 rounded-full border" />
          <span className="bg-vermillon border-vermillon size-2.5 rounded-full border" />
        </div>
        <span className="text-ink-3 font-mono text-[11px] tracking-wide">
          {title}
        </span>
      </div>
      <div
        className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.85] sm:p-5 sm:text-[13px]"
        style={minHeight ? { minHeight } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Sortie statique (onglets CLI) ───────────────────────────── */

export function StaticOutput({ lines }: { lines: Line[] }) {
  return (
    <pre className="text-ink-2 m-0 font-mono whitespace-pre">
      {lines.map((l, i) => (
        <div
          key={i}
          className="line-in"
          style={{ animationDelay: `${i * 45}ms` }}
        >
          {l.toks.length === 0 ? (
            " "
          ) : (
            <>
              {l.toks.map((t, j) => (
                <Token key={j} t={t} />
              ))}
            </>
          )}
        </div>
      ))}
    </pre>
  );
}

/* ── Sortie jouée ligne par ligne (hero) ─────────────────────── */

export function PlayingOutput({ lines }: { lines: Line[] }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  // Mouvement réduit : la séquence est affichée d'un bloc, sans boucle.
  const visibleCount = reduced ? lines.length : count;

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const step = () => {
      if (cancelled) return;
      if (i >= lines.length) {
        timer = setTimeout(() => {
          if (cancelled) return;
          i = 0;
          setCount(0);
          timer = setTimeout(step, 700);
        }, 5000);
        return;
      }
      i += 1;
      setCount(i);
      timer = setTimeout(step, lines[i - 1]?.pause ?? 300);
    };

    timer = setTimeout(step, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines, reduced]);

  const visible = lines.slice(0, visibleCount);

  return (
    <>
      {/* Version accessible : texte complet, hors du flux visuel */}
      <span className="sr-only">
        {lines.map((l) => lineToText(l)).join("\n")}
      </span>

      <pre
        className="text-ink-2 m-0 font-mono whitespace-pre"
        aria-hidden
        role="presentation"
      >
        {visible.map((l, i) => (
          <div key={i} className={reduced ? undefined : "line-in"}>
            {l.toks.length === 0 ? (
              " "
            ) : (
              <>
                {l.toks.map((t, j) => (
                  <Token key={j} t={t} />
                ))}
              </>
            )}
          </div>
        ))}
        <span className="bg-vermillon cursor-block mt-0.5 inline-block h-[1.05em] w-[0.55em] align-text-bottom" />
      </pre>
    </>
  );
}
