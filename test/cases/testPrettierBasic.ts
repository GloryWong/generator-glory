import { PRETTIER_CONFIG } from '../../src/_constants';
import { testRequiredConfigFiles } from './testRequiredConfigFiles';
import { testRequiredPkgScripts } from './testRequiredPkgScripts';
import { testRequiredPkgDeps } from './testRequiredPkgDeps';

export function testPrettierBasic() {
  testRequiredConfigFiles('Prettier', PRETTIER_CONFIG);

  testRequiredPkgScripts('Prettier', {
    path: 'pretty',
    value: /prettier/,
  });

  testRequiredPkgDeps('Prettier', 'prettier');
}
