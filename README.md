# Agentic AI Artifact Taxonomy

AI agents are often described as "a prompt plus tools." That framing is useful,
but incomplete.

Real agentic systems depend on manifests, capability modules, tool schemas,
prompt templates, interface contracts, policies, memory strategies, state
snapshots, workflow definitions, evals, deployment configuration, and release
records.

This repo provides a framework-neutral taxonomy for naming and organizing those
artifacts so builders can design, document, evaluate, and govern agentic
systems more clearly.

## What this repo is

An agentic AI artifact is anything an agentic system depends on that is
addressable, versionable, inspectable, and governable.

Artifacts can be files, schemas, documents, configurations, prompts, modules,
policies, runtime records, evaluation datasets, or release notes. The taxonomy
separates design-time definitions, runtime data, and iteration artifacts, and
it keeps durable memory distinct from resumable execution state.

The repo currently includes:

- The canonical 14-bucket taxonomy and supporting concept guides.
- A framework-neutral starter template pack covering 19 artifact types across
  all 14 taxonomy buckets.
- A sanitized example repository tree.
- Framework and protocol mapping guidance.
- Public-safety and release-review guidance.
- Local and GitHub Actions Markdown validation.

## Who it is for

- Builders designing agent systems across frameworks.
- Teams documenting reusable agent capabilities.
- Reviewers evaluating agent behavior, safety, and maintainability.
- Researchers and practitioners comparing agent architectures.
- Maintainers preparing public-safe examples, templates, and field notes.

## Why it exists

Agent repositories often mix design documents, prompts, tools, runtime logs, evals, and deployment settings without a shared vocabulary. That makes agent systems harder to review, transfer, reuse, and govern.

This taxonomy gives those artifacts practical names and boundaries.

## What this is not

This is not an official standard, vendor specification, or claim that every
framework uses the same names.

It is a practical vocabulary for comparing and organizing artifacts across
agentic AI systems. Framework and protocol files are mappings at the edge, not
replacements for the taxonomy.

## The Stable 14-Bucket Model

The current public taxonomy keeps 14 top-level buckets:

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

Some buckets intentionally contain several related sub-surfaces:

- **Prompts and interfaces** includes prompt specifications, task prompt
  templates, interface schemas, elicitation flows, and input contracts.
- **Planning and orchestration** includes planning policies, plans, routers,
  workflow graphs, delegation, handoffs, resumability, and continuation logic.

The repo may map these surfaces more finely for a specific framework or
protocol without changing the stable top-level taxonomy.

## How to use this repo

- Start with [docs/taxonomy.md](docs/taxonomy.md) for the main reference.
- Use [templates/README.md](templates/README.md) for reusable starter templates mapped to the taxonomy buckets.
- Use [docs/artifact-lifecycle.md](docs/artifact-lifecycle.md) to distinguish design-time, runtime, and iteration artifacts.
- Use [docs/memory-vs-state.md](docs/memory-vs-state.md) before designing persistence or continuation behavior.
- Use [docs/framework-mapping.md](docs/framework-mapping.md) to translate generic artifact classes into framework-specific surfaces.
- Use [docs/public-safety.md](docs/public-safety.md) before publishing examples or operational material.
- Use [docs/release-notes-v0.1.0.md](docs/release-notes-v0.1.0.md) for the historical public foundation release notes.
- Use [docs/public-release-checklist.md](docs/public-release-checklist.md) as a maintenance checklist before future public updates.

## What is intentionally not included

This repo does not publish live memory stores, raw production traces, private
logs, secrets, unsanitized workspace snapshots, or unsanitized runtime state.
Framework-specific implementations and protocol examples may be documented as
sanitized mappings, but they do not define the taxonomy.

## Public-safety note

Do not publish secrets, credentials, employer-specific workflows, regulated
data, private logs, unsanitized traces, real memory stores, or runtime state
snapshots. Public examples should be generic, sanitized, and educational.

## Status

The latest tagged release is the public `v0.1.0` foundation. Since that
release, the repo has added a starter template pack, expanded mappings, and
Markdown validation; these changes are recorded under `Unreleased` in
[CHANGELOG.md](CHANGELOG.md).

The v0.2.0 work aligns the taxonomy, templates, mappings, examples, and
validation while preserving the stable 14-bucket public model. Protocol
mappings, public examples, validation expansion, and release notes remain
separate work.
