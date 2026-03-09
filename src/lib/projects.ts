import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Locale } from "@/lib/site-content";

const PROJECTS_DIR = path.join(process.cwd(), "novos-projetos");

export type ProjectLinkKind = "demo" | "repository" | "article" | "external";

export interface ProjectLink {
  label: string;
  href: string;
  kind: ProjectLinkKind;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  coverAlt: string;
  projectType: string;
  outcome: string;
  role: string;
  stack: string[];
  context: string;
  challenge: string;
  links: ProjectLink[];
}

export interface Project extends ProjectMeta {
  content: string;
}

type ProjectFileEntry = {
  slug: string;
  fullPath: string;
};

function getString(data: Record<string, unknown>, key: string): string {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

function getStringArray(data: Record<string, unknown>, key: string): string[] {
  const value = data[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function getLinks(data: Record<string, unknown>): ProjectLink[] {
  const value = data.links;
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Record<string, unknown>;
      const href = getString(candidate, "href");
      if (!href) {
        return null;
      }

      const kindValue = getString(candidate, "kind");
      const kind: ProjectLinkKind =
        kindValue === "demo" ||
        kindValue === "repository" ||
        kindValue === "article" ||
        kindValue === "external"
          ? kindValue
          : "external";

      return {
        label: getString(candidate, "label"),
        href,
        kind,
      };
    })
    .filter((item): item is ProjectLink => item !== null);
}

function getFallbackSlug(fileName: string): string {
  return fileName
    .replace(/\.md$/, "")
    .replace(/^\d+-/, "")
    .replace(/^project-/, "");
}

function getProjectsDirectory(locale: Locale): string {
  return path.join(PROJECTS_DIR, locale);
}

function getProjectFileEntries(locale: Locale): ProjectFileEntry[] {
  const projectsDirectory = getProjectsDirectory(locale);

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, "utf-8"));
      const frontmatter = data as Record<string, unknown>;
      const slug = getString(frontmatter, "slug") || getFallbackSlug(fileName);

      return {
        slug,
        fullPath,
      };
    });
}

export function getProjectSlugs(locale: Locale): string[] {
  return getProjectFileEntries(locale).map((entry) => entry.slug);
}

export function getProjectBySlug(slug: string, locale: Locale): Project | null {
  const entry = getProjectFileEntries(locale).find((item) => item.slug === slug);
  if (!entry) return null;

  const raw = fs.readFileSync(entry.fullPath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as Record<string, unknown>;

  return {
    slug: entry.slug,
    title: getString(frontmatter, "title") || entry.slug,
    summary: getString(frontmatter, "summary"),
    coverImage: getString(frontmatter, "coverImage"),
    coverAlt: getString(frontmatter, "coverAlt"),
    projectType: getString(frontmatter, "projectType"),
    outcome: getString(frontmatter, "outcome"),
    role: getString(frontmatter, "role"),
    stack: getStringArray(frontmatter, "stack"),
    context: getString(frontmatter, "context"),
    challenge: getString(frontmatter, "challenge"),
    links: getLinks(frontmatter),
    content,
  };
}

export function getAllProjects(locale: Locale): ProjectMeta[] {
  const projects = getProjectFileEntries(locale)
    .map((entry) => {
      const project = getProjectBySlug(entry.slug, locale);
      if (!project) return null;

      return {
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        coverImage: project.coverImage,
        coverAlt: project.coverAlt,
        projectType: project.projectType,
        outcome: project.outcome,
        role: project.role,
        stack: project.stack,
        context: project.context,
        challenge: project.challenge,
        links: project.links,
      };
    })
    .filter((project): project is ProjectMeta => project !== null);

  return projects;
}
