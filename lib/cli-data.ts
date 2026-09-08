import type { Line } from "@/components/terminal";

export const GITHUB = "https://github.com/theo-mrn/pgpilot";
export const RELEASES = `${GITHUB}/releases`;

/* Séquence jouée dans le hero. `pause` = délai avant la ligne suivante. */
export const HERO_SEQUENCE: Line[] = [
  { toks: [{ k: "prompt" }, { k: "cmd", v: "pgpilot detect" }], pause: 850 },
  {
    toks: [{ k: "dim", v: "  scan du cluster prod-eu-west-1…" }],
    pause: 900,
  },
  {
    toks: [
      { k: "ok" },
      { k: "text", v: " 3 instances PostgreSQL · 2 namespaces" },
    ],
    pause: 320,
  },
  { toks: [], pause: 120 },
  {
    toks: [
      { k: "dim", v: "  ├ " },
      { k: "strong", v: "app/postgres-main" },
      { k: "dim", v: "       pg 16.2   " },
      { k: "ok", v: "reachable" },
    ],
    pause: 200,
  },
  {
    toks: [
      { k: "dim", v: "  ├ " },
      { k: "strong", v: "app/postgres-events" },
      { k: "dim", v: "     pg 15.6   " },
      { k: "ok", v: "reachable" },
    ],
    pause: 200,
  },
  {
    toks: [
      { k: "dim", v: "  └ " },
      { k: "strong", v: "billing/postgres-main" },
      { k: "dim", v: "   pg 16.1   " },
      { k: "ok", v: "reachable" },
    ],
    pause: 380,
  },
  {
    toks: [{ k: "dim", v: "  → ~/.config/pgpilot/backup.yaml" }],
    pause: 1100,
  },
  { toks: [], pause: 100 },
  {
    toks: [{ k: "prompt" }, { k: "cmd", v: "pgpilot deploy myapp" }],
    pause: 850,
  },
  {
    toks: [{ k: "ok", v: "app/postgres-main       (created)" }],
    pause: 260,
  },
  {
    toks: [{ k: "ok", v: "app/postgres-events     (created)" }],
    pause: 260,
  },
  {
    toks: [{ k: "ok", v: "billing/postgres-main   (created)" }],
    pause: 320,
  },
  { toks: [{ k: "dim", v: "  3 CronJob(s) déployés." }], pause: 1200 },
  { toks: [], pause: 100 },
  {
    toks: [
      { k: "prompt" },
      { k: "cmd", v: "pgpilot backup myapp run " },
      { k: "flag", v: "--wait" },
    ],
    pause: 900,
  },
  {
    toks: [
      { k: "arrow" },
      { k: "strong", v: " postgres-main" },
      { k: "dim", v: "      412 MB → " },
      { k: "accent", v: "s3://acme-backups" },
    ],
    pause: 500,
  },
  {
    toks: [
      { k: "arrow" },
      { k: "strong", v: " postgres-events" },
      { k: "dim", v: "    198 MB → " },
      { k: "accent", v: "s3://acme-backups" },
    ],
    pause: 500,
  },
  {
    toks: [{ k: "ok", v: "3 backups terminés en 42s" }],
    pause: 600,
  },
];

export type Command = {
  key: string;
  name: string;
  usage: string;
  desc: string;
  output: Line[];
};

export const COMMANDS: Command[] = [
  {
    key: "detect",
    name: "detect",
    usage: "pgpilot detect",
    desc: "Scanne le cluster, génère backup.yaml",
    output: [
      { toks: [{ k: "prompt" }, { k: "cmd", v: "pgpilot detect" }] },
      { toks: [{ k: "dim", v: "  scan du cluster prod-eu-west-1…" }] },
      { toks: [] },
      { toks: [{ k: "ok", v: "3 instances PostgreSQL trouvées" }] },
      { toks: [] },
      {
        toks: [
          { k: "dim", v: "  NAMESPACE   " },
          { k: "dim", v: "SERVICE            VERSION   ÉTAT" },
        ],
      },
      {
        toks: [
          { k: "text", v: "  app         " },
          { k: "strong", v: "postgres-main      " },
          { k: "dim", v: "pg 16.2   " },
          { k: "ok", v: "reachable" },
        ],
      },
      {
        toks: [
          { k: "text", v: "  app         " },
          { k: "strong", v: "postgres-events    " },
          { k: "dim", v: "pg 15.6   " },
          { k: "ok", v: "reachable" },
        ],
      },
      {
        toks: [
          { k: "text", v: "  billing     " },
          { k: "strong", v: "postgres-main      " },
          { k: "dim", v: "pg 16.1   " },
          { k: "ok", v: "reachable" },
        ],
      },
      { toks: [] },
      { toks: [{ k: "dim", v: "  → config écrite : ~/.config/pgpilot/backup.yaml" }] },
      { toks: [{ k: "dim", v: "  → renseigne ton bucket S3 et tes credentials" }] },
    ],
  },
  {
    key: "deploy",
    name: "deploy",
    usage: "pgpilot deploy myapp",
    desc: "Crée un CronJob par base",
    output: [
      { toks: [{ k: "prompt" }, { k: "cmd", v: "pgpilot deploy myapp" }] },
      { toks: [{ k: "dim", v: '  déploiement de 3 job(s) — config "myapp"…' }] },
      { toks: [] },
      {
        toks: [
          { k: "ok" },
          { k: "strong", v: "  pgpilot-postgres-main" },
          { k: "dim", v: "      app/created" },
        ],
      },
      {
        toks: [
          { k: "ok" },
          { k: "strong", v: "  pgpilot-postgres-events" },
          { k: "dim", v: "    app/created" },
        ],
      },
      {
        toks: [
          { k: "ok" },
          { k: "strong", v: "  pgpilot-billing-main" },
          { k: "dim", v: "       billing/created" },
        ],
      },
      { toks: [] },
      { toks: [{ k: "dim", v: "  3 CronJob(s) déployés. Aucun pod modifié." }] },
    ],
  },
  {
    key: "backup",
    name: "backup",
    usage: "pgpilot backup myapp run --wait",
    desc: "Déclenche un dump, pousse vers S3",
    output: [
      {
        toks: [
          { k: "prompt" },
          { k: "cmd", v: "pgpilot backup myapp run " },
          { k: "flag", v: "--wait" },
        ],
      },
      {
        toks: [
          { k: "dim", v: "  3 base(s) → " },
          { k: "accent", v: "s3://acme-backups" },
        ],
      },
      { toks: [] },
      {
        toks: [
          { k: "arrow" },
          { k: "strong", v: " pgpilot-postgres-main" },
          { k: "dim", v: "      job/…-manual-20260908" },
        ],
      },
      {
        toks: [
          { k: "arrow" },
          { k: "strong", v: " pgpilot-postgres-events" },
          { k: "dim", v: "    job/…-manual-20260908" },
        ],
      },
      { toks: [] },
      { toks: [{ k: "ok", v: "postgres-main       412 MB   18s" }] },
      { toks: [{ k: "ok", v: "postgres-events     198 MB   11s" }] },
      { toks: [{ k: "ok", v: "billing-main        367 MB   13s" }] },
      { toks: [] },
      { toks: [{ k: "dim", v: "  3 backups terminés en 42s." }] },
    ],
  },
  {
    key: "restore",
    name: "restore",
    usage: "pgpilot restore myapp run postgres-main",
    desc: "Restaure depuis une archive S3",
    output: [
      {
        toks: [
          { k: "prompt" },
          { k: "cmd", v: "pgpilot restore myapp run postgres-main" },
        ],
      },
      { toks: [] },
      { toks: [{ k: "dim", v: "  archives disponibles :" }] },
      { toks: [] },
      {
        toks: [
          { k: "arrow" },
          { k: "accent", v: " 20260908T030000Z.dump.gz" },
          { k: "dim", v: "   08 sept. 03:00   412 MB" },
        ],
      },
      {
        toks: [
          { k: "text", v: "   20260907T030000Z.dump.gz" },
          { k: "dim", v: "   07 sept. 03:00   398 MB" },
        ],
      },
      {
        toks: [
          { k: "text", v: "   20260906T030000Z.dump.gz" },
          { k: "dim", v: "   06 sept. 03:00   391 MB" },
        ],
      },
      { toks: [] },
      {
        toks: [
          { k: "warn", v: "  ⚠  Écrase la base actuelle. Continuer ? [y/N] " },
          { k: "accent", v: "y" },
        ],
      },
      { toks: [] },
      { toks: [{ k: "arrow", v: " job/pgpilot-restore-20260908-152210" }] },
      { toks: [{ k: "ok", v: "restauration terminée." }] },
    ],
  },
  {
    key: "status",
    name: "status",
    usage: "pgpilot status",
    desc: "État des CronJobs déployés",
    output: [
      { toks: [{ k: "prompt" }, { k: "cmd", v: "pgpilot status" }] },
      { toks: [] },
      {
        toks: [
          { k: "dim", v: "   JOB                       NS        CRON        DERNIER   ÉTAT" },
        ],
      },
      {
        toks: [
          { k: "ok" },
          { k: "strong", v: " pgpilot-postgres-main" },
          { k: "dim", v: "     app       0 2 * * *   2h        success" },
        ],
      },
      {
        toks: [
          { k: "ok" },
          { k: "strong", v: " pgpilot-postgres-events" },
          { k: "dim", v: "   app       0 2 * * *   2h        success" },
        ],
      },
      {
        toks: [
          { k: "ok" },
          { k: "strong", v: " pgpilot-billing-main" },
          { k: "dim", v: "      billing   0 3 * * *   1h        success" },
        ],
      },
      { toks: [] },
      { toks: [{ k: "dim", v: "  3 CronJob(s) · 0 échec sur 30 jours" }] },
    ],
  },
];
