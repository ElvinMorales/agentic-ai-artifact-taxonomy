# UI Harness Template Bundle

This bundle provides small, framework-neutral starter contracts for a UI or
interaction harness. Use it when an interface materially shapes intake,
request assembly, workflow selection, temporary continuity, approvals,
artifact review, export, or runtime visibility.

| File | Primary or connected taxonomy buckets |
| --- | --- |
| [harness-contract.md](harness-contract.md) | Prompts and interfaces; Guardrails and governance; Evaluation and observability; Runtime and deployment |
| [session.schema.json](session.schema.json) | State |
| [workflow.schema.json](workflow.schema.json) | Planning and orchestration; Prompts and interfaces |
| [artifact.schema.json](artifact.schema.json) | Outputs and schemas; Guardrails and governance |

The bundle defines contracts, not a frontend framework. The schemas are
educational starter shapes, not universal runtime standards. Copy only the
pieces the project needs, rename them to fit local conventions, and preserve
each component's purpose and lifecycle boundary.

The matching [Synthetic Brief Builder examples](../../examples/ui-harness/README.md)
can be validated from the repository root with:

```bash
npm run validate:schemas
```

The fixtures contain metadata and sanitized summaries only. Do not substitute
real prompts, messages, secrets, tool payloads, memory contents, paths, logs,
traces, sessions, or generated output in a public repository.

See [UI and interaction harness artifacts](../../docs/ui-harness-artifacts.md)
for classification and authority guidance.
