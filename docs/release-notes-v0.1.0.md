# Release Notes: v0.1.0

## Status

Initial documentation-only release.

Release date: 2026-05-24

## Summary

`v0.1.0` is the first public foundation for the Agentic AI Artifact Taxonomy. It defines a framework-neutral vocabulary for organizing files, schemas, documents, configurations, prompts, policies, runtime records, and iteration artifacts used in agentic AI systems.

This release is intentionally lightweight. It establishes the public taxonomy, supporting guidance, and sanitized examples without adding framework-specific implementations or automation.

## Included

- A canonical 14-bucket taxonomy for agentic AI artifacts.
- A shared definition of an agentic AI artifact.
- Lifecycle guidance for design-time, runtime, and iteration artifacts.
- Memory vs state guidance.
- Public-safety guidance for examples and operational material.
- A placeholder framework mapping surface.
- A sanitized example repository tree.

## Not Included

- Vendor-specific or framework-specific taxonomy replacements.
- Real production traces, logs, memory stores, or runtime state snapshots.
- Secrets, private data, employer-specific details, or endorsement language.
- Starter automation or GitHub Actions workflows.
- Full implementation templates.

## Public-Safety Notes

All examples and supporting material should remain generic, sanitized, and suitable for public reuse. Do not publish private operational records, internal system names, customer details, credentials, or unsanitized runtime artifacts.

## Compatibility

This release is documentation-only. It is intended to be used as a reference vocabulary across frameworks rather than as a runtime package.

## Known Limitations

- Framework mappings are placeholders and need deeper validation.
- Template files are planned but not included in this release.
- This taxonomy is a practical organizing model, not an official cross-vendor standard.

## Next Steps

- Create the first agent artifact template pack.
- Expand framework mapping examples.
- Add public-safe examples for each taxonomy bucket.
- Add lightweight validation or linting automation if useful.
