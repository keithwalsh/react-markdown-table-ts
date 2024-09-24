import {validateMarkdownTableProps} from '../src/validation';
import {MarkdownTableError} from '../src/errors';
import {MarkdownTableProps} from '../src/types';

describe('validateMarkdownTableProps', () => {
  const validData: string[][] = [
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
    ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
  ];

  it('validates correct props without throwing', () => {
    expect(() => validateMarkdownTableProps({data: validData})).not.toThrow();
  });

  it('throws error for empty data', () => {
    expect(() => validateMarkdownTableProps({data: []})).toThrow(
      MarkdownTableError
    );
  });

  it('throws error for invalid data type', () => {
    expect(() =>
      validateMarkdownTableProps({
        data: 'not an array' as unknown as string[][],
      })
    ).toThrow(MarkdownTableError);
  });

  it('throws error for invalid header when hasHeader is true', () => {
    const invalidData: string[][] = [[], ['Row 1']];
    expect(() =>
      validateMarkdownTableProps({data: invalidData, hasHeader: true})
    ).toThrow(MarkdownTableError);
  });

  it('throws error for non-string cell in header', () => {
    const invalidData: (string | number)[][] = [
      [1, 'Header 2', 'Header 3'],
      ['Row 1'],
    ];
    expect(() =>
      validateMarkdownTableProps({data: invalidData as unknown as string[][]})
    ).toThrow(MarkdownTableError);
  });

  it('throws error for non-string cell in body', () => {
    const invalidData: (string | number)[][] = [
      ['Header 1', 'Header 2'],
      ['Row 1', 2],
    ];
    expect(() =>
      validateMarkdownTableProps({data: invalidData as unknown as string[][]})
    ).toThrow(MarkdownTableError);
  });

  it('throws error for invalid column alignment', () => {
    const props: MarkdownTableProps = {
      data: validData,
      columnAlignments: [
        'left',
        'invalid' as 'left' | 'center' | 'right' | 'none',
      ],
    };
    expect(() => validateMarkdownTableProps(props)).toThrow(MarkdownTableError);
  });

  it('throws error for invalid isCompact prop', () => {
    expect(() =>
      validateMarkdownTableProps({
        data: validData,
        isCompact: 'true' as unknown as boolean,
      })
    ).toThrow(MarkdownTableError);
  });

  it('throws error for invalid hasTabs prop', () => {
    expect(() =>
      validateMarkdownTableProps({
        data: validData,
        hasTabs: 'true' as unknown as boolean,
      })
    ).toThrow(MarkdownTableError);
  });

  it('throws error for invalid canReplaceNewlines prop', () => {
    expect(() =>
      validateMarkdownTableProps({
        data: validData,
        canReplaceNewlines: 'true' as unknown as boolean,
      })
    ).toThrow(MarkdownTableError);
  });
});
