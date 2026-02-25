const BULLETS = [
  "Filas, retry e idempotência em sistemas distribuídos",
  "Pipelines de processamento de documentos e dados",
  "Integrações com sistemas legados e APIs difíceis",
];

export function FocusNow() {
  return (
    <section className="mx-auto max-w-2xl bg-[#e0f2fe] px-6 py-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0369a1]">
        Foco agora
      </h2>
      <ul className="space-y-2 text-[#0c4a6e]">
        {BULLETS.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-[#0284c7]" aria-hidden>
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
