import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

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

function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingTimeMinutes(content: string): number {
  const words = getWordCount(content);
  return Math.max(1, Math.ceil(words / 200));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const readingTime = readingTimeMinutes(content);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    type: (data.type ?? "article") as PostType,
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary: data.summary ?? "",
    content,
    readingTimeMinutes: readingTime,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const p = getPostBySlug(slug);
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
  posts.sort((a, b) => (b.date > a.date ? 1 : -1));
  return posts;
}
