/* eslint-disable @typescript-eslint/no-var-requires */
const isCI = require('is-ci');
if (!isCI) {
  const husky = require('husky');
  husky.install();
  husky.set('.husky/pre-commit', 'npx lint-staged');
}
