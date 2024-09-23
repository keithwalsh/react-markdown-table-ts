import {
  calculateColumnWidths,
  formatMarkdownRow,
  formatAlignmentRow,
} from '../src/helpers';
import {TableRow} from '../src/types';

describe('calculateColumnWidths', () => {
  it('calculates correct column widths for simple data', () => {
    const data: TableRow[] = [
      ['Header 1', 'Header 2', 'Header 3'],
      ['Short', 'Medium length', 'Longest content here'],
      ['A', 'B', 'C'],
    ];
    const result = calculateColumnWidths({allRows: data, maxColumnCount: 3});
    expect(result).toEqual([8, 13, 20]);
  });

  it('handles empty cells', () => {
    const data: TableRow[] = [
      ['Header 1', '', 'Header 3'],
      ['Content', 'Medium', ''],
    ];
    const result = calculateColumnWidths({allRows: data, maxColumnCount: 3});
    expect(result).toEqual([8, 6, 8]);
  });

  it('uses minimum width of 3 for empty columns', () => {
    const data: TableRow[] = [
      ['', '', ''],
      ['A', '', 'C'],
    ];
    const result = calculateColumnWidths({allRows: data, maxColumnCount: 3});
    expect(result).toEqual([3, 3, 3]);
  });
});

describe('formatMarkdownRow', () => {
  it('formats a simple row correctly', () => {
    const row: TableRow = ['Column 1', 'Column 2', 'Column 3'];
    const result = formatMarkdownRow({columnCount: 3, row});
    expect(result).toBe('| Column 1 | Column 2 | Column 3 |');
  });

  it('applies column widths correctly', () => {
    const row: TableRow = ['Short', 'Medium', 'Long'];
    const columnWidths = [10, 10, 10];
    const result = formatMarkdownRow({columnCount: 3, row, columnWidths});
    expect(result).toBe('| Short      | Medium     | Long       |');
  });

  it('applies alignments correctly', () => {
    const row: TableRow = ['Left', 'Center', 'Right'];
    const columnWidths = [10, 10, 10];
    const columnAlignments: ('left' | 'right' | 'center' | 'none')[] = [
      'left',
      'center',
      'right',
    ];
    const result = formatMarkdownRow({
      columnCount: 3,
      row,
      columnWidths,
      columnAlignments,
    });
    expect(result).toBe('| Left       |   Center   |      Right |');
  });

  it('handles empty cells', () => {
    const row: TableRow = ['Content', '', 'More'];
    const result = formatMarkdownRow({columnCount: 3, row});
    expect(result).toBe('| Content |  | More |');
  });
});

describe('formatAlignmentRow', () => {
  it('generates default left alignment for all columns', () => {
    const result = formatAlignmentRow({columnCount: 3});
    expect(result).toBe('| :-- | :-- | :-- |');
  });

  it('applies custom alignments correctly', () => {
    const columnAlignments: ('left' | 'right' | 'center' | 'none')[] = [
      'left',
      'center',
      'right',
    ];
    const result = formatAlignmentRow({columnCount: 3, columnAlignments});
    expect(result).toBe('| :-- | :-: | --: |');
  });

  it('handles custom widths', () => {
    const columnWidths = [5, 10, 15];
    const columnAlignments: ('left' | 'right' | 'center' | 'none')[] = [
      'left',
      'center',
      'right',
    ];
    const result = formatAlignmentRow({
      columnCount: 3,
      columnAlignments,
      columnWidths,
    });
    expect(result).toBe('| :---- | :--------: | --------------: |');
  });

  it('uses default alignment when not enough alignments are provided', () => {
    const columnAlignments: ('left' | 'right' | 'center' | 'none')[] = [
      'center',
    ];
    const result = formatAlignmentRow({columnCount: 3, columnAlignments});
    expect(result).toBe('| :-: | :-- | :-- |');
  });
});
