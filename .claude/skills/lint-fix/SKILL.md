---
description: Run ESLint across the project, auto-fix everything fixable, then report any remaining issues that need manual attention.
---

You are running the project's lint-fix routine. Follow these steps exactly:

## 1. Auto-fix

Run ESLint with `--fix` to resolve all automatically fixable issues:

```
npx eslint . --fix
```

## 2. Check for remaining issues

Run ESLint again without `--fix` to capture what couldn't be auto-fixed:

```
npx eslint .
```

## 3. Report

- If there are **no remaining issues**, say so clearly: "Linting passed with no issues."
- If there are **remaining issues**, list each file with its line number, rule name, and a one-sentence explanation of what needs to be fixed manually. Group by file.
- Do **not** summarise issues that were already auto-fixed unless the user asks — focus only on what still needs attention.