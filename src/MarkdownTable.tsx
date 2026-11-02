/**
 * @fileoverview Main MarkdownTable component that generates and displays formatted
 * markdown table syntax with optional line numbers and theme support.
 */

import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { LineNumbers } from './LineNumbers.js';
import { STYLESHEET, STYLESHEET_HREF, THEME_CLASSES } from './styles.js';
import type { MarkdownTableProps } from './props.js';
import { useMarkdownTable, type MarkdownTableResult } from './useMarkdownTable.js';

// A variable, because React 18's types don't yet know the href and precedence attributes
const STYLESHEET_PROPS = { href: STYLESHEET_HREF, precedence: 'default' };

/** The table to show, with an error message in place of an invalid table */
function getShownTable(table: MarkdownTableResult): MarkdownTableResult {
  return table.error ? { markdown: `Error: ${table.error.message}`, error: table.error } : table;
}

// forwardRef rather than a ref prop, which React 18 doesn't pass to function components
export const MarkdownTable = forwardRef<HTMLPreElement, MarkdownTableProps>(function MarkdownTable(
  {
    inputData = null,
    markdown,
    hasHeader,
    columnAlignments,
    isCompact,
    hasTabs,
    hasPadding,
    convertLineBreaks,
    className,
    onGenerate,
    theme = 'light',
    preStyle,
    topPadding,
    minWidth,
    showLineNumbers = true,
    nonce,
    ...preAttributes
  },
  ref
) {
  // == null, so null from JavaScript generates the table too
  const hasMarkdown = markdown != null;
  // With markdown, the hook gets no data, so the table isn't generated twice
  const table = useMarkdownTable(hasMarkdown ? null : inputData, {
    hasHeader,
    columnAlignments,
    isCompact,
    hasTabs,
    hasPadding,
    convertLineBreaks
  });
  const result = useMemo(
    () => (hasMarkdown ? { markdown: String(markdown), error: null } : getShownTable(table)),
    [hasMarkdown, markdown, table]
  );

  // Read the latest callback from a ref so a new inline onGenerate doesn't re-fire it
  const onGenerateRef = useRef(onGenerate);
  useEffect(() => {
    onGenerateRef.current = onGenerate;
  });

  useEffect(() => {
    onGenerateRef.current?.(result.markdown, result.error);
  }, [result]);

  // Any other value gets the default light theme, so a stray value from JavaScript can't flip it
  const themeClass = THEME_CLASSES[theme === 'dark' || theme === 'auto' || theme === 'inherit' ? theme : 'light'];

  return (
    <div className={`rmt ${themeClass}`}>
      {/* React 18's server renderer HTML-escapes <style> children, which breaks the CSS and hydration */}
      <style {...STYLESHEET_PROPS} nonce={nonce} dangerouslySetInnerHTML={{ __html: STYLESHEET }} />
      <LineNumbers
        {...preAttributes}
        preRef={ref}
        showLineNumbers={showLineNumbers}
        className={className}
        style={{
          ...(topPadding !== undefined ? { paddingTop: `${topPadding}px` } : {}),
          ...(minWidth !== undefined ? { minWidth: `${minWidth}px` } : {}),
          ...preStyle
        }}
      >
        {result.markdown}
      </LineNumbers>
    </div>
  );
});

MarkdownTable.displayName = 'MarkdownTable';
