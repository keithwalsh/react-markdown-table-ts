/**
 * @fileoverview The useMarkdownTable hook, which generates a Markdown table for
 * a component to show, copy or download. MarkdownTable uses it too.
 */

import { useDeferredValue, useMemo, useState } from 'react';
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

/** A copy of the rows, so a change made to them in place can be noticed. Anything else is kept as it is. */
function copyRows<T>(inputData: T): T {
  return (
    Array.isArray(inputData) ? Array.from(inputData, row => (Array.isArray(row) ? Array.from(row) : row)) : inputData
  ) as T;
}

/** Whether the copy has the same cells as the rows. Object.is rather than ===, so a NaN cell matches itself. */
function hasSameCells(copy: unknown, inputData: unknown): boolean {
  if (!Array.isArray(copy) || !Array.isArray(inputData)) {
    return Object.is(copy, inputData);
  }
  return (
    copy.length === inputData.length &&
    copy.every((row, i) => {
      const otherRow: unknown = inputData[i];
      if (!Array.isArray(row) || !Array.isArray(otherRow)) {
        return Object.is(row, otherRow);
      }
      return row.length === otherRow.length && row.every((cell, j) => Object.is(cell, otherRow[j]));
    })
  );
}

/**
 * A copy of the rows that's replaced only when a cell changes. So a new array
 * with the same cells, such as one built during render, doesn't generate the
 * table again, and a cell changed in place shows the next time this renders.
 */
function useRows<T>(inputData: T): T {
  const [rows, setRows] = useState(() => copyRows(inputData));
  if (hasSameCells(rows, inputData)) {
    return rows;
  }
  // Setting state while rendering renders again straight away, before anything is shown
  const newRows = copyRows(inputData);
  setRows(newRows);
  return newRows;
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
 * It generates the table again only when a cell or option changes, so rows
 * built during render are fine. Like `MarkdownTable`, it generates the table
 * at a lower priority than typing, so a big table can be a render behind.
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
  const rows = useRows(inputData);
  const { columnAlignments, isCompact, hasPadding, hasTabs, hasHeader, convertLineBreaks } = options ?? {};
  // Inline alignment arrays are new on every render, so memoise on their contents.
  // String() rather than join() so a non-array from JavaScript reaches validation instead of throwing here
  const columnAlignmentsKey = columnAlignments === undefined ? undefined : String(columnAlignments);
  // Defer all inputs together so a render never pairs old data with new options
  const tableInputs = useMemo(
    () => ({ inputData: rows, columnAlignments, isCompact, hasPadding, hasTabs, hasHeader, convertLineBreaks }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnAlignmentsKey stands in for columnAlignments
    [rows, columnAlignmentsKey, isCompact, hasPadding, hasTabs, hasHeader, convertLineBreaks]
  );
  const deferredTableInputs = useDeferredValue(tableInputs);

  return useMemo(() => generateResult(deferredTableInputs), [deferredTableInputs]);
}
