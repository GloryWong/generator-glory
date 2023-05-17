import { runGenerator } from './runGenerator';
import {
  assertESLintBasic,
  assertESLintPrettier,
  assertESLintTypeScript,
  assertPrettierBasic,
} from './assertions';

describe('glory:eslint', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'eslint', {
        options: {
          yes: true,
        },
      }),
    );

    assertESLintBasic();
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

    assertPrettierBasic();
  });

  describe('Update TypeScript part in ESLint config', () => {
    before((done) => {
      runGenerator(done, 'typescript', {
        options: { yes: true },
        nextGenerator: ['eslint'],
      });
    });

    assertESLintBasic();
    assertESLintTypeScript();
  });

  describe('Update Prettier part in ESLint config', () => {
    before((done) => {
      runGenerator(done, 'prettier', {
        options: { yes: true },
        nextGenerator: ['eslint'],
      });
    });

    assertESLintBasic();
    assertESLintPrettier();
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

    assertESLintBasic();
    assertESLintTypeScript();
    assertESLintPrettier();
  });
});
