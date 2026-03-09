import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { getSectionPath, siteCopy, type Locale } from "@/lib/site-content";

type ProjectsIndexPageProps = {
  locale: Locale;
};

export function ProjectsIndexPage({ locale }: ProjectsIndexPageProps) {
  const projects = getAllProjects(locale);
  const copy = siteCopy[locale].projects;
  const projectsPath = getSectionPath("projects", locale);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:px-8">
      <header className="mb-16 max-w-2xl">
        <h1
          className="font-serif text-3xl font-bold text-[var(--foreground)] md:text-4xl"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          {copy.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-[var(--foreground-muted)]">
          {copy.description}
        </p>
      </header>

      <ul className="space-y-10">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`${projectsPath}/${project.slug}`}
              className="interactive-card group block overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_24px_80px_-60px_rgba(15,118,110,0.55)] focus-visible:border-[var(--accent)] focus-visible:shadow-[0_24px_80px_-60px_rgba(15,118,110,0.55)]"
            >
              <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface)]">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.coverAlt || project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--foreground-muted)]">
                      {copy.cardLabels.noImage}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.projectType ? (
                      <span className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
                        {copy.cardLabels.type}: {project.projectType}
                      </span>
                    ) : null}
                    {project.role ? (
                      <span className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
                        {project.role}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] md:text-2xl">
                    {project.title}
                  </h2>

                  {project.summary && (
                    <p className="mt-3 text-base leading-relaxed text-[var(--foreground)] line-clamp-3">
                      {project.summary}
                    </p>
                  )}

                  {project.stack.length > 0 ? (
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                        {copy.cardLabels.stack}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-sm text-[var(--foreground)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {project.outcome ? (
                    <div className="mt-5 rounded-[1.25rem] bg-[var(--surface)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                        {copy.cardLabels.outcome}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
                        {project.outcome}
                      </p>
                    </div>
                  ) : null}

                  <p className="mt-5 text-sm font-semibold text-[var(--accent)]">
                    {copy.cardLabels.openProject}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <p className="text-[var(--foreground-muted)]">{copy.emptyState}</p>
      )}
    </main>
  );
}
