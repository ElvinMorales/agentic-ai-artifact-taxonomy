# Contributing

This repo is an early draft of a framework-neutral taxonomy for agentic AI artifacts. Contributions should make the taxonomy clearer, safer, or more practical without overfitting it to one vendor or framework.

## Suggesting taxonomy changes

Open an issue describing:

- The bucket or boundary you want to change.
- Why the current taxonomy is unclear or incomplete.
- Example artifact types affected by the change.
- Whether the change preserves the 14-bucket public structure.

## Requesting templates

Open a template request issue with:

- The artifact type.
- The taxonomy bucket it maps to.
- Required and optional fields.
- A generic public-safe example.

## Proposing framework mappings

Framework mappings should start from the generic artifact class first, then describe framework-specific surfaces. Vendor-specific examples should be labeled as mappings, not universal standards.

## Public-safety requirements

Do not include secrets, credentials, private personal data, proprietary workflows, employer-specific examples, real memory stores, unsanitized traces, or runtime state snapshots.

Use synthetic examples whenever possible.

## Pull requests

Keep pull requests focused. Include a short summary, the taxonomy buckets affected, and the validation performed. Pull requests should pass Markdown lint before review.
