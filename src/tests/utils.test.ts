/**
 * @fileoverview Comprehensive tests for utility functions and classes used in
 * markdown table generation.
 */

import { generateMarkdownTableString, generateAlphabetHeaders } from '../utils';
import type { InputData, Alignment } from '../types';

describe('generateAlphabetHeaders', () => {
  it('should generate single letter headers for small column counts', () => {
    expect(generateAlphabetHeaders(1)).toEqual(['A']);
    expect(generateAlphabetHeaders(3)).toEqual(['A', 'B', 'C']);
    expect(generateAlphabetHeaders(5)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('should generate all 26 letters for 26 columns', () => {
    const headers = generateAlphabetHeaders(26);
    expect(headers).toHaveLength(26);
    expect(headers[0]).toBe('A');
    expect(headers[25]).toBe('Z');
  });

  it('should generate double letter headers after Z', () => {
    const headers = generateAlphabetHeaders(27);
    expect(headers).toHaveLength(27);
    expect(headers[26]).toBe('AA');
  });

  it('should generate correct headers for extended columns', () => {
    const headers = generateAlphabetHeaders(30);
    expect(headers[26]).toBe('AA');
    expect(headers[27]).toBe('AB');
    expect(headers[28]).toBe('AC');
    expect(headers[29]).toBe('AD');
  });

  it('should handle 52 columns (through AZ)', () => {
    const headers = generateAlphabetHeaders(52);
    expect(headers[0]).toBe('A');
    expect(headers[25]).toBe('Z');
    expect(headers[26]).toBe('AA');
    expect(headers[51]).toBe('AZ');
  });

  it('should handle triple letter columns', () => {
    const headers = generateAlphabetHeaders(703);
    expect(headers[702]).toBe('AAA');
  });

  it('should return empty array for 0 columns', () => {
    expect(generateAlphabetHeaders(0)).toEqual([]);
  });

  it('should handle negative numbers gracefully', () => {
    expect(generateAlphabetHeaders(-1)).toEqual([]);
  });
});

describe('generateMarkdownTableString', () => {
  describe('basic table generation', () => {
    it('should generate a simple table with header and body', () => {
      const inputData: InputData = {
        inputDataHeader: ['Name', 'Age'],
        inputDataBody: [['John', '30'], ['Jane', '25']],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toContain('| Name | Age |');
      expect(result).toContain('| John | 30  |');
      expect(result).toContain('| Jane | 25  |');
    });

    it('should generate table with single row', () => {
      const inputData: InputData = {
        inputDataHeader: ['A', 'B', 'C'],
        inputDataBody: [['1', '2', '3']],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toContain('| A');
      expect(result).toContain('| B');
      expect(result).toContain('| C');
      expect(result).toContain('| 1');
      expect(result).toContain('| 2');
      expect(result).toContain('| 3');
    });

    it('should generate table with single column', () => {
      const inputData: InputData = {
        inputDataHeader: ['Header'],
        inputDataBody: [['Value1'], ['Value2']],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toContain('| Header |');
      expect(result).toContain('| Value1 |');
      expect(result).toContain('| Value2 |');
    });

    it('should handle empty body', () => {
      const inputData: InputData = {
        inputDataHeader: ['A', 'B'],
        inputDataBody: [],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toContain('| A');
      expect(result).toContain('| B');
      expect(result.split('\n')).toHaveLength(2); // Header and alignment row only
    });

    it('should handle empty cells', () => {
      const inputData: InputData = {
        inputDataHeader: ['Col1', 'Col2'],
        inputDataBody: [['', 'Value'], ['Value', '']],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toContain('Value');
      const lines = result.split('\n');
      expect(lines[2]).toMatch(/\|\s+\|\s+Value\s+\|/);
      expect(lines[3]).toMatch(/\|\s+Value\s+\|\s+\|/);
    });
  });

  describe('alignment options', () => {
    const inputData: InputData = {
      inputDataHeader: ['Left', 'Center', 'Right', 'None'],
      inputDataBody: [['A', 'B', 'C', 'D']],
    };

    it('should apply left alignment', () => {
      const alignments: Alignment[] = ['left'];
      const result = generateMarkdownTableString(inputData, alignments);
      
      expect(result).toMatch(/:-+/);
    });

    it('should apply center alignment', () => {
      const alignments: Alignment[] = ['none', 'center'];
      const result = generateMarkdownTableString(inputData, alignments);
      
      expect(result).toMatch(/:-+:/);
    });

    it('should apply right alignment', () => {
      const alignments: Alignment[] = ['none', 'none', 'right'];
      const result = generateMarkdownTableString(inputData, alignments);
      
      expect(result).toMatch(/-+:/);
    });

    it('should apply none alignment (no colons)', () => {
      const alignments: Alignment[] = ['none'];
      const result = generateMarkdownTableString(inputData, alignments);
      
      const lines = result.split('\n');
      const alignmentRow = lines[1];
      expect(alignmentRow).toMatch(/^\| ---- \|/);
    });

    it('should handle mixed alignments', () => {
      const alignments: Alignment[] = ['left', 'center', 'right', 'none'];
      const result = generateMarkdownTableString(inputData, alignments);
      
      const lines = result.split('\n');
      const alignmentRow = lines[1];
      
      expect(alignmentRow).toMatch(/:-+/);   // left
      expect(alignmentRow).toMatch(/:-+:/);  // center
      expect(alignmentRow).toMatch(/-+:/);   // right
      expect(alignmentRow).toMatch(/-+/);    // none (dashes without colons)
    });

    it('should default to none alignment for unspecified columns', () => {
      const alignments: Alignment[] = ['left'];
      const result = generateMarkdownTableString(inputData, alignments);
      
      const lines = result.split('\n');
      const alignmentRow = lines[1];
      
      expect(alignmentRow).toMatch(/:-+/); // First column left
      expect(alignmentRow).toMatch(/-+/); // Others have dashes
    });
  });

  describe('column width adjustment', () => {
    it('should adjust column widths when enabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['Short', 'VeryLongHeader'],
        inputDataBody: [['A', 'B'], ['CCCCC', 'D']],
      };

      const result = generateMarkdownTableString(inputData, [], true);
      
      const lines = result.split('\n');
      expect(lines[0]).toContain('Short');
      expect(lines[0]).toContain('VeryLongHeader');
      
      // Check that columns are adjusted
      expect(lines[2]).toContain('A');
      expect(lines[3]).toContain('CCCCC');
    });

    it('should not adjust column widths when disabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['H1', 'H2'],
        inputDataBody: [['Short', 'VeryLongValue']],
      };

      const result = generateMarkdownTableString(inputData, [], false);
      
      // When not adjusting, widths should match content exactly
      expect(result).toContain('| H1 |');
      expect(result).toContain('| Short |');
    });

    it('should handle varying row lengths', () => {
      const inputData: InputData = {
        inputDataHeader: ['A', 'B', 'C'],
        inputDataBody: [
          ['1', '2'],
          ['3', '4', '5', '6'],
          ['7'],
        ],
      };

      const result = generateMarkdownTableString(inputData, [], true);
      
      // Should pad all rows to match max column count (4)
      const lines = result.split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          const columns = line.split('|').filter(col => col !== '');
          expect(columns.length).toBe(4);
        }
      });
    });
  });

  describe('tab option', () => {
    it('should add tabs when enabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['A', 'B'],
        inputDataBody: [['1', '2']],
      };

      const result = generateMarkdownTableString(inputData, [], true, true);
      
      expect(result).toContain('\t');
    });

    it('should not add tabs when disabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['A', 'B'],
        inputDataBody: [['1', '2']],
      };

      const result = generateMarkdownTableString(inputData, [], true, false);
      
      expect(result).not.toContain('\t');
    });
  });

  describe('newline replacement', () => {
    it('should replace newlines with <br> when enabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['Header'],
        inputDataBody: [['Line1\nLine2\nLine3']],
      };

      const result = generateMarkdownTableString(inputData, [], true, false, true);
      
      expect(result).toContain('Line1<br>Line2<br>Line3');
      expect(result).not.toMatch(/Line1\nLine2/);
    });

    it('should not replace newlines when disabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['Header'],
        inputDataBody: [['Line1\nLine2']],
      };

      const result = generateMarkdownTableString(inputData, [], true, false, false);
      
      expect(result).toContain('Line1\nLine2');
      expect(result).not.toContain('<br>');
    });

    it('should handle multiple consecutive newlines', () => {
      const inputData: InputData = {
        inputDataHeader: ['H'],
        inputDataBody: [['A\n\n\nB']],
      };

      const result = generateMarkdownTableString(inputData, [], true, false, true);
      
      expect(result).toContain('A<br><br><br>B');
    });
  });

  describe('padding option', () => {
    it('should add padding when enabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['A', 'B'],
        inputDataBody: [['1', '2']],
      };

      const result = generateMarkdownTableString(inputData, [], false, false, false, true);
      
      expect(result).toContain('| A | B |');
      expect(result).toContain('| 1 | 2 |');
    });

    it('should not add padding when disabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['A', 'B'],
        inputDataBody: [['1', '2']],
      };

      const result = generateMarkdownTableString(inputData, [], false, false, false, false);
      
      expect(result).toContain('|A|B|');
      expect(result).toContain('|1|2|');
    });
  });

  describe('complex scenarios', () => {
    it('should handle unicode characters', () => {
      const inputData: InputData = {
        inputDataHeader: ['日本語', '한국어'],
        inputDataBody: [['こんにちは', '안녕하세요']],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toContain('日本語');
      expect(result).toContain('한국어');
      expect(result).toContain('こんにちは');
      expect(result).toContain('안녕하세요');
    });

    it('should handle special markdown characters', () => {
      const inputData: InputData = {
        inputDataHeader: ['Code', 'Symbol'],
        inputDataBody: [['`code`', '**bold**'], ['*italic*', '[link]']],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toContain('`code`');
      expect(result).toContain('**bold**');
      expect(result).toContain('*italic*');
      expect(result).toContain('[link]');
    });

    it('should handle very long content', () => {
      const longString = 'A'.repeat(1000);
      const inputData: InputData = {
        inputDataHeader: ['Header'],
        inputDataBody: [[longString]],
      };

      const result = generateMarkdownTableString(inputData, [], true);
      
      expect(result).toContain(longString);
    });

    it('should generate valid markdown with all options enabled', () => {
      const inputData: InputData = {
        inputDataHeader: ['Name', 'Description'],
        inputDataBody: [
          ['Item1', 'Short'],
          ['Item2', 'Simple'],
        ],
      };

      const result = generateMarkdownTableString(
        inputData,
        ['left', 'center'],
        true,
        true,
        false,
        true
      );

      expect(result).toContain('\t');
      expect(result).toContain(':');
      expect(result.split('\n')).toHaveLength(4); // Header, alignment, 2 rows
    });

    it('should handle empty header and body with different lengths', () => {
      const inputData: InputData = {
        inputDataHeader: ['A'],
        inputDataBody: [['1', '2', '3']],
      };

      const result = generateMarkdownTableString(inputData, [], true);
      
      const lines = result.split('\n');
      const headerCols = lines[0].split('|').filter(col => col !== '').length;
      const bodyCols = lines[2].split('|').filter(col => col !== '').length;
      
      expect(headerCols).toBe(bodyCols);
      expect(headerCols).toBe(3); // Should match body's column count
    });

    it('should trim trailing whitespace at end of output', () => {
      const inputData: InputData = {
        inputDataHeader: ['A'],
        inputDataBody: [['1']],
      };

      const result = generateMarkdownTableString(inputData, []);
      
      expect(result).toBe(result.trimEnd());
      expect(result).not.toMatch(/\n$/);
    });

    it('should handle minimum width columns', () => {
      const inputData: InputData = {
        inputDataHeader: ['A'],
        inputDataBody: [['']],
      };

      const result = generateMarkdownTableString(inputData, [], true);
      
      const lines = result.split('\n');
      const alignmentRow = lines[1];
      
      // Should have at least minimum width of 3 for alignment indicators
      expect(alignmentRow).toMatch(/\|\s*---\s*\|/);
    });
  });

  describe('cell formatting with different alignments', () => {
    it('should right-align content correctly', () => {
      const inputData: InputData = {
        inputDataHeader: ['Number'],
        inputDataBody: [['1'], ['100']],
      };

      const result = generateMarkdownTableString(inputData, ['right'], true);
      
      const lines = result.split('\n');
      // In right alignment, shorter content should be padded on the left
      expect(lines[2]).toMatch(/\|\s+1\s+\|/);
      expect(lines[3]).toMatch(/\|\s+100\s+\|/);
    });

    it('should center-align content correctly', () => {
      const inputData: InputData = {
        inputDataHeader: ['Centered'],
        inputDataBody: [['ABC']],
      };

      const result = generateMarkdownTableString(inputData, ['center'], true);
      
      // Should have roughly equal padding on both sides
      const lines = result.split('\n');
      expect(lines[0]).toMatch(/\|\s+Centered\s+\|/);
    });

    it('should left-align content correctly', () => {
      const inputData: InputData = {
        inputDataHeader: ['Text'],
        inputDataBody: [['Hi'], ['Hello']],
      };

      const result = generateMarkdownTableString(inputData, ['left'], true);
      
      const lines = result.split('\n');
      // In left alignment, shorter content should be padded on the right
      expect(lines[2]).toMatch(/\|\s+Hi\s+\|/);
      expect(lines[3]).toMatch(/\|\s+Hello\s+\|/);
    });
  });
});

