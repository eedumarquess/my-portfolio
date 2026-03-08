import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "my-portfolio";
const isUserOrOrgPagesRepo = repositoryName.endsWith(".github.io");
const githubPagesBasePath = isUserOrOrgPagesRepo ? "" : `/${repositoryName}`;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGitHubPagesBuild
    ? {
        basePath: githubPagesBasePath,
        assetPrefix: githubPagesBasePath || undefined,
      }
    : {}),
};

export default nextConfig;
