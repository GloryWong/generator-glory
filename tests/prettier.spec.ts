import { assertESLintPrettier, assertPrettierBasic } from './assertions';
import { runGenerator } from './runGenerator';

describe('glory:prettier', () => {
  describe('Prettier basic', () => {
    before((done) =>
      runGenerator(done, 'prettier', {
        options: {
          yes: true,
        },
      }),
    );

    assertPrettierBasic();
  });

  describe('Update prettier part in ESlint config', () => {
    before((done) => {
      runGenerator(done, 'eslint', {
        options: { yes: true },
        nextGenerator: ['prettier'],
      });
    });

    assertESLintPrettier();
  });
});
