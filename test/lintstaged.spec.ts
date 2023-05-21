import { runGenerator } from './runGenerator';
import { testLintStagedBasic } from './cases';

describe('glory:lintstaged', () => {
  before((done) => runGenerator(done, 'lintstaged'));

  testLintStagedBasic();
});
