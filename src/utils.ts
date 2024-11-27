// src/utils.ts

import {TableRow, InputData} from './types';

/**
 * Adjusts column alignments array to match the required column count
 * @param columnAlignments - Original alignment settings
 * @param columnCount - Required number of columns
 * @returns Adjusted array of column alignments
 */
function getAdjustedAlignments(
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnCount: number
): ('left' | 'right' | 'center' | 'none')[] {
  const defaultAlignment: 'left' | 'right' | 'center' | 'none' = 'left'
  return columnAlignments.length < columnCount
    ? [
        ...Array.from(columnAlignments),
        ...Array(columnCount - columnAlignments.length).fill(defaultAlignment),
      ]
    : Array.from(columnAlignments)
}

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

type Alignment = 'left' | 'right' | 'center' | 'none';

function formatCell(
  cell: string,
  alignment: Alignment,
  targetWidth: number,
  useTabs: boolean,
  padding: string
): string {
  switch (alignment) {
    case 'right':
      return `${useTabs ? '\t' : padding}${cell.padStart(targetWidth)}${useTabs ? '\t' : padding}`;
    case 'center':
      return formatCenterAlignedCell(cell, targetWidth, useTabs, padding);
    default:
      return `${useTabs ? '\t' : padding}${cell.padEnd(targetWidth)}${useTabs ? '\t' : padding}`;
  }
}

function formatCenterAlignedCell(
  cell: string,
  targetWidth: number,
  useTabs: boolean,
  padding: string
): string {
  const totalPadding = targetWidth - cell.length;
  const paddingLeft = Math.floor(totalPadding / 2);
  const paddingRight = totalPadding - paddingLeft;
  return `${useTabs ? '\t' : padding}${' '.repeat(paddingLeft)}${cell}${' '.repeat(paddingRight)}${useTabs ? '\t' : padding}`;
}

export function formatMarkdownRow(
  columnCount: number,
  currentRow: TableRow,
  columnAlignments: readonly Alignment[],
  columnWidths?: readonly number[],
  useTabs = false,
  canReplaceNewlines = false,
  hasPadding = true
): string {
  const adjustedAlignments = getAdjustedAlignments(columnAlignments, columnCount);
  const padding = hasPadding ? ' ' : '';

  const formattedCells = Array.from({length: columnCount}, (_, i) => {
    let cell = currentRow[i] ?? '';
    if (canReplaceNewlines) {
      cell = replaceNewlinesInCell(cell);
    }
    const alignment = adjustedAlignments[i] ?? 'left';
    const targetWidth = columnWidths ? columnWidths[i] : cell.length;

    return formatCell(cell, alignment, targetWidth, useTabs, padding);
  });

  return `|${formattedCells.join('|')}|`;
}

type AlignmentIndicator = {
  left: (width: number) => string;
  right: (width: number) => string;
  center: (width: number) => string;
  none: (width: number) => string;
};

const alignmentIndicators: AlignmentIndicator = {
  left: (width: number) => `:${'-'.repeat(width - 1)}`,
  right: (width: number) => `${'-'.repeat(width - 1)}:`,
  center: (width: number) => `:${'-'.repeat(width - 2)}:`,
  none: (width: number) => '-'.repeat(width),
};

function getAlignmentIndicator(
  alignment: 'left' | 'right' | 'center' | 'none',
  width: number
): string {
  return alignmentIndicators[alignment](width);
}

export function formatAlignmentRow(
  columnCount: number,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths?: readonly number[],
  useTabs = false,
  hasPadding = true
): string {
  const adjustedAlignments = getAdjustedAlignments(columnAlignments, columnCount);
  const padding = hasPadding ? ' ' : '';

  const formattedColumns = Array.from({length: columnCount}, (_, i) => {
    const alignment = adjustedAlignments[i] ?? 'left';
    const targetWidth = columnWidths ? columnWidths[i] : 3;
    const alignIndicator = getAlignmentIndicator(alignment, targetWidth);
    return `${useTabs ? '\t' : padding}${alignIndicator}${useTabs ? '\t' : padding}`;
  });

  return `|${formattedColumns.join('|')}|`;
}

function calculateMaxColumnCount(inputData: InputData): number {
  const headerColumnCount = inputData.inputDataHeader.length;
  const bodyColumnCounts = inputData.inputDataBody.map(
    (currentRow: TableRow) => currentRow.length
  );
  return Math.max(headerColumnCount, ...bodyColumnCounts);
}

function getColumnWidths(
  inputData: InputData,
  maxColumnCount: number,
  canAdjustColumnWidths: boolean
): number[] | undefined {
  return canAdjustColumnWidths
    ? calculateColumnWidths(
        [inputData.inputDataHeader, ...inputData.inputDataBody],
        maxColumnCount
      )
    : undefined;
}

function formatHeaderAndAlignment(
  inputData: InputData,
  maxColumnCount: number,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths: number[] | undefined,
  useTabs: boolean,
  replaceNewlines: boolean,
  hasPadding: boolean
): string {
  const headerRow = formatMarkdownRow(
    maxColumnCount,
    inputData.inputDataHeader,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines,
    hasPadding
  );

  const alignmentRow = formatAlignmentRow(
    maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs,
    hasPadding
  );

  return `${headerRow}\n${alignmentRow}`;
}

function formatBodyRows(
  inputData: InputData,
  maxColumnCount: number,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths: number[] | undefined,
  useTabs: boolean,
  replaceNewlines: boolean,
  hasPadding: boolean
): string {
  return inputData.inputDataBody
    .map((currentRow: TableRow) =>
      formatMarkdownRow(
        maxColumnCount,
        currentRow,
        columnAlignments,
        columnWidths,
        useTabs,
        replaceNewlines,
        hasPadding
      )
    )
    .join('\n');
}

function formatTableRows(
  inputData: InputData,
  maxColumnCount: number,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths: number[] | undefined,
  useTabs: boolean,
  replaceNewlines: boolean,
  hasPadding: boolean
): string {
  const headerAndAlignment = formatHeaderAndAlignment(
    inputData,
    maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines,
    hasPadding
  );

  const bodyRows = formatBodyRows(
    inputData,
    maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines,
    hasPadding
  );

  return `${headerAndAlignment}\n${bodyRows}`;
}

export function generateMarkdownTableString(
  inputData: InputData,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  canAdjustColumnWidths = true,
  useTabs = false,
  replaceNewlines = false,
  hasPadding = true
): string {
  const maxColumnCount = calculateMaxColumnCount(inputData);
  const columnWidths = getColumnWidths(inputData, maxColumnCount, canAdjustColumnWidths);

  return formatTableRows(
    inputData,
    maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines,
    hasPadding
  ).trimEnd();
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
