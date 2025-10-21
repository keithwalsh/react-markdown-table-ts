/**
 * @fileoverview Jest setup configuration including mocks for React components and
 * testing library extensions.
 */

import React from 'react';
import '@testing-library/jest-dom';

// Mock React components from LineNumbers.tsx
jest.mock('../LineNumbers', () => ({
  LineNumbers: ({ children, showLineNumbers, className, style }: any) => 
    React.createElement('pre', { 
      className: `language-markdown ${showLineNumbers ? 'line-numbers' : ''} ${className || ''}`.trim(),
      style 
    }, 
      React.createElement('code', { 
        className: 'language-markdown',
        role: 'code'
      }, children)
    ),
  LineNumbersRows: ({ lines, startLine }: any) => 
    React.createElement('span', { className: 'line-numbers-rows' },
      lines.map((_: any, index: number) => 
        React.createElement('span', { key: index }, startLine + index)
      )
    ),
  LineNumber: ({ number }: any) => React.createElement('span', {}, number),
  useLineNumbers: () => ({
    lines: [],
    lineNumbers: [],
    lineHeights: [],
    sizerRef: { current: null },
    calculateLineHeights: jest.fn()
  }),
  useResizeObserver: jest.fn()
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 0) as unknown as number;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

