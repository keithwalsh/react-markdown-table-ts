// src/validation.ts

import {MarkdownTableProps} from './types';

/**
 * Custom error class for handling Markdown table generation errors.
 */
export class MarkdownTableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MarkdownTableError';
    Object.setPrototypeOf(this, MarkdownTableError.prototype);
  }
}
/**
 * Validates the structure of the table data based on the `hasHeader` flag.
 * Throws an error if validation fails.
 * @param markdownTableProps - The props to validate.
 */
export function validateMarkdownTableProps(
  markdownTableProps: MarkdownTableProps
): void {
  const {
    inputData,
    hasHeader = true,
    columnAlignments,
    isCompact = false,
    hasTabs = false,
    canReplaceNewlines = false,
  } = markdownTableProps;

  if (!Array.isArray(inputData)) {
    throw new MarkdownTableError(
      "The 'data' prop must be a two-dimensional array."
    );
  }

  if (inputData.length === 0) {
    throw new MarkdownTableError(
      "The 'data' array must contain at least one row."
    );
  }

  // If hasHeader is true, ensure the first row exists and is valid
  if (hasHeader) {
    const header = inputData[0];
    if (!Array.isArray(header) || header.length === 0) {
      throw new MarkdownTableError(
        "The first row of 'data' must be a non-empty array representing the header."
      );
    }

    // Validate each header cell is a string
    header.forEach((cell, index) => {
      if (typeof cell !== 'string') {
        throw new MarkdownTableError(
          `Header cell at index ${index} must be a string.`
        );
      }
    });
  }

  // Validate each row
  inputData.forEach((row, rowIndex) => {
    if (!Array.isArray(row)) {
      throw new MarkdownTableError(
        `Row ${rowIndex + 1} in 'data' must be an array of strings.`
      );
    }

    row.forEach((cell, cellIndex) => {
      if (typeof cell !== 'string') {
        throw new MarkdownTableError(
          `Cell at row ${rowIndex + 1}, column ${cellIndex + 1} must be a string.`
        );
      }
    });
  });

  // Validate columnAlignments if provided
  if (columnAlignments) {
    if (!Array.isArray(columnAlignments)) {
      throw new MarkdownTableError(
        "'columnAlignments' must be an array of alignment strings."
      );
    }

    const validAlignments = ['left', 'center', 'right', 'none'];
    columnAlignments.forEach((alignment, index) => {
      if (!validAlignments.includes(alignment)) {
        throw new MarkdownTableError(
          `Invalid alignment '${alignment}' at index ${index}. Valid options are 'left', 'center', 'right', 'none'.`
        );
      }
    });
  }

  // Validate isCompact
  if (typeof isCompact !== 'boolean') {
    throw new MarkdownTableError("'isCompact' must be a boolean.");
  }

  // Validate hasTabs
  if (typeof hasTabs !== 'boolean') {
    throw new MarkdownTableError("'hasTabs' must be a boolean.");
  }

  // Validate canReplaceNewlines
  if (typeof canReplaceNewlines !== 'boolean') {
    throw new MarkdownTableError("'canReplaceNewlines' must be a boolean.");
  }
}
