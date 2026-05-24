# Public Safety

Public agent artifact repos should be useful without exposing private operations, private data, or sensitive capabilities.

## Do not publish

- Secrets, credentials, API keys, tokens, or private certificates.
- Employer-specific, client-specific, or proprietary workflows.
- Regulated data or private personal data.
- Private logs, traces, memory stores, or unsanitized state snapshots.
- Internal URLs, system names, repository names, customer names, or incident details.
- Material that implies employer, client, or platform endorsement without permission.

## Prefer

- Generic examples.
- Synthetic data.
- Sanitized folder trees.
- Framework-neutral descriptions.
- Public educational material.
- Schemas, policies, and templates instead of real operational records.

## Review checklist

- No secrets or credentials.
- No private personal data.
- No proprietary workflow details.
- No unsanitized runtime logs, traces, memory, or state.
- No employer endorsement implied.
- Examples are generic enough to reuse safely.

Treat public docs as reusable educational material, not internal operational disclosure.
