import * as assert from 'yeoman-assert';

export function testLicenseBasic() {
  it('should create license file', () => {
    assert.file('LICENSE');
  });
}
