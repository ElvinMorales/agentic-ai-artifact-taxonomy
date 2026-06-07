# Guardrails and Governance Template

## Purpose

Define safety goals, prohibited actions, approval rules, data handling,
escalation triggers, and review expectations for an agentic system.

## Taxonomy Placement

Guardrails and governance

## When to Use

Use this template when an agent, workflow, tool set, or deployment needs
inspectable authority boundaries and safety controls.

## Required Sections

- Safety goals
- Prohibited actions
- Approval rules
- Data handling
- Source posture
- Escalation triggers
- Auditability
- Test cases or review checks

## Optional Sections

- Risk classification
- Exception process
- Jurisdiction notes
- Retention schedule
- Incident response references
- Policy version history

## Rules

### Safety Goals

Name the risks these rules are intended to reduce.

### Prohibited Actions

List actions that must be refused or stopped.

### Approval Rules

Define which actions require approval, who may approve them, and what context
the approver receives.

### Data Handling

Describe collection, minimization, storage, redaction, retention, and deletion
rules.

### Source Posture

Define acceptable evidence, freshness requirements, and how uncertainty is
reported.

### Escalation Triggers

List conditions that require a person, owner, or designated process.

### Auditability

Describe which decisions, approvals, and policy versions must be reviewable
without publishing private runtime content.

### Test Cases or Review Checks

List synthetic cases that verify prohibited actions, approvals, data handling,
and escalation behavior.

## Public-Safety Notes

- Do not publish private policies, internal escalation paths, real incident
  records, secrets, or regulated data.
- Use generic owner roles and synthetic tests.
- Log only what is necessary and sanitize examples before publication.

## Minimal Synthetic Example

A synthetic record-triage workflow may read public test files but must not
modify external systems. Any write action requires reviewer approval. Inputs
that appear to contain credentials are rejected and escalated. Tests verify
read-only behavior, approval enforcement, and redaction of unsafe input.

## Validation Checklist

- [ ] Safety goals are tied to concrete risks.
- [ ] Prohibited actions and approval-required actions are distinct.
- [ ] Data handling covers minimization, retention, and deletion.
- [ ] Source and uncertainty rules are explicit.
- [ ] Escalation triggers identify a destination.
- [ ] Audit requirements avoid collecting unnecessary private content.
- [ ] Synthetic tests cover refusal, approval, and escalation paths.

## Related Artifacts

- `tools.yaml` for permissions and side effects
- `memory-policy.yaml` and `MEMORY.md` for durable retention rules
- `output.schema.json` for output constraints
- `eval-rubric.md` for behavioral checks
- `RUNTIME.md` for environment permissions
- Approval workflow or policy artifacts
