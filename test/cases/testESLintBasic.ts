import { ESLINT_CONFIG } from '../../src/_constants';
import { testRequiredConfigFiles } from './testRequiredConfigFiles';
import { testRequiredPkgDeps } from './testRequiredPkgDeps';
import { testRequiredPkgScripts } from './testRequiredPkgScripts';

export function testESLintBasic() {
  testRequiredConfigFiles('ESLint', [ESLINT_CONFIG, '.eslintignore']);

  testRequiredPkgScripts('ESLint', [
    {
      path: 'lint',
      value: /eslint/,
    },
    {
      path: 'fix',
      value: /lint/,
    },
  ]);

  testRequiredPkgDeps('ESLint', 'eslint');
}
