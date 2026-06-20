import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parseDocument } from "yaml";

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
});

addFormats(ajv);

const validations = [
  {
    schemaFile: "schemas/state.schema.json",
    exampleFile: "examples/state-example.json",
    readExample: readJson,
  },
  {
    schemaFile: "schemas/handoff.schema.json",
    exampleFile: "examples/handoffs.yaml",
    readExample: readYaml,
  },
];

// observability/trace-schema.json is reference-only until a future public-safe
// fixture exists; do not create connected trace examples as part of issue #31.

const errors = [];
let validatedCount = 0;

for (const validation of validations) {
  const { schemaFile, exampleFile, readExample } = validation;

  try {
    const schema = readJson(schemaFile);
    const example = readExample(exampleFile);
    const validate = ajv.compile(schema);

    if (!validate(example)) {
      errors.push(...formatErrors(exampleFile, schemaFile, validate.errors ?? []));
      continue;
    }

    validatedCount += 1;
  } catch (error) {
    errors.push(`${exampleFile}: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error("Schema-instance validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated ${validatedCount} example files against reference schemas.`);
  for (const validation of validations) {
    console.log(`- ${validation.exampleFile} against ${validation.schemaFile}`);
  }
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function readYaml(file) {
  const document = parseDocument(readFileSync(file, "utf8"), {
    prettyErrors: true,
    uniqueKeys: true,
  });

  if (document.errors.length > 0) {
    throw new Error(document.errors.map((error) => error.message).join("; "));
  }

  return document.toJS();
}

function formatErrors(exampleFile, schemaFile, validationErrors) {
  return validationErrors.map((error) => {
    const path = error.instancePath || "/";
    const message = error.message ?? "failed validation";
    return `${exampleFile} against ${schemaFile}: ${path} ${message}`;
  });
}
