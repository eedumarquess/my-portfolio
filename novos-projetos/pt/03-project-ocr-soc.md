---
slug: "ocr-soc"
title: "OCR com âncoras e layouts reutilizáveis para documentos padronizados"
summary: "Sistema modular de OCR para laudos padronizados com ROIs relativas, âncoras de referência, pré-processamento configurável e validação robusta por campo."
coverImage: ""
coverAlt: ""
projectType: "IA aplicada a documentos"
outcome: "Reduziu a dependência de coordenadas fixas e tornou a extração mais reaproveitável entre documentos do mesmo layout, mesmo com variações de escaneamento."
role: "Modelagem da estratégia de extração, desenho do fluxo OCR, organização modular do sistema e definição de validações por campo"
stack: ["Python", "PaddleOCR", "OpenCV", "Pydantic", "NumPy", "CLI"]
context: "Em documentos padronizados, o maior custo costuma estar menos no OCR bruto e mais na recalibração constante quando o scan muda de posição, contraste ou alinhamento."
challenge: "Extrair campos confiáveis de laudos semelhantes sem depender de coordenadas absolutas frágeis nem obrigar ajuste manual repetitivo para cada novo documento."
links:
  - kind: repository
    label: "Repositório do projeto"
    href: "https://github.com/eedumarquess/ocr-soc"
---

Este projeto ataca um problema recorrente em OCR operacional: o layout do documento continua o mesmo, mas a imagem nunca chega exatamente igual. Pequenas variações de escaneamento, rotação, contraste e posicionamento quebram com facilidade pipelines baseadas em coordenadas fixas.

## Contexto

Quando a extração depende de caixas rígidas, qualquer pequena diferença no arquivo gera manutenção. O time acaba gastando mais tempo reposicionando campos do que evoluindo a lógica do OCR em si. Em operações que lidam com laudos e formulários padronizados, isso vira um custo recorrente.

A proposta aqui foi montar um sistema em que o layout seja configurado uma vez e reaproveitado depois. Em vez de ancorar a extração em posições absolutas da página, o pipeline encontra referências e recalcula dinamicamente as regiões de interesse a partir delas.

## Processo

A solução foi organizada de forma modular para estabilizar a leitura:

- o projeto usa um sistema de âncoras para compensar variações de escaneamento com base em QR codes, texto ou formas
- as regiões de interesse passam a ser calculadas com coordenadas relativas, não com posições rígidas fixadas na página
- o fluxo inclui pré-processamento configurável com deskew, binarização, denoise e normalização de contraste
- as leituras extraídas podem passar por validações com regex, ranges e regras customizadas por campo
- um editor interativo de ROI permite criar, mover, redimensionar e salvar layouts sem depender de ajuste manual no código
- a estrutura do projeto separa CLI, módulos principais de preprocessing/anchors/OCR, schemas Pydantic e utilitários de geometria e normalização

Esse desenho melhora a robustez da extração porque o OCR deixa de trabalhar sozinho. A qualidade do resultado passa a depender também de localização relativa, preparação da imagem e validação semântica do campo extraído.

## Resultado

O resultado foi um pipeline mais reaproveitável para documentos padronizados, com menos retrabalho a cada novo scan e mais tolerância a variações reais do material recebido.

Do ponto de vista de engenharia, o ganho principal foi trocar uma lógica frágil baseada em coordenadas mágicas por uma estratégia configurável e modular. Isso deixa o sistema melhor preparado para crescer por famílias de layout sem virar manutenção artesanal.
