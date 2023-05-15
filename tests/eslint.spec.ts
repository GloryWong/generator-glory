import * as assert from 'yeoman-assert';
import { runGenerator } from './runGenerator';
import { assertAppendTypeScript2ESLint } from './assertions';

describe('glory:eslint', () => {
  describe('General', () => {
    before((done) => runGenerator(done, 'eslint'));
    it('create expected files', () => {
      assert.file(['.eslintrc', '.eslintignore']);
    });

    it('add expected npm scripts', () => {
      assert.fileContent('package.json', '"lint"');
      assert.fileContent('package.json', '"fix"');
    });

    it('add required dependencies', () => {
      assert.fileContent('package.json', /"eslint":\s*".+"/);
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

  // describe('Prettier is used', () => {
  //   before((done) =>
  //     runGenerator(done, 'eslint', undefined, undefined, ['prettier']),
  //   );
  //   assertAppendPrettier2ESLint();
  // });
});
