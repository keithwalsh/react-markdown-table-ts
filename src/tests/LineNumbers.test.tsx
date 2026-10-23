/**
 * @fileoverview Comprehensive tests for the LineNumbers component including
 * rendering, props handling, styling, and edge cases.
 */

import { createRef } from 'react';
import { render } from '@testing-library/react';
import { getPreElement, getCodeElement, getLineNumbersSpan, hasClass, expectPreClasses, expectPreNotToHaveClasses } from './test-utils';

import { LineNumbers } from '../LineNumbers';

describe('LineNumbers', () => {
  describe('Basic rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<LineNumbers>code content</LineNumbers>);
      
      const pre = getPreElement(container);
      expect(pre).toBeInTheDocument();
    });

    it('should render children as string', () => {
      const { container } = render(<LineNumbers>test code</LineNumbers>);
      
      const code = getCodeElement(container);
      expect(code?.textContent).toBe('test code');
    });

    it('should apply language-markdown class', () => {
      const { container } = render(<LineNumbers>code</LineNumbers>);
      
      const pre = getPreElement(container);
      const code = getCodeElement(container);
      
      expect(hasClass(pre, 'language-markdown')).toBe(true);
      expect(hasClass(code, 'language-markdown')).toBe(true);
    });

    it('should handle empty children', () => {
      const { container } = render(<LineNumbers>{''}</LineNumbers>);
      
      const code = container.querySelector('code');
      expect(code).toBeInTheDocument();
      expect(code?.textContent).toBe('');
    });

    it('should handle non-string children', () => {
      const { container } = render(
        <LineNumbers>{123 as any}</LineNumbers>
      );
      
      const code = container.querySelector('code');
      expect(code).toBeInTheDocument();
    });
  });

  describe('Line numbers display', () => {
    it('should add line-numbers class when showLineNumbers is true', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      expectPreClasses(container, ['line-numbers']);
    });

    it('should not add line-numbers class when showLineNumbers is false', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={false}>code</LineNumbers>
      );
      
      expectPreNotToHaveClasses(container, ['line-numbers']);
    });

    it('should render line numbers spans when showLineNumbers is true', () => {
      const code = 'line1\nline2\nline3';
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{code}</LineNumbers>
      );
      
      const lineNumbersSpan = getLineNumbersSpan(container);
      expect(lineNumbersSpan).toBeInTheDocument();
      expect(lineNumbersSpan?.children.length).toBe(3);
    });

    it('should not render line numbers spans when showLineNumbers is false', () => {
      const code = 'line1\nline2';
      const { container } = render(
        <LineNumbers showLineNumbers={false}>{code}</LineNumbers>
      );
      
      const lineNumbersSpan = getLineNumbersSpan(container);
      expect(lineNumbersSpan).not.toBeInTheDocument();
    });

    it('should handle multiline code', () => {
      const code = 'line1\nline2\nline3\nline4';
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{code}</LineNumbers>
      );
      
      const lineNumbersSpan = getLineNumbersSpan(container);
      expect(lineNumbersSpan?.children.length).toBe(4);
    });

    it('should set line numbers as non-interactive', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      const lineNumbersSpan = getLineNumbersSpan(container) as HTMLSpanElement;
      expect(lineNumbersSpan?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should leave the line number layout to the stylesheet', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{'line1\nline2'}</LineNumbers>
      );

      const lineNumbersSpan = getLineNumbersSpan(container) as HTMLSpanElement;
      expect(lineNumbersSpan.getAttribute('style')).toBeNull();
      expect(Array.from(lineNumbersSpan.children, number => number.getAttribute('style'))).toEqual([null, null]);
    });

    it('should leave the line number colour to the theme CSS', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>line1</LineNumbers>
      );

      const firstNumber = getLineNumbersSpan(container)?.children[0] as HTMLSpanElement;
      expect(firstNumber?.style.color).toBe('');
    });
  });

  describe('numbering', () => {
    it('should number lines from 1', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{'line1\nline2\nline3'}</LineNumbers>
      );

      const numbers = Array.from(getLineNumbersSpan(container)!.children, number => number.textContent);
      expect(numbers).toEqual(['1', '2', '3']);
    });
  });

  describe('className prop', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <LineNumbers className="custom-class">code</LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.className).toContain('custom-class');
    });

    it('should handle className trimming correctly', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={false} className="">
          code
        </LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.className).toBe('language-markdown');
    });

    it('should combine all classNames correctly', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} className="custom">
          code
        </LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.className).toBe('language-markdown line-numbers custom');
    });
  });

  describe('style prop', () => {
    it('should apply custom style', () => {
      const customStyle = { backgroundColor: 'red', fontSize: '14px' };
      const { container } = render(
        <LineNumbers style={customStyle}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.backgroundColor).toBe('red');
      expect(pre?.style.fontSize).toBe('14px');
    });

    it('should put only the custom style inline', () => {
      const { container } = render(
        <LineNumbers style={{ maxWidth: '500px' }}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.getAttribute('style')).toBe('max-width: 500px;');
    });

    it('should leave the line number padding to the stylesheet', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.paddingLeft).toBe('');
    });

    it('should not add paddingLeft when showLineNumbers is false', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={false}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.paddingLeft).toBe('');
    });
  });

  describe('pre attributes', () => {
    it('should pass other attributes through to the pre element', () => {
      const { container } = render(
        <LineNumbers id="code" aria-label="Code" data-testid="code-block">code</LineNumbers>
      );

      const pre = getPreElement(container);
      expect(pre?.id).toBe('code');
      expect(pre?.getAttribute('aria-label')).toBe('Code');
      expect(pre?.dataset.testid).toBe('code-block');
    });

    it('should pass preRef to the pre element', () => {
      const preRef = createRef<HTMLPreElement>();
      const { container } = render(<LineNumbers preRef={preRef}>code</LineNumbers>);

      expect(preRef.current).toBe(getPreElement(container));
    });

    it('should be focusable unless tabIndex says otherwise', () => {
      const { container: focusable } = render(<LineNumbers>code</LineNumbers>);
      const { container: unfocusable } = render(<LineNumbers tabIndex={-1}>code</LineNumbers>);

      expect(getPreElement(focusable)?.tabIndex).toBe(0);
      expect(getPreElement(unfocusable)?.tabIndex).toBe(-1);
    });
  });

  describe('topPadding prop', () => {
    it('should apply topPadding to line numbers', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} topPadding={32}>
          line1
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('32px');
    });

    it('should leave the default topPadding of 16px to the stylesheet', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>line1</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('');
      expect(container.querySelector('code')?.style.paddingTop).toBe('');
    });

    it('should handle topPadding of 0', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} topPadding={0}>
          line1
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('0px');
    });

    it('should handle large topPadding values', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} topPadding={160}>
          line1
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('160px');
    });
  });

  describe('Edge cases', () => {
    it('should handle code with only newlines', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{'\n\n\n'}</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      expect(lineNumbersSpan?.children.length).toBe(4); // Empty lines + 1
    });

    it('should handle very long single line', () => {
      const longLine = 'a'.repeat(10000);
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{longLine}</LineNumbers>
      );
      
      const code = container.querySelector('code');
      expect(code?.textContent).toBe(longLine);
    });

    it('should handle special characters in code', () => {
      const specialCode = '<div>&nbsp;"test"</div>';
      const { container } = render(
        <LineNumbers>{specialCode}</LineNumbers>
      );
      
      const code = container.querySelector('code');
      expect(code?.textContent).toBe(specialCode);
    });

    it('should handle Unicode characters', () => {
      const unicode = '你好世界 🚀 مرحبا';
      const { container } = render(
        <LineNumbers>{unicode}</LineNumbers>
      );
      
      const code = container.querySelector('code');
      expect(code?.textContent).toBe(unicode);
    });
  });

  describe('Prop combinations', () => {
    it('should handle all props together', () => {
      const code = 'line1\nline2\nline3';
      const customStyle = { backgroundColor: 'blue', maxHeight: '300px' };
      
      const { container } = render(
        <LineNumbers
          showLineNumbers={true}
          className="custom-code"
          style={customStyle}
          topPadding={24}
        >
          {code}
        </LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      
      expect(pre?.className).toContain('line-numbers');
      expect(pre?.className).toContain('custom-code');
      expect(pre?.style.backgroundColor).toBe('blue');
      expect(lineNumbersSpan?.children.length).toBe(3);
    });

    it('should handle minimal props', () => {
      const { container } = render(<LineNumbers>code</LineNumbers>);
      
      const pre = container.querySelector('pre');
      expect(pre).toBeInTheDocument();
      expect(pre?.className).toBe('language-markdown');
    });

    it('should update when props change', () => {
      const { container, rerender } = render(
        <LineNumbers showLineNumbers={false}>line1</LineNumbers>
      );
      
      let pre = container.querySelector('pre');
      expect(pre?.className).not.toContain('line-numbers');
      
      rerender(<LineNumbers showLineNumbers={true}>line1</LineNumbers>);
      
      pre = container.querySelector('pre');
      expect(pre?.className).toContain('line-numbers');
    });

    it('should update line numbers when code changes', () => {
      const { container, rerender } = render(
        <LineNumbers showLineNumbers={true}>line1</LineNumbers>
      );
      
      let lineNumbersSpan = container.querySelector('.line-numbers-rows');
      expect(lineNumbersSpan?.children.length).toBe(1);
      
      const newCode = 'line1\nline2\nline3';
      rerender(
        <LineNumbers showLineNumbers={true}>{newCode}</LineNumbers>
      );
      
      lineNumbersSpan = container.querySelector('.line-numbers-rows');
      expect(lineNumbersSpan?.children.length).toBeGreaterThan(1);
    });
  });
});
