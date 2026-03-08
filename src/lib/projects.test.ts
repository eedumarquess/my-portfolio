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
    slugs.forEach((slug) => {
      expect(typeof slug).toBe("string");
      expect(slug.endsWith(".md")).toBe(false);
    });
  });

  it("includes existing project slug", () => {
    const slugs = getProjectSlugs();
    expect(slugs).toContain("exemplo");
  });
});

describe("getProjectBySlug", () => {
  it("returns project object for existing slug with extended metadata", () => {
    const project = getProjectBySlug("exemplo");

    expect(project).not.toBeNull();
    expect(project?.slug).toBe("exemplo");
    expect(project?.title).toBe("Pipeline de documentos com revisão humana");
    expect(project?.summary).toContain("Automação de documentos");
    expect(project?.coverImage).toBe("");
    expect(project?.projectType).toBe("Automação backend");
    expect(project?.outcome).toContain("rastreabilidade");
    expect(project?.role).toContain("Arquitetura");
    expect(project?.stack).toContain("NestJS");
    expect(project?.context).toContain("múltiplos canais");
    expect(project?.challenge).toContain("Ganhar velocidade");
    expect(project?.links[0]?.kind).toBe("article");
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
    projects.forEach((project) => {
      expect(project).toHaveProperty("slug");
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("summary");
      expect(project).toHaveProperty("coverImage");
      expect(project).toHaveProperty("projectType");
      expect(project).toHaveProperty("outcome");
      expect(project).toHaveProperty("role");
      expect(project).toHaveProperty("stack");
      expect(project).toHaveProperty("context");
      expect(project).toHaveProperty("challenge");
      expect(project).toHaveProperty("links");
      expect(project).not.toHaveProperty("content");
    });
  });
});
