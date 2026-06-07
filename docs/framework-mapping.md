# Framework Mapping

This taxonomy starts from generic artifact classes. Framework-specific surfaces
are mappings, not replacements for the taxonomy.

The canonical taxonomy remains the 14 buckets in
[taxonomy.md](taxonomy.md). The mappings below use the starter templates as
anchors so a maintainer can see how a generic artifact might appear in several
agent frameworks or protocols.

Protocol-specific files such as MCP server definitions or A2A agent cards are
adapters or mapping surfaces. They do not replace the generic artifact classes
or make a protocol's naming model canonical for this repo.

This document keeps protocol coverage at a high level. Detailed MCP and A2A
manifest guidance and examples are deferred to dedicated protocol-mapping work
rather than being folded into the taxonomy itself.

Mapping pattern:

```text
Generic artifact class -> template/file -> OpenAI mapping -> Anthropic mapping -> MCP mapping -> LangGraph/LangSmith mapping -> implementation notes
```

These mappings are intentionally cautious. A framework surface may cover only
part of a generic artifact class, and different teams may implement the same
class with plain Markdown, YAML, JSON Schema, application code, or hosted
configuration.

## Template-Anchored Mappings

| Generic artifact class | Template/file | OpenAI mapping | Anthropic mapping | MCP mapping | LangGraph/LangSmith mapping | Implementation notes |
| --- | --- | --- | --- | --- | --- | --- |
| Identity | [`templates/agent.yaml`](../templates/agent.yaml) | Can be represented by agent configuration, agent name, instructions metadata, model selection, tool references, and hosted or SDK-level configuration. | Can be represented by a Claude Code configuration, project context, system prompt role, or an application-level agent manifest. | No direct universal agent manifest primitive. Identity commonly appears as client or server configuration, prompt context, or a resource that describes the agent. | Can map roughly to graph or assistant configuration, runnable metadata, deployment configuration, or project metadata. | Keep identity focused on what the agent is, owns, and depends on. Put behavior in persona or principles, and callable actions in tool specs. |
| Identity | [`templates/persona.md`](../templates/persona.md) | Maps roughly to system or developer instructions that define role, scope, intended users, and boundaries. | Maps roughly to the `system` parameter, Claude Code project guidance, or other role/context instructions. | Can be exposed as a prompt, resource, or client-supplied context, but MCP does not require a persona artifact. | Can appear as node prompts, assistant instructions, graph-level configuration, or app-level context. | Persona is still an identity artifact. Avoid turning it into a skill workflow, tool schema, or runtime state record. |
| Operating style | [`templates/principles.md`](../templates/principles.md) | Commonly appears as system or developer instructions, guardrail-adjacent policy text, or review guidance used with an agent. | Commonly appears as project instructions, Claude Code guidance, or system prompt guidance. | Can be represented by prompts or resources that clients include as context; it is not a tool. | Can appear as graph-level instructions, node prompt guidance, evaluator criteria, or project documentation. | Use this for decision rules, uncertainty handling, tone, escalation posture, and source posture. Keep it separate from specific task procedures. |
| Capability modules | [`templates/SKILL.md`](../templates/SKILL.md) | Maps roughly to OpenAI Skills or local reusable task modules when available; otherwise it can be represented as versioned procedural guidance used by an agent. | Maps closely to Anthropic Skills or Claude Code skill folders when that surface is available. | No direct skill primitive. A skill may reference MCP tools, prompts, and resources, but it is not itself an MCP tool. | Can be represented by reusable subgraphs, node procedures, runnable packages, or documented task modules. LangSmith can evaluate behavior that uses a skill. | A skill explains how to perform a task. A tool performs a callable action. Do not collapse these concepts. |
| Tools | [`templates/tools.yaml`](../templates/tools.yaml) | Maps to function tools, hosted tools, MCP-backed tools, or SDK tool definitions with input and output contracts. | Maps to client tools, Anthropic-defined tools, Claude Code tools, or MCP-connected tools, depending on the runtime. | Maps directly to MCP tools, including tool names, descriptions, input schemas, and invocation behavior. | Maps to tool nodes, bound tools, external integrations, or callable functions inside a graph. LangSmith can trace tool calls. | Tool specs should make permissions, side effects, approvals, inputs, outputs, and failure modes reviewable. Do not include secrets or production endpoints. |
| Knowledge and resources | [`templates/resources.yaml`](../templates/resources.yaml) | Can map to file search, vector stores, retrieval resources, uploaded files, or application-managed context. | Can map to project knowledge, files, retrieval sources, or MCP-provided resources. | Maps directly to MCP resources and resource templates when a server exposes readable data or content. | Can map to retrievers, document loaders, vector stores, graph inputs, or dataset references. | Resources are approved information sources. They are not memory; memory is durable retained knowledge governed by a separate policy. |
| Memory | [`templates/memory-policy.yaml`](../templates/memory-policy.yaml) | Maps roughly to stored user preferences, application memory services, vector stores used for durable recall, or product-level memory controls. | Maps roughly to application-managed memory, project knowledge conventions, or Claude surfaces that retain approved context. | MCP can expose memory stores as tools or resources, but the policy remains outside the protocol primitive. | LangGraph uses memory concepts in some docs, but preserve the repo distinction: durable retained knowledge is memory, while checkpoints are state. LangSmith can evaluate memory-sensitive behavior with synthetic cases. | Publish the policy, schema, and synthetic examples. Do not publish real memory stores, private user preferences, or hidden runtime context. |
| State | [`templates/state-strategy.md`](../templates/state-strategy.md) | Can map to run state, thread context, response IDs, tool-call progress, or application-managed session records. | Can map to conversation context, tool-use progress, Claude Code session context, or app-managed continuation records. | MCP servers and clients may hold session context, but MCP resources are not automatically runtime state. | Maps strongly to LangGraph checkpoints, thread state, graph state, resumable workflows, and debugging snapshots. LangSmith traces can help inspect runs. | State is runtime-specific continuation or debugging data. Keep it separate from durable memory and do not commit unsanitized state snapshots. |
| Outputs and schemas | [`templates/output.schema.json`](../templates/output.schema.json) | Maps to structured outputs, JSON Schema response formats, tool result schemas, or application-level validation contracts. | Maps roughly to tool input schemas, expected JSON output contracts, or application-side validation around Claude responses. | Maps to tool input schemas, tool result expectations, prompt arguments, or resource schemas when documented by a server. | Maps to state schemas, typed graph outputs, evaluator output schemas, dataset schemas, or application validation. | Use schemas when outputs feed downstream systems or evaluations. Keep schemas independent from private examples and runtime traces. |
| Evaluation and observability | [`templates/eval-rubric.md`](../templates/eval-rubric.md) | Maps to evals, tracing, review rubrics, regression datasets, or monitoring used around agent behavior. | Maps roughly to evaluation prompts, review rubrics, test cases, and application telemetry around Claude workflows. | MCP does not define an evaluation system, but tool/resource interactions can be logged or tested by the client or server. | Maps strongly to LangSmith datasets, evaluators, experiments, traces, and regression workflows. | Use synthetic or sanitized test cases. Do not publish private traces, raw user prompts, tool outputs, or production observability records. |

## Additional Template-Anchored Mappings

The expanded template pack also provides anchors for the remaining taxonomy
buckets and for distinct sub-surfaces within combined buckets.

| Generic artifact class | Template/file | OpenAI mapping | Anthropic mapping | MCP mapping | LangGraph/LangSmith mapping | Implementation notes |
| --- | --- | --- | --- | --- | --- | --- |
| Prompts and interfaces | [`templates/PROMPT.md`](../templates/PROMPT.md) and [`templates/INTERFACE.md`](../templates/INTERFACE.md) | Prompt specs, task templates, message patterns, hosted prompt configuration, interface schemas, elicitation flows, or input contracts. | Prompt templates, system prompts, project instructions, commands, interface schemas, or UI flows. | MCP prompts and elicitation can represent parts of reusable prompt and input-collection surfaces. | Node prompts, graph inputs, chain prompts, or app interface contracts. | Keep prompt specs, task templates, interface schemas, elicitation flows, and input contracts versioned and separate from skill modules and tool definitions. |
| Planning and orchestration | [`templates/PLAN.md`](../templates/PLAN.md) and [`templates/HANDOFFS.md`](../templates/HANDOFFS.md) | Planning policies, plans, agent handoffs, orchestration code, workflow configuration, routing, and continuation state. | Multi-step Claude Code workflows, delegation, app-level orchestration, or MCP-connected workflow tools. | MCP tools and sampling can participate in orchestration, but the protocol is not itself a planning model. | LangGraph graphs, nodes, edges, conditional routing, interrupts, checkpoints, and resumable workflows. | Some frameworks split planning, routing, delegation, handoffs, and continuation more finely. This repo keeps them in one stable top-level bucket. |
| Guardrails and governance | [`templates/GUARDRAILS.md`](../templates/GUARDRAILS.md) | Guardrails, approval gates, tool permissions, moderation checks, and policy layers. | Tool permission settings, system guidance, app-level safety checks, and review gates. | Tool permissions and server policy can support governance, but policy design is application-specific. | Interrupts, human-in-the-loop approvals, evaluators, deployment controls, and trace review. | Make authority boundaries, approval requirements, and prohibited data explicit. |
| Runtime and deployment | [`templates/RUNTIME.md`](../templates/RUNTIME.md) | Hosted agent settings, model/runtime configuration, environment variables, deployment manifests, or SDK app configuration. | Claude Code settings, API runtime configuration, tool permission settings, or deployment environment docs. | MCP server configuration, transports, client settings, and deployment manifests. | LangGraph deployment configuration, checkpointer setup, runtime stores, and LangSmith project configuration. | Keep environment assumptions separate from behavior instructions. Commit examples only when they are generic and secret-free. |
| Learning and iteration | [`templates/ITERATION.md`](../templates/ITERATION.md) | Release notes, eval updates, prompt revisions, monitoring follow-ups, or agent improvement notes. | Skill revisions, project instruction updates, evaluation notes, and sanitized field observations. | MCP server changelogs, tool/resource version notes, and compatibility notes. | LangSmith experiment comparisons, dataset revisions, evaluator changes, and regression notes. | Capture lessons without exposing private runtime data, customer content, or unsanitized traces. |

## Mapping Guidance

Use framework mappings to explain where a generic artifact may live in a
specific implementation. Do not rename or replace the taxonomy buckets to match
one vendor's product model.

Preserve these boundaries:

- Memory and state are separate. Memory is durable retained knowledge for later
  reuse. State is runtime-specific continuation, replay, inspection, or
  debugging data.
- Skills and tools are separate. Skills package reusable task guidance. Tools
  are callable actions with inputs, outputs, permissions, side effects, and
  failure modes.
- Design-time, runtime, and iteration artifacts are separate lifecycle stages,
  even when a framework stores them together.

When a mapping is partial, describe it as partial. Prefer phrases such as
"maps roughly to," "can be represented by," "commonly appears as," or "can
participate in" instead of claiming exact cross-vendor equivalence.
