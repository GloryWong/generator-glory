import * as assert from 'yeoman-assert';

export function testReadMeBasic() {
  it('should add README.md file', () => {
    assert.file('README.md');
  });
}
