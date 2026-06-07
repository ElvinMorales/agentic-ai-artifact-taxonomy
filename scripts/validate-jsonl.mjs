import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const files = execFileSync(
  "git",
  ["ls-files", "-z", "--", "*.jsonl"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean)
  .sort();

const errors = [];
let recordCount = 0;

for (const file of files) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    if (line.trim() === "") {
      continue;
    }

    recordCount += 1;

    try {
      const record = JSON.parse(line);
      const hasId =
        record !== null &&
        typeof record === "object" &&
        !Array.isArray(record) &&
        Object.hasOwn(record, "id") &&
        typeof record.id === "string" &&
        record.id.trim() !== "";

      if (!hasId) {
        errors.push(`${file}:${index + 1}: record must include a non-empty string id`);
      }
    } catch (error) {
      errors.push(`${file}:${index + 1}: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error("JSONL validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated ${recordCount} records across ${files.length} tracked JSONL files.`);
}
