# Handoff Contract Template

## Purpose

Define how responsibility, authority, and necessary context transfer between
an agent, person, process, or workflow stage.

## Taxonomy Placement

Planning and orchestration

## When to Use

Use this template when work moves to another owner or execution surface and
the trigger, context packet, authority, return path, and failure behavior must
be inspectable.

## Required Sections

- Handoff purpose
- Source
- Destination
- Trigger conditions
- Required context packet
- Authority transfer
- Return conditions
- Failure and timeout handling
- Audit notes

## Optional Sections

- Acceptance criteria
- Priority
- Service expectations
- Retry policy
- Cancellation rules
- Related plan step

## Contract

### Handoff Purpose

Describe why the transfer is needed and the expected outcome.

### Source

Identify the originating agent, person, process, or workflow stage by role.

### Destination

Identify the receiving role and the capability it is expected to provide.

### Trigger Conditions

List the conditions that initiate the handoff.

### Required Context Packet

Define the minimum task summary, inputs, decisions, constraints, provenance,
and requested output needed by the destination.

### Authority Transfer

State what the destination may decide or act on and what remains with the
source or an approver.

### Return Conditions

Define completion, rejection, escalation, and return payload requirements.

### Failure and Timeout Handling

Describe retries, fallback destinations, cancellation, and safe failure.

### Audit Notes

Record the contract version and outcome metadata without publishing private
handoff content.

## Public-Safety Notes

- Transfer only the minimum context required.
- Do not include secrets, private memory stores, raw traces, hidden prompts, or
  unnecessary personal data.
- Use generic roles and synthetic packets in public examples.

## Minimal Synthetic Example

A record-triage process hands an ambiguous synthetic record to a reviewer when
two categories score equally. The packet contains the record ID, a sanitized
summary, candidate categories, and the relevant public rule. The reviewer may
select a category or return the item for clarification but may not modify the
source record.

## Validation Checklist

- [ ] Source, destination, purpose, and trigger are explicit.
- [ ] The context packet is sufficient but minimized.
- [ ] Authority transfer and retained authority are distinct.
- [ ] Return, rejection, failure, and timeout paths are defined.
- [ ] Audit notes avoid private payloads.
- [ ] The handoff is not described as a tool or skill.
- [ ] Examples are synthetic and public-safe.

## Related Artifacts

- `PLAN.md` for workflow steps and decision points
- `INTERFACE.md` for agent-to-agent entry contracts
- `SKILL.md` for procedures performed before or after transfer
- `tools.yaml` for callable actions
- `state-strategy.md` for pending and resumable handoff state
- Approval workflow or governance policy
