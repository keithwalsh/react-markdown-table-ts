/**
 * @fileoverview Validation utilities and custom error class for markdown table
 * data validation.
 */

/**
 * Custom error class for handling Markdown table generation errors.
 * Supports ES2022 error chaining via the optional `cause` property.
 */
export class MarkdownTableError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'MarkdownTableError';
    Object.setPrototypeOf(this, MarkdownTableError.prototype);
  }
}

/**
 * Validates that the input data is a non-empty two-dimensional array.
 * @param inputData - The data to validate
 * @throws {MarkdownTableError} If validation fails
 */
export function validateInputData(inputData: unknown): void {
  if (inputData === null || !Array.isArray(inputData)) {
    throw new MarkdownTableError("The 'data' prop must be a two-dimensional array.");
  }

  if (inputData.length === 0) {
    throw new MarkdownTableError("The 'data' array must contain at least one row.");
  }
}
