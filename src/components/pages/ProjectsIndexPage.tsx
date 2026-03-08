import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { getSectionPath, siteCopy, type Locale } from "@/lib/site-content";

type ProjectsIndexPageProps = {
  locale: Locale;
};

export function ProjectsIndexPage({ locale }: ProjectsIndexPageProps) {
  const projects = getAllProjects();
  const copy = siteCopy[locale].projects;
  const projectsPath = getSectionPath("projects", locale);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:px-8">
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
              className="group block overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] transition-shadow hover:shadow-[0_24px_80px_-60px_rgba(15,118,110,0.55)]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface)]">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt=""
                    fill
                    className="object-cover transition-transform group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-[var(--foreground-muted)]"
                    aria-hidden
                  >
                    {locale === "pt" ? "Sem imagem" : "No image"}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                  {project.title}
                </h2>
                {project.summary && (
                  <p className="mt-3 text-base leading-relaxed text-[var(--foreground)] line-clamp-3">
                    {project.summary}
                  </p>
                )}
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
