import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import {
  formatDateForLocale,
  getSectionPath,
  siteCopy,
  type Locale,
} from "@/lib/site-content";

type BlogIndexPageProps = {
  locale: Locale;
};

export function BlogIndexPage({ locale }: BlogIndexPageProps) {
  const posts = getAllPosts();
  const copy = siteCopy[locale].blog;
  const blogPath = getSectionPath("blog", locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
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
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border-b border-[var(--line)] pb-10 last:border-0"
          >
            <Link
              href={`${blogPath}/${post.slug}`}
              className="interactive-card group block rounded-[1.25rem] px-2 py-2 hover:bg-[color:rgba(255,253,248,0.55)] hover:shadow-[0_18px_50px_-45px_rgba(15,118,110,0.6)] focus-visible:bg-[color:rgba(255,253,248,0.75)]"
            >
              <h2 className="text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] md:text-2xl">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                {formatDateForLocale(locale, post.date)}
                {post.tags.length > 0 && (
                  <span className="ml-2">
                    {copy.metaSeparator}{" "}
                    {[
                      post.type === "article"
                        ? copy.articleLabel
                        : copy.noteLabel,
                      ...post.tags,
                    ].join(", ")}
                  </span>
                )}
              </p>
              {post.summary && (
                <p className="mt-3 text-base leading-relaxed text-[var(--foreground)] line-clamp-3">
                  {post.summary}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-[var(--foreground-muted)]">{copy.emptyState}</p>
      )}
    </main>
  );
}
