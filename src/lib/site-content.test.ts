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
    expect(getLocaleFromPathname("/en/projects/exemplo")).toBe("en");
  });

  it("translates project paths between locales", () => {
    expect(getLocalizedPath("/projetos", "en")).toBe("/en/projects");
    expect(getLocalizedPath("/projetos/exemplo", "en")).toBe(
      "/en/projects/exemplo",
    );
    expect(getLocalizedPath("/en/projects", "pt")).toBe("/projetos");
    expect(getLocalizedPath("/en/projects/exemplo", "pt")).toBe(
      "/projetos/exemplo",
    );
  });

  it("preserves home and blog paths when switching languages", () => {
    expect(getLocalizedPath("/", "en")).toBe("/en");
    expect(getLocalizedPath("/en", "pt")).toBe("/");
    expect(getLocalizedPath("/blog/retry-e-idempotencia-em-filas", "en")).toBe(
      "/en/blog/retry-e-idempotencia-em-filas",
    );
    expect(
      getLocalizedPath("/en/blog/retry-e-idempotencia-em-filas", "pt"),
    ).toBe("/blog/retry-e-idempotencia-em-filas");
  });

  it("returns localized section roots", () => {
    expect(getSectionPath("home", "pt")).toBe("/");
    expect(getSectionPath("blog", "en")).toBe("/en/blog");
    expect(getSectionPath("projects", "pt")).toBe("/projetos");
  });

  it("marks navigation items as active for nested pages", () => {
    expect(isCurrentPath("/en/projects/exemplo", "/en/projects")).toBe(true);
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
      {
        key: "resume",
        label: "Currículo",
        href: "/curriculo-eduardo-marques-pt-br.pdf",
        external: false,
      },
    ]);

    expect(getHomeLinks("en")[3]).toEqual({
      key: "resume",
      label: "Resume",
      href: "/resume-eduardo-marques-en.pdf",
      external: false,
    });
  });

  it("formats dates and reading time using the chosen locale", () => {
    expect(formatDateForLocale("pt", "2025-02-18")).toContain("2025");
    expect(formatDateForLocale("en", "2025-02-18")).toContain("2025");
    expect(getReadingTimeLabel("pt", 4)).toBe("4 min de leitura");
    expect(getReadingTimeLabel("en", 4)).toBe("4 min read");
  });

  it("keeps translated CTA copy available", () => {
    expect(siteCopy.pt.home.primaryCta.label).toContain("automação");
    expect(siteCopy.en.home.secondaryCta.label).toContain("systems");
  });
});
