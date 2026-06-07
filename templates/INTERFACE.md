# Interface Contract Template

## Purpose

Define how a task enters an agentic system through chat, CLI, API, form,
workflow step, or agent-to-agent handoff.

## Taxonomy Placement

Prompts and interfaces

## When to Use

Use this template when inputs, clarification behavior, validation, errors, or
handoff targets need to be explicit before planning or execution begins.

## Required Sections

- Entry point type
- Required inputs
- Optional inputs
- Clarifying questions
- Validation rules
- Error handling
- Output or handoff target

## Optional Sections

- Authentication assumptions
- Accessibility notes
- Rate or size limits
- Example requests
- Response timing expectations
- Interface version

## Contract

### Entry Point Type

Choose one or more: chat, CLI, API, form, workflow step, or agent-to-agent
handoff.

### Required Inputs

List each required input with its type, description, and accepted range.

### Optional Inputs

List optional inputs, defaults, and conditions under which they are used.

### Clarifying Questions

Define the minimum questions to ask when required context is missing or
ambiguous.

### Validation Rules

Describe format, size, content, and cross-field checks.

### Error Handling

Define public-safe error messages and whether the user may retry, correct, or
escalate.

### Output or Handoff Target

Identify the next prompt, plan, skill, tool, person, process, or agent.

## Public-Safety Notes

- Collect only the minimum information required for the task.
- Do not request secrets, regulated data, private logs, or real memory exports
  in public examples.
- Avoid exposing internal paths, identifiers, stack traces, or system details
  in errors.

## Minimal Synthetic Example

An example CLI entry point accepts a required path to a synthetic Markdown
record and an optional output format. If the path is missing, it asks for the
record location. It rejects unsupported file types with a concise correction
message, then sends validated input to a record-triage plan.

## Validation Checklist

- [ ] The entry point type is named.
- [ ] Required and optional inputs are distinguishable.
- [ ] Clarifying questions are limited to missing task-critical context.
- [ ] Validation rules cover format and unsafe content.
- [ ] Error behavior does not expose private implementation details.
- [ ] The next output or handoff target is explicit.
- [ ] Example inputs are synthetic and contain no sensitive data.

## Related Artifacts

- `PROMPT.md` for model-facing instructions
- `PLAN.md` for accepted work that requires multiple steps
- `HANDOFFS.md` for transfer of responsibility
- `GUARDRAILS.md` for collection and approval limits
- `output.schema.json` for response contracts
