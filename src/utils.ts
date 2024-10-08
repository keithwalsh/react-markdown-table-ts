// src/utils.ts

import {TableRow, InputData} from './types';

/**
 * Calculates the maximum width for each column based on the content.
 * @param tableRows - All rows (header and body) of the table.
 * @param maxColumnCount - The maximum number of columns in the table.
 * @returns An array of maximum widths for each column.
 */
export function calculateColumnWidths(
  tableRows: readonly TableRow[],
  maxColumnCount: number
): number[] {
  const widths: number[] = new Array(maxColumnCount).fill(3); // Minimum width of 3 for each column.

  tableRows.forEach((currentRow: TableRow) => {
    for (let i = 0; i < maxColumnCount; i++) {
      const cell = currentRow[i] ?? '';
      widths[i] = Math.max(widths[i], cell.length);
    }
  });

  return widths;
}

/**
 * Formats a single row into a Markdown-formatted string.
 * @param columnCount - The number of columns in the table.
 * @param currentRow - The data of the current row.
 * @param columnAlignments - Alignment settings for each column.
 * @param columnWidths - Widths of each column.
 * @param useTabs - Flag to use tabs between columns.
 * @param canReplaceNewlines - Flag to replace newlines with <br> tags.
 * @returns The Markdown string for the row.
 */
export function formatMarkdownRow(
  columnCount: number,
  currentRow: TableRow,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths?: readonly number[],
  useTabs = false,
  canReplaceNewlines = false
): string {
  const defaultAlignment: 'left' | 'right' | 'center' | 'none' = 'left';
  const adjustedAlignments =
    columnAlignments.length < columnCount
      ? [
          ...columnAlignments,
          ...Array(columnCount - columnAlignments.length).fill(
            defaultAlignment
          ),
        ]
      : columnAlignments;

  let markdownRow = '|';
  for (let i = 0; i < columnCount; i++) {
    let cell = currentRow[i] ?? '';
    if (canReplaceNewlines) {
      cell = replaceNewlinesInCell(cell);
    }
    const alignment = adjustedAlignments[i] ?? defaultAlignment;
    const targetWidth = columnWidths ? columnWidths[i] : cell.length;

    if (alignment === 'right') {
      markdownRow += `${useTabs ? '\t' : ' '}${cell.padStart(targetWidth)}${useTabs ? '\t' : ' '}|`;
    } else if (alignment === 'center') {
      const totalPadding = targetWidth - cell.length;
      const paddingLeft = Math.floor(totalPadding / 2);
      const paddingRight = totalPadding - paddingLeft;
      markdownRow += `${useTabs ? '\t' : ' '}${' '.repeat(paddingLeft)}${cell}${' '.repeat(paddingRight)}${useTabs ? '\t' : ' '}|`;
    } else {
      // Left alignment or default
      markdownRow += `${useTabs ? '\t' : ' '}${cell.padEnd(targetWidth)}${useTabs ? '\t' : ' '}|`;
    }
  }

  return markdownRow;
}

/**
 * Generates the alignment row for the Markdown table syntax.
 * @param columnCount - The number of columns in the table.
 * @param columnAlignments - Alignment settings for each column.
 * @param columnWidths - Widths of each column.
 * @param useTabs - Flag to use tabs between columns.
 * @returns The Markdown string for the alignment row.
 */
export function formatAlignmentRow(
  columnCount: number,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths?: readonly number[],
  useTabs = false
): string {
  const defaultAlignment: 'left' | 'right' | 'center' | 'none' = 'left';
  const adjustedAlignments =
    columnAlignments.length < columnCount
      ? [
          ...columnAlignments,
          ...Array(columnCount - columnAlignments.length).fill(
            defaultAlignment
          ),
        ]
      : columnAlignments;

  let alignmentRow = '|';
  for (let i = 0; i < columnCount; i++) {
    const alignment = adjustedAlignments[i] ?? defaultAlignment;
    const targetWidth = columnWidths ? columnWidths[i] : 3;
    let alignIndicator = '';

    switch (alignment) {
      case 'left':
        alignIndicator = `:${'-'.repeat(targetWidth - 1)}`;
        break;
      case 'center':
        alignIndicator = `:${'-'.repeat(targetWidth - 2)}:`;
        break;
      case 'right':
        alignIndicator = `${'-'.repeat(targetWidth - 1)}:`;
        break;
      default:
        alignIndicator = `${'-'.repeat(targetWidth)}`;
        break;
    }

    alignmentRow += `${useTabs ? '\t' : ' '}${alignIndicator}${useTabs ? '\t' : ' '}|`;
  }

  return alignmentRow;
}

/**
 * Generates a complete Markdown table string from the provided data.
 * @param inputData - The table data including headers and rows.
 * @param columnAlignments - Alignment settings for each column.
 * @param canAdjustColumnWidths - Flag to adjust column widths based on content.
 * @param useTabs - Flag to use tabs between columns.
 * @param replaceNewlines - Flag to replace newlines with <br> tags.
 * @returns The complete Markdown table string.
 */
export function generateMarkdownTableString(
  inputData: InputData,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  canAdjustColumnWidths = true,
  useTabs = false,
  replaceNewlines = false
): string {
  const headerColumnCount = inputData.inputDataHeader.length;
  const bodyColumnCounts = inputData.inputDataBody.map(
    (currentRow: TableRow) => currentRow.length
  );
  const maxColumnCount = Math.max(headerColumnCount, ...bodyColumnCounts);

  const columnWidths = canAdjustColumnWidths
    ? calculateColumnWidths(
        [inputData.inputDataHeader, ...inputData.inputDataBody],
        maxColumnCount
      )
    : undefined;

  const markdownHeaderRow = formatMarkdownRow(
    maxColumnCount,
    inputData.inputDataHeader,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines
  );
  const markdownAlignmentRow = formatAlignmentRow(
    maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs
  );

  const markdownBodyRows = inputData.inputDataBody
    .map((currentRow: TableRow) =>
      formatMarkdownRow(
        maxColumnCount,
        currentRow,
        columnAlignments,
        columnWidths,
        useTabs,
        replaceNewlines
      )
    )
    .join('\n');

  return `${markdownHeaderRow}\n${markdownAlignmentRow}\n${markdownBodyRows}`.trimEnd();
}

/**
 * Replaces newline characters in a string with <br> tags.
 * @param cell - The cell content to process.
 * @returns The processed cell content with newlines replaced.
 */
export function replaceNewlinesInCell(cell: string): string {
  return cell.replace(/\n/g, '<br>');
}

/**
 * Converts a zero-based column index to its corresponding Excel-style column name.
 * For example, 0 -> 'A', 1 -> 'B', ..., 25 -> 'Z', 26 -> 'AA', etc.
 * @param index - The zero-based column index.
 * @returns The corresponding column name.
 */
export function getColumnName(index: number): string {
  let columnName = '';
  let currentIndex = index;
  while (currentIndex >= 0) {
    columnName = String.fromCharCode((currentIndex % 26) + 65) + columnName;
    currentIndex = Math.floor(currentIndex / 26) - 1;
  }
  return columnName;
}

/**
 * Generates an array of alphabetic headers based on the specified column count.
 * @param columnCount - The number of columns.
 * @returns An array of column header names.
 */
export function generateAlphabetHeaders(columnCount: number): string[] {
  const alphabetHeaders: string[] = [];
  for (let i = 0; i < columnCount; i++) {
    alphabetHeaders.push(getColumnName(i));
  }
  return alphabetHeaders;
}
