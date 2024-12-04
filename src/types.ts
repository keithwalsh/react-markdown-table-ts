// src/types.ts

/**
 * Represents a single row in a table, consisting of cells.
 */
export type TableRow = readonly string[];

/**
 * Represents the structure of a Markdown table.
 */
export interface InputData {
  inputDataHeader: string[]; // The header row of the table.
  inputDataBody: readonly string[][]; // The body rows of the table.
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
  inputData?: string[][] | null;

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
   * Optional flag to add tabs as additional padding between column pipes.
   * When true, adds a tab character after each | and before the content.
   * @default false
   */
  hasTabs?: boolean;
  /**
   * Indicates whether the first row of `data` is a header.
   * @default true
   */
  hasHeader?: boolean;

  /**
   * Optional flag to replace newlines with <br> tags in table cells.
   * @default false
   */
  convertLineBreaks?: boolean;

  /**
   * Optional theme for the Markdown table.
   * Acceptable values are 'light' or 'dark'.
   * @default 'light'
   */
  theme?: 'light' | 'dark'

  /**
   * Optional CSS class for styling the rendered Markdown table.
   * This class will be applied to the <pre> element containing the table.
   * It will be combined with built-in classes for syntax highlighting.
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
  preStyle?: React.CSSProperties;

  /**
   * Optional callback function to receive the generated Markdown table string.
   */
  onGenerate?: (markdownTableString: string) => void;

  /**
   * Optional top padding for the pre element.
   * @default 0
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

}

/**
 * Represents the alignment options for table columns.
 */
export type Alignment = 'left' | 'right' | 'center' | 'none' | 'justify';

/**
 * Configuration for table formatting.
 */
export interface TableConfig {
  columnCount: number;
  columnAlignments: readonly Alignment[];
  columnWidths?: readonly number[];
  useTabs: boolean;
  replaceNewlines: boolean;
  hasPadding: boolean;
}

/**
 * Functions to generate alignment indicators for table columns.
 */
export interface AlignmentIndicator {
  left: (width: number) => string;
  right: (width: number) => string;
  center: (width: number) => string;
  none: (width: number) => string;
  justify: (width: number) => string;
}
