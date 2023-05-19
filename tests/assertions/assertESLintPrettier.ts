import { ESLINT_CONFIG } from '../../src/_constants';
import { assertESLintPrettierPosition } from './assertESLintPrettierPosition';
import { assertPkgDeps } from './assertPkgDeps';
import { assertJsonFileContent } from './assertJsonFileContent';

export function assertESLintPrettier() {
  describe('Integration of ESLint and Prettier', () => {
    it('should add required prettier config in eslint config', () => {
      assertJsonFileContent(ESLINT_CONFIG, [
        {
          path: 'plugins',
          value: 'prettier',
          arrayIncludes: true,
        },
        {
          path: 'extends',
          value: 'prettier',
          arrayIncludes: true,
        },
      ]);
    });

    assertESLintPrettierPosition();

    assertPkgDeps(['eslint-config-prettier', 'eslint-plugin-prettier']);
  });
}
