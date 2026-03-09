import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Locale } from "@/lib/site-content";

const POSTS_DIR = path.join(process.cwd(), "novos-posts");

export type PostType = "article" | "note";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  type: PostType;
  tags: string[];
  summary: string;
}

export interface Post extends PostMeta {
  content: string;
  readingTimeMinutes: number;
}

type PostFileEntry = {
  slug: string;
  fullPath: string;
};

function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingTimeMinutes(content: string): number {
  const words = getWordCount(content);
  return Math.max(1, Math.ceil(words / 200));
}

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

function getFallbackSlug(fileName: string): string {
  return fileName.replace(/\.md$/, "").replace(/^\d+-/, "");
}

function getPostsDirectory(locale: Locale): string {
  return path.join(POSTS_DIR, locale);
}

function getPostFileEntries(locale: Locale): PostFileEntry[] {
  const postsDirectory = getPostsDirectory(locale);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, "utf-8"));
      const frontmatter = data as Record<string, unknown>;
      const slug = getString(frontmatter, "slug") || getFallbackSlug(fileName);

      return {
        slug,
        fullPath,
      };
    });
}

export function getPostSlugs(locale: Locale): string[] {
  return getPostFileEntries(locale).map((entry) => entry.slug);
}

export function getPostBySlug(slug: string, locale: Locale): Post | null {
  const entry = getPostFileEntries(locale).find((item) => item.slug === slug);
  if (!entry) return null;

  const raw = fs.readFileSync(entry.fullPath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as Record<string, unknown>;
  const readingTime = readingTimeMinutes(content);
  const typeValue = getString(frontmatter, "type");

  return {
    slug: entry.slug,
    title: getString(frontmatter, "title") || entry.slug,
    date: getString(frontmatter, "date"),
    type: typeValue === "note" ? "note" : "article",
    tags: getStringArray(frontmatter, "tags"),
    summary: getString(frontmatter, "summary"),
    content,
    readingTimeMinutes: readingTime,
  };
}

export function getAllPosts(locale: Locale): PostMeta[] {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map((slug) => {
      const p = getPostBySlug(slug, locale);
      if (!p) return null;
      return {
        slug: p.slug,
        title: p.title,
        date: p.date,
        type: p.type,
        tags: p.tags,
        summary: p.summary,
      };
    })
    .filter((p): p is PostMeta => p !== null);
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  return posts;
}
