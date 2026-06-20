# Release Notes v0.2.1

## Summary

`v0.2.1` is a patch-level maintenance and example release for the Agentic AI
Artifact Taxonomy. It summarizes recent validation hardening, dependency
hygiene, and the connected record-triage example pack.

The stable 14-bucket public taxonomy is unchanged.

These notes describe the `v0.2.1` documentation release.

## What Changed

### Validation Hardening

- Added schema-instance validation for selected public-safe examples against
  their reference schemas.
- Kept the aggregate validation command focused on local, repeatable checks for
  Markdown, JSON, JSONL, YAML, schema examples, and local documentation links.
- Preserved the existing choice to skip external URL reachability in local and
  CI validation.

### Dependency Hygiene

- Cleaned up the lint toolchain dependency posture without changing taxonomy
  content or example scope.
- Added package metadata safeguards and npm overrides so the documented
  validation workflow stays reproducible and avoids known vulnerable transitive
  versions.

### Connected Record-Triage Example

- Added a connected public-safe record-triage example pack under
  `examples/record-triage-agent/`.
- Demonstrated multiple artifact classes working together, including identity,
  prompt and interface contracts, a capability module, tool and resource
  shapes, memory guidance, runtime state, handoffs, guardrails, structured
  output, and eval cases.
- Kept the example educational and synthetic rather than presenting it as a
  production workflow, operational record system, or deployable agent.

## What Stayed Stable

- The canonical public taxonomy still has 14 top-level buckets.
- No taxonomy buckets were renamed, added, removed, or reorganized.
- Framework and protocol surfaces remain mapping guidance rather than
  replacements for the framework-neutral taxonomy.
- Memory remains distinct from runtime state, and design-time artifacts remain
  distinct from runtime records and iteration artifacts.

## Public-Safety Posture

All examples remain synthetic, generic, and public-safe. The connected
record-triage pack uses fabricated identifiers, records, categories, tool
names, URLs, and review scenarios.

Do not publish real memory stores, private runtime state, raw traces, private
logs, secrets, credentials, employer-specific workflows, regulated data,
unsanitized workspace snapshots, or private operational records in public
examples.

## Validation

Release validation uses:

```bash
npm ci
npm run validate
git diff --check
git status --short
```

The aggregate validation command covers Markdown, JSON, JSONL, YAML,
schema-instance validation for selected examples, and local Markdown links.
External URL reachability is intentionally skipped.

## Upgrade or Usage Notes

- Existing users do not need to rename taxonomy buckets or reorganize existing
  artifacts for `v0.2.1`.
- Use the connected record-triage example as a public-safe demonstration of
  artifact boundaries, not as a production implementation.
- Keep dependency and validation updates separate from taxonomy changes when
  preparing downstream adaptations.

## Related Work

- [Canonical taxonomy](taxonomy.md)
- [Public-safe examples](../examples/README.md)
- [Connected record-triage example](../examples/record-triage-agent/README.md)
- [Public-safety guidance](public-safety.md)
- [Public release checklist](public-release-checklist.md)
- [Historical v0.2.0 release notes](release-notes-v0.2.0.md)
