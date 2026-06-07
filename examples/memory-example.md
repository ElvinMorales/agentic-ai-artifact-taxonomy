# Synthetic Durable Memory Example

This file demonstrates a durable memory guide and a few fabricated entries. It
is not a live memory store. Public repositories should publish policies,
schemas, and synthetic examples rather than retained user or runtime data.

## Allowed Memory Classes

- Stable public project conventions with documented provenance.
- Explicitly approved, non-sensitive output preferences.
- Reviewed corrections that remain useful across future tasks.

## Disallowed Memory Classes

- Secrets, credentials, tokens, private keys, or private endpoints.
- Personal, regulated, employer-specific, or client-specific information.
- Raw prompts, user messages, tool outputs, logs, or traces.
- Current plans, pending actions, checkpoints, or other runtime state.
- Inferences that were not explicitly reviewed and approved for retention.

## Synthetic Entries

| ID | Class | Value | Provenance | Review or expiry |
| --- | --- | --- | --- | --- |
| `memory_example_001` | Project convention | Use ISO 8601 dates in synthetic records. | Public example guide | Review before each release |
| `memory_example_002` | Output preference | Return concise status summaries for example tasks. | Explicit synthetic request | Expire after 90 days |
| `memory_example_003` | Reviewed correction | Do not classify pending handoffs as completed work. | Synthetic eval result | Review after rubric changes |

## Memory Is Not State

Memory contains durable knowledge intended for future reuse. State contains the
execution snapshot for a specific run, task, thread, or workflow. For example,
the convention to use ISO dates may be memory; the current category candidate
and pending reviewer handoff are state.

See [state-example.json](state-example.json) for a separate synthetic runtime
state shape and [the memory guide template](../templates/MEMORY.md) for policy
questions.

## Publication Boundary

Do not commit a real memory database, retained user profile, hidden instruction
file, or exported memory service response. Replace operational content with a
small fabricated example and review it against
[public-safety guidance](../docs/public-safety.md).
