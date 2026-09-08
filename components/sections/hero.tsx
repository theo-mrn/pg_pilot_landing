import Link from "next/link";
import { ArrowIcon, GithubIcon } from "@/components/primitives";
import { PlayingOutput, TerminalFrame } from "@/components/terminal";
import { GITHUB, HERO_SEQUENCE } from "@/lib/cli-data";

const FACTS = [
  "PostgreSQL 14 → 17",
  "Aucun sidecar",
  "S3 · MinIO",
  "Binaire statique",
];

export function Hero() {
  return (
    <section className="border-rule-soft border-b lg:min-h-[calc(100svh-3.625rem)]">
      <div className="mx-auto flex h-full max-w-[1400px] flex-col px-5 sm:px-8 lg:min-h-[calc(100svh-3.625rem)]">
        <div className="grid flex-1 lg:grid-cols-12">
          {/* — Colonne texte — */}
          <div className="border-rule-soft flex flex-col justify-center py-14 sm:py-20 lg:col-span-7 lg:border-r lg:py-[clamp(2rem,5vh,4.5rem)] lg:pr-14">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
              <span className="bg-vermillon text-paper rounded-full px-2.5 py-0.5 font-semibold">
                v1.0
              </span>
              <span className="text-ink-3">MIT · open source</span>
            </div>

            <h1 className="text-mega mt-[clamp(1rem,3vh,2rem)] font-extrabold text-balance">
              Backups
              <br />
              Postgres K8s,
              <br />
              <span className="text-vermillon">sans toucher</span>
              <br />
              au cluster.
            </h1>

            <p className="text-ink-2 mt-[clamp(1rem,3vh,2rem)] max-w-[52ch] text-base leading-[1.6] sm:text-lg">
              pgpilot détecte tes instances PostgreSQL dans Kubernetes, génère
              la config et déploie des CronJobs qui font{" "}
              <code className="bg-paper-3 px-1.5 py-0.5 font-mono text-[0.85em]">
                pg_dump → S3
              </code>
              . Aucun opérateur, aucun sidecar, aucune modification de pod.
            </p>

            <div className="mt-[clamp(1.25rem,3.5vh,2.5rem)] flex flex-wrap gap-3">
              <Link
                href="#install"
                className="bg-ink text-paper hover:bg-vermillon shadow-soft inline-flex h-12 items-center gap-2.5 rounded-lg px-6 text-[15px] font-semibold transition-colors duration-200"
              >
                Démarrer en 30 secondes
                <ArrowIcon />
              </Link>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="border-rule-soft text-ink hover:border-ink hover:bg-ink hover:text-paper inline-flex h-12 items-center gap-2.5 rounded-lg border px-6 text-[15px] font-semibold transition-colors duration-200"
              >
                <GithubIcon />
                Voir le code
              </a>
            </div>

            <ul className="text-ink-3 mt-[clamp(1.5rem,4vh,3rem)] flex flex-wrap gap-x-7 gap-y-2 font-mono text-[12px]">
              {FACTS.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="bg-vermillon size-1.5 rounded-full" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* — Colonne terminal — */}
          <div className="flex flex-col justify-center pb-14 lg:col-span-5 lg:py-[clamp(2rem,5vh,4.5rem)] lg:pl-14">
            <TerminalFrame title="~ pgpilot — production" minHeight={340}>
              <PlayingOutput lines={HERO_SEQUENCE} />
            </TerminalFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
