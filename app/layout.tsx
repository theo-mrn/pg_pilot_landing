import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://pgpilot.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "pgpilot — backups PostgreSQL sur Kubernetes, sans toucher au cluster",
  description:
    "CLI open source qui détecte tes instances PostgreSQL dans Kubernetes, déploie des CronJobs pg_dump → S3 et orchestre les restaurations. Aucun sidecar, aucun opérateur, aucune modification de pod.",
  keywords: [
    "postgresql",
    "kubernetes",
    "backup",
    "pg_dump",
    "s3",
    "minio",
    "cronjob",
    "cli",
    "open source",
  ],
  authors: [{ name: "theo-mrn" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE,
    siteName: "pgpilot",
    title: "pgpilot — backups PostgreSQL sur Kubernetes",
    description:
      "Detect, deploy, backup, restore, status. Cinq commandes, un binaire statique, zéro opérateur dans ton cluster.",
  },
  twitter: {
    card: "summary_large_image",
    title: "pgpilot — backups PostgreSQL sur Kubernetes",
    description:
      "Cinq commandes, un binaire statique, zéro opérateur dans ton cluster.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#d9432f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="grain bg-paper text-ink min-h-dvh">
        <a
          href="#contenu"
          className="bg-ink text-paper focus:ring-vermillon sr-only px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
