import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "pgpilot",
    short_name: "pgpilot",
    description:
      "Backups PostgreSQL sur Kubernetes, sans toucher au cluster.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfbf8",
    theme_color: "#d9432f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
