# Portfolio - Editorial Tech

Portfolio pessoal com foco editorial-tech para posicionamento de backend, automacao, integracoes e IA aplicada. O projeto usa Next.js com export estatico, home bilingue (PT/EN), blog em Markdown e vitrine de projetos.

## Como rodar

```bash
npm install
npm run dev
```

Aplicacao local: `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run build
npm start
```

## Estrutura principal

- `src/app/`: rotas PT-BR e rotas espelhadas em `src/app/en`.
- `src/components/HomePageView.tsx`: home principal com hero, metricas, stacks, Foco Agora e CTAs.
- `src/components/Header.tsx`: navegacao principal com seletor de idioma.
- `src/components/HomeLinks.tsx`: badges com GitHub, LinkedIn, email e curriculo localizados.
- `src/lib/site-content.ts`: dicionario PT/EN, rotas localizadas e links globais.
- `content/posts/`: posts em Markdown.
- `content/projects/`: projetos em Markdown.
- `public/`: assets publicos, incluindo curriculo PT-BR e resume EN.
- `docs/`: documentacao de implementacao e validacao.

## Internacionalizacao

- PT-BR usa `/`, `/blog` e `/projetos`.
- EN usa `/en`, `/en/blog` e `/en/projects`.
- O seletor de idioma preserva a rota equivalente da pagina atual.
- O link de curriculo acompanha o idioma ativo:
  - PT: `/curriculo-eduardo-marques-pt-br.pdf`
  - EN: `/resume-eduardo-marques-en.pdf`

## Conteudo

### Novo post

Crie um arquivo `.md` em `content/posts/` com:

```yaml
---
title: "Titulo do post"
date: "2025-02-20"
type: article
tags: ["tag1", "tag2"]
summary: "Resumo em uma ou duas linhas."
---
```

### Novo projeto

Crie um arquivo `.md` em `content/projects/` com:

```yaml
---
title: "Nome do projeto"
summary: "Resumo curto do caso"
coverImage: "/imagem-opcional.png"
---
```

## Qualidade

Os checks esperados antes de deploy sao:

1. `npm run lint`
2. `npm run test`
3. `npm run build`

## Documentacao

- `docs/README.md`
- `docs/todo-implementation.md`
- `docs/testing-and-validation.md`
