import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';

describe('glory:readme', () => {
  before((done) => runGenerator(done, 'readme', { options: { yes: true } }));

  it('should add README.md file', () => {
    assert.file('README.md');
  });
});
