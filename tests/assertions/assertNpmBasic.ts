import { PACKAGE_JSON } from '../../src/_constants';
import { assertJsonFileContent } from './assertJsonFileContent';

export function assertNpmBasic() {
  describe('NPM basic', () => {
    it('should create package.json file which has required properties', () => {
      assertJsonFileContent(PACKAGE_JSON, [
        'name',
        'description',
        'author',
        'repository.url',
        'bugs.url',
        'homepage',
      ]);
    });
  });
}
