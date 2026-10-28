/**
 * @fileoverview Component for displaying line numbers in a
 * styled pre/code block.
 */

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type Ref, type RefObject } from 'react';
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
 * Whether the pre around the code element scrolls. It's measured after
 * rendering, and again when either element resizes or the content changes, so
 * it's false on the server and wherever there's no ResizeObserver.
 */
function useIsScrollable(codeRef: RefObject<HTMLElement | null>, content: string, enabled: boolean): boolean {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const code = codeRef.current;
    const pre = code?.parentElement;
    if (!enabled || !code || !pre || typeof ResizeObserver === 'undefined') {
      return;
    }
    // A new observer reports each element straight away, so new content is measured too
    const observer = new ResizeObserver(() => {
      setIsScrollable(pre.scrollWidth > pre.clientWidth || pre.scrollHeight > pre.clientHeight);
    });
    observer.observe(pre);
    observer.observe(code);
    return () => observer.disconnect();
  }, [codeRef, content, enabled]);

  return isScrollable;
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
  const codeRef = useRef<HTMLElement>(null);
  // A tabIndex prop decides focus by itself, so there's nothing to measure
  const isScrollable = useIsScrollable(codeRef, children, preAttributes.tabIndex === undefined);

  // One text node rather than an element per line, which adds up for long tables
  const lineNumbers = children.split('\n').map((_, index) => index + 1).join('\n');

  // The stylesheet covers the defaults, so only add inline styles for values that differ
  const topPaddingStyle = topPadding !== DEFAULT_TOP_PADDING ? { paddingTop: `${topPadding}px` } : {};
  const lineNumbersTopStyle = topPadding !== DEFAULT_TOP_PADDING ? { top: `${topPadding}px` } : {};

  return (
    <pre
      // Focusable while it scrolls, so keyboard users can scroll it
      tabIndex={isScrollable ? 0 : undefined}
      {...preAttributes}
      ref={preRef}
      className={['rmt-pre', showLineNumbers && 'rmt-has-line-numbers', className].filter(Boolean).join(' ')}
      style={style}
    >
      <code ref={codeRef} className="rmt-code" style={topPaddingStyle}>
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
