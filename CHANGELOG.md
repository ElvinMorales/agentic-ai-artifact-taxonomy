# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### CI Metadata

- Renamed the CI workflow from "Markdown lint" to "Validation suite" to match
  its actual scope, which runs the full `npm run validate` suite. Left the
  `markdown-lint` job name unchanged because required-status-check
  configuration on `main` could not be verified from this environment.

### Release Governance

- Reconciled the published `v0.2.1` release across README status, changelog,
  release notes, and private npm workspace metadata.
- Added a versioning policy that makes Git tags and GitHub Releases the
  canonical public release identity while keeping the npm workspace private.
- Identified `v0.3.0` as the recommended next release candidate for the
  post-`v0.2.1` UI harness and Agent Skills additions; no tag or release has
  been created.

### Capability Modules and Framework Mapping

- Mapped the open Agent Skills standard to Capability modules while preserving
  the stable 14-bucket model and separating standard fields from vendor
  extensions.
- Updated the framework-neutral `SKILL.md` starter with portable
  packaging, progressive disclosure, skill/tool, permission, and supply-chain
  guidance.
- Added a synthetic standard-compatible record-triage package with a small
  reference and static asset, without executable or networked behavior.

### UI and Interaction Harnesses

- Recognized UI and interaction harnesses primarily under Prompts and
  interfaces, with component mappings across the existing taxonomy buckets
  and no change to the stable 14-bucket model.
- Added a framework-neutral UI harness guide and reusable contract/schema
  bundle with matching synthetic examples.

### Connector Safety and Mapping

- Added a public-safety checklist for connector-facing documentation, MCP
  adapter guidance, source snapshots, and runtime-adjacent examples.
- Added a synthetic Strategic Mirror agent map across the existing taxonomy
  without introducing a new bucket or framework-specific contract.

### Validation

- Added repository-native Agent Skills package validation and behavior cases
  covering skill/tool classification, experimental tool declarations, vendor
  boundaries, and imported-package supply-chain review.
- Added schema-instance validation for three UI harness examples and synthetic
  behavior cases covering state, authority, review, and export boundaries.

## [0.2.1] - 2026-06-20

### Release Notes

- Published the [v0.2.1 release notes](docs/release-notes-v0.2.1.md) for a
  patch-level maintenance and connected-example release.

### Connected Examples

- Added a connected public-safe record-triage example pack demonstrating
  multiple taxonomy artifact classes while keeping memory, state, design-time
  artifacts, runtime examples, and eval fixtures distinct.

### Maintenance and Dependency Hygiene

- Marked the npm workspace private and aligned its metadata with the existing
  v0.2.0 state used at release preparation time.
- Added targeted npm overrides for patched Markdown lint transitive
  dependencies.
- Updated maintainer guidance to use the complete local validation suite.
- Preserved the stable 14-bucket taxonomy without renaming, adding, or removing
  buckets.

### Schema Validation

- Added schema-instance validation for selected public-safe state and handoff
  examples against their reference schemas.

## [0.2.0] - 2026-06-07

### Source Alignment

- Clarified that the stable public taxonomy retains 14 top-level buckets.
- Made the prompt/interface and planning/orchestration sub-surfaces explicit.
- Aligned the README, maintainer guidance, template index, mappings, and release
  checklist with the repo's current contents.
- Clarified that protocol-specific files are mappings or adapters rather than
  canonical taxonomy definitions.

### Automation

- Expanded local and GitHub Actions validation to cover Markdown, tracked JSON,
  JSONL records, YAML, and local Markdown links.
- Kept external URL reachability out of CI to avoid network-dependent failures.

### Framework Mapping

- Expanded the framework mapping guide using the template pack as anchors.
- Added cautious OpenAI, Anthropic, MCP, and LangGraph/LangSmith mapping notes.

### Protocol Mapping

- Added a dedicated MCP and A2A mapping guide that preserves the stable
  framework-neutral taxonomy.
- Clarified the difference between the repo's broad artifact concept and A2A's
  narrower runtime task-output object.
- Added protocol-facing public-safety and design-time versus runtime guidance.

### Public-Safe Examples

- Added tiny synthetic examples for an A2A-style agent card, handoffs, durable
  memory, runtime state, and structured outputs.
- Added a four-case JSONL eval dataset and a sanitized trace event schema.
- Linked the example pack from the README and relevant guidance.

### Template Pack

- Initial framework-neutral template pack for core agentic AI artifact classes.
- Template index mapping starter templates to taxonomy buckets and lifecycle stages.
- Added human-readable templates for agent contracts, prompts, interfaces,
  guardrails, memory guides, plans, handoffs, runtime notes, and iteration
  records.
- Expanded the template index to cover all 14 taxonomy buckets and distinguish
  human-readable templates from structured companions.

## [0.1.0] - 2026-05-24

### Added

- Initial public taxonomy structure.
- Core definition of agentic AI artifacts.
- Fourteen artifact buckets.
- Lifecycle documentation.
- Memory vs state documentation.
- Framework mapping placeholder.
- Public-safety guidance.
- Sanitized example repo tree.
