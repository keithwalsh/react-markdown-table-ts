/**
 * @fileoverview Server rendering tests that check the theme CSS survives
 * renderToString and that the server HTML hydrates without mismatches.
 */

import { describe, expect, it, vi } from 'vitest';
import { act } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { MarkdownTable } from '../index';
import { testData, getStyleElement } from './test-utils';

function renderOnServer(element: React.ReactElement): HTMLDivElement {
  const container = document.createElement('div');
  container.innerHTML = renderToString(element);
  return container;
}

describe('server rendering', () => {
  it('should not HTML-escape the theme CSS', () => {
    const container = renderOnServer(<MarkdownTable inputData={testData.simple} />);

    const css = getStyleElement(container)?.textContent;
    expect(css).toContain("'Andale Mono'");
    expect(css).toContain('.rmt-has-line-numbers > code');
  });

  it('should keep each theme when separately rendered roots share a page', () => {
    const page = document.createElement('div');
    page.innerHTML =
      renderToString(<MarkdownTable inputData={testData.simple} />) +
      renderToString(<MarkdownTable inputData={testData.simple} theme="dark" />);

    const [light, dark] = page.querySelectorAll('pre');
    expect(light.closest('.rmt')?.className).toBe('rmt rmt-light');
    expect(dark.closest('.rmt')?.className).toBe('rmt rmt-dark');
    expect(page.querySelector('[id]')).toBeNull();
  });

  it('should hydrate the server HTML without recoverable errors', async () => {
    const element = <MarkdownTable inputData={testData.withHeader} theme="dark" />;
    const container = renderOnServer(element);
    const onRecoverableError = vi.fn();

    await act(async () => {
      hydrateRoot(container, element, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
  });
});
