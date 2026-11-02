/**
 * @fileoverview The MarkdownTable component's props.
 */

import type { CSSProperties, HTMLAttributes } from 'react';
import type { CellValue, MarkdownTableOptions } from './types.js';
import type { MarkdownTableError } from './validation.js';

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
   * A Markdown table to show as it is, such as the `markdown` that
   * `useMarkdownTable` returns. When it's set, `inputData` and the formatting
   * options are ignored, so the table isn't generated twice.
   * @default undefined
   * @example
   * const { markdown } = useMarkdownTable(data, options);
   * <MarkdownTable markdown={markdown} />
   */
  markdown?: string;

  /**
   * Optional theme for the Markdown table.
   * Acceptable values are 'light', 'dark', 'auto', which follows the
   * reader's `prefers-color-scheme` setting, or 'inherit', which takes the
   * text colour from the page and has no background, so the table follows
   * the page's own light and dark modes.
   * @default 'light'
   */
  theme?: 'light' | 'dark' | 'auto' | 'inherit';

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
   * When `markdown` is set, the string is `markdown`.
   * @default undefined
   * @example
   * <MarkdownTable
   *   inputData={data}
   *   onGenerate={(markdown, error) => setMarkdown(error ? '' : markdown)}
   * />
   */
  onGenerate?: (markdownTableString: string, error: MarkdownTableError | null) => void;

  /**
   * Optional space in pixels above the first line of the table, in place of
   * the top of the `--rmt-padding` CSS variable.
   * @default undefined
   * @deprecated Set the `--rmt-padding` CSS variable instead, such as
   * `--rmt-padding: 2em 1em 1em` for more space above the table.
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
