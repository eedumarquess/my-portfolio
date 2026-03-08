export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export type SectionKey = "home" | "blog" | "projects";

type NavLink = {
  href: string;
  label: string;
};

type HomeMetric = {
  value: string;
  label: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

type StackGroup = {
  title: string;
  items: string[];
};

type CtaBlock = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

type FocusContent = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

type HomeContent = {
  badge: string;
  brand: string;
  intro: string;
  title: string;
  description: string;
  heroImageAlt: string;
  asideTitle: string;
  asideBody: string;
  linksLabel: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metricsEyebrow: string;
  metricsTitle: string;
  metricsDescription: string;
  metrics: HomeMetric[];
  stackEyebrow: string;
  stackTitle: string;
  stackDescription: string;
  stackGroups: StackGroup[];
  focus: FocusContent;
  ctas: CtaBlock[];
  footerNote: string;
};

type ListingCopy = {
  title: string;
  description: string;
  emptyState: string;
};

type BlogListingCopy = ListingCopy & {
  metaSeparator: string;
  articleLabel: string;
  noteLabel: string;
};

type DetailCopy = {
  notFoundTitle: string;
  backLabel: string;
  readingTimeSuffix: string;
};

type ProjectsListingCopy = ListingCopy & {
  cardLabels: {
    stack: string;
    outcome: string;
    type: string;
    noImage: string;
    openProject: string;
  };
};

type ProjectDetailCopy = Omit<DetailCopy, "readingTimeSuffix"> & {
  summaryLabel: string;
  sections: {
    context: string;
    challenge: string;
    role: string;
    stack: string;
    outcome: string;
    links: string;
  };
  linkLabels: {
    demo: string;
    repository: string;
    article: string;
    external: string;
  };
};

type LocaleCopy = {
  metadata: {
    title: string;
    description: string;
  };
  navigation: {
    brand: string;
    brandAriaLabel: string;
    links: NavLink[];
    languageLabel: string;
    languageOptions: {
      locale: Locale;
      label: string;
      shortLabel: string;
    }[];
  };
  home: HomeContent;
  blog: BlogListingCopy;
  blogPost: DetailCopy;
  projects: ProjectsListingCopy;
  projectDetail: ProjectDetailCopy;
  homeLinks: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
};

export const siteCopy: Record<Locale, LocaleCopy> = {
  pt: {
    metadata: {
      title: "Portfolio — Backend engineer",
      description:
        "Backend engineer focado em automação, integrações, filas e IA aplicada a fluxos operacionais.",
    },
    navigation: {
      brand: "Edu.",
      brandAriaLabel: "Voltar para a página inicial",
      links: [
        { href: "/", label: "Início" },
        { href: "/blog", label: "Blog" },
        { href: "/projetos", label: "Projetos" },
      ],
      languageLabel: "Idioma",
      languageOptions: [
        { locale: "pt", label: "Português (BR)", shortLabel: "PT" },
        { locale: "en", label: "English", shortLabel: "EN" },
      ],
    },
    home: {
      badge: "Backend engineer | automação, filas, integrações e IA aplicada",
      brand: "Edu.",
      intro:
        "Backend engineer para fluxos críticos com filas, OCR, integrações e fallback quando o processo não pode falhar em silêncio.",
      title:
        "Construo backends e pipelines que tiram operação manual do caminho.",
      description:
        "Projeto serviços em NestJS, TypeScript e Python para document processing, integrações entre APIs e filas com retry, idempotência e observabilidade. O objetivo é simples: menos triagem manual, mais throughput e uma trilha auditável quando OCR ou LLMs precisam de revisão humana.",
      heroImageAlt: "Retrato de Eduardo Marques.",
      asideTitle: "Onde entrego melhor",
      asideBody:
        "Arquitetura backend para automações orientadas a filas, integrações com ERP e CRM, e pipelines de documentos com validação, DLQ e revisão humana quando a confiança do modelo cai.",
      linksLabel: "Acessos rápidos",
      primaryCta: {
        label: "Ler artigos sobre automação, backend e IA aplicada",
        href: "/blog",
      },
      secondaryCta: {
        label: "Ver casos, sistemas e automações construídas",
        href: "/projetos",
      },
      metricsEyebrow: "Impacto esperado",
      metricsTitle:
        "Sinais de impacto que importam em backend e automação.",
      metricsDescription:
        "Esses números resumem o tipo de problema que eu costumo atacar: reduzir trabalho manual, manter rastreabilidade e escalar fluxos assíncronos sem perder controle.",
      metrics: [
        {
          value: "até 70%",
          label: "menos tempo manual em fluxos de documentos",
          description:
            "Pipelines com OCR, validação e roteamento reduzem espera, triagem e reprocesso operacional.",
          href: "/blog/trade-off-ferramenta-processamento-documentos",
          hrefLabel: "Ver nota sobre documentos",
        },
        {
          value: "milhares/dia",
          label: "eventos e documentos processados com segurança",
          description:
            "Fila, idempotência e observabilidade mantêm volume alto sem perder rastreabilidade.",
          href: "/blog/retry-e-idempotencia-em-filas",
          hrefLabel: "Ler sobre retry e idempotência",
        },
        {
          value: "6+ integrações",
          label: "sistemas conectados em fluxos únicos",
          description:
            "ERP, CRM, APIs internas e serviços de IA operam em contratos mais previsíveis.",
          href: "/projetos",
          hrefLabel: "Explorar projetos",
        },
      ],
      stackEyebrow: "Stack de trabalho",
      stackTitle:
        "Stack que entra na arquitetura, não só na bio.",
      stackDescription:
        "Agrupei as ferramentas pelo tipo de sistema em que elas aparecem: backend transacional, mensageria, OCR, integrações e IA aplicada a processo.",
      stackGroups: [
        {
          title: "Backend",
          items: ["NestJS", "TypeScript", "Node.js", "Python", "FastAPI"],
        },
        {
          title: "Mensageria",
          items: ["RabbitMQ", "BullMQ", "Redis"],
        },
        {
          title: "Dados",
          items: ["PostgreSQL", "MySQL", "MongoDB"],
        },
        {
          title: "Automação",
          items: ["Selenium", "OCR", "Tesseract", "Google Vision"],
        },
        {
          title: "IA aplicada",
          items: ["Claude", "Codex", "Cursor", "Ollama"],
        },
        {
          title: "Infra",
          items: ["Docker", "Kubernetes"],
        },
      ],
      focus: {
        eyebrow: "Foco agora",
        title: "O tipo de problema em que estou mais fundo agora",
        description:
          "É o recorte atual do meu trabalho: sistemas com documento, fila, telemetria e guardrails suficientes para rodar em produção.",
        bullets: [
          "Pipelines de documentos com OCR, classificação, validação e handoff para revisão humana quando a extração não fecha.",
          "Arquiteturas com retry, DLQ, idempotência e telemetria para filas que sustentam integrações e processamento assíncrono.",
          "Uso de LLMs em fluxos reais com prompts restritos, logs de decisão e fallback explícito quando a confiança cai.",
        ],
      },
      ctas: [
        {
          eyebrow: "Blog",
          title: "Notas de engenharia para backend, filas e automação",
          description:
            "Escrevo sobre automação, document processing, mensageria, IA aplicada e os trade-offs que aparecem quando o sistema entra em operação.",
          href: "/blog",
          buttonLabel: "Ler artigos e notas técnicas",
        },
        {
          eyebrow: "Projetos",
          title: "Casos com contexto operacional, stack e resultado",
          description:
            "A página de projetos reúne sistemas, integrações e automações com contexto de arquitetura, salvaguardas operacionais e impacto no processo.",
          href: "/projetos",
          buttonLabel: "Ver projetos publicados",
        },
      ],
      footerNote: "Construído para leitura rápida no desktop e no mobile.",
    },
    blog: {
      title: "Artigos e notas",
      description:
        "Textos técnicos e registros de construção sobre automação, filas e sistemas.",
      emptyState: "Nenhum post ainda.",
      metaSeparator: "•",
      articleLabel: "Artigo",
      noteLabel: "Nota",
    },
    blogPost: {
      notFoundTitle: "Post não encontrado",
      backLabel: "← Voltar ao blog",
      readingTimeSuffix: "min de leitura",
    },
    projects: {
      title: "Projetos",
      description:
        "Sistemas, automações e integrações com contexto de arquitetura, processo e resultado.",
      emptyState: "Nenhum projeto cadastrado.",
      cardLabels: {
        stack: "Stack",
        outcome: "Resultado",
        type: "Tipo",
        noImage: "Sem imagem",
        openProject: "Abrir projeto",
      },
    },
    projectDetail: {
      notFoundTitle: "Projeto não encontrado",
      backLabel: "← Voltar aos projetos",
      summaryLabel: "Resumo do projeto",
      sections: {
        context: "Contexto",
        challenge: "Problema",
        role: "Atuação",
        stack: "Stack",
        outcome: "Resultado",
        links: "Links",
      },
      linkLabels: {
        demo: "Abrir demo",
        repository: "Ver repositório",
        article: "Ler artigo relacionado",
        external: "Abrir link",
      },
    },
    homeLinks: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      resume: "Currículo",
    },
  },
  en: {
    metadata: {
      title: "Portfolio — Backend engineer",
      description:
        "Backend engineer focused on automation, integrations, queues, and AI applied to operational workflows.",
    },
    navigation: {
      brand: "Edu.",
      brandAriaLabel: "Go back to the homepage",
      links: [
        { href: "/en", label: "Home" },
        { href: "/en/blog", label: "Blog" },
        { href: "/en/projects", label: "Projects" },
      ],
      languageLabel: "Language",
      languageOptions: [
        { locale: "pt", label: "Português (BR)", shortLabel: "PT" },
        { locale: "en", label: "English", shortLabel: "EN" },
      ],
    },
    home: {
      badge: "Backend engineer | automation, queues, integrations, and applied AI",
      brand: "Edu.",
      intro:
        "Backend engineer for critical flows with queues, OCR, integrations, and fallback paths when the process cannot fail silently.",
      title:
        "I build backends and pipelines that remove manual work from operations.",
      description:
        "I design NestJS, TypeScript, and Python services for document processing, API integrations, and queue-driven workflows with retry, idempotency, and observability. The goal is straightforward: less manual triage, more throughput, and an audit trail when OCR or LLMs need human review.",
      heroImageAlt: "Portrait of Eduardo Marques.",
      asideTitle: "Where I deliver best",
      asideBody:
        "Backend architecture for queue-driven automation, ERP and CRM integrations, and document pipelines with validation, DLQ, and human review when model confidence drops.",
      linksLabel: "Quick links",
      primaryCta: {
        label: "Read articles on automation, backend, and applied AI",
        href: "/en/blog",
      },
      secondaryCta: {
        label: "See systems, cases, and automations I built",
        href: "/en/projects",
      },
      metricsEyebrow: "Expected impact",
      metricsTitle: "Impact signals that matter in backend and automation.",
      metricsDescription:
        "These numbers summarize the kinds of problems I usually work on: cutting manual work, keeping traceability, and scaling asynchronous flows without losing control.",
      metrics: [
        {
          value: "up to 70%",
          label: "less manual time in document-heavy flows",
          description:
            "OCR, validation, and routing pipelines reduce waiting time, triage, and operational rework.",
          href: "/en/blog/trade-off-ferramenta-processamento-documentos",
          hrefLabel: "Read the note on document pipelines",
        },
        {
          value: "thousands/day",
          label: "events and documents processed safely",
          description:
            "Queues, idempotency, and observability keep volume high without losing traceability.",
          href: "/en/blog/retry-e-idempotencia-em-filas",
          hrefLabel: "Read about retry and idempotency",
        },
        {
          value: "6+ integrations",
          label: "systems connected inside one flow",
          description:
            "ERP, CRM, internal APIs, and AI services run through more predictable contracts.",
          href: "/en/projects",
          hrefLabel: "Explore projects",
        },
      ],
      stackEyebrow: "Working stack",
      stackTitle:
        "Stack that shapes the architecture, not just the bio.",
      stackDescription:
        "The stack is grouped by workload so the first screen quickly shows where I usually operate: transactional backend, messaging, OCR, integrations, and applied AI.",
      stackGroups: [
        {
          title: "Backend",
          items: ["NestJS", "TypeScript", "Node.js", "Python", "FastAPI"],
        },
        {
          title: "Messaging",
          items: ["RabbitMQ", "BullMQ", "Redis"],
        },
        {
          title: "Data",
          items: ["PostgreSQL", "MySQL", "MongoDB"],
        },
        {
          title: "Automation",
          items: ["Selenium", "OCR", "Tesseract", "Google Vision"],
        },
        {
          title: "Applied AI",
          items: ["Claude", "Codex", "Cursor", "Ollama"],
        },
        {
          title: "Infra",
          items: ["Docker", "Kubernetes"],
        },
      ],
      focus: {
        eyebrow: "Current focus",
        title: "The class of problem I am deepest in right now",
        description:
          "This is the current slice of my work: document-heavy systems with queues, telemetry, and enough guardrails to survive production.",
        bullets: [
          "Document pipelines with OCR, classification, validation, and handoff to human review when extraction does not close cleanly.",
          "Architectures with retry, DLQ, idempotency, and telemetry for queues that support integrations and asynchronous processing.",
          "LLMs inside real workflows with constrained prompts, decision logs, and explicit fallback when confidence drops.",
        ],
      },
      ctas: [
        {
          eyebrow: "Blog",
          title: "Notes on backend, queues, and automation trade-offs",
          description:
            "I write about automation, document processing, messaging, applied AI, and the trade-offs that appear once software reaches production.",
          href: "/en/blog",
          buttonLabel: "Read articles and technical notes",
        },
        {
          eyebrow: "Projects",
          title: "Cases with operational context, stack, and outcome",
          description:
            "The projects page brings together systems, integrations, and automations with architecture context, operational safeguards, and process impact.",
          href: "/en/projects",
          buttonLabel: "View published projects",
        },
      ],
      footerNote: "Built for clean scanning on desktop and mobile.",
    },
    blog: {
      title: "Articles and notes",
      description:
        "Technical writing and build logs about automation, queues, and systems.",
      emptyState: "No posts yet.",
      metaSeparator: "•",
      articleLabel: "Article",
      noteLabel: "Note",
    },
    blogPost: {
      notFoundTitle: "Post not found",
      backLabel: "← Back to blog",
      readingTimeSuffix: "min read",
    },
    projects: {
      title: "Projects",
      description:
        "Systems, automations, and integrations with architecture, process, and outcome context.",
      emptyState: "No projects published yet.",
      cardLabels: {
        stack: "Stack",
        outcome: "Outcome",
        type: "Type",
        noImage: "No image",
        openProject: "Open project",
      },
    },
    projectDetail: {
      notFoundTitle: "Project not found",
      backLabel: "← Back to projects",
      summaryLabel: "Project summary",
      sections: {
        context: "Context",
        challenge: "Challenge",
        role: "Role",
        stack: "Stack",
        outcome: "Outcome",
        links: "Links",
      },
      linkLabels: {
        demo: "Open demo",
        repository: "View repository",
        article: "Read related article",
        external: "Open link",
      },
    },
    homeLinks: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      resume: "Resume",
    },
  },
};

const HOME_LINKS = {
  github: "https://github.com/eedumarquess",
  linkedin: "https://www.linkedin.com/in/eduardo-marquess/",
  email: "mailto:eedumarquess@gmail.com",
  resume: {
    pt: "/curriculo-eduardo-marques-pt-br.pdf",
    en: "/resume-eduardo-marques-en.pdf",
  },
} as const;

function normalizePathname(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  const cleanPath = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (cleanPath === "") {
    return "/";
  }

  return cleanPath.endsWith("/") && cleanPath !== "/"
    ? cleanPath.slice(0, -1)
    : cleanPath;
}

function stripLocalePrefix(pathname: string): string {
  const normalized = normalizePathname(pathname);

  if (normalized === "/en") {
    return "/";
  }

  if (normalized.startsWith("/en/")) {
    return normalized.slice(3);
  }

  return normalized;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const normalized = normalizePathname(pathname);
  return normalized === "/en" || normalized.startsWith("/en/") ? "en" : "pt";
}

export function getSectionPath(section: SectionKey, locale: Locale): string {
  if (locale === "en") {
    if (section === "home") return "/en";
    if (section === "blog") return "/en/blog";
    return "/en/projects";
  }

  if (section === "home") return "/";
  if (section === "blog") return "/blog";
  return "/projetos";
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const basePath = stripLocalePrefix(pathname);

  if (locale === "pt") {
    if (basePath === "/projects") return "/projetos";
    if (basePath.startsWith("/projects/")) {
      return basePath.replace("/projects/", "/projetos/");
    }
    return basePath;
  }

  if (basePath === "/") return "/en";
  if (basePath === "/projetos") return "/en/projects";
  if (basePath.startsWith("/projetos/")) {
    return basePath.replace("/projetos/", "/en/projects/");
  }
  return `/en${basePath}`;
}

export function isCurrentPath(pathname: string, href: string): boolean {
  const normalizedPath = normalizePathname(pathname);
  const normalizedHref = normalizePathname(href);

  if (normalizedHref === "/" || normalizedHref === "/en") {
    return normalizedPath === normalizedHref;
  }

  return (
    normalizedPath === normalizedHref ||
    normalizedPath.startsWith(`${normalizedHref}/`)
  );
}

export function formatDateForLocale(locale: Locale, date: string): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getReadingTimeLabel(locale: Locale, minutes: number): string {
  return `${minutes} ${siteCopy[locale].blogPost.readingTimeSuffix}`;
}

export function getHomeLinks(locale: Locale) {
  const labels = siteCopy[locale].homeLinks;

  return [
    {
      key: "github",
      label: labels.github,
      href: HOME_LINKS.github,
      external: true,
    },
    {
      key: "linkedin",
      label: labels.linkedin,
      href: HOME_LINKS.linkedin,
      external: true,
    },
    {
      key: "email",
      label: labels.email,
      href: HOME_LINKS.email,
      external: true,
    },
    {
      key: "resume",
      label: labels.resume,
      href: HOME_LINKS.resume[locale],
      external: false,
    },
  ] as const;
}
