# Design

## State flow

Each task is a GitHub issue. Its label is its state.

```mermaid
flowchart TD
  I["Ideas<br/>human writes a rough task"] -->|n8n picks it up| R["Refining<br/>AI rewrites it using the template"]
  R --> RA["Ready for approval<br/>human reads the AI's version"]
  RA -->|human comments| R
  RA -->|human approves| AP["Approved<br/>waits for the factory"]
  AP -->|one at a time| B["Building<br/>coding agent works on branch issue-N"]
  B -->|agent has a question| W["Waiting for you"]
  W -->|human answers| AP
  B -->|failed or over 30 min| S["Stuck"]
  S -->|retry| AP
  S -->|drop| D["Done"]
  B -->|pull request opened| QA["Your QA<br/>human reviews the pull request"]
  QA -->|merge or close| D
  QA -->|send back with comment| AP
```

## Who sets which label

| Label | Set by |
|---|---|
| Ideas | human |
| Refining | n8n |
| Ready for approval | n8n |
| Approved | **only the human** |
| Building | n8n |
| Waiting for you | n8n (Basic B) |
| Stuck | n8n (Basic B) |
| Your QA | n8n, when it sees the pull request |
| Done | n8n, when the pull request is merged or the issue is closed |

The AI advises, it never approves. There are two human gates:
before building (`Approved`) and before merging (QA).

## Permissions

The agent may:
- work in its own branch `issue-N`
- change files in the folder the task concerns
- write and run tests
- ask a question instead of guessing
- open a pull request

The agent may not:
- push or merge to `main` (protected by a branch ruleset)
- set labels, especially `Approved`
- build tasks that are not approved
- read or use the human's keys and tokens (enforced technically in Advanced, by running the agent in a container)

In Basic A and B the agent runs with the user's rights, so these rules are
instructions in the prompt, not technical limits.