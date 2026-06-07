# AGENTS.md

## Repo purpose

This repo publishes a framework-neutral taxonomy of agentic AI artifacts.

## Source of truth

The canonical public taxonomy has 14 top-level buckets. Preserve that stable
public model unless a future issue explicitly changes it.

Some buckets intentionally contain multiple sub-surfaces:

- `Prompts and interfaces` includes prompt specs, task prompt templates,
  interface schemas, elicitation flows, and input contracts.
- `Planning and orchestration` includes planning policies, plans, routers,
  workflow graphs, delegation, handoffs, resumability, and continuation logic.

Keep framework-neutral artifact classes primary. Treat framework and protocol
surfaces, including MCP server definitions and A2A agent cards, as mappings or
adapters rather than replacements for the taxonomy. Example filenames are
suggestions, not canonical cross-vendor names.

## Public-safety rules

Do not add secrets, private data, employer-specific details, unsanitized traces,
real memory stores, private logs, unsanitized workspace snapshots, or private
runtime state.

Public repos should contain design-time artifacts and sanitized examples, not
live runtime data. Use generic examples and synthetic data. Do not imply
employer, client, or platform endorsement.

## Editing rules

- Prefer small, focused changes.
- Keep language framework-neutral unless a framework mapping is explicitly requested.
- Separate memory from state.
- Separate design-time, runtime, and iteration artifacts.
- Do not treat skills or capability modules as the same thing as tools.
- Keep protocol manifests and framework-specific filenames in mapping guidance.
- Do not add automation unless it has a clear maintenance purpose.

## Markdown style

- Use clear headings and short sections.
- Prefer plain language over hype.
- Use Markdown tables only when they make comparison easier.
- Keep examples generic and public-safe.

## Validation

Run:

```bash
git status
git diff --check
npm run lint:md
```

If dependencies are not installed, run `npm install` before Markdown linting.

## Branch and PR preference

Use short documentation branches and focused pull requests. For v0.2.0
source-alignment work, prefer:

```bash
docs/v0.2-source-alignment
```
