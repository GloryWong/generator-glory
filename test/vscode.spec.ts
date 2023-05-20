import { EXTENSION_IDS } from '../src/_constants';
import {
  assertESLintBasic,
  assertEditorConfigBasic,
  assertJsonFileContent,
  assertPrettierBasic,
  assertVSCodeBasic,
} from './assertions';
import { runGenerator } from './runGenerator';

describe('glory:vscode', () => {
  describe('Use default values', () => {
    before((done) =>
      runGenerator(done, 'vscode', {
        options: { yes: true },
      }),
    );

    assertVSCodeBasic();

    describe('Setup default formatters', () => {
      assertEditorConfigBasic();
      assertESLintBasic();
      assertPrettierBasic();
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
          formatters: ['editorconfig'],
          extensionIds: EXTENSION_IDS.prettier,
          prettierAsDefaultFormatter: false,
        },
      }),
    );

    assertVSCodeBasic();

    describe('Setup chosen formatters', () => {
      assertEditorConfigBasic();
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
