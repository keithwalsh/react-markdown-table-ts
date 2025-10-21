/**
 * @fileoverview Comprehensive tests for LineNumbers components, hooks, and
 * functionality including rendering, props handling, and resize behavior.
 */

import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';

// Unmock LineNumbers since we want to test the real implementation
jest.unmock('../LineNumbers');

import { LineNumbers, LineNumber, LineNumbersRows, useLineNumbers, useResizeObserver } from '../LineNumbers';

describe('LineNumbers', () => {
  describe('useResizeObserver hook', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should call callback on window resize', () => {
      const callback = jest.fn();
      renderHook(() => useResizeObserver(callback));

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should remove event listener on unmount', () => {
      const callback = jest.fn();
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      
      const { unmount } = renderHook(() => useResizeObserver(callback));
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      
      removeEventListenerSpy.mockRestore();
    });

    it('should handle multiple resize events', () => {
      const callback = jest.fn();
      renderHook(() => useResizeObserver(callback));

      act(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));
      });

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should update callback reference without recreating listener', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      
      const { rerender } = renderHook(
        ({ cb }) => useResizeObserver(cb),
        { initialProps: { cb: callback1 } }
      );

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).not.toHaveBeenCalled();

      rerender({ cb: callback2 });

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should respect dependency array', () => {
      const callback = jest.fn();
      const { rerender } = renderHook(
        ({ deps }) => useResizeObserver(callback, deps),
        { initialProps: { deps: ['dep1'] } }
      );

      rerender({ deps: ['dep2'] });

      // Verify no errors occur with deps change
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('useLineNumbers hook', () => {
    beforeEach(() => {
      // Mock getBoundingClientRect
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        width: 100,
        height: 20,
        top: 0,
        left: 0,
        bottom: 20,
        right: 100,
        x: 0,
        y: 0,
        toJSON: () => {}
      }));
    });

    it('should split code into lines', () => {
      const code = 'line1\nline2\nline3';
      const { result } = renderHook(() => useLineNumbers(code));

      expect(result.current.lines).toEqual(['line1', 'line2', 'line3']);
    });

    it('should generate line numbers starting from 1 by default', () => {
      const code = 'line1\nline2';
      const { result } = renderHook(() => useLineNumbers(code));

      expect(result.current.lineNumbers).toEqual([1, 2]);
    });

    it('should generate line numbers starting from custom startLine', () => {
      const code = 'line1\nline2\nline3';
      const { result } = renderHook(() => useLineNumbers(code, { startLine: 10 }));

      expect(result.current.lineNumbers).toEqual([10, 11, 12]);
    });

    it('should provide sizerRef', () => {
      const code = 'line1';
      const { result } = renderHook(() => useLineNumbers(code));

      expect(result.current.sizerRef).toBeDefined();
      expect(result.current.sizerRef.current).toBeNull();
    });

    it('should handle empty code', () => {
      const code = '';
      const { result } = renderHook(() => useLineNumbers(code));

      expect(result.current.lines).toEqual(['']);
      expect(result.current.lineNumbers).toEqual([1]);
    });

    it('should handle single line without newline', () => {
      const code = 'single line';
      const { result } = renderHook(() => useLineNumbers(code));

      expect(result.current.lines).toEqual(['single line']);
      expect(result.current.lineNumbers).toEqual([1]);
    });

    it('should not show line numbers when showLineNumbers is false', () => {
      const code = 'line1\nline2';
      const { result } = renderHook(() => 
        useLineNumbers(code, { showLineNumbers: false })
      );

      expect(result.current.lineHeights).toEqual([]);
    });

    it('should calculate line heights when showLineNumbers is true', async () => {
      const code = 'line1\nline2';
      
      const { result } = renderHook(() => 
        useLineNumbers(code, { showLineNumbers: true })
      );

      // Set up a mock ref
      const mockElement = document.createElement('span');
      Object.defineProperty(result.current.sizerRef, 'current', {
        value: mockElement,
        writable: true
      });

      act(() => {
        result.current.calculateLineHeights();
      });

      // Line heights should be calculated
      expect(result.current.lineHeights.length).toBeGreaterThan(0);
    });

    it('should handle code with trailing newline', () => {
      const code = 'line1\nline2\n';
      const { result } = renderHook(() => useLineNumbers(code));

      // The regex /\n(?!$)/g doesn't split on trailing newline, so it stays with last element
      expect(result.current.lines).toEqual(['line1', 'line2\n']);
    });

    it('should update when code changes', () => {
      const { result, rerender } = renderHook(
        ({ code }) => useLineNumbers(code),
        { initialProps: { code: 'line1' } }
      );

      expect(result.current.lines).toEqual(['line1']);

      rerender({ code: 'line1\nline2' });

      expect(result.current.lines).toEqual(['line1', 'line2']);
    });

    it('should provide calculateLineHeights function', () => {
      const code = 'line1';
      const { result } = renderHook(() => useLineNumbers(code));

      expect(typeof result.current.calculateLineHeights).toBe('function');
    });

    it('should not recalculate if content has not changed', () => {
      const code = 'line1\nline2';
      const { result, rerender } = renderHook(
        ({ code, show }) => useLineNumbers(code, { showLineNumbers: show }),
        { initialProps: { code, show: true } }
      );

      const mockElement = document.createElement('span');
      Object.defineProperty(result.current.sizerRef, 'current', {
        value: mockElement,
        writable: true
      });

      const spy = jest.spyOn(mockElement, 'appendChild');

      act(() => {
        result.current.calculateLineHeights();
      });

      const firstCallCount = spy.mock.calls.length;

      // Rerender with same code
      rerender({ code, show: true });

      // Should not recalculate
      expect(spy.mock.calls.length).toBe(firstCallCount);

      spy.mockRestore();
    });

    it('should handle empty lines in height calculation', () => {
      const code = 'line1\n\nline3';
      const { result } = renderHook(() => 
        useLineNumbers(code, { showLineNumbers: true })
      );

      const mockElement = document.createElement('span');
      Object.defineProperty(result.current.sizerRef, 'current', {
        value: mockElement,
        writable: true
      });

      act(() => {
        result.current.calculateLineHeights();
      });

      // Should calculate heights for empty lines too
      expect(result.current.lineHeights.length).toBe(3);
    });

    it('should not trigger calculation on resize when showLineNumbers is false', () => {
      const code = 'line1\nline2';
      const calculateSpy = jest.fn();
      
      renderHook(() => {
        const hook = useLineNumbers(code, { showLineNumbers: false });
        // Spy on the calculate function
        hook.calculateLineHeights = calculateSpy;
        return hook;
      });

      // Trigger resize
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      // Should not calculate when showLineNumbers is false
      expect(calculateSpy).not.toHaveBeenCalled();
    });
  });

  describe('LineNumber component', () => {
    it('should render line number', () => {
      const { container } = render(<LineNumber number={5} />);
      
      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span?.textContent).toBe('5');
    });

    it('should render with custom height', () => {
      const { container } = render(<LineNumber number={3} height={30} />);
      
      const span = container.querySelector('span') as HTMLSpanElement;
      expect(span.style.height).toBe('30px');
    });

    it('should render without height when not provided', () => {
      const { container } = render(<LineNumber number={1} />);
      
      const span = container.querySelector('span') as HTMLSpanElement;
      expect(span.style.height).toBe('');
    });

    it('should apply custom className', () => {
      const { container } = render(<LineNumber number={2} className="custom-line" />);
      
      const span = container.querySelector('span');
      expect(span?.className).toBe('custom-line');
    });

    it('should have empty className by default', () => {
      const { container } = render(<LineNumber number={1} />);
      
      const span = container.querySelector('span');
      expect(span?.className).toBe('');
    });

    it('should handle line number 0', () => {
      const { container } = render(<LineNumber number={0} />);
      
      const span = container.querySelector('span');
      expect(span?.textContent).toBe('0');
    });

    it('should handle large line numbers', () => {
      const { container } = render(<LineNumber number={9999} />);
      
      const span = container.querySelector('span');
      expect(span?.textContent).toBe('9999');
    });
  });

  describe('LineNumbersRows component', () => {
    it('should render line numbers for all lines', () => {
      const lines = ['line1', 'line2', 'line3'];
      const { container } = render(<LineNumbersRows lines={lines} />);
      
      const wrapper = container.querySelector('.line-numbers-rows');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.children).toHaveLength(3);
    });

    it('should start from custom startLine', () => {
      const lines = ['line1', 'line2'];
      const { container } = render(<LineNumbersRows lines={lines} startLine={5} />);
      
      const wrapper = container.querySelector('.line-numbers-rows');
      const firstNumber = wrapper?.children[0];
      const secondNumber = wrapper?.children[1];
      
      expect(firstNumber?.textContent).toBe('5');
      expect(secondNumber?.textContent).toBe('6');
    });

    it('should apply line heights when provided', () => {
      const lines = ['line1', 'line2'];
      const lineHeights = [25, 30];
      
      const { container } = render(
        <LineNumbersRows lines={lines} lineHeights={lineHeights} />
      );
      
      const wrapper = container.querySelector('.line-numbers-rows');
      const firstSpan = wrapper?.children[0] as HTMLSpanElement;
      const secondSpan = wrapper?.children[1] as HTMLSpanElement;
      
      expect(firstSpan?.style.height).toBe('25px');
      expect(secondSpan?.style.height).toBe('30px');
    });

    it('should use default className', () => {
      const lines = ['line1'];
      const { container } = render(<LineNumbersRows lines={lines} />);
      
      const wrapper = container.querySelector('.line-numbers-rows');
      expect(wrapper?.className).toBe('line-numbers-rows');
    });

    it('should apply custom className', () => {
      const lines = ['line1'];
      const { container } = render(
        <LineNumbersRows lines={lines} className="custom-rows" />
      );
      
      const wrapper = container.querySelector('.custom-rows');
      expect(wrapper).toBeInTheDocument();
    });

    it('should have aria-hidden attribute', () => {
      const lines = ['line1'];
      const { container } = render(<LineNumbersRows lines={lines} />);
      
      const wrapper = container.querySelector('.line-numbers-rows');
      expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should handle empty lines array', () => {
      const lines: string[] = [];
      const { container } = render(<LineNumbersRows lines={lines} />);
      
      const wrapper = container.querySelector('.line-numbers-rows');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.children).toHaveLength(0);
    });

    it('should handle single line', () => {
      const lines = ['single'];
      const { container } = render(<LineNumbersRows lines={lines} />);
      
      const wrapper = container.querySelector('.line-numbers-rows');
      expect(wrapper?.children).toHaveLength(1);
      expect(wrapper?.children[0]?.textContent).toBe('1');
    });

    it('should handle partial line heights array', () => {
      const lines = ['line1', 'line2', 'line3'];
      const lineHeights = [25]; // Only one height provided
      
      const { container } = render(
        <LineNumbersRows lines={lines} lineHeights={lineHeights} />
      );
      
      const wrapper = container.querySelector('.line-numbers-rows');
      expect(wrapper?.children).toHaveLength(3);
    });
  });

  describe('LineNumbers component', () => {
    it('should render without crashing', () => {
      const { container } = render(<LineNumbers>code content</LineNumbers>);
      
      const pre = container.querySelector('pre');
      expect(pre).toBeInTheDocument();
    });

    it('should render children as string', () => {
      const { container } = render(<LineNumbers>test code</LineNumbers>);
      
      const code = container.querySelector('code');
      expect(code?.textContent).toBe('test code');
    });

    it('should apply language-markdown class', () => {
      const { container } = render(<LineNumbers>code</LineNumbers>);
      
      const pre = container.querySelector('pre');
      const code = container.querySelector('code');
      
      expect(pre?.className).toContain('language-markdown');
      expect(code?.className).toContain('language-markdown');
    });

    it('should add line-numbers class when showLineNumbers is true', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.className).toContain('line-numbers');
    });

    it('should not add line-numbers class when showLineNumbers is false', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={false}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.className).not.toContain('line-numbers');
    });

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

    it('should apply custom className', () => {
      const { container } = render(
        <LineNumbers className="custom-class">code</LineNumbers>
      );
      
      const pre = container.querySelector('pre');
      expect(pre?.className).toContain('custom-class');
    });

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
      expect(pre?.style.paddingLeft).toBe('1.2em');
    });

    it('should not add paddingLeft when showLineNumbers is false', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={false}>code</LineNumbers>
      );
      
      const pre = container.querySelector('pre') as HTMLPreElement;
      expect(pre?.style.paddingLeft).toBe('');
    });

    it('should render line numbers spans when showLineNumbers is true', () => {
      const code = 'line1\nline2\nline3';
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{code}</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      expect(lineNumbersSpan).toBeInTheDocument();
      expect(lineNumbersSpan?.children.length).toBe(3);
    });

    it('should not render line numbers spans when showLineNumbers is false', () => {
      const code = 'line1\nline2';
      const { container } = render(
        <LineNumbers showLineNumbers={false}>{code}</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      expect(lineNumbersSpan).not.toBeInTheDocument();
    });

    it('should apply topPadding to line numbers', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} topPadding={32}>
          line1
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('3em'); // 1 + (32/16) = 3
    });

    it('should use default topPadding of 16px', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>line1</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('2em'); // 1 + (16/16) = 2
    });

    it('should handle multiline code', () => {
      const code = 'line1\nline2\nline3\nline4';
      const { container } = render(
        <LineNumbers showLineNumbers={true}>{code}</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      expect(lineNumbersSpan?.children.length).toBe(4);
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

    it('should position line numbers absolutely', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.position).toBe('absolute');
    });

    it('should set line numbers as non-interactive', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>code</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.pointerEvents).toBe('none');
      expect(lineNumbersSpan?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should apply correct line number styling', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true}>line1</LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.fontSize).toBe('100%');
      expect(lineNumbersSpan?.style.userSelect).toBe('none');
      expect(lineNumbersSpan?.style.borderRight).toBe('1px solid #999');
    });

    it('should display line numbers with correct alignment', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} startLine={1}>
          line1\nline2
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows');
      const firstNumber = lineNumbersSpan?.children[0] as HTMLSpanElement;
      
      expect(firstNumber?.style.textAlign).toBe('right');
      expect(firstNumber?.style.display).toBe('block');
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

  describe('edge cases', () => {
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

    it('should handle topPadding of 0', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} topPadding={0}>
          line1
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('1em'); // 1 + (0/16) = 1
    });

    it('should handle large topPadding values', () => {
      const { container } = render(
        <LineNumbers showLineNumbers={true} topPadding={160}>
          line1
        </LineNumbers>
      );
      
      const lineNumbersSpan = container.querySelector('.line-numbers-rows') as HTMLSpanElement;
      expect(lineNumbersSpan?.style.top).toBe('11em'); // 1 + (160/16) = 11
    });
  });

  describe('prop combinations', () => {
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
      
      // Need to pass code with escaped newlines as separate string
      const newCode = 'line1\nline2\nline3';
      rerender(
        <LineNumbers showLineNumbers={true}>{newCode}</LineNumbers>
      );
      
      lineNumbersSpan = container.querySelector('.line-numbers-rows');
      // The component parses the code and should now have 3 lines
      expect(lineNumbersSpan?.children.length).toBeGreaterThan(1);
    });
  });
});

