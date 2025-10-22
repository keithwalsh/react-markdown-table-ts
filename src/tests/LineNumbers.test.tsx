/**
 * @fileoverview Comprehensive tests for the LineNumbers component including
 * rendering, props handling, styling, and edge cases.
 */

import { render } from '@testing-library/react';
import { getPreElement, getCodeElement, getLineNumbersSpan, hasClass, expectPreClasses, expectPreNotToHaveClasses } from './test-utils';

// Unmock LineNumbers since we want to test the real implementation
jest.unmock('../LineNumbers');

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
      expect(lineNumbersSpan?.style.pointerEvents).toBe('none');
      expect(lineNumbersSpan?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should position line numbers absolutely', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      const lineNumbersSpan = getLineNumbersSpan(container) as HTMLSpanElement;
      expect(lineNumbersSpan?.style.position).toBe('absolute');
    });

    it('should apply correct line number styling', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>line1</LineNumbers>
      );
      
      const lineNumbersSpan = getLineNumbersSpan(container) as HTMLSpanElement;
      expect(lineNumbersSpan?.style.fontSize).toBe('100%');
      expect(lineNumbersSpan?.style.userSelect).toBe('none');
      expect(lineNumbersSpan?.style.borderRight).toBe('1px solid #999');
    });

    it('should display line numbers with correct alignment', () => {
      const code = 'line1\nline2';
      const { container } = render(
        <LineNumbers showLineNumbers={true} startLine={1}>
          {code}
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      const firstNumber = lineNumbersSpan?.children[0] as HTMLSpanElement;
      
      expect(firstNumber?.style.textAlign).toBe('right');
      expect(firstNumber?.style.display).toBe('block');
    });
  });

  describe('startLine prop', () => {
    it('should set data-start attribute with custom startLine', () => {
      const { container } = render(
        <LineNumbers startLine={10}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.getAttribute('data-start')).toBe('10');
    });

    it('should default startLine to 1', () => {
      const { container } = render(<LineNumbers>code</LineNumbers>);
      
      const pre = container.querySelector('pre');
      expect(pre?.getAttribute('data-start')).toBe('1');
    });

    it('should set counter-reset style', () => {
      const { container } = render(
        <LineNumbers startLine={5}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.counterReset).toBe('linenumber 4');
    });

    it('should handle zero as startLine', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} startLine={0}>
          line1
        </LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.getAttribute('data-start')).toBe('0');
    });

    it('should handle negative startLine', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} startLine={-5}>
          line1
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      const firstNumber = lineNumbersSpan?.children[0];
      expect(firstNumber?.textContent).toBe('-5');
    });

    it('should display correct line numbers for custom startLine', () => {
      const code = 'line1\nline2\nline3';
      const { container } = render(
        <LineNumbers showLineNumbers={true} startLine={10}>
          {code}
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      const firstNumber = lineNumbersSpan?.children[0];
      const secondNumber = lineNumbersSpan?.children[1];
      const thirdNumber = lineNumbersSpan?.children[2];
      
      expect(firstNumber?.textContent).toBe('10');
      expect(secondNumber?.textContent).toBe('11');
      expect(thirdNumber?.textContent).toBe('12');
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

    it('should merge custom style with default styles', () => {
      const { container } = render(
        <LineNumbers style={{ maxWidth: '500px' }}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.position).toBe('relative');
      expect(pre?.style.maxWidth).toBe('500px');
    });

    it('should add paddingLeft when showLineNumbers is true', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.paddingLeft).toBe('3.8em');
    });

    it('should not add paddingLeft when showLineNumbers is false', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={false}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.paddingLeft).toBe('');
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

    it('should use default topPadding of 16px', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>line1</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('16px');
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
          startLine={10}
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
      expect(pre?.getAttribute('data-start')).toBe('10');
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
