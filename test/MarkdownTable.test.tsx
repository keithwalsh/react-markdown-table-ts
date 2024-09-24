import React from 'react';
import {render, screen} from '@testing-library/react';
import {MarkdownTable} from '../src';
import '@testing-library/jest-dom';

describe('MarkdownTable', () => {
  const sampleData = [
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
    ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
  ];

  it('renders a compact table', () => {
    render(<MarkdownTable data={sampleData} isCompact={true} />);
    const preElement = screen.getByText(/\| Header 1/);
    expect(preElement).toBeInTheDocument();
    expect(preElement.textContent).toContain(
      '| Header 1 | Header 2 | Header 3 |'
    );
    expect(preElement.textContent).toContain('| :-- | :-- | :-- |');
    expect(preElement.textContent).toContain(
      '| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |'
    );
    expect(preElement.textContent).toContain(
      '| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |'
    );
  });

  it('replaces newlines with <br> tags when canReplaceNewlines is true', () => {
    const dataWithNewlines = [
      ['Header 1', 'Header 2'],
      ['Line 1\nLine 2', 'Single line'],
      ['Single line', 'Line 1\nLine 2\nLine 3'],
    ];

    render(<MarkdownTable data={dataWithNewlines} canReplaceNewlines={true} />);

    const preElement = screen.getByText(/\| Header 1/);
    expect(preElement).toBeInTheDocument();
    expect(preElement.textContent).toContain(
      '| Header 1      | Header 2             |'
    );
    expect(preElement.textContent).toContain(
      '| :------------ | :------------------- |'
    );
    expect(preElement.textContent).toContain(
      '| Line 1<br>Line 2 | Single line          |'
    );
    expect(preElement.textContent).toContain(
      '| Single line   | Line 1<br>Line 2<br>Line 3 |'
    );
  });

  it('calls onTableCreate with the correct Markdown string', () => {
    const sampleData = [
      ['Header 1', 'Header 2'],
      ['Row 1, Col 1', 'Row 1, Col 2'],
      ['Row 2, Col 1', 'Row 2, Col 2'],
    ];

    const mockOnTableCreate = jest.fn();

    render(
      <MarkdownTable data={sampleData} onTableCreate={mockOnTableCreate} />
    );

    // Check if the component rendered correctly
    const preElement = screen.getByText(/\| Header 1/);
    expect(preElement).toBeInTheDocument();

    // Check if onTableCreate was called
    expect(mockOnTableCreate).toHaveBeenCalledTimes(1);

    // Check if onTableCreate was called with the correct Markdown string
    const expectedMarkdown = `| Header 1     | Header 2     |
| :----------- | :----------- |
| Row 1, Col 1 | Row 1, Col 2 |
| Row 2, Col 1 | Row 2, Col 2 |`;

    expect(mockOnTableCreate).toHaveBeenCalledWith(expectedMarkdown);
  });

  it('calls onTableCreate when props change', () => {
    const sampleData = [
      ['Header 1', 'Header 2'],
      ['Row 1, Col 1', 'Row 1, Col 2'],
    ];

    const mockOnTableCreate = jest.fn();

    const {rerender} = render(
      <MarkdownTable data={sampleData} onTableCreate={mockOnTableCreate} />
    );

    expect(mockOnTableCreate).toHaveBeenCalledTimes(1);

    // Change a prop and re-render
    const newData = [
      ['New Header 1', 'New Header 2'],
      ['New Row 1, Col 1', 'New Row 1, Col 2'],
    ];

    rerender(
      <MarkdownTable data={newData} onTableCreate={mockOnTableCreate} />
    );

    // Check if onTableCreate was called again
    expect(mockOnTableCreate).toHaveBeenCalledTimes(2);

    // Check if onTableCreate was called with the new Markdown string
    const expectedNewMarkdown = `| New Header 1     | New Header 2     |
| :--------------- | :--------------- |
| New Row 1, Col 1 | New Row 1, Col 2 |`;

    expect(mockOnTableCreate).toHaveBeenLastCalledWith(expectedNewMarkdown);
  });
});
