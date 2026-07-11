# UI Harness Contract Template

## Purpose

Describe the workflow the harness supports and state what it can and cannot do.

## Taxonomy Placement

Place the overall harness under **Prompts and interfaces**. Map state,
workflow, approval, output, evaluation, and runtime components by purpose.

## Intended Users

Name the user roles and accessibility needs without including personal data.

## Entry Points

List supported entry points: static bridge, local form, chat, API-backed
surface, workflow step, or another documented interface.

## Required and Optional Intake

List minimized required fields, optional fields, validation, and safe defaults.
Do not request secrets or private runtime exports.

## Prompt or Request Assembly

Describe how validated intake becomes a request. State which summaries or
references are included and which raw content is excluded.

## Workflow Selection

Define available workflows, selection rules, and the visible next step.

## Session-State Boundary

State where temporary state is stored, its retention and cleanup, and what
remains local or ignored. Say whether durable memory exists. Temporary intake,
status, events, approvals, and progress remain State and must not become Memory
without a separate reviewed memory policy.

## Runtime Adapter Boundary

Choose and document execution as manual, mock, deterministic,
provider-backed, or tool-backed. Identify the separate adapter contract,
permissions, permitted outputs, and failures. The interface itself grants no
runtime authority.

## Progress and Event Visibility

Define safe status and event summaries. Do not expose raw logs, full traces,
prompt history, tool payloads, secrets, or private paths.

## Approval and Review Checkpoints

List actions and artifacts that require human review, who can decide, the
information shown, and behavior after approval, rejection, or timeout.

## Artifact Preview and Export

Define preview formats, exported metadata and files, public-safe filename
rules, validation, review status, and what cannot be exported.

## Error and Recovery Behavior

List expected errors, retry or resume behavior, and safe user-facing messages.
Errors may explain corrective action but must not reveal private content,
internal identifiers, stack traces, or machine-specific paths.

## Permissions and Prohibited Actions

State what the harness can and cannot do. Explicitly address provider calls,
tools, connectors, memory writes, consequential actions, public deployment,
and human-review bypass. Visible controls do not grant permission.

## Privacy and Retention

Define minimization, temporary storage, export, deletion, ignored local data,
and any separately governed durable memory. Identify what stays local and what
may leave the environment.

## Accessibility Considerations

Describe keyboard use, labels, focus order, status announcements, color use,
error association, and preview or export alternatives appropriate to the
surface.

## Validation Checklist

- [ ] Intended users, entry points, and required intake are explicit.
- [ ] Request assembly excludes unnecessary raw content.
- [ ] Workflow selection and progress are inspectable.
- [ ] Temporary State is separate from durable Memory.
- [ ] Runtime mode and adapter boundary are explicit.
- [ ] Human-review requirements and prohibited actions are explicit.
- [ ] Preview and export metadata are validated and sanitized.
- [ ] Errors are useful without exposing private implementation details.
- [ ] Accessibility expectations are reviewable.
- [ ] Examples and tests use synthetic content only.

## Related Artifacts

- Session state, workflow, artifact, approval, event, and status schemas
- Prompt or request specification
- Runtime adapter boundary
- Guardrails and approval policy
- Harness behavior evals and smoke tests
- Setup, privacy, and maintenance guidance
