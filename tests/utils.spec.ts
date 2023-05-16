import * as assert from 'yeoman-assert';
import { isScoped } from '../src/_utils';

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
});
