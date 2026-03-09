import { describe, expect, it } from "vitest";
import {
  formatDateForLocale,
  getHomeLinks,
  getLocaleFromPathname,
  getLocalizedPath,
  getReadingTimeLabel,
  getSectionPath,
  isCurrentPath,
  siteCopy,
} from "@/lib/site-content";

describe("site-content locale routing", () => {
  it("detects locale from pathname", () => {
    expect(getLocaleFromPathname("/")).toBe("pt");
    expect(getLocaleFromPathname("/blog")).toBe("pt");
    expect(getLocaleFromPathname("/en")).toBe("en");
    expect(getLocaleFromPathname("/en/projects/ai-content-engine")).toBe("en");
  });

  it("translates project paths between locales", () => {
    expect(getLocalizedPath("/projetos", "en")).toBe("/en/projects");
    expect(getLocalizedPath("/projetos/ai-content-engine", "en")).toBe(
      "/en/projects/ai-content-engine",
    );
    expect(getLocalizedPath("/en/projects", "pt")).toBe("/projetos");
    expect(getLocalizedPath("/en/projects/ai-content-engine", "pt")).toBe(
      "/projetos/ai-content-engine",
    );
  });

  it("preserves home and blog paths when switching languages", () => {
    expect(getLocalizedPath("/", "en")).toBe("/en");
    expect(getLocalizedPath("/en", "pt")).toBe("/");
    expect(getLocalizedPath("/blog/arquitetura-ai-content-engine", "en")).toBe(
      "/en/blog/arquitetura-ai-content-engine",
    );
    expect(
      getLocalizedPath("/en/blog/arquitetura-ai-content-engine", "pt"),
    ).toBe("/blog/arquitetura-ai-content-engine");
  });

  it("returns localized section roots", () => {
    expect(getSectionPath("home", "pt")).toBe("/");
    expect(getSectionPath("blog", "en")).toBe("/en/blog");
    expect(getSectionPath("projects", "pt")).toBe("/projetos");
  });

  it("marks navigation items as active for nested pages", () => {
    expect(isCurrentPath("/en/projects/ai-content-engine", "/en/projects")).toBe(
      true,
    );
    expect(isCurrentPath("/blog", "/")).toBe(false);
    expect(isCurrentPath("/", "/")).toBe(true);
  });
});

describe("site-content formatting", () => {
  it("returns correct home links for each locale", () => {
    expect(getHomeLinks("pt")).toEqual([
      {
        key: "github",
        label: "GitHub",
        href: "https://github.com/eedumarquess",
        external: true,
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/eduardo-marquess/",
        external: true,
      },
      {
        key: "email",
        label: "Email",
        href: "mailto:eedumarquess@gmail.com",
        external: true,
      },
      expect.objectContaining({
        key: "resume",
        href: "/curriculo-eduardo-marques-pt-br.pdf",
        external: false,
      }),
    ]);

    expect(getHomeLinks("en")[3]).toEqual({
      key: "resume",
      label: "Resume",
      href: "/resume-eduardo-marques-en.pdf",
      external: false,
    });
  });

  it("formats dates and reading time using the chosen locale", () => {
    expect(formatDateForLocale("pt", "2026-03-09")).toContain("2026");
    expect(formatDateForLocale("en", "2026-03-09")).toContain("2026");
    expect(formatDateForLocale("pt", "")).toBe("");
    expect(getReadingTimeLabel("pt", 4)).toBe("4 min de leitura");
    expect(getReadingTimeLabel("en", 4)).toBe("4 min read");
  });

  it("keeps translated CTA copy and metadata labels available", () => {
    expect(siteCopy.pt.home.primaryCta.label).toContain("backend");
    expect(siteCopy.en.home.secondaryCta.label).toContain("systems");
    expect(siteCopy.pt.blog.metaSeparator).toHaveLength(1);
    expect(siteCopy.pt.projectDetail.sections.role).toContain("Atua");
    expect(siteCopy.pt.home.stackGroups[4]?.items).toContain("RAG");
    expect(siteCopy.pt.home.stackGroups[4]?.items).toContain("Agentes");
    expect(siteCopy.pt.home.stackGroups[4]?.items).toContain("Codex");
    expect(siteCopy.en.home.stackGroups[4]?.items).toContain("RAG");
    expect(siteCopy.en.home.stackGroups[4]?.items).toContain("Agents");
    expect(siteCopy.en.home.stackGroups[4]?.items).toContain("Cursor");
    expect(siteCopy.pt.home.stackGroups[4]?.items).not.toContain("OpenAI");
    expect(siteCopy.en.home.stackGroups[4]?.items).not.toContain("Gemini");
  });
});
