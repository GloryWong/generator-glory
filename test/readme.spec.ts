import { testReadMeBasic } from './cases/testReadMeBasic';
import { runGenerator } from './runGenerator';

describe('glory:readme', () => {
  before((done) => runGenerator(done, 'readme', { options: { yes: true } }));

  testReadMeBasic();
});
