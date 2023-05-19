import * as assert from 'yeoman-assert';
import { readFileSync } from 'fs';
import { has, get, isEqualWith as _isEqualWith, isPlainObject } from 'lodash';
import { JsonValue } from 'type-fest';

type PropertyPath = string; // eg.: 'a.b.c'
type PropertyValue = JsonValue | RegExp;

type PathValue =
  | PropertyPath
  | {
      path: PropertyPath;
      value: PropertyValue;
      arrayIncludes?: boolean; // default: false. Expect actual value to be an array which includes the value.
      arrayLastOne?: boolean; // default: false. Expect the value to be the last one of the actual value. Note: `arrayInludes` should be `true`.
      deepComparison?: boolean; // default: false. This will compare Object value recursively.
    };

function isEqual(
  value: JsonValue,
  other: PropertyValue,
  deepComparison = false,
) {
  if (deepComparison) {
    return _isEqualWith(value, other, (v, o) => {
      if (typeof v === 'string' && o instanceof RegExp) {
        return o.test(v);
      }
    });
  }

  return typeof value === 'string' && other instanceof RegExp
    ? other.test(value)
    : value === other;
}

function formatForPrint(value: any) {
  return isPlainObject(value) ? JSON.stringify(value) : value;
}

export function assertJsonFileContent(
  fileName: string,
  pathValues: PathValue | PathValue[],
  namespace?: PropertyPath,
) {
  assert.file(fileName);

  const file = JSON.parse(readFileSync(fileName, 'utf-8'));

  function completePath(path: PropertyPath) {
    return namespace ? `${namespace}.${path}` : path;
  }

  (Array.isArray(pathValues) ? pathValues : [pathValues]).map((pathValue) => {
    if (typeof pathValue === 'string') {
      const path = completePath(pathValue);
      assert(
        has(file, path),
        `Expected property ${path} to exist in ${fileName}.`,
      );
    } else {
      const {
        path,
        value,
        arrayIncludes = false,
        arrayLastOne = false,
        deepComparison = false,
      } = pathValue;
      const actualValue = get(file, completePath(path));

      // arrayIncludes
      if (arrayIncludes) {
        assert(
          Array.isArray(actualValue),
          `Expected ${fileName} ${completePath(path)} to be an array.
            Actual value: ${formatForPrint(actualValue)}`,
        );

        const index = actualValue.findIndex((v) =>
          isEqual(v, value, deepComparison),
        );

        assert(
          index >= 0,
          `${fileName} ${completePath(path)} did not match.
              Actual value: ${formatForPrint(actualValue)}
              Expected contained value: ${formatForPrint(value)}.
            `,
        );

        // Expect to be the last one in the array
        if (arrayLastOne) {
          assert(
            index === actualValue.length - 1,
            `${fileName} ${completePath(path)} did not match.
              Actual value: ${formatForPrint(actualValue)}
              Expected contained value as the last one: ${formatForPrint(value)}
            `,
          );
        }

        return;
      }

      // generally
      assert(
        isEqual(actualValue, value, deepComparison),
        `${fileName} ${completePath(path)} did not match.
            Actual value: ${formatForPrint(actualValue)}
            Expected to match: ${formatForPrint(value)}
          `,
      );
    }
  });
}
