# Runtime and Deployment Notes Template

## Purpose

Define the supported operating environment, non-secret configuration,
permissions, validation commands, and deployment review expectations for an
agentic system.

## Taxonomy Placement

Runtime and deployment

## When to Use

Use this template when maintainers need a human-readable operating guide that
complements environment examples, deployment manifests, model configuration,
or workspace manifests.

## Required Sections

- Runtime purpose
- Supported environment
- Model and provider assumptions
- Non-secret configuration
- Secret references
- Permissions and enabled tools
- Workspace and sandbox assumptions
- Local validation commands
- Deployment and review notes

## Optional Sections

- Resource limits
- Scaling assumptions
- Health checks
- Rollback notes
- Compatibility matrix
- Observability references

## Operating Notes

### Runtime Purpose

Describe what this runtime hosts or enables.

### Supported Environment

List supported operating systems, language versions, package managers, and
required services.

### Model and Provider Assumptions

Describe required capabilities and compatibility constraints without making a
vendor-specific name canonical.

### Non-Secret Configuration

List safe configuration keys, defaults, and allowed values.

### Secret References

Name environment variable or secret-manager references only. Never include
secret values.

### Permissions and Enabled Tools

Document filesystem, network, command, API, and approval boundaries.

### Workspace and Sandbox Assumptions

Describe writable locations, isolation, cleanup, and persistence expectations.

### Local Validation Commands

List commands that verify the documented environment and configuration.

### Deployment and Review Notes

Define deployment owner roles, review gates, rollback expectations, and
compatibility review triggers.

## Public-Safety Notes

- Never include secret values, tokens, credentials, private endpoints, or
  production identifiers.
- Use placeholder domains and synthetic paths.
- Do not publish live workspace snapshots, runtime state, logs, or traces.

## Minimal Synthetic Example

An example runtime supports a current long-term-support language release,
reads synthetic input from a sandboxed workspace, and enables one read-only
validation tool. `EXAMPLE_API_TOKEN` is documented as a secret reference with
no value. Local validation runs the repository's documented test command.

## Validation Checklist

- [ ] Supported environments and compatibility assumptions are explicit.
- [ ] Configuration separates non-secret values from secret references.
- [ ] No secret values or private endpoints are present.
- [ ] Permissions and enabled tools follow least privilege.
- [ ] Workspace persistence and cleanup are defined.
- [ ] Validation commands are current and safe to run locally.
- [ ] Deployment review and rollback expectations are documented.

## Related Artifacts

- `.env.example` for secret-free environment variable names
- Deployment and workspace manifests
- Model configuration
- `tools.yaml` for enabled callable actions
- `GUARDRAILS.md` for approval and data rules
- `state-strategy.md` for runtime persistence
