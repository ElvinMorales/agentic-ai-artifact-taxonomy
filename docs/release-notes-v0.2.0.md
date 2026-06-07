# Release Notes v0.2.0

## Summary

`v0.2.0` expands the Agentic AI Artifact Taxonomy from its initial conceptual
foundation into a more usable public reference. It preserves the stable 14
top-level taxonomy buckets while adding practical templates, protocol mapping,
synthetic examples, and broader validation.

These notes describe the tagged `v0.2.0` documentation release.

## What Changed

### Source-of-Truth Alignment

- Aligned the README, taxonomy guidance, template index, framework mapping,
  maintainer guidance, changelog, and release checklist with the repository's
  current contents.
- Kept the taxonomy framework-neutral and retained the existing 14 top-level
  buckets.
- Made important sub-surfaces inside combined buckets more explicit.

### Template Expansion

- Expanded the starter template pack from 10 to 19 templates.
- Added human-readable templates for agent contracts, prompts, interfaces,
  guardrails, memory guidance, plans, handoffs, runtime notes, and iteration
  records.
- Kept structured companions where machine-readable contracts are useful,
  including agent, memory-policy, tool, resource, and output-schema files.
- Covered all 14 taxonomy buckets while keeping example filenames advisory
  rather than canonical across frameworks.

### Protocol Mapping

- Added a dedicated mapping guide for the Model Context Protocol (MCP) and
  Agent2Agent Protocol (A2A).
- Treated MCP and A2A objects as mappings or adapters at the implementation
  edge, not replacements for the taxonomy.
- Clarified the broad taxonomy meaning of **artifact** versus narrower protocol
  or runtime meanings, including an A2A `Artifact` task-output object.

### Public-Safe Examples

- Added small synthetic examples for an A2A-style Agent Card, handoffs, durable
  memory, runtime state, structured outputs, evaluation cases, and sanitized
  trace-like event shapes.
- Kept the examples educational and intentionally incomplete rather than
  presenting them as production records or deployable systems.

### Validation Expansion

- Expanded validation beyond Markdown linting to cover tracked JSON, JSONL,
  YAML, and local Markdown links.
- Added `npm run validate` as the aggregate local and CI validation command.
- Kept external URL reachability out of validation to avoid
  network-dependent failures.

## Taxonomy Decisions

The canonical public taxonomy still has 14 top-level buckets. Existing users
do not need to rename those buckets.

Two combined buckets now state their internal surfaces more clearly:

- **Prompts and interfaces** includes prompt specifications, task prompt
  templates, interface schemas, elicitation flows, and input contracts.
- **Planning and orchestration** includes planning policies, plans, routers,
  workflow graphs, delegation, handoffs, resumability, and continuation logic.

Frameworks and protocols may represent these surfaces with separate files or
objects. Those implementation details map back to the stable taxonomy rather
than creating a replacement taxonomy.

## Migration and Adoption Notes

- Adopt the expanded templates incrementally; projects do not need to use all
  19 templates.
- Keep existing separate prompt, interface, planning, routing, or handoff files
  when they are useful, and map them to the relevant combined top-level bucket.
- Treat MCP server definitions, A2A Agent Cards, and similar protocol files as
  adapters or mappings.
- Treat framework mappings as practical translation guidance, not claims that
  all vendors use the same names or provide exact equivalents.

## Public-Safety Boundaries

The example pack contains synthetic educational fixtures only. Public
repositories should contain design-time artifacts and sanitized examples, not
live operational records.

Do not publish real memory stores, private runtime records, raw traces, private
logs, secrets, credentials, unsanitized workspace snapshots, or unsanitized
runtime state. Protocol objects that carry task, message, output, or session
data remain runtime records even when they use a portable structured format.

## Validation

Release preparation was validated with:

```bash
npm ci
npm run validate
git diff --check
```

The aggregate validation command covers Markdown, JSON, JSONL, YAML, and local
Markdown links. External URL reachability is intentionally skipped.

## Related Materials

- [Canonical taxonomy](taxonomy.md)
- [Starter template pack](../templates/README.md)
- [Framework mapping](framework-mapping.md)
- [Protocol mapping](protocol-mapping.md)
- [Public-safe examples](../examples/README.md)
- [Public release checklist](public-release-checklist.md)
- [Historical v0.1.0 release notes](release-notes-v0.1.0.md)
