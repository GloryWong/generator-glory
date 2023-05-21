import { runGenerator } from './runGenerator';
import { testEditorConfigBasic } from './cases';

describe('glory:editorconfig', () => {
  before((done) => runGenerator(done, 'editorconfig'));

  testEditorConfigBasic();
});
