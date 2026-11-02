/**
 * @fileoverview Tests for the react-markdown-table-ts/core entry point.
 */

import { describe, expect, it } from 'vitest';
import * as core from '../core';
import * as main from '../index';

describe('react-markdown-table-ts/core', () => {
  it('should export the generator without the component or the hook', () => {
    expect(Object.keys(core).sort()).toEqual(['MarkdownTableError', 'generateMarkdownTable', 'getColumnName']);
  });

  it('should export the same functions as the main entry point', () => {
    expect(core.generateMarkdownTable).toBe(main.generateMarkdownTable);
    expect(core.getColumnName).toBe(main.getColumnName);
    expect(core.MarkdownTableError).toBe(main.MarkdownTableError);
  });
});
