# Plan Record Template

## Purpose

Define a planning policy or record that makes a goal, steps, dependencies,
decision points, stop conditions, status, and validation explicit.

## Taxonomy Placement

Planning and orchestration

## When to Use

Use this template for multi-step work that benefits from visible sequencing,
status tracking, or decision gates. A reusable blank plan can be design-time;
a populated work-session plan is a runtime artifact and should be handled
accordingly.

## Required Sections

- Goal
- Scope
- Assumptions
- Steps
- Dependencies
- Decision points
- Stop conditions
- Status tracking
- Validation

## Optional Sections

- Non-goals
- Owners
- Time or cost limits
- Rollback approach
- Handoff references
- Review notes

## Plan

### Goal

State the intended outcome in one sentence.

### Scope

Define included work and explicit non-goals.

### Assumptions

List facts or conditions the plan depends on and how they will be verified.

### Steps

List ordered, reviewable actions with expected results.

### Dependencies

Reference required inputs, resources, skills, tools, approvals, and prior work.

### Decision Points

Describe choices that may change the next step and who has authority to decide.

### Stop Conditions

Define completion, failure, safety, approval, and budget conditions that stop
work.

### Status Tracking

Use a small status set such as `pending`, `in progress`, `completed`, or
`blocked`.

### Validation

List checks that demonstrate the goal was met without unsafe side effects.

## Public-Safety Notes

- Use synthetic tasks in public examples.
- Do not publish private workspace paths, user requests, approval records,
  production identifiers, or raw tool outputs.
- Do not retain a work-session plan as durable memory unless it passes the
  memory review process.

## Minimal Synthetic Example

**Goal:** Validate three synthetic records against a public schema.

**Steps:** Confirm inputs, run the approved validator, summarize failures, and
check the final report.

**Decision point:** Stop and request review if the schema is missing.

**Stop condition:** All records are classified or an unsafe input is detected.

## Validation Checklist

- [ ] Goal, scope, and assumptions are clear.
- [ ] Steps are ordered and have observable results.
- [ ] Dependencies and approval needs are declared.
- [ ] Decision points identify authority.
- [ ] Stop conditions cover success, failure, and safety.
- [ ] Status reflects current work.
- [ ] Validation checks the outcome and side effects.
- [ ] No private runtime context is included in a public example.

## Related Artifacts

- `INTERFACE.md` for validated task entry
- `HANDOFFS.md` for transfers between steps or owners
- `SKILL.md` for reusable procedures
- `tools.yaml` for callable actions
- `state-strategy.md` for resumable execution state
- `eval-rubric.md` for outcome evaluation
