import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';
import { getGitBranchName, isGitManaged } from '../src/_utils';

describe('glory:git', () => {
  describe('Use default values', () => {
    let cwd: string;

    before((done) =>
      runGenerator(done, 'git', {
        options: {
          yes: true,
        },
        onEnvironment: (env) => (cwd = env.cwd),
      }),
    );

    it('should add .gitignore file', () => {
      assert.file('.gitignore');
    });

    it('should initialize git', async () => {
      assert.strictEqual(await isGitManaged(cwd), true);
    });
  });

  describe('Prompt to customize initialBranch', () => {
    let cwd: string;

    before((done) =>
      runGenerator(done, 'git', {
        answers: {
          initialBranch: 'main',
        },
        onEnvironment: (env) => (cwd = env.cwd),
      }),
    );

    it('should be set as answered', async () => {
      assert.equal(await getGitBranchName(cwd), 'main');
    });
  });
});
