/**
 * @fileoverview Contains helper functions for formatting Markdown table syntax and calculating column widths.
 */
import { TableRow } from './types';
/**
 * Calculates the maximum width for each column based on the content.
 * @param params - The parameters for column width calculation.
 * @returns An array of maximum widths for each column.
 */
export declare function calculateColumnWidths({ allRows, maxColumnCount, }: {
    allRows: readonly TableRow[];
    maxColumnCount: number;
}): number[];
/**
 * Formats a single row into a Markdown-formatted string.
 * @param params - The parameters for row formatting.
 * @returns The Markdown string for the row.
 */
export declare function formatMarkdownRow({ columnCount, row, columnAlignments, columnWidths, }: {
    columnCount: number;
    row: TableRow;
    columnAlignments?: readonly ('left' | 'right' | 'center' | 'none')[];
    columnWidths?: readonly number[];
}): string;
/**
 * Generates the alignment row for the Markdown table syntax.
 * @param params - The parameters for alignment row generation.
 * @returns The Markdown string for the alignment row.
 */
export declare function formatAlignmentRow({ columnCount, columnAlignments, columnWidths, }: {
    columnCount: number;
    columnAlignments?: readonly ('left' | 'right' | 'center' | 'none')[];
    columnWidths?: readonly number[];
}): string;
