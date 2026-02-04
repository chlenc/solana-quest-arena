import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages serves from /<repo>
  basePath: isProd ? "/solana-quest-arena" : "",
  assetPrefix: isProd ? "/solana-quest-arena/" : "",
};

export default nextConfig;
