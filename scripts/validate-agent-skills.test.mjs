import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const validatorPath = fileURLToPath(new URL("validate-agent-skills.mjs", import.meta.url));
const validSkill = (name) => `---
name: ${name}
description: A fabricated package used for validator regression testing.
---

# ${name}
`;

function writeFixture(repoRoot, relativePath, content) {
  const file = path.join(repoRoot, ...relativePath.split("/"));
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function runFixture(files) {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-skills-validator-"));

  try {
    const init = spawnSync("git", ["init", "--quiet"], { cwd: repoRoot, encoding: "utf8" });
    assert.equal(init.status, 0, init.stderr);

    writeFixture(repoRoot, "examples/skills/README.md", "# Fabricated skill packages\n");
    for (const [file, content] of Object.entries(files)) writeFixture(repoRoot, file, content);

    const add = spawnSync("git", ["add", "."], { cwd: repoRoot, encoding: "utf8" });
    assert.equal(add.status, 0, add.stderr);

    return spawnSync(process.execPath, [validatorPath], { cwd: repoRoot, encoding: "utf8" });
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
}

test("exact-case package passes", () => {
  const result = runFixture({
    "examples/skills/valid-example/SKILL.md": validSkill("valid-example"),
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 1 Agent Skills example package/);
});

test("lowercase-only package fails even with a valid sibling", () => {
  const result = runFixture({
    "examples/skills/valid-example/SKILL.md": validSkill("valid-example"),
    "examples/skills/lowercase-only/skill.md": validSkill("lowercase-only"),
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /examples\/skills\/lowercase-only/);
  assert.match(result.stderr, /package root must contain exactly one exact-case SKILL\.md/);
});

test("package without root SKILL.md fails", () => {
  const result = runFixture({
    "examples/skills/valid-example/SKILL.md": validSkill("valid-example"),
    "examples/skills/missing-entrypoint/assets/example.json": "{}\n",
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /examples\/skills\/missing-entrypoint/);
  assert.match(result.stderr, /package root must contain exactly one exact-case SKILL\.md/);
});
