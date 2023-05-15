import * as assert from 'yeoman-assert';
import { ESLINTCONFIG, PACKAGEJSON } from '../constants';
import { assertPrettierAtEndOfExtends } from './assertPrettierAtEndOfExtends';

export function assertAppendTypeScript2ESLint() {
  it('add required values to .eslintrc file', () => {
    assert.fileContent([
      [ESLINTCONFIG, /parser":[\s\S]*"@typescript-eslint\/parser"/],
      [ESLINTCONFIG, /plugins":[\s\S]*"@typescript-eslint"/],
      [
        ESLINTCONFIG,
        /extends":[\s\S]*"plugin:@typescript-eslint\/eslint-recommended"/,
      ],
      [
        ESLINTCONFIG,
        /extends":[\s\S]*"plugin:@typescript-eslint\/recommended"/,
      ],
    ]);
  });

  assertPrettierAtEndOfExtends();

  it('add required dependencies', () => {
    assert.fileContent([
      [PACKAGEJSON, /@typescript-eslint\/eslint-plugin/],
      [PACKAGEJSON, /@typescript-eslint\/parser/],
    ]);
  });
}
