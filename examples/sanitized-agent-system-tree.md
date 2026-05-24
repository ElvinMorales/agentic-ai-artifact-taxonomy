# Sanitized Agent System Tree

This example shows a public-safe shape for an agent artifact repository. It is generic and does not represent a real work project.

```text
agent-system/
|-- README.md
|-- agent/
|   |-- agent.yaml
|   |-- identity/
|   |-- capabilities/
|   |-- tools/
|   |-- knowledge/
|   |-- prompts/
|   |-- memory/
|   |-- state/
|   |-- orchestration/
|   |-- governance/
|   |-- outputs/
|   |-- evals/
|   `-- runtime/
|-- examples/
`-- tests/
```

## Public-safe by default

These folders usually contain design-time artifacts that can be safe to publish when written generically:

- `agent/identity/`
- `agent/capabilities/`
- `agent/tools/`
- `agent/knowledge/`
- `agent/prompts/`
- `agent/orchestration/`
- `agent/governance/`
- `agent/outputs/`
- `agent/evals/`
- `agent/runtime/`

## Publish with care

These folders should usually contain only schemas, policies, strategies, or sanitized examples:

- `agent/memory/`
- `agent/state/`
- `examples/`
- `tests/`

Do not publish real memory stores, real runtime state snapshots, private traces, private logs, user data, credentials, internal workflow details, or proprietary examples.
