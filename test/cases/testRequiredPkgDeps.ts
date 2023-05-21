import { assertPkgDeps } from '../assertions';

export function testRequiredPkgDeps(
  title: string,
  ...args: Parameters<typeof assertPkgDeps>
) {
  it(`should add required ${title} dependencies`, () => {
    assertPkgDeps(...args);
  });
}
