import { TableRow, MarkdownTableData } from './types';
/**
 * Calculates the maximum width for each column based on the content.
 * @param allRows - All rows (header and body) of the table.
 * @param maxColumnCount - The maximum number of columns in the table.
 * @returns An array of maximum widths for each column.
 */
export declare function calculateColumnWidths(allRows: readonly TableRow[], maxColumnCount: number): number[];
/**
 * Formats a single row into a Markdown-formatted string.
 * @param columnCount - The number of columns in the table.
 * @param row - The data of the current row.
 * @param columnAlignments - Alignment settings for each column.
 * @param columnWidths - Widths of each column.
 * @returns The Markdown string for the row.
 */
export declare function formatMarkdownRow(columnCount: number, row: TableRow, columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[], columnWidths?: readonly number[]): string;
/**
 * Generates the alignment row for the Markdown table syntax.
 * @param columnCount - The number of columns in the table.
 * @param columnAlignments - Alignment settings for each column.
 * @param columnWidths - Widths of each column.
 * @returns The Markdown string for the alignment row.
 */
export declare function formatAlignmentRow(columnCount: number, columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[], columnWidths?: readonly number[]): string;
/**
 * Generates a complete Markdown table string from the provided data.
 * @param tableData - The table data including headers and rows.
 * @param columnAlignments - Alignment settings for each column.
 * @param adjustColumnWidths - Flag to adjust column widths based on content.
 * @returns The complete Markdown table string.
 */
export declare function generateMarkdownTableString(tableData: MarkdownTableData, columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[], adjustColumnWidths?: boolean): string;
