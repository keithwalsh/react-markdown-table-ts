/**
 * @fileoverview Main MarkdownTable component that generates and displays formatted
 * markdown table syntax with optional line numbers and theme support.
 */

import { useEffect, useDeferredValue, useId, useMemo, useRef } from 'react';
import { LineNumbers } from './LineNumbers.js';
import type { Alignment, MarkdownTableProps } from './types.js';
import { generateMarkdownTableString, generateAlphabetHeaders } from './utils.js';
import { validateInputData, validateColumnAlignments, MarkdownTableError } from './validation.js';


interface ThemeColors {
  textColor: string;
  textShadow: string;
  background: string;
  selectionBackground: string;
  borderRadius?: string;
}

function getThemeColors(theme: 'light' | 'dark'): ThemeColors {
  return theme === 'light'
    ? {
        textColor: '#000',
        textShadow: '0 1px #fff',
        background: '#f5f2f0',
        selectionBackground: '#b3d4fc',
      }
    : {
        textColor: '#f8f8f2',
        textShadow: '0 1px rgba(0,0,0,.3)',
        background: '#282a36',
        selectionBackground: '#44475a',
        borderRadius: '.3em',
      };
}

function generateThemeCSS(theme: 'light' | 'dark', scopeId: string): string {
  const colors = getThemeColors(theme);
  const commonStyles = `
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  `.replace(/\s{2,}/g, ''); // remove extra spaces

  return `
#${scopeId} code[class*=language-], #${scopeId} pre[class*=language-] {
  color: ${colors.textColor};
  background: 0 0;
  text-shadow: ${colors.textShadow};
  ${commonStyles}
}
#${scopeId} code[class*=language-] ::-moz-selection,
#${scopeId} code[class*=language-]::-moz-selection,
#${scopeId} pre[class*=language-] ::-moz-selection,
#${scopeId} pre[class*=language-]::-moz-selection {
  text-shadow: none;
  background: ${colors.selectionBackground};
}
#${scopeId} code[class*=language-] ::selection,
#${scopeId} code[class*=language-]::selection,
#${scopeId} pre[class*=language-] ::selection,
#${scopeId} pre[class*=language-]::selection {
  text-shadow: none;
  background: ${colors.selectionBackground};
}
@media print {
  #${scopeId} code[class*=language-], #${scopeId} pre[class*=language-] {
    text-shadow: none;
  }
}
#${scopeId} pre[class*=language-] {
  padding-right: 1em;
  padding-bottom: 1em;
  overflow: visible;
  background: ${colors.background}${colors.borderRadius ? `;\n  border-radius: ${colors.borderRadius}` : ''};
}
#${scopeId} pre[class*=language-].line-numbers > code {
  position: relative;
  white-space: inherit;
}
`.trim();
}

function getTableData(inputData: string[][], hasHeader: boolean) {
  return hasHeader
    ? { inputDataHeader: inputData[0], inputDataBody: inputData.slice(1) }
    : { inputDataHeader: generateAlphabetHeaders(inputData[0].length), inputDataBody: inputData };
}

interface TableSyntaxResult {
  markdown: string;
  error: MarkdownTableError | null;
}

const DEFAULT_COLUMN_ALIGNMENTS: readonly Alignment[] = [];

function generateTableSyntax(
  inputData: string[][] | null,
  hasHeader: boolean,
  columnAlignments: readonly Alignment[],
  adjustColumnWidths: boolean,
  hasTabs: boolean,
  canReplaceNewlines: boolean,
  hasPadding: boolean
): TableSyntaxResult {
  try {
    validateInputData(inputData);
    validateColumnAlignments(columnAlignments);
    const { inputDataHeader, inputDataBody } = getTableData(inputData, hasHeader);

    const markdown = generateMarkdownTableString(
      { inputDataHeader, inputDataBody },
      columnAlignments,
      adjustColumnWidths,
      hasTabs,
      canReplaceNewlines,
      hasPadding
    );
    return { markdown, error: null };
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
  const scopeId = useId().replace(/:/g, '_');
  const deferredInputData = useDeferredValue(inputData);
  // Inline alignment arrays are new on every render, so memoise on their contents.
  // String() rather than join() so a non-array from JavaScript reaches validation instead of throwing here
  const columnAlignmentsKey = String(columnAlignments);

  const result = useMemo(
    () =>
      generateTableSyntax(
        deferredInputData,
        hasHeader,
        columnAlignments,
        !isCompact,
        hasTabs,
        convertLineBreaks,
        hasPadding
      ),
    [deferredInputData, hasHeader, columnAlignmentsKey, isCompact, hasTabs, convertLineBreaks, hasPadding]
  );
  const themeCSS = useMemo(() => generateThemeCSS(theme, scopeId), [theme, scopeId]);

  // Read the latest callback from a ref so a new inline onGenerate doesn't re-fire it
  const onGenerateRef = useRef(onGenerate);
  useEffect(() => {
    onGenerateRef.current = onGenerate;
  });

  useEffect(() => {
    onGenerateRef.current?.(result.markdown, result.error);
  }, [result]);

  return (
    <div id={scopeId}>
      {/* React 18's server renderer HTML-escapes <style> children, which breaks the CSS and hydration */}
      <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
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
