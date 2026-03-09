---
slug: "ocr-soc"
title: "OCR with anchors and reusable layouts for standardized documents"
summary: "Modular OCR system for standardized reports with relative ROIs, reference anchors, configurable pre-processing, and robust field-level validation."
coverImage: ""
coverAlt: ""
projectType: "Applied AI for documents"
outcome: "Reduced dependence on fixed coordinates and made extraction more reusable across documents with the same layout, even when scans vary."
role: "Extraction strategy modeling, OCR flow design, modular system organization, and field-level validation design"
stack: ["Python", "PaddleOCR", "OpenCV", "Pydantic", "NumPy", "CLI"]
context: "In standardized documents, the highest cost is usually not raw OCR itself, but constant recalibration when the scan shifts in position, contrast, or alignment."
challenge: "Extract reliable fields from similar reports without depending on fragile absolute coordinates or forcing repetitive manual adjustment for every new document."
links:
  - kind: repository
    label: "Project repository"
    href: "https://github.com/eedumarquess/ocr-soc"
---

This project tackles a recurring operational OCR problem: the document layout stays the same, but the image never arrives exactly the same way. Small variations in scan quality, rotation, contrast, and positioning easily break pipelines based on fixed coordinates.

## Context

When extraction depends on rigid boxes, any small difference in the file creates maintenance work. The team ends up spending more time repositioning fields than evolving the OCR logic itself. In operations that deal with standardized reports and forms, that becomes a recurring cost.

The proposal here was to build a system where the layout is configured once and reused afterward. Instead of anchoring extraction to absolute page positions, the pipeline finds references and dynamically recalculates regions of interest from them.

## Process

The solution was organized modularly to stabilize reading:

- the project uses an anchor system to compensate for scan variations based on QR codes, text, or shapes
- regions of interest are calculated with relative coordinates instead of rigid positions fixed on the page
- the flow includes configurable pre-processing with deskew, binarization, denoise, and contrast normalization
- extracted readings can pass through validation with regex, ranges, and custom rules per field
- an interactive ROI editor allows layouts to be created, moved, resized, and saved without manual adjustment in code
- the project structure separates the CLI, main preprocessing/anchors/OCR modules, Pydantic schemas, and geometry and normalization utilities

This design improves extraction robustness because OCR no longer works alone. Result quality also depends on relative localization, image preparation, and semantic validation of the extracted field.

## Result

The result was a more reusable pipeline for standardized documents, with less rework on each new scan and more tolerance to real-world variation in received material.

From an engineering perspective, the main gain was replacing fragile logic based on magic coordinates with a configurable and modular strategy. That leaves the system better prepared to grow by layout families without turning into handcrafted maintenance.
