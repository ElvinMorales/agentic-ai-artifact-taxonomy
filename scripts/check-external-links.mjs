import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Advisory only: this script always exits 0. It reports unreachable,
// redirected, and inconclusive external URLs for human review. It is not
// part of `npm run validate` because third-party sites go down, redirect,
// and rate-limit independently of anything in this repository.
//
// Two environment conditions make every request fail at the transport level
// regardless of whether this repository's links are healthy. Both surface as
// undici's generic "fetch failed", so the distinction matters:
//
// 1. TLS interception. A network that inspects TLS presents certificates from
//    a private CA. That CA is usually trusted by the operating system, so curl
//    and npm work, but Node's bundled CA store does not include it and fetch
//    fails with UNABLE_TO_GET_ISSUER_CERT_LOCALLY. The npm script runs this
//    file with `--use-system-ca` (Node 23.8.0+), which reads the OS trust store
//    and resolves it.
// 2. A required proxy. Node's fetch does not honor HTTP_PROXY/HTTPS_PROXY by
//    default. Node 24.5.0+ can opt in with `--use-env-proxy`, equivalently
//    `NODE_USE_ENV_PROXY=1`.

const REQUEST_TIMEOUT_MS = 10_000;
const CONCURRENCY = 5;
const USER_AGENT = "agentic-ai-artifact-taxonomy-link-checker";

// Stable, purpose-built connectivity-check endpoints on three unrelated
// providers, none of which this repository cites elsewhere. Used only to
// tell "this environment cannot reach the internet the way this script needs"
// apart from "a cited site happens to be down right now."
const CONTROL_URLS = [
  "https://www.google.com/generate_204",
  "https://www.cloudflare.com/cdn-cgi/trace",
  "https://captive.apple.com/hotspot-detect.html",
];

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
      return { kind: "transport-failure", detail: error.message };
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

async function probeControl(url) {
  try {
    await fetchWithTimeout(url, "GET");
    return { url, reachable: true };
  } catch (error) {
    return { url, reachable: false, detail: error.message };
  }
}

console.log("Advisory external-link check (not part of npm run validate).");

const controlProbes = await Promise.all(CONTROL_URLS.map(probeControl));
const reachableControls = controlProbes.filter((probe) => probe.reachable);

if (reachableControls.length === 0) {
  console.log(
    "\nPreflight failed: none of the control URLs used to sanity-check outbound " +
      "network access could be reached:",
  );
  for (const probe of controlProbes) {
    console.log(`  - ${probe.url}: ${probe.detail}`);
  }
  console.log(
    "\nOutbound requests appear to be blocked, or routed through a proxy this " +
      "script cannot use. No conclusion can be drawn about this repository's " +
      "external links from this environment. Skipping the run.",
  );
  console.log(
    "This usually means TLS interception (a private CA the operating system " +
      "trusts but Node's bundled CA store does not) or a required proxy. " +
      "The npm script already passes `--use-system-ca`; if you invoked this " +
      "file directly, re-run it via `npm run check:external-links`. For a " +
      "proxied network, Node 24.5.0+ also supports `--use-env-proxy`.",
  );
} else {
  console.log(
    `Checking ${uniqueUrls.length} unique external URL(s) from ${markdownFiles.length} tracked Markdown files.`,
  );

  const results = await runWithConcurrency(uniqueUrls, CONCURRENCY, async (url) => ({
    url,
    result: await checkUrl(url),
  }));

  const unreachable = [];
  const couldNotCheck = [];
  const redirected = [];
  const inconclusive = [];
  const ok = [];

  for (const { url, result } of results) {
    const citations = citationsByUrl.get(url);

    if (result.kind === "unreachable") {
      unreachable.push({ url, detail: result.detail, citations });
    } else if (result.kind === "transport-failure") {
      couldNotCheck.push({ url, detail: result.detail, citations });
    } else if (result.kind === "redirected") {
      redirected.push({ url, finalUrl: result.finalUrl, citations });
    } else if (result.kind === "inconclusive") {
      inconclusive.push({ url, detail: result.detail, citations });
    } else {
      ok.push({ url });
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
      "Unreachable (server responded with an error status; a possible dead link)",
      unreachable,
      (entry) => `${entry.url} (${entry.detail})`,
    );
  }

  if (couldNotCheck.length > 0) {
    printGroup(
      "Could not check (transport-level failure; implies nothing about link health)",
      couldNotCheck,
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

  const okDomains = [...new Set(ok.map((entry) => new URL(entry.url).hostname))].sort();
  if (okDomains.length > 0) {
    console.log(
      `\nOK (${ok.length}), from ${okDomains.length} distinct domain(s): ${okDomains.join(", ")}`,
    );
  }

  console.log(
    `\nSummary: ${unreachable.length} unreachable, ${couldNotCheck.length} could not check, ` +
      `${redirected.length} redirected, ${inconclusive.length} inconclusive, ${ok.length} ok, ` +
      `${uniqueUrls.length} total.`,
  );

  if (
    unreachable.length > 0 ||
    couldNotCheck.length > 0 ||
    redirected.length > 0 ||
    inconclusive.length > 0
  ) {
    console.log(
      "This report requires human review; findings here are not fixed automatically and this check does not fail the build. " +
        '"Could not check" entries are transport-level failures and, unlike "Unreachable", do not indicate a dead link.',
    );
  }
}

process.exitCode = 0;
