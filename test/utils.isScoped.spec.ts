import * as assert from 'yeoman-assert';
import { isScoped } from '../src/_utils';

describe('utils.isScoped()', () => {
  const matches = [
    '@myorg/mymodule',
    '@myorg/mymodule/submodule',
    '@myorg/my-module',
    '@my-org/my_module',
    '@myorg/1234',
  ];

  const nonMatches = [
    '',
    'mymodule',
    'myorg/mymodule',
    'my@module/submodule',
    '@myorg',
    '@myorg/',
  ];

  it('should return true for valid scoped module names', () => {
    matches.forEach((v) => assert(isScoped(v), v));
  });

  it('should return false for invalid scoped module names', () => {
    nonMatches.forEach((v) => assert(!isScoped(v), v));
  });
});
