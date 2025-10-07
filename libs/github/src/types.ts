/**
 * @fileoverview Types and interfaces for GitHub App integration.
 *
 * Provides shared type definitions for authentication, webhooks, and Octokit clients.
 */

import type { App } from '@octokit/app';
import type { Webhooks } from '@octokit/webhooks';

/**
 * GitHub App authentication configuration
 */
export interface GithubAuthConfig {
  /**
   * GitHub App ID
   */
  appId: number;

  /**
   * GitHub App private key in PEM format
   */
  privateKey: string;

  /**
   * GitHub App webhook secret
   */
  webhookSecret: string;
}

/**
 * Type representing an Octokit client authenticated for a specific installation.
 */
export type InstallationOctokit = ReturnType<App['getInstallationOctokit']>;

/**
 * Webhook handler type
 */
export type WebhookHandler = (
  event: Parameters<Webhooks['on']>[1]
) => Promise<void> | void;
