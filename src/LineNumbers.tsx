/**
 * @fileoverview Line numbers functionality with hooks and components.
 * Provides line numbers for code blocks using React patterns.
 */

import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

/**
 * Line number options
 */
export interface LineNumberOptions {
  startLine?: number;
  showLineNumbers?: boolean;
}

/**
 * Code block props with style support
 */
export interface CodeBlockProps {
  children: React.ReactNode;
  showLineNumbers?: boolean;
  startLine?: number;
  className?: string;
  style?: React.CSSProperties;
  topPadding?: number;
}


/**
 * Line numbers props
 */
export interface LineNumbersProps {
  lines: string[];
  startLine?: number;
  lineHeights?: number[];
  className?: string;
}

/**
 * Custom hook for resize observer functionality
 */
export function useResizeObserver(callback: () => void, deps: React.DependencyList = []): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handleResize = () => callbackRef.current();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, deps);
}

/**
 * Custom hook for line numbers functionality
 */
export function useLineNumbers(code: string, options: LineNumberOptions = {}) {
  const { startLine = 1, showLineNumbers = true } = options;
  const [lineHeights, setLineHeights] = useState<number[]>([]);
  const sizerRef = useRef<HTMLElement>(null);
  const lastCalculatedRef = useRef<string>('');

  const lines = code.split(/\n(?!$)/g);
  const lineNumbers = lines.map((_, index) => startLine + index);
  
  // Create a stable reference for the lines array
  const linesKey = lines.join('\n') + showLineNumbers.toString();

  function calculateLineHeights() {
    if (!sizerRef.current || !showLineNumbers) return;

    const sizer = sizerRef.current;
    const oneLinerHeight = sizer.getBoundingClientRect().height;
    const heights: number[] = [];

    lines.forEach((line, index) => {
        if (line && line.length > 1) {
        const span = document.createElement('span');
        span.style.display = 'block';
        span.textContent = line;
        sizer.appendChild(span);
        heights[index] = span.getBoundingClientRect().height;
        sizer.removeChild(span);
        } else {
        heights[index] = oneLinerHeight;
      }
    });

    setLineHeights(heights);
    lastCalculatedRef.current = linesKey;
  }

  useLayoutEffect(() => {
    if (!showLineNumbers) {
      setLineHeights([]);
      return;
    }
    
    // Only calculate if the content has actually changed
    if (lastCalculatedRef.current !== linesKey) {
      calculateLineHeights();
    }
  }, [linesKey, showLineNumbers]);

  useResizeObserver(() => {
    if (!showLineNumbers) return;
    calculateLineHeights();
  }, [linesKey, showLineNumbers]);

  return {
    lines,
    lineNumbers,
    lineHeights,
    sizerRef,
    calculateLineHeights
  };
}

/**
 * Line Number component
 */
export function LineNumber({ 
  number, 
  height, 
  className = '' 
}: { number: number; height?: number; className?: string }) {
  return React.createElement('span', {
    className,
    style: { height: height ? `${height}px` : undefined }
  }, number);
}

/**
 * Line Numbers component
 */
export function LineNumbers({ 
  lines, 
  startLine = 1, 
  lineHeights = [], 
  className = 'line-numbers-rows' 
}: LineNumbersProps) {
  const lineNumbers = lines.map((_, index) => startLine + index);

  return React.createElement('span', {
    className,
    'aria-hidden': 'true'
  }, lineNumbers.map((number, index) => 
    React.createElement(LineNumber, {
      key: index,
      number,
      height: lineHeights[index]
    })
  ));
}

/**
 * Memoized Code component
 */

/**
 * Main CodeBlock component with line numbers
 */
export function CodeBlock(props: CodeBlockProps) {
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
