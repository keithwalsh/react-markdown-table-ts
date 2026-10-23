/**
 * @fileoverview Vitest setup: Testing Library's DOM matchers, and unmounting
 * rendered components after each test.
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Testing Library only cleans up by itself when afterEach is a global
afterEach(() => {
  cleanup();
});
