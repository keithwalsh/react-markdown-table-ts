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

/** The class on each table's wrapper element for its theme */
export const THEME_CLASSES = {
  light: 'rmt-light',
  dark: 'rmt-dark',
  auto: 'rmt-auto',
  inherit: 'rmt-inherit',
} as const;

// The themes set --rmt-theme-* rather than the --rmt-* variables the page sets, so a
// page's value wins wherever it's set, whatever its selector, cascade layer or order
const LIGHT_THEME = `
  --rmt-theme-color: #000;
  --rmt-theme-text-shadow: 0 1px #fff;
  --rmt-theme-background: #f5f2f0;
  --rmt-theme-selection-background: #b3d4fc;
  --rmt-theme-line-number-color: #6e6e6e;
  --rmt-theme-line-number-border: 1px solid #999;
  --rmt-theme-border-radius: 0;`;

const DARK_THEME = `
  --rmt-theme-color: #f8f8f2;
  --rmt-theme-text-shadow: 0 1px rgba(0,0,0,.3);
  --rmt-theme-background: #282a36;
  --rmt-theme-selection-background: #44475a;
  --rmt-theme-line-number-color: #999;
  --rmt-theme-line-number-border: 1px solid #999;
  --rmt-theme-border-radius: .3em;`;

// The page's text colour, with no background or text shadow, so the table matches any design.
// Browsers without color-mix() show the line numbers in the text colour, with no divider.
const INHERIT_THEME = `
  --rmt-theme-color: currentColor;
  --rmt-theme-text-shadow: none;
  --rmt-theme-background: transparent;
  --rmt-theme-line-number-color: color-mix(in srgb, currentColor 60%, transparent);
  --rmt-theme-line-number-border: 1px solid color-mix(in srgb, currentColor 50%, transparent);
  --rmt-theme-border-radius: 0;`;

// The inherit theme sets no selection colour, so selected text looks like the rest of the page's
const COLOUR_THEMES = `:is(.${THEME_CLASSES.light}, .${THEME_CLASSES.dark}, .${THEME_CLASSES.auto})`;

/** The page's value for an --rmt-* variable, or the theme's when the page doesn't set one */
const themed = (name: string) => `var(--rmt-${name}, var(--rmt-theme-${name}))`;

const TEXT_STYLES = `
  font-family: var(--rmt-font-family, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace);
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: var(--rmt-line-height, 1.5);
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
.${THEME_CLASSES.inherit} {${INHERIT_THEME}
}
.rmt code.rmt-code, .rmt pre.rmt-pre {
  color: ${themed('color')};
  background: 0 0;
  text-shadow: ${themed('text-shadow')};${TEXT_STYLES}
}
${COLOUR_THEMES} code.rmt-code ::-moz-selection,
${COLOUR_THEMES} code.rmt-code::-moz-selection,
${COLOUR_THEMES} pre.rmt-pre ::-moz-selection,
${COLOUR_THEMES} pre.rmt-pre::-moz-selection {
  text-shadow: none;
  background: ${themed('selection-background')};
}
${COLOUR_THEMES} code.rmt-code ::selection,
${COLOUR_THEMES} code.rmt-code::selection,
${COLOUR_THEMES} pre.rmt-pre ::selection,
${COLOUR_THEMES} pre.rmt-pre::selection {
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
  display: inline-flex;
  align-items: flex-start;
  vertical-align: top;
  box-sizing: border-box;
  width: var(--rmt-width, fit-content);
  max-width: 100%;
  margin: 0;
  padding: var(--rmt-padding, 1em);
  font-size: var(--rmt-font-size, 1em);
  overflow-x: auto;
  background: ${themed('background')};
  border-radius: ${themed('border-radius')};
}
.rmt pre.rmt-pre > code {
  display: block;
  flex: none;
  padding: 0;
}
.rmt pre.rmt-pre > .rmt-line-numbers {
  order: -1;
  flex: none;
  box-sizing: content-box;
  min-width: 2ch;
  margin-right: .8em;
  padding-right: .8em;
  font-size: 100%;
  line-height: var(--rmt-line-height, 1.5);
  letter-spacing: -1px;
  text-align: right;
  white-space: pre;
  color: ${themed('line-number-color')};
  border-right: ${themed('line-number-border')};
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}
`.trim();
