"use strict";
// src/utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMarkdownTableString = exports.formatAlignmentRow = exports.formatMarkdownRow = exports.calculateColumnWidths = void 0;
/**
 * Calculates the maximum width for each column based on the content.
 * @param allRows - All rows (header and body) of the table.
 * @param maxColumnCount - The maximum number of columns in the table.
 * @returns An array of maximum widths for each column.
 */
function calculateColumnWidths(allRows, maxColumnCount) {
    const widths = new Array(maxColumnCount).fill(3); // Minimum width of 3 for each column.
    allRows.forEach((row) => {
        var _a;
        // Explicitly type 'row'
        for (let i = 0; i < maxColumnCount; i++) {
            const cell = (_a = row[i]) !== null && _a !== void 0 ? _a : '';
            widths[i] = Math.max(widths[i], cell.length);
        }
    });
    return widths;
}
exports.calculateColumnWidths = calculateColumnWidths;
/**
 * Formats a single row into a Markdown-formatted string.
 * @param columnCount - The number of columns in the table.
 * @param row - The data of the current row.
 * @param columnAlignments - Alignment settings for each column.
 * @param columnWidths - Widths of each column.
 * @returns The Markdown string for the row.
 */
function formatMarkdownRow(columnCount, row, columnAlignments, columnWidths) {
    var _a, _b;
    const defaultAlignment = 'left';
    const adjustedAlignments = columnAlignments.length < columnCount
        ? [
            ...columnAlignments,
            ...Array(columnCount - columnAlignments.length).fill(defaultAlignment),
        ]
        : columnAlignments;
    let markdownRow = '|';
    for (let i = 0; i < columnCount; i++) {
        const cell = (_a = row[i]) !== null && _a !== void 0 ? _a : '';
        const alignment = (_b = adjustedAlignments[i]) !== null && _b !== void 0 ? _b : defaultAlignment;
        const targetWidth = columnWidths ? columnWidths[i] : cell.length;
        if (alignment === 'right') {
            markdownRow += ` ${cell.padStart(targetWidth)} |`;
        }
        else if (alignment === 'center') {
            const totalPadding = targetWidth - cell.length;
            const paddingLeft = Math.floor(totalPadding / 2);
            const paddingRight = totalPadding - paddingLeft;
            markdownRow += ` ${' '.repeat(paddingLeft)}${cell}${' '.repeat(paddingRight)} |`;
        }
        else {
            // Left alignment or default
            markdownRow += ` ${cell.padEnd(targetWidth)} |`;
        }
    }
    return markdownRow;
}
exports.formatMarkdownRow = formatMarkdownRow;
/**
 * Generates the alignment row for the Markdown table syntax.
 * @param columnCount - The number of columns in the table.
 * @param columnAlignments - Alignment settings for each column.
 * @param columnWidths - Widths of each column.
 * @returns The Markdown string for the alignment row.
 */
function formatAlignmentRow(columnCount, columnAlignments, columnWidths) {
    var _a;
    const defaultAlignment = 'left';
    const adjustedAlignments = columnAlignments.length < columnCount
        ? [
            ...columnAlignments,
            ...Array(columnCount - columnAlignments.length).fill(defaultAlignment),
        ]
        : columnAlignments;
    let alignmentRow = '|';
    for (let i = 0; i < columnCount; i++) {
        const alignment = (_a = adjustedAlignments[i]) !== null && _a !== void 0 ? _a : defaultAlignment;
        const targetWidth = columnWidths ? columnWidths[i] : 3;
        let alignIndicator = '';
        switch (alignment) {
            case 'left':
                alignIndicator = `:${'-'.repeat(targetWidth - 1)}`;
                break;
            case 'center':
                alignIndicator = `:${'-'.repeat(targetWidth - 2)}:`;
                break;
            case 'right':
                alignIndicator = `${'-'.repeat(targetWidth - 1)}:`;
                break;
            default:
                alignIndicator = `${'-'.repeat(targetWidth)}`;
                break;
        }
        alignmentRow += ` ${alignIndicator} |`;
    }
    return alignmentRow;
}
exports.formatAlignmentRow = formatAlignmentRow;
/**
 * Generates a complete Markdown table string from the provided data.
 * @param tableData - The table data including headers and rows.
 * @param columnAlignments - Alignment settings for each column.
 * @param adjustColumnWidths - Flag to adjust column widths based on content.
 * @returns The complete Markdown table string.
 */
function generateMarkdownTableString(tableData, columnAlignments, adjustColumnWidths = true) {
    const headerColumnCount = tableData.header.length;
    const bodyColumnCounts = tableData.rows.map((row) => row.length);
    const maxColumnCount = Math.max(headerColumnCount, ...bodyColumnCounts);
    const columnWidths = adjustColumnWidths
        ? calculateColumnWidths([tableData.header, ...tableData.rows], maxColumnCount)
        : undefined;
    const markdownHeaderRow = formatMarkdownRow(maxColumnCount, tableData.header, columnAlignments, columnWidths);
    const markdownAlignmentRow = formatAlignmentRow(maxColumnCount, columnAlignments, columnWidths);
    const markdownBodyRows = tableData.rows
        .map((row) => formatMarkdownRow(maxColumnCount, row, columnAlignments, columnWidths))
        .join('\n');
    return `${markdownHeaderRow}\n${markdownAlignmentRow}\n${markdownBodyRows}`.trimEnd();
}
exports.generateMarkdownTableString = generateMarkdownTableString;
//# sourceMappingURL=utils.js.map