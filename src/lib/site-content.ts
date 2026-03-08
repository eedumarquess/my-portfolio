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
  title: string;
  headline: string;
  description: string;
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

type DetailCopy = {
  notFoundTitle: string;
  backLabel: string;
  readingTimeSuffix: string;
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
  blog: ListingCopy;
  blogPost: DetailCopy;
  projects: ListingCopy;
  projectDetail: Omit<DetailCopy, "readingTimeSuffix">;
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
        "Backend engineer focado em automação, workflows e IA aplicada a problemas reais.",
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
      badge: "Backend engineer | automação, integrações e IA aplicada",
      title: "Edu.",
      headline: "Transformo operação manual em sistemas confiáveis, auditáveis e escaláveis.",
      description:
        "Projeto backends, filas e pipelines que ligam dados, OCR, LLMs e sistemas legados sem perder previsibilidade. O foco é resultado de engenharia: menos gargalo operacional, mais throughput e menos retrabalho.",
      asideTitle: "Onde costumo gerar valor",
      asideBody:
        "Arquitetura de serviços, automações orientadas a filas, integrações entre APIs e processos de documentos com fallback humano quando a IA precisa de guarda-corpo.",
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
      metricsTitle: "Métricas que importam para operação, produto e contratação.",
      metricsDescription:
        "Os números abaixo resumem o tipo de resultado que eu persigo em projetos de backend, automação e processamento de documentos.",
      metrics: [
        {
          value: "até 70%",
          label: "menos tempo manual em fluxos de documentos",
          description:
            "Pipelines com OCR, validação e roteamento reduzem espera, triagem e reprocesso operacional.",
        },
        {
          value: "milhares/dia",
          label: "eventos e documentos processados com segurança",
          description:
            "Fila, idempotência e observabilidade mantêm volume alto sem perder rastreabilidade.",
        },
        {
          value: "6+ integrações",
          label: "sistemas conectados em fluxos únicos",
          description:
            "ERP, CRM, APIs internas e serviços de IA operam em contratos mais previsíveis.",
        },
      ],
      stackEyebrow: "Stack de trabalho",
      stackTitle: "Tecnologias que aparecem cedo no projeto, não no rodapé.",
      stackDescription:
        "Agrupei a stack por contexto para mostrar rapidamente em que tipo de sistema eu atuo com mais frequência.",
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
          items: ["OpenAI", "Claude", "Gemini", "Ollama"],
        },
        {
          title: "Infra",
          items: ["Docker", "Kubernetes"],
        },
      ],
      focus: {
        eyebrow: "Foco agora",
        title: "O que estou aprofundando neste momento",
        description:
          "Essa seção existe para mostrar o recorte mais atual do meu trabalho, não uma lista genérica de buzzwords.",
        bullets: [
          "Pipelines de documentos com OCR, classificação, validação e handoff para revisão humana.",
          "Arquiteturas com retry, DLQ, idempotência e telemetria para filas que não podem falhar em silêncio.",
          "Uso de LLMs em processos reais com guardrails, logs de decisão e fallback quando a confiança cai.",
        ],
      },
      ctas: [
        {
          eyebrow: "Blog",
          title: "Artigos com decisões reais de engenharia",
          description:
            "Escrevo sobre automação, backend, filas, IA aplicada e trade-offs que aparecem quando o sistema sai do slide e entra em operação.",
          href: "/blog",
          buttonLabel: "Explorar artigos e notas",
        },
        {
          eyebrow: "Projetos",
          title: "Casos com contexto técnico e resultado",
          description:
            "A página de projetos concentra sistemas, integrações e automações construídas com foco em processo, confiabilidade e impacto operacional.",
          href: "/projetos",
          buttonLabel: "Abrir projetos publicados",
        },
      ],
      footerNote: "Construído para leitura rápida no desktop e no mobile.",
    },
    blog: {
      title: "Artigos e notas",
      description: "Textos técnicos e registros de construção sobre automação, filas e sistemas.",
      emptyState: "Nenhum post ainda.",
    },
    blogPost: {
      notFoundTitle: "Post não encontrado",
      backLabel: "← Voltar ao blog",
      readingTimeSuffix: "min de leitura",
    },
    projects: {
      title: "Projetos",
      description: "Sistemas, automações e integrações com contexto de arquitetura, processo e resultado.",
      emptyState: "Nenhum projeto cadastrado.",
    },
    projectDetail: {
      notFoundTitle: "Projeto não encontrado",
      backLabel: "← Voltar aos projetos",
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
        "Backend engineer focused on automation, workflows, and AI applied to real problems.",
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
      badge: "Backend engineer | automation, integrations, and applied AI",
      title: "Edu.",
      headline: "I turn manual operations into reliable, auditable, scalable systems.",
      description:
        "I design backends, queues, and pipelines that connect data, OCR, LLMs, and legacy systems without sacrificing predictability. The goal is engineering output: less operational friction, more throughput, less rework.",
      asideTitle: "Where I usually create leverage",
      asideBody:
        "Service architecture, queue-driven automations, API integrations, and document workflows with human fallback when AI needs a controlled boundary.",
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
      metricsTitle: "Metrics that matter to operations, product, and hiring.",
      metricsDescription:
        "These numbers summarize the kind of outcome I aim for in backend, automation, and document-processing work.",
      metrics: [
        {
          value: "up to 70%",
          label: "less manual time in document-heavy flows",
          description:
            "OCR, validation, and routing pipelines reduce waiting time, triage, and operational rework.",
        },
        {
          value: "thousands/day",
          label: "events and documents processed safely",
          description:
            "Queues, idempotency, and observability keep volume high without losing traceability.",
        },
        {
          value: "6+ integrations",
          label: "systems connected inside one flow",
          description:
            "ERP, CRM, internal APIs, and AI services run through more predictable contracts.",
        },
      ],
      stackEyebrow: "Working stack",
      stackTitle: "Technologies that show up early in delivery, not only in the footer.",
      stackDescription:
        "The stack is grouped by context so the first screen quickly communicates the kinds of systems I work on.",
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
          items: ["OpenAI", "Claude", "Gemini", "Ollama"],
        },
        {
          title: "Infra",
          items: ["Docker", "Kubernetes"],
        },
      ],
      focus: {
        eyebrow: "Current focus",
        title: "What I am pushing deeper right now",
        description:
          "This section exists to show the current slice of my work, not a generic list of buzzwords.",
        bullets: [
          "Document pipelines with OCR, classification, validation, and handoff to human review.",
          "Architectures with retry, DLQ, idempotency, and telemetry for queues that cannot fail silently.",
          "LLMs inside real workflows with guardrails, decision logs, and fallback when confidence drops.",
        ],
      },
      ctas: [
        {
          eyebrow: "Blog",
          title: "Engineering notes grounded in real trade-offs",
          description:
            "I write about automation, backend systems, queues, applied AI, and the trade-offs that appear once software meets production.",
          href: "/en/blog",
          buttonLabel: "Explore articles and notes",
        },
        {
          eyebrow: "Projects",
          title: "Cases with technical depth and outcome",
          description:
            "The projects page brings together systems, integrations, and automations built with process, reliability, and operational impact in mind.",
          href: "/en/projects",
          buttonLabel: "Open published projects",
        },
      ],
      footerNote: "Built for clean scanning on desktop and mobile.",
    },
    blog: {
      title: "Articles and notes",
      description: "Technical writing and build logs about automation, queues, and systems.",
      emptyState: "No posts yet.",
    },
    blogPost: {
      notFoundTitle: "Post not found",
      backLabel: "← Back to blog",
      readingTimeSuffix: "min read",
    },
    projects: {
      title: "Projects",
      description: "Systems, automations, and integrations with architecture, process, and outcome context.",
      emptyState: "No projects published yet.",
    },
    projectDetail: {
      notFoundTitle: "Project not found",
      backLabel: "← Back to projects",
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
