/**
 * @fileoverview Environment configuration module for the Famiglio GitHub App.
 *
 * Loads and validates environment variables using `@dotenvx/dotenvx` and `zod`.
 * This module ensures that all required configuration values are present
 * and correctly typed before being used by the core services.
 *
 * The configuration includes:
 * - Node environment and application port
 * - Logging verbosity level
 * - GitHub App credentials and secrets
 *
 * Exported objects:
 * - `env`: strongly typed and validated environment variables
 * - `config`: simplified, structured configuration object for runtime use
 */

import { config as loadEnv } from '@dotenvx/dotenvx';

import { z } from 'zod';

loadEnv();

/**
 * Zod schema defining and validating all expected environment variables.
 * Ensures correct formats, types, and default values.
 */
const EnvSchema = z.object({
  /**
   * Current runtime environment.
   * Determines behavior such as logging verbosity and error handling.
   * @default "development"
   */
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  /**
   * Port number for the HTTP server.
   * Must be numeric and is automatically converted to a number.
   * @default 4000
   */
  PORT: z.string().regex(/^\d+$/).transform(Number).default(4000),

  /**
   * Logging verbosity level, compatible with Pino logger levels.
   * @default "info"
   */
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),

  // ──────────────────────────────
  // GitHub App configuration
  // ──────────────────────────────

  /**
   * GitHub Webhook secret used to verify incoming events.
   * @throws Error if missing.
   */
  GITHUB_WEBHOOK_SECRET: z.string().min(1, 'Missing GitHub webhook secret'),

  /**
   * GitHub App ID identifying this installation.
   * @throws Error if missing.
   */
  GITHUB_APP_ID: z.string().min(1, 'Missing GitHub App ID'),

  /**
   * Optional path to the GitHub App's private key file.
   * Used to authenticate API requests.
   */
  GITHUB_PRIVATE_KEY_PATH: z.string().optional(),
});

/**
 * Type-safe interface inferred from the environment schema.
 * @typedef {z.infer<typeof EnvSchema>} FamiglioEnv
 */
export type FamiglioEnv = z.infer<typeof EnvSchema>;

/**
 * Parsed and validated environment variables.
 * Throws an error at startup if validation fails.
 */
export const env: FamiglioEnv = EnvSchema.parse(process.env);

/**
 * Runtime configuration object derived from validated environment variables.
 * Provides a convenient and strongly typed structure for application modules.
 */
export const config = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  github: {
    appId: env.GITHUB_APP_ID,
    webhookSecret: env.GITHUB_WEBHOOK_SECRET,
    privateKeyPath: env.GITHUB_PRIVATE_KEY_PATH,
  },
  logLevel: env.LOG_LEVEL,
};
