/**
 * @fileoverview Component for displaying line numbers in a
 * styled pre/code block.
 */

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { DEFAULT_TOP_PADDING } from './styles.js';

/**
 * Line numbers component props with style support. Other attributes go on the pre element.
 */
export interface LineNumbersComponentProps extends Omit<HTMLAttributes<HTMLPreElement>, 'children' | 'className' | 'style'> {
  children: ReactNode;
  showLineNumbers?: boolean;
  startLine?: number;
  className?: string;
  style?: CSSProperties;
  topPadding?: number;
  codeStyle?: CSSProperties;
}

/**
 * Main component that displays line numbers.
 * Creates a styled pre/code block with line numbers on the left side.
 */
export function LineNumbers({
  children,
  showLineNumbers = false,
  startLine = 1,
  className = '',
  style = {},
  topPadding = DEFAULT_TOP_PADDING,
  codeStyle = {},
  ...preAttributes
}: LineNumbersComponentProps) {
  const code = typeof children === 'string' ? children : '';
  const lines = code.split('\n');
  const lineNumbers = lines.map((_, index) => startLine + index);

  // The stylesheet covers the defaults, so only add inline styles for values that differ
  const preStyle: CSSProperties = {
    ...(startLine !== 1 ? { counterReset: `linenumber ${startLine - 1}` } : {}),
    ...style
  };
  const topPaddingStyle = topPadding !== DEFAULT_TOP_PADDING ? { paddingTop: `${topPadding}px` } : {};
  const lineNumbersTopStyle = topPadding !== DEFAULT_TOP_PADDING ? { top: `${topPadding}px` } : {};

  return (
    <pre
      // Focusable, so keyboard users can scroll a table wider than its container
      tabIndex={0}
      {...preAttributes}
      className={`language-markdown ${showLineNumbers ? 'line-numbers' : ''} ${className}`.trim()}
      data-start={startLine}
      style={preStyle}
    >
      <code className="language-markdown" style={{ ...topPaddingStyle, ...codeStyle }}>
        {children}
      </code>
      {showLineNumbers && (
        <span className="line-numbers-rows" aria-hidden="true" style={lineNumbersTopStyle}>
          {lineNumbers.map((number, index) => (
            <span key={index}>{number}</span>
          ))}
        </span>
      )}
    </pre>
  );
}
