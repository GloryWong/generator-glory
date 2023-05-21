import { ESLINT_CONFIG } from '../../src/_constants';
import { assertJsonFileContent } from '../assertions';
import { testESLintPrettierPosition } from './testESLintPrettierPosition';
import { testRequiredPkgDeps } from './testRequiredPkgDeps';

export function testESLintTypeScriptIntegrate() {
  it('should add required TypeScript parts in ESLint config', () => {
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

  testESLintPrettierPosition();

  testRequiredPkgDeps('ESLint TypeScript Integrate', [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
  ]);
}
