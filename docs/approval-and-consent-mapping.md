# Approval and Consent Mapping

## Purpose

This guide defines generic artifact classes for approval, consent,
interruption, and continuation, then maps them to named frameworks and coding
agents. It extends the stable 14-bucket taxonomy without changing it. Generic
definitions appear first; framework-specific mappings follow.

Framework claims were last checked on **2026-07-28**.

## Generic Artifact Classes

Five artifact classes cover the approval and consent lifecycle. Each is defined
here before any framework is named. Field references point to
[`schemas/approval.schema.json`](../schemas/approval.schema.json).

### Approval Policy

A design-time document that declares what requires approval, who may decide,
under what conditions, and what happens when a request expires or is not acted
upon. It governs one or more approval records but is not itself a record of a
specific decision.

**Primary bucket:** Guardrails and governance — "Define review and approval
requirements" ([taxonomy.md](taxonomy.md)).

**What it is not:** It is not an individual pending request or decision. It is
not runtime state.

**Schema correspondence:** The `policy_reference` field in
`approval.schema.json` is a pointer to an approval policy, not the policy
content itself. The schema records the reference; the policy lives elsewhere.

### Pending Approval Record

A runtime record that captures a request awaiting a decision. It exists from
the moment the system raises a request until a terminal decision is recorded or
the request expires.

**Primary bucket:** State — "Execution snapshots for a thread, workflow, run,
or session" ([taxonomy.md](taxonomy.md)).

**What it is not:** It is not the policy that required the approval. It is not
durable memory retained for future reuse.

**Schema correspondence:** The `request` object — specifically
`request.requested_action`, `request.requested_by`, `request.requested_at`,
`request.expires_at`, and `request.status` while the status is `pending`.

### Continuation Token

An opaque reference used to resume execution after an approval decision. It
connects the decision to the suspended work without containing the full
execution payload.

**Primary bucket:** State — a continuation token exists to "support
continuation and replay" ([taxonomy.md](taxonomy.md)).

**Secondary bucket:** Planning and orchestration — when the continuation
encodes routing or handoff information, it also maps to "resumability and
continuation logic" ([taxonomy.md](taxonomy.md)).

**What it is not:** It is not the decision itself. It is not a credential or
secret.

**Schema correspondence:** The `continuation.continuation_reference` field — a
`synthetic://` prefixed opaque reference, not payload data.

### Approval Decision Record

A record of a specific decision — approve, edit, reject, cancel, or resume —
applied to a pending request. Multiple decisions may accumulate in a single
approval record when a request is edited and later approved.

**Primary bucket:** Guardrails and governance — an approval decision is
evidence of governance in action.

**Secondary bucket (while in flight):** State — the decision history is part of
the active execution record until the run terminates.

**What it is not:** It is not the policy. It is not the pending request before
a decision is made.

**Schema correspondence:** Each entry in the `decisions` array —
`decision_id`, `decision`, `decided_by`, `decided_at`, and optional
`rationale`.

### Approval Surface

A contract that defines how an approval request is presented to a human
reviewer and what interaction modes are available (approve, edit, reject,
cancel). It describes the user-facing form, not the data behind it.

**Primary bucket:** Prompts and interfaces — "Approval, review, artifact
preview, or export surface" ([taxonomy.md](taxonomy.md)).

**What it is not:** It is not the record of a decision. It is not a tool
schema.

**Schema correspondence:** The schema itself does not model the surface
contract; the surface is defined outside the approval record. The `status` enum
values (`pending`, `approved`, `edited`, `rejected`, `cancelled`, `expired`,
`resumed`, `execution_failed`) imply the interaction vocabulary the surface
must expose.

## Framework-Neutral Principles

1. **Approval policy is separate from an individual approval record.** The
   policy declares what requires approval; the record captures a specific
   request and its decisions. Changing the policy does not retroactively change
   existing records.

2. **Pending items and continuation tokens are State; policies are Guardrails
   and governance.** This separation applies regardless of where the framework
   stores them.

3. **Not every mechanism produces a durable artifact.** Some frameworks keep a
   pending approval decision only in a transport message, a runtime prompt, or
   a session-scoped flag. Where no persistent record exists, the mapping
   produces no durable artifact rather than forcing an assignment to a taxonomy
   bucket. This is the document's most important framing.

4. **Credential and secret collection is excluded.** Approval forms and
   examples in this taxonomy must not collect, display, or store credentials,
   tokens, private keys, or secrets. Sensitive-field collection belongs to
   dedicated authentication flows, not to generic approval surfaces.

5. **The lifecycle covers eight terminal and non-terminal states:**
   approve, edit, reject, cancel, expire, resume, and failed execution —
   matching the `request.status` enum in `schemas/approval.schema.json`.
   `pending` is the initial non-terminal state.

## Framework Mapping

The table below maps each framework's approval mechanism to the generic
classes. The **Where the pending item lives** column is this document's
primary analytical contribution: it determines whether the mechanism produces a
durable artifact that can be enumerated, audited, and governed after the fact.

### MCP (2025-06-18 normative revision)

| Mechanism | Where the pending item lives | Primary bucket | Implementation note |
| --- | --- | --- | --- |
| [Sampling](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling) human-in-the-loop review | Transport message (request/response pair between server and client) | Planning and orchestration; Guardrails and governance | The server sends a `sampling/createMessage` request; the client may prompt the user before forwarding to the model. The pending state exists only in the transport session. No durable approval record is produced unless the client persists one. |
| Client-side tool-call approval | Runtime session (client implementation-specific) | Guardrails and governance | MCP specifies that clients "should" confirm tool calls with the user. The mechanism is entirely client-side; neither the protocol nor the server retains the decision. |
| [Security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | Design-time guidance (no runtime record) | Guardrails and governance | Describes confused-deputy, SSRF, and state-handle risks. The best practices document is itself an approval policy artifact. |

#### MCP draft revision (Multi-Round-Trip Requests)

The [MRTR pattern](https://modelcontextprotocol.io/specification/draft/basic/patterns/mrtr)
([SEP-2322](https://modelcontextprotocol.io/seps/2322-MRTR)) introduces a
stateless multi-round-trip mechanism: a server returns `InputRequiredResult`
with a `requestState` handle; the client echoes it back on retry. The server
need not hold session state between rounds.

[Elicitation](https://modelcontextprotocol.io/specification/draft/client/elicitation)
under the draft revision uses this pattern for structured input (form mode with
JSON Schema) and out-of-band navigation (URL mode for sensitive interactions
like OAuth). The pending state lives in the `requestState` opaque handle passed
through the client. A [Python SDK handler](https://github.com/modelcontextprotocol/python-sdk/blob/main/docs/handlers/multi-round-trip.md)
documents the implementation shape.

**Durability:** The `requestState` handle is a transport-level continuation
token. It produces no durable approval artifact unless the server or client
explicitly persists it. The draft revision may change before finalization.

### LangGraph and LangChain

| Mechanism | Where the pending item lives | Primary bucket | Implementation note |
| --- | --- | --- | --- |
| [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) (`interrupt()`) | Persisted checkpoint (checkpointer storage) | State; Planning and orchestration | The graph pauses at the interrupt node; the full graph state is persisted by the [checkpointer](https://docs.langchain.com/oss/javascript/langgraph/checkpointers). The pending approval is enumerable and auditable from the checkpoint store. |
| [Human-in-the-loop middleware](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) | Persisted checkpoint or runtime callback | Guardrails and governance; State | Tool calls that match the HITL policy suspend execution. The framework offers both static interrupts (require code-level resume) and [dynamic interrupts via LangSmith](https://docs.langchain.com/langsmith/add-human-in-the-loop). |
| Resume with edited state | Persisted checkpoint (modified before replay) | State | After approval, the caller may modify the interrupted state and replay from the checkpoint. This produces an edited-then-approved path. |

**Durability:** LangGraph checkpoints are persisted, enumerable execution
records. Interrupts produce durable pending-approval artifacts that survive
process restarts.

### Agent Skills (Open Specification and Microsoft Agent Framework)

| Mechanism | Where the pending item lives | Primary bucket | Implementation note |
| --- | --- | --- | --- |
| [Open specification](https://agentskills.io/specification) `allowed-tools` field | Design-time declaration (SKILL.md frontmatter) | Guardrails and governance | An experimental field that names tools a skill may use. It is a static policy declaration, not a runtime approval mechanism. Support varies by runtime. |
| [Microsoft Agent Framework tool approval](https://learn.microsoft.com/en-us/agent-framework/agents/skills) | Runtime middleware (`UseToolApproval`) | Guardrails and governance; State | The framework intercepts tool calls and routes them through an approval delegate. The [auto-approval sample](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/02-agents/AgentSkills/Agent_Step07_SkillsAutoApproval) shows policy-based auto-approval for read-only operations. |
| [GitHub Copilot agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | Platform-managed configuration | Prompts and interfaces; Guardrails and governance | Customizable instruction folders that Copilot can discover. The approval surface is GitHub's platform UI, not the skill package. |

**Durability:** The open specification declares static policy. The Microsoft
Agent Framework middleware can produce runtime approval records depending on
implementation. Neither the specification nor the middleware defines a
mandatory persistent record format.

### OpenAI Codex

| Mechanism | Where the pending item lives | Primary bucket | Implementation note |
| --- | --- | --- | --- |
| [Approval policy and sandboxing](https://learn.chatgpt.com/docs/agent-approvals-security) | Runtime session (agent sandbox) | Guardrails and governance; Runtime and deployment | Codex uses OS-enforced sandboxing combined with approval policies. Sensitive actions require explicit user confirmation. The sandbox provides defense-in-depth; the approval policy defines the decision boundary. |
| [Rules files](https://learn.chatgpt.com/docs/agent-configuration/rules) (`.rules` with `prefix_rule()`) | Design-time configuration (committed file) | Guardrails and governance | Rules control which commands may run outside the sandbox: allow, prompt, or forbid via pattern matching. These are approval policy artifacts. |
| [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) | Design-time configuration (`config.toml`) | Runtime and deployment; Guardrails and governance | Defines sandboxing scope, networking, and agent behavior. The configuration is the governance boundary, not a runtime record. |
| [Permission request template](https://github.com/openai/codex/blob/main/codex-rs/prompts/templates/permissions/approval_policy/on_request_rule_request_permission.md) | Transport message (agent-to-user prompt) | Prompts and interfaces | A prompt template for requesting approval. The pending state exists in the live session; no durable record is produced unless the platform persists one. |

**Durability:** Rules files and config are durable policy artifacts. Individual
approval decisions live in the runtime session and are not persisted to a
user-accessible approval record by default.

### GitHub Copilot Cloud Agent

| Mechanism | Where the pending item lives | Primary bucket | Implementation note |
| --- | --- | --- | --- |
| [Agent settings](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings) (validation tools, workflow approval) | Platform-managed configuration | Guardrails and governance; Runtime and deployment | Organization and repository settings control which built-in quality/security tools run and whether GitHub Actions workflows require manual approval. |
| [Agent firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) | Platform-managed allowlist | Guardrails and governance; Runtime and deployment | Domain-level network restrictions at the organization and repository level. The allowlist is itself a design-time governance artifact. |
| [Audit log events](https://docs.github.com/en/copilot/reference/agentic-audit-log-events) | External platform record (GitHub audit log) | Evaluation and observability; Guardrails and governance | Agent sessions, tool uses, and decisions are recorded in the organization's audit log. These are durable approval decision records accessible via the audit-log API. |
| Pull request review requirement | External platform record (GitHub PR) | Guardrails and governance; Prompts and interfaces | The cloud agent opens a pull request; merging requires the same review approval as human-authored code. The PR is a [code-review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) artifact in the GitHub platform. |

**Durability:** The cloud agent's pending work and decisions are stored in
GitHub's platform (PRs, workflow runs, audit logs). These are durable,
enumerable records. The approval surface is GitHub's native review UI, not a
custom agent artifact.

### Claude Code

| Mechanism | Where the pending item lives | Primary bucket | Implementation note |
| --- | --- | --- | --- |
| [Permission system](https://code.claude.com/docs/en/permissions) (allow / ask / deny rules) | Design-time configuration (settings files) | Guardrails and governance; Runtime and deployment | A tiered rule system evaluated in deny → ask → allow order. Rules persist in user, project, or managed settings files. The rules themselves are approval policy artifacts. |
| Per-action approval prompt | Runtime session (terminal or IDE prompt) | Prompts and interfaces; Guardrails and governance | When a tool call matches an "ask" rule, the user is prompted to allow or deny. The pending state exists only in the live session. A "Yes, don't ask again" response persists the decision as an allow rule in `.claude/settings.local.json`. |
| [Sandboxing](https://code.claude.com/docs/en/security) (Seatbelt / bubblewrap) | OS-enforced isolation boundary | Runtime and deployment; Guardrails and governance | Filesystem and network isolation for Bash and child processes. When sandboxed, a bare `Bash` rule may be auto-satisfied by the sandbox boundary. The sandbox is a runtime enforcement layer, not a decision record. |
| Accept Edits mode | Runtime session (mode flag) | Guardrails and governance | Auto-approves file edits and a fixed set of filesystem commands within the working directory. Everything else still prompts. The mode flag does not persist to configuration; it is session-scoped. |

**Durability:** Permission rules (allow/deny) are durable configuration
artifacts. Individual per-action approval decisions do not produce a persistent
record unless the user elects "don't ask again," which converts the decision
into a rule. The sandbox boundary is an enforcement mechanism, not a record.

## Structural Divergences

The frameworks above differ in kind, not only in naming:

### Transport Request/Response vs Persisted Suspended Execution

MCP sampling and Codex permission prompts keep the pending state in a live
transport session. If the session ends, the pending request is lost. LangGraph
interrupts persist the full execution state to a checkpoint store. The pending
request survives process restarts and can be enumerated externally.

**Implication for durability:** Transport-only mechanisms produce no durable
artifact by default. Persisted-checkpoint mechanisms produce an artifact that
can be audited, replayed, and governed.

### Static Declaration vs Runtime Approval

Agent Skills `allowed-tools`, Codex `.rules` files, Claude Code permission
settings, and GitHub Copilot agent settings are design-time declarations. They
define what will require approval. The actual approval prompt happens at
runtime in a separate mechanism. The declaration is a Guardrails and governance
artifact; the runtime prompt is a Prompts and interfaces surface; the pending
state (if persisted) is State.

### Per-Command Prompt vs Platform-Native Review

Claude Code and Codex prompt the user per command in the terminal or IDE.
GitHub Copilot's cloud agent uses GitHub's native pull-request review as the
approval gate. The former is session-scoped and ephemeral by default; the
latter is platform-scoped and durably recorded.

**Implication for enumeration and audit:** Platform-native review produces
records that are already integrated into organizational audit logs. Per-command
prompts require the agent or client to persist records explicitly.

## Status and History Semantics

In `schemas/approval.schema.json`:

- **`request.status`** is the authoritative current lifecycle state of the
  approval record. It is a single enum value drawn from `pending`, `approved`,
  `edited`, `rejected`, `cancelled`, `expired`, `resumed`, and
  `execution_failed`.

- **`decisions`** is an ordered history array. Each entry records one decision
  event with its own `decision_id`, `decision` enum, `decided_by`, and
  `decided_at`.

**No cross-field constraint is enforced between them.** A consumer must not
assume that `request.status` is the last entry in `decisions`. The status may
be `expired` with no corresponding decision entry (expiration is a
system-initiated state transition, not a human decision). The status may be
`execution_failed` after an `approve` decision, meaning the approved action
was attempted and failed.

Readers building on this schema should treat `request.status` as the single
source of truth for "what is the current state?" and `decisions` as the audit
trail for "how did we get here?" — without assuming an invariant relationship
between the two.

## Security and Public-Safety Guidance

For connector-facing safety review, use the
[MCP and connector safety review checklist](mcp-connector-safety-checklist.md).
The following guidance is specific to approval artifacts:

1. **Credential and token collection is excluded from approval forms.** An
   approval surface must not double as a credential-collection form. Sensitive
   authentication flows use dedicated mechanisms outside the generic approval
   lifecycle. MCP's elicitation URL mode exists precisely to separate sensitive
   collection from structured approval forms.

2. **State echoed through a client must be treated as untrusted input.** MCP's
   `requestState` and any continuation token that passes through an
   intermediary must be validated, integrity-checked, or encrypted by the
   server. A client can tamper with or replay opaque state.

3. **Suspended-execution payloads should be serializable and bounded.** A
   continuation reference (not the full execution state) should be the public
   artifact. Full checkpoint payloads may contain tool outputs, message
   histories, or intermediate reasoning that should not be exposed.

4. **Detailed error text can leak internal detail.** The `execution_failed`
   status should carry a sanitized summary, not a raw stack trace or tool
   output. The `rationale` field in `decisions` is capped at 240 characters
   and must not contain raw prompts, tool payloads, or secrets.

5. **Approval records are not memory.** An approval record is State — an
   execution snapshot for a specific run. It should not be retained as durable
   Memory unless an explicit memory policy governs it. See
   [memory-vs-state.md](memory-vs-state.md).

## Coverage Boundaries

This document does not cover:

- **OpenAI Agents SDK** — the Agents SDK's approval and handoff mechanisms are
  not mapped here because the SDK's approval surface is not documented in the
  Codex sources used for this mapping.
- **Vendor-specific approval-queue products** — platform-managed approval
  queues (ServiceNow, PagerDuty, Slack workflows, etc.) are not mapped.
- **MCP MRTR material describes a draft revision** that may change before
  finalization. Draft specification URLs move at finalization; do not build a
  durable mapping on them.
- **The deprecated `openai/skills` repository** is referenced only for
  completeness; the repository is deprecated and its approval behavior is not
  mapped.
- **Session-scoped approval flags** — whether Claude Code's Accept Edits mode
  or Codex's session-level approvals persist to configuration is described from
  official documentation only. Claims that could not be confirmed from primary
  documentation are omitted rather than inferred.

## Official References

### MCP Sources

- [Sampling (2025-06-18, normative)](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling)
- [Elicitation (draft)](https://modelcontextprotocol.io/specification/draft/client/elicitation)
- [Multi-Round-Trip Requests (draft)](https://modelcontextprotocol.io/specification/draft/basic/patterns/mrtr)
- [SEP-2322: MRTR](https://modelcontextprotocol.io/seps/2322-MRTR)
- [Security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Python SDK MRTR handler](https://github.com/modelcontextprotocol/python-sdk/blob/main/docs/handlers/multi-round-trip.md)

### LangGraph and LangChain Sources

- [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- [Checkpointers](https://docs.langchain.com/oss/javascript/langgraph/checkpointers)
- [Human-in-the-loop (LangChain)](https://docs.langchain.com/oss/python/langchain/human-in-the-loop)
- [Human-in-the-loop (LangSmith)](https://docs.langchain.com/langsmith/add-human-in-the-loop)

### Agent Skills Sources

- [Open specification](https://agentskills.io/specification)
- [Microsoft Agent Framework skills](https://learn.microsoft.com/en-us/agent-framework/agents/skills)
- [Auto-approval sample](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/02-agents/AgentSkills/Agent_Step07_SkillsAutoApproval)
- [GitHub Copilot agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

### OpenAI Codex Sources

- [Approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security)
- [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules)
- [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference)
- [Permission request template](https://github.com/openai/codex/blob/main/codex-rs/prompts/templates/permissions/approval_policy/on_request_rule_request_permission.md)

### GitHub Copilot Cloud Agent Sources

- [About cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
- [Agent settings](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings)
- [Agent firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall)
- [Audit log events](https://docs.github.com/en/copilot/reference/agentic-audit-log-events)
- [Code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review)

### Claude Code Sources

- [Permissions](https://code.claude.com/docs/en/permissions)
- [Security](https://code.claude.com/docs/en/security)

## Related Taxonomy Guides

- [Canonical taxonomy](taxonomy.md)
- [Protocol mapping](protocol-mapping.md)
- [Framework mapping](framework-mapping.md)
- [Memory vs State](memory-vs-state.md)
- [MCP and connector safety review checklist](mcp-connector-safety-checklist.md)
- [UI and interaction harness artifacts](ui-harness-artifacts.md)
