import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { parseAllDocuments } from "yaml";

const files = execFileSync(
  "git",
  ["ls-files", "-z", "--", "*.yaml", "*.yml"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean)
  .sort();

const errors = [];

for (const file of files) {
  const documents = parseAllDocuments(readFileSync(file, "utf8"), {
    prettyErrors: true,
    uniqueKeys: true,
  });

  for (const document of documents) {
    for (const error of document.errors) {
      errors.push(`${file}: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error("YAML validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} tracked YAML files.`);
}
