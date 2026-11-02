/**
 * @fileoverview Tests for the useMarkdownTable hook.
 */

import { describe, expect, it } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import { MarkdownTable, MarkdownTableError, generateMarkdownTable, useMarkdownTable } from '../index';
import { testData } from './test-utils';

// MarkdownTable's tests cover errors other than MarkdownTableError, which the hook throws to the nearest error boundary
describe('useMarkdownTable', () => {
  it('should return the same Markdown as generateMarkdownTable', () => {
    const { result } = renderHook(() => useMarkdownTable(testData.withHeader));

    expect(result.current).toEqual({ markdown: generateMarkdownTable(testData.withHeader), error: null });
  });

  it('should apply the formatting options', () => {
    const options = { columnAlignments: ['right', 'center'], isCompact: true, hasHeader: false } as const;

    const { result } = renderHook(() => useMarkdownTable(testData.twoColumn, options));

    expect(result.current.markdown).toBe(generateMarkdownTable(testData.twoColumn, options));
  });

  it.each([null, undefined])('should return an empty table without an error for %s', inputData => {
    const { result } = renderHook(() => useMarkdownTable(inputData));

    expect(result.current).toEqual({ markdown: '', error: null });
  });

  it('should return the error and no Markdown for invalid data', () => {
    const { result } = renderHook(() => useMarkdownTable([]));

    expect(result.current.markdown).toBe('');
    expect(result.current.error).toBeInstanceOf(MarkdownTableError);
    expect(result.current.error?.message).toBe("The 'inputData' array must contain at least one row.");
  });

  it('should return the error for invalid column alignments', () => {
    const { result } = renderHook(() => useMarkdownTable(testData.simple, { columnAlignments: ['middle' as any] }));

    expect(result.current.markdown).toBe('');
    expect(result.current.error).toBeInstanceOf(MarkdownTableError);
  });

  it('should keep the result while the data and options are unchanged', () => {
    const { result, rerender } = renderHook(() =>
      // A new options object and alignments array on every render, as written inline
      useMarkdownTable(testData.twoColumn, { columnAlignments: ['left', 'right'], hasPadding: true })
    );
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('should generate the table again when an option changes', () => {
    const { result, rerender } = renderHook(({ isCompact }) => useMarkdownTable(testData.withHeader, { isCompact }), {
      initialProps: { isCompact: false },
    });

    rerender({ isCompact: true });

    expect(result.current.markdown).toBe(generateMarkdownTable(testData.withHeader, { isCompact: true }));
  });

  it('should match the table MarkdownTable shows', () => {
    const { result } = renderHook(() => useMarkdownTable(testData.withHeader, { columnAlignments: ['center'] }));

    render(<MarkdownTable inputData={testData.withHeader} columnAlignments={['center']} />);

    expect(screen.getByRole('code').textContent).toBe(result.current.markdown);
  });
});
