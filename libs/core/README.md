# @famiglio/core

> Core library for the **Famiglio GitHub App**.

---

## 🧠 Overview

`@famiglio/core` is the foundational layer of the **Famiglio** project — a GitHub App designed to automate repository management tasks that are normally restricted by GitHub’s branch protection and ruleset policies.

This core library provides the low-level building blocks required by the application layer:

- Environment variable loading and validation
- Centralized, structured logging
- Error handling and domain-specific error types
- Utility functions for file operations and async workflows

---

## ⚙️ Features

- **Typed environment configuration** with [`zod`](https://github.com/colinhacks/zod)  
  → Ensures required environment variables are defined and valid.
- **Pretty + structured logging** via [`pino`](https://getpino.io)  
  → Automatically switches between human-readable and JSON output.
- **Custom error hierarchy** (`FamiglioError`, `ConfigError`, `GitHubError`)  
  → Enables consistent error semantics and better diagnostics.
- **Safe utilities** like `readFileSafe()` and `sleep()`  
  → Small, dependency-free helpers used throughout the codebase.

---

## 🧩 Modules

### `config.ts`

Loads and validates environment variables using `@dotenvx/dotenvx` and `zod`.

```ts
import { config } from '@famiglio/core';

console.log(config.port); // → 4000
console.log(config.github.appId); // → GitHub App ID
```

### `logger.ts`

Provides a global `pino` logger configured according to `NODE_ENV`.

```ts
import { logger } from '@famiglio/core';

logger.info('App started', { env: process.env.NODE_ENV });
logger.error(err, 'GitHub API request failed');
```

### `errors.ts`

Defines application-specific error classes for structured error handling.

```ts
import { ConfigError, GitHubError } from '@famiglio/core';

throw new ConfigError('Missing environment variable', {
  variable: 'GITHUB_APP_ID',
});
```

### `utils.ts`

Contains simple utility functions.

```ts
import { readFileSafe, sleep } from '@famiglio/core';

const key = readFileSafe('./private-key.pem');
await sleep(500);
```

---

## 🧾 Environment Variables

| Variable                  | Required | Description                                                                                           |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                | No       | Runtime environment — `development`, `production`, or `test`. Default: `development`.                 |
| `PORT`                    | No       | HTTP server port. Default: `4000`.                                                                    |
| `LOG_LEVEL`               | No       | Logging verbosity — `fatal`, `error`, `warn`, `info`, `debug`, `trace`, or `silent`. Default: `info`. |
| `GITHUB_WEBHOOK_SECRET`   | **Yes**  | Secret used to verify GitHub webhook payloads.                                                        |
| `GITHUB_APP_ID`           | **Yes**  | The GitHub App ID used to authenticate API requests.                                                  |
| `GITHUB_PRIVATE_KEY_PATH` | No       | Path to the GitHub App’s private key file. Optional but recommended.                                  |

---

## 🧪 Development

Famiglio uses [Nx](https://nx.dev) for project orchestration and `tsdown` for fast TypeScript builds.

```bash
# Build the package
nx build core

# Watch for changes
nx watch core
```

Output is generated in `libs/core/dist`.

---

## 📜 License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)

---

## 🔗 Related

- [Famiglio repository](https://github.com/dcdavidev/famiglio)
- [Nx mental model](https://nx.dev/docs/concepts/mental-model)
- [Famiglio app branch: `feat/famiglio-app`](https://github.com/dcdavidev/famiglio/tree/feat/famiglio-app)
