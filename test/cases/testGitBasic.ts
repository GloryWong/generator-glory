import * as assert from 'yeoman-assert';
import { isGitManaged } from '../../src/_utils';

export function testGitBasic() {
  it('should initialize Git', async () => {
    assert.strictEqual(await isGitManaged(), true);
  });

  it('should add .gitignore file', () => {
    assert.file('.gitignore');
  });
}
