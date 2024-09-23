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

  it('renders a table with default props', () => {
    render(<MarkdownTable data={sampleData} />);
    const preElement = screen.getByText(/\| Header 1/);
    expect(preElement).toBeInTheDocument();
    expect(preElement.textContent).toContain(
      '| Header 1     | Header 2     | Header 3     |'
    );
    expect(preElement.textContent).toContain(
      '| :----------- | :----------- | :----------- |'
    );
    expect(preElement.textContent).toContain(
      '| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |'
    );
    expect(preElement.textContent).toContain(
      '| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |'
    );
  });

  it('renders a table without header', () => {
    render(<MarkdownTable data={sampleData} hasHeader={false} />);
    const preElement = screen.getByText(/\| A /);
    expect(preElement).toBeInTheDocument();
    expect(preElement.textContent).toContain(
      '| A            | B            | C            |'
    );
    expect(preElement.textContent).toContain(
      '| :----------- | :----------- | :----------- |'
    );
    expect(preElement.textContent).toContain(
      '| Header 1     | Header 2     | Header 3     |'
    );
    expect(preElement.textContent).toContain(
      '| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |'
    );
    expect(preElement.textContent).toContain(
      '| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |'
    );
  });

  it('applies custom column alignments', () => {
    render(
      <MarkdownTable
        data={sampleData}
        columnAlignments={['left', 'center', 'right']}
      />
    );
    const preElement = screen.getByText(/\| Header 1/);
    expect(preElement).toBeInTheDocument();
    expect(preElement.textContent).toContain(
      '| :----------- | :----------: | -----------: |'
    );
  });

  it('renders a compact table', () => {
    render(<MarkdownTable data={sampleData} compact={true} />);
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

  it('handles empty data gracefully', () => {
    render(<MarkdownTable data={[]} />);
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
    expect(
      screen.getByText(/The 'data' array must contain at least one row./)
    ).toBeInTheDocument();
  });
});
