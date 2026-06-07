# Prompt Specification Template

## Purpose

Define a versioned prompt specification or task prompt template with explicit
inputs, output expectations, assumptions, and failure handling.

## Taxonomy Placement

Prompts and interfaces

## When to Use

Use this template for repeatable model-facing instructions. Keep user input
collection and validation in an interface contract when those concerns need a
separate review surface.

## Required Sections

- Prompt purpose
- Trigger or use case
- Input variables
- Prompt body
- Output expectations
- Failure handling
- Tool and resource assumptions
- Version and review notes

## Optional Sections

- Few-shot examples
- Constraints
- Output schema reference
- Evaluation references
- Localization notes
- Change history

## Specification

### Prompt Purpose

Describe the task this prompt standardizes.

### Trigger or Use Case

State when the prompt should and should not be used.

### Input Variables

List each variable, its type, whether it is required, and its validation rules.

### Prompt Body

Provide the reusable instruction text with clearly marked variables.

### Output Expectations

Describe the expected content, format, quality bar, and schema when applicable.

### Failure Handling

Define how to respond to missing, invalid, conflicting, or unsafe inputs.

### Tool and Resource Assumptions

Reference approved tools and resources the prompt may rely on.

### Version and Review Notes

Record the version, owner role, last review, and next review trigger.

## Public-Safety Notes

- Use synthetic variables and examples.
- Do not embed secrets, private prompts, real user data, production traces, or
  employer-specific instructions.
- Do not assume access to tools or resources that are not declared.

## Minimal Synthetic Example

**Use case:** Summarize a synthetic maintenance record.

**Inputs:** `record_text` is required; `summary_length` is optional.

**Prompt body:** "Summarize the supplied synthetic record. Separate confirmed
facts from unresolved items. Do not invent missing details."

**Output:** A short summary followed by an `Unresolved items` list.

**Failure handling:** Ask for the missing record or report that the content
cannot be processed safely.

## Validation Checklist

- [ ] The trigger and non-use cases are clear.
- [ ] Every input variable is defined and validated.
- [ ] The prompt body does not contain undeclared assumptions.
- [ ] Output expectations are testable.
- [ ] Missing, conflicting, and unsafe inputs have defined handling.
- [ ] Tool, resource, schema, and eval references are current.
- [ ] Examples are synthetic and public-safe.

## Related Artifacts

- `INTERFACE.md` for input collection and validation
- `SKILL.md` for procedures that use the prompt
- `resources.yaml` for approved information sources
- `tools.yaml` for callable actions
- `output.schema.json` for structured output validation
- `eval-rubric.md` for regression checks
