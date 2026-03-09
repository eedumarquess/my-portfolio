import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FocusNow } from "@/components/FocusNow";
import { HomeLinks } from "@/components/HomeLinks";
import { siteCopy, type Locale } from "@/lib/site-content";

type HomePageViewProps = {
  locale: Locale;
};

const primaryCtaClassName =
  "interactive-chip inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] hover:shadow-[0_20px_55px_-35px_rgba(15,118,110,0.55)] focus-visible:bg-[var(--accent-hover)] focus-visible:shadow-[0_20px_55px_-35px_rgba(15,118,110,0.55)] md:text-base";

const secondaryCtaClassName =
  "interactive-chip inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_18px_50px_-40px_rgba(15,118,110,0.38)] focus-visible:border-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:shadow-[0_18px_50px_-40px_rgba(15,118,110,0.38)] md:text-base";

const macWindowClassName =
  "interactive-elevated overflow-hidden rounded-[1.35rem] border border-black/10 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.32)]";

function MacWindowCard({
  title,
  children,
  bodyClassName,
}: {
  title: string;
  children: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <div className={macWindowClassName}>
      <div className="grid grid-cols-[auto_1fr_auto] items-center bg-[#d8d8d8] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-[#ed6a5f]" aria-hidden="true" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#f4bf4f]" aria-hidden="true" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#61c554]" aria-hidden="true" />
        </div>
        <p className="text-center text-base font-semibold text-black/90">{title}</p>
        <span aria-hidden="true" className="block w-[58px]" />
      </div>
      <div className={`bg-white ${bodyClassName ?? ""}`.trim()}>{children}</div>
    </div>
  );
}

const stackIconUrls: Partial<Record<string, string>> = {
  "NestJS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  "TypeScript":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Python":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "FastAPI":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "RabbitMQ":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
  "Redis":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  "PostgreSQL":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "MySQL":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "MongoDB":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "Selenium":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
  "Docker":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Kubernetes":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
};

function StackGlyph({ item }: { item: string }) {
  const src = stackIconUrls[item];

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
        unoptimized
      />
    );
  }

  if (item === "BullMQ") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M6 7.5h8.5a3.5 3.5 0 1 1 0 7H9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 5.5 15 7.5l-2.5 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 13.5 15 15.5l2.5 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (item === "OCR" || item === "Tesseract") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <rect
          x="4"
          y="6"
          width="16"
          height="12"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M7.5 10h9M7.5 14h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (item === "Google Vision") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="2.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (item === "Claude") {
    return (
      <Image
        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/anthropic.svg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
        unoptimized
      />
    );
  }

  if (item === "Codex") {
    return (
      <Image
        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
        unoptimized
      />
    );
  }

  if (item === "Cursor") {
    return (
      <Image
        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cursor.svg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
        unoptimized
      />
    );
  }

  if (item === "Ollama") {
    return (
      <Image
        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
        unoptimized
      />
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 8v8M8 12h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HomePageView({ locale }: HomePageViewProps) {
  const content = siteCopy[locale].home;

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-8 md:px-8 md:pb-16 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.78fr)] lg:items-start">
          <div className="max-w-3xl">
            <div className="space-y-4">
              <p
                className="font-serif text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)] md:text-5xl"
                style={{ fontFamily: "var(--font-lora), serif" }}
              >
                {content.brand}
              </p>
              <p className="max-w-2xl text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)] md:text-sm">
                {content.intro}
              </p>
              <h1
                className="max-w-[12ch] font-serif text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground)] md:text-6xl md:leading-[0.98]"
                style={{ fontFamily: "var(--font-lora), serif" }}
              >
                {content.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--foreground-muted)] md:text-lg">
                {content.description}
              </p>
            </div>

            <div className="mt-7">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                {content.linksLabel}
              </p>
              <HomeLinks locale={locale} />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={content.primaryCta.href} className={primaryCtaClassName}>
                {content.primaryCta.label}
              </Link>
              <Link
                href={content.secondaryCta.href}
                className={secondaryCtaClassName}
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col gap-5 md:min-h-[38rem] md:block">
            <div className="md:absolute md:left-0 md:top-0 md:w-[78%]">
              <MacWindowCard
                title="avatar.png"
                bodyClassName="px-5 pb-5 pt-3 md:px-6 md:pb-6"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-[1.4rem] bg-[#ededed] md:max-w-[260px]">
                  <Image
                    src="/hero-avatar.png"
                    alt={content.heroImageAlt}
                    fill
                    priority
                    className="object-cover object-center scale-[1.05]"
                    sizes="(max-width: 768px) 280px, (max-width: 1280px) 320px, 360px"
                  />
                </div>
              </MacWindowCard>
            </div>

            <div className="md:absolute md:bottom-0 md:right-0 md:z-10 md:w-[62%]">
              <MacWindowCard
                title={content.asideTitle}
                bodyClassName="px-5 pb-5 pt-3 md:px-6 md:pb-6"
              >
                <p className="text-sm leading-7 text-[var(--foreground-muted)] md:text-base">
                  {content.asideBody}
                </p>
              </MacWindowCard>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {content.stackEyebrow}
            </p>
            <h2
              className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
              style={{ fontFamily: "var(--font-lora), serif" }}
            >
              {content.stackTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--foreground-muted)] md:text-lg">
              {content.stackDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.stackGroups.map((group) => (
              <article
                key={group.title}
                className="interactive-elevated rounded-[1.75rem] border border-[var(--line)] bg-[var(--background)] p-5"
              >
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white py-2 pl-3 pr-2 text-sm text-[var(--foreground)] shadow-[0_8px_24px_-22px_rgba(24,24,27,0.35)]"
                    >
                      <span>{item}</span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] px-1.5 text-[var(--accent-strong)]"
                      >
                        <StackGlyph item={item} />
                      </span>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <FocusNow locale={locale} />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {content.ctas.map((cta) => (
              <article
                key={cta.title}
                className="interactive-elevated rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {cta.eyebrow}
                </p>
                <h2
                  className="mt-3 font-serif text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl"
                  style={{ fontFamily: "var(--font-lora), serif" }}
                >
                  {cta.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--foreground-muted)]">
                  {cta.description}
                </p>
                <Link href={cta.href} className={`${secondaryCtaClassName} mt-6`}>
                  {cta.buttonLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-[var(--foreground-muted)] md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Eduardo Marques</p>
          <p>{content.footerNote}</p>
        </div>
      </footer>
    </main>
  );
}
