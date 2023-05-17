import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';

describe('glory:license', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'license', {
        options: {
          yes: true,
        },
      }),
    );

    it('should create license file', () => {
      assert.file('LICENSE');
    });
  });
});
