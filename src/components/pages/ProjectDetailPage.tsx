import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { type Project } from "@/lib/projects";
import { getSectionPath, siteCopy, type Locale } from "@/lib/site-content";

type ProjectDetailPageProps = {
  locale: Locale;
  project: Project;
};

export function ProjectDetailPage({
  locale,
  project,
}: ProjectDetailPageProps) {
  const copy = siteCopy[locale].projectDetail;

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

        <div className="post-body text-base leading-relaxed text-[var(--foreground)] [&>a]:text-[var(--accent)] [&>a]:underline [&>a]:underline-offset-2 [&>code]:rounded [&>code]:bg-[#f0f0f0] [&>code]:px-1 [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:text-lg [&>img]:rounded-lg [&>ol]:mb-6 [&>p]:mb-6 [&>pre]:overflow-x-auto [&>pre]:rounded-lg [&>pre]:bg-[#f0f0f0] [&>pre]:p-4 [&>ul]:mb-6 [&>video]:max-w-full [&>video]:rounded-lg">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {project.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 border-t border-[var(--line)] pt-8">
          <Link
            href={getSectionPath("projects", locale)}
            className="text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            {copy.backLabel}
          </Link>
        </footer>
      </article>
    </main>
  );
}
