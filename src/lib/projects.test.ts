import { describe, expect, it } from "vitest";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";

describe("getProjectSlugs", () => {
  it("returns portuguese slugs without .md extension", () => {
    const slugs = getProjectSlugs("pt");
    expect(Array.isArray(slugs)).toBe(true);
    slugs.forEach((slug) => {
      expect(typeof slug).toBe("string");
      expect(slug.endsWith(".md")).toBe(false);
    });
  });

  it("includes the same translated project slug in english", () => {
    const slugs = getProjectSlugs("en");
    expect(slugs).toContain("ai-content-engine");
  });
});

describe("getProjectBySlug", () => {
  it("returns the portuguese project with extended metadata", () => {
    const project = getProjectBySlug("ai-content-engine", "pt");

    expect(project).not.toBeNull();
    expect(project?.slug).toBe("ai-content-engine");
    expect(project?.title).toBe(
      "AI Content Engine com orquestração assíncrona, RAG local e rastreabilidade por etapa",
    );
    expect(project?.summary).toContain("telemetria por execução");
    expect(project?.coverImage).toBe("");
    expect(project?.projectType).toBe("Plataforma de IA aplicada");
    expect(project?.outcome).toContain("base executável e auditável");
    expect(project?.role).toContain("Arquitetura do sistema");
    expect(project?.stack).toContain("NestJS");
    expect(project?.stack).toContain("RAG");
    expect(project?.stack).toContain("Agentes");
    expect(project?.context).toContain("prompts isolados");
    expect(project?.challenge).toContain("workers especializados");
    expect(project?.links[0]?.kind).toBe("repository");
    expect(typeof project?.content).toBe("string");
    expect(project?.content.length).toBeGreaterThan(0);
  });

  it("returns the english project for the same slug", () => {
    const project = getProjectBySlug("ai-content-engine", "en");

    expect(project).not.toBeNull();
    expect(project?.title).toBe(
      "AI Content Engine with asynchronous orchestration, local RAG, and stage-level traceability",
    );
    expect(project?.summary).toContain("execution-level telemetry");
    expect(project?.projectType).toBe("Applied AI platform");
    expect(project?.role).toContain("System architecture");
    expect(project?.stack).toContain("Agents");
    expect(project?.context).toContain("isolated prompts");
    expect(project?.challenge).toContain("specialized workers");
    expect(project?.links[0]?.label).toBe("Project repository");
    expect(project?.content).toContain("organizes AI-assisted generation as a software system");
  });

  it("returns null for non-existent slug", () => {
    expect(getProjectBySlug("projeto-inexistente-xyz", "pt")).toBeNull();
  });
});

describe("getAllProjects", () => {
  it("returns array of ProjectMeta without content", () => {
    const projects = getAllProjects("pt");
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

  it("returns english project cards for the english locale", () => {
    const projects = getAllProjects("en");
    expect(projects[0]?.slug).toBe("ai-content-engine");
    expect(projects[0]?.projectType).toBe("Applied AI platform");
    expect(projects[0]?.summary).toContain("execution-level telemetry");
  });
});
