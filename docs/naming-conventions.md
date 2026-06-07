# Naming Conventions

## Purpose

This guide separates the repo's broad taxonomy language from filenames and
framework or protocol object names.

In this repo's broad taxonomy sense, an **agentic AI artifact** is anything an
agentic system depends on that is addressable, versionable, inspectable, and
governable. It can be a file, schema, prompt, module, policy, configuration,
runtime record, evaluation asset, output, or release record.

Some frameworks and protocols use **artifact** or another familiar term for a
much narrower object. Those names can map to the taxonomy, but they do not
replace its stable 14 top-level buckets.

## Rule of Thumb

Describe a name from the generic concept outward:

```text
generic artifact class -> possible filenames -> framework/protocol mappings -> implementation example
```

For example:

```text
capability module -> SKILL.md or capabilities/<name>/module.md
-> framework skill-like bundle or local module -> synthetic record-triage skill
```

The generic artifact class should remain primary. A filename is one possible
representation, and a framework or protocol object is a mapping at the
implementation edge.

## Three Naming Layers

### Taxonomy Names

The 14 taxonomy buckets are stable, framework-neutral categories such as
**Capability modules**, **State**, and **Outputs and schemas**. An artifact
class is a more specific concept within a bucket, such as a skill guide,
session checkpoint, or output schema.

### File Conventions

Filenames such as `SKILL.md`, `agent.yaml`, or `output.schema.json` are possible
project conventions. A project may represent the same artifact class with a
different filename, directory layout, hosted configuration, database record,
or application object.

Classify a file by what it contains and does, not only by its name.

### Framework and Protocol Object Names

Names such as A2A `Artifact` or `AgentSkill` belong to a particular data model.
They can map to one or more taxonomy buckets without being equivalent to those
buckets. The mapping may also differ between a design-time definition and a
generated runtime instance.

## Common Naming Collisions

### Taxonomy Artifact and A2A `Artifact`

A **taxonomy artifact** means any artifact covered by this repo's broad
definition. In A2A's narrower runtime-output sense, an `Artifact` is a task
output composed of content parts.

An A2A output contract can map to **Outputs and schemas**. A generated A2A
`Artifact` instance is runtime data associated with **State**. A sanitized
reference may also support **Evaluation and observability**. It is not the
taxonomy's entire artifact universe.

### Taxonomy Artifact and Framework Output Objects

A framework may use *artifact* for a generated file, media object, attachment,
or persisted output. Treat that object according to its role:

- Its expected structure can map to **Outputs and schemas**.
- Its generated instance may be runtime **State** or an output record.
- Its storage and delivery configuration can map to **Runtime and deployment**.

Do not infer a one-to-one taxonomy category from the framework's object name.

### Generic Artifact Class and Possible Filename

A capability module may be represented by `SKILL.md`,
`capabilities/<name>/module.md`, or another local layout. `SKILL.md` is a useful
capability-module convention in some ecosystems, not a universal standard and
not a synonym for every capability.

Likewise, a possible filename listed in this repo is a suggestion. It is not a
canonical cross-vendor name.

### Stable Bucket and Local Project Convention

Local files such as `SOUL.md`, `HEARTBEAT.md`, and `BOOTSTRAP.md` are project
conventions, not taxonomy canon. Their mapping depends on their contents:

- `SOUL.md` may contain operating principles or identity guidance.
- `HEARTBEAT.md` may describe runtime checks, scheduled orchestration, or
  observability expectations.
- `BOOTSTRAP.md` may contain deployment setup, initialization steps, a runbook,
  or approved reference material.

The same filename can therefore map to different buckets in different
projects. Document the intended owner, lifecycle, and taxonomy mapping instead
of creating a new bucket from the filename.

## Decision Table

| When you encounter a name | Treat it as | Public-safe example |
| --- | --- | --- |
| A stable concept such as a capability module | A generic artifact class within a taxonomy bucket | A reusable record-triage procedure |
| A filename such as `SKILL.md` | One possible representation of an artifact class | `capabilities/record-triage/SKILL.md` |
| A protocol object such as A2A `Artifact` | A protocol mapping with design-time and runtime concerns | A synthetic task output containing a category and rationale |
| A local file such as `BOOTSTRAP.md` | A project convention classified by its contents | A secret-free local setup checklist |
| A generated output or trace | Runtime data, not a public design-time template | A minimized, explicitly synthetic fixture |

## Synthetic Examples

### Capability Module

```text
Capability module
-> SKILL.md
-> framework skill-like bundle or local module
-> synthetic record-triage procedure
```

Another project may use `module.md` or hosted instructions for the same
artifact class.

### Protocol Discovery Manifest

```text
Protocol discovery manifest
-> agent-card.json
-> A2A Agent Card
-> synthetic record-triage agent card
```

The card can map to identity, advertised capabilities, interfaces, runtime
access, and governance. It is not the complete internal agent definition.

### Runtime Output

```text
Runtime output record
-> output.json or protocol task-output object
-> A2A Artifact or framework-specific output surface
-> synthetic classification result
```

The output schema is a design-time artifact. The generated result is a runtime
instance and should be treated separately.

## Public-Safety Boundaries

Naming guidance does not make runtime data safe to publish. Public repositories
should contain design-time definitions and sanitized or synthetic examples.

Do not publish:

- Secrets, credentials, tokens, private keys, or private endpoints.
- Real memory stores, retained user preferences, or private workspace content.
- Unsanitized state snapshots, task outputs, messages, logs, traces, or tool
  results.
- Employer-, client-, tenant-, or user-specific workflows and identifiers.

Use generic names, fabricated identifiers, and minimized content. Label
synthetic examples clearly, and review any material derived from a real system
before publication.

## Related Docs

- [Taxonomy](taxonomy.md)
- [Framework mapping](framework-mapping.md)
- [Protocol mapping](protocol-mapping.md)
- [Artifact lifecycle](artifact-lifecycle.md)
- [Public-safety guidance](public-safety.md)
- [Template pack](../templates/README.md)
- [Public-safe examples](../examples/README.md)
