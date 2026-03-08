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
  const listingCopy = siteCopy[locale].blog;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
      <article className="prose-width">
        <header className="mb-10 rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] p-6 md:p-8">
          <h1
            className="font-serif text-3xl font-bold text-[var(--foreground)] md:text-4xl"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">
            {formatDateForLocale(locale, post.date)}
            {" "}
            {listingCopy.metaSeparator}
            {" "}
            {getReadingTimeLabel(locale, post.readingTimeMinutes)}
          </p>
        </header>

        <div className="rich-prose text-base">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <footer className="mt-16 border-t border-[var(--line)] pt-8">
          <Link
            href={getSectionPath("blog", locale)}
            className="interactive-link rounded-xl text-[var(--accent)] hover:text-[var(--accent-hover)] focus-visible:text-[var(--accent-hover)]"
          >
            {copy.backLabel}
          </Link>
        </footer>
      </article>
    </main>
  );
}
