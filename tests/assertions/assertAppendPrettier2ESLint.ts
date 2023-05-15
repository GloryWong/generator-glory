import * as assert from 'yeoman-assert';
import { ESLINTCONFIG, PACKAGEJSON } from '../constants';
import { assertPrettierAtEndOfExtends } from './assertPrettierAtEndOfExtends';

export function assertAppendPrettier2ESLint() {
  it('add required values to .eslintrc file', () => {
    assert.fileContent([
      [ESLINTCONFIG, /plugins":[\s\S]*"prettier"/],
      [ESLINTCONFIG, /extends":[\s\S]*"prettier"/],
    ]);
  });

  assertPrettierAtEndOfExtends();

  it('add required dependencies', () => {
    assert.fileContent([
      [PACKAGEJSON, /eslint-config-prettier/],
      [PACKAGEJSON, /eslint-plugin-prettier/],
    ]);
  });
}
