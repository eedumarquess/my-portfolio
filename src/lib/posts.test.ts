import { describe, expect, it } from "vitest";
import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  type PostMeta,
} from "@/lib/posts";

describe("getPostSlugs", () => {
  it("returns portuguese slugs without .md extension", () => {
    const slugs = getPostSlugs("pt");
    expect(Array.isArray(slugs)).toBe(true);
    slugs.forEach((slug) => {
      expect(typeof slug).toBe("string");
      expect(slug.endsWith(".md")).toBe(false);
    });
  });

  it("includes the same translated slug in english", () => {
    const slugs = getPostSlugs("en");
    expect(slugs).toContain("arquitetura-ai-content-engine");
  });
});

describe("getPostBySlug", () => {
  it("returns the portuguese version for an existing slug", () => {
    const post = getPostBySlug("arquitetura-ai-content-engine", "pt");

    expect(post).not.toBeNull();
    expect(post?.slug).toBe("arquitetura-ai-content-engine");
    expect(post?.title).toBe("Engine de conteúdo com orquestração assíncrona e RAG local");
    expect(post?.date).toBe("2026-03-09");
    expect(post?.type).toBe("article");
    expect(post?.tags).toEqual(["ia aplicada", "rag", "arquitetura"]);
    expect(post?.summary).toContain("RAG local");
    expect(typeof post?.content).toBe("string");
    expect(post?.content.length).toBeGreaterThan(0);
    expect(post?.readingTimeMinutes).toBeGreaterThanOrEqual(1);
  });

  it("returns the english version for an existing slug", () => {
    const post = getPostBySlug("arquitetura-ai-content-engine", "en");

    expect(post).not.toBeNull();
    expect(post?.title).toBe("Content engine with asynchronous orchestration and local RAG");
    expect(post?.tags).toEqual(["applied ai", "rag", "architecture"]);
    expect(post?.summary).toContain("NestJS orchestrator");
    expect(post?.content).toContain("Applied AI starts getting serious");
  });

  it("returns null for non-existent slug", () => {
    expect(getPostBySlug("slug-inexistente-xyz", "pt")).toBeNull();
  });
});

describe("getAllPosts", () => {
  it("returns array of PostMeta without content or readingTimeMinutes", () => {
    const posts = getAllPosts("pt");
    expect(Array.isArray(posts)).toBe(true);
    posts.forEach((post) => {
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("type");
      expect(post).toHaveProperty("tags");
      expect(post).toHaveProperty("summary");
      expect(post).not.toHaveProperty("content");
      expect(post).not.toHaveProperty("readingTimeMinutes");
    });
  });

  it("returns english posts sorted by date descending", () => {
    const posts = getAllPosts("en");
    expect(posts[0]?.slug).toBe("arquitetura-ai-content-engine");
    expect(posts[0]?.title).toBe("Content engine with asynchronous orchestration and local RAG");

    for (let i = 1; i < posts.length; i++) {
      const prev = posts[i - 1] as PostMeta;
      const curr = posts[i] as PostMeta;
      expect(prev.date >= curr.date).toBe(true);
    }
  });
});
