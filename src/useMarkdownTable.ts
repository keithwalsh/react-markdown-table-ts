/**
 * @fileoverview The useMarkdownTable hook, which generates a Markdown table for
 * a component to show, copy or download. MarkdownTable uses it too.
 */

import { useDeferredValue, useMemo } from 'react';
import { generateMarkdownTable } from './generateMarkdownTable.js';
import type { CellValue, MarkdownTableOptions } from './types.js';
import { MarkdownTableError } from './validation.js';

/** What `useMarkdownTable` returns */
export interface MarkdownTableResult {
  /** The Markdown table, or an empty string while `inputData` is `null` or `undefined`, or when it's invalid */
  markdown: string;
  /** Why `inputData` or `columnAlignments` is invalid, or `null` when they're valid */
  error: MarkdownTableError | null;
}

interface TableInputs extends MarkdownTableOptions {
  inputData: readonly (readonly CellValue[])[] | null | undefined;
}

function generateResult({ inputData, ...options }: TableInputs): MarkdownTableResult {
  // A table still loading has nothing to show yet, which isn't an error
  if (inputData == null) {
    return { markdown: '', error: null };
  }
  try {
    return { markdown: generateMarkdownTable(inputData, options), error: null };
  } catch (error) {
    if (error instanceof MarkdownTableError) {
      return { markdown: '', error };
    }
    throw error;
  }
}

/**
 * Generates a Markdown table from rows of cells, for a component that shows,
 * copies or downloads it. Pass the `markdown` it returns to `MarkdownTable` to
 * show it without generating it again.
 *
 * Like `MarkdownTable`, it generates the table at a lower priority than typing,
 * so a big table can be a render behind the data.
 * @param inputData - The rows of the table. If `hasHeader` is true, the first row is the header.
 * `null` and `undefined` give an empty table, for example while data loads.
 * @param options - The formatting options, with the same names and defaults as the `MarkdownTable` props
 * @returns The table, and the error when `inputData` or `columnAlignments` is invalid
 * @example
 * const { markdown, error } = useMarkdownTable(rows, { columnAlignments: ['left', 'right'] });
 */
export function useMarkdownTable(
  inputData: readonly (readonly CellValue[])[] | null | undefined,
  options?: MarkdownTableOptions
): MarkdownTableResult {
  const { columnAlignments, isCompact, hasPadding, hasTabs, hasHeader, convertLineBreaks } = options ?? {};
  // Inline alignment arrays are new on every render, so memoise on their contents.
  // String() rather than join() so a non-array from JavaScript reaches validation instead of throwing here
  const columnAlignmentsKey = columnAlignments === undefined ? undefined : String(columnAlignments);
  // Defer all inputs together so a render never pairs old data with new options
  const tableInputs = useMemo(
    () => ({ inputData, columnAlignments, isCompact, hasPadding, hasTabs, hasHeader, convertLineBreaks }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnAlignmentsKey stands in for columnAlignments
    [inputData, columnAlignmentsKey, isCompact, hasPadding, hasTabs, hasHeader, convertLineBreaks]
  );
  const deferredTableInputs = useDeferredValue(tableInputs);

  return useMemo(() => generateResult(deferredTableInputs), [deferredTableInputs]);
}
