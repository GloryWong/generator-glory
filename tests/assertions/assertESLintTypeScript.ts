import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG, PACKAGE_JSON } from '../../src/constants';
import { assertESLintPrettierPosition } from './assertESLintPrettierPosition';

export function assertESLintTypeScript() {
  describe('Integration of ESLint and TypeScript', () => {
    it('should add required typescript config in eslint config', () => {
      assert.fileContent([
        [ESLINT_CONFIG, /parser":[\s\S]*"@typescript-eslint\/parser"/],
        [ESLINT_CONFIG, /plugins":[\s\S]*"@typescript-eslint"/],
        [
          ESLINT_CONFIG,
          /extends":[\s\S]*"plugin:@typescript-eslint\/eslint-recommended"/,
        ],
        [
          ESLINT_CONFIG,
          /extends":[\s\S]*"plugin:@typescript-eslint\/recommended"/,
        ],
      ]);
    });

    assertESLintPrettierPosition();

    it('should add required npm dependencies', () => {
      assert.fileContent([
        [PACKAGE_JSON, /@typescript-eslint\/eslint-plugin/],
        [PACKAGE_JSON, /@typescript-eslint\/parser/],
      ]);
    });
  });
}
