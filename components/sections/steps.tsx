import { Reveal, SectionLabel } from "@/components/primitives";
import { Topology } from "@/components/topology";

const STEPS = [
  {
    n: "01",
    cmd: "pgpilot detect",
    title: "Détecte tes bases",
    body: "pgpilot lit ta kubeconfig, scanne le cluster et trouve les Services PostgreSQL joignables. Il écrit un backup.yaml prérempli — pas une ligne de YAML à la main.",
  },
  {
    n: "02",
    cmd: "pgpilot deploy myapp",
    title: "Déploie les CronJobs",
    body: "Tu renseignes le schedule, le bucket et la rétention. pgpilot crée un CronJob par base dans le namespace concerné. Rien d'autre ne bouge dans le cluster.",
  },
  {
    n: "03",
    cmd: "pgpilot backup myapp run --wait",
    title: "Vérifie, puis oublie",
    body: "Un backup manuel pour confirmer que le dump part bien vers S3. Ensuite le cron prend le relais, et status te dit en une ligne si tout tourne.",
  },
];

export function Steps() {
  return (
    <section id="fonctionnement" className="border-rule-soft border-b">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="border-rule-soft grid gap-8 border-b py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <SectionLabel index="01">en trois commandes</SectionLabel>
            <h2 className="text-giga mt-5 font-extrabold text-balance">
              De zéro à backups,
              <br />
              en moins d&apos;une minute.
            </h2>
          </div>
          <p className="text-ink-2 max-w-[54ch] text-lg leading-[1.65] lg:col-span-6 lg:col-start-7 lg:self-end">
            Aucun opérateur à installer, aucun CRD, aucun Helm chart. pgpilot
            parle à l&apos;API Kubernetes avec tes droits existants et crée des
            objets standards que tu peux lire, éditer ou supprimer à la main.
          </p>
        </div>

        {/* Sommaire numéroté : chaque étape est une entrée de table des matières */}
        <ol className="divide-rule-soft divide-y">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 70}>
                <div className="group grid gap-5 py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
                  <div className="lg:col-span-2">
                    <span className="text-paper-3 group-hover:text-vermillon block font-mono text-6xl leading-none font-bold transition-colors duration-300 lg:text-7xl">
                      {s.n}
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {s.title}
                    </h3>
                    <div className="border-rule-soft bg-paper-2/50 mt-4 inline-block rounded-md border px-3 py-1.5 font-mono text-[12.5px]">
                      <span className="text-vermillon mr-2 select-none">$</span>
                      {s.cmd}
                    </div>
                  </div>

                  <p className="text-ink-2 max-w-[56ch] leading-[1.7] lg:col-span-5 lg:col-start-8">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Vue d'ensemble : ce que pgpilot touche, et ce qu'il ne touche pas */}
        <div className="border-rule-soft grid gap-10 border-t py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="lg:col-span-4 lg:self-center">
            <SectionLabel index="—">vue d&apos;ensemble</SectionLabel>
            <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl text-balance">
              Rien qui tourne
              <br />
              en permanence.
            </h3>
            <p className="text-ink-2 mt-5 max-w-[46ch] leading-[1.7]">
              pgpilot lit le cluster, écrit ta config et pose des CronJobs
              standards. Ensuite il sort du chemin — si tu le désinstalles, tes
              backups continuent.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <Topology />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
