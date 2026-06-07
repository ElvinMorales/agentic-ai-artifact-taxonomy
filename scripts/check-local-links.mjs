import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
const trackedFileSet = new Set(trackedFiles);
const markdownFiles = trackedFiles.filter((file) => file.endsWith(".md")).sort();
const headingCache = new Map();
const errors = [];
let checkedLinks = 0;
let skippedExternalLinks = 0;

function withoutCodeBlocks(markdown) {
  let inFence = false;

  return markdown
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*(?:`{3,}|~{3,})/.test(line)) {
        inFence = !inFence;
        return "";
      }

      return inFence ? "" : line.replace(/`[^`\n]*`/g, "");
    })
    .join("\n");
}

function githubSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]/g, "")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

function headingsFor(file) {
  if (headingCache.has(file)) {
    return headingCache.get(file);
  }

  const headings = new Set();
  const slugCounts = new Map();
  const markdown = withoutCodeBlocks(readFileSync(file, "utf8"));

  for (const line of markdown.split("\n")) {
    const match = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
    if (!match) {
      continue;
    }

    const baseSlug = githubSlug(match[1]);
    const duplicateCount = slugCounts.get(baseSlug) ?? 0;
    const slug = duplicateCount === 0 ? baseSlug : `${baseSlug}-${duplicateCount}`;
    slugCounts.set(baseSlug, duplicateCount + 1);
    headings.add(slug);
  }

  headingCache.set(file, headings);
  return headings;
}

function decodeLinkPart(value, file, lineNumber) {
  try {
    return decodeURIComponent(value);
  } catch {
    errors.push(`${file}:${lineNumber}: link contains invalid URL encoding: ${value}`);
    return null;
  }
}

function checkTarget(sourceFile, target, lineNumber) {
  const trimmedTarget = target.trim();

  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(trimmedTarget)) {
    skippedExternalLinks += 1;
    return;
  }

  const hashIndex = trimmedTarget.indexOf("#");
  const rawPath = hashIndex === -1 ? trimmedTarget : trimmedTarget.slice(0, hashIndex);
  const rawAnchor = hashIndex === -1 ? "" : trimmedTarget.slice(hashIndex + 1);
  const rawPathWithoutQuery = rawPath.split("?")[0];
  const decodedPath = decodeLinkPart(rawPathWithoutQuery, sourceFile, lineNumber);
  const decodedAnchor = decodeLinkPart(rawAnchor, sourceFile, lineNumber);

  if (decodedPath === null || decodedAnchor === null) {
    return;
  }

  const sourceDirectory = path.dirname(path.resolve(repoRoot, sourceFile));
  const absoluteTarget = decodedPath
    ? path.resolve(sourceDirectory, decodedPath)
    : path.resolve(repoRoot, sourceFile);
  const relativeTarget = path
    .relative(repoRoot, absoluteTarget)
    .split(path.sep)
    .join("/");

  checkedLinks += 1;

  if (
    relativeTarget === "" ||
    relativeTarget === ".." ||
    relativeTarget.startsWith("../") ||
    path.isAbsolute(relativeTarget) ||
    !trackedFileSet.has(relativeTarget)
  ) {
    errors.push(`${sourceFile}:${lineNumber}: missing tracked local target: ${trimmedTarget}`);
    return;
  }

  if (decodedAnchor && relativeTarget.endsWith(".md")) {
    const expectedAnchor = decodedAnchor.toLowerCase();
    if (!headingsFor(relativeTarget).has(expectedAnchor)) {
      errors.push(`${sourceFile}:${lineNumber}: missing Markdown anchor: ${trimmedTarget}`);
    }
  }
}

for (const file of markdownFiles) {
  const markdown = withoutCodeBlocks(readFileSync(file, "utf8"));
  const patterns = [
    /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/g,
    /^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gm,
  ];

  for (const pattern of patterns) {
    for (const match of markdown.matchAll(pattern)) {
      const target = match[1] ?? match[2];
      const lineNumber = markdown.slice(0, match.index).split("\n").length;
      checkTarget(file, target, lineNumber);
    }
  }
}

if (errors.length > 0) {
  console.error("Local Markdown link validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${checkedLinks} local Markdown links across ${markdownFiles.length} tracked Markdown files.`,
  );
  console.log(`Skipped reachability checks for ${skippedExternalLinks} external links.`);
}
