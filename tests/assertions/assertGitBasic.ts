import * as assert from 'yeoman-assert';
import { isGitManaged } from '../../src/_utils';

export function assertGitBasic() {
  describe('Git basic', () => {
    it('should initialize git', async () => {
      assert.strictEqual(await isGitManaged(), true);
    });

    it('should add .gitignore file', () => {
      assert.file('.gitignore');
    });
  });
}
