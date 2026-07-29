# Release Notes v0.3.0

## Summary

`v0.3.0` is a minor release for the Agentic AI Artifact Taxonomy. It adds new
public artifact surfaces — UI and interaction harness artifacts, Agent Skills
standard mapping, approval and consent artifacts, and connector safety
guidance — while preserving the stable 14-bucket taxonomy model.

No taxonomy buckets were added, removed, renamed, or reorganized.

This release was tagged at `<commit>` and published on July 29, 2026.

## What Changed

### UI and Interaction Harnesses

- Recognized UI and interaction harnesses primarily under Prompts and
  interfaces, with component mappings across existing taxonomy buckets and no
  change to the stable 14-bucket model.
- Added a framework-neutral UI harness guide and reusable contract/schema
  bundle with matching synthetic examples.

### Agent Skills Standard Mapping

- Mapped the open Agent Skills standard to Capability modules while preserving
  the stable 14-bucket model and separating standard fields from vendor
  extensions.
- Updated the framework-neutral `SKILL.md` starter with portable packaging,
  progressive disclosure, skill/tool, permission, and supply-chain guidance.
- Added a synthetic standard-compatible record-triage package with a small
  reference and static asset, without executable or networked behavior.

### Connector Safety and Mapping

- Added a public-safety checklist for connector-facing documentation, MCP
  adapter guidance, source snapshots, and runtime-adjacent examples.
- Added a synthetic Strategic Mirror agent map across the existing taxonomy
  without introducing a new bucket or framework-specific contract.

### Approval and Consent Artifacts

- Added a dedicated approval-artifact schema and a synthetic example covering
  the full approval lifecycle (approve, edit, reject, cancel, expire, resume,
  and failed execution), separate from the existing state schema and its
  `pending_actions` status enum.
- Added required `requested_at` and optional `expires_at` request time fields
  to the approval schema, so an expired approval record is auditable from its
  own data.
- Added a second synthetic approval example demonstrating the expire path,
  with an empty decision history and no continuation reference.
- Added an approval and consent mapping document that defines five generic
  artifact classes and maps them across MCP, LangGraph, Agent Skills, OpenAI
  Codex, GitHub Copilot cloud agent, and Claude Code.

### Validation Expansion

- Added repository-native Agent Skills package validation and behavior cases
  covering skill/tool classification, experimental tool declarations, vendor
  boundaries, and imported-package supply-chain review.
- Added schema-instance validation for three UI harness examples and synthetic
  behavior cases covering state, authority, review, and export boundaries.
- Added schema-instance validation for the new synthetic approval-lifecycle
  example against the new approval schema.
- Added schema-instance validation for a second synthetic approval example
  covering the expired-request path.
- Fixed a schema-validator issue where registering two examples against one
  schema failed because the schema's `$id` was already registered. The fix
  compiles each schema once and reuses it, so one schema can now validate
  multiple examples.

### Maintainer Guidance

- Added a `CLAUDE.md` pointer file that defers to `AGENTS.md` for repository,
  public-safety, and editing rules without duplicating them.
- Replaced the `AGENTS.md` branch and PR guidance, which referenced completed
  `v0.2.0` source-alignment work, with durable, version-independent guidance.
- Added a lockfile regeneration guardrail to `AGENTS.md`'s validation guidance,
  describing the risk of a locally proxied npm registry rewriting `resolved`
  URLs to a non-public host.

### Release Governance

- Reconciled the published `v0.2.1` release across README status, changelog,
  release notes, and private npm workspace metadata.
- Added a versioning policy that makes Git tags and GitHub Releases the
  canonical public release identity while keeping the npm workspace private.

### CI Metadata

- Renamed the CI workflow's display name from "Markdown lint" to "Validation
  suite" to match its actual scope, which runs the full `npm run validate`
  suite.

### Dependency Hygiene

- Bumped the `js-yaml` transitive override from `4.2.0` to `4.3.0`, the
  patched version for a high-severity quadratic-CPU-consumption advisory
  (GHSA-52cp-r559-cp3m).

## What Stayed Stable

- The canonical public taxonomy still has 14 top-level buckets.
- No taxonomy buckets were renamed, added, removed, or reorganized.
- Framework and protocol surfaces remain mapping guidance rather than
  replacements for the framework-neutral taxonomy.
- Memory remains distinct from runtime state, and design-time artifacts remain
  distinct from runtime records and iteration artifacts.

## Public-Safety Posture

A manual public-safety review was performed as part of release preparation. All
new and changed content was inspected for secrets, credentials, tokens, private
certificates, internal hostnames, internal URLs, employer-specific detail, real
identities, regulated data, non-synthetic content, and unsanitized runtime
state. None were found. All examples remain synthetic, generic, and
public-safe.

Do not publish real memory stores, private runtime state, raw traces, private
logs, secrets, credentials, employer-specific workflows, regulated data,
unsanitized workspace snapshots, or private operational records in public
examples.

## Future Work

The downstream builder and profile follow-up — making the approval and consent
artifact classes actionable for framework-specific builders through targeted
integration profiles per framework — is identified as future work. It is not
implemented in this release and will be tracked separately.

## Validation

The release contents can be revalidated with:

```bash
npm ci
npm run validate
git diff --check
git status --short
```

The aggregate validation command covers Markdown, JSON, JSONL, YAML,
schema-instance validation for selected examples, Agent Skills validation, and
local Markdown links. External URL reachability is intentionally skipped.

## Upgrade or Usage Notes

- Existing users do not need to rename taxonomy buckets or reorganize existing
  artifacts for `v0.3.0`.
- Use the new UI harness guide and approval and consent mapping as reference
  surfaces alongside the framework-neutral taxonomy.
- Use the Agent Skills standard mapping to translate portable skill packages
  into the taxonomy's Capability modules concept.
- The approval-artifact schema is a reference shape for synthetic examples, not
  a production approval engine or workflow standard.

## Related Work

- [Canonical taxonomy](taxonomy.md)
- [UI and interaction harness artifacts](ui-harness-artifacts.md)
- [Agent Skills standard mapping](agent-skills-standard-mapping.md)
- [Approval and consent mapping](approval-and-consent-mapping.md)
- [MCP and connector safety review checklist](mcp-connector-safety-checklist.md)
- [Public-safe examples](../examples/README.md)
- [Public-safety guidance](public-safety.md)
- [Public release checklist](public-release-checklist.md)
- [Versioning policy](versioning-policy.md)
- [Historical v0.2.1 release notes](release-notes-v0.2.1.md)
- [Historical v0.2.0 release notes](release-notes-v0.2.0.md)
