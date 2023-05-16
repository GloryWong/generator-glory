import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG, PACKAGE_JSON } from '../../src/constants';
import { assertPrettierAtEndOfExtends } from './assertPrettierAtEndOfExtends';

export function assertAppendPrettier2ESLint() {
  it('add required values to .eslintrc file', () => {
    assert.fileContent([
      [ESLINT_CONFIG, /plugins":[\s\S]*"prettier"/],
      [ESLINT_CONFIG, /extends":[\s\S]*"prettier"/],
    ]);
  });

  assertPrettierAtEndOfExtends();

  it('add required dependencies', () => {
    assert.fileContent([
      [PACKAGE_JSON, /eslint-config-prettier/],
      [PACKAGE_JSON, /eslint-plugin-prettier/],
    ]);
  });
}
