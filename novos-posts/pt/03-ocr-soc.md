---
slug: "ocr-ancoras-rois-relativas"
title: "OCR de laudos com âncoras e layouts reutilizáveis"
date: "2026-03-07"
type: article
tags: ["ocr", "documentos", "python"]
summary: "Como usar âncoras, ROIs relativas e validação por campo para reduzir a fragilidade de OCR em documentos padronizados."
---

OCR em documentos padronizados costuma falhar menos por leitura de texto e mais por geometria. O layout parece igual, mas pequenas variações de margem, rotação e contraste já bastam para quebrar extrações baseadas em caixas fixas.

A resposta aqui foi trocar coordenadas rígidas por uma estratégia em que o layout é configurado uma vez e reaproveitado depois. Em vez de recalibrar tudo a cada documento, o fluxo usa âncoras, ROIs relativas e validações por campo para sustentar melhor a leitura.

## Contexto

Em OCR aplicado a laudos, o custo não está apenas em reconhecer caracteres. Grande parte da complexidade mora em localizar corretamente onde cada campo está, mesmo quando o documento sofre pequenas deformações comuns de scan. Sem uma estratégia de posicionamento mais inteligente, a manutenção vira um trabalho manual e repetitivo.

Neste projeto, a proposta foi transformar o layout em um ativo reutilizável. O sistema foi pensado para documentos padronizados em que vale a pena calibrar uma vez e reaplicar a configuração em múltiplos arquivos semelhantes.

## Processo

A solução foi montada combinando localização, pré-processamento e validação:

- um editor de ROI permite criar e ajustar layouts interativamente, o que facilita a configuração inicial
- o sistema usa âncoras para compensar variações de escaneamento com apoio de QR codes, texto ou formas
- as regiões de interesse passam a ser calculadas com coordenadas relativas a pontos de referência, em vez de depender de posições fixas absolutas
- o pré-processamento pode aplicar deskew, binarização, denoise e normalização de contraste antes da leitura
- os valores extraídos passam por validações robustas com regex, ranges e regras customizadas por campo
- além do processamento unitário, o projeto prevê processamento em lote para múltiplos scans do mesmo layout

Esse desenho melhora a confiabilidade porque o OCR deixa de ser uma etapa isolada. O sistema passa a considerar também onde ler, como normalizar a imagem antes da leitura e como validar semanticamente o resultado extraído.

## Resultado

O resultado foi um pipeline mais estável para documentos padronizados, especialmente quando a meta não é apenas reconhecer texto, mas extrair campos com menor fragilidade operacional. O layout deixa de ser uma sequência de coordenadas mágicas e passa a ser uma configuração reaproveitável.

Do ponto de vista de portfólio, o projeto mostra algo valioso: não apenas uso de OCR, mas entendimento prático dos problemas reais de geometria, pré-processamento, calibração e validação que aparecem quando esse tipo de sistema sai do experimento e encosta no fluxo operacional.
