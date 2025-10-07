/**
 * @fileoverview GitHub authentication utilities for the Famiglio App.
 *
 * Provides helpers to initialize the GitHub App and create Octokit clients
 * authenticated for specific installations using the latest @octokit/app API.
 */

import fs from 'node:fs';
import path from 'node:path';

import { App } from '@octokit/app';
import { createAppAuth } from '@octokit/auth-app';

import { config, GitHubError } from '@famiglio/core';

/**
 * Initializes a GitHub App instance.
 *
 * @returns {App} Authenticated GitHub App instance
 * @throws {GitHubError} If private key is missing
 */
export const initApp = (): App => {
  const privateKey = config.github.privateKeyPath
    ? fs.readFileSync(path.resolve(config.github.privateKeyPath), 'utf8')
    : undefined;

  if (!privateKey) {
    throw new GitHubError('Missing GitHub private key for App authentication', {
      missingKeyPath: config.github.privateKeyPath,
    });
  }

  return new App({
    appId: Number(config.github.appId),
    privateKey,
  });
};

/**
 * Returns an Octokit client authenticated for a specific GitHub App installation.
 *
 * @param {number} installationId - The GitHub App installation ID
 * @returns {Promise<ReturnType<App['getInstallationOctokit']>>} Authenticated Octokit client
 * @throws {GitHubError} If authentication fails
 */
export const getInstallationClient = async (
  installationId: number
): Promise<ReturnType<App['getInstallationOctokit']>> => {
  try {
    const app = initApp();
    return app.getInstallationOctokit(installationId);
  } catch (error) {
    throw new GitHubError('Failed to create installation client', {
      installationId,
      originalError: error,
    });
  }
};

/**
 * Generates a JWT token to authenticate as the GitHub App itself.
 *
 * Use this for App-level requests (e.g., listing installations).
 *
 * @returns {Promise<string>} JWT token for App-level API calls
 * @throws {GitHubError} If authentication fails
 */
export const getAppJWT = async (): Promise<string> => {
  const privateKey = config.github.privateKeyPath
    ? fs.readFileSync(path.resolve(config.github.privateKeyPath), 'utf8')
    : undefined;

  if (!privateKey) {
    throw new GitHubError('Missing GitHub private key for App authentication', {
      missingKeyPath: config.github.privateKeyPath,
    });
  }

  try {
    const auth = createAppAuth({
      appId: Number(config.github.appId),
      privateKey,
    });

    const appAuth = await auth({ type: 'app' });
    return appAuth.token;
  } catch (error) {
    throw new GitHubError('Failed to generate App JWT', {
      originalError: error,
    });
  }
};
