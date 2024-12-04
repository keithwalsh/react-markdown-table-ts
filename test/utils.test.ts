import {
  calculateColumnWidths,
  formatMarkdownRow,
  formatAlignmentRow,
  generateMarkdownTableString,
  replaceNewlinesInCell,
  getColumnName,
  generateAlphabetHeaders,
} from '../src/utils';
import {TableRow, InputData} from '../src/types';

type ColumnAlignment = 'left' | 'center' | 'right' | 'none';

describe('calculateColumnWidths', () => {
  it('calculates correct column widths for simple data', () => {
    const inputData: TableRow[] = [
      ['Header 1', 'Header 2', 'Header 3'],
      ['Short', 'Medium length', 'Longest content here'],
      ['A', 'B', 'C'],
    ];
    const result = calculateColumnWidths(inputData, 3);
    expect(result).toEqual([8, 13, 20]);
  });

  it('handles empty cells', () => {
    const inputData: TableRow[] = [
      ['Header 1', '', 'Header 3'],
      ['Content', 'Medium', ''],
    ];
    const result = calculateColumnWidths(inputData, 3);
    expect(result).toEqual([8, 6, 8]);
  });

  it('uses minimum width of 3 for empty columns', () => {
    const inputData: TableRow[] = [
      ['', '', ''],
      ['A', '', 'C'],
    ];
    const result = calculateColumnWidths(inputData, 3);
    expect(result).toEqual([3, 3, 3]);
  });

  it('handles varying number of columns', () => {
    const inputData: TableRow[] = [
      ['Header 1', 'Header 2'],
      ['Content 1', 'Content 2', 'Extra Content'],
      ['A', 'B', 'C', 'D'],
    ];
    const result = calculateColumnWidths(inputData, 4);
    expect(result).toEqual([9, 9, 13, 3]);
  });
});

describe('formatMarkdownRow', () => {
  it('formats a simple row correctly with default alignments and widths', () => {
    const tableRow: TableRow = ['Column 1', 'Column 2', 'Column 3'];
    const result = formatMarkdownRow(3, tableRow, []);
    expect(result).toBe('| Column 1 | Column 2 | Column 3 |');
  });

  it('applies column widths correctly', () => {
    const tableRow: TableRow = ['Short', 'Medium', 'Long'];
    const columnWidths = [10, 10, 10];
    const result = formatMarkdownRow(3, tableRow, [], columnWidths);
    expect(result).toBe('| Short      | Medium     | Long       |');
  });

  it('applies alignments correctly', () => {
    const tableRow: TableRow = ['Left', 'Center', 'Right'];
    const columnWidths = [10, 10, 10];
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const result = formatMarkdownRow(
      3,
      tableRow,
      columnAlignments,
      columnWidths
    );
    expect(result).toBe('| Left       |   Center   |      Right |');
  });

  it('handles empty cells', () => {
    const tableRow: TableRow = ['Content', '', 'More'];
    const result = formatMarkdownRow(3, tableRow, []);
    expect(result).toBe('| Content |  | More |');
  });

  it('replaces newlines with <br> tags when specified', () => {
    const tableRow: TableRow = ['Line1\nLine2', 'SingleLine', 'Another\nLine'];
    const columnWidths = [12, 10, 12];
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const result = formatMarkdownRow(
      3,
      tableRow,
      columnAlignments,
      columnWidths,
      false,
      true
    );
    expect(result).toBe('| Line1<br>Line2 | SingleLine | Another<br>Line |');
  });

  it('uses tabs between columns when useTabs is true', () => {
    const tableRow: TableRow = ['Tab1', 'Tab2', 'Tab3'];
    const columnWidths = [5, 5, 5];
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const result = formatMarkdownRow(
      3,
      tableRow,
      columnAlignments,
      columnWidths,
      true
    );
    // Use a regular expression to match the pattern, allowing for flexible whitespace
    expect(result).toMatch(/^\|\s*Tab1\s*\|\s*Tab2\s*\|\s*Tab3\s*\|$/);
  });
});

describe('formatAlignmentRow', () => {
  it('generates default left alignment for all columns with default widths', () => {
    const result = formatAlignmentRow(3, []);
    expect(result).toBe('| --- | --- | --- |');
  });

  it('applies custom alignments correctly', () => {
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const columnWidths = [10, 10, 10];
    const result = formatAlignmentRow(3, columnAlignments, columnWidths);
    expect(result).toBe('| :--------- | :--------: | ---------: |');
  });

  it('handles custom widths', () => {
    const columnWidths = [5, 10, 5];
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const result = formatAlignmentRow(3, columnAlignments, columnWidths);
    expect(result).toBe('| :---- | :--------: | ----: |');
  });

  it('uses default alignment when not enough alignments are provided', () => {
    const columnAlignments: ColumnAlignment[] = ['center'];
    const result = formatAlignmentRow(3, columnAlignments);
    expect(result).toBe('| :-: | --- | --- |');
  });

  it('uses "none" alignment correctly', () => {
    const columnAlignments: ColumnAlignment[] = ['none', 'left', 'right'];
    const columnWidths = [5, 10, 5];
    const result = formatAlignmentRow(3, columnAlignments, columnWidths);
    expect(result).toBe('| ----- | :--------- | ----: |');
  });
});

describe('generateMarkdownTableString', () => {
  it('should generate a complete Markdown table string with default settings', () => {
    const inputData: InputData = {
      inputDataHeader: ['Name', 'Age', 'City'],
      inputDataBody: [
        ['Alice', '30', 'New York'],
        ['Bob', '25', 'Los Angeles'],
      ],
    };
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const result = generateMarkdownTableString(inputData, columnAlignments);
    const expected = `| Name  | Age |        City |
| :---- | :-: | ----------: |
| Alice | 30  |    New York |
| Bob   | 25  | Los Angeles |`;
    expect(result).toBe(expected);
  });

  it('should adjust column widths based on content when adjustColumnWidths is true', () => {
    const inputData: InputData = {
      inputDataHeader: ['Header', 'Another Header', 'Short'],
      inputDataBody: [
        ['Longer Content', 'Mid', 'S'],
        ['A', 'B', 'C'],
      ],
    };
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const result = generateMarkdownTableString(inputData, columnAlignments);
    const expected = `| Header         | Another Header | Short |
| :------------- | :------------: | ----: |
| Longer Content |      Mid       |     S |
| A              |       B        |     C |`;
    expect(result).toBe(expected);
  });

  it('should use tabs between columns when useTabs is true', () => {
    const inputData: InputData = {
      inputDataHeader: ['Name', 'Age', 'City'],
      inputDataBody: [
        ['Alice', '30', 'New York'],
        ['Bob', '25', 'Los Angeles'],
      ],
    };
    const columnAlignments: ColumnAlignment[] = ['left', 'center', 'right'];
    const result = generateMarkdownTableString(
      inputData,
      columnAlignments,
      true,
      true,
      false
    );
    const expected = `
| Name | Age | City |
| :---- | :-: | ----------: |
| Alice | 30 | New York |
| Bob | 25 | Los Angeles |
    `
      .trim()
      .replace(/\s+/g, ' ');
    expect(result.replace(/\s+/g, ' ')).toBe(expected);
  });

  it('should handle tables with varying number of columns', () => {
    const inputData: InputData = {
      inputDataHeader: ['Name', 'Age'],
      inputDataBody: [
        ['Alice', '30', 'Engineer'],
        ['Bob', '25'],
        ['Charlie', '35', 'Teacher', 'Extra Column'],
      ],
    };
    const columnAlignments: ColumnAlignment[] = [
      'left',
      'center',
      'right',
      'none',
    ];
    const result = generateMarkdownTableString(inputData, columnAlignments);
    const expected = `| Name    | Age |          |              |
| :------ | :-: | -------: | ------------ |
| Alice   | 30  | Engineer |              |
| Bob     | 25  |          |              |
| Charlie | 35  |  Teacher | Extra Column |`;
    expect(result).toBe(expected);
  });
});

describe('replaceNewlinesInCell', () => {
  it('replaces newline characters with <br> tags', () => {
    const tableCell = 'Line1\nLine2\nLine3';
    const result = replaceNewlinesInCell(tableCell);
    expect(result).toBe('Line1<br>Line2<br>Line3');
  });

  it('returns the original string if there are no newline characters', () => {
    const tableCell = 'No newlines here';
    const result = replaceNewlinesInCell(tableCell);
    expect(result).toBe('No newlines here');
  });

  it('handles empty string', () => {
    const tableCell = '';
    const result = replaceNewlinesInCell(tableCell);
    expect(result).toBe('');
  });

  it('handles strings with only newline characters', () => {
    const tableCell = '\n\n';
    const result = replaceNewlinesInCell(tableCell);
    expect(result).toBe('<br><br>');
  });
});

describe('getColumnName', () => {
  it('returns correct column names for single letter columns', () => {
    expect(getColumnName(0)).toBe('A');
    expect(getColumnName(25)).toBe('Z');
  });

  it('returns correct column names for double letter columns', () => {
    expect(getColumnName(26)).toBe('AA');
    expect(getColumnName(51)).toBe('AZ');
    expect(getColumnName(701)).toBe('ZZ');
  });

  it('returns correct column names for triple letter columns', () => {
    expect(getColumnName(702)).toBe('AAA');
    expect(getColumnName(16383)).toBe('XFD'); // Excel's last column
  });

  it('handles large indices correctly', () => {
    expect(getColumnName(1000000)).toBe('BDWGO');
    expect(getColumnName(100000)).toBe('EQXE');
    expect(getColumnName(1000)).toBe('ALM');
  });
});

describe('generateAlphabetHeaders', () => {
  it('generates correct headers for small column counts', () => {
    expect(generateAlphabetHeaders(3)).toEqual(['A', 'B', 'C']);
    expect(generateAlphabetHeaders(5)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('generates correct headers for column counts exceeding 26', () => {
    const result = generateAlphabetHeaders(28);
    expect(result).toHaveLength(28);
    expect(result.slice(0, 5)).toEqual(['A', 'B', 'C', 'D', 'E']);
    expect(result.slice(-3)).toEqual(['Z', 'AA', 'AB']);
  });

  it('handles large column counts', () => {
    const result = generateAlphabetHeaders(702);
    expect(result).toHaveLength(702);
    expect(result[0]).toBe('A');
    expect(result[25]).toBe('Z');
    expect(result[26]).toBe('AA');
    expect(result[701]).toBe('ZZ');
  });

  it('returns an empty array for zero columns', () => {
    expect(generateAlphabetHeaders(0)).toEqual([]);
  });
});
