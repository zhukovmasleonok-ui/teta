import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const config: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./next-image-loader.ts",
  },
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
};

export default config;
