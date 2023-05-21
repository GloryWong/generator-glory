import { ESLINT_CONFIG, PRETTIER_CONFIG } from '../../src/_constants';
import { existsSync } from 'fs';
import { assertJsonFileContent } from '../assertions';

export function testESLintPrettierPosition() {
  it('should ensure that Prettier is at the end of the `extends` in ESLint config', function () {
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
