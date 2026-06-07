# Agent Contract Template

## Purpose

Define a human-readable contract for an agent's purpose, scope, boundaries,
dependencies, success criteria, and ownership.

## Taxonomy Placement

Identity

## When to Use

Use this template when maintainers need an inspectable overview of an agent for
human review. Use `agent.yaml` when the same identity and dependency information
must also be machine-readable.

## Required Sections

- Purpose
- Scope
- Boundaries
- Intended users
- Inputs accepted
- Dependencies
- Success criteria
- Ownership and review cadence

## Optional Sections

- Non-goals
- Domain assumptions
- Output summary
- Version history
- Known limitations

## Contract

### Agent Purpose

State the outcome the agent is intended to support.

### Scope

List the tasks and decisions the agent may perform.

### Boundaries

List prohibited actions, authority limits, and conditions requiring escalation.

### Intended Users

Identify the user groups or systems this agent is designed to serve.

### Inputs Accepted

Describe accepted request types, files, structured inputs, and context.

### Dependencies

Reference relevant skills, tools, resources, prompts, guardrails, output
schemas, and runtime settings.

### Success Criteria

Define observable conditions that indicate the agent is working as intended.

### Ownership and Review Cadence

Name a public-safe owner role, review frequency, and versioning approach.

## Public-Safety Notes

- Use generic roles and synthetic identifiers in public examples.
- Do not include secrets, private system names, employer-specific workflows, or
  real user data.
- Reference design-time policies, not private runtime records or live state.

## Minimal Synthetic Example

An example contract could describe a "Record Triage Agent" that classifies
synthetic records, accepts Markdown or JSON input, uses an approved
classification skill and schema, and escalates ambiguous cases to a reviewer.
The owner can be listed as "Example Maintainers" with a quarterly review
cadence.

## Validation Checklist

- [ ] Purpose, scope, and boundaries are distinct.
- [ ] Intended users and accepted inputs are explicit.
- [ ] Skills, tools, resources, prompts, guardrails, schemas, and runtime
  settings are referenced rather than embedded without need.
- [ ] Success criteria are observable.
- [ ] Ownership and review cadence are present.
- [ ] No secrets, private data, real runtime records, or proprietary details are
  included.

## Related Artifacts

- `agent.yaml` for a machine-readable agent manifest
- `persona.md` for role and audience detail
- `principles.md` for operating style
- `SKILL.md` for reusable task procedures
- `tools.yaml` for callable actions
- `GUARDRAILS.md` for safety and authority rules
- `RUNTIME.md` for operating environment assumptions
