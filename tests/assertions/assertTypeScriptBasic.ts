import * as assert from 'yeoman-assert';
import { PACKAGE_JSON, TYPESCRIPT_CONFIG } from '../../src/_constants';
import { assertPkgDeps } from './assertPkgDeps';
import { assertJsonFileContent } from './assertJsonFileContent';
import { resolve } from 'path';

export function assertTypeScriptBasic() {
  describe('TypeScript basic', () => {
    it('should create typescript config file', () => {
      assert.file(TYPESCRIPT_CONFIG);
    });

    it('should create source code directory and add sample file in it', () => {
      assert.file(resolve('src', 'index.ts'));
    });

    assertPkgDeps(['typescript', 'type-fest']);

    it('should add or update the `main` in package.json', () => {
      assertJsonFileContent(PACKAGE_JSON, {
        path: 'main',
        value: 'dist/index.js',
      });
    });
  });
}
