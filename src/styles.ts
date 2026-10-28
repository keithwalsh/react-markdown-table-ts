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
  auto: 'rmt-auto',
} as const;

// The themes set --rmt-theme-* rather than the --rmt-* variables the page sets, so a
// page's value wins wherever it's set, whatever its selector, cascade layer or order
const LIGHT_THEME = `
  --rmt-theme-color: #000;
  --rmt-theme-text-shadow: 0 1px #fff;
  --rmt-theme-background: #f5f2f0;
  --rmt-theme-selection-background: #b3d4fc;
  --rmt-theme-line-number-color: #6e6e6e;
  --rmt-theme-border-radius: 0;`;

const DARK_THEME = `
  --rmt-theme-color: #f8f8f2;
  --rmt-theme-text-shadow: 0 1px rgba(0,0,0,.3);
  --rmt-theme-background: #282a36;
  --rmt-theme-selection-background: #44475a;
  --rmt-theme-line-number-color: #999;
  --rmt-theme-border-radius: .3em;`;

/** The page's value for an --rmt-* variable, or the theme's when the page doesn't set one */
const themed = (name: string) => `var(--rmt-${name}, var(--rmt-theme-${name}))`;

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
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  hyphens: none;`;

export const STYLESHEET = `
.${THEME_CLASSES.light}, .${THEME_CLASSES.auto} {${LIGHT_THEME}
}
.${THEME_CLASSES.dark} {${DARK_THEME}
}
@media (prefers-color-scheme: dark) {
  .${THEME_CLASSES.auto} {${DARK_THEME.replace(/\n/g, '\n  ')}
  }
}
.rmt code.rmt-code, .rmt pre.rmt-pre {
  color: ${themed('color')};
  background: 0 0;
  text-shadow: ${themed('text-shadow')};${TEXT_STYLES}
}
.rmt code.rmt-code ::-moz-selection,
.rmt code.rmt-code::-moz-selection,
.rmt pre.rmt-pre ::-moz-selection,
.rmt pre.rmt-pre::-moz-selection {
  text-shadow: none;
  background: ${themed('selection-background')};
}
.rmt code.rmt-code ::selection,
.rmt code.rmt-code::selection,
.rmt pre.rmt-pre ::selection,
.rmt pre.rmt-pre::selection {
  text-shadow: none;
  background: ${themed('selection-background')};
}
@media print {
  .rmt code.rmt-code, .rmt pre.rmt-pre {
    text-shadow: none;
  }
}
.rmt pre.rmt-pre {
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
  background: ${themed('background')};
  border-radius: ${themed('border-radius')};
}
.rmt pre.rmt-pre.rmt-has-line-numbers {
  padding-left: 1em;
}
.rmt pre.rmt-pre > code {
  display: block;
  padding-top: ${DEFAULT_TOP_PADDING}px;
  padding-left: .3em;
}
.rmt pre.rmt-pre.rmt-has-line-numbers > code {
  position: relative;
  white-space: inherit;
  padding-left: 3em;
}
.rmt pre.rmt-pre > .rmt-line-numbers {
  position: absolute;
  top: ${DEFAULT_TOP_PADDING}px;
  left: 0;
  width: 1.7em;
  padding-right: .8em;
  font-size: 100%;
  line-height: 1.5;
  letter-spacing: -1px;
  text-align: right;
  white-space: pre;
  color: ${themed('line-number-color')};
  border-right: 1px solid #999;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}
`.trim();
