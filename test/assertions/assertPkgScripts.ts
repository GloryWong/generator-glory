import { PACKAGE_JSON } from '../../src/_constants';
import { assertJsonFileContent } from './assertJsonFileContent';

type Script =
  | string
  | {
      path: string;
      value: string | RegExp;
    };

export function assertPkgScripts(scripts: Script | Script[]) {
  assertJsonFileContent(PACKAGE_JSON, scripts, 'scripts');
}
