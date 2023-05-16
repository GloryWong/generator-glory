import * as assert from 'yeoman-assert';
import { ESLINT_CONFIG, PACKAGE_JSON } from '../../src/constants';
import { assertPrettierAtEndOfExtends } from './assertPrettierAtEndOfExtends';

export function assertAppendTypeScript2ESLint() {
  it('add required values to .eslintrc file', () => {
    assert.fileContent([
      [ESLINT_CONFIG, /parser":[\s\S]*"@typescript-eslint\/parser"/],
      [ESLINT_CONFIG, /plugins":[\s\S]*"@typescript-eslint"/],
      [
        ESLINT_CONFIG,
        /extends":[\s\S]*"plugin:@typescript-eslint\/eslint-recommended"/,
      ],
      [
        ESLINT_CONFIG,
        /extends":[\s\S]*"plugin:@typescript-eslint\/recommended"/,
      ],
    ]);
  });

  assertPrettierAtEndOfExtends();

  it('add required dependencies', () => {
    assert.fileContent([
      [PACKAGE_JSON, /@typescript-eslint\/eslint-plugin/],
      [PACKAGE_JSON, /@typescript-eslint\/parser/],
    ]);
  });
}
