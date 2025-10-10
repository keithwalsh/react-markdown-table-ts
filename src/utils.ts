/**
 * @fileoverview Utility functions and classes for generating formatted markdown
 * table strings with alignment, padding, and column width adjustments.
 */

import type { InputData, Alignment, TableConfig } from './types';

type TableRow = readonly string[];

function calculatePadding(config: TableConfig): string {
  return config.useTabs ? '\t' : (config.hasPadding ? ' ' : '');
}

class CellFormatter {
  private readonly padding: string;

  constructor(config: TableConfig) {
    this.padding = calculatePadding(config);
  }

  formatCell(content: string, alignment: Alignment, width: number): string {
    const totalWidth = width;

    switch (alignment) {
      case 'right':
        return `${this.padding}${content.padStart(totalWidth)}${this.padding}`;
      case 'center': {
        const totalPadding = totalWidth - content.length;
        const paddingLeft = Math.floor(totalPadding / 2);
        const paddingRight = totalPadding - paddingLeft;
        return `${this.padding}${' '.repeat(paddingLeft)}${content}${' '.repeat(paddingRight)}${this.padding}`;
      }
      default: // left or none
        return `${this.padding}${content.padEnd(totalWidth)}${this.padding}`;
    }
  }
}

class AlignmentFormatter {
  private static readonly indicators = {
    left: (width: number) => `:${'-'.repeat(width - 1)}`,
    right: (width: number) => `${'-'.repeat(width - 1)}:`,
    center: (width: number) => `:${'-'.repeat(width - 2)}:`,
    none: (width: number) => '-'.repeat(width)
  };

  static formatIndicator(alignment: Alignment, width: number): string {
    return this.indicators[alignment](width);
  }
}

class TableFormatter {
  private readonly config: TableConfig;
  private readonly cellFormatter: CellFormatter;
  private readonly adjustedAlignments: Alignment[];

  constructor(config: TableConfig) {
    this.config = config;
    this.cellFormatter = new CellFormatter(config);
    this.adjustedAlignments = this.getAdjustedAlignments();
  }

  private getAdjustedAlignments(): Alignment[] {
    const defaultAlignment: Alignment = 'none';

    return this.config.columnAlignments.length < this.config.columnCount
      ? [
          ...Array.from(this.config.columnAlignments),
          ...Array(this.config.columnCount - this.config.columnAlignments.length).fill(defaultAlignment),
        ]
      : Array.from(this.config.columnAlignments);
  }

  formatRow(row: TableRow): string {
    const formattedCells = Array.from({ length: this.config.columnCount }, (_, i) => {
      let cell = row[i] ?? '';
      if (this.config.replaceNewlines) {
        cell = cell.replace(/\n/g, '<br>');
      }
      const alignment = this.adjustedAlignments[i];
      const width = this.config.columnWidths ? this.config.columnWidths[i] : cell.length;

      return this.cellFormatter.formatCell(cell, alignment, width);
    });

    return `|${formattedCells.join('|')}|`;
  }

  formatAlignmentRow(): string {
    const padding = calculatePadding(this.config);
    const formattedColumns = Array.from({ length: this.config.columnCount }, (_, i) => {
      const alignment = this.adjustedAlignments[i];
      const width = this.config.columnWidths ? this.config.columnWidths[i] : 3;
      const indicator = AlignmentFormatter.formatIndicator(alignment, width);
      return `${padding}${indicator}${padding}`;
    });

    return `|${formattedColumns.join('|')}|`;
  }
}

function calculateColumnWidths(
  tableRows: readonly TableRow[],
  maxColumnCount: number
): number[] {
  const widths: number[] = new Array(maxColumnCount).fill(3);

  tableRows.forEach((row: TableRow) => {
    for (let i = 0; i < maxColumnCount; i++) {
      const cell = row[i] ?? '';
      widths[i] = Math.max(widths[i], cell.length);
    }
  });

  return widths;
}

function calculateMaxColumnCount(inputData: InputData): number {
  const headerColumnCount = inputData.inputDataHeader.length;
  const bodyColumnCounts = inputData.inputDataBody.map(row => row.length);
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

export function generateMarkdownTableString(
  inputData: InputData,
  columnAlignments: readonly Alignment[],
  canAdjustColumnWidths = true,
  useTabs = false,
  replaceNewlines = false,
  hasPadding = true
): string {
  const maxColumnCount = calculateMaxColumnCount(inputData);
  const columnWidths = getColumnWidths(inputData, maxColumnCount, canAdjustColumnWidths);

  const config: TableConfig = {
    columnCount: maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines,
    hasPadding
  };

  const tableFormatter = new TableFormatter(config);

  const headerRow = tableFormatter.formatRow(inputData.inputDataHeader);
  const alignmentRow = tableFormatter.formatAlignmentRow();
  const bodyRows = inputData.inputDataBody
    .map(row => tableFormatter.formatRow(row))
    .join('\n');

  return `${headerRow}\n${alignmentRow}\n${bodyRows}`.trimEnd();
}

function getColumnName(index: number): string {
  let columnName = '';
  let currentIndex = index;
  while (currentIndex >= 0) {
    columnName = String.fromCharCode((currentIndex % 26) + 65) + columnName;
    currentIndex = Math.floor(currentIndex / 26) - 1;
  }
  return columnName;
}

export function generateAlphabetHeaders(columnCount: number): string[] {
  return Array.from({ length: columnCount }, (_, i) => getColumnName(i));
}
