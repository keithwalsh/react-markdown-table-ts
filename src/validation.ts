/**
 * @fileoverview Validation utilities and custom error class for markdown table
 * data validation.
 */

import type { Alignment } from './types.js';

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

const ALIGNMENTS: readonly Alignment[] = ['left', 'center', 'right', 'none'];

function describeValue(value: unknown): string {
  return typeof value === 'string' ? `'${value}'` : String(value);
}

/**
 * Validates that the input data is a non-empty two-dimensional array.
 * @param inputData - The data to validate
 * @throws {MarkdownTableError} If validation fails
 */
export function validateInputData(inputData: unknown): asserts inputData is string[][] {
  if (inputData === null || !Array.isArray(inputData)) {
    throw new MarkdownTableError("The 'inputData' prop must be a two-dimensional array.");
  }

  if (inputData.length === 0) {
    throw new MarkdownTableError("The 'inputData' array must contain at least one row.");
  }

  const invalidRowIndex = inputData.findIndex(row => !Array.isArray(row));
  if (invalidRowIndex !== -1) {
    throw new MarkdownTableError(
      `The 'inputData' prop must be a two-dimensional array, but inputData[${invalidRowIndex}] is ${describeValue(inputData[invalidRowIndex])}.`
    );
  }
}

/**
 * Validates that the column alignments are an array of known alignment values.
 * @param columnAlignments - The alignments to validate
 * @throws {MarkdownTableError} If validation fails
 */
export function validateColumnAlignments(columnAlignments: unknown): asserts columnAlignments is readonly Alignment[] {
  if (!Array.isArray(columnAlignments)) {
    throw new MarkdownTableError("The 'columnAlignments' prop must be an array.");
  }

  const invalidIndex = columnAlignments.findIndex(alignment => !ALIGNMENTS.includes(alignment));
  if (invalidIndex !== -1) {
    throw new MarkdownTableError(
      `The 'columnAlignments' prop must only contain 'left', 'center', 'right' or 'none', but columnAlignments[${invalidIndex}] is ${describeValue(columnAlignments[invalidIndex])}.`
    );
  }
}
