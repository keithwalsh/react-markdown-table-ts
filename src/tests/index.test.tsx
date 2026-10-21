/**
 * @fileoverview Comprehensive tests for the MarkdownTable React component
 * including rendering, props handling, and callback functionality.
 */

import { Component, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MarkdownTable, MarkdownTableError } from '../index';
import * as utils from '../utils';
import { testData, getPreElement, getCodeElement, getStyleElement, hasClass, expectCodeToContainAll, expectPreClasses, expectPreNotToHaveClasses, expectPreStyle } from './test-utils';

class ErrorBoundary extends Component<{ children: ReactNode; onError: (error: Error) => void }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

describe('MarkdownTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render without crashing with minimal props', () => {
      render(<MarkdownTable />);
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });

    it('should render with valid data', () => {
      const { container } = render(<MarkdownTable inputData={testData.withHeader} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      expectCodeToContainAll(container, 'Name', 'Age', 'John', '30');
    });

    it('should render table with alphabet headers when hasHeader is false', () => {
      const { container } = render(<MarkdownTable inputData={testData.threeColumn} hasHeader={false} />);
      
      expectCodeToContainAll(container, 'A', 'B', 'C');
    });

    it('should render with null inputData', () => {
      render(<MarkdownTable inputData={null} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.textContent).toContain('Error:');
    });

    it('should render error message for invalid data', () => {
      render(<MarkdownTable inputData={[]} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('Error:');
      expect(codeElement.textContent).toContain('must contain at least one row');
    });

    it('should render an error message for a row that is not an array', () => {
      const onGenerate = jest.fn();

      render(<MarkdownTable inputData={[['A'], null as any]} onGenerate={onGenerate} />);

      expect(screen.getByRole('code').textContent).toBe(
        "Error: The 'inputData' prop must be a two-dimensional array, but inputData[1] is null."
      );
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Error:'), expect.any(MarkdownTableError));
    });

    it('should render an error message for an unknown column alignment', () => {
      render(<MarkdownTable inputData={testData.simple} columnAlignments={['middle' as any]} />);

      expect(screen.getByRole('code').textContent).toContain("columnAlignments[0] is 'middle'.");
    });

    it('should render an error message when column alignments are not an array', () => {
      render(<MarkdownTable inputData={testData.simple} columnAlignments={'left' as any} />);

      expect(screen.getByRole('code').textContent).toBe("Error: The 'columnAlignments' prop must be an array.");
    });

    it('should re-throw non-MarkdownTableError exceptions to the nearest error boundary', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const spy = jest.spyOn(utils, 'generateMarkdownTableString').mockImplementation(() => {
        throw new Error('Unexpected internal error');
      });
      const onError = jest.fn();

      render(
        <ErrorBoundary onError={onError}>
          <MarkdownTable inputData={testData.simple} />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unexpected internal error' }));
      spy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('alignment props', () => {
    const data = [
      ['Left', 'Center', 'Right'],
      ['A', 'B', 'C'],
    ];

    it('should apply left alignment', () => {
      render(<MarkdownTable inputData={data} columnAlignments={['left']} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toMatch(/:-+/);
    });

    it('should apply center alignment', () => {
      render(<MarkdownTable inputData={data} columnAlignments={['none', 'center']} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toMatch(/:-+:/);
    });

    it('should apply right alignment', () => {
      render(<MarkdownTable inputData={data} columnAlignments={['none', 'none', 'right']} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toMatch(/-+:/);
    });

    it('should handle multiple alignments', () => {
      render(
        <MarkdownTable 
          inputData={data} 
          columnAlignments={['left', 'center', 'right']} 
        />
      );
      
      const codeElement = screen.getByRole('code');
      const content = codeElement.textContent || '';
      
      expect(content).toMatch(/:-+/);  // left
      expect(content).toMatch(/:-+:/); // center
      expect(content).toMatch(/-+:/);  // right
    });
  });

  describe('formatting options', () => {
    const data = [
      ['Header1', 'Header2'],
      ['Value1', 'Value2'],
    ];

    it('should generate compact table when isCompact is true', () => {
      const { container } = render(
        <MarkdownTable inputData={data} isCompact={true} />
      );
      
      const codeElement = container.querySelector('code');
      expect(codeElement).toBeInTheDocument();
    });

    it('should add tabs when hasTabs is true', () => {
      render(<MarkdownTable inputData={data} hasTabs={true} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('\t');
    });

    it('should not add tabs when hasTabs is false', () => {
      render(<MarkdownTable inputData={data} hasTabs={false} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).not.toContain('\t');
    });

    it('should add padding by default', () => {
      render(<MarkdownTable inputData={data} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toMatch(/\|\s+\w+\s+\|/);
    });

    it('should not add padding when hasPadding is false', () => {
      render(<MarkdownTable inputData={data} hasPadding={false} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('|Header1|Header2|');
    });

    it('should replace newlines when convertLineBreaks is true', () => {
      const dataWithNewlines = [
        ['Header'],
        ['Line1\nLine2'],
      ];

      render(<MarkdownTable inputData={dataWithNewlines} convertLineBreaks={true} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('<br>');
    });

    it('should not replace newlines when convertLineBreaks is false', () => {
      const dataWithNewlines = [
        ['Header'],
        ['Line1\nLine2'],
      ];

      render(<MarkdownTable inputData={dataWithNewlines} convertLineBreaks={false} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).not.toContain('<br>');
    });
  });

  describe('theme prop', () => {
    it('should apply light theme by default', () => {
      const { container } = render(<MarkdownTable inputData={testData.twoColumn} />);
      
      expectPreNotToHaveClasses(container, ['dark-theme']);
    });

    it('should apply dark theme when specified', () => {
      const { container } = render(<MarkdownTable inputData={testData.twoColumn} theme="dark" />);
      
      expectPreClasses(container, ['dark-theme']);
    });

    it('should inject light theme CSS', () => {
      const { container } = render(<MarkdownTable inputData={testData.twoColumn} theme="light" />);
      
      const styleElement = getStyleElement(container);
      expect(styleElement?.textContent).toContain('code[class*=language-]');
    });

    it('should inject dark theme CSS', () => {
      const { container } = render(<MarkdownTable inputData={testData.twoColumn} theme="dark" />);
      
      const styleElement = getStyleElement(container);
      expect(styleElement?.textContent).toContain('code[class*=language-]');
    });

    it('should use a dark selection background so selected dark theme text stays readable', () => {
      const { container } = render(<MarkdownTable inputData={testData.twoColumn} theme="dark" />);

      const css = getStyleElement(container)?.textContent;
      expect(css).toContain('background: #44475a;');
      expect(css).not.toContain('#b3d4fc');
    });

    it('should colour line numbers for at least 4.5:1 contrast in each theme', () => {
      const { container: light } = render(<MarkdownTable inputData={testData.twoColumn} theme="light" />);
      const { container: dark } = render(<MarkdownTable inputData={testData.twoColumn} theme="dark" />);

      expect(getStyleElement(light)?.textContent).toContain('.line-numbers-rows {\n  color: #6e6e6e;\n}');
      expect(getStyleElement(dark)?.textContent).toContain('.line-numbers-rows {\n  color: #999;\n}');
    });
  });

  describe('className prop', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <MarkdownTable inputData={testData.simple} className="custom-class" />
      );
      
      expectPreClasses(container, ['custom-class']);
    });

    it('should combine custom className with default classes', () => {
      const { container } = render(
        <MarkdownTable inputData={testData.simple} className="custom-class" />
      );
      
      const preElement = getPreElement(container);
      const codeElement = getCodeElement(container);
      expect(hasClass(preElement, 'custom-class')).toBe(true);
      expect(hasClass(preElement, 'line-numbers')).toBe(true);
      expect(hasClass(codeElement, 'language-markdown')).toBe(true);
    });

    it('should work without custom className', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);
      
      expectPreClasses(container, ['line-numbers']);
      const codeElement = getCodeElement(container);
      expect(hasClass(codeElement, 'language-markdown')).toBe(true);
    });
  });

  describe('showLineNumbers prop', () => {
    it('should include line-numbers class by default', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);
      
      expectPreClasses(container, ['line-numbers']);
    });

    it('should include line-numbers class when showLineNumbers is true', () => {
      const { container } = render(
        <MarkdownTable inputData={testData.simple} showLineNumbers={true} />
      );
      
      expectPreClasses(container, ['line-numbers']);
    });

    it('should not include line-numbers class when showLineNumbers is false', () => {
      const { container } = render(
        <MarkdownTable inputData={testData.simple} showLineNumbers={false} />
      );
      
      expectPreNotToHaveClasses(container, ['line-numbers']);
    });
  });

  describe('preStyle prop', () => {
    it('should apply custom styles to pre element', () => {
      const customStyle = {
        maxHeight: '300px',
        backgroundColor: '#f5f5f5',
      };

      const { container } = render(
        <MarkdownTable inputData={testData.simple} preStyle={customStyle} />
      );
      
      const preElement = getPreElement(container) as HTMLPreElement;
      expect(preElement.style.maxHeight).toBe('300px');
      // Browser converts hex to rgb, so check if backgroundColor is set
      expect(preElement.style.backgroundColor).toBeTruthy();
    });

    it('should maintain default styles with custom preStyle', () => {
      const { container } = render(
        <MarkdownTable inputData={testData.simple} preStyle={{ maxHeight: '500px' }} />
      );
      
      expectPreStyle(container, { maxHeight: '500px', margin: '0px' });
    });

    it('should not use !important so preStyle can override any padding', () => {
      const { container } = render(
        <MarkdownTable inputData={testData.simple} preStyle={{ padding: 0 }} />
      );

      expect(getStyleElement(container)?.textContent).not.toContain('!important');
      expectPreStyle(container, { paddingRight: '0px', paddingBottom: '0px' });
    });
  });

  describe('topPadding prop', () => {
    it('should render with default top padding', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);
      
      const codeElement = getCodeElement(container);
      expect(codeElement).toBeTruthy();
      expect(codeElement?.className).toContain('language-markdown');
    });

    it('should render with custom top padding', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} topPadding={32} />);
      
      const codeElement = getCodeElement(container);
      expect(codeElement).toBeTruthy();
    });

    it('should render with zero top padding', () => {
      const { container} = render(<MarkdownTable inputData={testData.simple} topPadding={0} />);
      
      const codeElement = getCodeElement(container);
      expect(codeElement).toBeTruthy();
    });
  });

  describe('minWidth prop', () => {
    it('should apply minWidth when specified', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} minWidth={400} />);
      
      expectPreStyle(container, { minWidth: '400px' });
    });

    it('should use min-content when minWidth is not specified', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);
      
      expectPreStyle(container, { minWidth: 'min-content' });
    });
  });

  describe('onGenerate callback', () => {
    it('should call onGenerate with generated markdown', () => {
      const onGenerate = jest.fn();

      render(<MarkdownTable inputData={testData.withHeader} onGenerate={onGenerate} />);
      
      expect(onGenerate).toHaveBeenCalledTimes(1);
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Name'), null);
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('John'), null);
    });

    it('should call onGenerate when data changes', () => {
      const onGenerate = jest.fn();

      const { rerender } = render(
        <MarkdownTable inputData={testData.simple} onGenerate={onGenerate} />
      );
      
      expect(onGenerate).toHaveBeenCalledTimes(1);

      rerender(<MarkdownTable inputData={testData.twoColumn} onGenerate={onGenerate} />);
      
      expect(onGenerate).toHaveBeenCalledTimes(2);
    });

    it('should call onGenerate with error message and error on invalid data', () => {
      const onGenerate = jest.fn();

      render(<MarkdownTable inputData={[]} onGenerate={onGenerate} />);

      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Error:'), expect.any(MarkdownTableError));
      expect(onGenerate.mock.calls[0][1].message).toBe("The 'inputData' array must contain at least one row.");
    });

    it('should not call onGenerate again when only the callback changes', () => {
      const firstCallback = jest.fn();
      const secondCallback = jest.fn();

      const { rerender } = render(<MarkdownTable inputData={testData.simple} onGenerate={firstCallback} />);
      rerender(<MarkdownTable inputData={testData.simple} onGenerate={secondCallback} />);

      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).not.toHaveBeenCalled();
    });

    it('should call the latest onGenerate when the table changes', () => {
      const firstCallback = jest.fn();
      const secondCallback = jest.fn();

      const { rerender } = render(<MarkdownTable inputData={testData.simple} onGenerate={firstCallback} />);
      rerender(<MarkdownTable inputData={testData.twoColumn} onGenerate={secondCallback} />);

      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).toHaveBeenCalledTimes(1);
    });

    it('should work without onGenerate callback', () => {
      expect(() => {
        render(<MarkdownTable inputData={testData.simple} />);
      }).not.toThrow();
    });
  });

  describe('React component integration', () => {
    it('should render CodeBlock component with correct props', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);
      
      const preElement = getPreElement(container);
      const codeElement = getCodeElement(container);
      
      expect(preElement).toBeInTheDocument();
      expect(hasClass(codeElement, 'language-markdown')).toBe(true);
    });

    it('should render with line numbers when showLineNumbers is true', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} showLineNumbers={true} />);
      
      expectPreClasses(container, ['line-numbers']);
    });

    it('should render without line numbers when showLineNumbers is false', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} showLineNumbers={false} />);
      
      expectPreNotToHaveClasses(container, ['line-numbers']);
    });
  });

  describe('useDeferredValue optimisation', () => {
    it('should render with deferred input data', () => {
      const { container } = render(<MarkdownTable inputData={testData.twoColumn} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      expectCodeToContainAll(container, 'A');
    });

    it('should not regenerate the table when re-rendered with equal props', () => {
      const spy = jest.spyOn(utils, 'generateMarkdownTableString');

      const { rerender } = render(
        <MarkdownTable inputData={testData.twoColumn} columnAlignments={['left', 'right']} />
      );
      const callsAfterMount = spy.mock.calls.length;
      rerender(<MarkdownTable inputData={testData.twoColumn} columnAlignments={['left', 'right']} />);

      expect(callsAfterMount).toBe(1);
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('should regenerate the table when column alignments change', () => {
      const spy = jest.spyOn(utils, 'generateMarkdownTableString');

      const { rerender } = render(<MarkdownTable inputData={testData.twoColumn} columnAlignments={['left']} />);
      rerender(<MarkdownTable inputData={testData.twoColumn} columnAlignments={['right']} />);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(screen.getByRole('code').textContent).toContain('| --: |');
      spy.mockRestore();
    });

    it('should handle rapid data updates', () => {
      const { rerender } = render(<MarkdownTable inputData={testData.simple} />);
      rerender(<MarkdownTable inputData={testData.twoColumn} />);
      rerender(<MarkdownTable inputData={testData.threeColumn} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });
  });

  describe('DOM structure', () => {
    it('should render with correct pre element structure', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);
      
      const preElement = getPreElement(container);
      expect(preElement).toBeInTheDocument();
      expect(preElement?.style.position).toBe('relative');
      expect(preElement?.style.isolation).toBe('isolate');
      expect(preElement?.style.display).toBe('inline-block');
    });

    it('should render pre element', () => {
      const { container: container1 } = render(<MarkdownTable inputData={testData.simple} />);
      const { container: container2 } = render(<MarkdownTable inputData={testData.simple} />);
      
      const pre1 = container1.querySelector('pre');
      const pre2 = container2.querySelector('pre');
      
      expect(pre1).toBeTruthy();
      expect(pre2).toBeTruthy();
    });

    it('should contain code element inside pre', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);
      
      const preElement = getPreElement(container);
      const codeElement = preElement?.querySelector('code');
      
      expect(codeElement).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle very large datasets', () => {
      const largeData = Array.from({ length: 100 }, (_, i) => [
        `Col1-${i}`,
        `Col2-${i}`,
        `Col3-${i}`,
      ]);

      expect(() => {
        render(<MarkdownTable inputData={largeData} />);
      }).not.toThrow();
    });

    it('should handle single cell table', () => {
      const data = [['SingleCell']];

      render(<MarkdownTable inputData={data} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('SingleCell');
    });

    it('should handle empty strings in cells', () => {
      render(<MarkdownTable inputData={testData.empty} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      render(<MarkdownTable inputData={testData.specialChars} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });

    it('should handle undefined props gracefully', () => {
      expect(() => {
        render(<MarkdownTable />);
      }).not.toThrow();
    });
  });

  describe('prop combinations', () => {
    const data = [
      ['Name', 'Description'],
      ['Item1', 'First item'],
      ['Item2', 'Second item'],
    ];

    it('should handle all formatting options together', () => {
      render(
        <MarkdownTable
          inputData={data}
          hasHeader={true}
          columnAlignments={['left', 'center']}
          isCompact={false}
          hasTabs={true}
          hasPadding={true}
          convertLineBreaks={true}
        />
      );
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });

    it('should handle minimal configuration', () => {
      render(<MarkdownTable inputData={data} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });

    it('should handle maximum customisation', () => {
      const onGenerate = jest.fn();

      render(
        <MarkdownTable
          inputData={data}
          hasHeader={false}
          columnAlignments={['right', 'center']}
          isCompact={true}
          hasTabs={false}
          hasPadding={false}
          convertLineBreaks={true}
          className="custom-class"
          onGenerate={onGenerate}
          theme="dark"
          preStyle={{ maxHeight: '200px' }}
          topPadding={24}
          minWidth={500}
        />
      );
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      expect(onGenerate).toHaveBeenCalled();
    });
  });
});

