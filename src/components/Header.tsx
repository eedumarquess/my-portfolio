import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[#e5e5e5] bg-[var(--background)]">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-5 md:px-8">
        <Link
          href="/"
          className="text-lg font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          Início
        </Link>
        <Link
          href="/blog"
          className="text-lg text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/projetos"
          className="text-lg text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
        >
          Projetos
        </Link>
      </nav>
    </header>
  );
}
