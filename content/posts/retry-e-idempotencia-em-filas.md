---
title: "Padrões de retry e idempotência em filas"
date: "2025-02-18"
type: article
tags: ["filas", "mensageria", "resiliência"]
summary: "Como desenhar consumidores de fila que falham de forma segura e não duplicam efeitos colaterais."
---

Quando você consome mensagens de uma fila, duas coisas precisam estar claras: **o que fazer quando o processamento falha** e **o que acontece se a mesma mensagem for processada mais de uma vez**.

## Retry com backoff

Recomendo retry com backoff exponencial e um limite máximo de tentativas. Depois disso, a mensagem vai para uma dead-letter queue (DLQ) ou fila de reprocessamento manual. O importante é não ficar reenviando a mesma mensagem indefinidamente para a fila principal — isso esconde o problema e enche a fila.

## Idempotência no consumidor

O broker pode entregar a mesma mensagem duas vezes (at-least-once). Se o seu consumidor faz uma ação que não é idempotente — por exemplo, debitar um saldo ou enviar um e-mail — você precisa de uma chave de idempotência. Processar duas vezes com a mesma chave deve resultar no mesmo efeito que processar uma vez.

Formas comuns:

- **Chave na própria mensagem** (ex.: `request_id`) e uma tabela ou cache onde você registra "já processei este request_id". Se já processou, ignora ou devolve sucesso sem refazer a ação.
- **Condição no banco**: "só insira se não existir" ou "atualize com WHERE versão = X". Assim, a segunda execução não altera o estado de novo.

Com retry disciplinado e idempotência no consumidor, filas viram uma base previsível para pipelines assíncronos.
