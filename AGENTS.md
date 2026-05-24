# AGENTS.md

## Repo purpose

This repo publishes a framework-neutral taxonomy of agentic AI artifacts.

## Source of truth

The canonical public taxonomy has 14 buckets. Do not replace it with a vendor-specific taxonomy.

Keep `Planning and orchestration` as one bucket unless a future issue explicitly changes the public taxonomy. Some supporting materials split planning and handoffs more finely, but this repo keeps them combined for the first public version.

## Public-safety rules

Do not add secrets, private data, employer-specific details, unsanitized traces, real memory stores, or private runtime state.

Use generic examples and synthetic data. Do not imply employer, client, or platform endorsement.

## Editing rules

- Prefer small, focused changes.
- Keep language framework-neutral unless a framework mapping is explicitly requested.
- Separate memory from state.
- Separate design-time, runtime, and iteration artifacts.
- Do not treat skills or capability modules as the same thing as tools.
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
```

If Markdown tools are available, also run them.

## Branch and PR preference

Use short documentation branches and focused pull requests. For bootstrap work, prefer:

```bash
docs/bootstrap-taxonomy-v0.1
```
