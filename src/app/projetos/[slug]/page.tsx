import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projeto não encontrado" };
  return {
    title: `${project.title} — Projetos`,
    description: project.summary || undefined,
  };
}

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
      <article className="prose-width">
        <header className="mb-10">
          <h1
            className="font-serif text-3xl font-bold text-[var(--foreground)] md:text-4xl"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            {project.title}
          </h1>
        </header>

        <div
          className="post-body text-base leading-relaxed text-[var(--foreground)] [&>p]:mb-6 [&>ul]:mb-6 [&>ol]:mb-6 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-lg [&>a]:text-[var(--accent)] [&>a]:underline [&>a]:underline-offset-2 [&>pre]:bg-[#f0f0f0] [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>code]:bg-[#f0f0f0] [&>code]:px-1 [&>code]:rounded [&>img]:rounded-lg [&>video]:max-w-full [&>video]:rounded-lg"
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {project.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 border-t border-[#e5e5e5] pt-8">
          <Link
            href="/projetos"
            className="text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            ← Voltar aos projetos
          </Link>
        </footer>
      </article>
    </main>
  );
}
