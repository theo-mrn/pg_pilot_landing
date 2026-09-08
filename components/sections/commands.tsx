"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/primitives";
import { StaticOutput, TerminalFrame } from "@/components/terminal";
import { COMMANDS } from "@/lib/cli-data";

export function Commands() {
  const [active, setActive] = useState(COMMANDS[0].key);
  const current = COMMANDS.find((c) => c.key === active) ?? COMMANDS[0];

  return (
    <section id="cli" className="border-rule-soft bg-paper-2 border-b">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="border-rule-soft grid gap-10 border-b py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <SectionLabel index="02">la CLI</SectionLabel>
            <h2 className="text-giga mt-6 font-extrabold text-balance">
              Cinq commandes.
              <br />
              C&apos;est tout.
            </h2>
          </div>
          <p className="text-ink-2 max-w-[54ch] text-lg leading-[1.65] lg:col-span-6 lg:col-start-7 lg:self-end">
            pgpilot reste petit par choix. Le comportement vit dans ton{" "}
            <code className="bg-paper-3 px-1.5 py-0.5 font-mono text-[0.85em]">
              backup.yaml
            </code>
            , versionné dans ton repo — pas dans une console web.
          </p>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-20 lg:py-24">
          {/* Liste des commandes */}
          <div
            className="lg:col-span-4"
            role="tablist"
            aria-label="Commandes pgpilot"
          >
            <ul className="flex flex-col gap-2">
              {COMMANDS.map((c) => {
                const on = c.key === active;
                return (
                  <li key={c.key}>
                    <button
                      role="tab"
                      aria-selected={on}
                      aria-controls={`panel-${c.key}`}
                      id={`tab-${c.key}`}
                      onClick={() => setActive(c.key)}
                      className={`group flex w-full cursor-pointer items-baseline gap-3.5 rounded-lg px-4 py-5 text-left transition-colors duration-200 ${
                        on ? "bg-ink text-paper" : "hover:bg-paper-3"
                      }`}
                    >
                      <span
                        className={`font-mono text-[13px] select-none ${
                          on ? "text-vermillon" : "text-ink-3"
                        }`}
                        aria-hidden
                      >
                        $
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[14px] font-semibold">
                          {c.name}
                        </span>
                        <span
                          className={`mt-1.5 block text-[13px] leading-relaxed ${
                            on ? "text-paper-3" : "text-ink-3"
                          }`}
                        >
                          {c.desc}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sortie */}
          <div
            className="lg:col-span-8"
            role="tabpanel"
            id={`panel-${current.key}`}
            aria-labelledby={`tab-${current.key}`}
          >
            <TerminalFrame title={current.usage} minHeight={460}>
              <StaticOutput key={current.key} lines={current.output} />
            </TerminalFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
