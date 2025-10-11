/**
 * @fileoverview Utility functions and classes for generating formatted markdown
 * table strings with alignment, padding, and column width adjustments.
 */
import type { InputData, Alignment } from './types';
export declare function generateMarkdownTableString(inputData: InputData, columnAlignments: readonly Alignment[], canAdjustColumnWidths?: boolean, useTabs?: boolean, replaceNewlines?: boolean, hasPadding?: boolean): string;
export declare function generateAlphabetHeaders(columnCount: number): string[];
//# sourceMappingURL=utils.d.ts.map