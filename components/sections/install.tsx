"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, GithubIcon, SectionLabel } from "@/components/primitives";
import { GITHUB, RELEASES } from "@/lib/cli-data";

const INSTALL_CMD =
  "curl -L https://github.com/theo-mrn/pgpilot/releases/latest/download/pgpilot-darwin-arm64 -o /usr/local/bin/pgpilot && chmod +x /usr/local/bin/pgpilot";

const PLATFORMS = ["macOS arm64", "macOS amd64", "Linux amd64", "Linux arm64"];

export function Install() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      /* presse-papiers indisponible : la commande reste sélectionnable */
    }
  }

  return (
    <section id="install" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionLabel index="04">installation</SectionLabel>
            <h2 className="text-giga mt-5 font-extrabold text-balance">
              Un binaire.
              <br />
              <span className="text-vermillon">Rien à signer.</span>
            </h2>
            <p className="text-paper-3 mt-6 max-w-[46ch] text-lg leading-[1.65]">
              Pas de runtime, pas de compte, pas de plan tarifaire. Télécharge,
              rends exécutable, lance.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-paper/20 overflow-hidden rounded-xl border">
              <div className="border-paper/25 flex items-center justify-between border-b px-4 py-2.5">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-60">
                  macOS · arm64
                </span>
                <button
                  onClick={copy}
                  className="border-paper/30 hover:bg-paper hover:text-ink inline-flex cursor-pointer items-center gap-1.5 border px-3 py-1 font-mono text-[11px] font-semibold transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="size-3" />
                      copié
                    </>
                  ) : (
                    "copier"
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed whitespace-pre sm:p-5">
                <span className="text-vermillon mr-2 select-none">$</span>
                curl -L github.com/theo-mrn/pgpilot/releases/latest/…
                {"\n     "}-o /usr/local/bin/pgpilot && chmod +x
                /usr/local/bin/pgpilot
              </pre>
            </div>

            <span aria-live="polite" className="sr-only">
              {copied ? "Commande copiée dans le presse-papiers" : ""}
            </span>

            <ul className="text-paper-3 mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11.5px]">
              {PLATFORMS.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="bg-vermillon size-1.5" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paper text-ink hover:bg-vermillon hover:text-paper inline-flex h-12 items-center gap-2.5 px-6 text-[15px] font-semibold transition-colors duration-200"
              >
                <GithubIcon />
                Star sur GitHub
              </a>
              <a
                href={RELEASES}
                target="_blank"
                rel="noopener noreferrer"
                className="border-paper/35 hover:bg-paper hover:text-ink inline-flex h-12 items-center rounded-lg border px-6 text-[15px] font-semibold transition-colors duration-200"
              >
                Toutes les releases
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2 font-mono text-sm font-bold">
          <span className="text-vermillon" aria-hidden>
            ▸
          </span>
          pgpilot
        </div>

        <nav aria-label="Liens de pied de page">
          <ul className="text-ink-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12.5px]">
            {[
              { href: GITHUB, label: "github" },
              { href: RELEASES, label: "releases" },
              { href: "#cli", label: "cli" },
              { href: "#install", label: "install" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="hover:text-vermillon transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-ink-3 font-mono text-[12px]">
          MIT · pour les sysadmins fatigués
        </p>
      </div>
    </footer>
  );
}
