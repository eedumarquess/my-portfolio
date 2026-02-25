import { describe, it, expect } from "vitest";
import {
  getProjectSlugs,
  getProjectBySlug,
  getAllProjects,
} from "@/lib/projects";

describe("getProjectSlugs", () => {
  it("returns array of slugs without .md extension", () => {
    const slugs = getProjectSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    slugs.forEach((s) => {
      expect(typeof s).toBe("string");
      expect(s.endsWith(".md")).toBe(false);
    });
  });

  it("includes existing project slug", () => {
    const slugs = getProjectSlugs();
    expect(slugs).toContain("exemplo");
  });
});

describe("getProjectBySlug", () => {
  it("returns project object for existing slug", () => {
    const project = getProjectBySlug("exemplo");
    expect(project).not.toBeNull();
    expect(project?.slug).toBe("exemplo");
    expect(project?.title).toBe("Projeto exemplo");
    expect(project?.summary).toContain("Descrição breve");
    expect(project?.coverImage).toBe("");
    expect(typeof project?.content).toBe("string");
    expect(project?.content.length).toBeGreaterThan(0);
  });

  it("returns null for non-existent slug", () => {
    expect(getProjectBySlug("projeto-inexistente-xyz")).toBeNull();
  });
});

describe("getAllProjects", () => {
  it("returns array of ProjectMeta without content", () => {
    const projects = getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
    projects.forEach((p) => {
      expect(p).toHaveProperty("slug");
      expect(p).toHaveProperty("title");
      expect(p).toHaveProperty("summary");
      expect(p).toHaveProperty("coverImage");
      expect(p).not.toHaveProperty("content");
    });
  });
});
