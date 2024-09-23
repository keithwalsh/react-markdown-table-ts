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
     */
    data: string[][];

    /**
     * Indicates whether the first row of `data` is a header.
     * @default true
     */
    hasHeader?: boolean;

    /**
     * Optional array specifying the alignment for each column.
     * Acceptable values are 'left', 'center', 'right', or 'none'.
     */
    columnAlignments?: readonly ("left" | "center" | "right" | "none")[];

    /**
     * Optional flag to automatically adjust column widths based on content.
     * @default true
     */
    adjustColumnWidths?: boolean;

    /**
     * Optional CSS class for styling the rendered Markdown table.
     */
    className?: string;
}
