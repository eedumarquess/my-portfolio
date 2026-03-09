---
slug: "document-parser"
title: "Document ingestion pipeline with queues, retries, and DLQ"
summary: "Asynchronous NestJS ingestion backend with multipart upload, PostgreSQL persistence, RabbitMQ messaging, and a dedicated worker for decoupled processing."
coverImage: ""
coverAlt: ""
projectType: "Backend automation"
outcome: "Replaced a synchronous and opaque flow with an observable pipeline, explicit states, controlled retries, and clear separation between ingestion, processing, and failure handling."
role: "Backend architecture, ingestion contract design, state modeling, RabbitMQ integration, and worker structuring"
stack: ["NestJS", "TypeScript", "RabbitMQ", "PostgreSQL", "TypeORM", "Docker"]
context: "The need was to receive uploaded documents, persist metadata, and process files outside the request lifecycle without losing traceability across the full cycle."
challenge: "Build a reliable foundation for asynchronous ingestion with retries, DLQ, healthcheck, and status tracking without mixing heavy processing into the intake layer."
links:
  - kind: repository
    label: "Project repository"
    href: "https://github.com/eedumarquess/document-parser"
---

This pipeline separates ingestion and processing from the first step. The API receives the upload, persists metadata, publishes the job for asynchronous execution, and keeps the full cycle traceable without loading the request with heavy processing.

## Context

In many internal flows, the document arrives via upload and the system immediately tries to do everything at once. That usually over-couples intake and processing, increases response time, and makes failures harder to identify when something breaks in the middle.

Here, the proposal was to separate responsibilities from the start. The API receives and records. The queue distributes. The worker processes. The database preserves state. This design reduces operational friction and creates a better base to grow later with OCR, classification, validation, or other document intelligence stages.

## Process

The architecture was designed as a local asynchronous pipeline:

- the API exposes `POST /documents` for multipart upload of files such as `pdf`, `doc`, `docx`, and `txt`
- document metadata is persisted in PostgreSQL before the message is published
- RabbitMQ distributes work to a main queue consumed by a dedicated worker
- consumption uses `prefetch=5`, avoiding simple worker overload during processing
- failures are handled with a retry queue using a 10-second TTL before being sent to the DLQ after three attempts
- the API exposes `GET /documents/:id` to track item status throughout the flow
- the `GET /health` endpoint verifies PostgreSQL and RabbitMQ availability
- structured JSON logs maintain observability in both the API and the worker

This design reduces silent failures and keeps the document in a known state at all times. Instead of disappearing in the middle of execution, each item remains traceable as `QUEUED`, `PROCESSING`, `PROCESSED`, `FAILED`, or `DLQ`.

## Result

The result was a more predictable foundation for document ingestion. Intake became faster and processing stopped depending on request duration, while retries and DLQ created an explicit path for error handling.

From an engineering perspective, the main gain was structuring the start of the pipeline correctly. That makes the system easier to operate, debug, and extend when new stages become part of the document lifecycle.
