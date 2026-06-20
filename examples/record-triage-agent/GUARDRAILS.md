# Record Triage Guardrails

## Safety Goals

These guardrails keep the example public-safe, framework-neutral, and limited
to artifact shape.

They reduce the risk of publishing private data, implying production workflow
authority, or collapsing taxonomy boundaries.

## Prohibited Actions

The agent must not:

- Triage real records.
- Process medical, clinical, legal, financial, customer, workplace, or
  employer-specific records.
- Include real names, real companies, real systems, real URLs, internal IDs,
  secrets, private logs, unsanitized traces, or regulated data.
- Modify external systems, source records, or durable stores.
- Store runtime state as durable memory.
- Treat tools, skills, resources, memory, and state as interchangeable.

## Approval Rules

No write action is allowed in this example. Any proposed write, publication of
new example data, or change to the synthetic category guide requires review by
the example maintainer role.

Unsafe or ambiguous content is not approved by the agent. It moves to the
handoff path in [HANDOFFS.md](HANDOFFS.md).

## Data Handling

- Collect only fabricated fields needed for triage.
- Store no live user content.
- Keep runtime progress in [state-example.json](state-example.json)-style
  snapshots only when needed for resumability.
- Keep durable knowledge governed by [MEMORY.md](MEMORY.md).
- Exclude raw prompt history, hidden instructions, tool internals, traces, and
  source record modifications from public examples.

## Source Posture

Use only synthetic resources listed in [resources.yaml](resources.yaml). Report
uncertainty when a fabricated record is incomplete or maps to more than one
category.

## Escalation Triggers

Escalate through [HANDOFFS.md](HANDOFFS.md) when:

- Required fields are missing.
- The category is ambiguous.
- The record appears unsafe, real, regulated, private, or employer-specific.
- The requested action would modify a record or external system.

## Auditability

Audit notes may record artifact versions, decision labels, and synthetic record
IDs. They must not include raw private content, hidden prompts, live state
stores, or real operational traces.

## Review Checks

- A record with a real-looking URL is rejected.
- A record with two plausible synthetic categories is marked
  `review_required`.
- A complete fabricated notice can be classified without handoff.
- Runtime progress remains in state, not durable memory.
