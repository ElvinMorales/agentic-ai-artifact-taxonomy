# Public-Safe Example Pack

This directory contains small, synthetic examples of agentic AI artifact
shapes. They are educational fixtures, not production records or complete
implementations.

All names, identifiers, URLs, tasks, and content are fabricated. Do not replace
them with secrets, private user content, live memory, raw traces, production
state, internal endpoints, or employer-specific material in a public repo.

## Example Index

| Example | Taxonomy bucket or buckets | What it demonstrates |
| --- | --- | --- |
| [agent-card.json](agent-card.json) | Identity; Capability modules; Prompts and interfaces; Runtime and deployment; Guardrails and governance | A synthetic A2A-style discovery manifest and protocol adapter shape |
| [record-triage-agent/](record-triage-agent/README.md) | Identity; Prompts and interfaces; Capability modules; Tools; Knowledge and resources; Memory; State; Planning and orchestration; Guardrails and governance; Outputs and schemas; Evaluation and observability | A connected public-safe example pack showing multiple artifact classes working together |
| [handoffs.yaml](handoffs.yaml) | Planning and orchestration; State; Guardrails and governance | A minimized handoff contract with authority and failure boundaries |
| [memory-example.md](memory-example.md) | Memory; Guardrails and governance | Allowed and disallowed durable memory classes with synthetic entries |
| [state-example.json](state-example.json) | State; Planning and orchestration | A sanitized run snapshot with pending work and handoff status |
| [output-example.json](output-example.json) | Outputs and schemas | A small structured result compatible with the output schema template |
| [../evals/cases.jsonl](../evals/cases.jsonl) | Evaluation and observability | Four synthetic behavior checks for key taxonomy boundaries |
| [../observability/trace-schema.json](../observability/trace-schema.json) | Evaluation and observability; State | A schema for sanitized trace-like events, not a production trace |
| [sanitized-agent-system-tree.md](sanitized-agent-system-tree.md) | Cross-cutting | A public-safe repository layout |

## How to Use These Examples

Use the examples to understand artifact boundaries and adapt their shape. They
intentionally omit production concerns such as complete protocol compliance,
authentication setup, storage backends, retention automation, and operational
telemetry.

Related starter templates:

- [Connected record-triage example](record-triage-agent/README.md)
- [Handoff contract](../templates/HANDOFFS.md)
- [Durable memory guide](../templates/MEMORY.md)
- [State strategy](../templates/state-strategy.md)
- [Output schema](../templates/output.schema.json)
- [Evaluation rubric](../templates/eval-rubric.md)

## Optional Reference Schemas

The [state schema](../schemas/state.schema.json) and
[handoff schema](../schemas/handoff.schema.json) describe the synthetic
examples in this directory. They are small reference shapes for education and
local adaptation, not production runtime standards, orchestration protocols,
or claims of cross-framework compatibility.

The state schema keeps runtime execution snapshots separate from durable
memory, final outputs, and traces. The handoff schema describes a minimized
transfer contract without defining a workflow engine or durable memory format.

Review [public-safety guidance](../docs/public-safety.md) before publishing any
adapted examples.
