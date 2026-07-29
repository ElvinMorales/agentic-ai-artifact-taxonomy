import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Advisory only: this script always exits 0. It reports unreachable,
// redirected, and inconclusive external URLs for human review. It is not
// part of `npm run validate` because third-party sites go down, redirect,
// and rate-limit independently of anything in this repository.

const REQUEST_TIMEOUT_MS = 10_000;
const CONCURRENCY = 5;
const USER_AGENT = "agentic-ai-artifact-taxonomy-link-checker";

const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
const markdownFiles = trackedFiles.filter((file) => file.endsWith(".md")).sort();

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

const linkPatterns = [
  /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/g,
  /^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gm,
];

const citationsByUrl = new Map();

for (const file of markdownFiles) {
  const markdown = withoutCodeBlocks(readFileSync(file, "utf8"));

  for (const pattern of linkPatterns) {
    for (const match of markdown.matchAll(pattern)) {
      const target = (match[1] ?? match[2] ?? "").trim();
      if (!/^https?:\/\//i.test(target)) {
        continue;
      }

      const lineNumber = markdown.slice(0, match.index).split("\n").length;
      const citations = citationsByUrl.get(target) ?? [];
      citations.push(`${file}:${lineNumber}`);
      citationsByUrl.set(target, citations);
    }
  }
}

const uniqueUrls = [...citationsByUrl.keys()];

async function fetchWithTimeout(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT },
    });
  } finally {
    clearTimeout(timer);
  }
}

function normalize(url) {
  return url.replace(/\/$/, "");
}

async function checkUrl(url) {
  let response;

  try {
    response = await fetchWithTimeout(url, "HEAD");
    if (response.status === 405 || response.status === 501) {
      response = await fetchWithTimeout(url, "GET");
    }
  } catch {
    try {
      response = await fetchWithTimeout(url, "GET");
    } catch (error) {
      return { kind: "unreachable", detail: error.message };
    }
  }

  if (response.status === 403 || response.status === 429) {
    return { kind: "inconclusive", detail: `HTTP ${response.status}` };
  }

  if (response.status >= 400) {
    return { kind: "unreachable", detail: `HTTP ${response.status}` };
  }

  if (normalize(response.url) !== normalize(url)) {
    return { kind: "redirected", finalUrl: response.url };
  }

  return { kind: "ok" };
}

async function runWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runNext() {
    const index = nextIndex;
    nextIndex += 1;
    if (index >= items.length) {
      return;
    }

    results[index] = await worker(items[index]);
    await runNext();
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runNext()),
  );

  return results;
}

console.log("Advisory external-link check (not part of npm run validate).");
console.log(
  `Checking ${uniqueUrls.length} unique external URL(s) from ${markdownFiles.length} tracked Markdown files.`,
);

const results = await runWithConcurrency(uniqueUrls, CONCURRENCY, async (url) => ({
  url,
  result: await checkUrl(url),
}));

const unreachable = [];
const redirected = [];
const inconclusive = [];

for (const { url, result } of results) {
  const citations = citationsByUrl.get(url);

  if (result.kind === "unreachable") {
    unreachable.push({ url, detail: result.detail, citations });
  } else if (result.kind === "redirected") {
    redirected.push({ url, finalUrl: result.finalUrl, citations });
  } else if (result.kind === "inconclusive") {
    inconclusive.push({ url, detail: result.detail, citations });
  }
}

function printGroup(title, entries, describe) {
  console.log(`\n${title} (${entries.length}):`);
  for (const entry of entries) {
    console.log(`- ${describe(entry)}`);
    for (const citation of entry.citations) {
      console.log(`    cited at ${citation}`);
    }
  }
}

if (unreachable.length > 0) {
  printGroup(
    "Unreachable",
    unreachable,
    (entry) => `${entry.url} (${entry.detail})`,
  );
}

if (redirected.length > 0) {
  printGroup(
    "Redirected",
    redirected,
    (entry) => `${entry.url} -> ${entry.finalUrl}`,
  );
}

if (inconclusive.length > 0) {
  printGroup(
    "Inconclusive",
    inconclusive,
    (entry) => `${entry.url} (${entry.detail})`,
  );
}

console.log(
  `\nSummary: ${unreachable.length} unreachable, ${redirected.length} redirected, ${inconclusive.length} inconclusive, ` +
    `${uniqueUrls.length - unreachable.length - redirected.length - inconclusive.length} ok, ${uniqueUrls.length} total.`,
);

if (unreachable.length > 0 || redirected.length > 0 || inconclusive.length > 0) {
  console.log(
    "This report requires human review; findings here are not fixed automatically and this check does not fail the build.",
  );
}

process.exitCode = 0;
