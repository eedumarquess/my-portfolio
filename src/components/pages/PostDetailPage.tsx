import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { type Post } from "@/lib/posts";
import {
  formatDateForLocale,
  getReadingTimeLabel,
  getSectionPath,
  siteCopy,
  type Locale,
} from "@/lib/site-content";

type PostDetailPageProps = {
  locale: Locale;
  post: Post;
};

export function PostDetailPage({ locale, post }: PostDetailPageProps) {
  const copy = siteCopy[locale].blogPost;

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
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">
            {formatDateForLocale(locale, post.date)}
            {" · "}
            {getReadingTimeLabel(locale, post.readingTimeMinutes)}
          </p>
        </header>

        <div className="post-body text-base leading-relaxed text-[var(--foreground)] [&>a]:text-[var(--accent)] [&>a]:underline [&>a]:underline-offset-2 [&>code]:rounded [&>code]:bg-[#f0f0f0] [&>code]:px-1 [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:text-lg [&>ol]:mb-6 [&>p]:mb-6 [&>pre]:overflow-x-auto [&>pre]:rounded-lg [&>pre]:bg-[#f0f0f0] [&>pre]:p-4 [&>ul]:mb-6">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <footer className="mt-16 border-t border-[var(--line)] pt-8">
          <Link
            href={getSectionPath("blog", locale)}
            className="text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            {copy.backLabel}
          </Link>
        </footer>
      </article>
    </main>
  );
}
