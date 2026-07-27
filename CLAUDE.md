# CLAUDE.md

`AGENTS.md` is the source of truth for repository rules, public-safety rules,
and editing rules. Read it first.

## What this repo is

A documentation, template, and schema project: a framework-neutral taxonomy of
agentic AI artifacts, starter templates, schemas, and synthetic examples.
There is no runtime application code. The Node.js tooling under `scripts/`
exists only to validate Markdown, JSON, JSONL, YAML, schema instances, Agent
Skills examples, and local documentation links.

## Stability constraint

The 14-bucket public taxonomy does not change (no bucket renames, additions,
removals, or boundary shifts) without an explicit issue authorizing it.

## Validation

Run the aggregate suite:

```bash
npm run validate
```

Or the narrower checks it runs, individually:

```bash
npm run lint:md
npm run validate:json
npm run validate:jsonl
npm run validate:yaml
npm run validate:schemas
npm run validate:skills
npm run check:links
```

## Version-change surfaces

A version change moves these together: `CHANGELOG.md`, the matching release
notes under `docs/`, the `README.md` status section, the `package.json`
version, and the root package entry in `package-lock.json`. See
`docs/versioning-policy.md` for the full policy.

## Do not add

Secrets, credentials, employer- or client-specific detail, regulated data,
real memory stores, unsanitized traces, private logs, or runtime state
snapshots.

## Release tagging

Creating a Git tag or GitHub Release is a maintainer decision, not an
agent-initiated action.
