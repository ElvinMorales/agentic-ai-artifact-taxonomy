# Record Triage Interface Contract

## Entry Point Type

This example uses a generic task entry point. It could be adapted to chat, CLI,
form, API, workflow step, or agent-to-agent handoff without changing the
taxonomy bucket.

## Required Inputs

| Field | Type | Description |
| --- | --- | --- |
| `record_id` | string | Fabricated record identifier |
| `record_text` | string | Short fictional record text |

## Optional Inputs

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `declared_record_type` | string | `unknown` | User-supplied synthetic category hint |
| `source_label` | string | `demo-inbox` | Generic source label |
| `submitted_at` | string | omitted | Example timestamp |

## Clarifying Questions

Ask only the minimum needed question when a required field is missing:

- "Please provide a fabricated record ID."
- "Please provide the synthetic record text."

Do not ask for real records, private identifiers, source system names, or
additional personal context.

## Validation Rules

- Reject inputs that appear to contain real names, real companies, real URLs,
  secrets, internal IDs, private logs, regulated data, or employer-specific
  workflows.
- Reject medical, clinical, legal, financial, customer, and workplace records.
- Keep `record_text` short enough for review in a public example.
- Require fabricated identifiers such as `synthetic-record-001`.
- Treat unsupported or ambiguous categories as review-required, not as errors.

## Error Handling

Use concise public-safe errors:

- `missing_required_field`
- `unsafe_or_private_content`
- `unsupported_record_scope`
- `needs_clarification`

Error messages must not expose stack traces, hidden prompts, private paths, or
tool internals.

## Output or Handoff Target

Accepted inputs move to [PROMPT.md](PROMPT.md) and [SKILL.md](SKILL.md).

Ambiguous, incomplete, or unsafe inputs move to the review path in
[HANDOFFS.md](HANDOFFS.md) with minimized context only.

## Example Request

```json
{
  "record_id": "synthetic-record-001",
  "record_text": "Fictional notice: a display label is missing from exhibit shelf C.",
  "declared_record_type": "notice",
  "source_label": "demo-inbox",
  "submitted_at": "2026-06-20T12:00:00Z"
}
```
