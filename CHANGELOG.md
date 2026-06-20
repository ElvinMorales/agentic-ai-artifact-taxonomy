# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

No notable changes yet.

## [0.2.1] - 2026-06-20

### Release Notes

- Finalized `v0.2.1` release notes for a patch-level maintenance and
  connected example release.

### Connected Examples

- Added a connected public-safe record-triage example pack that demonstrates
  multiple taxonomy artifact classes working together while keeping memory,
  state, design-time artifacts, runtime examples, and eval fixtures distinct.

### Changed

- Aligned package metadata with the documented v0.2.0 release state and marked
  the package private to avoid accidental publishing.
- Added an npm override to keep the Markdown lint toolchain on patched
  transitive dependency versions while the upstream lint toolchain catches up.
- Updated maintainer validation guidance to use the full local validation suite.
- Preserved the stable 14-bucket public taxonomy without renaming, adding, or
  removing buckets.

### Validation

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
