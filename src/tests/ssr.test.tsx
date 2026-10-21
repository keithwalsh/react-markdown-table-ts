/**
 * @fileoverview Server rendering tests that check the theme CSS survives
 * renderToString and that the server HTML hydrates without mismatches.
 * The node export condition loads react-dom's Node server build, since the
 * browser build needs TextEncoder and MessageChannel, which jsdom lacks.
 * @jest-environment-options {"customExportConditions": ["node"]}
 */

import { act } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { MarkdownTable } from '../index';
import { testData, getStyleElement } from './test-utils';

// Unmock LineNumbers so the server and client render the real markup
jest.unmock('../LineNumbers');

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
    expect(css).toContain('.line-numbers > code');
  });

  it('should hydrate the server HTML without recoverable errors', async () => {
    const element = <MarkdownTable inputData={testData.withHeader} theme="dark" />;
    const container = renderOnServer(element);
    const onRecoverableError = jest.fn();

    await act(async () => {
      hydrateRoot(container, element, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
  });
});
