/**
 * @fileoverview Writes a .d.cts copy of each .d.ts file in dist/. With
 * "type": "module", TypeScript reads .d.ts files as ESM, so CommonJS consumers
 * need .d.cts declarations whose relative imports point at other .d.cts files.
 * Run after tsc has emitted declarations.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const distDir = new URL('../dist/', import.meta.url);
const RELATIVE_JS_SPECIFIER_PATTERN = /(['"])(\.{1,2}\/[^'"]+)\.js\1/g;

const declarationFiles = readdirSync(distDir).filter(file => file.endsWith('.d.ts'));

for (const file of declarationFiles) {
  const source = readFileSync(new URL(file, distDir), 'utf8');
  const cjsSource = source.replace(RELATIVE_JS_SPECIFIER_PATTERN, '$1$2.cjs$1');
  writeFileSync(new URL(file.replace(/\.d\.ts$/, '.d.cts'), distDir), cjsSource);
}

console.log(`Wrote ${declarationFiles.length} .d.cts files`);
