"use strict";
// src/helpers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAlignmentRow = exports.formatMarkdownRow = exports.calculateColumnWidths = void 0;
/**
 * Calculates the maximum width for each column based on the content.
 * @param params - The parameters for column width calculation.
 * @returns An array of maximum widths for each column.
 */
function calculateColumnWidths({ allRows, maxColumnCount, }) {
    return allRows.reduce((widths, row) => {
        var _a, _b;
        for (let i = 0; i < maxColumnCount; i++) {
            const cell = (_a = row[i]) !== null && _a !== void 0 ? _a : '';
            widths[i] = Math.max((_b = widths[i]) !== null && _b !== void 0 ? _b : 3, cell.length);
        }
        return widths;
    }, new Array(maxColumnCount).fill(3));
}
exports.calculateColumnWidths = calculateColumnWidths;
/**
 * Formats a single row into a Markdown-formatted string.
 * @param params - The parameters for row formatting.
 * @returns The Markdown string for the row.
 */
function formatMarkdownRow({ columnCount, row, columnAlignments = [], columnWidths, }) {
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
 * @param params - The parameters for alignment row generation.
 * @returns The Markdown string for the alignment row.
 */
function formatAlignmentRow({ columnCount, columnAlignments = [], columnWidths, }) {
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
//# sourceMappingURL=helpers.js.map