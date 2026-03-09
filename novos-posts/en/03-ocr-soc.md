---
slug: "ocr-ancoras-rois-relativas"
title: "OCR for reports with anchors and reusable layouts"
date: "2026-03-07"
type: article
tags: ["ocr", "documents", "python"]
summary: "How anchors, relative ROIs, and field validation reduce OCR fragility in standardized documents."
---

OCR in standardized documents usually fails less because of text recognition and more because of geometry. The layout looks the same, but small variations in margin, rotation, and contrast are enough to break extractions based on fixed boxes.

The answer here was to replace rigid coordinates with a strategy where the layout is configured once and reused later. Instead of recalibrating everything for each document, the flow uses anchors, relative ROIs, and field validation to sustain the reading more reliably.

## Context

In OCR applied to reports, the cost is not only in recognizing characters. A large part of the complexity lives in correctly locating where each field sits, even when the document suffers the small distortions that are common in scanned files. Without a smarter positioning strategy, maintenance becomes manual and repetitive work.

In this project, the proposal was to turn the layout into a reusable asset. The system was designed for standardized documents where it is worth calibrating once and reapplying the configuration to multiple similar files.

## Process

The solution combines localization, pre-processing, and validation:

- an ROI editor allows layouts to be created and adjusted interactively, which makes the initial setup easier
- the system uses anchors to compensate for scan variations with support from QR codes, text, or shapes
- regions of interest are calculated with coordinates relative to reference points instead of depending on absolute fixed positions
- pre-processing can apply deskew, binarization, denoise, and contrast normalization before reading
- extracted values go through robust validation with regex, ranges, and custom rules per field
- beyond single-file processing, the project also plans batch processing for multiple scans of the same layout

This design improves reliability because OCR stops being an isolated step. The system also considers where to read, how to normalize the image before reading, and how to validate the extracted result semantically.

## Result

The result was a more stable pipeline for standardized documents, especially when the goal is not just recognizing text, but extracting fields with less operational fragility. The layout stops being a sequence of magic coordinates and becomes a reusable configuration.

From a portfolio perspective, the project shows something valuable: not only the use of OCR, but practical understanding of the real geometry, pre-processing, calibration, and validation problems that appear when this kind of system leaves the experiment stage and touches operational flows.
