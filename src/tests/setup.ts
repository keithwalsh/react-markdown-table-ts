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
    )
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 0) as unknown as number;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

