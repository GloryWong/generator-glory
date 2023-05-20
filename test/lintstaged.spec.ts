import * as assert from 'yeoman-assert';
import { LINTSTAGED_CONFIG } from '../src/_constants';
import { runGenerator } from './runGenerator';
import {
  assertPkgDeps,
  assertESLintBasic,
  assertGitBasic,
  assertPkgScripts,
} from './assertions';

describe('glory:lintstaged', () => {
  before((done) => runGenerator(done, 'lintstaged'));

  it('should add required config files', () => {
    assert.file(LINTSTAGED_CONFIG);
  });

  assertPkgScripts({
    path: 'prepare',
    value: /husky install/,
  });

  assertPkgDeps(['lint-staged', 'husky']);

  describe('Setup required modules', async () => {
    assertGitBasic();
    assertESLintBasic();
  });
});
