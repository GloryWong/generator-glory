/* eslint-disable @typescript-eslint/no-var-requires */
import isCI from 'is-ci';
import husky from 'husky';

if (!isCI) {
  husky.install();
  husky.set('.husky/pre-commit', 'npx lint-staged');
}
