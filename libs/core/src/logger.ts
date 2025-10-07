/**
 * @fileoverview Centralized logger configuration for the Famiglio GitHub App.
 *
 * Uses the high-performance `pino` logger to provide structured, JSON-based
 * logging in production and human-readable logs during development.
 *
 * The logger automatically adapts based on `NODE_ENV`:
 * - In **development**, logs are pretty-printed with colors and timestamps.
 * - In **production**, logs remain machine-friendly JSON for ingestion by monitoring tools.
 */

import pino from 'pino';

import { config } from './config.js';

/**
 * Determines whether the application is running in development mode.
 * Used to toggle pretty-print transport for easier debugging.
 * @constant {boolean}
 */
const isDev = config.nodeEnv === 'development';

/**
 * Global Pino logger instance configured for the current runtime environment.
 *
 * This logger should be imported and used throughout the application for:
 * - Consistent structured logging
 * - Adjustable verbosity via `LOG_LEVEL`
 * - Automatic pretty-printing during local development
 *
 * @example
 * ```ts
 * import { logger } from './logger.js';
 *
 * logger.info('App started', { port: config.port });
 * logger.error(err, 'Failed to initialize GitHub App');
 * ```
 */
export const logger = pino({
  level: config.logLevel,
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
});
