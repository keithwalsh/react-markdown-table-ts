/**
 * @fileoverview Tests for pages with a strict Content-Security-Policy. React 19
 * keeps the first copy of the shared stylesheet in the document head, so these
 * tests live in their own file to render it first.
 */

import { render } from '@testing-library/react';
import { MarkdownTable } from '../index';
import { getStyleElement, testData } from './test-utils';

describe('Content-Security-Policy support', () => {
  it('should put the nonce on the style tag', () => {
    render(<MarkdownTable inputData={testData.simple} nonce="r4nd0m" />);

    expect(getStyleElement()?.getAttribute('nonce')).toBe('r4nd0m');
  });
});
