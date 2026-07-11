---
name: record-triage
description: Classify fabricated incoming records with public synthetic rules. Use when demonstrating deterministic triage and human review for ambiguous examples.
license: MIT
compatibility: No network access or external tools are required.
metadata:
  example-kind: synthetic
  version: "0.1.0"
---

# Record Triage

## When to Use

Use this capability module only for fictional records in taxonomy examples.

## Input Boundaries

Require a synthetic record ID, short fabricated summary, and no private,
regulated, workplace, customer, or user data. Reject real operational records.

## Workflow

1. Read [the category rules](references/category-rules.md).
2. Compare the fabricated summary with every rule.
3. Select one category only when exactly one rule matches.
4. Otherwise return `needs-review` and request human review.
5. Format the result using the
   [static result template](assets/triage-result-template.json).

## Output and Handoff

Return the record ID, status, category, applied rule, concise rationale, and
`requires_human_review`. For missing or conflicting evidence, do not guess;
mark the result `needs-review` and identify the ambiguity for a human reviewer.

## Failure Conditions

Stop when input is real, private, outside the documented categories, or lacks
enough fabricated evidence. This package does not invoke tools, access a
network, modify files, or modify source records.

## Public Safety

Use only fictional records and public synthetic categories. Do not retain
input, publish runtime state, or infer consequential decisions.
