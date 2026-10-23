/**
 * @fileoverview Type definitions for the MarkdownTable component including props,
 * alignment options, and table configuration.
 */

import type { CSSProperties, HTMLAttributes } from 'react';
import type { MarkdownTableError } from './validation.js';

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

/**
 * Attributes passed through to the pre element that holds the table, such as
 * `id`, `aria-label`, `data-*` attributes and event handlers. Its style is set
 * with `preStyle`.
 */
type PreAttributes = Omit<HTMLAttributes<HTMLPreElement>, 'children' | 'dangerouslySetInnerHTML' | 'nonce' | 'style'>;

export interface MarkdownTableProps extends MarkdownTableOptions, PreAttributes {
  /**
   * The entire table data as a two-dimensional array.
   * If `hasHeader` is true, the first row is treated as the header.
   * Readonly arrays, such as `as const` data, are accepted.
   * `null` and `undefined` render an empty table, for example while data loads.
   * @default null
   */
  inputData?: readonly (readonly CellValue[])[] | null;

  /**
   * Optional theme for the Markdown table.
   * Acceptable values are 'light', 'dark', or 'auto', which follows the
   * reader's `prefers-color-scheme` setting.
   * @default 'light'
   */
  theme?: 'light' | 'dark' | 'auto';

  /**
   * Optional CSS class for styling the rendered Markdown table.
   * This class will be applied to the <pre> element containing the table.
   * It will be combined with built-in classes for the code block display.
   * @default undefined
   * @example
   * <MarkdownTable
   *   inputData={data}
   *   className="custom-table-style"
   * />
   */
  className?: string;

  /**
   * Optional CSS properties to apply to the pre element containing the Markdown table.
   * Allows direct styling of the table container using React's style prop.
   * @default undefined
   * @example
   * <MarkdownTable
   *   inputData={data}
   *   preStyle={{
   *     maxHeight: '300px',
   *     overflow: 'auto',
   *     backgroundColor: '#f5f5f5'
   *   }}
   * />
   */
  preStyle?: CSSProperties;

  /**
   * Optional callback that receives the generated Markdown table string whenever it changes.
   * When `inputData` is invalid, the string is the displayed error message and `error` is set.
   * When `inputData` is `null` or `undefined`, the string is empty and `error` is `null`.
   * @default undefined
   * @example
   * <MarkdownTable
   *   inputData={data}
   *   onGenerate={(markdown, error) => setMarkdown(error ? '' : markdown)}
   * />
   */
  onGenerate?: (markdownTableString: string, error: MarkdownTableError | null) => void;

  /**
   * Optional top padding in pixels above the first line of the table.
   * @default 16
   */
  topPadding?: number;

  /**
   * Optional minimum width in pixels for the pre element containing the Markdown table.
   * @default undefined
   * @example
   * <MarkdownTable
   *   inputData={data}
   *   minWidth={300}
   * />
   */
  minWidth?: number;

  /**
   * Optional flag to show or hide line numbers in the code block.
   * When true, line numbers are displayed on the left side of the code block.
   * @default true
   * @example
   * <MarkdownTable
   *   inputData={data}
   *   showLineNumbers={false}
   * />
   */
  showLineNumbers?: boolean;

  /**
   * Optional nonce for the style tag that holds the component's CSS, for pages whose
   * Content-Security-Policy blocks inline styles. With React 19 server rendering, use the
   * same value as the style nonce in React's render options, or React leaves the CSS out.
   * @default undefined
   */
  nonce?: string;
}

export type Alignment = 'left' | 'right' | 'center' | 'none';

export interface TableConfig {
  columnCount: number;
  columnAlignments: readonly Alignment[];
  columnWidths?: readonly number[];
  useTabs: boolean;
  replaceNewlines: boolean;
  hasPadding: boolean;
}
