---
name: record-triage
description: Classify synthetic records with public rules and route ambiguous cases for review. Use when demonstrating reusable record-triage guidance.
---

# Capability Module Starter

## Template Status

This checked-in file is a framework-neutral starter for a capability module.
At `templates/SKILL.md` it is not itself an Agent Skills package because its
parent directory does not match `name`. For open-standard compatibility, copy
it into a matching directory, for example:

```text
skills/record-triage/SKILL.md
```

Other capability modules can use `capabilities/<name>/module.md`, hosted
instructions, reusable subgraphs, or other framework-specific structures.

## Standard Frontmatter

The Agent Skills standard requires `name` and `description`. `name` must be
1–64 characters, use lowercase letters, digits, and single hyphens, have no
leading or trailing hyphen, and match its parent directory. `description` must
be 1–1024 characters and explain what the skill does and when to use it.

Optional standard fields are `license`, `compatibility`, `metadata`, and the
experimental `allowed-tools`. `compatibility` is 1–500 characters when used;
`metadata` maps string keys to string values. `allowed-tools` is a string whose
support and authority semantics vary by implementation. A declaration never
creates universal authorization; apply runtime permissions and governance.

Do not add vendor-only fields to a portable default. See the
[Agent Skills mapping guide](../docs/agent-skills-standard-mapping.md).

## When to Use

Use this module when a fabricated record must be classified with published
synthetic rules. Do not use it for real or consequential records.

## Inputs

- Synthetic record identifier
- Fabricated summary
- Approved public category rules

## Workflow

1. Read the applicable rule from `references/category-rules.md` only when the
   task requires it.
2. Compare the fabricated record with each eligible rule.
3. Apply one category only when exactly one rule matches.
4. Route missing, conflicting, or ambiguous evidence for human review.
5. Format metadata using `assets/triage-result-template.json` when needed.

## Outputs and Failure Behavior

Return a synthetic identifier, category or `needs-review`, applied rule,
rationale, and review flag. Stop rather than guess when inputs are missing,
private, real, out of scope, or ambiguous.

## Progressive Disclosure

Agents can use `name` and `description` for discovery, load the complete body
when activating the package, and load scripts, references, assets, or other
resources only as needed. Keep `SKILL.md` concise and resolve supporting paths
from the skill root.

## Skill and Tool Boundary

A capability module or skill packages reusable task guidance. A tool is a
callable action with an interface, inputs, outputs, permissions, side effects,
and failure behavior. Instructions about a tool—or executable helpers in an
optional `scripts/` directory—do not make the whole skill package a tool.

## Supply-Chain and Public-Safety Review

Before importing or activating a package, review:

- provenance, license, source, version, and update history;
- instructions, scripts, references, assets, and dependencies;
- network needs, tool declarations, file and environment access;
- permissions, side effects, failure behavior, validation, and eval evidence.

Use only generic synthetic examples. Do not include secrets, private records,
proprietary procedures, raw logs, memory, state, or unsafe automation.
Structural conformance does not establish safety or authorization.
