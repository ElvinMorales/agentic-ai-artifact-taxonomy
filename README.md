# Agentic AI Artifact Taxonomy

AI agents are often described as "a prompt plus tools."

That framing is useful, but incomplete.

Real agentic systems depend on many artifacts: manifests, skills, tool schemas, prompt templates, policies, memory strategies, state snapshots, eval datasets, deployment configs, changelogs, and observability records.

This repo organizes those artifacts into a framework-neutral taxonomy so builders can design, document, evaluate, and govern agentic systems more clearly.

## What this repo is

This is an early public reference for naming and organizing the artifacts that make agentic AI systems reusable, inspectable, portable, and safer to operate.

An agentic AI artifact is any addressable file, schema, document, configuration, prompt, module, record, or policy that defines, constrains, operates, evaluates, or improves an agentic system.

## Who it is for

- Builders designing agent systems across frameworks.
- Teams documenting reusable agent capabilities.
- Reviewers evaluating agent behavior, safety, and maintainability.
- Researchers and practitioners comparing agent architectures.
- Maintainers preparing public-safe examples, templates, and field notes.

## Why it exists

Agent repositories often mix design documents, prompts, tools, runtime logs, evals, and deployment settings without a shared vocabulary. That makes agent systems harder to review, transfer, reuse, and govern.

This taxonomy gives those artifacts practical names and boundaries.

## The 14 buckets

1. Identity
2. Operating style
3. Capability modules
4. Tools
5. Knowledge and resources
6. Prompts and interfaces
7. Memory
8. State
9. Planning and orchestration
10. Guardrails and governance
11. Outputs and schemas
12. Evaluation and observability
13. Runtime and deployment
14. Learning and iteration

## How to use this repo

- Start with [docs/taxonomy.md](docs/taxonomy.md) for the main reference.
- Use [docs/artifact-lifecycle.md](docs/artifact-lifecycle.md) to distinguish design-time, runtime, and iteration artifacts.
- Use [docs/memory-vs-state.md](docs/memory-vs-state.md) before designing persistence or continuation behavior.
- Use [docs/framework-mapping.md](docs/framework-mapping.md) to translate generic artifact classes into framework-specific surfaces.
- Use [docs/public-safety.md](docs/public-safety.md) before publishing examples or operational material.

## What is intentionally not included

This first version does not include full starter templates, real production traces, private memory stores, framework-specific implementations, or GitHub Actions automation. Those can come later when the taxonomy has enough review and practical use.

## Public-safety note

Do not publish secrets, credentials, employer-specific workflows, regulated data, private logs, unsanitized traces, real memory stores, or runtime state snapshots. Public examples should be generic, sanitized, and educational.

## Status

Current status: early draft for `v0.1.0`.

The goal is a small, public-ready foundation that can grow into templates, examples, framework mappings, and field notes over time.
