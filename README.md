# Portfolio — Editorial-Tech

Portfolio pessoal minimalista (backend/fullstack) com estilo híbrido editorial + tech: Home e Blog (artigos e notas).

## Como rodar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estrutura

- **Home** (`src/app/page.tsx`): hero (nome, posicionamento, resumo), links, “Foco agora”, CTA para o blog, ilustração.
- **Blog** (`src/app/blog/`): lista de posts e página de post com Markdown.
- **Posts**: arquivos `.md` em `content/posts/` com frontmatter (`title`, `date`, `type`, `tags`, `summary`).

## O que personalizar

1. **Nome e copy da Home** — em `src/app/page.tsx` e, se quiser, em `src/app/layout.tsx` (metadata).
2. **Links (GitHub, LinkedIn, e-mail, currículo)** — em `src/components/HomeLinks.tsx`. Coloque suas URLs e, se usar currículo em PDF, coloque o arquivo em `public/resume.pdf` (ou altere o href).
3. **Bullets “Foco agora”** — em `src/components/FocusNow.tsx`.
4. **Ilustração do hero** — substitua o SVG em `src/components/HeroIllustration.tsx` por sua arte (hand-drawn B&W).

## Novos posts

Crie um `.md` em `content/posts/` com frontmatter:

```yaml
---
title: "Título do post"
date: "2025-02-20"
type: article   # ou note
tags: ["tag1", "tag2"]
summary: "Resumo em uma ou duas linhas."
---
```

O corpo é Markdown. O tempo de leitura é calculado automaticamente.

## Build

```bash
npm run build
npm start
```

Build estático: a lista do blog e as páginas de post são geradas em tempo de build.
