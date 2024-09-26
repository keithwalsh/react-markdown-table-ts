import React, {useEffect, useMemo, useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

// Types
export type TableRow = Array<string>;

export interface MarkdownTableData {
  header: string[];
  rows: readonly string[][];
}

export interface MarkdownTableProps {
  data?: string[][] | null;
  hasHeader?: boolean;
  columnAlignments?: readonly ('left' | 'center' | 'right' | 'none')[];
  isCompact?: boolean;
  hasTabs?: boolean;
  className?: string;
  canReplaceNewlines?: boolean;
  onTableCreate?: (markdownString: string) => void;
}

// CSS styles
const prismStyles = `
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.8em;text-align:right}
`;

class MarkdownTableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MarkdownTableError';
  }
}

function calculateColumnWidths(
  allRows: readonly TableRow[],
  maxColumnCount: number
): number[] {
  const widths: number[] = new Array(maxColumnCount).fill(3);
  allRows.forEach((row: TableRow) => {
    for (let i = 0; i < maxColumnCount; i++) {
      const cell = row[i] ?? '';
      widths[i] = Math.max(widths[i], cell.length);
    }
  });
  return widths;
}

function replaceNewlinesInCell(cell: string): string {
  return cell.replace(/\n/g, '<br>');
}

function formatMarkdownRow(
  columnCount: number,
  row: TableRow,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths?: readonly number[],
  useTabs = false,
  replaceNewlines = false
): string {
  const defaultAlignment: 'left' | 'right' | 'center' | 'none' = 'left';
  const adjustedAlignments =
    columnAlignments.length < columnCount
      ? [
          ...columnAlignments,
          ...Array(columnCount - columnAlignments.length).fill(
            defaultAlignment
          ),
        ]
      : columnAlignments;

  let markdownRow = '|';
  for (let i = 0; i < columnCount; i++) {
    let cell = row[i] ?? '';
    if (replaceNewlines) {
      cell = replaceNewlinesInCell(cell);
    }
    const alignment = adjustedAlignments[i] ?? defaultAlignment;
    const targetWidth = columnWidths ? columnWidths[i] : cell.length;

    if (alignment === 'right') {
      markdownRow += `${useTabs ? '\t' : ' '}${cell.padStart(targetWidth)}${useTabs ? '\t' : ' '}|`;
    } else if (alignment === 'center') {
      const totalPadding = targetWidth - cell.length;
      const paddingLeft = Math.floor(totalPadding / 2);
      const paddingRight = totalPadding - paddingLeft;
      markdownRow += `${useTabs ? '\t' : ' '}${' '.repeat(paddingLeft)}${cell}${' '.repeat(paddingRight)}${useTabs ? '\t' : ' '}|`;
    } else {
      markdownRow += `${useTabs ? '\t' : ' '}${cell.padEnd(targetWidth)}${useTabs ? '\t' : ' '}|`;
    }
  }

  return markdownRow;
}

function formatAlignmentRow(
  columnCount: number,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  columnWidths?: readonly number[],
  useTabs = false
): string {
  const defaultAlignment: 'left' | 'right' | 'center' | 'none' = 'left';
  const adjustedAlignments =
    columnAlignments.length < columnCount
      ? [
          ...columnAlignments,
          ...Array(columnCount - columnAlignments.length).fill(
            defaultAlignment
          ),
        ]
      : columnAlignments;

  let alignmentRow = '|';
  for (let i = 0; i < columnCount; i++) {
    const alignment = adjustedAlignments[i] ?? defaultAlignment;
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

    alignmentRow += `${useTabs ? '\t' : ' '}${alignIndicator}${useTabs ? '\t' : ' '}|`;
  }

  return alignmentRow;
}

function generateMarkdownTableString(
  tableData: MarkdownTableData,
  columnAlignments: readonly ('left' | 'right' | 'center' | 'none')[],
  adjustColumnWidths = true,
  useTabs = false,
  replaceNewlines = false
): string {
  const headerColumnCount = tableData.header.length;
  const bodyColumnCounts = tableData.rows.map((row: TableRow) => row.length);
  const maxColumnCount = Math.max(headerColumnCount, ...bodyColumnCounts);

  const columnWidths = adjustColumnWidths
    ? calculateColumnWidths(
        [tableData.header, ...tableData.rows],
        maxColumnCount
      )
    : undefined;

  const markdownHeaderRow = formatMarkdownRow(
    maxColumnCount,
    tableData.header,
    columnAlignments,
    columnWidths,
    useTabs,
    replaceNewlines
  );
  const markdownAlignmentRow = formatAlignmentRow(
    maxColumnCount,
    columnAlignments,
    columnWidths,
    useTabs
  );

  const markdownBodyRows = tableData.rows
    .map((row: TableRow) =>
      formatMarkdownRow(
        maxColumnCount,
        row,
        columnAlignments,
        columnWidths,
        useTabs,
        replaceNewlines
      )
    )
    .join('\n');

  return `${markdownHeaderRow}\n${markdownAlignmentRow}\n${markdownBodyRows}`.trimEnd();
}

function generateAlphabetHeaders(columnCount: number): string[] {
  const headers: string[] = [];
  for (let i = 0; i < columnCount; i++) {
    headers.push(getColumnName(i));
  }
  return headers;
}

function getColumnName(index: number): string {
  let name = '';
  let currentIndex = index;
  while (currentIndex >= 0) {
    name = String.fromCharCode((currentIndex % 26) + 65) + name;
    currentIndex = Math.floor(currentIndex / 26) - 1;
  }
  return name;
}

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
  const adjustColumnWidths = !isCompact;
  const preRef = useRef<HTMLPreElement>(null);

  const markdownSyntax = useMemo(() => {
    if (data === null) {
      return 'Error: No data provided for the table.';
    }
    try {
      if (!Array.isArray(data) || data.length === 0) {
        throw new MarkdownTableError(
          "The 'data' prop must be a non-empty two-dimensional array."
        );
      }

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

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(
        preRef.current.querySelector('code') as HTMLElement
      );
    }
  }, [markdownSyntax]);

  return (
    <>
      <style>{prismStyles}</style>
      <pre
        ref={preRef}
        className={`${className} language-markdown line-numbers`}
      >
        <code className="language-markdown" role="code">
          {markdownSyntax}
        </code>
      </pre>
    </>
  );
};
