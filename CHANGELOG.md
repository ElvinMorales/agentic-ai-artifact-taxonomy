# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### MCP Additional Surface Mapping

- Added four rows to the `protocol-mapping.md` MCP mapping table: `server/discover`
  (SEP-2575; required for servers, optional for clients, with a secondary
  Identity mapping via the self-reported, protocol-unverified `serverInfo`
  field), routing headers (SEP-2243; header-body consistency validation
  documented under Guardrails and governance as a spoofing-prevention
  control, not authorization), cacheable results (SEP-2549; `cacheScope:
  "public"` defined as cross-caller shareability for performance, not
  publication or durable-storage safety), and `subscriptions/listen`
  (specification page; replaces the removed HTTP GET endpoint and
  `resources/subscribe`/`resources/unsubscribe`), addressing coverage gaps
  identified in issue #71.
- Added a reviewer-facing checklist bullet to
  `mcp-connector-safety-checklist.md`'s Data Boundaries section clarifying
  that a `"public"` `cacheScope` is not publication-safe or
  durable-storage-safe.
- Added SEP-2243, SEP-2549, and the specification's Subscriptions pattern
  page to the Official References of `protocol-mapping.md`, and SEP-2549 to
  the Related Docs of `mcp-connector-safety-checklist.md`.
- Added two rows to the `protocol-mapping.md` MCP mapping table: the
  Extensions framework (SEP-2133; opt-in negotiation mechanism whose surfaces
  map to existing taxonomy buckets without creating a new one) and the Tasks
  extension (SEP-2663; `io.modelcontextprotocol/tasks`, Extensions Track,
  Final — maps task IDs and lifecycle to State, asynchronous execution and
  mid-flight input to Planning and orchestration, and extension negotiation to
  Runtime and deployment), addressing remaining coverage gaps identified in
  issue #71.
- Added a brief cross-reference to `approval-and-consent-mapping.md`
  distinguishing task-scoped continuation from request-scoped `requestState`.
- Added a reviewer-facing checklist bullet to
  `mcp-connector-safety-checklist.md`'s Scope and Intent section on reviewing
  enabled extensions before opt-in.
- Added SEP-2133 and SEP-2663 to the Official References of
  `protocol-mapping.md`.

### MCP Lifecycle and Enforcement Corrections

- Corrected the Roots row in `protocol-mapping.md`: removed the
  "access-control boundary" framing and reframed roots as declared scope
  guidance that servers are expected to honor but that the protocol does not
  enforce, with actual enforcement attributed to client-side permissions, path
  validation, allowlists, and sandboxing.
- Marked Roots, Sampling, and protocol-level Logging as deprecated
  (SEP-2577, `2026-07-28` revision) in `protocol-mapping.md`,
  `mcp-connector-safety-checklist.md`, and `approval-and-consent-mapping.md`,
  with a consistent pattern distinguishing lifecycle status, backward
  compatibility, removal eligibility, and forward guidance.
- Reworded the connector checklist's runtime-and-deployment constraint item to
  name filesystem permissions, allowlists, path validation, sandboxing, and
  transport controls as the enforcement mechanisms, with declared roots as
  scope context rather than a control.
- Updated the `approval-and-consent-mapping.md` Coverage Boundaries entry from
  "tracked in issue #68 and lands in a separate change" to reflect the change
  as landed.
- Added SEP-2577, the feature lifecycle policy, and the deprecated-features
  registry to the Official References of affected documents.
- Corrected the Transports row in `protocol-mapping.md`: replaced the
  connection-scoped lifecycle and capability-negotiation framing with
  per-request capability declaration via `_meta`, reflecting that the
  `2026-07-28` revision removed the `initialize`/`initialized` handshake and
  protocol-level sessions (SEP-2575, SEP-2567). Added a Cross-Protocol
  Guidance subsection distinguishing MCP's stateless transport from stateful
  application state and classifying explicit handles such as `requestState`
  as State artifacts rather than Memory or authorization tokens.

### MCP Citation Migration

- Migrated all MCP citations from draft and `2025-06-18` revision paths to the
  published `2026-07-28` specification. The `2026-07-28` revision is now
  normative for this repository's protocol mappings.
- Pinned the `protocol-mapping.md` MCP reference from the `/specification/latest`
  moving pointer to the versioned `/specification/2026-07-28` path.
- Replaced the Coverage Boundaries statement describing MRTR material as
  pre-finalization with the finalized-state equivalent.
- Replaced the Coverage Boundaries statement omitting the
  Roots/Sampling/Logging deprecation as unconfirmed with a statement noting
  the deprecation is primary-sourced and that lifecycle marking lands in a
  separate change (issue #68).

### Validation Coverage

- Registered `templates/output.schema.json` and `examples/output-example.json`
  as a schema-instance validation pair, closing a coverage gap where this
  schema/example pair was the only one not checked by
  `npm run validate:schemas`.
- Added an advisory, network-dependent `npm run check:external-links` command
  that reports unreachable, redirected, and inconclusive external URLs in
  tracked Markdown files. It always exits `0` and is intentionally not part
  of `npm run validate`. Added a corresponding review step to
  `docs/public-release-checklist.md`.
- Corrected `check-external-links.mjs`, which reported transport-level failures
  as unreachable links. On a network that inspects TLS, every request failed and
  every cited URL was reported dead. Split the single unreachable category into
  `Unreachable` (an HTTP error status; a possible dead link) and `Could not
  check` (a transport failure such as DNS, TLS, or a timeout, which implies
  nothing about link health), added a preflight control probe against three
  independent connectivity endpoints that skips the run rather than emitting
  findings when none is reachable, and listed the domains that passed instead of
  only a count. The npm script now passes `--use-system-ca` (Node 23.8.0+) so the
  checker trusts the operating system's certificate store; `--use-env-proxy`
  (Node 24.5.0+) remains the separate remedy for networks that require a proxy.
  Extended the release-checklist review step to cover inconclusive runs and to
  treat redirects as findings. The check still always exits `0` and remains
  outside `npm run validate`.
  
### Contributor Guidance

- Documented that the CI job name is a required status check pinned by branch
  protection and must not be renamed without a coordinated rule update
  (`AGENTS.md`).
- Documented the `MD024` file-wide constraint on duplicate headings
  (`AGENTS.md`).
- Documented that concurrent changelog entries conflict on merge and must be
  resolved by keeping all entries (`AGENTS.md`).
- Documented branch-protection requirements (pull request, up-to-date branch)
  and the GitHub CLI fallback (`CONTRIBUTING.md`).

## [0.3.0] - 2026-07-29

### CI Metadata

- Renamed the CI workflow's display name from "Markdown lint" to "Validation
  suite" to match its actual scope, which runs the full `npm run validate`
  suite. The workflow file and the `markdown-lint` job name are unchanged:
  branch protection on `main` lists `Markdown lint` as a required status
  check, derived from the job name, so the job name is intentionally left
  unchanged and any rename must be coordinated with the protection rule
  first.

### Dependency Hygiene

- Bumped the `js-yaml` transitive override from `4.2.0` to `4.3.0`, the
  patched version for a high-severity quadratic-CPU-consumption advisory
  (GHSA-52cp-r559-cp3m), following the existing `overrides` precedent for
  Markdown lint's transitive dependencies.

### Maintainer Guidance

- Added a `CLAUDE.md` pointer file that defers to `AGENTS.md` for repository,
  public-safety, and editing rules without duplicating them.
- Replaced the `AGENTS.md` branch and PR guidance, which referenced completed
  `v0.2.0` source-alignment work, with durable, version-independent guidance.
- Added a lockfile regeneration guardrail to `AGENTS.md`'s validation guidance,
  describing the risk of a locally proxied npm registry rewriting `resolved`
  URLs to a non-public host, and the checks to run before committing a
  lockfile change, with a `CLAUDE.md` pointer to it.

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

### Approval and Consent Artifacts

- Added a dedicated approval-artifact schema and a synthetic example covering
  the full approval lifecycle named in issue #56 (approve, edit, reject,
  cancel, expire, resume, and failed execution), separate from the existing
  state schema and its `pending_actions` status enum.
- Added required `requested_at` and optional `expires_at` request time fields
  to the approval schema, so an expired approval record is auditable from its
  own data.
- Added a second synthetic approval example demonstrating the expire path,
  with an empty decision history and no continuation reference.
- Added an approval and consent mapping document that defines five generic
  artifact classes (approval policy, pending approval record, continuation
  token, approval decision record, and approval surface), maps them across
  MCP, LangGraph, Agent Skills, OpenAI Codex, GitHub Copilot cloud agent, and
  Claude Code, and analyzes where the pending item lives in each framework.
- Documented, in `AGENTS.md`, that the local link checker resolves targets
  from Git's tracked-file list, so a newly added file must be staged before
  link validation will see it.

### Validation

- Added repository-native Agent Skills package validation and behavior cases
  covering skill/tool classification, experimental tool declarations, vendor
  boundaries, and imported-package supply-chain review.
- Added schema-instance validation for three UI harness examples and synthetic
  behavior cases covering state, authority, review, and export boundaries.
- Added schema-instance validation for the new synthetic approval-lifecycle
  example against the new approval schema.
- Added schema-instance validation for a second synthetic approval example
  covering the expired-request path.

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
