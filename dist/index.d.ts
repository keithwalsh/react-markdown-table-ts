/**
 * @fileoverview Main MarkdownTable component that generates and displays markdown
 * table syntax with Prism.js syntax highlighting.
 */
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import type { MarkdownTableProps } from './types';
export type { Alignment, MarkdownTableProps, InputData, TableConfig } from './types';
export { MarkdownTableError } from './validation';
export declare function MarkdownTable({ inputData, hasHeader, columnAlignments, isCompact, hasTabs, hasPadding, convertLineBreaks, className, onGenerate, theme, preStyle, topPadding, minWidth, showLineNumbers, }: MarkdownTableProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map