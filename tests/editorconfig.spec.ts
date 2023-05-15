import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';

describe('glory:editorconfig', () => {
  before((done) => runGenerator(done, 'editorconfig'));

  it('create .editorconfig file', () => {
    assert.file('.editorconfig');
  });
});
