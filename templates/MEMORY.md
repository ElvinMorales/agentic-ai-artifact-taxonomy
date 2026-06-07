# Durable Memory Guide Template

## Purpose

Define a human-readable operating guide and index for durable knowledge that
may be reused across sessions or tasks.

## Taxonomy Placement

Memory

## When to Use

Use this template to explain what may be remembered, how approved memory is
stored and retrieved, and how it is corrected or deleted. Use
`memory-policy.yaml` when these rules also need a structured policy format.

## Required Sections

- What may be remembered
- What must not be remembered
- Storage rules
- Retrieval rules
- Review and expiry
- Correction and deletion process
- Synthetic example entries

## Optional Sections

- Consent requirements
- Memory classes
- Provenance fields
- Confidence rules
- Audit process
- Migration notes

## Guide

### What May Be Remembered

List durable, useful, approved classes such as stable public project
conventions or explicitly provided non-sensitive preferences.

### What Must Not Be Remembered

Exclude secrets, regulated data, private personal data without consent,
transient execution state, and unsanitized logs or traces.

### Storage Rules

Define approved locations, access roles, minimum fields, and encryption or
protection expectations without including secret values.

### Retrieval Rules

State when memory may be retrieved, how relevance is checked, and when an entry
must be ignored.

### Review and Expiry

Define review cadence, expiration conditions, and stale-entry handling.

### Correction and Deletion Process

Explain who may request a correction or deletion and how completion is
recorded without retaining deleted content.

### Synthetic Example Entries

Use fabricated entries that demonstrate the schema without representing a real
person, organization, or system.

## Public-Safety Notes

- Public repos should contain policies, guides, schemas, and synthetic entries,
  not live memory stores.
- Do not include secrets, real preferences, private facts, regulated data, or
  unsanitized runtime content.
- Keep durable memory separate from run, thread, workflow, and session state.

## Minimal Synthetic Example

| Class | Value | Provenance | Review |
| --- | --- | --- | --- |
| Project convention | Use ISO dates in public examples. | Public project guide | Review before release |
| Output preference | Prefer concise synthetic status summaries. | Explicit synthetic request | Expire after 90 days |

## Validation Checklist

- [ ] Allowed and disallowed memory classes are explicit.
- [ ] Storage and retrieval rules use least-necessary access.
- [ ] Review, expiry, correction, and deletion are defined.
- [ ] Entries require provenance and an owner or review rule.
- [ ] Runtime state is not treated as durable memory.
- [ ] All examples are synthetic and safe for a public repository.

## Related Artifacts

- `memory-policy.yaml` for structured memory policy
- `state-strategy.md` for runtime state handling
- `GUARDRAILS.md` for privacy and approval rules
- Memory schema or sanitized example guidance
- `ITERATION.md` for lessons proposed as future durable guidance
