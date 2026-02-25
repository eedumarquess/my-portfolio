import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado" };
  return {
    title: `${post.title} — Blog`,
    description: post.summary || undefined,
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
      <article className="prose-width">
        <header className="mb-10">
          <h1
            className="font-serif text-3xl font-bold text-[var(--foreground)] md:text-4xl"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">
            {formatDate(post.date)}
            {" · "}
            {post.readingTimeMinutes} min de leitura
          </p>
        </header>

        <div
          className="post-body text-base leading-relaxed text-[var(--foreground)] [&>p]:mb-6 [&>ul]:mb-6 [&>ol]:mb-6 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-lg [&>a]:text-[var(--accent)] [&>a]:underline [&>a]:underline-offset-2 [&>pre]:bg-[#f0f0f0] [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>code]:bg-[#f0f0f0] [&>code]:px-1 [&>code]:rounded"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <footer className="mt-16 pt-8 border-t border-[#e5e5e5]">
          <Link
            href="/blog"
            className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            ← Voltar ao blog
          </Link>
        </footer>
      </article>
    </main>
  );
}
