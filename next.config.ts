import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ancre explicitement la racine du workspace pour que le file-watcher
  // ne remonte jamais au-dessus de ce dossier.
  turbopack: { root: __dirname },
};

export default nextConfig;
