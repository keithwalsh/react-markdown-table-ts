/**
 * @fileoverview Reusable test utilities, fixtures, and helper functions for
 * testing MarkdownTable and LineNumbers components.
 */

import { expect } from 'vitest';

/**
 * Common test data fixtures for reuse across test files
 */
export const testData = {
  simple: [['A'], ['1']],
  twoColumn: [['A', 'B'], ['1', '2']],
  withHeader: [['Name', 'Age'], ['John', '30'], ['Jane', '25']],
  threeColumn: [['A', 'B', 'C'], ['1', '2', '3']],
  multiRow: [
    ['Header1', 'Header2'],
    ['Value1', 'Value2'],
    ['Value3', 'Value4'],
  ],
  withNewlines: [['Header'], ['Line1\nLine2']],
  unicode: [['日本語', '한국어'], ['こんにちは', '안녕하세요']],
  specialChars: [['<>', '&amp;', '\'"`']],
  empty: [['', ''], ['', '']],
};

/**
 * Helper function to get pre element from container
 */
export function getPreElement(container: HTMLElement): HTMLPreElement | null {
  return container.querySelector('pre');
}

/**
 * Helper function to get code element from container
 */
export function getCodeElement(container: HTMLElement): HTMLElement | null {
  return container.querySelector('code');
}

/**
 * Helper function to get line numbers span from container
 */
export function getLineNumbersSpan(container: HTMLElement): HTMLSpanElement | null {
  return container.querySelector('.rmt-line-numbers');
}

/**
 * Helper function to get the line numbers shown, one per line
 */
export function getLineNumbers(container: HTMLElement): string[] | undefined {
  return getLineNumbersSpan(container)?.textContent?.split('\n');
}

/**
 * Helper function to get the shared stylesheet. React 19 hoists it into the
 * document head, so search the whole document unless given a detached root.
 */
export function getStyleElement(root: ParentNode = document): HTMLStyleElement | null {
  return root.querySelector('style');
}

/**
 * Helper to get the declarations of the CSS rule with exactly this selector
 */
export function getCssRule(css: string | null | undefined, selector: string): string | undefined {
  const lines = `\n${css ?? ''}`;
  const start = lines.indexOf(`\n${selector} {\n`);
  if (start === -1) return undefined;
  return lines.slice(start + selector.length + 4, lines.indexOf('}', start));
}

/**
 * Helper function to get wrapper div from container
 */
export function getWrapperDiv(container: HTMLElement): HTMLDivElement | null {
  return container.querySelector('div');
}

/**
 * Helper to check if element has a class
 */
export function hasClass(element: Element | null, className: string): boolean {
  return element?.className.includes(className) ?? false;
}

/**
 * Helper to verify pre element styles
 */
export function expectPreStyle(
  container: HTMLElement,
  styles: Record<string, string>
): void {
  const preElement = getPreElement(container) as HTMLPreElement;
  Object.entries(styles).forEach(([prop, value]) => {
    expect(preElement.style[prop as any]).toBe(value);
  });
}


/**
 * Helper to verify class names on pre element
 */
export function expectPreClasses(
  container: HTMLElement,
  expectedClasses: string[]
): void {
  const preElement = getPreElement(container);
  expectedClasses.forEach(className => {
    expect(hasClass(preElement, className)).toBe(true);
  });
}

/**
 * Helper to verify class names are NOT on pre element
 */
export function expectPreNotToHaveClasses(
  container: HTMLElement,
  unexpectedClasses: string[]
): void {
  const preElement = getPreElement(container);
  unexpectedClasses.forEach(className => {
    expect(hasClass(preElement, className)).toBe(false);
  });
}
