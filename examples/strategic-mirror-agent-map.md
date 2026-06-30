# Strategic Mirror Agent: Public Scaffold Mapping

## Purpose

This document maps the public
[Strategic Mirror Agent](https://github.com/ElvinMorales/strategic-mirror-agent)
scaffold to this repository's stable 14-bucket taxonomy.

## Why This Example Is Included

Strategic Mirror Agent shows how a public-safe implementation can organize
multiple artifact classes while keeping its private runtime separate. It is an
example mapping, not a framework standard, required directory layout, or source
of taxonomy definitions.

## Public Scaffold vs Private Runtime

The public scaffold can include identity, operating style, prompts, Memory
templates, State templates, guardrails, connector policy, schemas, evaluations,
synthetic examples, and documentation.

The private runtime can contain real organizational or workplace context,
private Memory, live State, raw traces, credentials, connector configuration,
and local runtime data. Those records and values do not belong in the public
scaffold.

## 14-Bucket Mapping

| Taxonomy bucket | Public scaffold mapping |
| --- | --- |
| Identity | Public purpose, scope, ownership, and authority boundaries |
| Operating style | Public collaboration principles, response posture, and escalation guidance |
| Capability modules | Reusable, public-safe procedures and supporting references |
| Tools | Generic tool and connector contracts with permissions and side effects |
| Knowledge and resources | Approved public references and synthetic resource examples |
| Prompts and interfaces | Prompt specifications, input contracts, and elicitation guidance |
| Memory | Memory policy, schema, and synthetic templates for approved durable knowledge |
| State | State strategy, schema, and synthetic continuation or checkpoint templates |
| Planning and orchestration | Planning, routing, handoff, approval, and continuation guidance |
| Guardrails and governance | Safety, consent, authority, public-release, and connector policies |
| Outputs and schemas | Output contracts, report shapes, and validation schemas |
| Evaluation and observability | Synthetic eval cases, rubrics, and sanitized trace shapes |
| Runtime and deployment | Generic runtime requirements and secret-free configuration examples |
| Learning and iteration | Public changelogs, feedback criteria, and improvement records |

Memory remains durable knowledge approved for future reuse. State remains
execution-specific information used to continue, replay, or inspect a run.
Templates for either class are design-time artifacts; real records are private
runtime data.

## What Stays Private

Keep real workplace or organizational context, user content, retained Memory,
live State, raw prompts and responses, tool results, source exports, traces,
logs, credentials, connector values, endpoints, local paths, and other runtime
data out of the public example.

Public examples should remain generic and synthetic. This mapping does not
describe an employer-specific implementation or imply employer, client,
framework, protocol, or platform endorsement.

## How This Differs From the Taxonomy Source of Truth

This repository's [taxonomy](../docs/taxonomy.md) is the canonical public
source for the 14 buckets. Strategic Mirror Agent applies those concepts in
one public scaffold. Its filenames, structure, and implementation choices are
suggestions that may change without changing the taxonomy.

## Related Links

- [Strategic Mirror Agent repository](https://github.com/ElvinMorales/strategic-mirror-agent)
- [Framework mapping](../docs/framework-mapping.md)
- [Protocol mapping](../docs/protocol-mapping.md)
- [MCP and connector safety review checklist](../docs/mcp-connector-safety-checklist.md)
- [Public-safety guidance](../docs/public-safety.md)
