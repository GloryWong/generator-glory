import { PACKAGE_JSON } from '../../src/_constants';
import { assertJsonFileContent } from './assertJsonFileContent';

/**
 * @param depNames dependency names
 * @param dev whether they are development dependencies or not. Default: `true`
 */
export function assertPkgDeps(depNames: string | string[], dev = true) {
  assertJsonFileContent(
    PACKAGE_JSON,
    depNames,
    `${dev ? 'devD' : 'd'}ependencies`,
  );
}
