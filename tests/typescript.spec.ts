import { TYPESCRIPT_CONFIG } from '../src/_constants';
import {
  assertESLintTypeScript,
  assertJsonFileContent,
  assertTypeScriptBasic,
} from './assertions';
import { runGenerator } from './runGenerator';

describe('glory:typescript', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'typescript', {
        options: { yes: true },
      }),
    );

    assertTypeScriptBasic();
  });

  describe('Prompt to customize values', () => {
    before((done) =>
      runGenerator(done, 'typescript', {
        answers: {
          module: 'ESNext',
          noEmit: true,
          declaration: false,
          outDir: 'output',
          include: 'lib',
        },
      }),
    );

    it('should add required properties and values in typescript config file', () => {
      assertJsonFileContent(
        TYPESCRIPT_CONFIG,
        [
          {
            path: 'module',
            value: 'ESNext',
          },
          {
            path: 'noEmit',
            value: true,
          },
          'declaration!',
          {
            path: 'outDir',
            value: 'output',
          },
        ],
        'compilerOptions',
      );

      assertJsonFileContent(TYPESCRIPT_CONFIG, {
        path: 'include',
        value: 'lib',
        arrayIncludes: true,
      });
    });
  });

  describe('Update TypeScript part in ESlint config', () => {
    before((done) => {
      runGenerator(done, 'eslint', {
        options: { yes: true },
        nextGenerator: ['typescript', { options: { yes: true } }],
      });
    });

    assertESLintTypeScript();
  });
});
