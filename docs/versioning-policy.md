# Versioning Policy

## Purpose

This policy separates public project release identity, changelog state,
versioned release notes, and private npm workspace metadata. These surfaces
work together, but they do not all represent publication by themselves.

## Canonical Public Release

A Git tag and its corresponding GitHub Release are the authoritative
publication event for a public project release. A dated changelog section,
versioned release notes, and accurate README status support that identity.

Publishing an npm package is not part of this repository's release path.

## Version Numbering

The repository uses semantic-versioning-style intent:

- **Patch** releases cover corrections, dependency hygiene, validation
  hardening, maintenance, or small example improvements without a meaningful
  new public surface.
- **Minor** releases add public artifact families, mapping guides, template or
  example families, or validation capabilities while preserving the stable
  14-bucket model.
- **Major** releases intentionally break the public taxonomy structure,
  introduce incompatible artifact contracts, or substantially redefine public
  boundaries.

Not every commit requires a release.

## Unreleased Changes

The `Unreleased` section of `CHANGELOG.md` contains only changes after the
latest published tag. Transient commits that do not change the final
user-facing state do not need changelog entries. During release preparation,
released bullets move into a dated section for the approved version.

## Release Notes

Release notes describe one specific published tag. Provisional notes must be
finalized when that release is published. Historical notes must not absorb
features added after their tag, although factual corrections are allowed
without rewriting the tag or Git history.

## Private npm Workspace Metadata

The root `package.json` remains marked `"private": true`. The package exists
for local and CI validation tooling and is not an npm distribution channel.

Its version follows the latest published repository release to avoid ambiguous
public metadata. It remains at that version while later work accumulates under
`Unreleased`, and changes during an approved public release-preparation update.
The versions in `package.json` and the root package entry in
`package-lock.json` must match.

No npm publication should occur unless a future issue explicitly changes this
policy.

## Release Workflow

1. Review `Unreleased` against the changes since the latest published tag.
2. Choose the next version using this policy.
3. Update private package and lockfile metadata.
4. Create the dated changelog section.
5. Finalize versioned release notes.
6. Run the complete validation suite and public-safety review.
7. Merge the approved release pull request.
8. Create the Git tag and GitHub Release as a separate approved action.
9. Verify README status against the publication event.

Tag and GitHub Release creation is never automatic from documentation or
metadata changes.

## Current Application

The latest published release is `v0.3.0`.

This section may be updated during future approved release work.

## Public Safety

Release artifacts must not contain secrets, private logs, real memory or
runtime state, employer-specific details, private planning packets, or
unsanitized runtime data.

## Related Documents

- [Changelog](../CHANGELOG.md)
- [Public release checklist](public-release-checklist.md)
- [v0.3.0 release notes](release-notes-v0.3.0.md)
- [v0.2.1 release notes](release-notes-v0.2.1.md)
- [Public-safety guidance](public-safety.md)
