import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGitHubPagesBuild
    ? {
        basePath: "/portfolio",
        assetPrefix: "/portfolio/",
      }
    : {}),
};

export default nextConfig;
