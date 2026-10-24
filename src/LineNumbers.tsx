/**
 * @fileoverview Component for displaying line numbers in a
 * styled pre/code block.
 */

import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { DEFAULT_TOP_PADDING } from './styles.js';

/**
 * Line numbers component props with style support. Other attributes go on the pre element.
 */
interface LineNumbersComponentProps extends Omit<HTMLAttributes<HTMLPreElement>, 'children' | 'className' | 'style'> {
  children: string;
  showLineNumbers?: boolean;
  className?: string;
  style?: CSSProperties;
  topPadding?: number;
  preRef?: Ref<HTMLPreElement>;
}

/**
 * Main component that displays line numbers.
 * Creates a styled pre/code block with line numbers on the left side.
 */
export function LineNumbers({
  children,
  showLineNumbers = false,
  className = '',
  style,
  topPadding = DEFAULT_TOP_PADDING,
  preRef,
  ...preAttributes
}: LineNumbersComponentProps) {
  // One text node rather than an element per line, which adds up for long tables
  const lineNumbers = children.split('\n').map((_, index) => index + 1).join('\n');

  // The stylesheet covers the defaults, so only add inline styles for values that differ
  const topPaddingStyle = topPadding !== DEFAULT_TOP_PADDING ? { paddingTop: `${topPadding}px` } : {};
  const lineNumbersTopStyle = topPadding !== DEFAULT_TOP_PADDING ? { top: `${topPadding}px` } : {};

  return (
    <pre
      // Focusable, so keyboard users can scroll a table wider than its container
      tabIndex={0}
      {...preAttributes}
      ref={preRef}
      className={['rmt-pre', showLineNumbers && 'rmt-has-line-numbers', className].filter(Boolean).join(' ')}
      style={style}
    >
      <code className="rmt-code" style={topPaddingStyle}>
        {children}
      </code>
      {showLineNumbers && (
        <span className="rmt-line-numbers" aria-hidden="true" style={lineNumbersTopStyle}>
          {lineNumbers}
        </span>
      )}
    </pre>
  );
}
