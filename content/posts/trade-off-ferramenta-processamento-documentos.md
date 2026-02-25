---
title: "Trade-off entre ferramentas para processar documentos"
date: "2025-02-15"
type: note
tags: ["documentos", "pipelines", "ferramentas"]
summary: "Nota rápida sobre escolher entre biblioteca X e serviço Y para um pipeline de extração de texto."
---

Estava avaliando duas opções para um pipeline de extração de texto de PDFs e imagens: uma biblioteca open-source local vs um serviço gerenciado (API).

**Biblioteca local:** controle total, sem custo por página, roda na nossa infra. Contras: manutenção, edge cases com PDFs malformados, OCR em outros idiomas pode ser mais trabalho.

**Serviço gerenciado:** menos código para manter, OCR bom out of the box. Contras: custo por volume, dados saindo da nossa rede, dependência de terceiro.

Para este projeto, o volume é baixo e a sensibilidade dos documentos é média. Decisão: começar com a biblioteca local para não criar custo fixo e não enviar dados para fora; se a qualidade do OCR ou o tempo de manutenção doer, reavaliar o serviço para um segundo estágio.

Registro aqui para não esquecer o critério: volume, sensibilidade dos dados e quanto tempo a equipe pode dedicar a edge cases.
