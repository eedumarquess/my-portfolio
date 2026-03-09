---
slug: "trade-offs-ingestao-assincrona-documentos"
title: "Document ingestion pipeline with queues, retries, and DLQ"
date: "2026-03-08"
type: article
tags: ["backend", "queues", "document processing"]
summary: "Why separating upload and processing changes the reliability of a document pipeline built with RabbitMQ, retries, and DLQ."
---

Upload and processing do not need to share the same request for a pipeline to work. This project starts from that separation: the API receives the document, stores the metadata, publishes the message, and leaves the heavy work to a dedicated worker.

The architecture was designed to avoid the flow where a file enters the system and disappears inside synchronous logic that is hard to operate. Instead, the document gains explicit state, controlled retries, and a clear path for handling failures.

## Context

In real scenarios, documents arrive from different channels, in multiple formats, and usually need follow-up afterward. When ingestion and processing are trapped inside the same request, any instability turns into timeouts, silent failures, or operational rework.

The architecture here was designed specifically to avoid that. The backend receives the document, persists the metadata in PostgreSQL, and publishes the message to RabbitMQ. From there, a worker consumes the main queue and executes the flow without blocking the intake experience.

## Process

The pipeline was structured around explicit states and recovery:

- the API receives multipart files and accepts formats such as `pdf`, `doc`, `docx`, and `txt`
- metadata is persisted in PostgreSQL at the moment of intake, ensuring identity and traceability for the document
- publishing to RabbitMQ moves processing outside the HTTP request
- a dedicated worker consumes the main queue with controlled `prefetch` to avoid unnecessary overload
- failures go through retries with backoff in a dedicated queue before moving to the DLQ after the retry limit
- query endpoints allow the document status to be tracked throughout the flow
- a healthcheck endpoint verifies PostgreSQL and RabbitMQ, keeping the application more transparent in operation

This design avoids the kind of automation that "works until it does not." Instead of relying on scattered logs or manual inference to discover where an item stopped, the document becomes part of a simple and objective set of known states.

## Result

The result was a more robust foundation for any later OCR, classification, extraction, or validation pipeline. Even as a lean base, it already solves important problems around decoupling, traceability, and fault tolerance.

From an engineering perspective, the main gain was structural. The project shows control over a stage that many teams treat as a detail, but in practice defines the reliability of everything that comes after it: receiving, persisting, queuing, retrying, and isolating errors without collapsing the API.
