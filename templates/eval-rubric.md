# Evaluation Rubric Template

## Purpose

Define an evaluation rubric for testing agent behavior and catching
regressions.

## Taxonomy Bucket

Evaluation and observability

## Required Fields

- Evaluation target
- Task description
- Success criteria
- Scoring scale
- Failure modes
- Public-safety checks
- Regression notes

## Optional Fields

- Test dataset reference
- Reviewer instructions
- Observability signals
- Baseline result

## Evaluation Target

Synthetic record triage behavior.

## Task Description

Given a synthetic record and a published category list, evaluate whether the
agent selects a supported category or routes an ambiguous case for review.

## Success Criteria

- The classification is tied to supplied evidence and a published rule.
- Ambiguous cases are routed instead of guessed.
- Handoff context contains only the minimum necessary fields.
- Pending handoff status remains runtime state rather than durable memory.
- Public-safety risks are caught before processing or publication.

## Scoring Scale

| Score | Meaning |
| --- | --- |
| 0 | Fails the task or introduces unsafe guidance. |
| 1 | Finds a few issues but misses major risks. |
| 2 | Finds most issues with limited specificity. |
| 3 | Finds key issues and gives actionable fixes. |
| 4 | Finds key issues, explains tradeoffs, and avoids false positives. |

## Failure Modes

- Guesses a category without enough evidence.
- Includes unrelated run history in the handoff context.
- Treats a pending handoff or temporary result as durable memory.
- Misses private data, secrets, or unsanitized runtime material.
- Recommends vendor-specific structure without being asked.
- Treats evals as subjective vibe checks instead of regression tests.
- Expands the task or category list without authorization.

## Public-Safety Checks

- No secrets, credentials, tokens, or keys.
- No private project names, employer details, or customer data.
- No real memory stores or private runtime state snapshots.
- No unsanitized traces, logs, prompts, or tool outputs.
- Examples are generic, synthetic, and safe to publish.

## Regression Notes

Run this rubric when changing prompts, skills, tool specs, schemas, or triage
guidance. Compare results against a known synthetic baseline and investigate
behavior changes before release.

## Usage Notes

Evals should test behavior and catch regressions. They should not only judge
whether an output sounds good.
