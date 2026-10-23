/**
 * @fileoverview Integration tests that verify the complete workflow from data
 * input through markdown generation to component rendering.
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarkdownTable, MarkdownTableError } from '../index';
import { testData, getStyleElement, getWrapperDiv } from './test-utils';

describe('Integration Tests', () => {
  describe('complete data flow', () => {
    it('should transform input data into valid markdown table', () => {
      const inputData = [
        ['Product', 'Price', 'Quantity'],
        ['Apple', '$1.50', '10'],
        ['Banana', '$0.75', '15'],
        ['Orange', '$2.00', '8'],
      ];

      const onGenerate = vi.fn();

      render(
        <MarkdownTable
          inputData={inputData}
          hasHeader={true}
          columnAlignments={['left', 'right', 'center']}
          onGenerate={onGenerate}
        />
      );

      expect(onGenerate).toHaveBeenCalledTimes(1);
      
      expect(onGenerate).toHaveBeenCalledWith(
        '| Product | Price | Quantity |\n' +
        '| :------ | ----: | :------: |\n' +
        '| Apple   | $1.50 |    10    |\n' +
        '| Banana  | $0.75 |    15    |\n' +
        '| Orange  | $2.00 |    8     |',
        null
      );
    });

    it('should handle real-world scenario with mixed content', () => {
      const inputData = [
        ['Feature', 'Status', 'Notes'],
        ['Authentication', '✓', 'Complete with OAuth'],
        ['API Integration', '⚠', 'In progress'],
        ['Testing', '✗', 'Not started'],
      ];

      render(
        <MarkdownTable
          inputData={inputData}
          columnAlignments={['left', 'center', 'left']}
          hasPadding={true}
        />
      );

      expect(screen.getByRole('code').textContent).toBe(
        '| Feature         | Status | Notes               |\n' +
        '| :-------------- | :----: | :------------------ |\n' +
        '| Authentication  |   ✓    | Complete with OAuth |\n' +
        '| API Integration |   ⚠    | In progress         |\n' +
        '| Testing         |   ✗    | Not started         |'
      );
    });
  });

  describe('error recovery', () => {
    it('should display error message and continue to render for invalid data', () => {
      const onGenerate = vi.fn();

      const { rerender } = render(
        <MarkdownTable inputData={[]} onGenerate={onGenerate} />
      );

      // Verify error is displayed
      const error = "Error: The 'inputData' array must contain at least one row.";
      expect(screen.getByRole('code').textContent).toBe(error);
      expect(onGenerate).toHaveBeenCalledWith(error, expect.any(MarkdownTableError));

      // Now provide valid data
      const validData = [['A'], ['1']];
      rerender(<MarkdownTable inputData={validData} onGenerate={onGenerate} />);

      // Should recover and display valid data
      const table = '| A   |\n| --- |\n| 1   |';
      expect(screen.getByRole('code').textContent).toBe(table);
      expect(onGenerate).toHaveBeenLastCalledWith(table, null);
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

      const onGenerate = vi.fn();

      const { rerender } = render(
        <MarkdownTable inputData={initialData} onGenerate={onGenerate} />
      );

      expect(screen.getByRole('code').textContent).toBe('| Name  | Age |\n| ----- | --- |\n| Alice | 25  |');

      rerender(<MarkdownTable inputData={updatedData} onGenerate={onGenerate} />);

      expect(screen.getByRole('code').textContent).toBe(
        '| Name  | Age |\n| ----- | --- |\n| Alice | 25  |\n| Bob   | 30  |'
      );
      expect(onGenerate).toHaveBeenCalledTimes(2);
    });

    it('should update when alignment changes', () => {
      const data = [['A', 'B'], ['1', '2']];

      const { rerender } = render(
        <MarkdownTable inputData={data} columnAlignments={['left']} />
      );

      expect(screen.getByRole('code').textContent).toBe('| A   | B   |\n| :-- | --- |\n| 1   | 2   |');

      rerender(<MarkdownTable inputData={data} columnAlignments={['right']} />);

      expect(screen.getByRole('code').textContent).toBe('|   A | B   |\n| --: | --- |\n|   1 | 2   |');
    });

    it('should update when formatting options change', () => {
      const data = [['Header'], ['Value1\nValue2']];

      const { rerender } = render(
        <MarkdownTable inputData={data} convertLineBreaks={false} />
      );

      expect(screen.getByRole('code').textContent).toBe(
        '| Header        |\n| ------------- |\n| Value1 Value2 |'
      );

      rerender(<MarkdownTable inputData={data} convertLineBreaks={true} />);

      expect(screen.getByRole('code').textContent).toBe(
        '| Header           |\n| ---------------- |\n| Value1<br>Value2 |'
      );
    });
  });

  describe('theme switching', () => {
    it('should switch between light and dark themes', () => {
      const { container, rerender } = render(
        <MarkdownTable inputData={testData.simple} theme="light" />
      );

      expect(getWrapperDiv(container)?.className).toBe('rmt rmt-light');

      rerender(<MarkdownTable inputData={testData.simple} theme="dark" />);

      expect(getWrapperDiv(container)?.className).toBe('rmt rmt-dark');

      rerender(<MarkdownTable inputData={testData.simple} theme="light" />);

      expect(getWrapperDiv(container)?.className).toBe('rmt rmt-light');
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

      render(<MarkdownTable inputData={inputData} />);

      expect(screen.getByRole('code').textContent).toBe(
        '| A   | B   | C   | D   |\n' +
        '| --- | --- | --- | --- |\n' +
        '| 1   |     |     |     |\n' +
        '| 2   | 3   |     |     |\n' +
        '| 4   | 5   | 6   |     |\n' +
        '| 7   | 8   | 9   | 10  |'
      );
    });

    it('should handle markdown syntax in cell content', () => {
      const inputData = [
        ['Type', 'Example'],
        ['Bold', '**text**'],
        ['Italic', '*text*'],
        ['Code', '`code`'],
        ['Link', '[link](url)'],
      ];

      render(<MarkdownTable inputData={inputData} />);

      expect(screen.getByRole('code').textContent).toBe(
        '| Type   | Example     |\n' +
        '| ------ | ----------- |\n' +
        '| Bold   | **text**    |\n' +
        '| Italic | *text*      |\n' +
        '| Code   | `code`      |\n' +
        '| Link   | [link](url) |'
      );
    });

    it('should handle multiline content with line break conversion', () => {
      const inputData = [
        ['Name', 'Address'],
        ['John Doe', '123 Main St\nApt 4B\nNew York, NY 10001'],
        ['Jane Smith', 'Single line address'],
      ];

      render(<MarkdownTable inputData={inputData} convertLineBreaks={true} />);

      expect(screen.getByRole('code').textContent).toBe(
        '| Name       | Address                                     |\n' +
        '| ---------- | ------------------------------------------- |\n' +
        '| John Doe   | 123 Main St<br>Apt 4B<br>New York, NY 10001 |\n' +
        '| Jane Smith | Single line address                         |'
      );
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

      // Only the pipe is escaped
      expect(screen.getByRole('code').textContent).toBe(
        '| Character | Example               |\n' +
        '| --------- | --------------------- |\n' +
        '| Pipe      | This \\| That          |\n' +
        '| Backslash | Path\\To\\File          |\n' +
        '| HTML      | <div>content</div>    |\n' +
        '| Quotes    | "double" and \'single\' |'
      );
    });

    it('should handle empty table with headers only', () => {
      const inputData = [['Column1', 'Column2', 'Column3']];

      render(<MarkdownTable inputData={inputData} hasHeader={true} />);

      // Should have header and alignment row only
      expect(screen.getByRole('code').textContent).toBe(
        '| Column1 | Column2 | Column3 |\n| ------- | ------- | ------- |'
      );
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

      const lines = screen.getByRole('code').textContent!.split('\n');
      expect(lines).toHaveLength(rowCount + 1);
      expect(lines[1]).toBe(`|${' ----- |'.repeat(columnCount)}`);
      expect(lines[rowCount]).toBe(
        '| R99C0 | R99C1 | R99C2 | R99C3 | R99C4 | R99C5 | R99C6 | R99C7 | R99C8 | R99C9 |'
      );
      
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

      // The last change turned padding off
      expect(screen.getByRole('code').textContent).toBe('|A  |\n|---|\n|1  |');
    });
  });

  describe('accessibility', () => {
    it('should expose the markdown through the implicit code role', () => {
      const data = [['A'], ['1']];

      render(<MarkdownTable inputData={data} />);

      const codeElement = screen.getByRole('code');
      expect(codeElement.tagName).toBe('CODE');
      expect(codeElement.textContent).toBe('| A   |\n| --- |\n| 1   |');
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

      const preElement = container.querySelector('pre');
      expect(getComputedStyle(preElement!).isolation).toBe('isolate');
    });

    it('should inject the shared stylesheet', () => {
      render(<MarkdownTable inputData={testData.simple} theme="light" />);

      const styleTag = getStyleElement();
      expect(styleTag).toBeInTheDocument();
      expect(styleTag?.textContent).toContain('code.rmt-code');
    });

    it('should switch the theme class when the theme changes', () => {
      const { container, rerender } = render(
        <MarkdownTable inputData={testData.simple} theme="light" />
      );
      const css = getStyleElement()?.textContent;

      rerender(<MarkdownTable inputData={testData.simple} theme="dark" />);

      expect(container.querySelector('.rmt')?.className).toBe('rmt rmt-dark');
      expect(getStyleElement()?.textContent).toBe(css);
    });
  });
});

