import { LINTSTAGED_CONFIG } from '../../src/_constants';
import { testESLintBasic } from './testESLintBasic';
import { testRequiredConfigFiles } from './testRequiredConfigFiles';
import { testRequiredPkgDeps } from './testRequiredPkgDeps';
import { testRequiredPkgScripts } from './testRequiredPkgScripts';
import { testGitBasic } from './testGitBasic';

export function testLintStagedBasic() {
  testRequiredConfigFiles('LintStaged', LINTSTAGED_CONFIG);

  testRequiredPkgScripts('LintStaged', {
    path: 'prepare',
    value: /husky install/,
  });

  testRequiredPkgDeps('LintStaged', ['lint-staged', 'husky']);

  testGitBasic();

  testESLintBasic();
}
