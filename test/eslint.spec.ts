import {
  testESLintBasic,
  testPrettierBasic,
  testESLintPrettierIntegrate,
  testESLintTypeScriptIntegrate,
} from './cases';
import { runGenerator } from './runGenerator';

describe('glory:eslint', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'eslint', {
        options: {
          yes: true,
        },
      }),
    );

    testESLintBasic();
  });

  describe('Integrate prettier', () => {
    before((done) =>
      runGenerator(done, 'eslint', {
        answers: {
          integratePrettier: true,
        },
        withGeneratorNames: ['prettier'],
      }),
    );

    testESLintBasic();
    testPrettierBasic();
    testESLintPrettierIntegrate();
  });

  describe('Update TypeScript part in ESLint config', () => {
    before((done) => {
      runGenerator(done, 'typescript', {
        options: { yes: true },
        nextGenerator: ['eslint'],
      });
    });

    testESLintBasic();
    testESLintTypeScriptIntegrate();
  });

  describe('Update Prettier part in ESLint config', () => {
    before((done) => {
      runGenerator(done, 'prettier', {
        options: { yes: true },
        nextGenerator: ['eslint'],
      });
    });

    testESLintBasic();
    testESLintPrettierIntegrate();
  });

  describe('Update TypeScript and Prettier at the same time in ESLint config', () => {
    before((done) => {
      runGenerator(done, 'typescript', {
        options: { yes: true },
        nextGenerator: [
          'prettier',
          {
            options: { yes: true },
            nextGenerator: ['eslint'],
          },
        ],
      });
    });

    testESLintBasic();
    testESLintTypeScriptIntegrate();
    testESLintPrettierIntegrate();
  });
});
