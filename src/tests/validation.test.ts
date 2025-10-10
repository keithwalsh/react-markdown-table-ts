/**
 * @fileoverview Comprehensive tests for validation utilities and custom error
 * class.
 */

import { validateInputData, MarkdownTableError } from '../validation';

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
        "The 'data' prop must be a two-dimensional array."
      );
    });

    it('should throw MarkdownTableError for undefined input', () => {
      expect(() => validateInputData(undefined)).toThrow(MarkdownTableError);
      expect(() => validateInputData(undefined)).toThrow(
        "The 'data' prop must be a two-dimensional array."
      );
    });
  });

  describe('non-array input', () => {
    it('should throw MarkdownTableError for string input', () => {
      expect(() => validateInputData('not an array')).toThrow(MarkdownTableError);
      expect(() => validateInputData('not an array')).toThrow(
        "The 'data' prop must be a two-dimensional array."
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
        "The 'data' array must contain at least one row."
      );
    });
  });

  describe('edge cases', () => {
    it('should accept array with nested empty arrays', () => {
      const data = [[]];
      expect(() => validateInputData(data)).not.toThrow();
    });

    it('should accept array with multiple empty nested arrays', () => {
      const data = [[], [], []];
      expect(() => validateInputData(data)).not.toThrow();
    });

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

