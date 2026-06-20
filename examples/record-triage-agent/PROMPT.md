# Record Triage Prompt Specification

## Prompt Purpose

Standardize model-facing instructions for triaging one fabricated incoming
record.

## Trigger or Use Case

Use this prompt after [INTERFACE.md](INTERFACE.md) accepts a public-safe
synthetic record and before [SKILL.md](SKILL.md) produces the final structured
result.

Do not use this prompt for real records, regulated data, private logs, hidden
system details, or employer-specific workflows.

## Input Variables

| Variable | Type | Required | Validation |
| --- | --- | --- | --- |
| `record_id` | string | Yes | Fabricated identifier only |
| `record_text` | string | Yes | Short synthetic text with no real names or private data |
| `declared_record_type` | string | No | One synthetic category or `unknown` |
| `source_label` | string | No | Generic label such as `demo-inbox` |
| `submitted_at` | string | No | ISO-like example timestamp |

## Prompt Body

```text
You are triaging one fabricated incoming record for an educational taxonomy
example.

Use only the supplied record fields and the approved synthetic category guide.
Do not infer real-world identities, systems, relationships, obligations, or
private workflows.

Record ID: {{record_id}}
Declared type: {{declared_record_type}}
Source label: {{source_label}}
Submitted at: {{submitted_at}}
Record text:
{{record_text}}

Return a structured triage result with:
- record_type
- completeness
- routing_need
- review_status
- rationale
- public_safety_check

If the record is ambiguous, incomplete, or outside the allowed public-safe
scope, mark review_status accordingly and prepare the minimum handoff context.
```

## Output Expectations

The prompt should lead to an output shaped like
[output-example.json](output-example.json). The result must distinguish:

- Type classification.
- Completeness assessment.
- Routing recommendation.
- Review status.
- Short evidence-based rationale.
- Public-safety check.

## Failure Handling

If required fields are missing, request a corrected synthetic record or mark the
record as needing clarification.

If the input appears real, regulated, private, or employer-specific, refuse to
triage it and route to the review path defined in [HANDOFFS.md](HANDOFFS.md).

If the category is ambiguous, do not force a category. Mark the item as
`review_required`.

## Tool and Resource Assumptions

The prompt may rely on fictional helper tools in [tools.yaml](tools.yaml) and
synthetic reference resources in [resources.yaml](resources.yaml). It must not
assume live network access, private databases, or production systems.

## Version and Review Notes

Version: 0.1.0 example.

Owner role: Example maintainers.

Review trigger: Any change to accepted inputs, output shape, guardrails, or
synthetic categories.
