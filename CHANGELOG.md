# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows [Semantic Versioning](https://semver.org/).

## [1.6.1] - 2026-10-23

### Fixed

- Tabs inside cells become spaces, so rows that contain tabs stay aligned.
- Zero-width characters, such as U+200B, count as no columns when cells are padded.
- Line numbers no longer show each number twice on pages that also load Prism's line-numbers plugin CSS.

### Changed

- Line numbers are one text node instead of a `<span>` per line, so a 10,000-row table renders about 3.5 times faster on the server. They look the same, but CSS that targets `.line-numbers-rows > span` no longer matches.

### Removed

- The `data-start` attribute on the `<pre>` element, left over from Prism.
- The `-o-tab-size` and `-ms-hyphens` CSS prefixes, which no browser that React supports reads.

## [1.6.0] - 2026-10-23

### Added

- `theme="auto"` follows the reader's `prefers-color-scheme` setting.
- `generateMarkdownTable(inputData, options)` returns the Markdown string without rendering anything. It throws a `MarkdownTableError` for invalid input.
- A `nonce` prop for the component's `<style>` tag, for pages whose Content-Security-Policy blocks inline styles.
- Other HTML attributes, such as `id`, `aria-label`, `data-*` attributes, event handlers and `tabIndex`, are passed to the `<pre>` element, and a `ref` points to it.
- `inputData` accepts readonly arrays, such as `as const` data, and number, boolean, `null` and `undefined` cells.
- The `CellValue` and `MarkdownTableOptions` types are exported.
- `react-markdown-table-ts/package.json` is exported.

### Changed

- `inputData` of `null` or `undefined` renders an empty table and calls `onGenerate('', null)`, instead of showing an error and passing a `MarkdownTableError`.
- A table wider than its container scrolls horizontally instead of overflowing it, and the table can be focused so keyboard users can scroll it. The `min-width: min-content` default is gone; set `maxWidth` or `overflowX` in `preStyle` to restore the old layout.
- The CSS is one stylesheet that every table shares, scoped by class rather than by element id. React 19 hoists a single copy into the `<head>`. With the default props, the markup has no `style` attributes.
- An unknown `theme` value renders the light theme instead of the dark one.
- Declaration maps are no longer published.

### Fixed

- Tables keep their theme under an `identifierPrefix` containing a dot, and when separately server-rendered roots share a page.
- `minWidth={0}` is applied instead of ignored.
- The published types no longer need TypeScript's ES2022 lib.

## [1.5.2] - 2026-10-22

### Fixed

- Selected text in the dark theme is readable.
- Light theme line numbers meet WCAG AA contrast.
- `onGenerate` and the display never combine old data with new options.
- Every column gets a header letter when `hasHeader` is `false`.
- Backslashes can no longer escape a table's pipes.
- Tables whose rows have no cells are rejected.
- Very long tables no longer overflow the call stack.
- Large tables generate faster, since each cell is measured once and plain text skips grapheme segmentation.

## [1.5.1] - 2026-10-21

### Fixed

- React 18 server rendering no longer escapes the theme CSS, which broke hydration.
- The package is MIT licensed again, with a LICENSE file.
- Rows that aren't arrays and unknown column alignments show an error instead of crashing.

[1.6.1]: https://github.com/keithwalsh/react-markdown-table-ts/compare/4901149...main
[1.6.0]: https://github.com/keithwalsh/react-markdown-table-ts/compare/ff06d3b...4901149
[1.5.2]: https://github.com/keithwalsh/react-markdown-table-ts/compare/27b3b8f...ff06d3b
[1.5.1]: https://github.com/keithwalsh/react-markdown-table-ts/compare/v1.5.0...27b3b8f
