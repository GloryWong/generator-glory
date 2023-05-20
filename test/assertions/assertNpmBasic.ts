import * as assert from 'yeoman-assert';
import { PACKAGE_JSON } from '../../src/_constants';

export function assertNpmBasic() {
  describe('NPM basic', () => {
    it('should create package.json file', () => {
      assert.file(PACKAGE_JSON);
    });
  });
}
