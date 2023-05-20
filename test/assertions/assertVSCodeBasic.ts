import * as assert from 'yeoman-assert';

export function assertVSCodeBasic() {
  describe('VSCode basic', () => {
    it('should add required vscode config files', () => {
      assert.file(['.vscode/extensions.json', '.vscode/settings.json']);
    });
  });
}
