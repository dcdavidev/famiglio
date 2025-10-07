/**
 * @fileoverview Core utility functions for the Famiglio GitHub App.
 *
 * Provides safe file reading and asynchronous delay helpers used across the project.
 * These utilities are lightweight, dependency-free, and designed for reliability in both
 * production and development contexts.
 */

import fs from 'node:fs';

/**
 * Reads the contents of a file safely, returning `null` instead of throwing
 * if the file does not exist or cannot be read.
 *
 * @param {string} path - Absolute or relative path to the file to be read.
 * @returns {string | null} The file contents as UTF-8 text, or `null` if reading fails.
 *
 * @example
 * ```ts
 * const data = readFileSafe('./config.json');
 * if (!data) {
 *   logger.warn('Missing config.json file');
 * }
 * ```
 */
export const readFileSafe = (path: string): string | null => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch {
    return null;
  }
};

/**
 * Asynchronous helper that pauses execution for a specified duration.
 *
 * Useful for retry logic, rate limiting, or simulated delays in tests.
 *
 * @param {number} ms - Number of milliseconds to wait before resolving.
 * @returns {Promise<void>} A promise that resolves after the given delay.
 *
 * @example
 * ```ts
 * await sleep(1000); // waits 1 second
 * ```
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
