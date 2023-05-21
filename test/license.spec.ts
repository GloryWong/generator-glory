import { runGenerator } from './runGenerator';
import { testLicenseBasic } from './cases';

describe('glory:license', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'license', {
        options: {
          yes: true,
        },
      }),
    );

    testLicenseBasic();
  });
});
