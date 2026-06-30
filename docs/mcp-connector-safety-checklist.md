# MCP and Connector Safety Review Checklist

## Purpose

Use this checklist to review connector-facing artifacts before implementation,
release, or publication. Connector documentation is a governance and runtime
artifact, not merely an integration note: it defines authority, data movement,
side effects, persistence, and operating boundaries that must remain
inspectable.

## Scope

This checklist is framework-neutral. MCP is one example of a connector
protocol; the same review applies to other adapters, plugins, integrations,
protocol bridges, and connector-like surfaces.

Use it for design-time definitions, sanitized examples, and policies. Review
live connector activity as private runtime data unless a record is explicitly
sanitized and approved for publication.

## What Counts as a Connector-Facing Artifact?

Connector-facing artifacts include:

- Resource catalogs, source snapshot definitions, and retrieval policies.
- Prompt definitions, input contracts, and elicitation flows.
- Tool and action schemas, permission rules, and approval policies.
- Runtime roots, transports, sessions, and deployment configuration.
- Sampling or other nested model-call policies.
- Authorization, consent, credential, logging, trace, and error policies.

Protocol-specific objects map to the stable taxonomy. They do not create new
top-level buckets or replace framework-neutral artifact classes.

## Taxonomy Mapping

| Connector surface | Primary taxonomy mapping | Review focus |
| --- | --- | --- |
| Resources and source snapshots | Knowledge and resources; Guardrails and governance | Provenance, freshness, access, allowed content, and snapshot sanitization |
| Prompts and elicitation flows | Prompts and interfaces; Planning and orchestration; Guardrails and governance | Input purpose, validation, sensitive fields, consent, and pause or refusal behavior |
| Tools and actions | Tools; Outputs and schemas; Guardrails and governance | Authority, inputs, outputs, side effects, approvals, failure handling, and idempotency |
| Roots and runtime boundaries | Runtime and deployment; Guardrails and governance | Allowed locations, isolation, least privilege, and private path disclosure |
| Sampling and nested model calls | Planning and orchestration; Runtime and deployment; Guardrails and governance | User control, prompt and result visibility, model constraints, cost, and approval |
| Logs, traces, and errors | Evaluation and observability; State; Runtime and deployment | Redaction, audience, retention, correlation, and safe failure details |
| Authorization, consent, and credentials | Guardrails and governance; Runtime and deployment | Identity, scopes, consent, storage, rotation, revocation, and secret handling |

An MCP resource is not automatically durable **Memory**. A tool result, task
message, log, trace, error, or connection session is runtime **State** or
observability data, not durable Memory by default.

Memory writes require an explicit Memory policy and approval. State writes
require documented retention, expiration, or replay rules. See
[Memory vs State](memory-vs-state.md) for the underlying distinction.

## Public vs Private Boundary

Public repositories may contain generic schemas, connector policies, sanitized
configuration shapes, and synthetic fixtures. Keep private the live
configuration and runtime records that apply those definitions.

Do not publish real endpoints, credentials, internal tenant names, local
paths, workplace examples, private source exports, real Memory stores, live
State snapshots, raw traces, private logs, or other private runtime data.

## Review Checklist

### 1. Scope and Intent

- [ ] State what the connector exposes and what it does not expose.
- [ ] Identify the users, systems, and data classes within scope.
- [ ] Map each connector surface to the existing taxonomy buckets.
- [ ] Keep protocol and framework objects as mappings or adapters.
- [ ] Define ownership, change control, and a disable or removal path.

### 2. User Consent and Authority

- [ ] Define who may connect, read, invoke, approve, and revoke access.
- [ ] Request consent before collecting sensitive or unexpected input.
- [ ] Make approval gates explicit for consequential or irreversible actions.
- [ ] Verify that authentication does not imply unlimited authorization.
- [ ] Provide clear refusal, cancellation, and escalation behavior.

### 3. Data Boundaries

- [ ] Inventory allowed sources, destinations, fields, and data classes.
- [ ] Apply least-privilege read and write scopes.
- [ ] Document provenance, freshness, licensing, and audience constraints.
- [ ] Prevent connector content from crossing an unintended trust boundary.
- [ ] Define redaction, deletion, retention, and incident-review procedures.

### 4. Tool and Action Safety

- [ ] Describe tool inputs, outputs, permissions, and side effects.
- [ ] Validate inputs and constrain targets before execution.
- [ ] Require approval for destructive, external, or high-impact actions.
- [ ] Define timeouts, retries, idempotency, rollback, and partial-failure rules.
- [ ] Treat returned content as untrusted until validated for its next use.

### 5. Memory vs State Destination Rules

- [ ] Do not treat a resource or retrieval result as durable Memory by default.
- [ ] Require explicit Memory policy and approval before a Memory write.
- [ ] Keep task messages, tool results, sessions, and checkpoints in State when
      needed for continuation or replay.
- [ ] Define retention, expiration, or replay rules for State writes.
- [ ] Keep logs and traces in observability storage rather than Memory.

### 6. Logging, Traces, and Observability

- [ ] Log only what is required for review, reliability, or audit.
- [ ] Redact secrets, sensitive content, private identifiers, and payloads.
- [ ] Define access, retention, deletion, and export controls.
- [ ] Keep user-visible errors useful without exposing private internals.
- [ ] Use synthetic records for documentation, tests, and public examples.

### 7. Runtime and Deployment Configuration

- [ ] Separate public configuration shapes from private runtime values.
- [ ] Keep credentials in an approved secret store and out of source control.
- [ ] Constrain roots, transports, network access, and environment privileges.
- [ ] Document compatibility, timeouts, cancellation, health, and shutdown.
- [ ] Define credential rotation, revocation, and connector disable procedures.

### 8. Public Examples and Synthetic Fixtures

- [ ] Use synthetic, generic names, content, identifiers, and data.
- [ ] Exclude real endpoints, credentials, tenant names, and local paths.
- [ ] Exclude workplace examples, source exports, and private runtime records.
- [ ] Label fixtures as educational shapes rather than production records.
- [ ] Confirm examples do not imply employer, client, or platform endorsement.

### 9. Validation and Release Readiness

- [ ] Validate schemas, structured examples, links, and Markdown.
- [ ] Test allowed, denied, approval, cancellation, and failure paths.
- [ ] Review the diff for secrets, private identifiers, and runtime data.
- [ ] Confirm Memory, State, outputs, and observability remain separate.
- [ ] Confirm the stable 14-bucket taxonomy is unchanged.
- [ ] Record the checks run and any intentionally deferred risks.

## Public-Safe Example Language

Prefer language such as:

> This synthetic connector definition demonstrates an interface shape. It
> contains no live endpoint, credential, private source data, Memory record,
> State snapshot, log, or trace.

Describe permissions and boundaries without supplying operational secrets.
Use placeholder identifiers that cannot be mistaken for a reachable system.

## Private Adaptation Notes

A private deployment should bind the public design to approved identities,
scopes, sources, destinations, retention settings, audit controls, and secret
management. Review those values in their private operating environment. Do
not copy them back into public examples, issue reports, screenshots, or test
fixtures.

## Related Docs

- [Protocol mapping](protocol-mapping.md)
- [Artifact lifecycle](artifact-lifecycle.md)
- [Memory vs State](memory-vs-state.md)
- [Public safety](public-safety.md)
- [Public release checklist](public-release-checklist.md)
