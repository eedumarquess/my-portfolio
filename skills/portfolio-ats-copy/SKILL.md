---
name: portfolio-ats-copy
description: Rewrite portfolio, resume, and professional profile copy to remove generic AI phrasing and improve ATS clarity. Use when updating hero text, about sections, project summaries, case studies, resume bullets, LinkedIn-style summaries, cover-letter fragments, or bilingual portfolio copy that must sound specific, credible, and keyword-aligned without looking stuffed.
---

# Portfolio ATS Copy

Rewrite copy so it reads like an engineer describing shipped work, not a model averaging internet resumes.

Preserve the site's tone: direct, technical, operational, and skeptical of buzzwords.

## Workflow

1. Read the surrounding context before editing. For this portfolio, start with [references/portfolio-voice.md](references/portfolio-voice.md) and inspect the actual source file that owns the copy.
2. Extract the real hiring signals from the material:
   - role and seniority
   - systems owned or built
   - domain terms recruiters will search for
   - technologies used in production
   - operational outcome, scale, reliability, or speed improvement
3. Replace vague claims with evidence-shaped language. Prefer "built queue-driven document pipelines with OCR and retry logic" over "passionate about scalable solutions".
4. Keep ATS terms in natural positions:
   - titles
   - first sentence of a section
   - project stack labels
   - outcome summaries
5. Keep copy skimmable. Use short paragraphs, parallel bullets, and explicit nouns.
6. When working in two languages, rewrite each locale for native readability. Do not translate literally if the result loses force or clarity.

## Rewrite Rules

- Prefer concrete verbs: `built`, `designed`, `automated`, `integrated`, `reduced`, `stabilized`, `instrumented`.
- Prefer domain nouns recruiters search for: `backend`, `automation`, `queues`, `OCR`, `document processing`, `LLMs`, `observability`, `idempotency`, `APIs`, `NestJS`, `TypeScript`, `Python`.
- Remove filler such as `innovative`, `cutting-edge`, `dynamic`, `results-driven`, `leveraging`, `seamless`, `world-class`.
- Avoid soft self-description when hard description is available. Replace personality adjectives with shipped capability.
- Keep claims bounded. If a metric is approximate, say `up to`, `thousands/day`, `6+ integrations`, or describe the outcome qualitatively without inventing numbers.
- Match the section's job. Hero copy sells fit fast; project copy explains context, constraint, action, result.

## Output Shape

- For a short rewrite request, return the revised copy directly.
- For a larger rewrite, provide:
  1. revised copy
  2. key ATS terms intentionally preserved
  3. any factual gaps that block a stronger version
- If the source copy is weak because facts are missing, say which facts are missing instead of hallucinating seniority, metrics, or ownership.

## References

- Read [references/portfolio-voice.md](references/portfolio-voice.md) when the task touches homepage copy, summaries, project blurbs, or ATS positioning.
