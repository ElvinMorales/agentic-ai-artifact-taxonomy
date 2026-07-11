# UI and Interaction Harness Artifacts

## Purpose

This guide explains how to classify user-interface and interaction harnesses
without changing the stable 14-bucket taxonomy or prescribing an application
framework.

## Definition

A UI or interaction harness is an inspectable set of contracts and surfaces
that materially shapes how people supply context, choose and follow a
workflow, assemble a prompt or request, review progress, approve actions,
inspect artifacts, or validate and export results. It becomes an agentic AI
artifact when those choices define, constrain, operate, evaluate, or govern
the agentic system rather than merely decorate it.

The overall harness belongs primarily under **Prompts and interfaces**. Its
components retain classifications based on their purpose and lifecycle.

## Why a Harness Is an Artifact Bundle

A harness is not only frontend code. It may combine an interface contract;
context-intake and workflow definitions; session, status, approval, event, and
artifact schemas; a static or local interaction surface; a mock,
deterministic, provider, or tool adapter boundary; preview and export
contracts; validation and smoke tests; and setup, privacy, and maintenance
guidance.

Each component should be independently inspectable. Together, the components
constrain accepted inputs, request assembly, observable progress, review,
output handling, and failure behavior.

## Primary and Connected Taxonomy Buckets

**Prompts and interfaces** is the primary placement. Common connected buckets
are **State**, **Planning and orchestration**, **Guardrails and governance**,
**Outputs and schemas**, **Evaluation and observability**, and **Runtime and
deployment**. Secondary mappings can include **Tools**, **Memory**,
**Knowledge and resources**, and **Learning and iteration** when those
concerns are actually present.

## Maturity Levels

These levels distinguish responsibilities; they are not a required product
roadmap.

### Static Prompt Bridge

A static prompt bridge is a prototype or manual fallback. It can validate
layout, intake, request assembly, and export, but it may require a person to
relay requests and responses between systems by copy and paste.

### Local Web Harness

A local web harness provides one local surface for intake, progress,
approvals, artifacts, and export. It can be a first usable product while
remaining mock-first, especially when it completes the normal workflow without
repeated manual relay.

### Runtime Adapter

A runtime adapter is the execution boundary for deterministic, mock,
provider-backed, or tool-backed workflows. Its permissions, inputs, outputs,
and failure behavior remain separate from the interface contract.

### Deployed Application

A deployed application is a later operational level with distinct decisions
about authentication, privacy, hosting, monitoring, maintenance, and public
access. A local harness does not imply or require this level.

## Component-to-Bucket Mapping

Possible filenames illustrate local conventions, not universal requirements.

| Generic artifact class | Possible filenames | Primary bucket |
| --- | --- | --- |
| UI harness contract | `ui-harness/harness-contract.md`, `interfaces/harness.md` | Prompts and interfaces |
| Session state schema | `ui-harness/session.schema.json` | State |
| Workflow definition | `ui-harness/workflow.schema.json` | Planning and orchestration; Prompts and interfaces |
| Artifact/export manifest | `ui-harness/artifact.schema.json` | Outputs and schemas |
| Approval surface contract | `ui-harness/harness-contract.md`, `approvals.md` | Guardrails and governance |
| Harness behavior evals | `evals/ui-harness-cases.jsonl`, `evals/cases.jsonl` | Evaluation and observability |
| Runtime adapter boundary | `runtime/provider-adapter-boundary.md` | Runtime and deployment |
| Static or local shell | `ui/index.html`, `ui/app.js` | Prompts and interfaces; Runtime and deployment |

Classify event and status visibility with **Evaluation and observability**,
temporary session continuity with **State**, workflow selection and sequencing
with **Planning and orchestration**, and permissioned tool exposure with
**Tools** and **Guardrails and governance**.

## Memory vs State Boundary

Session intake, temporary UI values, run status, pending approvals, event
progression, current steps, and resumable workflow data are **State**. Storage
or display by a harness does not turn them into durable **Memory**.

A harness may offer explicit review of durable memory, but retention requires
its own policy, consent, review, deletion, and lifecycle rules. Do not create
memory automatically from session data.

## Authority, Permissions, and Human Review

An interface does not grant authority. A visible option does not itself permit
a model-provider call, tool invocation, connector access, durable-memory write,
consequential action, public deployment, or bypass of human review. Runtime
modes, adapter boundaries, permissions, and approval checkpoints must remain
explicit. Approval surfaces should name what is reviewed, who can decide, and
what happens after approval, rejection, or timeout.

## Public-Safety Guidance

Publish design-time contracts and minimized synthetic fixtures, not real
sessions or operational exports. Omit raw prompts and messages, secrets, tool
payloads, private paths, durable memory contents, raw logs, complete traces,
and unsanitized generated output. Use fabricated identifiers and
`example.invalid` for example domains. Error contracts should expose useful
recovery guidance without internal paths, stack traces, or private content.

## Non-Goals

This guidance does not select a frontend framework, require deployment, grant
provider or tool access, define authentication, prescribe production
persistence, or standardize a workflow engine. The starter schemas are
educational shapes, not universal runtime standards.

## Validation Questions

- Does the harness materially shape intake, request assembly, workflow,
  review, visibility, validation, or export?
- Can reviewers identify the interface, state, workflow, approval, output,
  observability, and runtime contracts?
- Are the static bridge, local harness, runtime adapter, and deployed
  application distinguished where relevant?
- Is temporary session state separate from durable memory and its retention
  policy?
- Are runtime modes, permissions, prohibited actions, and human-review points
  explicit?
- Are preview and export metadata validated before a required export?
- Are examples synthetic, minimized, and free of private runtime material?

## Public Implementation Example

The public Hatching Ground
[UI Harness Taxonomy Notes](https://github.com/ElvinMorales/hatching-ground/blob/main/docs/ui-harness-taxonomy-notes.md)
provide public-safe implementation evidence for the bundle model and maturity
distinctions. Hatching Ground filenames and design choices are examples only;
they do not define this taxonomy or create a normative dependency.

## Related Taxonomy Guides

- [Taxonomy](taxonomy.md)
- [Artifact lifecycle](artifact-lifecycle.md)
- [Memory vs state](memory-vs-state.md)
- [Naming conventions](naming-conventions.md)
- [Public safety](public-safety.md)
- [UI harness template bundle](../templates/ui-harness/README.md)
- [Synthetic UI harness example](../examples/ui-harness/README.md)
