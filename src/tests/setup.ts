/**
 * @fileoverview Jest setup configuration including testing library extensions
 * and a requestAnimationFrame mock.
 */

import '@testing-library/jest-dom';

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 0) as unknown as number;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

