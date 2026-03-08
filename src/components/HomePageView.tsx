import Image from "next/image";
import Link from "next/link";
import { FocusNow } from "@/components/FocusNow";
import { HomeLinks } from "@/components/HomeLinks";
import { siteCopy, type Locale } from "@/lib/site-content";

type HomePageViewProps = {
  locale: Locale;
};

export function HomePageView({ locale }: HomePageViewProps) {
  const content = siteCopy[locale].home;

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)] md:text-sm">
              {content.badge}
            </p>

            <div className="mt-6 space-y-5">
              <h1
                className="font-serif text-6xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-8xl"
                style={{ fontFamily: "var(--font-lora), serif" }}
              >
                {content.title}
              </h1>
              <p className="max-w-2xl text-3xl leading-tight text-[var(--foreground)] md:text-5xl md:leading-[1.05]">
                {content.headline}
              </p>
              <p className="max-w-2xl text-base leading-8 text-[var(--foreground-muted)] md:text-lg">
                {content.description}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                {content.linksLabel}
              </p>
              <HomeLinks locale={locale} />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={content.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] md:text-base"
              >
                {content.primaryCta.label}
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:text-base"
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_24px_80px_-60px_rgba(15,118,110,0.55)] md:p-6">
            <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[1.75rem] bg-[var(--surface)]">
              <Image
                src="/hero-avatar.png"
                alt=""
                fill
                priority
                className="object-cover object-center scale-[1.05]"
                sizes="(max-width: 1024px) 280px, 360px"
              />
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-[var(--surface)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {content.asideTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)] md:text-base">
                {content.asideBody}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {content.metricsEyebrow}
            </p>
            <h2
              className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
              style={{ fontFamily: "var(--font-lora), serif" }}
            >
              {content.metricsTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--foreground-muted)] md:text-lg">
              {content.metricsDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] p-6"
              >
                <p className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
                  {metric.value}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">
                  {metric.label}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)] md:text-base">
                  {metric.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
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
              className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] p-5"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <FocusNow locale={locale} />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {content.ctas.map((cta) => (
              <article
                key={cta.title}
                className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] p-6"
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
                <Link
                  href={cta.href}
                  className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:text-base"
                >
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
