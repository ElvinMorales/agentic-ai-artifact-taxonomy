# Agent Skills Package Examples

This directory demonstrates how a generic **Capability module** can be carried
in one open-standard Agent Skills package. The example is an implementation
mapping, not a new taxonomy category or the only capability-module format.

## Package

```text
record-triage/
├── SKILL.md
├── references/
│   └── category-rules.md
└── assets/
    └── triage-result-template.json
```

The instructions map primarily to Capability modules. The reference maps to
Knowledge and resources, the static asset connects to Outputs and schemas, the
permission and safety boundaries connect to Guardrails and governance, package
compatibility connects to Runtime and deployment, and validation connects to
Evaluation and observability.

Metadata supports discovery, `SKILL.md` loads on activation, and the reference
and asset load only when needed. No `scripts/` directory is included because
executable code is optional and would add unnecessary permission and
supply-chain risk to this first public example.

Repository-native validation checks tracked formats, local links, and focused
package/frontmatter constraints:

```bash
npm run validate
```

If the external CLI is already installed, compatibility can also be checked:

```bash
skills-ref validate examples/skills/record-triage
```

The external check is optional. Neither validator proves safety or grants
authority; human review remains required.

The package intentionally omits scripts, tools, network access, runtime state,
logs, memory, real records, and vendor-only frontmatter. It is a smaller
packaging example related to the existing
[connected record-triage agent](../record-triage-agent/README.md). See the
[Agent Skills mapping guide](../../docs/agent-skills-standard-mapping.md) for
the standard, vendor, and governance boundaries.
