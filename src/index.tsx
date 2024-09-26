import React, {useEffect, useMemo} from 'react';
import {MarkdownTableProps} from './types';
import {generateMarkdownTableString} from './utils';
import {MarkdownTableError} from './errors';
import {validateMarkdownTableProps} from './validation';

/**
 * React component that generates and displays Markdown table syntax.
 * @param props - The input parameters for table generation.
 * @returns A <pre> element containing the Markdown table syntax or an error message.
 */
export const MarkdownTable: React.FC<MarkdownTableProps> = ({
  data = null,
  hasHeader = true,
  columnAlignments = [],
  isCompact = false,
  hasTabs = false,
  canReplaceNewlines = false,
  className,
  onTableCreate,
}) => {
  // Invert isCompact to get adjustColumnWidths
  const adjustColumnWidths = !isCompact;

  // Generate Markdown table
  const markdownSyntax = useMemo(() => {
    if (data === null) {
      return 'Error: No data provided for the table.';
    }
    try {
      validateMarkdownTableProps({
        data,
        hasHeader,
        columnAlignments,
        isCompact,
        hasTabs,
        canReplaceNewlines,
      });

      // Determine header and rows based on hasHeader
      const tableData = hasHeader
        ? {
            header: data[0],
            rows: data.slice(1),
          }
        : {
            header: generateAlphabetHeaders(data[0].length),
            rows: data,
          };

      return generateMarkdownTableString(
        tableData,
        columnAlignments,
        adjustColumnWidths,
        hasTabs,
        canReplaceNewlines
      );
    } catch (error) {
      if (error instanceof MarkdownTableError) {
        return `Error: ${error.message}`;
      } else {
        throw error;
      }
    }
  }, [
    data,
    hasHeader,
    columnAlignments,
    isCompact,
    hasTabs,
    canReplaceNewlines,
  ]);

  useEffect(() => {
    if (onTableCreate) {
      onTableCreate(markdownSyntax);
    }
  }, [markdownSyntax, onTableCreate]);

  return <pre className={className}>{markdownSyntax}</pre>;
};

/**
 * Generates alphabetical headers (A, B, C, ...) based on the number of columns.
 * @param columnCount - The number of columns.
 * @returns An array of alphabetical headers.
 */
function generateAlphabetHeaders(columnCount: number): string[] {
  const headers: string[] = [];
  for (let i = 0; i < columnCount; i++) {
    headers.push(getColumnName(i));
  }
  return headers;
}

/**
 * Converts a zero-based column index to its corresponding alphabetical representation.
 * For example, 0 -> 'A', 1 -> 'B', ..., 25 -> 'Z', 26 -> 'AA', etc.
 * @param index - The zero-based column index.
 * @returns The alphabetical column name.
 */
function getColumnName(index: number): string {
  let name = '';
  let currentIndex = index;
  while (currentIndex >= 0) {
    name = String.fromCharCode((currentIndex % 26) + 65) + name;
    currentIndex = Math.floor(currentIndex / 26) - 1;
  }
  return name;
}

export type {MarkdownTableProps, TableRow, MarkdownTableData} from './types';
export {MarkdownTableError};
