Work on GitHub issue #{ISSUE_NUMBER} in this repository.

Read it with: gh issue view {ISSUE_NUMBER} --comments
The comment starting "Refined by the AI step" is the specification.
Decisions written in the issue description override it.

Rules:
- You are on branch issue-{ISSUE_NUMBER}. Commit your work there.
- Work only in the folder named under "Constraints".
- Do not touch main, do not change labels, and do not edit .github/
  or existing tests unless the task says so.
- If anything is unclear, ask instead of guessing.
- Write and run tests where it makes sense.
- Do not push and do not open a pull request.
- When you are done, summarize what you changed and how you checked it.
- End your final message with exactly one line:
  STATUS: DONE
  or STATUS: QUESTION <your question>
  or STATUS: STUCK <the reason>
