# Public Release Checklist

Use this checklist before tagging or announcing the first public release.

## Scope

- The taxonomy keeps the public 14-bucket structure.
- Planning and orchestration remains one bucket.
- Memory and state are described as separate artifact classes.
- Design-time, runtime, and iteration artifacts are clearly separated.
- Language remains framework-neutral unless a mapping document is explicit.
- The taxonomy is presented as a practical framework, not a universal industry standard.
- Framework-specific references are examples or mappings, not claims of official equivalence.

## Public Safety

- No secrets, credentials, tokens, private certificates, or internal URLs.
- No employer-specific, client-specific, or proprietary workflows.
- No private personal data, regulated data, or customer details.
- No unsanitized logs, traces, memory stores, or runtime state snapshots.
- No language implies employer, client, vendor, or platform endorsement.
- Examples use generic names and synthetic data.
- No private bootstrap packets, Codex handoffs, Claude work packets, or internal planning notes are committed.
- No real repository, system, project, study, customer, or workplace names appear unless intentionally public-safe.

## Documentation Readiness

- `README.md` points readers to the main taxonomy and supporting docs.
- `docs/taxonomy.md` contains the canonical bucket list.
- `docs/public-safety.md` is easy to find before publishing examples.
- `CHANGELOG.md` and release notes describe the public release scope.
- Placeholder material is clearly marked and does not overpromise.

## Validation

- Run `git status`.
- Run `git diff --check`.
- Run `npm run lint:md`.
- Review changed files for public-safe language before opening a pull request.
- Run a targeted grep for sensitive terms.
- Confirm `package.json` is not configured for accidental package publishing unless intentional.

## Remaining Release Tasks

- Confirm repository metadata, license, and package metadata are correct.
- Confirm examples are sanitized and framework-neutral.
- Confirm the release tag and GitHub release text match `docs/release-notes-v0.1.0.md`.
- Confirm any announcement copy links to the public repo, not private context.
