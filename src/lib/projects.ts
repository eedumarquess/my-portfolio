import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
}

export interface Project extends ProjectMeta {
  content: string;
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
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    coverImage: data.coverImage ?? "",
    content,
  };
}

export function getAllProjects(): ProjectMeta[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => {
      const p = getProjectBySlug(slug);
      if (!p) return null;
      const { content: _, ...meta } = p;
      return meta;
    })
    .filter((p): p is ProjectMeta => p !== null);
  return projects;
}
