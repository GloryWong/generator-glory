import { PACKAGE_JSON } from '../../src/_constants';
import { testRequiredConfigFiles } from './testRequiredConfigFiles';

export function testNPMBasic() {
  testRequiredConfigFiles('NPM', PACKAGE_JSON);
}
