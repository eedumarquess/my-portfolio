---
slug: "arquitetura-ai-content-engine"
title: "Content engine with asynchronous orchestration and local RAG"
date: "2026-03-09"
type: article
tags: ["applied ai", "rag", "architecture"]
summary: "How to structure an AI MVP with a NestJS orchestrator, Python workers, local RAG, and reproducible infrastructure."
---

Applied AI starts getting serious when generation, context, and execution stop living in isolated scripts. The goal here was to build an MVP where the backend, workers, RAG, and local infrastructure are already explicit parts of the system.

The central point was not just generating text. It was building a foundation where orchestration, agent execution, and semantic memory could evolve with clear contracts, persistence, and a reproducible environment.

## Context

AI projects usually fail less because of the model and more because of the surrounding system. Without a clear contract between stages, without persistence for what was generated, and without a minimally structured retrieval layer, the system becomes a fragile black box that is hard to operate.

The idea here was to assemble an MVP that already feels like a product from the ground up. The repository already separates the NestJS orchestrator, the Python workers, and the local infrastructure responsible for bringing up services such as the database, messaging, local models, and retrieval components. That makes it clear the goal was not only to test generation, but to organize the architecture so it could evolve.

## Process

The architecture was designed in complementary layers:

- a NestJS orchestrator centralizes the foundation of the main service and opens space for flow coordination
- Python workers isolate specialized processing, avoiding the entire AI workflow from being coupled to the HTTP backend
- the local infrastructure brings up PostgreSQL, RabbitMQ, Ollama, and auxiliary retrieval services to keep the environment reproducible
- a bootstrap service prepares the database, applies migrations, seeds initial data, and generates real embeddings for `persona` and `knowledge`
- the consolidated documentation organizes the MVP design and lowers the cost of future expansion

This design solves an important problem: as generation grows, the backend stops being just an API and becomes a coordinator of states, stages, and integrations. By separating responsibilities from the beginning, the project gains architectural clarity and more room to evolve with less rework.

## Result

The result was a stronger foundation for applied AI, especially for an MVP that is still early but already starts with the right concerns. Instead of being trapped in an improvised prototype, the project organizes the ground for observability, persistence, retrieval, and flow expansion.

From a portfolio perspective, it shows more than "I used AI." It shows the ability to structure a coherent system with backend services, workers, local infrastructure, and a semantic foundation, which is where many AI projects actually differentiate themselves.
