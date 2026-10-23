/**
 * @fileoverview The stylesheet that every MarkdownTable shares. Its rules are
 * scoped by class rather than by element id, so they hold under any
 * identifierPrefix and across separately rendered React roots. It holds every
 * fixed style, so the elements only need inline styles for props that differ
 * from the defaults, which a strict Content-Security-Policy would block on
 * server-rendered pages.
 */

/** Identifies the stylesheet, so React 19 hoists a single copy into the document head */
export const STYLESHEET_HREF = 'react-markdown-table-ts';

/** The default topPadding in pixels, which the stylesheet applies without an inline style */
export const DEFAULT_TOP_PADDING = 16;

/** The class on each table's wrapper element for its theme */
export const THEME_CLASSES = {
  light: 'rmt-light',
  dark: 'rmt-dark',
} as const;

const TEXT_STYLES = `
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;`;

export const STYLESHEET = `
.${THEME_CLASSES.light} {
  --rmt-color: #000;
  --rmt-text-shadow: 0 1px #fff;
  --rmt-background: #f5f2f0;
  --rmt-selection-background: #b3d4fc;
  --rmt-line-number-color: #6e6e6e;
  --rmt-border-radius: 0;
}
.${THEME_CLASSES.dark} {
  --rmt-color: #f8f8f2;
  --rmt-text-shadow: 0 1px rgba(0,0,0,.3);
  --rmt-background: #282a36;
  --rmt-selection-background: #44475a;
  --rmt-line-number-color: #999;
  --rmt-border-radius: .3em;
}
.rmt code[class*=language-], .rmt pre[class*=language-] {
  color: var(--rmt-color);
  background: 0 0;
  text-shadow: var(--rmt-text-shadow);${TEXT_STYLES}
}
.rmt code[class*=language-] ::-moz-selection,
.rmt code[class*=language-]::-moz-selection,
.rmt pre[class*=language-] ::-moz-selection,
.rmt pre[class*=language-]::-moz-selection {
  text-shadow: none;
  background: var(--rmt-selection-background);
}
.rmt code[class*=language-] ::selection,
.rmt code[class*=language-]::selection,
.rmt pre[class*=language-] ::selection,
.rmt pre[class*=language-]::selection {
  text-shadow: none;
  background: var(--rmt-selection-background);
}
@media print {
  .rmt code[class*=language-], .rmt pre[class*=language-] {
    text-shadow: none;
  }
}
.rmt pre[class*=language-] {
  position: relative;
  isolation: isolate;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  margin: 0;
  padding: 0 1em 1em 0;
  overflow-x: auto;
  background: var(--rmt-background);
  border-radius: var(--rmt-border-radius);
}
.rmt pre[class*=language-].line-numbers {
  padding-left: 1em;
}
.rmt pre[class*=language-] > code {
  display: block;
  padding-top: ${DEFAULT_TOP_PADDING}px;
  padding-left: .3em;
}
.rmt pre[class*=language-].line-numbers > code {
  position: relative;
  white-space: inherit;
  padding-left: 3em;
}
.rmt pre[class*=language-] > .line-numbers-rows {
  position: absolute;
  top: ${DEFAULT_TOP_PADDING}px;
  left: 0;
  width: 2.5em;
  font-size: 100%;
  line-height: 1.5;
  letter-spacing: -1px;
  color: var(--rmt-line-number-color);
  border-right: 1px solid #999;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}
.rmt pre[class*=language-] > .line-numbers-rows > span {
  display: block;
  padding-right: .8em;
  text-align: right;
  line-height: 1.5;
}
`.trim();
