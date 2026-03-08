---
title: "Pipeline de documentos com OCR, filas e revisão humana"
summary: "Backend de document processing com OCR, classificação, validação e handoff para revisão humana quando a confiança do fluxo cai."
coverImage: ""
coverAlt: ""
projectType: "Automação backend"
outcome: "Centralizou triagem, OCR e validação em um fluxo auditável, com menos reprocesso invisível e mais previsibilidade operacional."
role: "Arquitetura backend, desenho da fila, contratos de integração e regras de fallback"
stack: ["NestJS", "TypeScript", "RabbitMQ", "PostgreSQL", "OCR", "OpenAI"]
context: "A operação recebia documentos por upload manual, e-mail e integrações internas, com triagem espalhada entre times e pouca rastreabilidade."
challenge: "Acelerar o processamento sem perder controle sobre documentos ambíguos, falhas de OCR e etapas que ainda exigiam revisão humana."
links:
  - kind: article
    label: "Nota sobre trade-offs de processamento"
    href: "/blog/trade-off-ferramenta-processamento-documentos"
---

Este projeto nasceu para tirar a equipe de uma rotina de triagem manual, cópia de dados e conferência repetitiva. O objetivo não era só "automatizar documentos", mas criar um fluxo previsível para receber arquivos, extrair dados, validar o que fosse possível e encaminhar exceções sem perder contexto.

## Contexto

A entrada acontecia por canais diferentes e sem um contrato único. Alguns documentos chegavam em PDF, outros em imagem, e parte deles vinha incompleta ou com qualidade ruim. O custo não estava apenas na digitação: estava no tempo gasto para descobrir qual documento era aquele, para quem ele deveria seguir e o que precisava de nova checagem.

Por trás disso, o problema real era operacional. Sem fila, sem estados explícitos e sem trilha de decisão, qualquer erro virava retrabalho manual ou mensagem solta em ferramenta de comunicação.

## Processo

A arquitetura foi desenhada como um pipeline assíncrono:

- o backend recebia o documento, registrava metadados e criava um identificador rastreável no PostgreSQL
- uma fila no RabbitMQ distribuía as etapas de OCR, classificação e validação sem acoplar tudo no mesmo request
- cada etapa escrevia status, motivo de falha e dados extraídos para manter observabilidade do fluxo
- quando o OCR ou a classificação não atingiam confiança suficiente, o item saía do caminho automático e entrava em revisão humana com contexto preservado

Esse desenho evitou falha silenciosa. Em vez de "sumir" no meio da automação, o documento sempre ficava em um estado conhecido: processado, aguardando revisão ou pronto para reprocessamento.

![Screenshot do processo](/projects/exemplo/screenshot.png)

## Resultado

O resultado foi um fluxo mais previsível para documentos de entrada variável. A automação absorveu a parte repetitiva, enquanto os casos ambíguos passaram a cair em uma etapa explícita de revisão, não em retrabalho informal.

Do ponto de vista de engenharia, o ganho principal foi ter contratos melhores entre OCR, regras de negócio e atendimento operacional. Isso deixou o sistema mais fácil de evoluir, medir e depurar quando surgiam novos tipos de documento ou exceções.
