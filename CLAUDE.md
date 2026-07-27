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

## Lockfile regeneration

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
