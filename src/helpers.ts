// src/helpers.ts

/**
 * @fileoverview Contains helper functions for formatting Markdown table syntax and calculating column widths.
 */

import { TableRow } from "./types";

/**
 * Calculates the maximum width for each column based on the content.
 * @param params - The parameters for column width calculation.
 * @returns An array of maximum widths for each column.
 */
export function calculateColumnWidths({ allRows, maxColumnCount }: { allRows: readonly TableRow[]; maxColumnCount: number }): number[] {
    return allRows.reduce((widths, row) => {
        for (let i = 0; i < maxColumnCount; i++) {
            const cell = row[i] ?? "";
            widths[i] = Math.max(widths[i] ?? 3, cell.length);
        }
        return widths;
    }, new Array<number>(maxColumnCount).fill(3));
}

/**
 * Formats a single row into a Markdown-formatted string.
 * @param params - The parameters for row formatting.
 * @returns The Markdown string for the row.
 */
export function formatMarkdownRow({
    columnCount,
    row,
    columnAlignments = [],
    columnWidths,
}: {
    columnCount: number;
    row: TableRow;
    columnAlignments?: readonly ("left" | "right" | "center" | "none")[];
    columnWidths?: readonly number[];
}): string {
    const defaultAlignment: "left" | "right" | "center" | "none" = "left";
    const adjustedAlignments =
        columnAlignments.length < columnCount
            ? [...columnAlignments, ...Array(columnCount - columnAlignments.length).fill(defaultAlignment)]
            : columnAlignments;

    let markdownRow = "|";
    for (let i = 0; i < columnCount; i++) {
        const cell = row[i] ?? "";
        const alignment = adjustedAlignments[i] ?? defaultAlignment;
        const targetWidth = columnWidths ? columnWidths[i] : cell.length;

        if (alignment === "right") {
            markdownRow += ` ${cell.padStart(targetWidth)} |`;
        } else if (alignment === "center") {
            const totalPadding = targetWidth - cell.length;
            const paddingLeft = Math.floor(totalPadding / 2);
            const paddingRight = totalPadding - paddingLeft;
            markdownRow += ` ${" ".repeat(paddingLeft)}${cell}${" ".repeat(paddingRight)} |`;
        } else {
            // Left alignment or default
            markdownRow += ` ${cell.padEnd(targetWidth)} |`;
        }
    }

    return markdownRow;
}

/**
 * Generates the alignment row for the Markdown table syntax.
 * @param params - The parameters for alignment row generation.
 * @returns The Markdown string for the alignment row.
 */
export function formatAlignmentRow({
    columnCount,
    columnAlignments = [],
    columnWidths,
}: {
    columnCount: number;
    columnAlignments?: readonly ("left" | "right" | "center" | "none")[];
    columnWidths?: readonly number[];
}): string {
    const defaultAlignment: "left" | "right" | "center" | "none" = "left";
    const adjustedAlignments =
        columnAlignments.length < columnCount
            ? [...columnAlignments, ...Array(columnCount - columnAlignments.length).fill(defaultAlignment)]
            : columnAlignments;

    let alignmentRow = "|";
    for (let i = 0; i < columnCount; i++) {
        const alignment = adjustedAlignments[i] ?? defaultAlignment;
        const targetWidth = columnWidths ? columnWidths[i] : 3;
        let alignIndicator = "";

        switch (alignment) {
            case "left":
                alignIndicator = `:${"-".repeat(targetWidth - 1)}`;
                break;
            case "center":
                alignIndicator = `:${"-".repeat(targetWidth - 2)}:`;
                break;
            case "right":
                alignIndicator = `${"-".repeat(targetWidth - 1)}:`;
                break;
            default:
                alignIndicator = `${"-".repeat(targetWidth)}`;
                break;
        }

        alignmentRow += ` ${alignIndicator} |`;
    }

    return alignmentRow;
}
