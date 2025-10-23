/**
 * @fileoverview Component for displaying line numbers in a
 * styled pre/code block.
 */

import type { CSSProperties } from 'react';
import React from 'react';

/**
 * Line numbers component props with style support
 */
export interface LineNumbersComponentProps {
  children: React.ReactNode;
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
  topPadding = 16,
  codeStyle = {}
}: LineNumbersComponentProps) {
  const code = typeof children === 'string' ? children : '';
  const lines = code.split('\n');
  const lineNumbers = lines.map((_, index) => startLine + index);

  const preStyle: CSSProperties = {
    position: 'relative',
    counterReset: `linenumber ${startLine - 1}`,
    paddingTop: 0,
    ...(showLineNumbers ? { paddingLeft: '1em' } : {}),
    ...style
  };

  const codeStyleFinal: CSSProperties = {
    display: 'block',
    paddingTop: `${topPadding}px`,
    paddingLeft: showLineNumbers ? '3em' : '0.3em',
    ...codeStyle
  };

  const lineNumbersStyle: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    top: `${topPadding}px`,
    fontSize: '100%',
    left: '0em',
    width: '2.5em',
    letterSpacing: '-1px',
    borderRight: '1px solid #999',
    userSelect: 'none',
    lineHeight: '1.5'
  };

  return (
    <pre
      className={`language-markdown ${showLineNumbers ? 'line-numbers' : ''} ${className}`.trim()}
      data-start={startLine}
      style={preStyle}
    >
      <code className="language-markdown" style={codeStyleFinal}>
        {children}
      </code>
      {showLineNumbers && (
        <span className="line-numbers-rows" aria-hidden="true" style={lineNumbersStyle}>
          {lineNumbers.map((number, index) => (
            <span
              key={index}
              style={{
                display: 'block',
                textAlign: 'right',
                paddingRight: '0.8em',
                color: '#999',
                lineHeight: '1.5'
              }}
            >
              {number}
            </span>
          ))}
        </span>
      )}
    </pre>
  );
}
