# Agent Artifact Template Pack

This directory contains starter templates for common agentic AI artifacts.
They are framework-neutral and use synthetic, public-safe examples.

Each template maps to one of the 14 taxonomy buckets in
[docs/taxonomy.md](../docs/taxonomy.md).

## Templates

| Template | Taxonomy bucket | Lifecycle |
| --- | --- | --- |
| [agent.yaml](agent.yaml) | Identity | Design-time |
| [persona.md](persona.md) | Identity | Design-time |
| [principles.md](principles.md) | Operating style | Design-time |
| [SKILL.md](SKILL.md) | Capability modules | Design-time, iteration |
| [tools.yaml](tools.yaml) | Tools | Design-time, runtime |
| [resources.yaml](resources.yaml) | Knowledge and resources | Design-time, runtime |
| [memory-policy.yaml](memory-policy.yaml) | Memory | Runtime, iteration |
| [state-strategy.md](state-strategy.md) | State | Runtime |
| [output.schema.json](output.schema.json) | Outputs and schemas | Design-time, runtime |
| [eval-rubric.md](eval-rubric.md) | Evaluation and observability | Runtime, iteration |

## How to Use

Copy the relevant template into your own project and replace the example
values with project-specific, public-safe content. Keep artifacts small enough
to review and version independently.

Use these templates together with:

- [Artifact lifecycle](../docs/artifact-lifecycle.md)
- [Memory vs state](../docs/memory-vs-state.md)
- [Public-safety guidance](../docs/public-safety.md)

## Public-Safety Notes

Do not publish secrets, credentials, private project names, employer-specific
details, real memory stores, unsanitized runtime traces, private state
snapshots, or regulated data.

Use generic examples and synthetic data. If an artifact comes from a real
system, sanitize and review it before committing it to a public repo.
