import { runGenerator } from './runGenerator';
import {
  testESLintBasic,
  testEditorConfigBasic,
  testGitBasic,
  testLicenseBasic,
  testLintStagedBasic,
  testNPMBasic,
  testPrettierBasic,
  testReadMeBasic,
  testTypeScriptBasic,
  testVSCodeBasic,
} from './cases';

describe('glory:app', function () {
  this.timeout(10000);

  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'app', {
        options: { yes: true },
      }),
    );

    testNPMBasic();
    testGitBasic();
    testTypeScriptBasic();
    testESLintBasic();
    testPrettierBasic();
    testEditorConfigBasic();
    testLicenseBasic();
    testReadMeBasic();
    testLintStagedBasic();
    testVSCodeBasic();
  });
});
