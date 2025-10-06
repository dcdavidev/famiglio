# Contributing

Thank you for considering contributing to dcdavidev/famiglio! 🙏❤️
This document outlines the conventions, tools, and workflow I follow to maintain a clean and productive development process.

---

## Table of Contents

1. [Getting Started](#1-getting-started)  
   1.1 [Global Tools](#11-global-tools)  
   1.2 [Local Setup](#12-local-setup)
2. [Branch Naming](#2-branch-naming)
3. [Commit Messages](#3-commit-messages)
4. [Code Style](#4-code-style)
5. [Pull Requests](#5-pull-requests)
6. [Git Hooks](#6-git-hooks)
7. [Discussions vs Issues](#7-discussions-vs-issues)

---

## 1. Getting Started

### 1.1 Global Tools

Before contributing, install the following tools **globally**:

```bash
npm install -g commitizen nx cspell eslint prettier lefthook
```

These tools provide the CLI, build system, linting, formatting, spellchecking, hooks, environment management, and conventional commit support.

### 1.2 Local Setup

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/dcdavidev/famiglio.git
   cd famiglio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build all packages:
   ```bash
   nx run-many -t build
   ```

---

## 2. Branch Naming

Branch names must follow the convention:

`type/description`

Examples:

- `feat/api-famiglio`
- `fix/auth-bug`
- `chore/ci-pipeline`

---

## 3. Commit Messages

I follow **Conventional Commits**.  
All commits should be made using **Commitizen**:

- Run `cz` directly, or
- Use the script:
  ```bash
  npm run commit
  ```

Format:

`<type>(<scope>): <description>`

Examples:

- `feat(cspell-config): add rate limiting`
- `fix(eslint-plugin): resolve token refresh bug`
- `chore: update GitHub Actions workflow`

Types include: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`.

---

## 4. Code Style

- Use **TypeScript** for all code.
- Document code with **JSDoc**.
- Code must pass **ESLint**, **Prettier**, and **cspell** checks.

Run manually:

```bash
eslint .
prettier --check .
cspell lint .
```

---

## 5. Pull Requests

- Keep PRs **small and focused**.
- Update **README** or **docs** if your change affects usage.
- Ensure all **checks pass** before requesting review.

---

## 6. Git Hooks

We use **lefthook** for Git hooks.  
It runs linters, formatters, spellcheck, and type checks before commits.

Install/update hooks with:

```bash
lefthook install
```

---

## 7. Discussions vs Issues

- Use **GitHub Discussions** for ideas, proposals, and questions.
- Use **Issues** only for actionable bugs or tasks.

---

By following these guidelines, you help keep dcdavidev/famiglio clean, modular, and welcoming ✨.
