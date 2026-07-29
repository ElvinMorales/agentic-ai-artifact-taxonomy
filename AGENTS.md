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
- `MD024` (no-duplicate-heading) is active and file-wide: no two headings in
  the same file may share text regardless of nesting depth. This constrains
  changelog section names and documents whose subsections mirror their parent
  headings.

## Validation

Run:

```bash
git status
git diff --check
npm ci
npm run validate
```

Targeted scripts such as `npm run lint:md`, `npm run validate:json`,
`npm run validate:jsonl`, `npm run validate:yaml`,
`npm run validate:schemas`, and `npm run check:links` are optional narrower
checks during development.

### Local link checking and new files

The local link checker resolves valid targets from Git's tracked-file list, not
from the filesystem. Stage a newly added file before running
`npm run check:links` or the full `npm run validate` suite, or a link that
points at it will fail as a missing target even though the file exists on
disk.

### Lockfile regeneration

`npm ci` is the safe install path: it installs from the committed lockfile
and does not rewrite `package-lock.json`.

Commands that regenerate the lockfile (`npm install`, `npm update`, `npm audit
fix`, and similar) resolve packages through whatever registry the local
environment is configured to use. In an environment that proxies npm through a
private registry mirror, this can rewrite `resolved` URLs to a non-public
host, which introduces environment-specific detail into a public repository.

Before committing a lockfile change, confirm every `resolved` URL points at
the public npm registry and that each integrity hash matches the public
registry's copy of the package. CI is the authoritative check, since it
installs from the public registry. Prefer regenerating the lockfile from an
environment with direct public registry access when one is available.

### CI job name

The required status check on `main` derives its name from the `name:` field of
the job in `.github/workflows/markdown-lint.yml`. Renaming the job or the
workflow file blocks every pull request until the branch-protection rule is
updated to match. Do not rename either without coordinating the protection-rule
change first.

## Branch and PR preference

Use short, focused documentation branches. Keep one concern per pull request,
and run the validation suite before requesting review.

When multiple branches edit `CHANGELOG.md`, entries inserted under
`## [Unreleased]` will conflict on merge. Resolve by keeping every entry from
both sides; never drop a changelog line to eliminate a conflict. Because branch
protection requires the merging branch to be up-to-date with `main`, rebase or
merge from `main` inside the branch rather than deferring resolution to merge
time.
