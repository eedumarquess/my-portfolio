import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Artigos e notas",
  description: "Textos técnicos e registros de construção sobre automação, filas e sistemas.",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
      <header className="mb-16">
        <h1 className="font-serif text-3xl font-bold text-[var(--foreground)] md:text-4xl" style={{ fontFamily: "var(--font-lora), serif" }}>
          Artigos e notas
        </h1>
        <p className="mt-2 text-[var(--foreground-muted)]">
          Textos técnicos e registros de construção.
        </p>
      </header>

      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-[#e5e5e5] pb-10 last:border-0">
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors md:text-2xl">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                {formatDate(post.date)}
                {post.tags.length > 0 && (
                  <span className="ml-2">
                    · {[post.type === "article" ? "Artigo" : "Nota", ...post.tags].join(", ")}
                  </span>
                )}
              </p>
              {post.summary && (
                <p className="mt-2 text-[var(--foreground)] leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-[var(--foreground-muted)]">Nenhum post ainda.</p>
      )}
    </main>
  );
}
