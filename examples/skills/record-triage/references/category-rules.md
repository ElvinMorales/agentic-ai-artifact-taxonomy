# Synthetic Category Rules

These categories apply only to fabricated educational records:

- `informational`: the summary states a completed fictional event and requests
  no response.
- `action-needed`: the summary contains one explicit, harmless fictional task
  and a clear requested response.
- `needs-review`: evidence is missing, conflicting, matches more than one rule,
  or falls outside the two categories above.

Apply `synthetic-rule-informational` or `synthetic-rule-action-needed` only
when exactly one rule matches. Otherwise apply `synthetic-rule-ambiguous`, set
`requires_human_review` to `true`, and explain the ambiguity without inventing
facts.
