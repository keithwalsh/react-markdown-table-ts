/**
 * @fileoverview Main MarkdownTable component that generates and displays formatted
 * markdown table syntax with optional line numbers and theme support.
 */

import { useEffect, useMemo, useDeferredValue, useId } from 'react';
import { LineNumbers } from './LineNumbers';
import type { Alignment, MarkdownTableProps } from './types';
import { generateMarkdownTableString, generateAlphabetHeaders } from './utils';
import { validateInputData, MarkdownTableError } from './validation';


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
        selectionBackground: '#b3d4fc',
        borderRadius: '.3em',
      };
}

function generateThemeCSS(theme: 'light' | 'dark'): string {
  const colors = getThemeColors(theme);
  const commonStyles = `font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none`;
  
  return `
code[class*=language-],pre[class*=language-]{color:${colors.textColor};background:0 0;text-shadow:${colors.textShadow};${commonStyles}}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:${colors.selectionBackground}}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:${colors.selectionBackground}}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:visible${colors.borderRadius ? `;border-radius:${colors.borderRadius}` : ''}}:not(pre)>code[class*=language-],pre[class*=language-]{background:${colors.background}}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:3.8em}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block}
`;
}

function getTableData(inputData: string[][], hasHeader: boolean) {
  return hasHeader
    ? { inputDataHeader: inputData[0], inputDataBody: inputData.slice(1) }
    : { inputDataHeader: generateAlphabetHeaders(inputData[0].length), inputDataBody: inputData };
}

function generateTableSyntax(
  inputData: string[][] | null,
  hasHeader: boolean,
  columnAlignments: readonly Alignment[],
  adjustColumnWidths: boolean,
  hasTabs: boolean,
  canReplaceNewlines: boolean,
  hasPadding: boolean
): string {
  try {
    validateInputData(inputData);
    const { inputDataHeader, inputDataBody } = getTableData(inputData as string[][], hasHeader);

    return generateMarkdownTableString(
      { inputDataHeader, inputDataBody },
      columnAlignments,
      adjustColumnWidths,
      hasTabs,
      canReplaceNewlines,
      hasPadding
    );
  } catch (error) {
    if (error instanceof MarkdownTableError) {
      return `Error: ${error.message}`;
    }
    throw error;
  }
}

export function MarkdownTable({
  inputData = null,
  hasHeader = true,
  columnAlignments = [],
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
  const id = useId();
  const deferredInputData = useDeferredValue(inputData);

  const markdownTableSyntax = useMemo(() => generateTableSyntax(
    deferredInputData,
    hasHeader,
    columnAlignments,
    !isCompact,
    hasTabs,
    convertLineBreaks,
    hasPadding
  ), [
    deferredInputData,
    hasHeader,
    columnAlignments,
    isCompact,
    hasTabs,
    convertLineBreaks,
    hasPadding,
  ]);

  useEffect(() => {
    if (onGenerate) {
      onGenerate(markdownTableSyntax);
    }
  }, [markdownTableSyntax, onGenerate]);

  return (
    <>
      <style>
        {generateThemeCSS(theme)}
        {`
          /* Add top spacing for the table content */
          pre > code {
            display: block;
            padding-top: ${topPadding}px !important;
            padding-left: 3em !important;
          }
          /* Hide line numbers when disabled */
          pre:not(.line-numbers) .line-numbers-rows {
            display: none !important;
          }
          pre:not(.line-numbers) > code {
            padding-left: 0.3em !important;
          }
          /* Ensure line numbers are visible */
          .line-numbers .line-numbers-rows {
            display: block !important;
          }
        `}
      </style>
      <div
        id={id}
        style={{
          position: 'relative',
          isolation: 'isolate',
          display: 'inline-block'
        }}
      >
        <LineNumbers
          showLineNumbers={showLineNumbers}
          className={`${theme === 'dark' ? 'dark-theme' : ''} ${className || ''}`.trim()}
          topPadding={topPadding}
          {...({
            style: {
              width: 'fit-content',
              minWidth: minWidth ? `${minWidth}px` : 'min-content',
              margin: 0,
              ...preStyle
            }
          } as any)}
        >
          {markdownTableSyntax}
        </LineNumbers>
      </div>
    </>
  );
}
