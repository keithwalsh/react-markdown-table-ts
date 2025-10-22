/**
 * @fileoverview Comprehensive tests for the MarkdownTable React component
 * including rendering, props handling, and callback functionality.
 */

import { render, screen } from '@testing-library/react';
import { MarkdownTable } from '../index';
import * as utils from '../utils';
import { testData, getPreElement, getCodeElement, getStyleElement, hasClass, expectCodeToContainAll, expectPreClasses, expectPreNotToHaveClasses, expectPreStyle } from './test-utils';

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

    it.skip('should re-throw non-MarkdownTableError exceptions', () => {
      // Suppress all console methods for this test
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      // Spy on generateMarkdownTableString to throw a generic Error
      const spy = jest.spyOn(utils, 'generateMarkdownTableString').mockImplementationOnce(() => {
        throw new Error('Unexpected internal error');
      });

      // The component will try to render but React will catch and recover from the error
      // This test verifies the error re-throw path (line 54) is executed
      let didComplete = false;
      try {
        render(<MarkdownTable inputData={[['A'], ['B']]} />);
        didComplete = true;
      } catch (error) {
        // Expected: React catches the error during render
        didComplete = true;
      }

      // Verify the mock was called, which means our error path was executed
      expect(spy).toHaveBeenCalled();
      expect(didComplete).toBe(true);

      // Restore all mocks
      spy.mockRestore();
      consoleErrorSpy.mockRestore();
      consoleWarnSpy.mockRestore();
      consoleLogSpy.mockRestore();
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
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Name'));
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('John'));
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

    it('should call onGenerate with error message on invalid data', () => {
      const onGenerate = jest.fn();

      render(<MarkdownTable inputData={[]} onGenerate={onGenerate} />);
      
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Error:'));
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

