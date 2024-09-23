// src/validation.ts

import {MarkdownTableProps} from './types';
import {MarkdownTableError} from './errors';

/**
 * Validates the structure of the table data based on the `hasHeader` flag.
 * Throws an error if validation fails.
 * @param props - The props to validate.
 */
export function validateMarkdownTableProps(props: MarkdownTableProps): void {
  const {data, hasHeader = true, columnAlignments, compact = false} = props;

  // Removed unused variable adjustColumnWidths
  // const adjustColumnWidths = !compact;

  if (!data || !Array.isArray(data)) {
    throw new MarkdownTableError(
      "The 'data' prop must be a non-empty two-dimensional array."
    );
  }

  if (data.length === 0) {
    throw new MarkdownTableError(
      "The 'data' array must contain at least one row."
    );
  }

  // If hasHeader is true, ensure the first row exists and is valid
  if (hasHeader) {
    const header = data[0];
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
  data.forEach((row, rowIndex) => {
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

  // Validate compact
  if (typeof compact !== 'boolean') {
    throw new MarkdownTableError("'compact' must be a boolean.");
  }

  // Optionally, add any further validations based on compact here
}
