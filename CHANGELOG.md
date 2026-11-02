# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows [Semantic Versioning](https://semver.org/).

## [2.2.0] - 2026-11-02

### Added

- `theme="inherit"` takes the text colour from the page and has no background or text shadow, so the table follows an app's own light and dark modes, such as a Tailwind `dark` class. Selected text keeps the page's own `::selection` colours.
- `useMarkdownTable(inputData, options)` returns `{ markdown, error }` for copy buttons, downloads and previews, and keeps working while the table isn't on the page. When `inputData` is invalid, `error` is set and `markdown` is empty, so a page can show its own error or empty state.
- A `markdown` prop shows a table from `useMarkdownTable` as it is, so the table isn't generated twice.
- `react-markdown-table-ts/core` exports `generateMarkdownTable`, `getColumnName`, `MarkdownTableError` and the option types without React, for Node scripts, CLIs and other frameworks. React and React DOM are now optional peer dependencies, so npm doesn't install them for those.
- CSS variables for the size and spacing: `--rmt-padding`, `--rmt-width`, `--rmt-font-size` and `--rmt-line-height`, and `--rmt-line-number-border` for the line beside the line numbers. `--rmt-width: 100%` makes a full-width table.

### Changed

- The padding is the same on every side, `1em` by default, and comes from `--rmt-padding`. Without line numbers, the table has `1em` of space on its left instead of `.3em`. The space above it is `1em` instead of `16px`, which only differs when the table's font size isn't 16px.
- The line numbers are laid out beside the table instead of positioned over the `<pre>` element's padding, and widen to fit. CSS that sets the `top`, `left` or `width` of `.rmt-line-numbers` no longer works the same way.
- The table is generated again only when a cell changes, rather than whenever `inputData` is a new array. Rows built during render no longer generate the table on every render, `onGenerate` isn't called again for a new array with the same cells, and a cell changed in place shows the next time the component renders.

### Deprecated

- `topPadding`. Set `--rmt-padding` instead, such as `--rmt-padding: 2em 1em 1em`. `topPadding` now pads the `<pre>` element rather than the `<code>` element, and adds a `style` attribute whenever it's set, including to 16.

### Fixed

- Line numbers of three or more digits no longer crowd or overlap the line beside them, including on pages that make every element `box-sizing: border-box`, as Tailwind does.
- A page's `padding` on `code` elements no longer adds space to the right of and below the table.

## [2.1.0] - 2026-10-28

### Added

- The colours, corners and font come from `--rmt-*` CSS variables, which the README's Colours and Font section lists. A value the page sets wins over the theme's wherever it's set, such as on `:root`, on a parent element or in a cascade layer. Before, the variables weren't documented, and a value set anywhere but the `className` element could lose to the theme.
- `--rmt-font-family` sets the font.
- `getColumnName(index)` returns the A, B, C… header the table gives a column when `hasHeader` is false, so an editor can label its columns to match.

### Changed

- The `<pre>` element is only in the tab order while the table scrolls, so tables that fit are no longer tab stops. Pass `tabIndex={0}` to keep a table focusable, for example to focus it through a `ref`.
- The themes set `--rmt-theme-*` variables rather than `--rmt-*` ones. Tables look the same, but CSS that reads a variable such as `var(--rmt-background)` without setting it no longer gets the theme's value.

## [2.0.1] - 2026-10-24

### Fixed

- With line numbers off and a `className`, the `<pre>` element's class attribute no longer has a double space.

## [2.0.0] - 2026-10-23

Tables look the same. The breaking changes are to class names and exported types:

- CSS that targets `language-markdown`, `line-numbers`, `line-numbers-rows` or `dark-theme` needs the new class names below. The README's Custom Styles section lists them all.
- Code that imports the `InputData` or `TableConfig` types should use `MarkdownTableProps['inputData']` or `CellValue[][]` instead.

### Changed

- The `<pre>`, `<code>` and line numbers elements have the classes `rmt-pre`, `rmt-code` and `rmt-line-numbers` instead of Prism's `language-markdown` and `line-numbers-rows`. With line numbers, the `<pre>` has `rmt-has-line-numbers` instead of `line-numbers`.
- The bundles are built with Vite 8. With the shorter class names, the ES module is 6% smaller and the CommonJS one 3%.

### Fixed

- A page that loads Prism and runs its highlighter no longer restyles the table or adds a second column of line numbers.

### Removed

- The `dark-theme` class on the `<pre>` element with `theme="dark"`. Target `.rmt-dark .rmt-pre` instead.
- The `InputData` and `TableConfig` type exports, which no public function accepted.

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

[2.2.0]: https://github.com/keithwalsh/react-markdown-table-ts/compare/c12c6d6...main
[2.1.0]: https://github.com/keithwalsh/react-markdown-table-ts/compare/f54689a...c12c6d6
[2.0.1]: https://github.com/keithwalsh/react-markdown-table-ts/compare/4c5d91c...f54689a
[2.0.0]: https://github.com/keithwalsh/react-markdown-table-ts/compare/667a2bc...4c5d91c
[1.6.1]: https://github.com/keithwalsh/react-markdown-table-ts/compare/4901149...667a2bc
[1.6.0]: https://github.com/keithwalsh/react-markdown-table-ts/compare/ff06d3b...4901149
[1.5.2]: https://github.com/keithwalsh/react-markdown-table-ts/compare/27b3b8f...ff06d3b
[1.5.1]: https://github.com/keithwalsh/react-markdown-table-ts/compare/v1.5.0...27b3b8f
