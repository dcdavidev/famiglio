# @famiglio/github

> GitHub library for the **Famiglio GitHub App**.

---

## Features

- Initialize a GitHub App using `@octokit/app`.
- Authenticate GitHub installations easily.
- Create Octokit clients with proper scopes.
- Streamline GitHub API interactions in your projects.

---

## Usage

### Initialize a GitHub App

```ts
import { initGithubApp } from '@famiglio/github';

const app = initGithubApp({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
});
```

### Create an Octokit Client for an Installation

```ts
import { getOctokitForInstallation } from '@famiglio/github';

const octokit = await getOctokitForInstallation({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  installationId: 12345678,
});
```

---

## Environment Variables

| Name                   | Description                                 |
| ---------------------- | ------------------------------------------- |
| `GITHUB_APP_ID`        | GitHub App ID                               |
| `GITHUB_PRIVATE_KEY`   | Private key for the GitHub App (PEM format) |
| `GITHUB_CLIENT_ID`     | Optional: OAuth client ID                   |
| `GITHUB_CLIENT_SECRET` | Optional: OAuth client secret               |

---

## License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)
