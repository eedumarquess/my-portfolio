# Implementacao do TO-DO

Este documento fecha os itens do `# TO-DO.txt` e registra onde cada decisao foi aplicada no codigo.

## Links e badges

- [x] GitHub real na badge.
Arquivos: `src/lib/site-content.ts`, `src/components/HomeLinks.tsx`, `src/components/HomePageView.test.ts`.
Resumo: o link foi atualizado para `https://github.com/eedumarquess`, com `aria-label`, abertura externa e preservacao do estilo visual dos icones.

- [x] LinkedIn real na badge.
Arquivos: `src/lib/site-content.ts`, `src/components/HomeLinks.tsx`, `src/components/HomePageView.test.ts`.
Resumo: o link foi atualizado para `https://www.linkedin.com/in/eduardo-marquess/`, mantendo `target="_blank"` e `rel="noopener noreferrer"`.

- [x] E-mail real na badge.
Arquivos: `src/lib/site-content.ts`, `src/components/HomeLinks.tsx`, `src/components/HomePageView.test.ts`.
Resumo: o placeholder foi trocado por `mailto:eedumarquess@gmail.com`, com label acessivel.

- [x] Curriculo localizado por idioma.
Arquivos: `public/curriculo-eduardo-marques-pt-br.pdf`, `public/resume-eduardo-marques-en.pdf`, `src/lib/site-content.ts`, `src/components/HomeLinks.tsx`.
Resumo: o badge de curriculo aponta para o PDF PT-BR na interface em portugues e para o resume EN na interface em ingles.

## Idioma e navegacao

- [x] Site bilingue PT-BR / EN.
Arquivos: `src/lib/site-content.ts`, `src/components/Header.tsx`, `src/components/LocaleDocumentController.tsx`, `src/app/en/**`, `src/components/Header.test.tsx`.
Resumo: a estrategia adotada foi rotas estaticas espelhadas com dicionario local. O seletor de idioma preserva a pagina equivalente ao trocar a lingua.

- [x] CTA para blog mais forte.
Arquivos: `src/lib/site-content.ts`, `src/components/HomePageView.tsx`, `src/components/HomePageView.test.ts`.
Resumo: o CTA principal passou a vender o valor editorial-tech do blog com foco em automacao, backend e IA aplicada.

- [x] CTA para projetos com mais profundidade.
Arquivos: `src/lib/site-content.ts`, `src/components/HomePageView.tsx`, `src/components/HomePageView.test.ts`.
Resumo: o CTA secundario passou a comunicar casos, sistemas e automacoes construidas, em vez de um convite generico.

## Conteudo e posicionamento

- [x] Metricas mais substanciais.
Arquivos: `src/lib/site-content.ts`, `src/components/HomePageView.tsx`.
Resumo: o bloco de metricas ganhou numeros e linguagem de impacto operacional, como reducao de tempo manual, volume processado e quantidade de integracoes.

- [x] Stack visual no primeiro fluxo de leitura.
Arquivos: `src/lib/site-content.ts`, `src/components/HomePageView.tsx`.
Resumo: a stack foi agrupada por contexto: backend, mensageria, dados, automacao, IA aplicada e infra.

## Hierarquia visual e layout

- [x] Hero com hierarquia mais forte.
Arquivos: `src/components/HomePageView.tsx`, `src/app/globals.css`.
Resumo: o nome, headline e texto descritivo foram reorganizados com tipografia maior, contraste mais forte e ritmo melhor entre blocos.

- [x] Secao "Foco Agora" integrada.
Arquivos: `src/components/FocusNow.tsx`, `src/lib/site-content.ts`, `src/components/HomePageView.tsx`.
Resumo: a secao ganhou contexto, titulo mais forte e bullets mais especificos sobre OCR, filas e LLMs com guardrails.

- [x] Mais contraste entre secoes.
Arquivos: `src/components/HomePageView.tsx`, `src/app/globals.css`.
Resumo: a home passou a alternar superficies, bordas e respiros para separar hero, metricas, stack, foco e CTAs.

- [x] Leitura mobile reforcada.
Arquivos: `src/components/HomePageView.tsx`, `src/components/Header.tsx`, `src/components/HomeLinks.tsx`, `src/components/FocusNow.tsx`.
Resumo: os blocos usam empilhamento responsivo, botoes com altura minima, links compactos e grids que se reorganizam bem em tela pequena.

## Observacoes de arquitetura

- O conteudo institucional da home, navegacao, labels e CTAs foi centralizado em `src/lib/site-content.ts`.
- As rotas inglesas usam `src/app/en/` para manter export estatico simples.
- O header continua compartilhado entre todas as paginas para evitar divergencia de navegacao entre locais.
