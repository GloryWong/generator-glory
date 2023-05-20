import { ESLINT_CONFIG, PRETTIER_CONFIG } from '../../src/_constants';
import { existsSync } from 'fs';
import { assertJsonFileContent } from './assertJsonFileContent';

export function assertESLintPrettierPosition() {
  it('should ensure that prettier is at the end of the `extends` in eslint config', function () {
    if (existsSync(PRETTIER_CONFIG)) {
      assertJsonFileContent(ESLINT_CONFIG, {
        path: 'extends',
        value: 'prettier',
        arrayIncludes: true,
        arrayLastOne: true,
      });
    } else {
      this.skip();
    }
  });
}
