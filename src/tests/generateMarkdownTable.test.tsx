/**
 * @fileoverview Tests for generateMarkdownTable, the plain function that
 * returns a Markdown table without rendering the component.
 */

import { render, screen } from '@testing-library/react';
import { generateMarkdownTable, MarkdownTable, MarkdownTableError } from '../index';

const data = [['Name', 'Age'], ['Ann', 30]] as const;

describe('generateMarkdownTable', () => {
  it('should use the component defaults when no options are given', () => {
    expect(generateMarkdownTable(data)).toBe('| Name | Age |\n| ---- | --- |\n| Ann  | 30  |');
  });

  it('should align columns', () => {
    expect(generateMarkdownTable(data, { columnAlignments: ['left', 'right'] })).toBe(
      '| Name | Age |\n| :--- | --: |\n| Ann  |  30 |'
    );
  });

  it('should leave columns unpadded when compact', () => {
    expect(generateMarkdownTable(data, { isCompact: true })).toBe('| Name | Age |\n| --- | --- |\n| Ann | 30 |');
  });

  it('should leave out the spaces around cells without padding', () => {
    expect(generateMarkdownTable(data, { hasPadding: false })).toBe('|Name|Age|\n|----|---|\n|Ann |30 |');
  });

  it('should pad cells with tabs', () => {
    expect(generateMarkdownTable(data, { hasTabs: true })).toBe(
      '|\tName\t|\tAge\t|\n|\t----\t|\t---\t|\n|\tAnn \t|\t30 \t|'
    );
  });

  it('should label columns A, B, C... without a header row', () => {
    expect(generateMarkdownTable([['Ann', 30]], { hasHeader: false })).toBe('| A   | B   |\n| --- | --- |\n| Ann | 30  |');
  });

  it('should convert line breaks to br tags', () => {
    expect(generateMarkdownTable([['Note'], ['a\nb']], { convertLineBreaks: true })).toBe(
      '| Note   |\n| ------ |\n| a<br>b |'
    );
  });

  it('should throw a MarkdownTableError for invalid data', () => {
    expect(() => generateMarkdownTable(null as never)).toThrow(
      new MarkdownTableError("The 'inputData' prop must be a two-dimensional array.")
    );
    expect(() => generateMarkdownTable([])).toThrow(MarkdownTableError);
  });

  it('should throw a MarkdownTableError for an unknown alignment', () => {
    expect(() => generateMarkdownTable(data, { columnAlignments: ['middle' as never] })).toThrow(MarkdownTableError);
  });

  it('should match what the component renders', () => {
    const options = { columnAlignments: ['center', 'right'], hasHeader: false, convertLineBreaks: true } as const;

    render(<MarkdownTable inputData={data} {...options} />);

    expect(screen.getByRole('code').textContent).toBe(generateMarkdownTable(data, options));
  });
});
