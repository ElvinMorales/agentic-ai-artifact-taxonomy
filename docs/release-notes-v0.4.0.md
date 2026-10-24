# Release Notes v0.4.0 — Candidate

## Status and Scope

`v0.4.0` is a minor-release candidate for the full accumulated changes since
the published `v0.3.0` release. These provisional notes were prepared on
October 24, 2026. No `v0.4.0` tag or GitHub Release has been created.

The candidate adds protocol mapping and validation capabilities while
preserving the stable 14-bucket model. The private npm workspace version is
`0.4.0` for release preparation; the latest published release remains
`v0.3.0`. Finalize these notes and the publication date when publication is
separately approved.

## Changes Since v0.3.0

### MCP Skills Distribution

- Corrected the core-versus-extension distinction in the Agent Skills and
  framework mapping guides. Optional SEP-2640 transports Agent Skills
  packages; Skills remain Capability modules rather than Tools.
- Mapped `skills/list`, `skills/get`, `resources/read` and optional
  `resources/directory/read`, with a synthetic documentation-review package
  and matching file digests and byte sizes.
- Documented origin identity and collisions, verification, host activation and
  permissions, nested consent, cross-origin reads and cache isolation.
- Distinguished content-bound approval from trust, including changed resource
  sets and the `resources: "dynamic"` exception. Reading a resource does not
  activate a skill or grant permissions.
- Aligned protocol and connector safety guidance. MCP Skills claims have their
  own source-check date; older vendor claims were not recertified wholesale.

### MCP Revision and Lifecycle Mapping

- Moved MCP citations to the normative `2026-07-28` revision and aligned MRTR
  wording with the finalized pattern.
- Corrected declared roots versus enforced confinement. Marked Roots,
  Sampling and protocol-level Logging as deprecated, with compatibility,
  removal-eligibility and migration guidance.
- Distinguished stateless protocol transport and per-request capabilities
  from application State, continuation and approval records.

### Additional Protocol Surfaces

- Mapped `server/discover`, routing headers, cacheable results and
  `subscriptions/listen` to existing buckets.
- Added Extensions and Tasks extension mappings. Task IDs, lifecycle and
  mid-flight input remain State and Planning and orchestration concerns.
- Clarified that `cacheScope: "public"` is a performance/shareability property,
  not permission to publish or retain content durably.
- Updated the GitHub agentic audit-log citation to its current location.

### Validation and Dependency Maintenance

- Added the existing output schema/example pair to schema-instance validation.
- Added the advisory `npm run check:external-links` command, separate from
  required local validation. It distinguishes HTTP errors, redirects,
  transport failures and inconclusive responses, and uses a connectivity
  preflight and the system certificate store.
- Updated the locked `fast-uri` dependency from `3.1.4` to `3.1.7` and the
  `js-yaml` override from `4.3.0` to `4.3.1`.
- Coordinated private package and lockfile release metadata without changing
  dependency resolution during candidate preparation.

### Contributor and Release Guidance

- Documented the required CI job identity, duplicate-heading constraint,
  changelog conflict preservation and protected-branch workflow.
- Preserved historical release scope and corrected obsolete v0.3.0 planning
  language to reflect its July 29 publication.

## Stable Contracts and Boundaries

- The canonical 14 bucket names and their organization remain unchanged.
- Memory remains distinct from execution State; Skill packages remain distinct
  from callable Tools. Design-time, runtime and iteration roles remain separate.
- Framework and protocol names remain mappings rather than taxonomy replacements.
- No starter template, reference schema, standalone example family or runtime
  implementation is added or changed by this candidate. The MCP Skills example
  is embedded educational documentation, not a server or registry.
- Existing artifact filenames and contracts need no migration.

## Deferred Work and Builder Compatibility

Claude Code subagent mapping remains separate in
[#72](https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy/issues/72).
This candidate does not implement MCP Skills hosting, a permission UI, a new
taxonomy bucket or a builder generator.

The companion builder's existing generic Skill starter remains compatible.
Any future builder reference update must use a verified published taxonomy
tag and its commit together, with a fresh coverage review; a candidate or
`main` is not a released pin.

## Public-Safety Review

New documentation examples are synthetic and inert. They contain no live
server setup, executable helpers, private Skills, actual permission inventories
or approval histories. Review the complete candidate diff before publication
using the [public-safety guide](public-safety.md) and
[connector checklist](mcp-connector-safety-checklist.md).

Keep real Memory, runtime State, traces, private endpoints, credentials and
workplace procedures outside public source. Digest consistency and passing
structural checks do not establish trust or authorize execution.

## Validation and Publication Gates

From the repository root:

```bash
npm ci
npm run validate
npm run check:external-links
git diff --check
```

The required suite covers Markdown, JSON, JSONL, YAML, selected schema/example
pairs, Agent Skills packages and tracked local documentation links. The
external-link command is advisory and always exits zero; inspect its findings.
These notes describe the commands and scope, not a claim that future CI or
publication gates have already passed.

Complete the [public release checklist](public-release-checklist.md), review
the final candidate commit and CI results, and obtain separate approval for
tagging and GitHub Release creation. At publication, finalize this document's
candidate wording and date, the changelog date and README/version-policy status.

## Related References

- [Changelog](../CHANGELOG.md)
- [Agent Skills standard mapping](agent-skills-standard-mapping.md)
- [Protocol mapping](protocol-mapping.md)
- [Approval and consent mapping](approval-and-consent-mapping.md)
- [Versioning policy](versioning-policy.md)
- [Published v0.3.0 release notes](release-notes-v0.3.0.md)
