---
name: record-triage
description: Classify a synthetic record using a published category list and route ambiguous cases for review.
---

# Record Triage Skill

## Purpose

Package reusable task guidance for classifying records and routing ambiguous
cases. This template maps to the capability modules bucket.

## Taxonomy Bucket

Capability modules

## Required Fields

- YAML frontmatter with `name` and `description`
- Trigger guidance
- Workflow steps
- Output expectations

## Optional Fields

- References
- Scripts
- Assets
- Examples
- Known failure modes

## When to Use

Use this skill when asked to classify a synthetic or sanitized record using an
approved category list and published decision rules.

## Workflow

1. Confirm the record is synthetic or sanitized and identify the approved
   category list.
2. Inspect only the fields needed for classification.
3. Compare the available evidence with the published decision rules.
4. Select a category only when the evidence supports it.
5. If the record is ambiguous, prepare a minimized handoff with the record ID,
   short summary, candidate categories, and relevant public rule.
6. Return the category or review status with a concise rationale.

## Output Expectations

Return a structured triage result that clearly distinguishes classified,
review-required, and rejected records. Include the applied rule and avoid
changing the source record.

## References

- `../examples/handoffs.yaml`
- `../examples/output-example.json`
- `../docs/public-safety.md`

## Scripts

Optional helper scripts may live in a `scripts/` directory when they have a
clear maintenance purpose.

## Assets

Optional examples or fixtures may live in an `assets/` or `examples/`
directory. Use synthetic data only.

## Usage Notes

`SKILL.md` maps naturally to skill-bundle conventions in some agent frameworks,
but this template is framework-neutral. A skill explains how to perform a task;
a tool is a callable action or external capability.

## Public-Safety Notes

Do not include real user records, internal category rules, private handoff
content, or unsanitized runtime outputs in a public skill module.
