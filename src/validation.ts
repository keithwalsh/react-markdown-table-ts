// src/validation.ts

/**
 * @fileoverview Provides validation functions for inputs used in Markdown table syntax generation.
 */

import { MarkdownTableData, CreateMarkdownTableOptions } from "./types";
import { MarkdownTableError } from "./errors";

/**
 * Validates the structure of the table data.
 * Throws an error if validation fails.
 * @param tableData - The table data to validate.
 * @throws {MarkdownTableError} if validation fails.
 */
export function validateTableData(tableData: MarkdownTableData): void {
    if (!tableData) {
        throw new MarkdownTableError("missing 'tableData' property");
    }

    if (!Array.isArray(tableData.header)) {
        throw new MarkdownTableError(
            `expected tableData.header to be Array<string>, got ${typeof tableData.header}. Actual value: ${JSON.stringify(tableData.header)}`
        );
    }

    if (tableData.header.length < 1) {
        throw new MarkdownTableError(`expected table to have at least 1 header, got ${tableData.header.length}`);
    }

    if (!Array.isArray(tableData.rows)) {
        throw new MarkdownTableError(
            `expected tableData.rows to be Array<TableRow>, got ${typeof tableData.rows}. Actual value: ${JSON.stringify(tableData.rows)}`
        );
    }

    const allRows = [tableData.header, ...tableData.rows];

    allRows.forEach((row, rowIndex) => {
        if (!Array.isArray(row)) {
            throw new MarkdownTableError(`expected row ${rowIndex} to be Array<string>, got ${typeof row}. Actual value: ${JSON.stringify(row)}`);
        }

        row.forEach((cell, cellIndex) => {
            if (typeof cell !== "string") {
                throw new MarkdownTableError(
                    `expected cell ${cellIndex} on row ${rowIndex} to be string, got ${typeof cell}. Actual value: ${JSON.stringify(cell)}`
                );
            }
        });
    });
}

/**
 * Validates the column alignments array.
 * Throws an error if validation fails.
 * @param columnAlignments - The alignment settings to validate.
 * @throws {MarkdownTableError} if validation fails.
 */
export function validateColumnAlignments(columnAlignments?: readonly ("left" | "right" | "center" | "none")[]): void {
    if (!columnAlignments) {
        return;
    }

    if (!Array.isArray(columnAlignments)) {
        throw new MarkdownTableError(
            `expected columnAlignments to be undefined or Array<'left' | 'right' | 'center' | 'none'>, got ${typeof columnAlignments}. Actual value: ${JSON.stringify(
                columnAlignments
            )}`
        );
    }

    columnAlignments.forEach((alignment, index) => {
        if (!["left", "right", "center", "none"].includes(alignment)) {
            throw new MarkdownTableError(`invalid alignment for column ${index}. Actual value: ${JSON.stringify(alignment)}`);
        }
    });
}

/**
 * Validates the input parameters for generating the Markdown table syntax.
 * Throws an error if validation fails.
 * @param options - The input parameters to validate.
 * @throws {MarkdownTableError} if validation fails.
 */
export function validateCreateMarkdownTableOptions(options: CreateMarkdownTableOptions): void {
    const { tableData, columnAlignments, adjustColumnWidths } = options;

    if (!tableData) {
        throw new MarkdownTableError("missing input parameters");
    }

    validateTableData(tableData);
    validateColumnAlignments(columnAlignments);

    if (typeof adjustColumnWidths !== "undefined" && typeof adjustColumnWidths !== "boolean") {
        throw new MarkdownTableError(
            `'adjustColumnWidths' must be either undefined or boolean, got ${typeof adjustColumnWidths}. Actual value: ${JSON.stringify(adjustColumnWidths)}`
        );
    }
}
