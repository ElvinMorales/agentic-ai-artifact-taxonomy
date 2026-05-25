# State Strategy Template

## Purpose

Define how execution state is handled for a run, thread, workflow, or session.

## Taxonomy Bucket

State

## Required Fields

- Definition of state
- Definition of what state is not
- State artifact examples
- Public commit guidance
- Runtime-only guidance
- Replay, resume, and debugging considerations

## Optional Fields

- Checkpoint cadence
- State schema references
- Redaction rules
- Expiration rules

## What State Is

State is a runtime snapshot used to continue, replay, inspect, or debug a
specific execution. It may include current task progress, pending approvals,
temporary inputs, tool results, checkpoint IDs, or workflow position.

## What State Is Not

State is not memory. It should not become durable cross-session knowledge unless
it passes the memory policy review process.

State is also not a design-time policy, persona, or capability module.

## Example State Artifacts

- Run checkpoint
- Task queue position
- Pending approval record
- Tool-call result summary
- Workflow resume token

## What Can Be Committed Publicly

- State strategy documents
- State schemas
- Synthetic examples
- Redacted examples created only for documentation

## What Should Remain Runtime-Only

- Real state snapshots
- Unsanitized tool results
- Private workspace paths
- Real user inputs
- Approval records containing private context
- Debug traces with sensitive data

## Replay and Resume Considerations

Define what is needed to resume a run without storing private data. Prefer
stable IDs, sanitized summaries, and explicit checkpoint schemas over raw logs.

## Debugging Considerations

Debug artifacts should identify failure points without exposing private runtime
content. Use redaction, minimization, and synthetic reproduction cases.

## Usage Notes

Keep state strategy separate from memory policy. Runtime state can support
continuation, but durable memory supports future reuse.

## Public-Safety Notes

Public repos should not contain real runtime state snapshots, trace dumps,
private prompt transcripts, or raw tool outputs.
