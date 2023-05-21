import { EXTENSION_IDS } from '../src/_constants';
import { assertJsonFileContent } from './assertions';
import { runGenerator } from './runGenerator';
import {
  testESLintBasic,
  testEditorConfigBasic,
  testPrettierBasic,
  testVSCodeBasic,
} from './cases';

describe('glory:vscode', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'vscode', {
        options: { yes: true },
      }),
    );

    testVSCodeBasic();

    describe('Setup default formatters', () => {
      testEditorConfigBasic();
      testESLintBasic();
      testPrettierBasic();
    });

    it('should add recommended extensions', () => {
      Object.values(EXTENSION_IDS).forEach((extensionId) => {
        assertJsonFileContent('.vscode/extensions.json', {
          path: 'recommendations',
          value: extensionId,
          arrayIncludes: true,
        });
      });
    });

    it('should set default formatter in settings', () => {
      assertJsonFileContent('.vscode/settings.json', {
        path: '[javascript][typescript].editor\\.defaultFormatter',
        value: EXTENSION_IDS.prettier,
      });
    });
  });

  describe('Prompt to customize values', () => {
    before((done) =>
      runGenerator(done, 'vscode', {
        answers: {
          formatters: ['editorconfig', 'eslint'],
          extensionIds: EXTENSION_IDS.prettier,
          prettierAsDefaultFormatter: false,
        },
      }),
    );

    testVSCodeBasic();

    describe('Setup chosen formatters', () => {
      testEditorConfigBasic();
      testESLintBasic();
    });

    it('should add recommended extensions', () => {
      assertJsonFileContent('.vscode/extensions.json', {
        path: 'recommendations',
        value: EXTENSION_IDS.prettier,
        arrayIncludes: true,
      });
    });

    it('should not set default formatter in settings when answer no', () => {
      assertJsonFileContent(
        '.vscode/settings.json',
        '[javascript][typescript].editor\\.defaultFormatter!',
      );
    });
  });
});
