import * as _getLatestVersion from 'get-latest-version';

function getLatestVersion(pkgName: string) {
  return process.env.UNIT_TEST === 'true'
    ? '^0.0.0'
    : _getLatestVersion(pkgName, { auth: false });
}

export async function getLatestVersions(dependenciesNames: string | string[]) {
  dependenciesNames = Array.isArray(dependenciesNames)
    ? dependenciesNames
    : [dependenciesNames];

  const versions = await Promise.all(
    dependenciesNames.map((d) => getLatestVersion(d)),
  );

  return dependenciesNames.reduce((pre, d, index) => {
    const version = versions[index];
    if (version) {
      pre[d] = `^${version}`;
    }
    return pre;
  }, {} as Record<string, string>);
}
