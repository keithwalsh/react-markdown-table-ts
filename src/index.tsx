// src/index.tsx

/**
 * @fileoverview Provides functions to generate Markdown table syntax and a React component for displaying it.
 */

import { CreateMarkdownTableOptions, MarkdownTableProps } from "./types";
import { MarkdownTableError } from "./errors";
import { validateCreateMarkdownTableOptions } from "./validation";
import { calculateColumnWidths, formatMarkdownRow, formatAlignmentRow } from "./helpers";

/**
 * Generates a Markdown-formatted table as a string.
 * @param options - The parameters for table generation.
 * @returns The Markdown string for the entire table.
 * @throws {MarkdownTableError} if input validation fails.
 */
export function generateMarkdownTable({ tableData, columnAlignments, adjustColumnWidths = true }: CreateMarkdownTableOptions): string {
    validateCreateMarkdownTableOptions({
        tableData,
        columnAlignments,
        adjustColumnWidths,
    });

    const headerColumnCount = tableData.header.length;
    const bodyColumnCounts = tableData.rows.map((row) => row.length);
    const maxColumnCount = Math.max(headerColumnCount, ...bodyColumnCounts);

    const columnWidths = adjustColumnWidths
        ? calculateColumnWidths({
              allRows: [tableData.header, ...tableData.rows],
              maxColumnCount,
          })
        : undefined;

    const markdownHeaderRow = formatMarkdownRow({
        columnCount: maxColumnCount,
        row: tableData.header,
        columnAlignments,
        columnWidths,
    });

    const markdownAlignmentRow = formatAlignmentRow({
        columnCount: maxColumnCount,
        columnAlignments,
        columnWidths,
    });

    let markdownBodyRows = "";
    tableData.rows.forEach((row) => {
        const markdownRow = formatMarkdownRow({
            columnCount: maxColumnCount,
            row,
            columnAlignments,
            columnWidths,
        });
        markdownBodyRows += `${markdownRow}\n`;
    });

    return `${markdownHeaderRow}\n${markdownAlignmentRow}\n${markdownBodyRows}`.trimEnd();
}

/**
 * React component that generates and displays a Markdown table syntax.
 * @param props - The input parameters for table generation.
 * @returns A <pre> element containing the Markdown table syntax or an error message.
 */
export function MarkdownTable(props: MarkdownTableProps): JSX.Element {
    const { className } = props;

    // Generate the Markdown table string
    let markdownTable: string;
    try {
        markdownTable = generateMarkdownTable(props);
    } catch (error) {
        if (error instanceof MarkdownTableError) {
            return <div className={className}>Error: {error.message}</div>;
        } else {
            throw error;
        }
    }

    return <pre className={className}>{markdownTable}</pre>;
}
