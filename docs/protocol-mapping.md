# Protocol Mapping

## Purpose

This guide maps the framework-neutral taxonomy in
[taxonomy.md](taxonomy.md) to interoperability surfaces in the Model Context
Protocol (MCP) and Agent2Agent Protocol (A2A).

Protocol objects are mappings at the implementation edge. They do not replace
the canonical 14 taxonomy buckets, define the complete agent artifact
lifecycle, or establish universal filenames for agent projects.

## How to Read This Guide

Each table follows the same pattern:

```text
Generic artifact class -> protocol surface -> implementation note
```

A protocol surface may map to more than one taxonomy bucket because its
definition, runtime use, and governance requirements can have different
owners. The first bucket listed is usually the primary mapping.

Treat these mappings as practical guidance rather than exact equivalence.
Protocol versions and implementation details can change, while the taxonomy
provides stable concepts for organizing and reviewing those changes.

## Artifact Naming Note

This repo uses **artifact** broadly for any addressable, versionable,
inspectable, and governable file, schema, prompt, policy, module,
configuration, runtime record, evaluation asset, output, or release record
that an agentic system depends on.

A2A uses `Artifact` more narrowly for a task output composed of content
`Parts`. In this taxonomy, an A2A `Artifact` therefore maps mainly to
**Outputs and schemas** and **State**. It may also map to **Evaluation and
observability** when a sanitized artifact is referenced by a trace, test, or
evaluation.

Always qualify the term when the meaning could be ambiguous:

- **Taxonomy artifact** means the broad repo concept.
- **A2A Artifact** means the protocol's task-output object.
- **Runtime output** means generated content from a specific execution.

See [naming-conventions.md](naming-conventions.md) for broader guidance on
taxonomy names, file conventions, local project filenames, and framework or
protocol naming collisions.

## MCP Mapping

MCP standardizes communication between hosts, clients, and servers. Its core
server features include resources, prompts, and tools. Client features include
roots (deprecated), sampling (deprecated), and elicitation. The protocol also
defines transport, configuration, progress, cancellation, error, logging
(deprecated), authorization, and consent-related surfaces.

MCP is an interoperability protocol, not a complete agent package, memory
model, evaluation system, or deployment standard.

| MCP surface | Taxonomy bucket or buckets | Implementation note |
| --- | --- | --- |
| `server/discover` | Runtime and deployment; Identity | Map the discovery RPC's supported versions, capabilities, and instructions to runtime and deployment documentation. Servers MUST implement `server/discover`; calling it is optional for clients. Its `serverInfo` field is a secondary Identity mapping — it is self-reported and not verified by the protocol, so do not use it for security decisions ([SEP-2575](https://modelcontextprotocol.io/seps/2575-stateless-mcp), `2026-07-28` revision). |
| Resources and resource templates | Knowledge and resources | Map approved documents, data, and context sources here. Record provenance, freshness, access boundaries, and audience outside live resource contents when needed. An MCP resource is not automatically durable memory or runtime state. |
| Prompts | Prompts and interfaces | Map reusable prompt definitions, arguments, and user-selectable workflows here. Keep model instructions, interface contracts, and capability procedures distinct when the implementation separates them. |
| Tools | Tools; Guardrails and governance; Outputs and schemas | Map callable functions and their input or output schemas to Tools and Outputs and schemas. Document permissions, side effects, approvals, and failure behavior under Guardrails and governance. A tool is not a capability module or skill. |
| Cacheable results (`ttlMs`, `cacheScope`) | Runtime and deployment; Guardrails and governance | Map required caching hints on `server/discover`, list methods, and `resources/read` results to runtime documentation. `ttlMs` is a freshness hint, not a guarantee. `cacheScope: "public"` means a result may be cached and shared across callers for performance; it does not mean the content is safe to publish, safe to persist durably, or free of sensitive content ([SEP-2549](https://modelcontextprotocol.io/seps/2549-TTL-for-list-results), `2026-07-28` revision). |
| Roots | Runtime and deployment; Guardrails and governance | Treat declared URI or filesystem boundaries as runtime scope guidance. Servers are expected to honor declared roots, but the protocol does not enforce confinement; actual enforcement lives in client-side permissions, path validation, allowlists, and sandboxing. A root does not grant permission by itself and should not expose private workspace paths in public documentation. **Deprecated ([SEP-2577](https://modelcontextprotocol.io/seps/2577-deprecate-roots-sampling-and-logging), `2026-07-28` revision).** Still fully functional under the [feature lifecycle policy](https://modelcontextprotocol.io/community/feature-lifecycle); eligible for removal no earlier than the first specification revision released on or after 2027-07-28. New implementations should not adopt it; migrate to tool parameters, resource URIs, or server configuration. |
| Elicitation | Prompts and interfaces; Planning and orchestration; Guardrails and governance | Map input requests and validation contracts to Prompts and interfaces. Map the decision to pause and request information to Planning and orchestration. Document consent, sensitive-field handling, and prohibited collection under Guardrails and governance. |
| Sampling | Planning and orchestration; Runtime and deployment; Guardrails and governance | Map model-generation requests and nested flows to orchestration and runtime behavior. Document user control, prompt visibility, model constraints, result visibility, and approval expectations. **Deprecated ([SEP-2577](https://modelcontextprotocol.io/seps/2577-deprecate-roots-sampling-and-logging), `2026-07-28` revision).** Still fully functional under the [feature lifecycle policy](https://modelcontextprotocol.io/community/feature-lifecycle); eligible for removal no earlier than the first specification revision released on or after 2027-07-28. New implementations should not adopt it; migrate to direct integration with LLM provider APIs. |
| Transports, per-request capabilities, and configuration | Runtime and deployment; Guardrails and governance | Map transport bindings, per-request capability declaration via `_meta`, version negotiation, backward-compatibility detection, timeouts, and deployment requirements to runtime documentation. This revision is stateless: there is no connection-scoped initialization handshake or session, and capabilities are declared per request rather than negotiated once ([SEP-2575](https://modelcontextprotocol.io/seps/2575-stateless-mcp), [SEP-2567](https://modelcontextprotocol.io/seps/2567-sessionless-mcp), `2026-07-28` revision). Keep credentials and private endpoints out of committed examples. |
| Routing headers (`Mcp-Method`, `Mcp-Name`, `MCP-Protocol-Version`, `x-mcp-header`) | Runtime and deployment; Guardrails and governance | Map required Streamable HTTP routing headers, which mirror JSON-RPC body fields so intermediaries can route without parsing the body, to runtime documentation. Servers MUST validate that header values match the body and reject mismatches; document this under Guardrails and governance as a spoofing-prevention control, not as authorization ([SEP-2243](https://modelcontextprotocol.io/seps/2243-http-standardization), `2026-07-28` revision). |
| `subscriptions/listen` | Evaluation and observability; Runtime and deployment | Map the long-lived stream a client opens to receive tool, prompt, and resource change notifications to observability documentation, and its lifecycle (acknowledgment, cancellation, reconnection) to runtime documentation. It replaces the removed HTTP GET endpoint and the `resources/subscribe`/`resources/unsubscribe` RPCs (specification: [Subscriptions](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions), `2026-07-28` revision). |
| Progress tracking and cancellation | Evaluation and observability; State; Runtime and deployment | Treat progress notifications and cancellation status as runtime observability and execution state. Document retry, cleanup, timeout, and continuation behavior in runtime guidance. |
| Error reporting and logging | Evaluation and observability; State; Runtime and deployment | Map error shapes and logging configuration to observability and runtime operations. Logs and error payloads from real runs are runtime records, not design-time definitions. **Protocol-level logging is deprecated ([SEP-2577](https://modelcontextprotocol.io/seps/2577-deprecate-roots-sampling-and-logging), `2026-07-28` revision).** The logging surface remains fully functional under the [feature lifecycle policy](https://modelcontextprotocol.io/community/feature-lifecycle); eligible for removal no earlier than the first specification revision released on or after 2027-07-28. New implementations should not adopt protocol-level logging; migrate to `stderr` for stdio transports or OpenTelemetry for structured observability. Error reporting is not deprecated. |
| Authorization, security, consent, and data privacy | Guardrails and governance; Runtime and deployment | Document authorization design, user consent, data boundaries, tool safety, and sampling controls. Publish configuration shapes or policies only when sanitized; never publish live tokens, credentials, or private authorization details. |

See [Approval and consent mapping](approval-and-consent-mapping.md) for a
detailed breakdown of how MCP sampling, elicitation, and the draft
multi-round-trip pattern relate to the approval and consent lifecycle.

### MCP Coverage Boundaries

MCP surfaces may carry identity or operating guidance through prompt, resource,
or configuration content, but MCP does not define universal models for
**Identity**, **Operating style**, **Capability modules**, **Memory**,
**Evaluation and observability**, or **Learning and iteration**. Keep those
artifacts in their canonical taxonomy buckets and reference the MCP adapter
only where the implementation exposes them.

## A2A Mapping

A2A supports agent discovery and communication across independently
implemented agent systems. Its data model includes discovery objects, tasks,
messages, parts, task artifacts, push notification configuration, protocol
bindings, and security objects.

A2A is an interoperability protocol, not a replacement for an agent's internal
prompts, tools, memory, planning implementation, evaluations, or release
process.

| A2A surface | Taxonomy bucket or buckets | Implementation note |
| --- | --- | --- |
| `AgentCard` | Identity; Capability modules; Prompts and interfaces; Runtime and deployment; Guardrails and governance | Treat the card as a protocol-facing discovery manifest. Identity fields describe the agent; skills describe advertised capabilities; input and output modes describe interface expectations; supported interfaces describe runtime access; security declarations describe governance requirements. The card is not the complete internal agent definition. |
| `AgentProvider` | Identity; Runtime and deployment | Map provider identity and public documentation metadata here. Use generic or public organization information only; do not imply endorsement. |
| `AgentCapabilities` | Capability modules; Tools; Runtime and deployment | Map declared support for streaming, push notifications, extensions, or extended cards to capability and runtime documentation. A capability flag may describe tool-backed behavior, but it is not a tool schema or implementation. |
| `AgentExtension` | Runtime and deployment; Tools; Guardrails and governance | Treat extension identifiers, required behavior, compatibility, and parameters as protocol adapter configuration. Review required extensions for new actions, data access, or policy obligations. |
| `AgentSkill` | Capability modules | Map the advertised capability description, tags, examples, media modes, and skill-level security requirements here. An A2A `AgentSkill` is descriptive metadata and is not automatically equivalent to a file bundle such as `SKILL.md`. |
| `AgentInterface` | Prompts and interfaces; Runtime and deployment | Map supported URLs, protocol bindings, versions, and routing identifiers to interface and runtime contracts. Public examples must use synthetic endpoints rather than private service URLs. |
| `AgentCardSignature` | Guardrails and governance; Runtime and deployment | Map signing, verification, key management expectations, and trust policy to governance and runtime operations. Publish verification guidance, not real private keys or signing secrets. |
| `Task`, `TaskStatus`, and `TaskState` | State; Planning and orchestration | Treat task identifiers, lifecycle status, interruptions, cancellation, and continuation as runtime state. Map the workflow decisions that create, route, pause, resume, or cancel tasks to Planning and orchestration. Live task records do not belong in a public design-time manifest. |
| `Message` and `Role` | Prompts and interfaces; State | Map message structure and role contracts to Prompts and interfaces. Actual messages associated with a task or context are runtime state and may contain private user data. |
| `Part` | Prompts and interfaces; Outputs and schemas; State | Map text, files, URLs, structured data, media types, and content validation to interface or output contracts. A live `Part` inside a message or task artifact is runtime data. |
| `Artifact` | Outputs and schemas; State; Evaluation and observability | Treat the A2A object as a task output with one or more `Parts`. Its output contract belongs in Outputs and schemas; the generated instance belongs to State. Sanitized references may support traces or evaluations. |
| Streaming task and artifact updates | Evaluation and observability; State; Runtime and deployment | Map status and artifact update events to runtime observability and transient task state. Document ordering, reconnection, idempotency, and retention expectations without publishing real streams. |
| Push notification configuration | Runtime and deployment; State; Guardrails and governance | Map webhook lifecycle and delivery settings to runtime configuration, task association to State, and authentication, validation, SSRF protection, and secret handling to Guardrails and governance. |
| Protocol bindings and negotiation | Runtime and deployment; Prompts and interfaces | Map supported bindings, protocol versions, functional equivalence, method mapping, and selection behavior to runtime and interface contracts. Binding-specific filenames remain implementation choices. |
| Security schemes and requirements | Guardrails and governance; Runtime and deployment | Map declared authentication methods, authorization expectations, transport security, and access-control requirements here. Commit only sanitized declarations and never credentials, tokens, private keys, or private authorization endpoints. |

### A2A Coverage Boundaries

An Agent Card can advertise identity, interfaces, skills, and security
requirements, but it should reference rather than absorb the system's internal
operating style, tool definitions, memory policy, planning implementation,
evaluation assets, and iteration history.

Likewise, A2A tasks, messages, parts, task artifacts, and notification payloads
are runtime records. Their schemas and retention policies may be design-time
artifacts, but real instances should be handled as private runtime data unless
they are explicitly sanitized for publication.

See the synthetic [A2A-style Agent Card example](../examples/agent-card.json)
for an educational discovery-manifest shape. It is intentionally incomplete
and is not a certified protocol implementation.

## Cross-Protocol Guidance

### Publish Protocol Manifests Deliberately

Publish an MCP or A2A manifest when another system needs a stable,
reviewable interoperability contract. A public manifest should state:

- The protocol and supported version or compatibility range.
- The taxonomy artifacts represented or referenced by the manifest.
- Supported capabilities, inputs, outputs, and expected failure behavior.
- Security, consent, approval, and data-handling expectations.
- Ownership, change policy, and compatibility expectations.

Do not treat a sample filename as a universal convention. Use the filename
required by the protocol or implementation, then document how it maps back to
the taxonomy.

### Separate Definitions From Runtime Records

Keep these design-time artifacts separate from live protocol data:

| Design-time artifact | Runtime record |
| --- | --- |
| MCP tool, resource, or prompt definition | Tool call, returned content, elicitation response, log, or error |
| MCP transport and authorization policy | Connection session, token, progress event, or cancellation record |
| A2A Agent Card or interface contract | Task, status, message, part, task artifact, or push payload |
| State, output, trace, or retention schema | Live state snapshot, generated output, trace, or notification configuration |

Publish schemas, policies, and synthetic examples when they help review.
Do not publish real runtime instances merely because the protocol serializes
them as JSON or another portable format.

### Keep Memory, State, and Outputs Separate

- **Memory** is durable knowledge retained for future reuse under explicit
  privacy, consent, retention, correction, and deletion rules.
- **State** is execution-specific information used to continue, inspect, or
  debug a task, session, connection, or workflow.
- **Outputs and schemas** define or contain what the system produces.

An MCP resource is not automatically memory. An A2A task history is state, not
durable memory. An A2A `Artifact` is a runtime output associated with task
state, not the taxonomy's entire artifact universe.

### Protocol Statelessness Versus Application State

MCP is stateless at the protocol layer: every request is self-contained, and
there is no connection-scoped initialization handshake or session
([SEP-2575](https://modelcontextprotocol.io/seps/2575-stateless-mcp),
[SEP-2567](https://modelcontextprotocol.io/seps/2567-sessionless-mcp)). This is
a property of the transport, not the agent built on top of it — application-level
state such as continuations, approval records, task handles, checkpoints, and
workflow position remains stateful and maps to **State** or **Planning and
orchestration** exactly as before.

Explicit handles that a server returns and a client threads through later
requests, such as a `requestState` identifier, are **State** artifacts: opaque
references to server-held execution state. They are not **Memory**, and
resembling a token is not the same as being one — do not treat a handle as an
authorization credential unless the server has documented it as such.

### Map Overlap Explicitly

When one protocol object crosses several buckets, identify the primary owner
and document the secondary concerns. For example, an A2A Agent Card is
primarily a discovery and identity manifest, while its interfaces and security
fields also require runtime and governance review.

Avoid creating a new taxonomy category for every protocol object. Add a mapping
or adapter unless the underlying framework-neutral concept is genuinely absent
from the canonical model.

## Public-Safety Checklist

Before publishing protocol-facing documentation or manifests:

Use the framework-neutral
[MCP and connector safety review checklist](mcp-connector-safety-checklist.md)
for detailed authority, data, action, persistence, runtime, and release review.

- [ ] Use generic descriptions and synthetic identifiers.
- [ ] Use public official protocol URLs and synthetic service endpoints.
- [ ] Remove secrets, credentials, tokens, private keys, and signed private
      payloads.
- [ ] Remove private endpoint URLs, internal hostnames, tenant identifiers, and
      filesystem roots.
- [ ] Remove employer-, client-, and user-specific workflows or metadata.
- [ ] Do not publish real user messages, elicitation responses, task histories,
      task artifacts, notification payloads, or session state.
- [ ] Do not publish production logs, traces, error payloads, or tool results
      without explicit sanitization and review.
- [ ] Keep real memory stores and retained user preferences private.
- [ ] Document permissions, side effects, approval gates, and data boundaries
      without exposing operational secrets.
- [ ] Verify that protocol objects remain mappings to the canonical 14 buckets
      rather than a competing taxonomy.

## Official References

- [MCP specification (2026-07-28)](https://modelcontextprotocol.io/specification/2026-07-28)
- [SEP-2575: Make MCP Stateless](https://modelcontextprotocol.io/seps/2575-stateless-mcp)
- [SEP-2567: Sessionless MCP via Explicit State Handles](https://modelcontextprotocol.io/seps/2567-sessionless-mcp)
- [SEP-2577: Deprecate Roots, Sampling, and Logging](https://modelcontextprotocol.io/seps/2577-deprecate-roots-sampling-and-logging)
- [SEP-2243: HTTP Header Standardization for Streamable HTTP Transport](https://modelcontextprotocol.io/seps/2243-http-standardization)
- [SEP-2549: TTL for List Results](https://modelcontextprotocol.io/seps/2549-TTL-for-list-results)
- [MCP feature lifecycle policy](https://modelcontextprotocol.io/community/feature-lifecycle)
- [MCP deprecated features registry (2026-07-28)](https://modelcontextprotocol.io/specification/2026-07-28/deprecated)
- [MCP specification: Subscriptions pattern (2026-07-28)](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions)
- [A2A specification, latest release](https://a2a-protocol.org/latest/specification/)
- [A2A specification source](https://github.com/a2aproject/A2A/blob/main/docs/specification.md)
