import * as assert from 'yeoman-assert';
import { PRETTIER_CONFIG } from '../../src/constants';

export function assertPrettierBasic() {
  describe('Prettier basic configuration', () => {
    it('should add required prettier config files', () => {
      assert.file(PRETTIER_CONFIG);
    });
  });
}
