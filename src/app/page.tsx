import Image from "next/image";
import Link from "next/link";
import { HomeLinks } from "@/components/HomeLinks";
import { FocusNow } from "@/components/FocusNow";

export default function Home() {
  return (
    <main>
      {/* Hero: nome sozinho; descrição + ícone na mesma linha no desktop */}
      <section className="spacing-hero mx-auto max-w-5xl px-6 md:px-8">
        {/* Linha 1: só o nome */}
        <h1
          className="font-serif text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-5xl"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          Olá, sou o Edu!
        </h1>
        {/* Linha 2: descrição à esquerda, ícone à direita (ícone ao lado da descrição) */}
        <div className="mt-2 flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="flex max-w-2xl flex-col gap-6 text-justify md:text-left">
            <p className="text-lg text-[var(--foreground-muted)] md:text-xl">
              Backend engineer focado em automação, workflows e IA aplicada a
              problemas reais.
            </p>
            <p className="text-base leading-relaxed text-[var(--foreground)]">
              Construo serviços e pipelines que transformam processos manuais em
              sistemas confiáveis. Trabalho com filas, orquestração, integrações
              com IA e processamento de dados em cenários reais.
            </p>
            <HomeLinks />
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/blog"
                className="inline-block rounded-full bg-[var(--accent)] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                Ver artigos e notas
              </Link>
              <Link
                href="/projetos"
                className="inline-block rounded-full bg-[var(--accent)] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                Ver projetos
              </Link>
            </div>
          </div>
          <div className="relative mx-auto h-[160px] w-[160px] shrink-0 overflow-hidden md:mx-0 md:h-[200px] md:w-[200px]">
            <Image
              src="/hero-avatar.png"
              alt=""
              width={200}
              height={200}
              className="h-full w-full scale-[1.4] object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* Foco agora */}
      <section className="spacing-section mx-auto max-w-5xl px-6 pb-24 md:px-8">
        <FocusNow />
      </section>

      <footer className="border-t border-[#e5e5e5] py-8 text-center text-sm text-[var(--foreground-muted)]">
        © {new Date().getFullYear()} - Eduardo Marques
      </footer>
    </main>
  );
}
