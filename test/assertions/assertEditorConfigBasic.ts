import * as assert from 'yeoman-assert';
import { EDITOR_CONFIG } from '../../src/_constants';

export function assertEditorConfigBasic() {
  describe('EditorConfig basic', () => {
    it('should add .editorconfig file', () => {
      assert.file(EDITOR_CONFIG);
    });
  });
}
