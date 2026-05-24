# Artifact Lifecycle

Agentic AI artifacts exist at different points in a system's life. A useful repo keeps those phases distinct so reviewers can tell what defines the agent, what happened during a run, and what changed after learning from use.

## Design-time artifacts

Design-time artifacts define the agent before it runs.

Common examples:

- Manifests
- Role and profile docs
- Operating principles
- Prompt templates
- Output schemas
- Safety policies
- Skill or capability modules
- Tool schemas
- Resource catalogs
- Runtime configuration examples

These are usually appropriate for public repos when they are generic, sanitized, and free of secrets or proprietary details.

## Runtime artifacts

Runtime artifacts are created or updated while an agent is operating.

Common examples:

- Sessions
- Run state
- Approvals
- Tool call records
- Traces
- Logs
- Workspace snapshots
- Generated outputs

These artifacts often contain private data, user content, credentials, internal URLs, or sensitive operational details. Public repos should not include real runtime artifacts unless they are explicitly sanitized examples.

## Iteration artifacts

Iteration artifacts help improve the agent after use.

Common examples:

- Eval datasets
- Regression checks
- Feedback logs
- Changelogs
- Release notes
- Postmortems
- Public issue discussions

Iteration artifacts can be public-safe when examples are generic and do not expose private runtime data.

## Practical rule

Public repos should usually check in design-time artifacts and public-safe iteration artifacts. They should avoid real runtime artifacts unless the records are synthetic, sanitized, and clearly labeled as examples.
