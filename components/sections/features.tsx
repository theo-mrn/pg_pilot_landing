import { Reveal, SectionLabel } from "@/components/primitives";

const FEATURES = [
  {
    n: "A",
    title: "Détection automatique",
    body: "pgpilot inspecte les Services du cluster, teste la joignabilité et relève la version de chaque instance. La config sort préremplie.",
    detail: [
      "app/postgres-main      pg 16.2",
      "app/postgres-events    pg 15.6",
      "billing/postgres-main  pg 16.1",
    ],
    wide: true,
  },
  {
    n: "B",
    title: "Config déclarative",
    body: "Schedule, rétention, bucket, credentials : un seul fichier YAML par environnement, versionnable dans ton repo.",
    detail: [
      "schedule:  '0 2 * * *'",
      "retention: 7d",
      "bucket:    acme-backups",
      "endpoint:  minio.internal",
    ],
    wide: true,
  },
  {
    n: "C",
    title: "Secrets jamais en clair",
    body: "Les credentials référencent tes Secrets Kubernetes existants. pgpilot ne les lit pas et ne les écrit nulle part.",
    detail: ["db_password:", "  from: k8s-secret://app/env#DB_PASSWORD"],
    wide: false,
  },
  {
    n: "D",
    title: "Restore interactif",
    body: "Liste les archives d'une base, choisis un point de restauration, confirme. pgpilot lance un Job et suit son exécution.",
    detail: [
      "▸ 20260908T030000Z.dump.gz  412 MB",
      "  20260907T030000Z.dump.gz  398 MB",
    ],
    wide: false,
  },
  {
    n: "E",
    title: "S3 et MinIO",
    body: "AWS S3, ou n'importe quel stockage compatible via un endpoint custom. Un champ à changer, rien d'autre.",
    detail: ["s3://acme-backups/myapp/postgres/"],
    wide: false,
  },
];

export function Features() {
  return (
    <section id="fonctionnalites" className="border-rule-soft border-b">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="border-rule-soft grid gap-8 border-b py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <SectionLabel index="03">fonctionnalités</SectionLabel>
            <h2 className="text-giga mt-5 font-extrabold text-balance">
              Ce qu&apos;il fait,
              <br />
              et rien de plus.
            </h2>
          </div>
          <p className="text-ink-2 max-w-[54ch] text-lg leading-[1.65] lg:col-span-6 lg:col-start-7 lg:self-end">
            Sauvegarder et restaurer des bases PostgreSQL dans Kubernetes. Pas
            de dashboard, pas de télémétrie, pas de compte à créer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((f, i) => (
            <article
              key={f.n}
              className={`border-rule-soft group flex flex-col border-b p-7 md:border-r lg:p-9 ${
                f.wide ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <Reveal delay={i * 60} className="flex h-full flex-col">
                <div className="flex items-baseline gap-3">
                  <span className="border-rule-soft bg-paper-2 text-vermillon flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-[12px] font-bold">
                    {f.n}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">
                    {f.title}
                  </h3>
                </div>

                <p className="text-ink-2 mt-4 max-w-[46ch] leading-[1.7]">
                  {f.body}
                </p>

                <pre className="bg-paper-2 border-rule-soft text-ink-3 mt-auto overflow-x-auto rounded-lg border px-4 py-3 pt-6 font-mono text-[11.5px] leading-[1.9] whitespace-pre">
                  {f.detail.join("\n")}
                </pre>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
