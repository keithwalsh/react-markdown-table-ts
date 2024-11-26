const gtsConfig = require('gts/.prettierrc.json');

// Remove Prettier-specific settings while keeping other GTS configs
const {
  semi,
  singleQuote,
  quoteProps,
  trailingComma,
  bracketSpacing,
  arrowParens,
  ...otherConfig
} = gtsConfig;

module.exports = {
  ...otherConfig,
  endOfLine: 'lf'
}
