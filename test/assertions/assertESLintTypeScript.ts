import { ESLINT_CONFIG } from '../../src/_constants';
import { assertESLintPrettierPosition } from './assertESLintPrettierPosition';
import { assertPkgDeps } from './assertPkgDeps';
import { assertJsonFileContent } from './assertJsonFileContent';

export function assertESLintTypeScript() {
  describe('Integration of ESLint and TypeScript', () => {
    it('should add required typescript config in eslint config', () => {
      assertJsonFileContent(ESLINT_CONFIG, [
        {
          path: 'parser',
          value: '@typescript-eslint/parser',
        },
        {
          path: 'plugins',
          value: '@typescript-eslint',
          arrayIncludes: true,
        },
        {
          path: 'extends',
          value: 'plugin:@typescript-eslint/eslint-recommended',
          arrayIncludes: true,
        },
        {
          path: 'extends',
          value: 'plugin:@typescript-eslint/recommended',
          arrayIncludes: true,
        },
      ]);
    });

    assertESLintPrettierPosition();

    assertPkgDeps([
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
    ]);
  });
}
