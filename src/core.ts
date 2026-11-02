/**
 * @fileoverview The react-markdown-table-ts/core entry point: the Markdown
 * generator and its types, without the component, so it works without React,
 * such as in Node scripts, CLIs and other frameworks.
 */

export { generateMarkdownTable } from './generateMarkdownTable.js';
export type { Alignment, CellValue, MarkdownTableOptions } from './types.js';
export { getColumnName } from './utils.js';
export { MarkdownTableError } from './validation.js';
