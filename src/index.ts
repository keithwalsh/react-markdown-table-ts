/**
 * @fileoverview Main entry point that re-exports the MarkdownTable component
 * and related types.
 */

export { generateMarkdownTable } from './generateMarkdownTable.js';
export { MarkdownTable } from './MarkdownTable.js';
export type { Alignment, CellValue, MarkdownTableOptions, MarkdownTableProps } from './types.js';
export { MarkdownTableError } from './validation.js';

