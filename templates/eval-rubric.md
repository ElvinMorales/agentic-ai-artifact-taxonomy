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

Artifact review behavior for public-facing agentic AI artifact templates.

## Task Description

Given a draft artifact, evaluate whether the agent identifies taxonomy
alignment issues, concept boundary problems, unclear fields, and public-safety
risks.

## Success Criteria

- Findings identify real issues rather than vague preferences.
- Memory is not confused with state.
- Skills or capability modules are not treated as tools.
- Design-time, runtime, and iteration artifacts remain distinct.
- Public-safety risks are caught before publication.

## Scoring Scale

| Score | Meaning |
| --- | --- |
| 0 | Fails the task or introduces unsafe guidance. |
| 1 | Finds a few issues but misses major risks. |
| 2 | Finds most issues with limited specificity. |
| 3 | Finds key issues and gives actionable fixes. |
| 4 | Finds key issues, explains tradeoffs, and avoids false positives. |

## Failure Modes

- Judges style preferences instead of behavior.
- Misses private data, secrets, or unsanitized runtime material.
- Recommends vendor-specific structure without being asked.
- Treats evals as subjective vibe checks instead of regression tests.
- Changes the 14-bucket taxonomy rather than mapping to it.

## Public-Safety Checks

- No secrets, credentials, tokens, or keys.
- No private project names, employer details, or customer data.
- No real memory stores or private runtime state snapshots.
- No unsanitized traces, logs, prompts, or tool outputs.
- Examples are generic, synthetic, and safe to publish.

## Regression Notes

Run this rubric when changing prompts, skills, tool specs, schemas, or review
guidance. Compare results against a known synthetic baseline and investigate
behavior changes before release.

## Usage Notes

Evals should test behavior and catch regressions. They should not only judge
whether an output sounds good.
