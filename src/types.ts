/**
 * @fileoverview Types for the table data and the formatting options. They
 * don't use React, so the react-markdown-table-ts/core entry can export them.
 */

/**
 * A table cell. Values other than strings are converted with `String()`,
 * and `null` and `undefined` become empty cells.
 */
export type CellValue = string | number | boolean | null | undefined;

export interface InputData {
  inputDataHeader: string[];
  inputDataBody: readonly string[][];
}

/**
 * Options that control the generated Markdown, shared by the `MarkdownTable`
 * props and `generateMarkdownTable`.
 */
export interface MarkdownTableOptions {
  /**
   * Optional array specifying the alignment for each column.
   * Acceptable values are 'left', 'center', 'right', or 'none'.
   * @default []
   */
  columnAlignments?: readonly Alignment[];

  /**
   * Disables column width alignment to provide a more compact markdown table string.
   * @default false
   */
  isCompact?: boolean;

  /**
   * Optional flag to add a single space around cell content in the markdown table.
   * When true, one space is added before and after the content in each cell.
   * @default true
   */
  hasPadding?: boolean;

  /**
   * Optional flag to put a tab character on each side of the cell content.
   * The tabs replace the space that `hasPadding` adds.
   * @default false
   */
  hasTabs?: boolean;

  /**
   * Indicates whether the first row of `inputData` is a header.
   * @default true
   */
  hasHeader?: boolean;

  /**
   * Optional flag to replace newlines with <br> tags in table cells.
   * When false, newlines are replaced with spaces so each row stays on one line.
   * @default false
   */
  convertLineBreaks?: boolean;
}

export type Alignment = 'left' | 'right' | 'center' | 'none';
