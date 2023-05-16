import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG, PRETTIER_CONFIG } from '../../src/constants';
import { existsSync } from 'fs';

export function assertPrettierAtEndOfExtends() {
  it('prettier should be at the end of the `extends`', function () {
    if (existsSync(PRETTIER_CONFIG)) {
      assert.fileContent(ESLINT_CONFIG, /extends":[\s\S]*"prettier"\s*\]/);
    } else {
      this.skip();
    }
  });
}
