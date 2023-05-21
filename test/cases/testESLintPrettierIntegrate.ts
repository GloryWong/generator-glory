import { ESLINT_CONFIG } from '../../src/_constants';
import { assertJsonFileContent } from '../assertions/assertJsonFileContent';
import { testESLintPrettierPosition } from './testESLintPrettierPosition';
import { testRequiredPkgDeps } from './testRequiredPkgDeps';

export function testESLintPrettierIntegrate() {
  it('should add required Prettier parts in ESLint config', () => {
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

  testESLintPrettierPosition();

  testRequiredPkgDeps('ESLint Prettier Integrate', [
    'eslint-config-prettier',
    'eslint-plugin-prettier',
  ]);
}
