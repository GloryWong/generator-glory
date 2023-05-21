import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';
import { getGitBranchName } from '../src/_utils';
import { testGitBasic } from './cases';

describe('glory:git', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'git', {
        options: {
          yes: true,
        },
      }),
    );

    testGitBasic();
  });

  describe('Prompt to customize initialBranch', () => {
    before((done) =>
      runGenerator(done, 'git', {
        answers: {
          initialBranch: 'main',
        },
      }),
    );

    it('should be set as answered name', async () => {
      assert.equal(await getGitBranchName(), 'main');
    });
  });
});
