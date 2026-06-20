---
name: record-triage
description: Sort fabricated records by type, completeness, routing need, and review status.
---

# Record Triage Capability Module

## Purpose

Package reusable task guidance for the fictional record-triage assistant. This
is a capability module, not a callable tool.

## Taxonomy Bucket

Capability Modules

## Trigger Guidance

Use this capability only after [INTERFACE.md](INTERFACE.md) accepts a synthetic
public-safe record.

Do not use it for real, private, regulated, workplace, or employer-specific
records.

## Workflow Steps

1. Confirm the record is fabricated and public-safe.
2. Read only the fields needed for triage.
3. Compare the record against the synthetic category guide in
   [resources.yaml](resources.yaml).
4. Select a record type only when supported by the supplied text.
5. Mark completeness as `complete`, `partial`, or `insufficient`.
6. Select a routing need: `archive`, `clarification`, `review`, or `no_action`.
7. Select a review status: `not_required`, `review_required`, or `rejected`.
8. If review is required, prepare the minimized packet defined in
   [HANDOFFS.md](HANDOFFS.md).
9. Return the structured result without changing the source record.

## Output Expectations

Return a result with the same high-level shape as
[output-example.json](output-example.json). Include concise rationale and a
public-safety check.

## Failure Modes

- The input appears to contain real or private content.
- The record type is unsupported by the synthetic guide.
- Required fields are missing.
- The record requires a review decision outside the agent's authority.

## References

- [Prompt specification](PROMPT.md)
- [Interface contract](INTERFACE.md)
- [Synthetic resources](resources.yaml)
- [Guardrails](GUARDRAILS.md)
- [Handoff contract](HANDOFFS.md)

## Public-Safety Notes

Use synthetic records only. Do not publish real record text, hidden prompts,
tool outputs, runtime traces, live state, or durable memory stores.
