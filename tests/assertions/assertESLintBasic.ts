import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG, PACKAGE_JSON } from '../../src/constants';

export function assertESLintBasic() {
  describe('ESlint basic configuration', () => {
    it('should add required eslint config files', () => {
      assert.file([ESLINT_CONFIG, '.eslintignore']);
    });

    it('should add required npm scripts', () => {
      assert.fileContent(PACKAGE_JSON, '"lint"');
      assert.fileContent(PACKAGE_JSON, '"fix"');
    });

    it('should add required npm dependencies', () => {
      assert.fileContent(PACKAGE_JSON, /"eslint":\s*".+"/);
    });
  });
}
