/**
 * @fileoverview Component for displaying line numbers in a
 * styled pre/code block.
 */

import React from 'react';

/**
 * Line numbers component props with style support
 */
export interface LineNumbersComponentProps {
  children: React.ReactNode;
  showLineNumbers?: boolean;
  startLine?: number;
  className?: string;
  style?: React.CSSProperties;
  topPadding?: number;
}

/**
 * Main component that displays line numbers.
 * Creates a styled pre/code block with line numbers on the left side.
 */
export function LineNumbers(props: LineNumbersComponentProps) {
  const { 
    children, 
    showLineNumbers = false, 
    startLine = 1, 
    className = '',
    style = {},
    topPadding = 16
  } = props;
  
  const code = typeof children === 'string' ? children : '';
  const lines = code.split('\n');
  const lineNumbers = lines.map((_, index) => startLine + index);

  return React.createElement('pre', {
    className: `language-markdown ${showLineNumbers ? 'line-numbers' : ''} ${className}`.trim(),
    'data-start': startLine,
    style: {
      position: 'relative',
      counterReset: `linenumber ${startLine - 1}`,
      ...(showLineNumbers ? { paddingLeft: '1.2em' } : {}),
      ...style
    }
  }, [
    React.createElement('code', {
      key: 'code',
      className: 'language-markdown'
    }, children),
    showLineNumbers && React.createElement('span', {
      key: 'line-numbers',
      className: 'line-numbers-rows',
      'aria-hidden': 'true',
      style: {
        position: 'absolute',
        pointerEvents: 'none',
        top: `${1 + (topPadding / 16)}em`,
        fontSize: '100%',
        left: '0em',
        width: '2.5em',
        letterSpacing: '-1px',
        borderRight: '1px solid #999',
        userSelect: 'none',
        lineHeight: '1.5'
      }
    }, lineNumbers.map((number, index) => 
      React.createElement('span', {
        key: index,
        style: {
          display: 'block',
          textAlign: 'right',
          paddingRight: '0.8em',
          color: '#999',
          lineHeight: '1.5'
        }
      }, number)
    ))
  ].filter(Boolean));
}
