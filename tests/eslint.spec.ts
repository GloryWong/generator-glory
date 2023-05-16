import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';
import {
  assertAppendPrettier2ESLint,
  assertAppendTypeScript2ESLint,
} from './assertions';
import { ESLINT_CONFIG, PACKAGE_JSON } from '../src/constants';

describe('glory:eslint', () => {
  describe('General', () => {
    before((done) => runGenerator(done, 'eslint'));
    it('create expected files', () => {
      assert.file([ESLINT_CONFIG, '.eslintignore']);
    });

    it('add expected npm scripts', () => {
      assert.fileContent(PACKAGE_JSON, '"lint"');
      assert.fileContent(PACKAGE_JSON, '"fix"');
    });

    it('add required dependencies', () => {
      assert.fileContent(PACKAGE_JSON, /"eslint":\s*".+"/);
    });
  });

  describe('TypeScript is used', () => {
    before((done) => {
      runGenerator(done, 'typescript', {
        options: { yes: true },
        nextGenerator: ['eslint'],
      });
    });

    assertAppendTypeScript2ESLint();
  });

  describe('Prettier is used', () => {
    before((done) => {
      runGenerator(done, 'prettier', {
        nextGenerator: ['eslint'],
      });
    });

    assertAppendPrettier2ESLint();
  });

  describe('Both TypeScript and Prettier are used', () => {
    before((done) => {
      runGenerator(done, 'typescript', {
        options: { yes: true },
        nextGenerator: [
          'prettier',
          {
            nextGenerator: ['eslint'],
          },
        ],
      });
    });

    assertAppendTypeScript2ESLint();
    assertAppendPrettier2ESLint();
  });
});
