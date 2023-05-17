import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG, PRETTIER_CONFIG } from '../../src/constants';
import { existsSync } from 'fs';

export function assertESLintPrettierPosition() {
  it('should ensure that prettier is at the end of the `extends` in eslint config', function () {
    if (existsSync(PRETTIER_CONFIG)) {
      assert.fileContent(ESLINT_CONFIG, /extends":[\s\S]*"prettier"\s*\]/);
    } else {
      this.skip();
    }
  });
}
