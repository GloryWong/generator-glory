import * as assert from 'yeoman-assert';
import { ESLINTCONFIG } from '../constants';

export function assertPrettierAtEndOfExtends() {
  it('prettier is at the end of the `extends`', () => {
    assert.fileContent(ESLINTCONFIG, /extends":[\s\S]*"prettier"\s*\]/);
  });
}
