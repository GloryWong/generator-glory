import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';
import { EDITOR_CONFIG } from '../src/_constants';

describe('glory:editorconfig', () => {
  before((done) => runGenerator(done, 'editorconfig'));

  it('should add .editorconfig file', () => {
    assert.file(EDITOR_CONFIG);
  });
});
