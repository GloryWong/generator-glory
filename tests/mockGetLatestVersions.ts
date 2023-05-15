import { BaseGenerator } from '../src/_base';

export function mockGetLatestVersions(generator: BaseGenerator) {
  generator.getLatestVersions = (dependenciesNames: string | string[]) => {
    const deps = Array.isArray(dependenciesNames)
      ? dependenciesNames
      : [dependenciesNames];

    return Promise.resolve(
      deps.reduce((pre, cur) => {
        pre[cur] = '^1.0.0';
        return pre;
      }, {} as Record<string, string>),
    );
  };
}
