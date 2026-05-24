# Framework Mapping

This taxonomy starts from generic artifact classes. Framework-specific surfaces are mappings, not replacements for the taxonomy.

Pattern:

```text
Generic artifact class -> possible filenames -> framework mappings -> implementation notes
```

## Starter mappings

| Generic artifact class | Possible filenames | Framework mappings | Implementation notes |
| --- | --- | --- | --- |
| Identity | `agent.yaml`, `identity/profile.md` | OpenAI agent instructions, Claude project guidance, local agent manifests | Use for role, purpose, scope, ownership, and boundaries. |
| Operating style | `principles.md`, `operating-style.md` | System/developer instructions, Claude Code guidance, repo agent instructions | Keep behavior guidance separate from callable tool definitions. |
| Capability module | `SKILL.md`, `skills/<name>/SKILL.md` | OpenAI Skills, Anthropic Skills, local skill bundles | Use for reusable task procedures, examples, references, scripts, and assets. |
| Tool | `tools.yaml`, `tools/<name>.schema.json`, `mcp.json` | OpenAI tool definitions, MCP tools, LangGraph tool nodes, local connectors | Define callable capabilities, inputs, outputs, permissions, and failure behavior. |
| Knowledge and resources | `resources.yaml`, `knowledge/README.md`, `references/` | Retrieval resources, MCP resources, vector store manifests, local reference packs | Track provenance, update cadence, licensing, and allowed use. |
| Prompt or interface | `prompts/system.md`, `prompts/<task>.md`, `interfaces/chat-flow.md` | Prompt templates, Responses API input patterns, Claude prompts, local UI flows | Keep model-facing templates reviewable and versioned. |
| Memory | `memory-policy.yaml`, `memory/schema.json` | Framework memory stores, user preference stores, application databases | Publish schemas and policies, not private memory contents. |
| State | `state-strategy.md`, `state/schema.json`, `checkpoints/<id>.json` | LangGraph checkpoints, local session state, run snapshots | Publish strategies and schemas, not unsanitized runtime snapshots. |
| Planning and orchestration | `orchestration/graph.yaml`, `workflows/<name>.yaml`, `handoffs.md` | LangGraph graphs, multi-agent handoffs, queue workers, local planners | Some systems split planning from orchestration and handoffs; this taxonomy keeps them together for now. |
| Guardrails and governance | `guardrails.yaml`, `governance/policy.md`, `approvals.md` | Safety policies, approval tools, permission layers, review gates | Make authority boundaries and approval requirements explicit. |
| Outputs and schemas | `output.schema.json`, `schemas/<name>.json` | Structured outputs, tool result schemas, report templates | Use schemas when outputs feed downstream systems. |
| Evaluation and observability | `evals/rubric.md`, `evals/cases.jsonl`, `observability/trace-schema.json` | OpenAI evals, LangSmith traces, local test fixtures, dashboards | Keep private traces out of public repos unless sanitized. |
| Runtime and deployment | `runtime.yaml`, `.env.example`, `deployment/README.md` | Hosted agent configs, local runtime manifests, container/deployment configs | Separate environment assumptions from behavior instructions. |
| Learning and iteration | `CHANGELOG.md`, `feedback/sanitized-notes.md`, `releases/<version>.md` | Release notes, issue trackers, eval updates, public field notes | Capture lessons without exposing private runtime data. |

## Framework notes

OpenAI Agents, Responses, and Skills can map prompts, tools, structured outputs, and reusable capability modules to concrete API or product surfaces.

Anthropic Claude, Skills, and Claude Code can map project instructions, skill bundles, tool use, and repo-agent guidance to concrete working surfaces.

MCP is useful for making tools and resources explicit across clients and servers.

LangGraph and LangSmith are useful reference points for graph orchestration, checkpoint state, traces, and evaluation workflows.

General local agent repos may implement the same artifact classes with plain Markdown, YAML, JSON Schema, scripts, and test fixtures.
