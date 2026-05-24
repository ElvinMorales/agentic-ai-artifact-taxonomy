---
name: artifact-review
description: Review an agentic AI artifact for taxonomy alignment, clarity, and public safety.
---

# Artifact Review Skill

## Purpose

Package reusable task guidance for reviewing an artifact. This template maps to
the capability modules bucket.

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

Use this skill when asked to review a draft artifact, starter template, schema,
or documentation file for taxonomy alignment and public-safe publication.

## Workflow

1. Identify the artifact type and mapped taxonomy bucket.
2. Check whether the artifact mixes separate concepts, such as memory and
   state, skills and tools, or runtime records and design-time policy.
3. Review required fields, examples, and usage notes for clarity.
4. Check for secrets, private data, unsanitized traces, real memory stores,
   private state snapshots, and proprietary names.
5. Return concise findings with file references and suggested fixes.

## Output Expectations

Return findings first, ordered by severity. Include a short summary only after
the findings.

## References

- `docs/taxonomy.md`
- `docs/memory-vs-state.md`
- `docs/public-safety.md`

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

Do not include private review examples, internal policies, customer content, or
unsanitized runtime outputs in a public skill module.
