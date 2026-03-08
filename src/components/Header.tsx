"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  getLocalizedPath,
  isCurrentPath,
  siteCopy,
} from "@/lib/site-content";

export function Header() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const navigation = siteCopy[locale].navigation;

  return (
    <header className="border-b border-[var(--line)] bg-[color:rgba(246,243,238,0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link
            href={navigation.links[0].href}
            aria-label={navigation.brandAriaLabel}
            className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            {navigation.brand}
          </Link>

          <div className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--card)] p-1 lg:hidden">
            {navigation.languageOptions.map((option) => {
              const href = getLocalizedPath(pathname, option.locale);
              const isActive = option.locale === locale;

              return (
                <Link
                  key={option.locale}
                  href={href}
                  aria-label={`${navigation.languageLabel}: ${option.label}`}
                  className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--foreground-muted)] hover:text-[var(--accent)]"
                  }`}
                >
                  {option.shortLabel}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 md:gap-3">
            {navigation.links.map((link) => {
              const active = isCurrentPath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors md:text-base ${
                    active
                      ? "bg-[var(--surface)] text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)] hover:text-[var(--accent)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--card)] p-1 lg:inline-flex">
            {navigation.languageOptions.map((option) => {
              const href = getLocalizedPath(pathname, option.locale);
              const isActive = option.locale === locale;

              return (
                <Link
                  key={option.locale}
                  href={href}
                  aria-label={`${navigation.languageLabel}: ${option.label}`}
                  className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--foreground-muted)] hover:text-[var(--accent)]"
                  }`}
                >
                  {option.shortLabel}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
