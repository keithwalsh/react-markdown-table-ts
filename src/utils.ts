/**
 * @fileoverview Utility functions and classes for generating formatted markdown
 * table strings with alignment, padding, and column width adjustments.
 */

import type { InputData, Alignment, TableConfig } from './types.js';

type TableRow = readonly string[];

const UNESCAPED_PIPE_PATTERN = /(?<!\\)\|/g;
const LINE_BREAK_PATTERN = /\r\n|\r|\n/g;
const PRINTABLE_ASCII_PATTERN = /^[\x20-\x7e]*$/;

/**
 * Characters that occupy two columns in a monospace font: CJK ideographs,
 * kana, Hangul, fullwidth forms and emoji. A trailing U+FE0F also forces
 * emoji presentation.
 */
const WIDE_CHAR_PATTERN =
  /[\u1100-\u115F\u2E80-\u303E\u3041-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uA000-\uA4CF\uA960-\uA97F\uAC00-\uD7A3\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6\u{20000}-\u{3FFFD}\p{Emoji_Presentation}]|\uFE0F/u;

const graphemeSegmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter() : undefined;

/**
 * Returns the number of monospace columns the text occupies, counting each
 * grapheme cluster as one column, or two if it is a wide character.
 */
function getDisplayWidth(text: string): number {
  if (PRINTABLE_ASCII_PATTERN.test(text)) {
    return text.length;
  }
  const clusters = graphemeSegmenter
    ? Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment)
    : Array.from(text);
  return clusters.reduce((width, cluster) => width + (WIDE_CHAR_PATTERN.test(cluster) ? 2 : 1), 0);
}

/**
 * Converts a cell to a single-line string that cannot break the table: pipes
 * are escaped and line breaks become `<br>` tags or spaces.
 */
function normaliseCell(cell: unknown, replaceNewlines: boolean): string {
  const text = cell == null ? '' : String(cell);
  return text
    .replace(UNESCAPED_PIPE_PATTERN, '\\|')
    .replace(LINE_BREAK_PATTERN, replaceNewlines ? '<br>' : ' ');
}

function normaliseInputData(inputData: InputData, replaceNewlines: boolean): InputData {
  const normaliseRow = (row: TableRow) => Array.from(row, cell => normaliseCell(cell, replaceNewlines));
  return {
    inputDataHeader: normaliseRow(inputData.inputDataHeader),
    inputDataBody: inputData.inputDataBody.map(normaliseRow),
  };
}

function calculatePadding(config: TableConfig): string {
  let padding: string;
  if (config.useTabs) {
    padding = '\t';
  } else if (config.hasPadding) {
    padding = ' ';
  } else {
    padding = '';
  }
  return padding;
}

class CellFormatter {
  private readonly padding: string;

  constructor(config: TableConfig) {
    this.padding = calculatePadding(config);
  }

  formatCell(content: string, alignment: Alignment, width: number): string {
    const totalPadding = Math.max(0, width - getDisplayWidth(content));

    switch (alignment) {
      case 'right':
        return `${this.padding}${' '.repeat(totalPadding)}${content}${this.padding}`;
      case 'center': {
        const paddingLeft = Math.floor(totalPadding / 2);
        const paddingRight = totalPadding - paddingLeft;
        return `${this.padding}${' '.repeat(paddingLeft)}${content}${' '.repeat(paddingRight)}${this.padding}`;
      }
      default: // left or none
        return `${this.padding}${content}${' '.repeat(totalPadding)}${this.padding}`;
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
      const cell = row[i] ?? '';
      const alignment = this.adjustedAlignments[i];
      const width = this.config.columnWidths ? this.config.columnWidths[i] : getDisplayWidth(cell);

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
      widths[i] = Math.max(widths[i], getDisplayWidth(cell));
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
  const tableData = normaliseInputData(inputData, replaceNewlines);
  const maxColumnCount = calculateMaxColumnCount(tableData);
  const columnWidths = getColumnWidths(tableData, maxColumnCount, canAdjustColumnWidths);

  const config: TableConfig = {
    columnCount: maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines,
    hasPadding
  };

  const tableFormatter = new TableFormatter(config);

  const headerRow = tableFormatter.formatRow(tableData.inputDataHeader);
  const alignmentRow = tableFormatter.formatAlignmentRow();
  const bodyRows = tableData.inputDataBody
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
