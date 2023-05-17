import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG, PACKAGE_JSON } from '../../src/constants';
import { assertESLintPrettierPosition } from './assertESLintPrettierPosition';

export function assertESLintPrettier() {
  describe('Integration of ESLint and Prettier', () => {
    it('should add required prettier config in eslint config', () => {
      assert.fileContent([
        [ESLINT_CONFIG, /plugins":[\s\S]*"prettier"/],
        [ESLINT_CONFIG, /extends":[\s\S]*"prettier"/],
      ]);
    });

    assertESLintPrettierPosition();

    it('should add required npm dependencies', () => {
      assert.fileContent([
        [PACKAGE_JSON, /eslint-config-prettier/],
        [PACKAGE_JSON, /eslint-plugin-prettier/],
      ]);
    });
  });
}
