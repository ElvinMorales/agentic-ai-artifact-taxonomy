# Taxonomy

An agentic AI artifact is any addressable file, schema, document, configuration, prompt, module, record, or policy that defines, constrains, operates, evaluates, or improves an agentic system.

Artifacts should be easy to inspect, version, review, and govern. Some are design-time inputs, some are runtime records, and some support iteration after use.

## Taxonomy Decisions

This repo currently keeps 14 top-level buckets as the stable public taxonomy.
The model is intentionally framework-neutral and does not mirror one vendor's
product model or filenames.

Some top-level buckets contain multiple related sub-surfaces:

- **Prompts and interfaces** contains prompt specifications, task prompt
  templates, interface schemas, elicitation flows, and input contracts.
- **Planning and orchestration** contains planning policies, plans, routers,
  workflow graphs, delegation, handoffs, resumability, and continuation logic.

Frameworks and protocols may expose these surfaces through more specific files
or API objects. MCP server definitions, A2A agent cards, and similar
protocol-specific artifacts are mappings or adapters at the implementation
edge. They do not replace the framework-neutral taxonomy.

See [naming-conventions.md](naming-conventions.md) for guidance on distinguishing
generic artifact classes, possible filenames, local project conventions, and
framework or protocol object names.

Public repositories should check in design-time definitions and sanitized
examples. They should not check in secrets, live memory stores, raw traces,
private logs, unsanitized workspace snapshots, or unsanitized runtime state.

## Overview

| Bucket | What it covers | Typical lifecycle |
| --- | --- | --- |
| Identity | Agent purpose, role, scope, ownership, and boundaries | Design-time |
| Operating style | Principles, collaboration norms, tone, and decision preferences | Design-time |
| Capability modules | Reusable task procedures, examples, references, scripts, and assets | Design-time, iteration |
| Tools | Callable functions, APIs, connectors, commands, and permissions | Design-time, runtime |
| Knowledge and resources | Documents, datasets, indexes, references, and retrieval sources | Design-time, runtime |
| Prompts and interfaces | Prompt specs, task templates, interface schemas, elicitation flows, and input contracts | Design-time |
| Memory | Durable knowledge intended for future reuse | Runtime, iteration |
| State | Execution snapshots for a thread, workflow, run, or session | Runtime |
| Planning and orchestration | Planning policies, plans, routers, workflow graphs, delegation, handoffs, resumability, and continuation logic | Design-time, runtime |
| Guardrails and governance | Safety policies, approvals, constraints, audits, and review rules | Design-time, runtime, iteration |
| Outputs and schemas | Expected output formats, schemas, reports, and generated artifacts | Design-time, runtime |
| Evaluation and observability | Evals, metrics, traces, logs, dashboards, and regression checks | Runtime, iteration |
| Runtime and deployment | Environment, packaging, hosting, configuration, and release surfaces | Design-time, runtime |
| Learning and iteration | Feedback, changelogs, postmortems, release notes, and improvement loops | Iteration |

## Identity

Identity defines what the agent is for, what it should and should not do, who owns it, and where its authority ends.

Purpose:

- Make the agent's role inspectable.
- Prevent accidental scope expansion.
- Help reviewers understand intended use.

Example artifact types:

- Agent manifest
- Role profile
- Ownership note
- Scope statement

Possible filenames:

- `agent.yaml`
- `identity/profile.md`
- `identity/scope.md`
- `README.md`

Related buckets:

- Operating style
- Guardrails and governance
- Runtime and deployment

## Operating Style

Operating style describes how the agent should behave while pursuing its purpose: collaboration norms, communication style, decision preferences, escalation rules, and quality standards.

Purpose:

- Make expected behavior consistent.
- Separate behavior guidance from tool definitions.
- Give reviewers a stable surface for behavior changes.

Example artifact types:

- Operating principles
- Collaboration guidelines
- Tone and style notes
- Escalation rules

Possible filenames:

- `principles.md`
- `operating-style.md`
- `collaboration.md`
- `agent/behavior.md`

Related buckets:

- Identity
- Prompts and interfaces
- Guardrails and governance

## Capability Modules

A capability module packages reusable instructions, examples, references, scripts, or assets for a specific task family.

Purpose:

- Make repeatable skills portable.
- Keep specialized procedures out of one giant prompt.
- Support focused review and improvement.

Example artifact types:

- Skill guide
- Procedure bundle
- Task-specific reference pack
- Reusable scripts and assets

Possible filenames:

- `SKILL.md`
- `capabilities/<name>/module.md`
- `skills/<name>/SKILL.md`
- `capabilities/<name>/references/`

Related buckets:

- Tools
- Knowledge and resources
- Prompts and interfaces
- Evaluation and observability

## Tools

Tools are callable external capabilities the agent can invoke, such as APIs, functions, commands, connectors, browser automation, databases, or local scripts.

Purpose:

- Define what the agent can act on.
- Make permissions and inputs reviewable.
- Separate callable capabilities from instructions about when to use them.

Example artifact types:

- Tool schema
- Connector manifest
- Function definition
- Permission policy

Possible filenames:

- `tools.yaml`
- `tools/<name>.schema.json`
- `mcp.json`
- `connectors/<name>.md`

Related buckets:

- Capability modules
- Guardrails and governance
- Runtime and deployment
- Evaluation and observability

## Knowledge and Resources

Knowledge and resources are information sources the agent can consult, including static docs, datasets, retrieval indexes, curated links, and reference files.

Purpose:

- Keep source material explicit.
- Distinguish resources from durable memory.
- Help reviewers evaluate freshness, provenance, and licensing.

Example artifact types:

- Reference documents
- Retrieval configuration
- Dataset manifests
- Resource catalogs

Possible filenames:

- `resources.yaml`
- `knowledge/README.md`
- `references/`
- `retrieval/index-manifest.json`

Related buckets:

- Memory
- Prompts and interfaces
- Evaluation and observability

## Prompts and Interfaces

Prompts and interfaces define how instructions, context, inputs, and expected
outputs are presented to the model or to users. The bucket includes both
model-facing prompt surfaces and user- or system-facing input contracts.

Purpose:

- Make model-facing instructions reviewable.
- Keep user-facing flows and model-facing templates distinct when needed.
- Support prompt tests and version history.

Example artifact types:

- System prompt
- Task prompt template
- Interface schema
- Elicitation flow
- Input contract

Possible filenames:

- `prompts/system.md`
- `prompts/tasks/<task>.md`
- `interfaces/input.schema.json`
- `interfaces/elicitation-flow.md`
- `interfaces/chat-flow.md`

Related buckets:

- Identity
- Operating style
- Outputs and schemas
- Evaluation and observability

## Memory

Memory is durable knowledge intended to be reused later across sessions, tasks, or users, subject to privacy, consent, retention, and review rules.

Purpose:

- Preserve useful long-lived knowledge.
- Make retention and deletion policies explicit.
- Avoid confusing durable knowledge with temporary execution state.

Example artifact types:

- Memory policy
- Memory schema
- User preference store
- Long-term project facts

Possible filenames:

- `memory-policy.yaml`
- `memory/schema.json`
- `memory/README.md`
- `memory/examples/sanitized-record.json`

Related buckets:

- State
- Knowledge and resources
- Guardrails and governance

## State

State is an execution snapshot used to continue, replay, inspect, or debug a specific thread, workflow, run, or session.

Purpose:

- Support continuation and replay.
- Preserve transient context during a run.
- Keep runtime snapshots separate from durable memory.

Example artifact types:

- Session checkpoint
- Workflow state
- Task queue state
- Approval state

Possible filenames:

- `state-strategy.md`
- `state/schema.json`
- `runs/<run-id>/state.json`
- `checkpoints/<id>.json`

Related buckets:

- Memory
- Planning and orchestration
- Evaluation and observability
- Public-safety guidance

## Planning and Orchestration

Planning and orchestration covers how work is decomposed, sequenced, routed,
delegated, resumed, continued, and handed off. Some systems expose planning,
routing, handoffs, and durable continuation as separate surfaces; this
taxonomy keeps them in one stable top-level bucket.

Purpose:

- Make coordination logic visible.
- Clarify task ownership and handoff behavior.
- Support review of multi-step and multi-agent workflows.

Example artifact types:

- Plan template
- Planning policy
- Router or workflow graph
- Delegation and handoff contract
- Resumability or continuation policy

Possible filenames:

- `plans/template.md`
- `planning/policy.yaml`
- `orchestration/router.yaml`
- `orchestration/graph.yaml`
- `orchestration/handoffs.md`
- `orchestration/continuation.md`

Related buckets:

- State
- Tools
- Guardrails and governance
- Runtime and deployment

## Guardrails and Governance

Guardrails and governance define constraints, policies, approvals, audit expectations, and safety rules for an agentic system.

Purpose:

- Make safety and authority boundaries inspectable.
- Define review and approval requirements.
- Reduce accidental disclosure, unsafe action, or policy drift.

Example artifact types:

- Safety policy
- Approval matrix
- Data handling rules
- Audit checklist

Possible filenames:

- `governance/policy.md`
- `guardrails.yaml`
- `approvals.md`
- `public-safety.md`

Related buckets:

- Identity
- Tools
- Memory
- Runtime and deployment

## Outputs and Schemas

Outputs and schemas define the artifacts an agent produces and the structures those outputs must follow.

Purpose:

- Make generated artifacts predictable.
- Support validation and downstream consumption.
- Separate output contracts from prompt text.

Example artifact types:

- JSON schema
- Report template
- Document format
- Generated artifact manifest

Possible filenames:

- `output.schema.json`
- `schemas/<name>.json`
- `outputs/report-template.md`
- `artifacts/manifest.yaml`

Related buckets:

- Prompts and interfaces
- Evaluation and observability
- Runtime and deployment

## Evaluation and Observability

Evaluation and observability artifacts measure, inspect, and explain agent behavior before, during, and after use.

Purpose:

- Detect regressions.
- Support debugging and review.
- Connect behavior changes to evidence.

Example artifact types:

- Eval dataset
- Rubric
- Trace schema
- Metrics report

Possible filenames:

- `evals/rubric.md`
- `evals/cases.jsonl`
- `observability/trace-schema.json`
- `metrics/README.md`

Related buckets:

- Prompts and interfaces
- Tools
- Outputs and schemas
- Learning and iteration

## Runtime and Deployment

Runtime and deployment artifacts define how the agent is packaged, configured, hosted, released, and operated.

Purpose:

- Make operating assumptions explicit.
- Separate environment configuration from agent behavior.
- Support portability across local, hosted, and managed environments.

Example artifact types:

- Runtime config
- Environment example
- Deployment manifest
- Release checklist

Possible filenames:

- `runtime.yaml`
- `.env.example`
- `deployment/README.md`
- `docker-compose.yml`

Related buckets:

- Tools
- Guardrails and governance
- Evaluation and observability
- Learning and iteration

## Learning and Iteration

Learning and iteration artifacts capture how the agent system improves over time through feedback, release notes, issue analysis, eval updates, and changelogs.

Purpose:

- Make improvement work traceable.
- Preserve lessons without publishing private runtime data.
- Connect observed behavior to future changes.

Example artifact types:

- Feedback log
- Changelog
- Postmortem
- Release notes

Possible filenames:

- `CHANGELOG.md`
- `feedback/sanitized-notes.md`
- `releases/<version>.md`
- `iteration/README.md`

Related buckets:

- Evaluation and observability
- Guardrails and governance
- Runtime and deployment
