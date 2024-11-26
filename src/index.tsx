// src/index.tsx

import { useEffect, useMemo, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { MarkdownTableProps } from './types';
import { MarkdownTableError } from './validation';
import { generateMarkdownTableString, generateAlphabetHeaders } from './utils';

// CSS styles
const PRISM_CSS = `
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.8em;text-align:right}
`;

export const MarkdownTable: React.FC<MarkdownTableProps> = ({
  inputData = null,
  hasHeader = true,
  columnAlignments = [],
  isCompact = false,
  hasTabs = false,
  canReplaceNewlines = false,
  className,
  onTableCreate,
}) => {
  const adjustColumnWidths = !isCompact;
  const preElementRef = useRef<HTMLPreElement>(null);

  const markdownTableSyntax = useMemo(() => {
    if (inputData === null) {
      return 'Error: No data provided for the table.';
    }
    try {
      if (!Array.isArray(inputData) || inputData.length === 0) {
        throw new MarkdownTableError(
          "The 'data' prop must be a non-empty two-dimensional array.",
        );
      }

      const tableData = hasHeader
        ? {
            inputDataHeader: inputData[0],
            inputDataBody: inputData.slice(1),
          }
        : {
            inputDataHeader: generateAlphabetHeaders(inputData[0].length),
            inputDataBody: inputData,
          };

      return generateMarkdownTableString(
        tableData,
        columnAlignments,
        adjustColumnWidths,
        hasTabs,
        canReplaceNewlines,
      );
    } catch (error) {
      if (error instanceof MarkdownTableError) {
        return `Error: ${error.message}`;
      } else {
        throw error;
      }
    }
  }, [
    inputData,
    hasHeader,
    columnAlignments,
    isCompact,
    hasTabs,
    canReplaceNewlines,
  ]);

  useEffect(() => {
    if (onTableCreate) {
      onTableCreate(markdownTableSyntax);
    }
  }, [markdownTableSyntax, onTableCreate]);

  useEffect(() => {
    const codeElement = preElementRef.current?.querySelector('code');
    if (codeElement && markdownTableSyntax) {
      requestAnimationFrame(() => {
        Prism.highlightElement(codeElement as HTMLElement);
      });
    }
  }, [markdownTableSyntax]);

  return (
    <>
      <style>{PRISM_CSS}</style>
      <pre
        ref={preElementRef}
        className={`${className} language-markdown line-numbers`}
      >
        <code className="language-markdown" role="code">
          {markdownTableSyntax}
        </code>
      </pre>
    </>
  );
};
