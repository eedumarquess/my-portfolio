import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomePageView } from "@/components/HomePageView";

describe("HomePageView", () => {
  it("renders the portuguese home with updated CTAs and real links", () => {
    const html = renderToStaticMarkup(
      createElement(HomePageView, { locale: "pt" }),
    );

    expect(html).toContain(
      "Ler artigos sobre automação, backend e IA aplicada",
    );
    expect(html).toContain(
      "Ver casos, sistemas e automações construídas",
    );
    expect(html).toContain("href=\"https://github.com/eedumarquess\"");
    expect(html).toContain(
      "href=\"https://www.linkedin.com/in/eduardo-marquess/\"",
    );
    expect(html).toContain("href=\"mailto:eedumarquess@gmail.com\"");
    expect(html).toContain("href=\"/curriculo-eduardo-marques-pt-br.pdf\"");
    expect(html).toContain("aria-label=\"GitHub\"");
    expect(html).toContain("aria-label=\"LinkedIn\"");
    expect(html).toContain("aria-label=\"Email\"");
    expect(html).toContain("target=\"_blank\"");
    expect(html).toContain("rel=\"noopener noreferrer\"");
    expect(html).toContain("Tecnologias que aparecem cedo no projeto");
    expect(html).toContain("Foco agora");
  });

  it("renders the english home with localized resume and project route", () => {
    const html = renderToStaticMarkup(
      createElement(HomePageView, { locale: "en" }),
    );

    expect(html).toContain(
      "Read articles on automation, backend, and applied AI",
    );
    expect(html).toContain("See systems, cases, and automations I built");
    expect(html).toContain("href=\"/resume-eduardo-marques-en.pdf\"");
    expect(html).toContain("href=\"/en/projects\"");
    expect(html).toContain("What I am pushing deeper right now");
  });
});
