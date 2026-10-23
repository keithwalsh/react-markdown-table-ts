/**
 * @fileoverview Generates a Markdown table string from rows of cells, for use
 * without rendering the MarkdownTable component, such as on a server, in a
 * CLI or behind a copy button.
 */

import type { CellValue, MarkdownTableOptions } from './types.js';
import { generateAlphabetHeaders, generateMarkdownTableString } from './utils.js';
import { validateColumnAlignments, validateInputData } from './validation.js';

function getLongestRowLength(rows: readonly (readonly unknown[])[]): number {
  return rows.reduce((length, row) => Math.max(length, row.length), 0);
}

function getTableData(inputData: readonly (readonly unknown[])[], hasHeader: boolean) {
  return hasHeader
    ? { inputDataHeader: inputData[0], inputDataBody: inputData.slice(1) }
    : { inputDataHeader: generateAlphabetHeaders(getLongestRowLength(inputData)), inputDataBody: inputData };
}

/**
 * Generates a Markdown table from rows of cells.
 * @param inputData - The rows of the table. If `hasHeader` is true, the first row is the header.
 * @param options - The formatting options, with the same names and defaults as the `MarkdownTable` props
 * @returns The Markdown table
 * @throws {MarkdownTableError} If `inputData` or `columnAlignments` is invalid
 * @example
 * generateMarkdownTable([['Name', 'Age'], ['Ann', 30]], { columnAlignments: ['left', 'right'] });
 */
export function generateMarkdownTable(
  inputData: readonly (readonly CellValue[])[],
  {
    columnAlignments = [],
    isCompact = false,
    hasPadding = true,
    hasTabs = false,
    hasHeader = true,
    convertLineBreaks = false,
  }: MarkdownTableOptions = {}
): string {
  validateInputData(inputData);
  validateColumnAlignments(columnAlignments);
  const { inputDataHeader, inputDataBody } = getTableData(inputData, hasHeader);

  return generateMarkdownTableString(
    { inputDataHeader, inputDataBody },
    columnAlignments,
    !isCompact,
    hasTabs,
    convertLineBreaks,
    hasPadding
  );
}
