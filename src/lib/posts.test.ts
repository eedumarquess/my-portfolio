import { describe, it, expect } from "vitest";
import {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  type PostMeta,
} from "@/lib/posts";

describe("getPostSlugs", () => {
  it("returns array of slugs without .md extension", () => {
    const slugs = getPostSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    slugs.forEach((s) => {
      expect(typeof s).toBe("string");
      expect(s.endsWith(".md")).toBe(false);
    });
  });

  it("includes existing post slug", () => {
    const slugs = getPostSlugs();
    expect(slugs).toContain("retry-e-idempotencia-em-filas");
  });
});

describe("getPostBySlug", () => {
  it("returns post object for existing slug", () => {
    const post = getPostBySlug("retry-e-idempotencia-em-filas");
    expect(post).not.toBeNull();
    expect(post?.slug).toBe("retry-e-idempotencia-em-filas");
    expect(post?.title).toBe("Padrões de retry e idempotência em filas");
    expect(post?.date).toBe("2025-02-18");
    expect(post?.type).toBe("article");
    expect(post?.tags).toEqual(["filas", "mensageria", "resiliência"]);
    expect(post?.summary).toContain("consumidores de fila");
    expect(typeof post?.content).toBe("string");
    expect(post?.content.length).toBeGreaterThan(0);
    expect(post?.readingTimeMinutes).toBeGreaterThanOrEqual(1);
  });

  it("returns null for non-existent slug", () => {
    expect(getPostBySlug("slug-inexistente-xyz")).toBeNull();
  });
});

describe("getAllPosts", () => {
  it("returns array of PostMeta without content or readingTimeMinutes", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    posts.forEach((p) => {
      expect(p).toHaveProperty("slug");
      expect(p).toHaveProperty("title");
      expect(p).toHaveProperty("date");
      expect(p).toHaveProperty("type");
      expect(p).toHaveProperty("tags");
      expect(p).toHaveProperty("summary");
      expect(p).not.toHaveProperty("content");
      expect(p).not.toHaveProperty("readingTimeMinutes");
    });
  });

  it("returns posts sorted by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      const prev = posts[i - 1] as PostMeta;
      const curr = posts[i] as PostMeta;
      expect(prev.date >= curr.date).toBe(true);
    }
  });
});
