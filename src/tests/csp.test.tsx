/**
 * @fileoverview Tests for pages with a strict Content-Security-Policy. React 19
 * keeps the first copy of the shared stylesheet in the document head, so these
 * tests live in their own file to render it first.
 */

import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MarkdownTable } from '../index';
import { getStyleElement, testData } from './test-utils';

describe('Content-Security-Policy support', () => {
  it('should put the nonce on the style tag', () => {
    render(<MarkdownTable inputData={testData.simple} nonce="r4nd0m" />);

    expect(getStyleElement()?.getAttribute('nonce')).toBe('r4nd0m');
  });

  it('should need no inline styles with the default props', () => {
    // A strict policy blocks style attributes in server-rendered HTML
    const { container } = render(<MarkdownTable inputData={testData.withHeader} />);

    expect(container.querySelectorAll('[style]')).toHaveLength(0);
  });

  it('should lay out the line numbers from the stylesheet', () => {
    const { container } = render(<MarkdownTable inputData={testData.withHeader} />);

    const lineNumbers = getComputedStyle(container.querySelector('.rmt-line-numbers')!);
    // The line numbers come first in the row, and their gutter widens to fit them
    expect(lineNumbers.order).toBe('-1');
    expect(lineNumbers.minWidth).toBe('27.2px');
    expect(lineNumbers.boxSizing).toBe('content-box');
    expect(lineNumbers.pointerEvents).toBe('none');
    expect(lineNumbers.userSelect).toBe('none');
    expect(lineNumbers.textAlign).toBe('right');
    expect(lineNumbers.whiteSpace).toBe('pre');
    // jsdom resolves the stylesheet's 1.7em and 1.5em against its 16px default font size
    expect(getComputedStyle(container.querySelector('pre')!).paddingLeft).toBe('0px');
    expect(getComputedStyle(container.querySelector('code')!).paddingLeft).toBe('24px');
  });
});
