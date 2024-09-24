// src/utils.ts

import {TableRow, MarkdownTableData} from './types';

/**
 * Calculates the maximum width for each column based on the content.
 * @param allRows - All rows (header and body) of the table.
 * @param maxColumnCount - The maximum number of columns in the table.
 * @returns An array of maximum widths for each column.
 */
export function calculateColumnWidths(
  allRows: readonly TableRow[],
  maxColumnCount: number
): number[] {
  const widths: number[] = new Array(maxColumnCount).fill(3); // Minimum width of 3 for each column.

  allRows.forEach((row: TableRow) => {
    for (let i = 0; i < maxColumnCount; i++) {
      const cell = row[i] ?? '';
      widths[i] = Math.max(widths[i], cell.length);
    }
  });

  return widths;
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
 * Formats a single row into a Markdown-formatted string.
 * @param columnCount - The number of columns in the table.
 * @param row - The data of the current row.
 * @param columnAlignments - Alignment settings for each column.
 * @param columnWidths - Widths of each column.
 * @param useTabs - Flag to use tabs between columns.
 * @param replaceNewlines - Flag to replace newlines with <br> tags.
 * @returns The Markdown string for the row.
 */
export function formatMarkdownRow(
  columnCount: number,
  row: TableRow,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths?: readonly number[],
  useTabs = false,
  replaceNewlines = false
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
    let cell = row[i] ?? '';
    if (replaceNewlines) {
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
 * @param tableData - The table data including headers and rows.
 * @param columnAlignments - Alignment settings for each column.
 * @param adjustColumnWidths - Flag to adjust column widths based on content.
 * @param useTabs - Flag to use tabs between columns.
 * @param replaceNewlines - Flag to replace newlines with <br> tags.
 * @returns The complete Markdown table string.
 */
export function generateMarkdownTableString(
  tableData: MarkdownTableData,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  adjustColumnWidths = true,
  useTabs = false,
  replaceNewlines = false
): string {
  const headerColumnCount = tableData.header.length;
  const bodyColumnCounts = tableData.rows.map((row: TableRow) => row.length);
  const maxColumnCount = Math.max(headerColumnCount, ...bodyColumnCounts);

  const columnWidths = adjustColumnWidths
    ? calculateColumnWidths(
        [tableData.header, ...tableData.rows],
        maxColumnCount
      )
    : undefined;

  const markdownHeaderRow = formatMarkdownRow(
    maxColumnCount,
    tableData.header,
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

  const markdownBodyRows = tableData.rows
    .map((row: TableRow) =>
      formatMarkdownRow(
        maxColumnCount,
        row,
        columnAlignments,
        columnWidths,
        useTabs,
        replaceNewlines
      )
    )
    .join('\n');

  return `${markdownHeaderRow}\n${markdownAlignmentRow}\n${markdownBodyRows}`.trimEnd();
}
