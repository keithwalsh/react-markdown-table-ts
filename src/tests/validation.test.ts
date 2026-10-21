/**
 * @fileoverview Comprehensive tests for validation utilities and custom error
 * class.
 */

import { validateInputData, validateColumnAlignments, MarkdownTableError } from '../validation';

describe('MarkdownTableError', () => {
  describe('constructor', () => {
    it('should create an error with the given message', () => {
      const message = 'Test error message';
      const error = new MarkdownTableError(message);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(MarkdownTableError);
      expect(error.message).toBe(message);
      expect(error.name).toBe('MarkdownTableError');
    });

    it('should support error chaining with cause option', () => {
      const originalError = new Error('Original error');
      const message = 'Wrapped error';
      const error = new MarkdownTableError(message, { cause: originalError });

      expect(error.message).toBe(message);
      expect(error.cause).toBe(originalError);
    });

    it('should have correct prototype chain', () => {
      const error = new MarkdownTableError('Test');

      expect(Object.getPrototypeOf(error)).toBe(MarkdownTableError.prototype);
    });

    it('should be catchable as Error', () => {
      try {
        throw new MarkdownTableError('Test error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(MarkdownTableError);
      }
    });
  });
});

describe('validateInputData', () => {
  describe('valid input', () => {
    it('should accept a valid 2D array with one row', () => {
      const validData = [['A', 'B', 'C']];
      expect(() => validateInputData(validData)).not.toThrow();
    });

    it('should accept a valid 2D array with multiple rows', () => {
      const validData = [
        ['Header1', 'Header2', 'Header3'],
        ['Row1Col1', 'Row1Col2', 'Row1Col3'],
        ['Row2Col1', 'Row2Col2', 'Row2Col3'],
      ];
      expect(() => validateInputData(validData)).not.toThrow();
    });

    it('should accept an array with empty string cells', () => {
      const validData = [['', 'B', ''], ['D', '', 'F']];
      expect(() => validateInputData(validData)).not.toThrow();
    });

    it('should accept an array with rows of different lengths', () => {
      const validData = [
        ['A', 'B', 'C'],
        ['D', 'E'],
        ['F', 'G', 'H', 'I'],
      ];
      expect(() => validateInputData(validData)).not.toThrow();
    });

    it('should accept an array with a single cell', () => {
      const validData = [['A']];
      expect(() => validateInputData(validData)).not.toThrow();
    });
  });

  describe('null and undefined input', () => {
    it('should throw MarkdownTableError for null input', () => {
      expect(() => validateInputData(null)).toThrow(MarkdownTableError);
      expect(() => validateInputData(null)).toThrow(
        "The 'inputData' prop must be a two-dimensional array."
      );
    });

    it('should throw MarkdownTableError for undefined input', () => {
      expect(() => validateInputData(undefined)).toThrow(MarkdownTableError);
      expect(() => validateInputData(undefined)).toThrow(
        "The 'inputData' prop must be a two-dimensional array."
      );
    });
  });

  describe('non-array input', () => {
    it('should throw MarkdownTableError for string input', () => {
      expect(() => validateInputData('not an array')).toThrow(MarkdownTableError);
      expect(() => validateInputData('not an array')).toThrow(
        "The 'inputData' prop must be a two-dimensional array."
      );
    });

    it('should throw MarkdownTableError for number input', () => {
      expect(() => validateInputData(123)).toThrow(MarkdownTableError);
    });

    it('should throw MarkdownTableError for boolean input', () => {
      expect(() => validateInputData(true)).toThrow(MarkdownTableError);
      expect(() => validateInputData(false)).toThrow(MarkdownTableError);
    });

    it('should throw MarkdownTableError for object input', () => {
      expect(() => validateInputData({ key: 'value' })).toThrow(MarkdownTableError);
    });

    it('should throw MarkdownTableError for function input', () => {
      expect(() => validateInputData(() => {})).toThrow(MarkdownTableError);
    });
  });

  describe('empty array input', () => {
    it('should throw MarkdownTableError for empty array', () => {
      expect(() => validateInputData([])).toThrow(MarkdownTableError);
      expect(() => validateInputData([])).toThrow(
        "The 'inputData' array must contain at least one row."
      );
    });
  });

  describe('rows that are not arrays', () => {
    it('should throw MarkdownTableError for a null row', () => {
      expect(() => validateInputData([['A'], null])).toThrow(MarkdownTableError);
      expect(() => validateInputData([['A'], null])).toThrow(
        "The 'inputData' prop must be a two-dimensional array, but inputData[1] is null."
      );
    });

    it('should throw MarkdownTableError for a string row instead of splitting it into cells', () => {
      expect(() => validateInputData([['A', 'B'], 'CD'])).toThrow(
        "The 'inputData' prop must be a two-dimensional array, but inputData[1] is 'CD'."
      );
    });

    it('should throw MarkdownTableError for a one-dimensional array', () => {
      expect(() => validateInputData(['A', 'B'])).toThrow(
        "The 'inputData' prop must be a two-dimensional array, but inputData[0] is 'A'."
      );
    });

    it('should report the first invalid row', () => {
      expect(() => validateInputData([['A'], undefined, 3])).toThrow('inputData[1] is undefined.');
    });
  });

  describe('rows without cells', () => {
    it('should throw MarkdownTableError when the only row is empty', () => {
      expect(() => validateInputData([[]])).toThrow(MarkdownTableError);
      expect(() => validateInputData([[]])).toThrow(
        "The 'inputData' array must contain at least one cell."
      );
    });

    it('should throw MarkdownTableError when every row is empty', () => {
      expect(() => validateInputData([[], [], []])).toThrow(
        "The 'inputData' array must contain at least one cell."
      );
    });

    it('should accept empty rows when another row has a cell', () => {
      expect(() => validateInputData([[], ['A']])).not.toThrow();
    });
  });

  describe('edge cases', () => {

    it('should accept array with special characters', () => {
      const data = [['!@#$%', '^&*()', '{}[]<>']];
      expect(() => validateInputData(data)).not.toThrow();
    });

    it('should accept array with unicode characters', () => {
      const data = [['日本語', '한국어', 'العربية']];
      expect(() => validateInputData(data)).not.toThrow();
    });

    it('should accept array with newline characters in cells', () => {
      const data = [['Line1\nLine2', 'Normal', 'Another\nMultiline']];
      expect(() => validateInputData(data)).not.toThrow();
    });

    it('should accept array with very long strings', () => {
      const longString = 'A'.repeat(10000);
      const data = [[longString, 'B', 'C']];
      expect(() => validateInputData(data)).not.toThrow();
    });
  });
});

describe('validateColumnAlignments', () => {
  it('should accept an empty array', () => {
    expect(() => validateColumnAlignments([])).not.toThrow();
  });

  it('should accept every known alignment', () => {
    expect(() => validateColumnAlignments(['left', 'center', 'right', 'none'])).not.toThrow();
  });

  it('should throw MarkdownTableError for an unknown alignment', () => {
    expect(() => validateColumnAlignments(['left', 'middle'])).toThrow(MarkdownTableError);
    expect(() => validateColumnAlignments(['left', 'middle'])).toThrow(
      "The 'columnAlignments' prop must only contain 'left', 'center', 'right' or 'none', but columnAlignments[1] is 'middle'."
    );
  });

  it('should throw MarkdownTableError for a non-string alignment', () => {
    expect(() => validateColumnAlignments([null])).toThrow('columnAlignments[0] is null.');
  });

  it('should throw MarkdownTableError when alignments are not an array', () => {
    expect(() => validateColumnAlignments('left')).toThrow(MarkdownTableError);
    expect(() => validateColumnAlignments('left')).toThrow("The 'columnAlignments' prop must be an array.");
  });
});
