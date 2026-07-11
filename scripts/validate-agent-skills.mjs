import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseDocument } from "yaml";

const repoRoot = process.cwd();
const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", "examples/skills"],
  { encoding: "utf8" },
).split("\0").filter(Boolean).map((file) => file.replaceAll("\\", "/"));
const skillFiles = files.filter((file) => /^examples\/skills\/[^/]+\/SKILL\.md$/.test(file)).sort();
const errors = [];

if (skillFiles.length === 0) {
  errors.push("examples/skills: at least one example package with root SKILL.md is required");
}

for (const file of skillFiles) {
  const skillRoot = path.dirname(file);
  const directoryName = path.basename(skillRoot);
  const rootEntries = readdirSync(path.resolve(repoRoot, skillRoot), { withFileTypes: true });
  const caseInsensitiveSkillFiles = rootEntries.filter(
    (entry) => entry.isFile() && entry.name.toLowerCase() === "skill.md",
  );

  if (caseInsensitiveSkillFiles.length !== 1 || caseInsensitiveSkillFiles[0].name !== "SKILL.md") {
    errors.push(`${file}: package root must contain exactly one exact-case SKILL.md`);
    continue;
  }

  const content = readFileSync(path.resolve(repoRoot, file), "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}: YAML frontmatter followed by a Markdown body is required`);
    continue;
  }

  const document = parseDocument(match[1], { prettyErrors: true, uniqueKeys: true });
  if (document.errors.length > 0) {
    for (const error of document.errors) errors.push(`${file}: ${error.message}`);
    continue;
  }

  const data = document.toJS();
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    errors.push(`${file}: frontmatter must be a mapping`);
    continue;
  }

  if (typeof data.name !== "string") errors.push(`${file}: name must be a string`);
  else {
    if (data.name.length < 1 || data.name.length > 64) errors.push(`${file}: name must be 1-64 characters`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.name)) errors.push(`${file}: name must use lowercase letters, digits, and single hyphens`);
    if (data.name !== directoryName) errors.push(`${file}: name must match parent directory ${directoryName}`);
  }

  if (typeof data.description !== "string") errors.push(`${file}: description must be a string`);
  else if (data.description.length < 1 || data.description.length > 1024) errors.push(`${file}: description must be 1-1024 characters`);

  if (Object.hasOwn(data, "license") && (typeof data.license !== "string" || data.license.trim() === "")) errors.push(`${file}: license must be a non-empty string`);
  if (Object.hasOwn(data, "compatibility") && (typeof data.compatibility !== "string" || data.compatibility.length < 1 || data.compatibility.length > 500)) errors.push(`${file}: compatibility must be a 1-500 character string`);
  if (Object.hasOwn(data, "metadata")) {
    if (data.metadata === null || typeof data.metadata !== "object" || Array.isArray(data.metadata)) errors.push(`${file}: metadata must be a mapping`);
    else for (const [key, value] of Object.entries(data.metadata)) if (typeof key !== "string" || typeof value !== "string") errors.push(`${file}: metadata keys and values must be strings`);
  }
  if (Object.hasOwn(data, "allowed-tools") && typeof data["allowed-tools"] !== "string") errors.push(`${file}: allowed-tools must be a string when present`);
  if (match[2].trim() === "") errors.push(`${file}: Markdown body must be non-empty`);
}

if (errors.length > 0) {
  console.error("Agent Skills example validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${skillFiles.length} Agent Skills example package(s). Structural validation does not establish safety or authorization.`);
}
