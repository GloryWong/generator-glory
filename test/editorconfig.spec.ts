import { runGenerator } from './runGenerator';
import { assertEditorConfigBasic } from './assertions';

describe('glory:editorconfig', () => {
  before((done) => runGenerator(done, 'editorconfig'));

  assertEditorConfigBasic();
});
