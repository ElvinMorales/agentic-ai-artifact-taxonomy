# Record Triage Handoff Contract

## Handoff Purpose

Transfer responsibility when a fabricated record cannot be safely or
confidently triaged by the agent.

## Source

Source role: Record Triage Agent.

## Destination

Destination role: Example reviewer.

The reviewer is a generic review step, not a named person, employer process, or
production queue.

## Trigger Conditions

Create a handoff when:

- Required fields are missing.
- The record maps to multiple synthetic categories.
- The record appears unsafe, real, regulated, private, or employer-specific.
- The requested action would modify source records or external systems.

## Required Context Packet

Include only:

- Fabricated record ID.
- Short sanitized summary.
- Candidate synthetic categories.
- Missing generic fields, if any.
- Public-safety concern label, if any.
- Requested reviewer decision.

Do not include raw private content, real names, real organizations, real URLs,
hidden prompts, traces, durable memory stores, or unrelated run history.

## Authority Transfer

The reviewer may:

- Select one synthetic category.
- Ask for missing fabricated details.
- Reject the item as outside public-safe scope.

The reviewer may not:

- Modify the source record.
- Approve publication of real or private content.
- Add production workflow rules.

## Return Conditions

The handoff returns one of:

- `category_selected`
- `clarification_requested`
- `rejected_out_of_scope`

The return payload includes the decision label, short rationale, reviewer role,
and timestamp.

## Failure and Timeout Handling

If the review step does not return a decision, keep the task in runtime state
as `waiting_for_review`. Do not promote pending handoff status into durable
memory.

If the handoff payload is found to contain unsafe content, reject it and record
only a sanitized failure label.

## Audit Notes

Audit metadata may include synthetic IDs, artifact versions, and decision
labels. It must not include raw private data or live runtime traces.

## Synthetic Handoff Packet

```json
{
  "handoff_id": "synthetic-handoff-001",
  "record_id": "synthetic-record-001",
  "summary": "Fabricated record could be either an inventory note or notice.",
  "candidate_categories": [
    "notice",
    "inventory_note"
  ],
  "public_safety_concern": null,
  "requested_decision": "select_category_or_request_clarification"
}
```
