import { assertPkgScripts } from '../assertions';

export function testRequiredPkgScripts(
  title: string,
  ...args: Parameters<typeof assertPkgScripts>
) {
  it(`should add required ${title} scripts in packge.json`, () => {
    assertPkgScripts(...args);
  });
}
