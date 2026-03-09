---
slug: "document-parser"
title: "Pipeline de ingestão de documentos com filas, retry e DLQ"
summary: "Backend de ingestão assíncrona em NestJS com upload multipart, persistência em PostgreSQL, mensageria em RabbitMQ e worker dedicado para processamento desacoplado."
coverImage: ""
coverAlt: ""
projectType: "Automação backend"
outcome: "Trocou um fluxo síncrono e opaco por uma esteira observável, com estados explícitos, retry controlado e separação entre ingestão, processamento e tratamento de falhas."
role: "Arquitetura backend, desenho do contrato de ingestão, modelagem dos estados, integração com RabbitMQ e estruturação do worker"
stack: ["NestJS", "TypeScript", "RabbitMQ", "PostgreSQL", "TypeORM", "Docker"]
context: "A necessidade era receber documentos via upload, persistir metadados e processar os arquivos fora do request sem perder rastreabilidade do ciclo completo."
challenge: "Criar uma base confiável para ingestão assíncrona com retries, DLQ, healthcheck e acompanhamento por status, sem misturar processamento pesado com a camada de entrada."
links:
  - kind: repository
    label: "Repositório do projeto"
    href: "https://github.com/eedumarquess/document-parser"
---

Este pipeline separa ingestão e processamento desde o primeiro passo. A API recebe o upload, persiste metadados, publica o trabalho para execução assíncrona e mantém rastreabilidade do ciclo completo sem carregar o request com processamento pesado.

## Contexto

Em muitos fluxos internos, o documento entra por upload e logo em seguida o sistema tenta fazer tudo de uma vez. Isso tende a acoplar demais a entrada ao processamento, aumentar tempo de resposta e dificultar a identificação de falhas quando algo quebra no meio do caminho.

Aqui, a proposta foi separar as responsabilidades desde o começo. A API recebe e registra. A fila distribui. O worker processa. O banco mantém o estado. Esse desenho reduz atrito operacional e cria uma base melhor para crescer depois com OCR, classificação, validação ou outras etapas de inteligência documental.

## Processo

A arquitetura foi desenhada como uma pipeline assíncrona local:

- a API expõe `POST /documents` para upload multipart de arquivos como `pdf`, `doc`, `docx` e `txt`
- os metadados do documento são persistidos no PostgreSQL antes da publicação da mensagem
- o RabbitMQ distribui o trabalho para uma fila principal consumida por um worker dedicado
- o consumo usa `prefetch=5`, evitando sobrecarga simples no worker durante o processamento
- falhas são tratadas com fila de retry usando TTL de 10 segundos e envio para DLQ após três tentativas
- a API expõe `GET /documents/:id` para acompanhar o status do item ao longo do fluxo
- o endpoint `GET /health` verifica disponibilidade de PostgreSQL e RabbitMQ
- logs JSON estruturados mantêm observabilidade tanto na API quanto no worker

Esse desenho reduz falha silenciosa e deixa o documento sempre em um estado conhecido. Em vez de desaparecer no meio da execução, cada item permanece rastreável como `QUEUED`, `PROCESSING`, `PROCESSED`, `FAILED` ou `DLQ`.

## Resultado

O resultado foi uma base mais previsível para ingestão de documentos. A entrada ficou mais rápida e o processamento deixou de depender da duração do request, enquanto os mecanismos de retry e DLQ criaram um caminho explícito para tratamento de erro.

Do ponto de vista de engenharia, o ganho principal foi estruturar bem o começo do pipeline. Isso deixa o sistema mais fácil de operar, depurar e estender quando novas etapas passarem a fazer parte do ciclo do documento.
