import Link from "next/link";
import { GithubIcon } from "@/components/primitives";
import { GITHUB } from "@/lib/cli-data";

const LINKS = [
  { href: "#fonctionnement", label: "Fonctionnement" },
  { href: "#cli", label: "CLI" },
  { href: "#fonctionnalites", label: "Fonctionnalités" },
];

export function Nav() {
  return (
    <header className="border-rule-soft bg-paper/85 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-baseline gap-2 font-mono text-[15px] font-bold tracking-tight"
          >
            <span className="text-vermillon" aria-hidden>
              ▸
            </span>
            pgpilot
          </Link>

          <nav aria-label="Navigation principale" className="flex items-center">
            <ul className="hidden items-center gap-8 md:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ink-2 hover:text-vermillon font-mono text-[12.5px] tracking-wide transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="border-rule-soft text-ink hover:border-ink hover:bg-ink hover:text-paper ml-8 inline-flex h-9 items-center gap-2 rounded-md border px-3.5 font-mono text-[12.5px] font-semibold transition-colors duration-200"
            >
              <GithubIcon className="size-3.5" />
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* Bandeau défilant — signature typographique de la marque */
export function Marquee() {
  const items = [
    "detect",
    "deploy",
    "backup",
    "restore",
    "status",
    "pg_dump → S3",
    "zéro opérateur",
    "zéro sidecar",
  ];
  const strip = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-ink text-paper overflow-hidden py-2.5">
      <div className="animate-marquee flex w-max whitespace-nowrap" aria-hidden>
        {strip.map((it, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-[12px] tracking-[0.18em] uppercase"
          >
            <span className="px-6">{it}</span>
            <span className="text-vermillon">✦</span>
          </span>
        ))}
      </div>
      <span className="sr-only">
        Commandes pgpilot : detect, deploy, backup, restore, status.
      </span>
    </div>
  );
}
