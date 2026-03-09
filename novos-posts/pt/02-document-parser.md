---
slug: "trade-offs-ingestao-assincrona-documentos"
title: "Pipeline de ingestão de documentos com filas, retry e DLQ"
date: "2026-03-08"
type: article
tags: ["backend", "filas", "document processing"]
summary: "Por que separar upload e processamento muda a confiabilidade de um pipeline de documentos com RabbitMQ, retry e DLQ."
---

Upload e processamento não precisam dividir o mesmo request para um pipeline funcionar. Este projeto parte dessa separação: a API recebe o documento, registra metadados, publica a mensagem e deixa o trabalho pesado para um worker dedicado.

A arquitetura foi pensada para evitar o fluxo em que o arquivo entra e desaparece dentro de uma lógica síncrona difícil de operar. Em vez disso, o documento ganha estado explícito, retry controlado e um caminho claro para tratamento de falhas.

## Contexto

Em cenários reais, documentos chegam por canais diferentes, com formatos variados e necessidade de acompanhamento posterior. Quando a ingestão e o processamento ficam presos no mesmo request, qualquer instabilidade vira timeout, falha silenciosa ou retrabalho operacional.

A arquitetura aqui foi desenhada justamente para evitar isso. O backend recebe o documento, persiste os metadados no PostgreSQL e publica a mensagem para o RabbitMQ. A partir daí, um worker consome a fila principal e executa o fluxo sem bloquear a experiência de entrada.

## Processo

O pipeline foi estruturado com foco em estados explícitos e recuperação:

- a API recebe arquivos multipart e aceita formatos como `pdf`, `doc`, `docx` e `txt`
- os metadados são persistidos no PostgreSQL logo na entrada, garantindo identidade e rastreabilidade ao documento
- a publicação no RabbitMQ desloca o processamento para fora do request HTTP
- um worker dedicado consome a fila principal com `prefetch` controlado para evitar sobrecarga desnecessária
- falhas passam por retry com backoff via fila própria antes de seguirem para DLQ após o limite de tentativas
- endpoints de consulta permitem acompanhar o status do documento ao longo do fluxo
- um endpoint de healthcheck verifica PostgreSQL e RabbitMQ, mantendo a aplicação mais transparente para operação

Esse desenho evita o tipo de automação que "funciona até não funcionar". Em vez de depender de logs soltos ou inferência manual para descobrir onde um item parou, o documento passa a existir dentro de um conjunto simples e objetivo de estados conhecidos.

## Resultado

O resultado foi uma fundação mais robusta para qualquer pipeline posterior de OCR, classificação, extração ou validação. Mesmo sendo uma base enxuta, ela já resolve problemas importantes de desacoplamento, rastreabilidade e tolerância a falha.

Do ponto de vista de engenharia, o ganho principal foi estrutural. O projeto mostra domínio de uma etapa que muita gente trata como detalhe, mas que na prática define a confiabilidade de todo o resto: receber, persistir, enfileirar, reprocessar e isolar erro sem colapsar a API.
