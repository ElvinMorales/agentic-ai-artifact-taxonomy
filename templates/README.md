# Agent Artifact Template Pack

This directory contains starter templates for common agentic AI artifacts.
They are framework-neutral and use synthetic, public-safe examples.

The current pack contains 10 starter templates. Each template maps to one of
the stable 14 taxonomy buckets in [docs/taxonomy.md](../docs/taxonomy.md).
The pack is intentionally partial and does not imply that uncovered buckets
are less important.

## Templates

| Template | Taxonomy bucket | Format | Lifecycle |
| --- | --- | --- | --- |
| [agent.yaml](agent.yaml) | Identity | Machine-readable | Design-time |
| [persona.md](persona.md) | Identity | Human-readable | Design-time |
| [principles.md](principles.md) | Operating style | Human-readable | Design-time |
| [SKILL.md](SKILL.md) | Capability modules | Human-readable bundle entrypoint | Design-time, iteration |
| [tools.yaml](tools.yaml) | Tools | Machine-readable | Design-time, runtime |
| [resources.yaml](resources.yaml) | Knowledge and resources | Machine-readable | Design-time, runtime |
| [memory-policy.yaml](memory-policy.yaml) | Memory | Machine-readable | Design-time, iteration |
| [state-strategy.md](state-strategy.md) | State | Human-readable | Design-time |
| [output.schema.json](output.schema.json) | Outputs and schemas | Machine-readable | Design-time, runtime |
| [eval-rubric.md](eval-rubric.md) | Evaluation and observability | Human-readable | Design-time, iteration |

## Coverage and Planned Expansion

The current pack does not yet include starter files for every bucket. Future
issues may add templates for:

- Prompt specs, task prompt templates, interface schemas, elicitation flows,
  and input contracts.
- Planning policies, plans, routers, workflow graphs, delegation, handoffs,
  resumability, and continuation logic.
- Guardrails and governance.
- Runtime and deployment.
- Learning and iteration.

These are planned areas, not files that already exist. Protocol-specific
examples, including MCP or A2A adapters, should map back to the generic
taxonomy rather than define a competing template model.

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
