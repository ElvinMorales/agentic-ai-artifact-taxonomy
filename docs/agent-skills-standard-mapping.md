# Agent Skills Standard Mapping

## Purpose

This guide maps the open Agent Skills standard to the stable, framework-neutral
taxonomy. **Capability modules** remains the generic source concept. An Agent
Skills-compatible directory is one possible package for that concept; its
filenames and format do not replace the taxonomy.

Unless noted otherwise, official claims were last checked on **2026-07-11**.

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

This packaging reduces unnecessary context, but it does not remove supply-chain
review. For a local installation, inspect the package before installing it.
MCP distribution instead uses manifest review and verification as files are
needed; it does not require downloading every file before activation. See
[MCP Skills Distribution](#mcp-skills-distribution).

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

### Other Runtimes

Frameworks such as LangGraph can represent a capability module as a reusable
subgraph, runnable package, or documented task procedure.

## MCP Skills Distribution

Core MCP does not define a skill primitive. The optional
[MCP Skills extension](https://skills.extensions.modelcontextprotocol.io/)
(`io.modelcontextprotocol/skills`) transports Agent Skills packages using MCP
Resources. It leaves the package format with the Agent Skills standard and
keeps Skills in **Capability modules**, distinct from callable **Tools**.

This section was checked on **2026-10-24** against the
[stable extension specification](https://skills.extensions.modelcontextprotocol.io/specification/stable/skills),
which targets MCP `2026-07-28` or later. The
[Final, Extensions Track SEP-2640](https://modelcontextprotocol.io/seps/2640-skills-extension)
records the accepted design; the stable specification governs current
requirements. Other vendor claims retain the review date above.

```text
Capability module -> SKILL.md package -> MCP discovery and resource transport
-> host verification and approval -> runtime-authorized tool use
```

### Distribution Surfaces and Lifecycle

| Surface | Taxonomy mapping | Boundary |
| --- | --- | --- |
| `server/discover` extension declaration | Runtime and deployment; Guardrails and governance | Observe extension support and the required `resources` capability before using `skills/list` or `skills/get`. Discovery grants no host authority. |
| `skills/list`, `skills/get` | Capability modules; Prompts and interfaces; Runtime and deployment | Return discovery entries containing the `SKILL.md` URI, frontmatter and `resources`; `skills/get` identifies one skill by URI. Neither returns the skill file bytes. |
| `resources/read` | Knowledge and resources | Reads individual skill files. An ordinary read does not activate a skill; the host's skill-loading path performs verification and required approvals. |
| Optional `resources/directory/read` | Knowledge and resources; Runtime and deployment | Lists direct children, with pagination. Use only when `directoryRead: true` is declared; a live directory listing cannot extend an approved manifest. |
| Resource manifest and verification evidence | Guardrails and governance; Evaluation and observability | Check content consistency and approval scope, not authorship or trust. |
| Skill revisions and change notes | Learning and iteration | Track package changes and review consequences without merging them into execution State. |

The package is a design-time capability definition. Discovery entries describe
distribution; host approval policy governs activation and permissions. A
pending load, continuation or in-flight approval is **State**, not durable
**Memory**. See [approval and consent mapping](approval-and-consent-mapping.md)
for generic policy, surface and decision-record distinctions; this extension
does not prescribe a universal approval-record schema.

### Origin, Verification, and Permission Boundaries

- **Origin and collisions:** Identify a skill by the host's identity for its
  server plus its full `SKILL.md` URI. Names and URIs alone are insufficient
  across servers. Use host-assigned labels, disambiguate collisions, and keep
  origin visible in model context. A remote skill must not silently replace
  another server's or a local skill. The `skill://` authority is not a DNS
  destination or evidence of trusted authorship.
- **Manifest and reads:** An array-valued `resources` enumerates every file,
  including `SKILL.md` and nested supporting files, with URI, SHA-256 digest
  and byte size. Fetch `SKILL.md` at load and supporting files only as needed.
  Verify each read's bytes against its digest and size, and compare `SKILL.md`'s
  parsed frontmatter field by field with the discovery entry. Reject mismatches
  and, while acting on the skill, files outside the held manifest. Refreshing the
  entry can require renewed approval; directory results cannot bypass this.
- **Consistency and trust:** Digests come from the same server as the files
  and are unsigned. Matching bytes and metadata establish consistency, not
  safety, authenticity or authority. A server or intermediary can change both.
- **Host authority:** Remote skill text remains untrusted input. Host-side
  code execution requires explicit per-skill user approval, including commands
  requested by the body or declarative hooks. Ignore `allowed-tools` for an
  MCP-origin skill unless the user explicitly approves that grant for that
  skill. A permitted load or resource read does not grant unrestricted tools
  or filesystem access; runtime policy still applies.
- **Nested and cross-origin use:** Reading a nested `SKILL.md` as supporting
  Markdown gives its frontmatter no effect. Activating it separately requires
  fresh, explicit consent. Bind skill-driven resource reads to the originating
  server; a cross-origin read requires per-call approval naming both servers.
- **Persisted approval:** Bind any persisted per-skill approval to every
  `{uri, digest}` pair in the observed resource set. A later entry that adds,
  removes or changes a file revokes that approval; re-prompt before loading or
  executing. The host need not poll, but changed bytes fail verification when
  read. When `resources` is `"dynamic"`, stable digests are unavailable: hosts
  may decline the skill and cannot treat persisted approval as covering
  whatever content is now served. Frontmatter comparison still applies.
- **Cache isolation:** Preserve server identity and URI in cached paths and
  approvals. Keep cached files outside local skill discovery. Protect cached
  bytes from modification or rehash them on access; a stored digest label is
  insufficient. Cached remote content retains its MCP origin and execution
  approval requirements after restart or server disconnection.

These are mapping and review boundaries, not a host implementation guide.
Apply the [connector safety checklist](mcp-connector-safety-checklist.md) to
the actual host, permissions and data movement.

### Synthetic Remote Skill Example

The fictional server, labeled `fictional-docs` by the host, serves one inert
documentation-review package. These are educational file contents, each UTF-8
with a final newline; there are no scripts, tool grants, live endpoints or
actual approval records.

`document-review/SKILL.md`:

```markdown
---
name: document-review
description: Suggest clearer headings in synthetic documentation.
---
Compare headings using references/style.md. Return suggestions only.
```

`document-review/references/style.md`:

```markdown
# Style
Prefer short, descriptive headings.
```

The corresponding `Skill` entry is shown below, not a complete JSON-RPC
response or server configuration. Its sizes and digests describe exactly the
two file contents above.

```json
{
  "uri": "skill://document-review/SKILL.md",
  "frontmatter": {
    "name": "document-review",
    "description": "Suggest clearer headings in synthetic documentation."
  },
  "resources": [
    {
      "uri": "skill://document-review/SKILL.md",
      "digest": "sha256:cc35c4c4ea7dea4e1fff298a3565aba3d7375a1706dbf7d0d80177859b5dd3a6",
      "size": 165
    },
    {
      "uri": "skill://document-review/references/style.md",
      "digest": "sha256:2200094c2cebf468273a3980d8fd7f511e9ff8f42f5c973a209b9bd5c020a09f",
      "size": 44
    }
  ]
}
```

1. After observing the extension declaration, `skills/list` discovers this
   entry; `skills/get` can retrieve or refresh it by its `SKILL.md` URI. The
   host records identity as (`fictional-docs`, URI), without fetching files.
2. If `directoryRead: true` is declared, `resources/directory/read` on
   `skill://document-review/references` lists `style.md`. This adds no grant
   or file to the held manifest.
3. For activation, the host applies its loading policy and required approvals,
   reads `SKILL.md` through `resources/read`, and checks size, digest and
   frontmatter before loading it with origin visible. The reference is fetched
   and verified only when needed. A generic preview read remains ordinary data.
4. If `style.md` changes, reading it against the held entry fails verification.
   A refreshed entry with its new digest invalidates any persisted approval of
   the old set.
   With `resources: "dynamic"` instead, no fixed-content approval is possible.

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
- [MCP Skills extension overview](https://skills.extensions.modelcontextprotocol.io/)
- [MCP Skills stable specification](https://skills.extensions.modelcontextprotocol.io/specification/stable/skills)
- [SEP-2640: Skills Extension](https://modelcontextprotocol.io/seps/2640-skills-extension)

## Related Taxonomy Guides

- [Canonical taxonomy](taxonomy.md)
- [Approval and consent mapping](approval-and-consent-mapping.md)
- [Framework mapping](framework-mapping.md)
- [Protocol mapping](protocol-mapping.md)
- [MCP and connector safety review checklist](mcp-connector-safety-checklist.md)
- [Naming conventions](naming-conventions.md)
- [Artifact lifecycle](artifact-lifecycle.md)
- [Public-safety guidance](public-safety.md)
