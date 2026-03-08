import { siteCopy, type Locale } from "@/lib/site-content";

type FocusNowProps = {
  locale: Locale;
};

export function FocusNow({ locale }: FocusNowProps) {
  const content = siteCopy[locale].home.focus;

  return (
    <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_20px_80px_-60px_rgba(15,118,110,0.45)] md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
          {content.eyebrow}
        </p>
        <h2
          className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          {content.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--foreground-muted)] md:text-lg">
          {content.description}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {content.bullets.map((item) => (
          <li
            key={item}
            className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 text-sm leading-7 text-[var(--foreground)] md:text-base"
          >
            <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-lg text-[var(--accent)]">
              +
            </span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
