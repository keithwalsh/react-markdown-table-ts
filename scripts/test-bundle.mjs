/**
 * @fileoverview Renders the built ESM and CJS bundles with the installed React
 * version, and calls their generateMarkdownTable export. Catches bundling
 * regressions, such as a copy of React's JSX runtime being inlined, that unit
 * tests against src/ cannot see. Run after `npm run build`.
 */

import { createRequire } from 'node:module';
import { createElement, version } from 'react';
import { renderToString } from 'react-dom/server';
import * as esm from '../dist/index.mjs';

const require = createRequire(import.meta.url);
const cjs = require('../dist/index.cjs');

const inputData = [['Name', 'Age'], ['Ann', '30']];
const expectedRow = '| Name | Age |';

for (const [format, { MarkdownTable, generateMarkdownTable }] of [['ESM', esm], ['CJS', cjs]]) {
  const html = renderToString(createElement(MarkdownTable, { inputData }));
  if (!html.includes(expectedRow)) {
    throw new Error(`${format} bundle did not render "${expectedRow}" with React ${version}:\n${html}`);
  }
  const markdown = generateMarkdownTable(inputData);
  if (!markdown.startsWith(expectedRow)) {
    throw new Error(`${format} bundle's generateMarkdownTable returned:\n${markdown}`);
  }
  console.log(`${format} bundle renders with React ${version} and generates tables`);
}
