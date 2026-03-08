# Testing and Validation

Este documento registra como a entrega foi validada.

## Checks executados

```bash
npm run lint
npm run test
npm run build
```

Status na validacao final:

- `npm run lint`: OK
- `npm run test`: OK
- `npm run build`: OK

## Cobertura automatizada atual

- `src/lib/site-content.test.ts`
Valida deteccao de locale, traducao de rotas, links da home, leitura de data e labels de tempo de leitura.

- `src/components/HomePageView.test.ts`
Valida CTAs principais, links reais de badges, labels acessiveis, comportamento externo e curriculo localizado.

- `src/components/Header.test.tsx`
Valida que o seletor de idioma preserva a rota equivalente ao alternar entre PT-BR e EN.

- `src/lib/posts.test.ts`
Valida leitura de slugs, parsing de frontmatter, ordenacao e tempo de leitura dos posts.

- `src/lib/projects.test.ts`
Valida leitura de slugs e parsing dos projetos em Markdown.

## Criterio de aceite adotado

- Links institucionais apontam para destinos reais.
- Curriculo muda junto com o idioma do site.
- Home, navegacao, blog e projetos possuem rotas PT-BR e EN.
- A home reflete a nova hierarquia visual e os novos blocos de valor.
- O projeto continua gerando export estatico sem regressao.
