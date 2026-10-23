/**
 * @fileoverview Main MarkdownTable component that generates and displays formatted
 * markdown table syntax with optional line numbers and theme support.
 */

import { useEffect, useDeferredValue, useMemo, useRef } from 'react';
import { generateMarkdownTable } from './generateMarkdownTable.js';
import { LineNumbers } from './LineNumbers.js';
import { STYLESHEET, STYLESHEET_HREF, THEME_CLASSES } from './styles.js';
import type { Alignment, MarkdownTableOptions, MarkdownTableProps } from './types.js';
import { MarkdownTableError } from './validation.js';

// A variable, because React 18's types don't yet know the href and precedence attributes
const STYLESHEET_PROPS = { href: STYLESHEET_HREF, precedence: 'default' };

interface TableInputs extends Required<MarkdownTableOptions> {
  inputData: MarkdownTableProps['inputData'];
}

interface TableSyntaxResult {
  markdown: string;
  error: MarkdownTableError | null;
}

const DEFAULT_COLUMN_ALIGNMENTS: readonly Alignment[] = [];

function generateTableSyntax({ inputData, ...options }: TableInputs): TableSyntaxResult {
  // null is the default, so a table still loading renders empty rather than as an error
  if (inputData == null) {
    return { markdown: '', error: null };
  }
  try {
    return { markdown: generateMarkdownTable(inputData, options), error: null };
  } catch (error) {
    if (error instanceof MarkdownTableError) {
      return { markdown: `Error: ${error.message}`, error };
    }
    throw error;
  }
}

export function MarkdownTable({
  inputData = null,
  hasHeader = true,
  columnAlignments = DEFAULT_COLUMN_ALIGNMENTS,
  isCompact = false,
  hasTabs = false,
  hasPadding = true,
  convertLineBreaks = false,
  className,
  onGenerate,
  theme = 'light',
  preStyle,
  topPadding = 16,
  minWidth,
  showLineNumbers = true,
}: MarkdownTableProps) {
  // Inline alignment arrays are new on every render, so memoise on their contents.
  // String() rather than join() so a non-array from JavaScript reaches validation instead of throwing here
  const columnAlignmentsKey = String(columnAlignments);
  // Defer all inputs together so a render never pairs old data with new options
  const tableInputs = useMemo(
    () => ({ inputData, hasHeader, columnAlignments, isCompact, hasTabs, convertLineBreaks, hasPadding }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnAlignmentsKey stands in for columnAlignments
    [inputData, hasHeader, columnAlignmentsKey, isCompact, hasTabs, convertLineBreaks, hasPadding]
  );
  const deferredTableInputs = useDeferredValue(tableInputs);

  const result = useMemo(() => generateTableSyntax(deferredTableInputs), [deferredTableInputs]);

  // Read the latest callback from a ref so a new inline onGenerate doesn't re-fire it
  const onGenerateRef = useRef(onGenerate);
  useEffect(() => {
    onGenerateRef.current = onGenerate;
  });

  useEffect(() => {
    onGenerateRef.current?.(result.markdown, result.error);
  }, [result]);

  return (
    <div className={`rmt ${theme === 'light' ? THEME_CLASSES.light : THEME_CLASSES.dark}`}>
      {/* React 18's server renderer HTML-escapes <style> children, which breaks the CSS and hydration */}
      <style {...STYLESHEET_PROPS} dangerouslySetInnerHTML={{ __html: STYLESHEET }} />
      <LineNumbers
        showLineNumbers={showLineNumbers}
        className={`${theme === 'dark' ? 'dark-theme' : ''} ${className || ''}`.trim()}
        topPadding={topPadding}
        style={{
          position: 'relative',
          isolation: 'isolate',
          display: 'inline-block',
          width: 'fit-content',
          minWidth: minWidth ? `${minWidth}px` : 'min-content',
          margin: 0,
          ...preStyle
        }}
      >
        {result.markdown}
      </LineNumbers>
    </div>
  );
}
