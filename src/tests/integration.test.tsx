/**
 * @fileoverview Integration tests that verify the complete workflow from data
 * input through markdown generation to component rendering.
 */

import { render, screen } from '@testing-library/react';
import { MarkdownTable } from '../index';
import { testData, getStyleElement, expectCodeToContainAll, expectPreClasses, expectPreNotToHaveClasses, expectUniformColumnCount } from './test-utils';

describe('Integration Tests', () => {
  describe('complete data flow', () => {
    it('should transform input data into valid markdown table', () => {
      const inputData = [
        ['Product', 'Price', 'Quantity'],
        ['Apple', '$1.50', '10'],
        ['Banana', '$0.75', '15'],
        ['Orange', '$2.00', '8'],
      ];

      const onGenerate = jest.fn();

      render(
        <MarkdownTable
          inputData={inputData}
          hasHeader={true}
          columnAlignments={['left', 'right', 'center']}
          onGenerate={onGenerate}
        />
      );

      expect(onGenerate).toHaveBeenCalledTimes(1);
      
      const generatedMarkdown = onGenerate.mock.calls[0][0];
      
      // Verify structure
      const lines = generatedMarkdown.split('\n');
      expect(lines.length).toBe(5); // Header + alignment + 3 data rows
      
      // Verify header
      expect(lines[0]).toContain('Product');
      expect(lines[0]).toContain('Price');
      expect(lines[0]).toContain('Quantity');
      
      // Verify alignment row
      expect(lines[1]).toContain(':'); // Has alignment indicators
      
      // Verify data rows
      expect(lines[2]).toContain('Apple');
      expect(lines[3]).toContain('Banana');
      expect(lines[4]).toContain('Orange');
    });

    it('should handle real-world scenario with mixed content', () => {
      const inputData = [
        ['Feature', 'Status', 'Notes'],
        ['Authentication', '✓', 'Complete with OAuth'],
        ['API Integration', '⚠', 'In progress'],
        ['Testing', '✗', 'Not started'],
      ];

      const { container } = render(
        <MarkdownTable
          inputData={inputData}
          columnAlignments={['left', 'center', 'left']}
          hasPadding={true}
        />
      );

      expectCodeToContainAll(container, 'Authentication', '✓', 'OAuth', '⚠', '✗');
    });
  });

  describe('error recovery', () => {
    it('should display error message and continue to render for invalid data', () => {
      const onGenerate = jest.fn();

      const { rerender } = render(
        <MarkdownTable inputData={[]} onGenerate={onGenerate} />
      );

      // Verify error is displayed
      let codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('Error:');
      expect(onGenerate).toHaveBeenCalledWith(expect.stringContaining('Error:'));

      // Now provide valid data
      const validData = [['A'], ['1']];
      rerender(<MarkdownTable inputData={validData} onGenerate={onGenerate} />);

      // Should recover and display valid data
      codeElement = screen.getByRole('code');
      expect(codeElement.textContent).not.toContain('Error:');
      expect(codeElement.textContent).toContain('A');
      expect(onGenerate).toHaveBeenLastCalledWith(expect.not.stringContaining('Error:'));
    });
  });

  describe('dynamic updates', () => {
    it('should update rendered markdown when data changes', () => {
      const initialData = [
        ['Name', 'Age'],
        ['Alice', '25'],
      ];

      const updatedData = [
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30'],
      ];

      const onGenerate = jest.fn();

      const { rerender } = render(
        <MarkdownTable inputData={initialData} onGenerate={onGenerate} />
      );

      let codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('Alice');
      expect(codeElement.textContent).not.toContain('Bob');

      rerender(<MarkdownTable inputData={updatedData} onGenerate={onGenerate} />);

      codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('Alice');
      expect(codeElement.textContent).toContain('Bob');
      expect(onGenerate).toHaveBeenCalledTimes(2);
    });

    it('should update when alignment changes', () => {
      const data = [['A', 'B'], ['1', '2']];

      const { rerender } = render(
        <MarkdownTable inputData={data} columnAlignments={['left']} />
      );

      let codeElement = screen.getByRole('code');
      let content = codeElement.textContent || '';
      expect(content).toMatch(/:-+/);

      rerender(<MarkdownTable inputData={data} columnAlignments={['right']} />);

      codeElement = screen.getByRole('code');
      content = codeElement.textContent || '';
      expect(content).toMatch(/-+:/);
    });

    it('should update when formatting options change', () => {
      const data = [['Header'], ['Value1\nValue2']];

      const { rerender } = render(
        <MarkdownTable inputData={data} convertLineBreaks={false} />
      );

      let codeElement = screen.getByRole('code');
      expect(codeElement.textContent).not.toContain('<br>');

      rerender(<MarkdownTable inputData={data} convertLineBreaks={true} />);

      codeElement = screen.getByRole('code');
      expect(codeElement.textContent).toContain('<br>');
    });
  });

  describe('theme switching', () => {
    it('should switch between light and dark themes', () => {
      const { container, rerender } = render(
        <MarkdownTable inputData={testData.simple} theme="light" />
      );

      expectPreNotToHaveClasses(container, ['dark-theme']);

      rerender(<MarkdownTable inputData={testData.simple} theme="dark" />);

      expectPreClasses(container, ['dark-theme']);

      rerender(<MarkdownTable inputData={testData.simple} theme="light" />);

      expectPreNotToHaveClasses(container, ['dark-theme']);
    });
  });

  describe('complex data scenarios', () => {
    it('should handle table with uneven row lengths', () => {
      const inputData = [
        ['A', 'B', 'C', 'D'],
        ['1'],
        ['2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9', '10'],
      ];

      const { container } = render(<MarkdownTable inputData={inputData} />);

      expectUniformColumnCount(container);
    });

    it('should handle markdown syntax in cell content', () => {
      const inputData = [
        ['Type', 'Example'],
        ['Bold', '**text**'],
        ['Italic', '*text*'],
        ['Code', '`code`'],
        ['Link', '[link](url)'],
      ];

      const { container } = render(<MarkdownTable inputData={inputData} />);

      expectCodeToContainAll(container, '**text**', '*text*', '`code`', '[link](url)');
    });

    it('should handle multiline content with line break conversion', () => {
      const inputData = [
        ['Name', 'Address'],
        ['John Doe', '123 Main St\nApt 4B\nNew York, NY 10001'],
        ['Jane Smith', 'Single line address'],
      ];

      render(<MarkdownTable inputData={inputData} convertLineBreaks={true} />);

      const codeElement = screen.getByRole('code');
      
      expect(codeElement.textContent).toContain('123 Main St<br>Apt 4B<br>New York, NY 10001');
      expect(codeElement.textContent).toContain('Single line address');
    });

    it('should handle special characters and escaping', () => {
      const inputData = [
        ['Character', 'Example'],
        ['Pipe', 'This | That'],
        ['Backslash', 'Path\\To\\File'],
        ['HTML', '<div>content</div>'],
        ['Quotes', '"double" and \'single\''],
      ];

      render(<MarkdownTable inputData={inputData} />);

      const codeElement = screen.getByRole('code');
      const content = codeElement.textContent || '';
      
      expect(content).toContain('This | That');
      expect(content).toContain('Path\\To\\File');
      expect(content).toContain('<div>content</div>');
      expect(content).toContain('"double"');
      expect(content).toContain('\'single\'');
    });

    it('should handle empty table with headers only', () => {
      const inputData = [['Column1', 'Column2', 'Column3']];

      render(<MarkdownTable inputData={inputData} hasHeader={true} />);

      const codeElement = screen.getByRole('code');
      const lines = (codeElement.textContent || '').split('\n').filter(l => l.trim());
      
      // Should have header and alignment row only
      expect(lines.length).toBe(2);
      expect(lines[0]).toContain('Column1');
      expect(lines[0]).toContain('Column2');
      expect(lines[0]).toContain('Column3');
    });
  });

  describe('performance scenarios', () => {
    it('should handle large tables efficiently', () => {
      const rowCount = 100;
      const columnCount = 10;
      
      const inputData = Array.from({ length: rowCount }, (_, rowIndex) =>
        Array.from({ length: columnCount }, (_, colIndex) => 
          `R${rowIndex}C${colIndex}`
        )
      );

      const startTime = performance.now();
      
      render(<MarkdownTable inputData={inputData} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      
      // Should render within reasonable time (adjust threshold as needed)
      expect(renderTime).toBeLessThan(1000); // 1 second
    });

    it('should handle rapid prop changes', () => {
      const data = [['A'], ['1']];

      const { rerender } = render(<MarkdownTable inputData={data} hasPadding={true} />);
      
      // Rapidly change multiple props
      for (let i = 0; i < 10; i++) {
        rerender(<MarkdownTable inputData={data} hasPadding={i % 2 === 0} />);
      }

      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible role attribute', () => {
      const data = [['A'], ['1']];

      render(<MarkdownTable inputData={data} />);

      const codeElement = screen.getByRole('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.getAttribute('role')).toBe('code');
    });

    it('should maintain semantic HTML structure', () => {
      const data = [['A'], ['1']];

      const { container } = render(<MarkdownTable inputData={data} />);

      const preElement = container.querySelector('pre');
      const codeElement = container.querySelector('code');

      expect(preElement).toBeInTheDocument();
      expect(codeElement).toBeInTheDocument();
      expect(preElement?.contains(codeElement)).toBe(true);
    });
  });

  describe('style isolation', () => {
    it('should isolate styles with isolation property', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} />);

      const wrapper = container.querySelector('div');
      expect(wrapper?.style.isolation).toBe('isolate');
    });

    it('should inject theme-specific styles in style tag', () => {
      const { container } = render(<MarkdownTable inputData={testData.simple} theme="light" />);

      const styleTag = getStyleElement(container);
      expect(styleTag).toBeInTheDocument();
      expect(styleTag?.textContent).toContain('code[class*=language-]');
    });

    it('should update styles when theme changes', () => {
      const { container, rerender } = render(
        <MarkdownTable inputData={testData.simple} theme="light" />
      );

      let styleTag = getStyleElement(container);
      const lightStyles = styleTag?.textContent;

      rerender(<MarkdownTable inputData={testData.simple} theme="dark" />);

      styleTag = getStyleElement(container);
      const darkStyles = styleTag?.textContent;

      // Styles should be different for different themes
      expect(lightStyles).not.toBe(darkStyles);
    });
  });
});

