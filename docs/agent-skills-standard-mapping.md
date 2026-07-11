# Agent Skills Standard Mapping

## Purpose

This guide maps the open Agent Skills standard to the stable, framework-neutral
taxonomy. **Capability modules** remains the generic source concept. An Agent
Skills-compatible directory is one possible package for that concept; its
filenames and format do not replace the taxonomy.

Official claims were last checked on **2026-07-11**.

## Canonical Taxonomy Mapping

An Agent Skills package maps primarily to **Capability modules**. Depending on
its contents and use, it can connect to Tools, Knowledge and resources,
Guardrails and governance, Evaluation and observability, Runtime and
deployment, Learning and iteration, Outputs and schemas, and Prompts and
interfaces. These connections do not create another top-level bucket.

## Generic-to-Implementation Pattern

```text
Capability module
-> possible skill package
-> Agent Skills standard
-> vendor/runtime implementation
```

A capability module can instead use `capabilities/<name>/module.md`, a hosted
reusable instruction object, a subgraph or runnable package, or another local
or framework-specific structure. “Skill” is not a synonym for every capability
module.

## Open-Standard Package Shape

The open standard defines a directory containing at least `SKILL.md`:

```text
skill-name/
├── SKILL.md          # required
├── scripts/          # optional executable code
├── references/       # optional documentation
├── assets/           # optional static resources
└── ...               # other files or directories may exist
```

References use paths relative to the skill root. Keeping references shallow
and the main instructions concise makes packages easier to inspect and load.

## Standard `SKILL.md` Frontmatter

`SKILL.md` contains YAML frontmatter followed by Markdown instructions.

| Field | Status | Key constraints | Taxonomy relevance | Governance note |
| --- | --- | --- | --- | --- |
| `name` | Required | 1–64 characters; lowercase letters, digits, and single hyphens; no leading or trailing hyphen; matches parent directory | Capability modules; discovery under Prompts and interfaces | A name identifies a package, not a complete agent identity |
| `description` | Required | 1–1024 characters; explains what the skill does and when to use it | Capability modules; Prompts and interfaces | Review activation scope and misleading claims |
| `license` | Optional | Short license name or bundled-license reference | Guardrails and governance; Learning and iteration | Verify license and redistribution terms |
| `compatibility` | Optional | 1–500 characters; records environment requirements | Runtime and deployment | Review dependencies, network needs, and target runtime |
| `metadata` | Optional | Mapping of string keys to string values | Capability modules; Learning and iteration | Treat values as descriptive metadata, not authority |
| `allowed-tools` | Optional, experimental | String declaration; implementation support varies | Tools; Guardrails and governance | Never infer universal authorization; apply runtime permissions and review |

## Progressive Disclosure

The standard describes three layers:

1. `name` and `description` metadata support discovery.
2. The complete `SKILL.md` body loads when the skill is activated.
3. Scripts, references, assets, and other resources load only as needed.

This packaging reduces unnecessary context, but it does not remove the need to
review every packaged file before installation or activation.

## Component-to-Bucket Mapping

| Agent Skills surface | Primary or connected taxonomy bucket | Reason |
| --- | --- | --- |
| `SKILL.md` instructions | Capability modules | Reusable task procedure and activation guidance |
| `name`, `description` | Capability modules; Prompts and interfaces | Discovery and selection metadata |
| `scripts/` | Tools; Runtime and deployment | Executable helpers requiring separate permission and runtime review |
| `references/` | Knowledge and resources | Supporting material loaded when needed |
| `assets/` | Knowledge and resources; Outputs and schemas | Templates, schemas, lookup data, or static resources |
| `compatibility` | Runtime and deployment | Environment and dependency assumptions |
| `allowed-tools` | Tools; Guardrails and governance | Experimental declaration, not universal authorization |
| Validation and eval cases | Evaluation and observability | Structure, activation, boundary, and regression checks |
| Version and change notes | Learning and iteration | Compatibility and revision history |

## Skills vs Tools

A capability module or skill package describes reusable procedure, activation
context, workflow, expected behavior, and supporting resources. A tool is a
callable action with an invocation interface, typed inputs, outputs,
permissions, side effects, and failure behavior.

A skill can explain when and how to call tools, and `scripts/` can contain
executable helpers. Neither makes the whole package a tool. Scripts and any
external callable actions require their own tool, runtime, and governance
review.

## Standard vs Vendor Extensions

| Surface | Open standard | Implementation extension |
| --- | --- | --- |
| Package | Portable directory and `SKILL.md` format | Installation, upload, storage, or version-pointer behavior |
| Invocation | Discovery metadata and instructions | Manual/model invocation controls or product menus |
| Execution | Optional packaged resources | Hosted/local execution, runtime limits, or deployment behavior |
| Context | Progressive disclosure | Dynamic context injection or subagent execution |
| Permissions | Experimental `allowed-tools`; support varies | Runtime-specific permission, preapproval, trust, and policy semantics |
| Validation | Standard structural compatibility | Product limits and product-specific checks |

### OpenAI Skills

OpenAI documents Skills as versioned file bundles with a `SKILL.md` manifest
that are compatible with the open Agent Skills standard. Hosted and local
execution forms, upload and version management, limits, context handling, and
security behavior are OpenAI implementation surfaces, not open-standard
requirements.

### Claude Code Skills

Claude Code documents its skills as following the open standard and adding
implementation-specific invocation controls, subagent execution, dynamic
context injection, frontmatter, and permission behavior. In Claude Code,
`allowed-tools` can act as product-level permission while a skill is active,
subject to workspace trust and other settings. That behavior is not a universal
meaning of the standard field.

Other runtimes can package capability modules differently. MCP has no direct
skill primitive, although a skill can use MCP tools and resources. Frameworks
such as LangGraph can represent a capability module as a reusable subgraph,
runnable package, or documented task procedure.

## Security, Governance, and Supply-Chain Review

A portable package is a supply-chain input, not an automatically trusted,
safe, or authorized capability. Before use, review:

- provenance, author or source, license, update source, and version history;
- all instructions, scripts, references, assets, and bundled dependencies;
- network requirements, tool declarations, file and environment access;
- permissions, approvals, side effects, and failure behavior;
- structural validation and relevant evaluation evidence.

Conformance is not authorization. Apply the target runtime's permission model
and human governance review even when validators pass.

## Validation Hierarchy

1. Run `npm run validate`. Repository-native checks are authoritative for this
   repository's taxonomy, public-safety, tracked-file, link, and example rules.
2. If `skills-ref` is already installed, optionally run:

   ```bash
   skills-ref validate examples/skills/record-triage
   ```

   This is an external structural compatibility check. It is not a project
   dependency and its absence must not fail repository CI.
3. Perform human governance review for provenance, licensing, permissions,
   safety, side effects, and target-runtime appropriateness.

Passing either or both validators does not prove safety or grant authority.

## Synthetic Implementation Example

The [synthetic record-triage package](../examples/skills/record-triage/SKILL.md)
uses the required standard fields plus portable optional metadata. Its small
[reference](../examples/skills/record-triage/references/category-rules.md) and
[static output template](../examples/skills/record-triage/assets/triage-result-template.json)
demonstrate progressive disclosure without executable scripts, tools, network
access, or real records.

## Non-Goals

This mapping does not add a taxonomy bucket, make `SKILL.md` universal, mirror
the Agent Skills specification, create a registry, or provide a vendor product
guide. It does not treat structural compatibility or `allowed-tools` as a
safety finding or permission grant.

## Official References

- [Open Agent Skills specification](https://agentskills.io/specification)
- [OpenAI Skills documentation](https://developers.openai.com/api/docs/guides/tools-skills)
- [Claude Code skills documentation](https://code.claude.com/docs/en/skills)

## Related Taxonomy Guides

- [Canonical taxonomy](taxonomy.md)
- [Framework mapping](framework-mapping.md)
- [Naming conventions](naming-conventions.md)
- [Artifact lifecycle](artifact-lifecycle.md)
- [Public-safety guidance](public-safety.md)
