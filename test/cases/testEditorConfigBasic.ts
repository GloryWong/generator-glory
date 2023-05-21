import { EDITOR_CONFIG } from '../../src/_constants';
import { testRequiredConfigFiles } from './testRequiredConfigFiles';

export function testEditorConfigBasic() {
  testRequiredConfigFiles('EditorConfig', EDITOR_CONFIG);
}
