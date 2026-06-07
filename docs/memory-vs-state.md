# Memory vs State

Memory and state are different artifact classes. Treating them as the same thing is one of the easiest ways to create privacy, debugging, and portability problems in an agent system.

## Short definition

Memory is durable knowledge intended to be reused later.

State is an execution snapshot used to continue a thread, run, workflow, or session.

## Comparison

| Dimension | Memory | State |
| --- | --- | --- |
| Purpose | Reuse durable knowledge later | Continue, replay, or debug execution |
| Lifetime | Usually longer-lived | Usually tied to a run, session, or workflow |
| Examples | Preferences, stable project facts, learned procedures | Current plan, pending approvals, tool results, checkpoint data |
| Main risks | Privacy, consent, retention, deletion, incorrect persistence | Replay fidelity, stale context, accidental disclosure, debugging gaps |
| Public repo posture | Publish policies and schemas, not real stores | Publish strategies and schemas, not real snapshots |

## Memory concerns

Memory needs explicit rules for what can be stored, how long it is retained, how it can be reviewed, and how it can be deleted. Real memory stores can contain private personal data, business context, or sensitive long-term facts.

Public repos should not include real private memory stores.

## State concerns

State supports continuation and inspection. It may include task progress, intermediate reasoning summaries, workspace paths, tool outputs, approvals, and partial generated artifacts.

Public repos should not include unsanitized runtime state snapshots.

## Design guidance

- Define memory policy separately from state strategy.
- Use schemas or examples that are synthetic and clearly labeled.
- Avoid storing private runtime data as durable memory by accident.
- Avoid relying on memory when a run-specific state checkpoint is the right artifact.

See the synthetic [durable memory example](../examples/memory-example.md) and
[runtime state example](../examples/state-example.json) for separate,
public-safe shapes. They are educational fixtures, not live stores or exports.
