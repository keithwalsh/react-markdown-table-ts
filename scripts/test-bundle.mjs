/**
 * @fileoverview Renders the built ESM and CJS bundles with the installed React
 * version. Catches bundling regressions, such as a copy of React's JSX runtime
 * being inlined, that unit tests against src/ cannot see. Run after `npm run build`.
 */

import { createRequire } from 'node:module';
import { createElement, version } from 'react';
import { renderToString } from 'react-dom/server';
import { MarkdownTable as EsmMarkdownTable } from '../dist/index.mjs';

const require = createRequire(import.meta.url);
const { MarkdownTable: CjsMarkdownTable } = require('../dist/index.cjs');

const inputData = [['Name', 'Age'], ['Ann', '30']];
const expectedRow = '| Name | Age |';

for (const [format, MarkdownTable] of [['ESM', EsmMarkdownTable], ['CJS', CjsMarkdownTable]]) {
  const html = renderToString(createElement(MarkdownTable, { inputData }));
  if (!html.includes(expectedRow)) {
    throw new Error(`${format} bundle did not render "${expectedRow}" with React ${version}:\n${html}`);
  }
  console.log(`${format} bundle renders with React ${version}`);
}
