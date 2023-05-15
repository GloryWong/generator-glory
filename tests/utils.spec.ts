import * as assert from 'yeoman-assert';
import {
  appendPrettier2ESLint,
  appendTypeScript2ESLint,
  isScoped,
} from '../src/_utils';
import { runDummyGenerator } from './runDummyGenerator';
import {
  assertAppendPrettier2ESLint,
  assertAppendTypeScript2ESLint,
} from './assertions';

describe('utils', () => {
  describe('isScoped()', () => {
    it('should return true when the value starts with @, and with / in the middle', () => {
      assert.strictEqual(isScoped('@test/it'), true);
    });

    it('should return false when the value is an empty string', () => {
      assert.strictEqual(isScoped(''), false);
    });

    it('should return false when the value does not starts with @', () => {
      assert.strictEqual(isScoped('test'), false);
      assert.strictEqual(isScoped('t@est'), false);
      assert.strictEqual(isScoped('test@'), false);
      assert.strictEqual(isScoped('/test'), false);
      assert.strictEqual(isScoped('/t@est'), false);
    });

    it('should return false when the value starts with @, but without / in the middle', () => {
      assert.strictEqual(isScoped('@test'), false);
      assert.strictEqual(isScoped('@/test'), false);
      assert.strictEqual(isScoped('@test/'), false);
    });
  });

  describe('appendTypeScript2ESlint()', () => {
    before((done) => runDummyGenerator(done, appendTypeScript2ESLint));

    assertAppendTypeScript2ESLint();
  });

  describe('appendPrettier2ESlint()', () => {
    before((done) => runDummyGenerator(done, appendPrettier2ESLint));

    assertAppendPrettier2ESLint();
  });
});
