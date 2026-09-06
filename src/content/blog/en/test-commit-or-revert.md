---
title: Test && Commit || Revert
date: 2022-07-02T00:00:00.000Z
summary: Test && Commit || Revert (TCR) workflow - run tests after every production code change. Commit if passing, revert if failing. Learn this TDD-adjacent technique for faster feedback loops.
image: /images/blog/test-commit-revert.png
tags: [tcr, tdd, tests, commit]
---

## The TCR workflow (Test && Commit || Revert)

This workflow means that after every change to production code, tests are run. If the tests pass, the change is committed: `git commit -am "My tests passed"`

But if the tests do NOT pass, the code is discarded, meaning we run `git reset --hard`.

There are many scripts online that automate this process. In the simplest implementation I have seen, if the tests pass it commits, otherwise it reverts all code.

It is true that this can be a bit annoying, especially if you work with TDD. Imagine... in every TDD cycle (Red - Green - Refactor) you would revert every time you create a new test. For that reason, this is unworkable in TDD.

That is why there are improved versions that, for example, ensure the code compiles and only revert production code changes; they never revert tests.

Working with TCR can teach you to refactor in small steps, since it favors the "make the change easy" part while keeping tests green.

If you want to play with TCR using git, jest, and TypeScript, here is a command you can add to your package.json:

```js
  "test-tcr": "jest && git commit -am 'Test Passed' || git checkout -- :!**/**/*.test.ts"
```

Super simple: if any test fails, it discards any modified file that is not a test; otherwise it commits your code.

Best regards 👋
