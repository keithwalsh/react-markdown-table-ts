// src/types.ts

/**
 * @fileoverview Defines types and interfaces for generating Markdown table syntax and displaying it in React components.
 */

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
    readonly header: TableRow;
    /**
     * The body rows of the table.
     */
    readonly rows: readonly TableRow[];
}

/**
 * Input parameters for creating a Markdown table syntax.
 */
export interface CreateMarkdownTableOptions {
    /**
     * The table data including headers and body rows.
     */
    readonly tableData: MarkdownTableData;
    /**
     * Optional flag to adjust column widths based on content.
     * @default true
     */
    readonly adjustColumnWidths?: boolean;
    /**
     * Optional alignment settings for each column.
     */
    readonly columnAlignments?: readonly ("left" | "right" | "center" | "none")[];
}

/**
 * Props for the MarkdownTable component.
 */
export interface MarkdownTableProps extends CreateMarkdownTableOptions {
    className?: string;
}
