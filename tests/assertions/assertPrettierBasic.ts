import * as assert from 'yeoman-assert';
import { PRETTIER_CONFIG } from '../../src/_constants';
import { assertPkgScripts } from './assertPkgScripts';
import { assertPkgDeps } from './assertPkgDeps';

export function assertPrettierBasic() {
  describe('Prettier basic configuration', () => {
    it('should add required prettier config files', () => {
      assert.file(PRETTIER_CONFIG);
    });

    assertPkgScripts({
      path: 'pretty',
      value: /prettier/,
    });

    assertPkgDeps('prettier');
  });
}
