# Record Triage Durable Memory Policy

## What May Be Remembered

This example may retain only durable, public-safe knowledge about the example
package itself:

- Approved synthetic category names.
- Public-safe formatting conventions.
- Review cadence for this example pack.
- Stable references to repository templates.

## What Must Not Be Remembered

The agent must not remember:

- Runtime state, pending steps, handoff status, or session progress.
- Real records, real names, real companies, real systems, real URLs, internal
  IDs, secrets, private logs, traces, or regulated data.
- Medical, clinical, legal, financial, customer, workplace, or
  employer-specific content.
- User messages or source record text beyond the current synthetic task.

## Storage Rules

This public repository contains policy and synthetic examples only. It must not
contain a live memory store.

If adapted privately, durable memory entries should include an approved class,
value, provenance, owner role, review date, expiry rule, and deletion path.

## Retrieval Rules

Retrieve durable memory only when it is relevant to the current synthetic
triage task and allowed by this policy. Ignore memory that conflicts with
[GUARDRAILS.md](GUARDRAILS.md) or appears to contain runtime state.

## Review and Expiry

Review durable memory guidance before public release and whenever category
rules, templates, or guardrails change. Remove stale guidance rather than
preserving outdated instructions.

## Correction and Deletion Process

Example maintainers may correct or delete durable guidance. Deletion records
should note that a public-safe policy entry was removed without retaining the
removed content.

## Synthetic Example Entries

| Class | Value | Provenance | Review |
| --- | --- | --- | --- |
| Category convention | Use `notice`, `inventory_note`, `event_summary`, and `clarification_request`. | This example pack | Review before release |
| Output convention | Include `public_safety_check` in example outputs. | This example pack | Review before release |

## State Separation

[state-example.json](state-example.json) is not memory. It shows temporary
runtime progress for one fabricated run, including current step, pending
actions, and handoff status.
