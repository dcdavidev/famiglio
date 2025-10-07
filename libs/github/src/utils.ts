/**
 * @fileoverview Utility functions for GitHub App operations.
 *
 * Common helpers such as safe file reading, delays, etc., used internally by the GitHub library.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads a file safely, returning null if it does not exist or cannot be read.
 *
 * @param {string} filePath - Path to the file
 * @returns {string | null} File contents or null
 */
export function readFileSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(path.resolve(filePath), 'utf8');
  } catch {
    return null;
  }
}

/**
 * Delays execution for a given number of milliseconds.
 *
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>} Resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
