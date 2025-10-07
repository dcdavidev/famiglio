/**
 * @fileoverview Custom error classes for the Famiglio GitHub App.
 *
 * Defines a small hierarchy of application-specific errors that extend the
 * native `Error` class. These errors add context, error codes, and optional
 * metadata (`details`) useful for debugging, structured logging, and error
 * reporting.
 *
 * Includes:
 * - `FamiglioError`: base class for all domain-specific errors.
 * - `ConfigError`: thrown when environment or configuration validation fails.
 * - `GitHubError`: thrown when GitHub API interactions fail.
 */

/**
 * Base class for all Famiglio-related errors.
 * Provides a standardized structure for message, code, and optional details.
 */
export class FamiglioError extends Error {
  /**
   * Creates a new instance of FamiglioError.
   *
   * @param {string} message - A human-readable error message describing what went wrong.
   * @param {string} [code='FAMIGLIO_ERROR'] - A machine-friendly error code used to categorize the error.
   * @param {Record<string, unknown>} [details] - Optional object containing additional context or metadata.
   */
  constructor(
    message: string,
    public readonly code: string = 'FAMIGLIO_ERROR',
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'FamiglioError';
  }
}

/**
 * Error class representing configuration-related issues.
 * Typically thrown when environment variables are missing or invalid,
 * or when runtime configuration fails schema validation.
 *
 * @extends FamiglioError
 */
export class ConfigError extends FamiglioError {
  /**
   * Creates a new instance of ConfigError.
   *
   * @param {string} message - Description of the configuration error.
   * @param {Record<string, unknown>} [details] - Optional metadata for debugging.
   */
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'CONFIG_ERROR', details);
  }
}

/**
 * Error class representing failures when interacting with the GitHub API.
 * Used to distinguish API or network issues from other types of errors.
 *
 * @extends FamiglioError
 */
export class GitHubError extends FamiglioError {
  /**
   * Creates a new instance of GitHubError.
   *
   * @param {string} message - Description of the GitHub operation failure.
   * @param {Record<string, unknown>} [details] - Optional additional data such as request/response info.
   */
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'GITHUB_ERROR', details);
  }
}
