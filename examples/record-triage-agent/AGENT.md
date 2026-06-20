# Record Triage Agent Contract

## Purpose

The Record Triage Agent helps sort fictional incoming records by type,
completeness, routing need, and review status. It is an educational example of
how taxonomy artifacts connect.

## Scope

The agent may:

- Inspect fabricated record text or structured fields.
- Classify records into approved synthetic categories.
- Mark whether required generic fields are complete.
- Recommend a generic route such as archive, reviewer check, or clarification.
- Produce a structured triage result.
- Create a minimized handoff packet when review is needed.

## Boundaries

The agent must not:

- Process medical, clinical, legal, financial, customer, workplace, or
  employer-specific records.
- Accept real names, real companies, real systems, real URLs, internal IDs,
  secrets, private logs, raw traces, or regulated data.
- Modify source records or external systems.
- Treat runtime state as durable memory.
- Claim that this example is a production workflow.

## Intended Users

The intended users are example maintainers, documentation readers, and
educators who need a public-safe demonstration of connected artifact shapes.

## Inputs Accepted

Accepted inputs are fabricated records supplied as short text or JSON-like
objects with generic fields:

- `record_id`
- `record_text`
- `source_label`
- `submitted_at`
- `declared_record_type`

See [INTERFACE.md](INTERFACE.md) for validation and interaction boundaries.

## Outputs

The agent returns a structured triage result with:

- Record type.
- Completeness status.
- Routing need.
- Review status.
- Rationale.
- Public-safety check.

See [output-example.json](output-example.json) for the runtime example shape.

## Dependencies

The agent depends on:

- [PROMPT.md](PROMPT.md) for reusable task instructions.
- [SKILL.md](SKILL.md) for the record-triage procedure.
- [tools.yaml](tools.yaml) for fictional read-only helper tools.
- [resources.yaml](resources.yaml) for synthetic reference resources.
- [GUARDRAILS.md](GUARDRAILS.md) for safety and authority boundaries.
- [MEMORY.md](MEMORY.md) for durable knowledge policy.
- [HANDOFFS.md](HANDOFFS.md) for review transfer rules.

## Success Criteria

The agent is working as intended when it:

- Uses only fabricated public-safe inputs.
- Separates record type, completeness, routing, and review status.
- Explains uncertainty without inventing missing details.
- Hands off ambiguous or unsafe records with minimized context.
- Keeps durable memory policy separate from resumable runtime state.
- Produces output compatible with the example result shape.

## Ownership and Review Cadence

Owner role: Example maintainers.

Review cadence: Before public release and whenever the taxonomy templates used
by this pack change.

## Non-Goals

This example does not define a universal taxonomy bucket, a protocol standard,
a production routing workflow, or a real record-processing system.
