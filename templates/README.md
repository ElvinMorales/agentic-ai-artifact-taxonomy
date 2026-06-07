# Agent Artifact Template Pack

This directory contains starter templates for common agentic AI artifacts.
They are framework-neutral and use synthetic, public-safe examples.

The current pack contains 19 starter templates. Together they cover all stable
14 taxonomy buckets in [docs/taxonomy.md](../docs/taxonomy.md), with separate
templates for important sub-surfaces such as prompts, interfaces, plans, and
handoffs.

Human-readable templates support design and review. Structured templates
support machine validation and integration. Projects may use either or both
formats depending on their needs.

## Templates

| Template | Taxonomy bucket | Format | Lifecycle |
| --- | --- | --- | --- |
| [AGENT.md](AGENT.md) | Identity | Human-readable | Design-time |
| [agent.yaml](agent.yaml) | Identity | Machine-readable | Design-time |
| [persona.md](persona.md) | Identity | Human-readable | Design-time |
| [principles.md](principles.md) | Operating style | Human-readable | Design-time |
| [SKILL.md](SKILL.md) | Capability modules | Human-readable bundle entrypoint | Design-time, iteration |
| [tools.yaml](tools.yaml) | Tools | Machine-readable | Design-time, runtime |
| [resources.yaml](resources.yaml) | Knowledge and resources | Machine-readable | Design-time, runtime |
| [PROMPT.md](PROMPT.md) | Prompts and interfaces | Human-readable | Design-time |
| [INTERFACE.md](INTERFACE.md) | Prompts and interfaces | Human-readable | Design-time |
| [MEMORY.md](MEMORY.md) | Memory | Human-readable | Design-time, iteration |
| [memory-policy.yaml](memory-policy.yaml) | Memory | Machine-readable | Design-time, iteration |
| [state-strategy.md](state-strategy.md) | State | Human-readable | Design-time |
| [PLAN.md](PLAN.md) | Planning and orchestration | Human-readable | Design-time, runtime |
| [HANDOFFS.md](HANDOFFS.md) | Planning and orchestration | Human-readable | Design-time, runtime |
| [GUARDRAILS.md](GUARDRAILS.md) | Guardrails and governance | Human-readable | Design-time, runtime, iteration |
| [output.schema.json](output.schema.json) | Outputs and schemas | Machine-readable | Design-time, runtime |
| [eval-rubric.md](eval-rubric.md) | Evaluation and observability | Human-readable | Design-time, iteration |
| [RUNTIME.md](RUNTIME.md) | Runtime and deployment | Human-readable | Design-time, runtime |
| [ITERATION.md](ITERATION.md) | Learning and iteration | Human-readable | Iteration |

## Coverage

The pack provides a lightweight starting point, not an exhaustive catalog.
Projects may add more specific artifacts while preserving the taxonomy
boundaries. Possible filenames are suggestions rather than canonical
cross-vendor names.

Protocol-specific examples, including MCP or A2A adapters, should map back to
the generic taxonomy rather than define a competing template model.

## How to Use

Copy the relevant template into your own project and replace the example
values with project-specific, public-safe content. Keep artifacts small enough
to review and version independently.

Use human-readable and structured companions together when both audiences
matter. For example, `AGENT.md` can explain an agent contract while
`agent.yaml` provides a machine-readable manifest. `MEMORY.md` can explain the
memory operating guide while `memory-policy.yaml` provides structured rules.

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
