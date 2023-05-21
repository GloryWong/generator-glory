import { testRequiredConfigFiles } from './testRequiredConfigFiles';

export function testVSCodeBasic() {
  testRequiredConfigFiles('VSCode', [
    '.vscode/extensions.json',
    '.vscode/settings.json',
  ]);
}
