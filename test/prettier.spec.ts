import { runGenerator } from './runGenerator';
import { testESLintPrettierIntegrate, testPrettierBasic } from './cases';

describe('glory:prettier', () => {
  describe('Prettier basic', () => {
    before((done) =>
      runGenerator(done, 'prettier', {
        options: {
          yes: true,
        },
      }),
    );

    testPrettierBasic();
  });

  describe('Update prettier part in ESlint config', () => {
    before((done) => {
      runGenerator(done, 'eslint', {
        options: { yes: true },
        nextGenerator: ['prettier'],
      });
    });

    testESLintPrettierIntegrate();
  });
});
