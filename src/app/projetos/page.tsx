import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Alguns projetos em que atuei, com contexto, processo e resultados.",
};

export default function ProjetosPage() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:px-8">
      <header className="mb-16">
        <h1
          className="font-serif text-3xl font-bold text-[var(--foreground)] md:text-4xl"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          Projetos
        </h1>
        <p className="mt-2 text-[var(--foreground-muted)]">
          Alguns projetos em que atuei.
        </p>
      </header>

      <ul className="space-y-10">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projetos/${project.slug}`}
              className="group block overflow-hidden rounded-lg border border-[#e5e5e5] bg-[var(--background)] transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#e5e5e5]">
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
                    Sem imagem
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                  {project.title}
                </h2>
                {project.summary && (
                  <p className="mt-2 text-[var(--foreground)] leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <p className="text-[var(--foreground-muted)]">
          Nenhum projeto cadastrado.
        </p>
      )}
    </main>
  );
}
