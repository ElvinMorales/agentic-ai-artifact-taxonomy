# Public Release Checklist

Use this checklist before tagging or announcing a public release or update.

## Scope

- The taxonomy keeps the public 14-bucket structure.
- Prompts and interfaces explicitly covers prompt specs, task templates,
  interface schemas, elicitation flows, and input contracts.
- Planning and orchestration remains one bucket while explicitly covering
  plans, routing, workflow graphs, delegation, handoffs, resumability, and
  continuation logic.
- Memory and state are described as separate artifact classes.
- Design-time, runtime, and iteration artifacts are clearly separated.
- Language remains framework-neutral unless a mapping document is explicit.
- The taxonomy is presented as a practical framework, not a universal industry standard.
- Framework-specific references are examples or mappings, not claims of official equivalence.
- Protocol-specific files such as MCP server definitions or A2A agent cards
  remain mappings or adapters rather than taxonomy replacements.

## Public Safety

- No secrets, credentials, tokens, private certificates, or internal URLs.
- No employer-specific, client-specific, or proprietary workflows.
- No private personal data, regulated data, or customer details.
- No unsanitized logs, traces, memory stores, or runtime state snapshots.
- No language implies employer, client, vendor, or platform endorsement.
- Examples use generic names and synthetic data.
- Example indexes state that fixtures demonstrate shape rather than production
  completeness.
- Optional state and handoff schemas are described as reference shapes, not
  production standards, workflow engines, or protocol specifications.
- State and handoff examples remain synthetic and aligned with their documented
  reference schemas.
- No private bootstrap packets, Codex handoffs, Claude work packets, or internal planning notes are committed.
- No real repository, system, project, study, customer, or workplace names appear unless intentionally public-safe.

## Documentation Readiness

- `README.md` points readers to the main taxonomy and supporting docs.
- `docs/taxonomy.md` contains the canonical bucket list.
- `templates/README.md` accurately lists the templates that currently exist.
- `docs/public-safety.md` is easy to find before publishing examples.
- `CHANGELOG.md` has a dated section for the target version.
- Versioned release notes describe the public release scope and are linked
  from `README.md`.
- Historical release notes remain unchanged except for necessary typo fixes.
- Status text does not claim a Git tag or GitHub release exists before it is
  created.
- Current automation and validation are described accurately.
- Placeholder material is clearly marked and does not overpromise.

## Validation

- Run `git status`.
- Run `git diff --check`.
- Run `npm ci` for release validation against the committed lockfile.
- Run `npm install` only when dependencies or the lockfile need to be
  refreshed.
- Run `npm run validate` for the complete local validation suite.
- Run targeted checks as needed: `npm run lint:md`,
  `npm run validate:json`, `npm run validate:jsonl`,
  `npm run validate:yaml`, and `npm run check:links`.
- Confirm the local link check passes. External URL reachability is
  intentionally excluded to avoid network-dependent release failures.
- Review changed files for public-safe language before opening a pull request.
- Run a targeted grep for sensitive terms.
- Confirm `package.json` is not configured for accidental package publishing unless intentional.

## Release Coordination

- Confirm repository metadata, license, and package metadata are correct.
- Confirm examples are sanitized and framework-neutral.
- Preserve historical release notes as historical records.
- Confirm the target release tag and GitHub release text match the release notes
  created for that version.
- Confirm any announcement copy links to the public repo, not private context.
