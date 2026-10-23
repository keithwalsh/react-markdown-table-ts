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

    const lineNumbers = getComputedStyle(container.querySelector('.line-numbers-rows')!);
    expect(lineNumbers.position).toBe('absolute');
    expect(lineNumbers.pointerEvents).toBe('none');
    expect(lineNumbers.userSelect).toBe('none');
    expect(lineNumbers.textAlign).toBe('right');
    expect(lineNumbers.whiteSpace).toBe('pre');
    // jsdom resolves the stylesheet's 1em and 3em against its 16px default font size
    expect(getComputedStyle(container.querySelector('pre')!).paddingLeft).toBe('16px');
    expect(getComputedStyle(container.querySelector('code')!).paddingLeft).toBe('48px');
  });
});
