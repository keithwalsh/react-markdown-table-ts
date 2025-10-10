/**
 * @fileoverview Jest setup configuration including mocks for Prism.js and
 * testing library extensions.
 */

import '@testing-library/jest-dom';

// Mock Prism.js
jest.mock('prismjs', () => ({
  __esModule: true,
  default: {
    highlightElement: jest.fn(),
    highlightAll: jest.fn(),
  },
}));

// Mock Prism markdown component
jest.mock('prismjs/components/prism-markdown', () => ({}));

// Mock Prism line numbers plugin
jest.mock('prismjs/plugins/line-numbers/prism-line-numbers', () => ({}));

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 0) as unknown as number;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

