---
slug: "ai-content-engine"
title: "AI Content Engine com orquestração assíncrona, RAG local e rastreabilidade por etapa"
summary: "Plataforma local de geração assistida por IA com orchestrator em NestJS, workers Python, banco vetorial, reranking e telemetria por execução."
coverImage: ""
coverAlt: ""
projectType: "Plataforma de IA aplicada"
outcome: "Transformou um fluxo experimental de agentes em uma base executável e auditável, com persistência, tracing e contratos mais claros entre backend, retrieval e workers."
role: "Arquitetura do sistema, desenho do orchestrator, contratos entre steps, persistência, observabilidade e integração entre NestJS e workers Python"
stack: ["NestJS", "TypeScript", "Python", "PostgreSQL", "RabbitMQ", "Ollama", "RAG", "Agentes", "Reranking"]
context: "A proposta era sair de prompts isolados e montar um MVP de engine de conteúdo com memória semântica, execução local e visibilidade real sobre cada etapa do pipeline."
challenge: "Integrar orquestração backend, workers especializados, bootstrap de banco, retrieval, reranking, geração e revisão sem cair em um protótipo frágil difícil de operar e evoluir."
links:
  - kind: repository
    label: "Repositório do projeto"
    href: "https://github.com/eedumarquess/ai-content-engine"
---

O AI Content Engine organiza geração assistida por IA como sistema de software, não como uma sequência solta de chamadas para modelo. Cada execução passa a ter contexto, estado, rastreabilidade e espaço claro para evolução sem depender de scripts isolados ou fluxos opacos.

## Contexto

Quando um projeto de IA fica restrito a prompts, o problema quase nunca está apenas na qualidade do modelo. O gargalo aparece na falta de contratos entre etapas, na ausência de persistência, na dificuldade de reproduzir execuções e na impossibilidade de entender o que aconteceu quando uma saída vem ruim.

Neste caso, o foco foi estruturar um MVP local com componentes bem definidos. O backend coordena. Os workers executam etapas especializadas. A infraestrutura sustenta fila, armazenamento, modelos locais e retrieval. O resultado é uma base mais séria para testar, medir e evoluir um pipeline de conteúdo assistido por IA.

## Processo

A arquitetura foi organizada como uma esteira assíncrona com responsabilidades separadas:

- um orchestrator em NestJS centraliza o fluxo e sustenta a execução do pipeline de ponta a ponta
- workers em Python assumem o trabalho especializado, evitando concentrar toda a lógica de IA dentro da camada HTTP
- a infraestrutura local sobe Postgres, RabbitMQ, Ollama e reranker para criar um ambiente reproduzível de desenvolvimento
- o bootstrap do banco aplica migrations, cria dados iniciais, gera embeddings reais para persona e knowledge e valida a integridade do schema
- o projeto mantém documentação consolidada e separa claramente pastas de `orchestrator`, `agents`, `infra` e `docs`
- o preset global nasce já semeado, reduzindo atrito para testar o fluxo desde o primeiro setup

Esse desenho é importante porque tira o projeto do campo de "demo de IA" e coloca em uma estrutura mais próxima de produto. Em vez de depender de comportamento implícito, cada parte tem fronteira mais clara, o que facilita depuração, observabilidade e expansão futura.

## Resultado

O principal ganho foi arquitetural. O projeto deixa de ser uma ideia espalhada entre agentes, scripts e integrações locais e passa a ter um núcleo coerente para orquestrar geração, memória semântica e revisão.

Do ponto de vista de engenharia, isso cria uma fundação melhor para evoluir o MVP com mais agentes, políticas de validação, controle de custo e novos fluxos de saída. O valor não está só em gerar conteúdo, mas em conseguir operar esse processo com previsibilidade técnica.
