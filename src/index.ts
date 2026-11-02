/**
 * @fileoverview Main entry point that re-exports the MarkdownTable component
 * and related functions and types.
 */

export { generateMarkdownTable } from './generateMarkdownTable.js';
export { MarkdownTable } from './MarkdownTable.js';
export type { MarkdownTableProps } from './props.js';
export type { Alignment, CellValue, MarkdownTableOptions } from './types.js';
export { useMarkdownTable, type MarkdownTableResult } from './useMarkdownTable.js';
export { getColumnName } from './utils.js';
export { MarkdownTableError } from './validation.js';

