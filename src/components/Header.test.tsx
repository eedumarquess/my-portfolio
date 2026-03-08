import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

import { Header } from "@/components/Header";

describe("Header", () => {
  beforeEach(() => {
    mockPathname = "/";
  });

  it("keeps the localized detail path when switching from portuguese to english", () => {
    mockPathname = "/projetos/exemplo";

    const html = renderToStaticMarkup(createElement(Header));

    expect(html).toContain("href=\"/en/projects/exemplo\"");
    expect(html).toContain("href=\"/projetos\"");
    expect(html).toContain("Projetos");
    expect(html).toContain("PT");
    expect(html).toContain("EN");
  });

  it("keeps the localized detail path when switching from english to portuguese", () => {
    mockPathname = "/en/blog/retry-e-idempotencia-em-filas";

    const html = renderToStaticMarkup(createElement(Header));

    expect(html).toContain("href=\"/blog/retry-e-idempotencia-em-filas\"");
    expect(html).toContain("href=\"/en/blog\"");
    expect(html).toContain("Language");
    expect(html).toContain("Home");
    expect(html).toContain("Projects");
  });
});
