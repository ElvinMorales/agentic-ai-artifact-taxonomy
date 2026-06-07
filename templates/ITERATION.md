# Learning and Iteration Record Template

## Purpose

Capture a lesson, observed change, proposed artifact update, evaluation impact,
and review outcome without publishing private runtime data.

## Taxonomy Placement

Learning and iteration

## When to Use

Use this template to connect sanitized feedback, evaluations, incidents,
issues, pull requests, and changelog entries to a proposed improvement.

## Required Sections

- Change or lesson observed
- Source signal
- Affected artifacts
- Proposed update
- Evaluation and regression impact
- Release note impact
- Follow-up issue or pull request
- Review outcome

## Optional Sections

- Priority
- Owner
- Alternatives considered
- Rollback trigger
- Target release
- Related incident or experiment

## Record

### Change or Lesson Observed

State the behavior, gap, or maintenance lesson in neutral terms.

### Source Signal

Identify a sanitized evaluation result, review finding, issue, synthetic test,
or approved incident summary.

### Affected Artifacts

List the prompts, skills, tools, schemas, policies, templates, runtime notes,
or docs that may need changes.

### Proposed Update

Describe the smallest change that addresses the signal.

### Evaluation and Regression Impact

List tests, rubric criteria, datasets, or expected behavior that must change or
remain stable.

### Release Note Impact

State whether the change is user-visible and what future release documentation
may need to mention.

### Follow-Up Issue or Pull Request

Reference a public-safe issue or pull request when one exists.

### Review Outcome

Record accepted, revised, deferred, or rejected, with a concise rationale.

## Public-Safety Notes

- Summarize signals; do not paste raw production traces, logs, prompts, memory
  stores, or private user content.
- Use synthetic cases and generic identifiers.
- Do not imply employer, client, framework, or platform endorsement.

## Minimal Synthetic Example

**Lesson:** A synthetic validation task did not distinguish missing input from
invalid input.

**Source signal:** Public test case `validation-03`.

**Affected artifacts:** Interface contract, prompt specification, and eval
rubric.

**Proposed update:** Add separate error paths and one regression case.

**Review outcome:** Accepted for the next maintenance release.

## Validation Checklist

- [ ] The lesson is supported by a sanitized source signal.
- [ ] Affected artifacts and the proposed update are specific.
- [ ] Evaluation and regression impact is addressed.
- [ ] Release documentation impact is classified.
- [ ] Follow-up ownership or tracking is present.
- [ ] Review outcome and rationale are recorded.
- [ ] No private runtime data or proprietary context is included.

## Related Artifacts

- `eval-rubric.md` and evaluation datasets
- `CHANGELOG.md`
- Release notes
- Sanitized incident or feedback summaries
- Issues and pull requests
- Prompts, skills, tools, schemas, policies, and runtime notes being revised
