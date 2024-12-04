// src/index.tsx

import { useEffect, useMemo, useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { Alignment, MarkdownTableProps } from './types';
import { generateMarkdownTableString, generateAlphabetHeaders } from './utils';
import { validateInputData, MarkdownTableError } from './validation';

// CSS styles
const LIGHT_THEME_CSS = `
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`;

const DARK_THEME_CSS = `
code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:0 0;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#282a36}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:2.4em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.5em;text-align:right}
`;

const getTableData = (inputData: string[][], hasHeader: boolean) => {
  return hasHeader
    ? { inputDataHeader: inputData[0], inputDataBody: inputData.slice(1) }
    : { inputDataHeader: generateAlphabetHeaders(inputData[0].length), inputDataBody: inputData };
};

const generateTableSyntax = (
  inputData: string[][] | null,
  hasHeader: boolean,
  columnAlignments: readonly Alignment[],
  adjustColumnWidths: boolean,
  hasTabs: boolean,
  canReplaceNewlines: boolean,
  hasPadding: boolean
): string => {
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
};

const applySyntaxHighlighting = (
  preElementRef: React.RefObject<HTMLPreElement>,
  markdownTableSyntax: string
): void => {
  useEffect(() => {
    const codeElement = preElementRef.current?.querySelector('code');
    if (codeElement && markdownTableSyntax) {
      requestAnimationFrame(() => {
        Prism.highlightElement(codeElement as HTMLElement);
      });
    }
  }, [markdownTableSyntax]);
};

export const MarkdownTable: React.FC<MarkdownTableProps> = ({
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
}) => {
  const adjustColumnWidths = !isCompact;
  const preElementRef = useRef<HTMLPreElement>(null);

  const markdownTableSyntax = useMemo(() => generateTableSyntax(
    inputData,
    hasHeader,
    columnAlignments,
    adjustColumnWidths,
    hasTabs,
    convertLineBreaks,
    hasPadding
  ), [
    inputData,
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

  applySyntaxHighlighting(preElementRef, markdownTableSyntax);

  return (
    <>
      <style>
        {theme === 'light' ? LIGHT_THEME_CSS : DARK_THEME_CSS}
        {`
          pre {
            position: relative;
            padding-top: ${topPadding}px !important;
          }
          pre::before {
            position: absolute;
            top: 8px;
            left: 12px;
            color: ${theme === 'light' ? '#666' : '#999'};
            letter-spacing: 2px;
            font-size: 12px;
          }
        `}
      </style>
      <div
        id="MarkdownTable"
        style={{
          position: 'relative',
          isolation: 'isolate',
          display: 'inline-block'
        }}
      >
        <pre
          ref={preElementRef}
          className={`${className} language-markdown line-numbers ${theme === 'dark' ? 'dark-theme' : ''}`}
          style={{
            width: 'fit-content',
            minWidth: 'min-content',
            margin: 0,
            ...preStyle
          }}
        >
          <code className="language-markdown" role="code">
            {markdownTableSyntax}
          </code>
        </pre>
      </div>
    </>
  );
};
