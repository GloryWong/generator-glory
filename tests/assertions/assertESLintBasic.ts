import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG } from '../../src/_constants';
import { assertPkgScripts } from './assertPkgScripts';
import { assertPkgDeps } from './assertPkgDeps';

export function assertESLintBasic() {
  describe('ESlint basic configuration', () => {
    it('should add required eslint config files', () => {
      assert.file([ESLINT_CONFIG, '.eslintignore']);
    });

    assertPkgScripts([
      {
        path: 'lint',
        value: /eslint/,
      },
      {
        path: 'fix',
        value: /lint/,
      },
    ]);

    assertPkgDeps('eslint');
  });
}
