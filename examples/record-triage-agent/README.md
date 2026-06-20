# Connected Record Triage Agent Example

This folder is a connected public-safe example pack for a fictional
record-triage assistant. It demonstrates artifact shape, not a production
workflow.

The example shows how several taxonomy buckets can work together while keeping
their boundaries visible. All records, identifiers, categories, tool names, and
outputs are fabricated for education.

## Included Artifacts

| Artifact | Primary taxonomy bucket | Lifecycle role |
| --- | --- | --- |
| [AGENT.md](AGENT.md) | Identity | Design-time contract |
| [agent.yaml](agent.yaml) | Identity | Design-time manifest |
| [PROMPT.md](PROMPT.md) | Prompts and Interfaces | Design-time prompt spec |
| [INTERFACE.md](INTERFACE.md) | Prompts and Interfaces | Design-time input contract |
| [SKILL.md](SKILL.md) | Capability Modules | Design-time procedure |
| [tools.yaml](tools.yaml) | Tools | Design-time tool catalog |
| [resources.yaml](resources.yaml) | Knowledge and Resources | Design-time resource catalog |
| [GUARDRAILS.md](GUARDRAILS.md) | Guardrails and Governance | Design-time policy |
| [MEMORY.md](MEMORY.md) | Memory | Design-time durable memory policy |
| [HANDOFFS.md](HANDOFFS.md) | Planning and Orchestration | Design-time handoff contract |
| [state-example.json](state-example.json) | State | Runtime example |
| [output-example.json](output-example.json) | Outputs and Schemas | Runtime example |
| [evals/cases.jsonl](evals/cases.jsonl) | Evaluation and Observability | Iteration fixture |

## How to Read This Folder

Start with [AGENT.md](AGENT.md) for the human-readable contract and
[agent.yaml](agent.yaml) for the compact manifest. Then read
[INTERFACE.md](INTERFACE.md), [PROMPT.md](PROMPT.md), and [SKILL.md](SKILL.md)
to see how an accepted task is collected, instructed, and performed.

Use [tools.yaml](tools.yaml), [resources.yaml](resources.yaml),
[GUARDRAILS.md](GUARDRAILS.md), [MEMORY.md](MEMORY.md), and
[HANDOFFS.md](HANDOFFS.md) as supporting design-time artifacts. They describe
allowed dependencies, safety limits, durable memory policy, and transfer of
responsibility.

The runtime examples are intentionally small. [state-example.json](state-example.json)
is a resumable run snapshot, not durable memory. [output-example.json](output-example.json)
is the expected result shape for one fabricated record. The JSONL cases in
[evals/cases.jsonl](evals/cases.jsonl) are iteration artifacts that check
whether the package preserves key boundaries.

## What This Demonstrates

- A connected educational agent package can reference multiple stable taxonomy
  buckets without creating new buckets or renaming existing ones.
- Generic artifact classes come first; filenames are example carrier files.
- Design-time artifacts describe intent, contracts, policies, and dependencies.
- Runtime examples show minimal synthetic state and outputs.
- Iteration artifacts test behavior without publishing traces or live records.
- Memory and state remain separate: [MEMORY.md](MEMORY.md) governs durable
  knowledge, while [state-example.json](state-example.json) captures temporary
  execution progress.

## Intentionally Omitted

This pack omits production deployment, authentication, storage backends, live
tool calls, telemetry pipelines, private prompts, real workflow rules, real
records, and external system integration.

It also avoids medical, clinical, legal, financial, customer, workplace, and
employer-specific records. The example is limited to generic fictional incoming
records such as notices, inventory notes, and event summaries.

## Related Templates

- [Agent contract template](../../templates/AGENT.md)
- [Agent manifest template](../../templates/agent.yaml)
- [Prompt specification template](../../templates/PROMPT.md)
- [Interface contract template](../../templates/INTERFACE.md)
- [Capability module template](../../templates/SKILL.md)
- [Tool catalog template](../../templates/tools.yaml)
- [Resource catalog template](../../templates/resources.yaml)
- [Guardrails template](../../templates/GUARDRAILS.md)
- [Durable memory guide template](../../templates/MEMORY.md)
- [Handoff contract template](../../templates/HANDOFFS.md)
- [State strategy template](../../templates/state-strategy.md)
- [Evaluation rubric template](../../templates/eval-rubric.md)
