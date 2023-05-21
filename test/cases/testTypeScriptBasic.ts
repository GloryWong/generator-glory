import * as assert from 'yeoman-assert';
import { PACKAGE_JSON, TYPESCRIPT_CONFIG } from '../../src/_constants';
import { resolve } from 'path';
import { assertJsonFileContent } from '../assertions';
import { testRequiredConfigFiles } from './testRequiredConfigFiles';
import { testRequiredPkgDeps } from './testRequiredPkgDeps';

export function testTypeScriptBasic() {
  testRequiredConfigFiles('TypeScript', TYPESCRIPT_CONFIG);

  it('should create source code directory and add sample typescript file in it', () => {
    assert.file(resolve('src', 'index.ts'));
  });

  testRequiredPkgDeps('TypeScript', ['typescript', 'type-fest']);

  it('should add or update the `main` in package.json', () => {
    assertJsonFileContent(PACKAGE_JSON, {
      path: 'main',
      value: 'dist/index.js',
    });
  });
}
