# Synthetic UI Harness Example

The fictional **Synthetic Brief Builder** collects a short public-safe topic,
assembles a request, runs a deterministic mock step, shows progress, requires
review, and exports a Markdown brief. This folder is an educational artifact
set, not a production application or a record of a real session.

## Use Scenario

A reviewer enters the fabricated topic "community garden planning basics."
The harness records only a sanitized summary and synthetic references. A
deterministic mock produces artifact metadata, the surface shows a pending
review, and export becomes available only after approval.

## Maturity Levels

- **Static prompt bridge:** validates intake, assembly, and export with manual
  relay.
- **Local web harness:** provides one mock-first local interaction surface and
  can be a first usable product.
- **Runtime adapter:** executes manual, mock, deterministic, provider-backed,
  or tool-backed work behind a separate permission boundary.
- **Deployed application:** adds separately reviewed authentication, hosting,
  privacy, monitoring, and maintenance decisions.

These distinctions are not a required roadmap.

## File-to-Bucket Mapping

| File | Artifact class | Primary or connected bucket |
| --- | --- | --- |
| [session-example.json](session-example.json) | Temporary session state | State |
| [workflow-example.json](workflow-example.json) | Interaction workflow | Planning and orchestration; Prompts and interfaces |
| [artifact-example.json](artifact-example.json) | Preview and export metadata | Outputs and schemas; Guardrails and governance |
| [../../templates/ui-harness/harness-contract.md](../../templates/ui-harness/harness-contract.md) | UI harness contract | Prompts and interfaces |
| [../../evals/cases.jsonl](../../evals/cases.jsonl) | Harness behavior cases | Evaluation and observability |

These paths demonstrate one possible layout, not required or universal names.

## Intentionally Omitted

The example contains no frontend or backend, live model output, provider SDK,
tool or connector access, authentication, database, production persistence,
durable memory, real personal or workplace content, private paths, raw prompts
or messages, secrets, logs, traces, or private artifact bodies.

Validate the three JSON instances from the repository root with
`npm run validate:schemas`. See the
[template bundle](../../templates/ui-harness/README.md) and
[classification guide](../../docs/ui-harness-artifacts.md) before adapting the
shapes.
