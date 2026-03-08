import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { type ProjectLink, type Project } from "@/lib/projects";
import { getSectionPath, siteCopy, type Locale } from "@/lib/site-content";

type ProjectDetailPageProps = {
  locale: Locale;
  project: Project;
};

function getLinkLabel(
  link: ProjectLink,
  labels: ReturnType<typeof getProjectLinkLabels>,
) {
  return link.label || labels[link.kind];
}

function getProjectLinkLabels(copy: (typeof siteCopy)[Locale]["projectDetail"]) {
  return {
    demo: copy.linkLabels.demo,
    repository: copy.linkLabels.repository,
    article: copy.linkLabels.article,
    external: copy.linkLabels.external,
  };
}

export function ProjectDetailPage({
  locale,
  project,
}: ProjectDetailPageProps) {
  const copy = siteCopy[locale].projectDetail;
  const sectionLabels = copy.sections;
  const linkLabels = getProjectLinkLabels(copy);
  const summaryItems = [
    {
      label: sectionLabels.context,
      value: project.context,
    },
    {
      label: sectionLabels.challenge,
      value: project.challenge,
    },
    {
      label: sectionLabels.role,
      value: project.role,
    },
    {
      label: sectionLabels.outcome,
      value: project.outcome,
    },
  ].filter((item) => item.value);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:px-8">
      <article>
        <header className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_24px_80px_-60px_rgba(15,118,110,0.45)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {copy.summaryLabel}
          </p>
          <h1
            className="mt-3 max-w-3xl font-serif text-3xl font-bold text-[var(--foreground)] md:text-5xl"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            {project.title}
          </h1>
          {project.summary ? (
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--foreground-muted)] md:text-lg">
              {project.summary}
            </p>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {summaryItems.map((item) => (
              <section
                key={item.label}
                className="rounded-[1.5rem] bg-[var(--surface)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)] md:text-base">
                  {item.value}
                </p>
              </section>
            ))}
          </div>

          {project.stack.length > 0 ? (
            <section className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                {sectionLabels.stack}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {project.links.length > 0 ? (
            <section className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                {sectionLabels.links}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Link
                    key={`${link.kind}-${link.href}`}
                    href={link.href}
                    className="interactive-chip inline-flex min-h-11 items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:text-[var(--accent)]"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {getLinkLabel(link, linkLabels)}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </header>

        <div className="prose-width mt-12">
          <div className="rich-prose text-base">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {project.content}
            </ReactMarkdown>
          </div>
        </div>

        <footer className="mt-16 border-t border-[var(--line)] pt-8">
          <Link
            href={getSectionPath("projects", locale)}
            className="interactive-link rounded-xl text-[var(--accent)] hover:text-[var(--accent-hover)] focus-visible:text-[var(--accent-hover)]"
          >
            {copy.backLabel}
          </Link>
        </footer>
      </article>
    </main>
  );
}
