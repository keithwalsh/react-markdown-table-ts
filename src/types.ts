// src/types.ts

/**
 * Represents a single row in a table, consisting of cells.
 */
export type TableRow = readonly string[];

/**
 * Represents the structure of a Markdown table.
 */
export interface MarkdownTableData {
  /**
   * The header row of the table.
   */
  header: string[];
  /**
   * The body rows of the table.
   */
  rows: readonly string[][];
}

/**
 * Props for the MarkdownTable component.
 */
export interface MarkdownTableProps {
  /**
   * The entire table data as a two-dimensional array.
   * If `hasHeader` is true, the first row is treated as the header.
   * @default null
   */
  data?: string[][] | null;

  /**
   * Indicates whether the first row of `data` is a header.
   * @default true
   */
  hasHeader?: boolean;

  /**
   * Optional array specifying the alignment for each column.
   * Acceptable values are 'left', 'center', 'right', or 'none'.
   */
  columnAlignments?: readonly ('left' | 'center' | 'right' | 'none')[];

  /**
   * Optional flag to provide a compact version of the table with minimal column widths.
   * When `true`, column widths are not adjusted based on content.
   * @default false
   */
  isCompact?: boolean;

  /**
   * Optional flag to add tabs between columns in the Markdown table.
   * @default false
   */
  hasTabs?: boolean;

  /**
   * Optional CSS class for styling the rendered Markdown table.
   */
  className?: string;

  /**
   * Optional flag to replace newlines with <br> tags in table cells.
   * @default false
   */
  canReplaceNewlines?: boolean;

  /**
   * Optional callback function to receive the generated Markdown table string.
   */
  onTableCreate?: (markdownString: string) => void;
}
