/**
 * @fileoverview Renders the built ESM and CJS bundles with the installed React
 * version, and calls their generateMarkdownTable and getColumnName exports.
 * Checks that the react-markdown-table-ts/core bundles and declarations never
 * load React. Catches bundling regressions, such as a copy of React's JSX
 * runtime being inlined, that unit tests against src/ cannot see. Run after
 * `npm run build`.
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createElement, version } from 'react';
import { renderToString } from 'react-dom/server';
import * as esm from '../dist/index.mjs';
import * as esmCore from '../dist/core.mjs';

const require = createRequire(import.meta.url);
const cjs = require('../dist/index.cjs');
const cjsCore = require('../dist/core.cjs');
// What resolvers that don't read package.json exports, such as Jest 27's, load for react-markdown-table-ts/core
const legacyCore = require('../core');

const inputData = [['Name', 'Age'], ['Ann', '30']];
const expectedRow = '| Name | Age |';

function checkGenerator(name, { generateMarkdownTable, getColumnName, MarkdownTableError }) {
  const markdown = generateMarkdownTable(inputData);
  if (!markdown.startsWith(expectedRow)) {
    throw new Error(`${name}'s generateMarkdownTable returned:\n${markdown}`);
  }
  if (getColumnName(27) !== 'AB') {
    throw new Error(`${name}'s getColumnName(27) returned ${getColumnName(27)}`);
  }
  try {
    generateMarkdownTable([]);
    throw new Error(`${name}'s generateMarkdownTable accepted an empty table`);
  } catch (error) {
    if (!(error instanceof MarkdownTableError)) {
      throw error;
    }
  }
}

for (const [format, bundle] of [['ESM', esm], ['CJS', cjs]]) {
  const html = renderToString(createElement(bundle.MarkdownTable, { inputData }));
  if (!html.includes(expectedRow)) {
    throw new Error(`${format} bundle did not render "${expectedRow}" with React ${version}:\n${html}`);
  }
  checkGenerator(`${format} bundle`, bundle);
  console.log(`${format} bundle renders with React ${version} and generates tables`);
}

for (const [format, bundle] of [['ESM', esmCore], ['CJS', cjsCore], ['core/package.json', legacyCore]]) {
  checkGenerator(`${format} core bundle`, bundle);
}

// Follows relative imports from each file, and fails on any import of React
const IMPORT_PATTERN = /(?:from\s*|import\s*\(?|require\()\s*["']([^"']+)["']/g;

/** The file a relative import loads. A declaration file's ./x.js import is ./x.d.ts, and its ./x.cjs import is ./x.d.cts. */
function resolveImport(specifier, file) {
  const declarationSpecifier = file.pathname.endsWith('.d.ts')
    ? specifier.replace(/\.js$/, '.d.ts')
    : file.pathname.endsWith('.d.cts')
      ? specifier.replace(/\.cjs$/, '.d.cts')
      : specifier;
  return new URL(declarationSpecifier, file);
}

function checkNoReact(file, seen = new Set()) {
  if (seen.has(file.href)) {
    return;
  }
  seen.add(file.href);
  for (const [, specifier] of readFileSync(file, 'utf8').matchAll(IMPORT_PATTERN)) {
    if (/^react($|\/)/.test(specifier)) {
      throw new Error(`${file.pathname} imports ${specifier}, so react-markdown-table-ts/core would need React`);
    }
    if (specifier.startsWith('.')) {
      checkNoReact(resolveImport(specifier, file), seen);
    }
  }
}

for (const file of ['core.mjs', 'core.cjs', 'core.d.ts', 'core.d.cts']) {
  checkNoReact(new URL(`../dist/${file}`, import.meta.url));
}
console.log('core bundles and declarations generate tables without importing React');
