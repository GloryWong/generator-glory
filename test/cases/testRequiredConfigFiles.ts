import * as assert from 'yeoman-assert';

export function testRequiredConfigFiles(
  title: string,
  configFileNames: string | string[],
) {
  it(`should add ${title} config files`, () => {
    assert.file(configFileNames);
  });
}
