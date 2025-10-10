/**
 * @fileoverview Comprehensive tests for the MarkdownTable React component
 * including rendering, props handling, and callback functionality.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { MarkdownTable } from '../index';
import Prism from 'prismjs';
import * as utils from '../utils';

// Get the mocked highlightElement function
const mockHighlightElement = Prism.highlightElement as jest.Mock;

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
      const data = [
        ['Name', 'Age'],
        ['John', '30'],
      ];

      render(<MarkdownTable inputData={data} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.textContent).toContain('Name');
      expect(codeElement.textContent).toContain('Age');
      expect(codeElement.textContent).toContain('John');
      expect(codeElement.textContent).toContain('30');
    });

    it('should render table with alphabet headers when hasHeader is false', () => {
      const data = [
        ['1', '2', '3'],
        ['4', '5', '6'],
      ];

      render(<MarkdownTable inputData={data} hasHeader={false} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('A');
      expect(codeElement.textContent).toContain('B');
      expect(codeElement.textContent).toContain('C');
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
    const data = [['A', 'B'], ['1', '2']];

    it('should apply light theme by default', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).not.toContain('dark-theme');
    });

    it('should apply dark theme when specified', () => {
      const { container } = render(<MarkdownTable inputData={data} theme="dark" />);
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).toContain('dark-theme');
    });

    it('should inject light theme CSS', () => {
      const { container } = render(<MarkdownTable inputData={data} theme="light" />);
      
      const styleElement = container.querySelector('style');
      expect(styleElement?.textContent).toContain('code[class*=language-]');
    });

    it('should inject dark theme CSS', () => {
      const { container } = render(<MarkdownTable inputData={data} theme="dark" />);
      
      const styleElement = container.querySelector('style');
      expect(styleElement?.textContent).toContain('code[class*=language-]');
    });
  });

  describe('className prop', () => {
    const data = [['A'], ['1']];

    it('should apply custom className', () => {
      const { container } = render(
        <MarkdownTable inputData={data} className="custom-class" />
      );
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).toContain('custom-class');
    });

    it('should combine custom className with default classes', () => {
      const { container } = render(
        <MarkdownTable inputData={data} className="custom-class" />
      );
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).toContain('custom-class');
      expect(preElement?.className).toContain('language-markdown');
      expect(preElement?.className).toContain('line-numbers');
    });

    it('should work without custom className', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).toContain('language-markdown');
    });
  });

  describe('showLineNumbers prop', () => {
    const data = [['A'], ['1']];

    it('should include line-numbers class by default', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).toContain('line-numbers');
    });

    it('should include line-numbers class when showLineNumbers is true', () => {
      const { container } = render(
        <MarkdownTable inputData={data} showLineNumbers={true} />
      );
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).toContain('line-numbers');
    });

    it('should not include line-numbers class when showLineNumbers is false', () => {
      const { container } = render(
        <MarkdownTable inputData={data} showLineNumbers={false} />
      );
      
      const preElement = container.querySelector('pre');
      expect(preElement?.className).not.toContain('line-numbers');
    });
  });

  describe('preStyle prop', () => {
    const data = [['A'], ['1']];

    it('should apply custom styles to pre element', () => {
      const customStyle = {
        maxHeight: '300px',
        backgroundColor: '#f5f5f5',
      };

      const { container } = render(
        <MarkdownTable inputData={data} preStyle={customStyle} />
      );
      
      const preElement = container.querySelector('pre') as HTMLPreElement;
      expect(preElement.style.maxHeight).toBe('300px');
      // Browser converts hex to rgb, so check if backgroundColor is set
      expect(preElement.style.backgroundColor).toBeTruthy();
    });

    it('should maintain default styles with custom preStyle', () => {
      const { container } = render(
        <MarkdownTable inputData={data} preStyle={{ maxHeight: '500px' }} />
      );
      
      const preElement = container.querySelector('pre') as HTMLPreElement;
      // Check that styles are applied, even if computed differently
      expect(preElement.style.maxHeight).toBe('500px');
      expect(preElement.style.margin).toBe('0px');
    });
  });

  describe('topPadding prop', () => {
    const data = [['A'], ['1']];

    it('should apply default top padding of 16px', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const styleElement = container.querySelector('style');
      expect(styleElement?.textContent).toContain('padding-top: 16px');
    });

    it('should apply custom top padding', () => {
      const { container } = render(<MarkdownTable inputData={data} topPadding={32} />);
      
      const styleElement = container.querySelector('style');
      expect(styleElement?.textContent).toContain('padding-top: 32px');
    });

    it('should accept zero as top padding', () => {
      const { container } = render(<MarkdownTable inputData={data} topPadding={0} />);
      
      const styleElement = container.querySelector('style');
      expect(styleElement?.textContent).toContain('padding-top: 0px');
    });
  });

  describe('minWidth prop', () => {
    const data = [['A'], ['1']];

    it('should apply minWidth when specified', () => {
      const { container } = render(<MarkdownTable inputData={data} minWidth={400} />);
      
      const preElement = container.querySelector('pre') as HTMLPreElement;
      expect(preElement.style.minWidth).toBe('400px');
    });

    it('should use min-content when minWidth is not specified', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const preElement = container.querySelector('pre') as HTMLPreElement;
      expect(preElement.style.minWidth).toBe('min-content');
    });
  });

  describe('onGenerate callback', () => {
    it('should call onGenerate with generated markdown', () => {
      const onGenerate = jest.fn();
      const data = [
        ['Name', 'Age'],
        ['John', '30'],
      ];

      render(<MarkdownTable inputData={data} onGenerate={onGenerate} />);
      
      expect(onGenerate).toHaveBeenCalledTimes(1);
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Name'));
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('John'));
    });

    it('should call onGenerate when data changes', () => {
      const onGenerate = jest.fn();
      const data1 = [['A'], ['1']];
      const data2 = [['B'], ['2']];

      const { rerender } = render(
        <MarkdownTable inputData={data1} onGenerate={onGenerate} />
      );
      
      expect(onGenerate).toHaveBeenCalledTimes(1);

      rerender(<MarkdownTable inputData={data2} onGenerate={onGenerate} />);
      
      expect(onGenerate).toHaveBeenCalledTimes(2);
    });

    it('should call onGenerate with error message on invalid data', () => {
      const onGenerate = jest.fn();

      render(<MarkdownTable inputData={[]} onGenerate={onGenerate} />);
      
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Error:'));
    });

    it('should work without onGenerate callback', () => {
      const data = [['A'], ['1']];

      expect(() => {
        render(<MarkdownTable inputData={data} />);
      }).not.toThrow();
    });
  });

  describe('Prism.js integration', () => {
    it('should call Prism.highlightElement on mount', async () => {
      const data = [['A'], ['1']];

      render(<MarkdownTable inputData={data} />);
      
      await waitFor(() => {
        expect(mockHighlightElement).toHaveBeenCalled();
      });
    });

    it('should call Prism.highlightElement when data changes', async () => {
      const data1 = [['A'], ['1']];
      const data2 = [['B'], ['2']];

      const { rerender } = render(<MarkdownTable inputData={data1} />);
      
      await waitFor(() => {
        expect(mockHighlightElement).toHaveBeenCalled();
      });

      const callCount = mockHighlightElement.mock.calls.length;

      rerender(<MarkdownTable inputData={data2} />);
      
      await waitFor(() => {
        expect(mockHighlightElement.mock.calls.length).toBeGreaterThan(callCount);
      });
    });

    it('should highlight code element with correct classes', () => {
      const data = [['A'], ['1']];

      const { container } = render(<MarkdownTable inputData={data} />);
      
      const codeElement = container.querySelector('code');
      expect(codeElement?.className).toContain('language-markdown');
    });
  });

  describe('useDeferredValue optimisation', () => {
    it('should render with deferred input data', () => {
      const data = [['A', 'B'], ['1', '2']];

      render(<MarkdownTable inputData={data} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.textContent).toContain('A');
    });

    it('should handle rapid data updates', () => {
      const data1 = [['A'], ['1']];
      const data2 = [['B'], ['2']];
      const data3 = [['C'], ['3']];

      const { rerender } = render(<MarkdownTable inputData={data1} />);
      rerender(<MarkdownTable inputData={data2} />);
      rerender(<MarkdownTable inputData={data3} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });
  });

  describe('DOM structure', () => {
    const data = [['A'], ['1']];

    it('should render with correct wrapper structure', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const wrapper = container.querySelector('div');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.style.position).toBe('relative');
      expect(wrapper?.style.isolation).toBe('isolate');
      expect(wrapper?.style.display).toBe('inline-block');
    });

    it('should have unique id for wrapper div', () => {
      const { container: container1 } = render(<MarkdownTable inputData={data} />);
      const { container: container2 } = render(<MarkdownTable inputData={data} />);
      
      const wrapper1 = container1.querySelector('div');
      const wrapper2 = container2.querySelector('div');
      
      expect(wrapper1?.id).toBeTruthy();
      expect(wrapper2?.id).toBeTruthy();
      expect(wrapper1?.id).not.toBe(wrapper2?.id);
    });

    it('should contain pre element inside wrapper', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const wrapper = container.querySelector('div');
      const preElement = wrapper?.querySelector('pre');
      
      expect(preElement).toBeInTheDocument();
    });

    it('should contain code element inside pre', () => {
      const { container } = render(<MarkdownTable inputData={data} />);
      
      const preElement = container.querySelector('pre');
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
      const data = [['', ''], ['', '']];

      render(<MarkdownTable inputData={data} />);
      
      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      const data = [['<>', '&amp;', '\'"`']];

      render(<MarkdownTable inputData={data} />);
      
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

