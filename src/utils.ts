/**
 * @fileoverview Utility functions and classes for generating formatted markdown
 * table strings with alignment, padding, and column width adjustments.
 */

import type { InputData, Alignment, TableConfig } from './types.js';

type TableRow = readonly string[];

/** Header and body rows before their cells are converted to strings */
interface RawTableData {
  inputDataHeader: readonly unknown[];
  inputDataBody: readonly (readonly unknown[])[];
}

// No lookbehind: Safari only supports it from 16.4, and it would throw on import before that
const PIPE_PATTERN = /(\\*)\|/g;
const TRAILING_BACKSLASHES_PATTERN = /\\+$/;
const LINE_BREAK_PATTERN = /\r\n|\r|\n/g;
const TAB_PATTERN = /\t/g;
const PRINTABLE_ASCII_PATTERN = /^[\x20-\x7e]*$/;

/**
 * Characters that occupy two columns in a monospace font: CJK ideographs,
 * kana, Hangul, fullwidth forms and emoji. A trailing U+FE0F also forces
 * emoji presentation.
 */
const WIDE_CHAR_PATTERN =
  /[\u1100-\u115F\u2E80-\u303E\u3041-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uA000-\uA4CF\uA960-\uA97F\uAC00-\uD7A3\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6\u{20000}-\u{3FFFD}\p{Emoji_Presentation}]|\uFE0F/u;

const WIDE_CHARS_PATTERN = new RegExp(WIDE_CHAR_PATTERN.source, 'gu');

/**
 * Characters that can join a neighbour into one grapheme cluster: combining
 * marks, joiners and other format characters, emoji modifiers, regional
 * indicators, Hangul jamo, and the few letters that attach to the letter
 * before or after them.
 */
const CLUSTER_JOINING_PATTERN =
  /[\p{M}\p{Grapheme_Extend}\p{Cf}\p{Emoji_Modifier}\p{Regional_Indicator}\u1100-\u11FF\uA960-\uA97F\uD7B0-\uD7FF\u0D4E\u0E33\u0EB3\u{111C2}\u{111C3}\u{1193F}\u{11941}\u{11A3A}\u{11A84}-\u{11A89}\u{11D46}\u{11F02}]/u;

/** Format characters, such as U+200B ZERO WIDTH SPACE, that form a cluster on their own and take no space */
const ZERO_WIDTH_CLUSTER_PATTERN = /^\p{Cf}+$/u;

const graphemeSegmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter() : undefined;

function getClusterWidth(cluster: string): number {
  if (ZERO_WIDTH_CLUSTER_PATTERN.test(cluster)) {
    return 0;
  }
  return WIDE_CHAR_PATTERN.test(cluster) ? 2 : 1;
}

/**
 * Returns the number of monospace columns the text occupies, counting each
 * grapheme cluster as one column, two if it is a wide character, or none if
 * it is a zero-width format character.
 */
function getDisplayWidth(text: string): number {
  if (PRINTABLE_ASCII_PATTERN.test(text)) {
    return text.length;
  }
  if (!CLUSTER_JOINING_PATTERN.test(text)) {
    // Every code point is its own cluster, so skip the much slower segmenter
    return Array.from(text).length + (text.match(WIDE_CHARS_PATTERN)?.length ?? 0);
  }
  const clusters = graphemeSegmenter
    ? Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment)
    : Array.from(text);
  return clusters.reduce((width, cluster) => width + getClusterWidth(cluster), 0);
}

const isOdd = (backslashes: string) => backslashes.length % 2 === 1;

/**
 * Converts a cell to a single-line string that cannot break the table: pipes
 * are escaped unless an odd number of backslashes already escapes them, a
 * trailing unescaped backslash is doubled so it cannot escape the closing pipe,
 * tabs become spaces, and line breaks become `<br>` tags or spaces.
 */
function normaliseCell(cell: unknown, replaceNewlines: boolean): string {
  let text = cell == null ? '' : String(cell);
  // Most cells have no pipe or trailing backslash, so skip those regexes to keep large tables fast
  if (text.includes('|')) {
    text = text.replace(PIPE_PATTERN, (pipe, backslashes: string) => (isOdd(backslashes) ? pipe : `${backslashes}\\|`));
  }
  if (text.endsWith('\\')) {
    text = text.replace(TRAILING_BACKSLASHES_PATTERN, backslashes => (isOdd(backslashes) ? `${backslashes}\\` : backslashes));
  }
  if (text.includes('\t')) {
    // A tab's width depends on the column it starts in, so it can't be padded for; HTML shows it as a space anyway
    text = text.replace(TAB_PATTERN, ' ');
  }
  return text.replace(LINE_BREAK_PATTERN, replaceNewlines ? '<br>' : ' ');
}

function normaliseInputData(inputData: RawTableData, replaceNewlines: boolean): InputData {
  const normaliseRow = (row: readonly unknown[]) => Array.from(row, cell => normaliseCell(cell, replaceNewlines));
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

  formatCell(content: string, alignment: Alignment, totalPadding: number): string {
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

  formatRow(row: TableRow, cellWidths?: readonly number[]): string {
    const formattedCells = Array.from({ length: this.config.columnCount }, (_, i) => {
      const cell = row[i] ?? '';
      const alignment = this.adjustedAlignments[i];
      // Without column widths the table is compact, so cells get no extra padding
      const totalPadding = this.config.columnWidths
        ? Math.max(0, this.config.columnWidths[i] - (cellWidths?.[i] ?? 0))
        : 0;

      return this.cellFormatter.formatCell(cell, alignment, totalPadding);
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
  cellWidths: readonly (readonly number[])[],
  maxColumnCount: number
): number[] {
  const widths: number[] = new Array(maxColumnCount).fill(3);

  cellWidths.forEach(rowWidths => {
    rowWidths.forEach((width, i) => {
      widths[i] = Math.max(widths[i], width);
    });
  });

  return widths;
}

function calculateMaxColumnCount(inputData: InputData): number {
  // reduce() rather than Math.max(...lengths), which overflows the call stack for very long tables
  return inputData.inputDataBody.reduce(
    (columnCount, row) => Math.max(columnCount, row.length),
    inputData.inputDataHeader.length
  );
}

export function generateMarkdownTableString(
  inputData: RawTableData,
  columnAlignments: readonly Alignment[],
  canAdjustColumnWidths = true,
  useTabs = false,
  replaceNewlines = false,
  hasPadding = true
): string {
  const tableData = normaliseInputData(inputData, replaceNewlines);
  const maxColumnCount = calculateMaxColumnCount(tableData);
  // Measure each cell once, and only when columns are padded to a shared width
  const cellWidths = canAdjustColumnWidths
    ? [tableData.inputDataHeader, ...tableData.inputDataBody].map(row => row.map(cell => getDisplayWidth(cell)))
    : undefined;
  const columnWidths = cellWidths && calculateColumnWidths(cellWidths, maxColumnCount);

  const config: TableConfig = {
    columnCount: maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines,
    hasPadding
  };

  const tableFormatter = new TableFormatter(config);

  const headerRow = tableFormatter.formatRow(tableData.inputDataHeader, cellWidths?.[0]);
  const alignmentRow = tableFormatter.formatAlignmentRow();
  const bodyRows = tableData.inputDataBody
    .map((row, i) => tableFormatter.formatRow(row, cellWidths?.[i + 1]))
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
