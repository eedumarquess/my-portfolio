import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

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

function getString(data: Record<string, unknown>, key: string): string {
  const value = data[key];
  return typeof value === "string" ? value : "";
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

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(PROJECTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as Record<string, unknown>;

  return {
    slug,
    title: getString(frontmatter, "title") || slug,
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

export function getAllProjects(): ProjectMeta[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => {
      const project = getProjectBySlug(slug);
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
